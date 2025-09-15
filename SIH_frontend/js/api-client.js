/**
 * API Client for SIH Backend Integration
 * Handles all communication with the FastAPI backend
 */

class APIClient {
    constructor() {
        this.baseURL = 'http://127.0.0.1:8000';
        this.token = localStorage.getItem('auth_token');
    }

    /**
     * Set authentication token
     */
    setToken(token) {
        this.token = token;
        localStorage.setItem('auth_token', token);
    }

    /**
     * Clear authentication token
     */
    clearToken() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    /**
     * Get headers for API requests
     */
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (includeAuth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Make API request with error handling
     */
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(options.includeAuth !== false),
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            // Handle different response types
            if (response.status === 401) {
                this.clearToken();
                throw new Error('Authentication required. Please login again.');
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
            }

            // Handle empty responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Authentication Methods
    async register(userData) {
        return this.makeRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            includeAuth: false
        });
    }

    async login(credentials) {
        const response = await this.makeRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            includeAuth: false
        });
        
        if (response.access_token) {
            this.setToken(response.access_token);
        }
        
        return response;
    }

    async getCurrentUser() {
        return this.makeRequest('/auth/me');
    }

    // Mood Tracking Methods
    async logMood(moodData) {
        return this.makeRequest('/moods/', {
            method: 'POST',
            body: JSON.stringify(moodData)
        });
    }

    async getMoodHistory(userId) {
        return this.makeRequest(`/moods/${userId}`);
    }

    async deleteMood(moodId) {
        return this.makeRequest(`/moods/${moodId}`, {
            method: 'DELETE'
        });
    }

    // NLP Analysis Methods
    async analyzeSentiment(text) {
        return this.makeRequest('/nlp/sentiment', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
    }

    async analyzeEmotion(text) {
        return this.makeRequest('/nlp/emotion', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
    }

    async analyzeToxicity(text) {
        return this.makeRequest('/nlp/toxicity', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
    }

    async analyzeDistress(text) {
        return this.makeRequest('/nlp/distress', {
            method: 'POST',
            body: JSON.stringify({ text })
        });
    }

    async comprehensiveAnalysis(text, userId) {
        return this.makeRequest('/nlp/analyze', {
            method: 'POST',
            body: JSON.stringify({ text, user_id: userId })
        });
    }

    // Chatbot Methods
    async sendChatMessage(userId, message) {
        return this.makeRequest('/nlp/chatbot', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, message })
        });
    }

    async getChatHistory(userId, limit = 10) {
        return this.makeRequest(`/nlp/chatbot/history/${userId}?limit=${limit}`);
    }

    async resetChatbotSession(userId) {
        return this.makeRequest(`/nlp/chatbot/reset/${userId}`, {
            method: 'POST'
        });
    }

    // Gamification Methods
    async updateStreak(userId) {
        return this.makeRequest(`/gamify/streak/${userId}`, {
            method: 'POST'
        });
    }

    async getStreak(userId) {
        return this.makeRequest(`/gamify/streak/${userId}`);
    }

    // XP and Progress Methods
    async addXP(userId, action, xpAmount, description) {
        return this.makeRequest(`/gamify/xp/add/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                action: action,
                xp_amount: xpAmount,
                description: description
            })
        });
    }

    async getUserProgress(userId) {
        return this.makeRequest(`/gamify/progress/${userId}`);
    }

    async getUserAchievements(userId) {
        return this.makeRequest(`/gamify/achievements/${userId}`);
    }

    async checkAchievements(userId) {
        return this.makeRequest(`/gamify/achievements/check/${userId}`, {
            method: 'POST'
        });
    }

    // Health Check
    async healthCheck() {
        return this.makeRequest('/', { includeAuth: false });
    }

    async nlpHealthCheck() {
        return this.makeRequest('/nlp/health', { includeAuth: false });
    }
}

// Create global API client instance
window.apiClient = new APIClient();

// Utility functions for common operations
window.authUtils = {
    isLoggedIn: () => !!window.apiClient.token,
    getCurrentUser: () => window.apiClient.getCurrentUser(),
    logout: () => {
        window.apiClient.clearToken();
        window.location.href = 'Login.html';
    }
};

// Error handling utilities
window.errorHandler = {
    showError: (message, elementId = 'error-message') => {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        } else {
            alert(message);
        }
    },
    
    showSuccess: (message, elementId = 'success-message') => {
        const successElement = document.getElementById(elementId);
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 3000);
        }
    }
};

// Loading utilities
window.loadingUtils = {
    showLoading: (element) => {
        if (element) {
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            element.disabled = true;
        }
    },
    
    hideLoading: (element, originalText = 'Submit') => {
        if (element) {
            element.innerHTML = originalText;
            element.disabled = false;
        }
    }
};
