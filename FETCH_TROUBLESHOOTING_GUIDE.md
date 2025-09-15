# Failed to Fetch - Complete Troubleshooting Guide

## 🚨 Quick Diagnosis

If you're getting "Failed to fetch" errors, follow these steps in order:

### 1. **Check if Backend is Running**
```bash
# Run this in SIH_backend directory
python test_network_access.py
```

### 2. **Check Server Status**
```bash
# In SIH_backend directory
python run_network.py
```

### 3. **Test Different URLs**
Try these URLs in your browser:
- `http://localhost:8000/`
- `http://127.0.0.1:8000/`
- `http://0.0.0.0:8000/`

---

## 🔍 Common Causes & Solutions

### **Cause 1: Backend Server Not Running**
**Symptoms:** All requests fail with "Failed to fetch"

**Solution:**
```bash
cd SIH_backend
python run_network.py
```

**Expected Output:**
```
🌐 Starting network-optimized server...
📍 Server will be accessible on all network interfaces (0.0.0.0:8000)
INFO:     Uvicorn running on http://0.0.0.0:8000
```

---

### **Cause 2: Wrong URL in Frontend**
**Symptoms:** Frontend can't connect to backend

**Current API Client URL:** `http://127.0.0.1:8000`

**Solutions:**
1. **Update API Client** (Recommended):
   ```javascript
   // In api-client.js, change line 8:
   this.baseURL = 'http://localhost:8000';
   ```

2. **Or try these URLs:**
   - `http://localhost:8000`
   - `http://127.0.0.1:8000`
   - `http://0.0.0.0:8000`

---

### **Cause 3: CORS Issues**
**Symptoms:** Browser shows CORS errors in console

**Solution:** Backend is already configured for CORS, but verify:
```python
# In config.py (already set):
CORS_ORIGINS = ["*"]  # Allow all origins
```

---

### **Cause 4: Firewall Blocking**
**Symptoms:** Connection refused or timeout

**Solution:**
```bash
# Run as Administrator in PowerShell:
netsh advfirewall firewall add rule name="MindCare API" dir=in action=allow protocol=TCP localport=8000
```

---

### **Cause 5: Port Already in Use**
**Symptoms:** "Address already in use" error

**Solution:**
```bash
# Find what's using port 8000:
netstat -ano | findstr :8000

# Kill the process (replace PID):
taskkill /PID <PID_NUMBER> /F

# Or use a different port:
# Change PORT in config.py to 8001
```

---

### **Cause 6: Network Interface Issues**
**Symptoms:** Works locally but not from other devices

**Solution:**
1. **Check your IP:**
   ```bash
   ipconfig
   ```

2. **Use your actual IP:**
   ```javascript
   // In api-client.js:
   this.baseURL = 'http://192.168.1.XXX:8000';  // Replace with your IP
   ```

---

## 🛠️ Advanced Troubleshooting

### **Step 1: Run Network Test**
```bash
cd SIH_backend
python test_network_access.py
```

### **Step 2: Check Server Logs**
```bash
cd SIH_backend
python run_with_logs.py
```

### **Step 3: Test API Endpoints**
```bash
cd SIH_backend
python test_api_endpoints.py
```

### **Step 4: Browser Developer Tools**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try making a request
4. Check for:
   - Red failed requests
   - CORS errors
   - 404/500 errors
   - Connection refused

---

## 🔧 Quick Fixes

### **Fix 1: Restart Everything**
```bash
# Stop any running servers (Ctrl+C)
# Then restart:
cd SIH_backend
python run_network.py
```

### **Fix 2: Clear Browser Cache**
- Hard refresh: Ctrl+Shift+R
- Clear cache: Ctrl+Shift+Delete

### **Fix 3: Try Different Browser**
- Test in Chrome, Firefox, Edge
- Check if it's browser-specific

### **Fix 4: Check Antivirus**
- Some antivirus software blocks local servers
- Add exception for port 8000

---

## 📱 Mobile/External Access

### **For Mobile Testing:**
1. **Find your computer's IP:**
   ```bash
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. **Update API Client:**
   ```javascript
   // In api-client.js:
   this.baseURL = 'http://192.168.1.100:8000';  // Your actual IP
   ```

3. **Test from mobile:**
   - Open browser on phone
   - Go to: `http://192.168.1.100:8000/`

---

## 🚀 Production Deployment

### **For External Access:**
1. **Get external IP:**
   - Visit: https://whatismyipaddress.com/

2. **Configure router:**
   - Port forward 8000 to your computer

3. **Update API Client:**
   ```javascript
   this.baseURL = 'http://YOUR_EXTERNAL_IP:8000';
   ```

---

## 🆘 Emergency Fallback

### **If Nothing Works:**
1. **Use localhost only:**
   ```javascript
   this.baseURL = 'http://localhost:8000';
   ```

2. **Run simple server:**
   ```bash
   cd SIH_backend
   python simple_server.py
   ```

3. **Check Python installation:**
   ```bash
   python --version
   pip list | findstr fastapi
   ```

---

## 📞 Still Having Issues?

### **Debug Information to Collect:**
1. **Server logs** (from run_with_logs.py)
2. **Browser console errors**
3. **Network test results** (test_network_access.py)
4. **Your IP address** (ipconfig)
5. **Operating system** (Windows 10/11)

### **Common Error Messages:**
- `Failed to fetch` → Backend not running or wrong URL
- `CORS error` → Backend CORS misconfigured
- `Connection refused` → Firewall or port blocked
- `404 Not Found` → Wrong endpoint URL
- `500 Internal Server Error` → Backend code error

---

## ✅ Success Checklist

- [ ] Backend server running on port 8000
- [ ] No firewall blocking port 8000
- [ ] Correct URL in api-client.js
- [ ] Browser can access http://localhost:8000/
- [ ] No CORS errors in browser console
- [ ] API endpoints responding correctly

---

*Last updated: $(date)*
*For more help, check the test files in SIH_backend directory*
