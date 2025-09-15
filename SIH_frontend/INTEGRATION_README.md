# SIH Frontend-Backend Integration Guide

## 🎉 Integration Complete!

The SIH frontend has been successfully integrated with the FastAPI backend. All major features are now connected and functional.

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd SIH_backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend will run on `http://localhost:8000`

### 2. Start the Frontend
```bash
cd SIH_frontend
# Serve the files using any HTTP server
# For example, using Python:
python -m http.server 3000
```
The frontend will be available at `http://localhost:3000`

### 3. Test the Integration
Open `http://localhost:3000/test-integration.html` to run comprehensive integration tests.

## 🔧 What's Been Integrated

### ✅ Authentication System
- **Login/Register**: Full integration with JWT authentication
- **User Management**: Secure user sessions with token storage
- **Protected Routes**: All pages now require authentication
- **Logout**: Proper session cleanup

### ✅ Mood Tracking
- **Mood Logging**: Real-time mood tracking with backend storage
- **Mood History**: Display of past mood entries
- **🗑️ Mood Deletion**: Delete unwanted mood entries with confirmation
- **Notes**: Optional mood notes with each entry
- **Data Persistence**: All mood data saved to MongoDB

### ✅ AI Chatbot
- **Advanced Chatbot**: Full integration with AI-powered mental health chatbot
- **Sentiment Analysis**: Real-time emotional analysis of messages
- **Conversation History**: Persistent chat history
- **Crisis Detection**: Automatic detection of urgent distress signals

### ✅ Error Handling
- **Comprehensive Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Network Error Recovery**: Graceful handling of connection issues

## 📁 New Files Created

### Core Integration Files
- `js/api-client.js` - Centralized API client for all backend communication
- `chatbot.html` - Full-featured AI chatbot interface
- `test-integration.html` - Comprehensive integration testing page

### Updated Files
- `Login.html` - Integrated with backend authentication
- `MoodTracker.Html` - Connected to mood tracking API
- `MoodTracker.js` - Real-time mood logging and history
- `Mitr2.html` - Added authentication checks and navigation
- `forum.html` - Added authentication protection
- `forum.js` - Basic authentication integration

## 🔗 API Integration Details

### Authentication Endpoints
```javascript
// Register new user
await apiClient.register({
    username: "user123",
    email: "user@example.com", 
    password: "password123",
    full_name: "John Doe"
});

// Login user
await apiClient.login({
    username: "user123",
    password: "password123"
});
```

### Mood Tracking Endpoints
```javascript
// Log a mood
await apiClient.logMood({
    user_id: "user123",
    mood: "happy",
    note: "Feeling great today!"
});

// Get mood history
await apiClient.getMoodHistory("user123");

// Delete a mood log
await apiClient.deleteMood("mood_id_here");
```

### Chatbot Endpoints
```javascript
// Send message to AI chatbot
await apiClient.sendChatMessage("user123", "I'm feeling anxious");

// Get conversation history
await apiClient.getChatHistory("user123", 10);
```

## 🧪 Testing the Integration

### 1. Manual Testing
1. Open `http://localhost:3000/Login.html`
2. Register a new account
3. Login with your credentials
4. Navigate to different features:
   - Mood Tracker: Log moods, view history, and delete entries
   - AI Chatbot: Chat with the AI assistant
   - Forum: Browse the discussion forum

### 2. Automated Testing
1. Open `http://localhost:3000/test-integration.html`
2. Run each test section:
   - Backend Health Check
   - Authentication Test
   - Mood Tracking Test
   - Chatbot Test

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Secure token storage in localStorage
- Automatic token refresh handling
- Protected route access

### Data Protection
- User data isolation (users can only access their own data)
- Input validation and sanitization
- Secure password hashing (handled by backend)
- CORS protection

## 🎯 User Flow

### 1. Registration/Login
```
Login.html → Register/Login → Mitr2.html (Dashboard)
```

### 2. Mood Tracking
```
Mitr2.html → MoodTracker.Html → Select Mood → Add Note → Save to Backend
```

### 3. AI Chatbot
```
Mitr2.html → chatbot.html → Send Message → AI Response + Analysis
```

### 4. Forum
```
Mitr2.html → forum.html → Browse Discussions (Authentication Required)
```

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: Ensure backend is running on `http://localhost:8000` and frontend on `http://localhost:3000`

#### 2. Authentication Errors
**Problem**: "Authentication required" errors
**Solution**: Make sure you're logged in and the JWT token is valid

#### 3. API Connection Errors
**Problem**: "Failed to fetch" errors
**Solution**: Check if backend is running and accessible

### Debug Mode
Open browser developer tools (F12) to see:
- Network requests to backend
- Console logs for debugging
- Local storage for authentication tokens

## 📊 Integration Status

| Feature | Status | Backend Endpoint | Frontend Integration |
|---------|--------|------------------|---------------------|
| User Registration | ✅ Complete | `/auth/register` | Login.html |
| User Login | ✅ Complete | `/auth/login` | Login.html |
| Mood Logging | ✅ Complete | `POST /moods/` | MoodTracker.js |
| Mood History | ✅ Complete | `GET /moods/{user_id}` | MoodTracker.js |
| Mood Deletion | ✅ Complete | `DELETE /moods/{mood_id}` | MoodTracker.js |
| AI Chatbot | ✅ Complete | `POST /nlp/chatbot` | chatbot.html |
| Sentiment Analysis | ✅ Complete | `POST /nlp/sentiment` | chatbot.html |
| Conversation History | ✅ Complete | `GET /nlp/chatbot/history/{user_id}` | chatbot.html |
| Error Handling | ✅ Complete | All endpoints | All pages |
| Authentication Guards | ✅ Complete | JWT middleware | All pages |

## 🚀 Next Steps

### Potential Enhancements
1. **Forum Backend Integration**: Connect forum to backend database
2. **Real-time Notifications**: WebSocket integration for live updates
3. **File Uploads**: Profile pictures and document uploads
4. **Mobile App**: React Native or Flutter mobile application
5. **Advanced Analytics**: Mood trends and insights dashboard

### Performance Optimizations
1. **Caching**: Implement client-side caching for frequently accessed data
2. **Lazy Loading**: Load components on demand
3. **Image Optimization**: Compress and optimize images
4. **Bundle Optimization**: Minify and compress JavaScript/CSS

## 📞 Support

If you encounter any issues with the integration:

1. Check the browser console for error messages
2. Verify backend is running and accessible
3. Test individual components using the test page
4. Check network connectivity between frontend and backend

## 🎉 Congratulations!

Your SIH mental health platform is now fully integrated and ready for use! The frontend and backend are working together seamlessly to provide a comprehensive mental health support system for students.

**Key Features Now Available:**
- ✅ Secure user authentication
- ✅ Real-time mood tracking
- ✅ AI-powered mental health chatbot
- ✅ Emotional analysis and crisis detection
- ✅ Persistent data storage
- ✅ Responsive, modern UI
- ✅ Comprehensive error handling

The platform is now ready for production deployment and real-world use!
