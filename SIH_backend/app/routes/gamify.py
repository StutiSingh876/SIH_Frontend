from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from app.models import User
from app.auth import get_current_active_user
from app.exceptions import DatabaseConnectionError, UnauthorizedAccessError
from app.database import streaks_collection, safe_db_operation

router = APIRouter()

@router.post("/streak/{user_id}")
def update_streak(user_id: str, current_user: User = Depends(get_current_active_user)):
    """Update the streak count for the specified user."""
    try:
        # Ensure user can only update their own streak
        if user_id != current_user.username:
            raise UnauthorizedAccessError("You can only update your own streak")
        
        # Check if streak exists
        user_streak = safe_db_operation(streaks_collection.find_one, {"user_id": user_id})

        if user_streak:
            new_streak = user_streak["streak"] + 1
            safe_db_operation(
                streaks_collection.update_one,
                {"user_id": user_id},
                {"$set": {"streak": new_streak}}
            )
        else:
            new_streak = 1
            safe_db_operation(streaks_collection.insert_one, {"user_id": user_id, "streak": new_streak})

        return {"user_id": user_id, "streak": new_streak, "message": "Streak updated successfully"}
        
    except (ConnectionFailure, ServerSelectionTimeoutError):
        raise DatabaseConnectionError("Database connection failed")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update streak: {str(e)}"
        )

# 📌 New: Fetch current streak for a student
@router.get("/streak/{user_id}")
def get_streak(user_id: str, current_user: User = Depends(get_current_active_user)):
    """Get the current streak count for the specified user."""
    try:
        # Ensure user can only access their own streak
        if user_id != current_user.username:
            raise UnauthorizedAccessError("You can only access your own streak")
        
        user_streak = safe_db_operation(streaks_collection.find_one, {"user_id": user_id}, {"_id": 0})
        if not user_streak:
            return {"user_id": user_id, "streak": 0, "message": "No streak found"}
        return user_streak
        
    except (ConnectionFailure, ServerSelectionTimeoutError):
        raise DatabaseConnectionError("Database connection failed")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve streak: {str(e)}"
        )
