# 🚀 SIH Mental Health Platform - Manual Setup Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed:
- **Python 3.8+** (Python 3.13.7 recommended)
- **pip** (Python package installer)
- **MongoDB** (Cloud instance or local installation)
- **Web Browser** (Chrome, Firefox, Safari, or Edge)

## 🏗️ Project Structure

```
SIH_ps1/
├── SIH_backend/          # FastAPI Backend
│   ├── app/              # Main application code
│   ├── requirements.txt  # Python dependencies
│   └── config.py         # Configuration settings
└── SIH_frontend/         # HTML/JavaScript Frontend
    ├── Login.html        # User authentication
    ├── Mitr2.html        # Main dashboard
    ├── chatbot.html      # AI chatbot interface
    ├── MoodTracker.Html  # Mood tracking
    ├── forum.html        # Community forum
    └── js/               # JavaScript utilities
```

## 🔧 Backend Setup (FastAPI Server)

### Step 1: Navigate to Backend Directory
```bash
cd SIH_backend
```

### Step 2: Install Dependencies
```bash
# Install all required Python packages
pip install -r requirements.txt
```

**Required packages:**
- fastapi
- uvicorn
- pymongo
- python-jose[cryptography]
- passlib[bcrypt]
- python-multipart
- email-validator
- requests
- python-dotenv
- transformers
- torch
- nltk
- scikit-learn
- numpy

### Step 3: Configure Environment (Optional)
Create a `.env` file in the `SIH_backend` directory if you want to customize settings:

```env
SECRET_KEY=your-super-secure-secret-key-change-this-in-production
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
ENVIRONMENT=development
DEBUG=True
HOST=127.0.0.1
PORT=8000
```

### Step 4: Start the Backend Server
```bash
# Start the FastAPI server with auto-reload
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Expected Output:**
```
INFO:     Will watch for changes in these directories: ['D:\\SIH_ps1\\SIH_backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using StatReload
INFO:app.database:✅ Successfully connected to MongoDB
INFO:app.nlp_models:✅ NLP models loaded successfully
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:app.database:✅ Database connection successful
INFO:app.database:✅ Database indexes created successfully
INFO:     Application startup complete.
```

### Step 5: Verify Backend is Running
Open your browser and visit:
- **API Root**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

You should see:
- Root endpoint: `{"message":"MindCare API is running 🚀"}`
- Interactive API documentation (Swagger UI)

## 🌐 Frontend Setup (Web Server)

### Step 1: Navigate to Frontend Directory
```bash
# Open a new terminal/command prompt
cd SIH_frontend
```

### Step 2: Start the Web Server
```bash
# Start a simple HTTP server
python -m http.server 3000
```

**Expected Output:**
```
Serving HTTP on :: port 3000 (http://[::]:3000/) ...
```

### Step 3: Verify Frontend is Running
Open your browser and visit:
- **Main Page**: http://localhost:3000
- **Login Page**: http://localhost:3000/Login.html

You should see the MindCare login interface.

## 🧪 Testing the Integration

### Step 1: Access the Test Page
Visit: http://localhost:3000/test-integration.html

### Step 2: Run Integration Tests
The test page will automatically:
1. Check backend connectivity
2. Test authentication endpoints
3. Verify mood tracking functionality
4. Test chatbot integration

### Step 3: Manual Testing
1. **Register a new account** at http://localhost:3000/Login.html
2. **Login** with your credentials
3. **Navigate to dashboard** (Mitr2.html)
4. **Test mood tracking** (MoodTracker.Html)
5. **Try the AI chatbot** (chatbot.html)
6. **Browse the forum** (forum.html)

## 🔍 Troubleshooting

### Backend Issues

#### Issue: "ModuleNotFoundError: No module named 'app'"
**Solution:**
```bash
# Make sure you're in the SIH_backend directory
cd SIH_backend
# Then start the server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

#### Issue: "Failed to connect to database"
**Solutions:**
1. Check your internet connection (MongoDB is cloud-hosted)
2. Verify MongoDB URL in config.py
3. Check if MongoDB credentials are correct

#### Issue: "Port 8000 already in use"
**Solutions:**
```bash
# Option 1: Use a different port
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001

# Option 2: Kill the process using port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac:
lsof -ti:8000 | xargs kill -9
```

### Frontend Issues

#### Issue: "404 File not found" for HTML files
**Solution:**
```bash
# Make sure you're in the SIH_frontend directory
cd SIH_frontend
# Verify files exist
ls  # or dir on Windows
# Start server from correct directory
python -m http.server 3000
```

#### Issue: "Port 3000 already in use"
**Solutions:**
```bash
# Option 1: Use a different port
python -m http.server 3001

# Option 2: Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Integration Issues

#### Issue: CORS errors in browser console
**Solution:**
- Ensure backend is running on http://127.0.0.1:8000
- Ensure frontend is running on http://localhost:3000
- Check that CORS_ORIGINS in config.py includes the frontend URL

#### Issue: "Authentication required" errors
**Solution:**
- Make sure you're logged in
- Check if JWT token is stored in localStorage
- Try logging out and logging back in

## 📱 Application URLs

### Main Application Pages
- **Login/Register**: http://localhost:3000/Login.html
- **Dashboard**: http://localhost:3000/Mitr2.html
- **Mood Tracker**: http://localhost:3000/MoodTracker.Html
- **AI Chatbot**: http://localhost:3000/chatbot.html
- **Forum**: http://localhost:3000/forum.html

### Testing & Development
- **Integration Tests**: http://localhost:3000/test-integration.html
- **Comprehensive Tests**: http://localhost:3000/comprehensive-test.html
- **API Documentation**: http://localhost:8000/docs

## 🔐 Default Configuration

### Backend Configuration (config.py)
- **Host**: 127.0.0.1
- **Port**: 8000
- **Database**: MongoDB (cloud-hosted)
- **Authentication**: JWT with 30-minute expiry
- **CORS**: Enabled for localhost:3000

### Frontend Configuration
- **Host**: localhost
- **Port**: 3000
- **API Base URL**: http://localhost:8000
- **Authentication**: JWT tokens stored in localStorage

## 🚀 Production Deployment Notes

For production deployment:

1. **Change SECRET_KEY** in config.py
2. **Use environment variables** for sensitive data
3. **Set up proper CORS origins**
4. **Use HTTPS** for both frontend and backend
5. **Set up proper database credentials**
6. **Configure proper logging**
7. **Use a production WSGI server** (like Gunicorn)

## 📞 Support

If you encounter issues:

1. **Check the terminal output** for error messages
2. **Open browser developer tools** (F12) to see console errors
3. **Verify both servers are running** on the correct ports
4. **Test individual components** using the test pages
5. **Check network connectivity** between frontend and backend

## 🎉 Success Indicators

You'll know everything is working when:

✅ Backend shows: `{"message":"MindCare API is running 🚀"}` at http://localhost:8000
✅ Frontend shows the login page at http://localhost:3000/Login.html
✅ Integration tests pass at http://localhost:3000/test-integration.html
✅ You can register, login, and use all features without errors

---

**Happy coding! Your mental health platform is ready to help students! 🧠💚**
