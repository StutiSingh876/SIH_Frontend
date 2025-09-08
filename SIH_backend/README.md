# SIH Backend - MindCare Mental Health API

## Overview
This is a comprehensive mental health tracking and support API built with FastAPI. It provides user authentication, mood tracking, AI-powered chatbot support, and advanced natural language processing for mental health detection.

## What This Project Does
- **User Management**: Register, login, and manage user accounts with secure JWT authentication
- **Mood Tracking**: Log and track daily moods with notes
- **AI Chatbot**: Advanced mental health chatbot with state management and emotional analysis
- **NLP Analysis**: Sentiment analysis, emotion detection, toxicity screening, and distress detection
- **Gamification**: Streak tracking to encourage consistent mental health check-ins
- **Risk Assessment**: AI-powered risk scoring based on user's emotional patterns

## Key Features
- 🔐 Secure JWT-based authentication
- 🧠 AI-powered mental health analysis
- 💬 Intelligent chatbot with conversation memory
- 📊 Mood tracking and analytics
- 🎯 Gamification with streak tracking
- 🚨 Urgent distress detection and crisis intervention
- 📱 RESTful API with comprehensive documentation

## Technology Stack
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **AI/ML**: Transformers, NLTK, PyTorch
- **Authentication**: JWT with bcrypt password hashing
- **Documentation**: Auto-generated Swagger/OpenAPI docs

## Quick Start
1. Install dependencies: `pip install -r requirements.txt`
2. Set up environment variables (see config.py)
3. Run the server: `uvicorn app.main:app --reload`
4. Visit `http://localhost:8000/docs` for API documentation

## API Endpoints
- `/auth/*` - User authentication and management
- `/moods/*` - Mood logging and history
- `/chatbot/*` - Basic chatbot interactions
- `/nlp/*` - Advanced AI analysis and mental health detection
- `/gamify/*` - Streak tracking and gamification

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- User data isolation (users can only access their own data)
- Input validation and sanitization
- Comprehensive error handling

## Mental Health Features
- Real-time sentiment and emotion analysis
- Toxicity detection for harmful content
- Urgent distress detection with crisis intervention
- Risk assessment based on emotional patterns
- Intelligent chatbot with conversation memory
- Comprehensive mental health analytics

This API is designed to support mental health applications by providing robust backend services for user management, emotional tracking, and AI-powered mental health support.
