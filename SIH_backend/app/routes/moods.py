from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from datetime import datetime
from app.models import MoodLog, User
from app.auth import get_current_active_user
from app.exceptions import DatabaseConnectionError, UnauthorizedAccessError
from app.database import moods_collection, safe_db_operation

router = APIRouter()

# 📌 POST - Log a new mood
@router.post("/")
def log_mood(mood: MoodLog, current_user: User = Depends(get_current_active_user)):
    """Log a new mood entry for the current user."""
    try:
        # Ensure user can only log moods for themselves
        if mood.user_id != current_user.username:
            raise UnauthorizedAccessError("You can only log moods for yourself")
        
        # Add timestamp to mood data
        mood_data = mood.dict()
        mood_data["timestamp"] = datetime.utcnow()
        
        result = safe_db_operation(moods_collection.insert_one, mood_data)
        return {
            "message": "Mood logged successfully ✅", 
            "id": str(result.inserted_id), 
            "data": mood
        }
        
    except (ConnectionFailure, ServerSelectionTimeoutError):
        raise DatabaseConnectionError("Database connection failed")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to log mood: {str(e)}"
        )

# 📌 GET - Fetch all moods for a student
@router.get("/{user_id}")
def get_mood_history(user_id: str, current_user: User = Depends(get_current_active_user)):
    """Get mood history for the specified user."""
    try:
        # Ensure user can only access their own mood history
        if user_id != current_user.username:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only access your own mood history"
            )
        
        moods = list(safe_db_operation(moods_collection.find, {"user_id": user_id}, {"_id": 0}))
        return {"user_id": user_id, "history": moods, "count": len(moods)}
        
    except (ConnectionFailure, ServerSelectionTimeoutError):
        raise DatabaseConnectionError("Database connection failed")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve mood history: {str(e)}"
        )
