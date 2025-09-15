# 🎮 Gamification Testing Guide

## 🚀 Quick Start Testing

### 1. Start the Backend
```bash
cd SIH_backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 2. Start the Frontend
```bash
cd SIH_frontend
python -m http.server 3000
```

### 3. Run Tests
Open your browser and go to: `http://localhost:3000/test-gamification.html`

---

## 🧪 Test Categories

### **Backend API Tests**
- ✅ Backend Health Check
- ✅ XP System (add/retrieve)
- ✅ Achievements (get/check)
- ✅ Progress Tracking
- ✅ Streak System
- ✅ Mood Tracking Integration
- ✅ AI Chat Integration

### **Frontend Integration Tests**
- ✅ Gamification Manager Initialization
- ✅ Notification System
- ✅ UI Updates
- ✅ Real-time Progress Display

### **End-to-End Tests**
- ✅ Complete Mood Tracking Flow
- ✅ Complete AI Chat Flow
- ✅ Achievement Unlock Process

---

## 🔧 Manual Testing Steps

### **Step 1: Authentication Test**
1. Go to `http://localhost:3000/Login.html`
2. Register a new account or login
3. Verify you're redirected to the dashboard

### **Step 2: Dashboard Gamification Test**
1. Go to `http://localhost:3000/Mitr2.html`
2. Check the header for XP and Level display
3. Scroll down to see the "Your Wellness Journey" section
4. Verify progress bars and achievement display

### **Step 3: Mood Tracking Test**
1. Go to `http://localhost:3000/MoodTracker.Html`
2. Click on a mood (e.g., "Happy")
3. Add a note and save
4. **Expected**: XP notification should appear (+10 XP for mood, +5 XP for note)
5. Go back to dashboard to see updated stats

### **Step 4: AI Chatbot Test**
1. Go to `http://localhost:3000/chatbot.html`
2. Send a message like "I'm feeling stressed today"
3. **Expected**: XP notification should appear (+15 XP for chat, +20 XP for emotion analysis)
4. Check for achievement notifications

### **Step 5: Achievement Test**
1. Log multiple moods (aim for 10 different emotions)
2. Chat with AI multiple times
3. **Expected**: Achievement notifications should appear
4. Check dashboard for earned badges

---

## 🐛 Backend Testing

### **Run Backend Test Script**
```bash
cd SIH_backend
python test_gamification.py
```

**Expected Output:**
```
[12:34:56] INFO: 🚀 Starting Gamification Backend Test Suite
[12:34:56] INFO: ==================================================
[12:34:57] PASS: ✅ Backend Health Check
[12:34:57] PASS: ✅ User Registration
[12:34:58] PASS: ✅ User Login
[12:34:58] PASS: ✅ XP Addition
[12:34:58] PASS: ✅ Progress Retrieval
[12:34:59] PASS: ✅ Get Achievements
[12:34:59] PASS: ✅ Check Achievements
[12:35:00] PASS: ✅ Update Streak
[12:35:00] PASS: ✅ Get Streak
[12:35:01] PASS: ✅ Mood Logging
[12:35:01] PASS: ✅ Mood History
[12:35:02] PASS: ✅ AI Chat
[12:35:02] INFO: ==================================================
[12:35:02] INFO: 🏁 Test Suite Completed!
[12:35:02] INFO: Total Tests: 12
[12:35:02] INFO: Passed: 12
[12:35:02] INFO: Failed: 0
[12:35:02] INFO: Success Rate: 100.0%
```

---

## 📊 Expected Results

### **XP Values**
- Mood Logged: +10 XP
- Mood Note Written: +5 XP
- AI Chat: +15 XP
- Emotion Analysis: +20 XP
- Daily Check-in: +25 XP
- Forum Help: +50 XP

### **Achievement Requirements**
- 🎯 **First Steps**: Log 1 mood (+50 XP)
- ⚔️ **Week Warrior**: 7 consecutive days (+100 XP)
- 🔍 **Mood Detective**: 10 different emotions (+75 XP)
- 🤖 **AI Friend**: 1 AI conversation (+30 XP)
- 📝 **Reflection Pro**: 10 mood notes (+80 XP)
- 🔄 **Comeback Kid**: Return after 3+ day break (+60 XP)

### **Level Progression**
- Level 1: 0-99 XP
- Level 2: 100-299 XP
- Level 3: 300-599 XP
- Level 4: 600-999 XP
- Level 5: 1000-1499 XP
- Level 6+: 1500+ XP (every 200 XP)

---

## 🔍 Troubleshooting

### **Common Issues**

#### **Backend Not Running**
```
Error: Cannot connect to backend
Solution: Make sure backend is running on localhost:8000
```

#### **Authentication Errors**
```
Error: Authentication required
Solution: Login first at Login.html
```

#### **CORS Errors**
```
Error: CORS policy blocked
Solution: Ensure backend CORS_ORIGINS includes localhost:3000
```

#### **Database Connection**
```
Error: Database connection failed
Solution: Check MongoDB connection in config.py
```

### **Debug Steps**

1. **Check Browser Console** (F12)
   - Look for JavaScript errors
   - Check network requests
   - Verify API responses

2. **Check Backend Logs**
   - Look for error messages in terminal
   - Check database connection
   - Verify API endpoint responses

3. **Test Individual Components**
   - Test backend health: `http://localhost:8000/`
   - Test API docs: `http://localhost:8000/docs`
   - Test frontend: `http://localhost:3000/test-gamification.html`

---

## 📈 Performance Testing

### **Load Testing**
```bash
# Test multiple concurrent users
for i in {1..10}; do
  curl -X POST http://localhost:8000/gamify/xp/add/test_user_$i \
    -H "Content-Type: application/json" \
    -d '{"action":"test","xp_amount":10,"description":"Load test"}' &
done
```

### **Memory Usage**
- Monitor backend memory usage during tests
- Check for memory leaks in long-running sessions
- Verify database connection pooling

---

## ✅ Success Criteria

### **All Tests Must Pass**
- [ ] Backend health check
- [ ] User authentication
- [ ] XP system functionality
- [ ] Achievement system
- [ ] Progress tracking
- [ ] Streak system
- [ ] Mood tracking integration
- [ ] AI chat integration
- [ ] Frontend notifications
- [ ] UI updates

### **User Experience**
- [ ] Smooth XP notifications
- [ ] Achievement celebrations
- [ ] Real-time progress updates
- [ ] Responsive design
- [ ] Error handling

### **Performance**
- [ ] API response times < 500ms
- [ ] Notification animations smooth
- [ ] No memory leaks
- [ ] Database queries optimized

---

## 🎯 Test Scenarios

### **Scenario 1: New User Journey**
1. Register new account
2. Log first mood → Should get "First Steps" achievement
3. Chat with AI → Should get "AI Friend" achievement
4. Check dashboard for progress

### **Scenario 2: Power User Journey**
1. Login with existing account
2. Log 10 different moods → Should get "Mood Detective" achievement
3. Write detailed notes → Should get "Reflection Pro" achievement
4. Maintain 7-day streak → Should get "Week Warrior" achievement

### **Scenario 3: Return User Journey**
1. Login after 3+ day break
2. Log a mood → Should get "Comeback Kid" achievement
3. Check for any new achievements
4. Verify progress is maintained

---

## 📝 Test Report Template

```
GAMIFICATION TEST REPORT
========================
Date: [DATE]
Tester: [NAME]
Environment: [DEVELOPMENT/PRODUCTION]

BACKEND TESTS:
- Health Check: ✅/❌
- Authentication: ✅/❌
- XP System: ✅/❌
- Achievements: ✅/❌
- Progress: ✅/❌
- Streak: ✅/❌
- Mood Integration: ✅/❌
- AI Integration: ✅/❌

FRONTEND TESTS:
- Manager Init: ✅/❌
- Notifications: ✅/❌
- UI Updates: ✅/❌

E2E TESTS:
- Mood Flow: ✅/❌
- Chat Flow: ✅/❌
- Achievement Flow: ✅/❌

ISSUES FOUND:
- [List any issues]

RECOMMENDATIONS:
- [List improvements]

OVERALL STATUS: ✅ PASS / ❌ FAIL
```

---

**Happy Testing! 🎮✨**
