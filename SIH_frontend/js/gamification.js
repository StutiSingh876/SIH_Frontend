/**
 * Gamification Utilities for SIH Mental Health Platform
 * Handles XP, achievements, progress tracking, and visual feedback
 */

class GamificationManager {
    constructor() {
        this.currentUser = null;
        this.userProgress = null;
        this.achievements = [];
        this.init();
    }

    async init() {
        // Get current user from localStorage
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                this.currentUser = await window.apiClient.getCurrentUser();
                await this.loadUserProgress();
            } catch (error) {
                console.error('Failed to initialize gamification:', error);
            }
        }
    }

    async loadUserProgress() {
        if (!this.currentUser) return;

        try {
            this.userProgress = await window.apiClient.getUserProgress(this.currentUser.username);
            this.achievements = await window.apiClient.getUserAchievements(this.currentUser.username);
            this.updateUI();
        } catch (error) {
            console.error('Failed to load user progress:', error);
        }
    }

    // XP Management
    async addXP(action, xpAmount, description) {
        if (!this.currentUser) return;

        try {
            const result = await window.apiClient.addXP(
                this.currentUser.username,
                action,
                xpAmount,
                description
            );
            
            // Update local progress
            this.userProgress = await window.apiClient.getUserProgress(this.currentUser.username);
            this.updateUI();
            
            // Show XP notification
            this.showXPNotification(xpAmount, description);
            
            // Check for new achievements
            await this.checkNewAchievements();
            
            return result;
        } catch (error) {
            console.error('Failed to add XP:', error);
        }
    }

    // Achievement Management
    async checkNewAchievements() {
        if (!this.currentUser) return;

        try {
            const result = await window.apiClient.checkAchievements(this.currentUser.username);
            
            if (result.new_achievements && result.new_achievements.length > 0) {
                this.showAchievementNotification(result.new_achievements);
                this.achievements = await window.apiClient.getUserAchievements(this.currentUser.username);
            }
        } catch (error) {
            console.error('Failed to check achievements:', error);
        }
    }

    // UI Updates
    updateUI() {
        this.updateXPDisplay();
        this.updateLevelDisplay();
        this.updateProgressBars();
        this.updateAchievementDisplay();
    }

    updateXPDisplay() {
        const xpElement = document.getElementById('user-xp');
        if (xpElement && this.userProgress) {
            xpElement.textContent = this.userProgress.xp || 0;
        }
    }

    updateLevelDisplay() {
        const levelElement = document.getElementById('user-level');
        if (levelElement && this.userProgress) {
            levelElement.textContent = this.userProgress.level || 1;
        }
    }

    updateProgressBars() {
        // Update weekly progress
        const weeklyProgress = this.calculateWeeklyProgress();
        const progressBar = document.getElementById('weekly-progress-bar');
        const progressText = document.getElementById('weekly-progress-text');
        
        if (progressBar && progressText) {
            const percentage = (weeklyProgress.completed / 7) * 100;
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${weeklyProgress.completed}/7 days completed`;
        }
    }

    updateAchievementDisplay() {
        const achievementContainer = document.getElementById('achievement-container');
        if (!achievementContainer || !this.achievements) return;

        achievementContainer.innerHTML = '';
        
        this.achievements.achievements.forEach(achievement => {
            const badge = document.createElement('div');
            badge.className = 'achievement-badge';
            badge.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            `;
            achievementContainer.appendChild(badge);
        });
    }

    // Notifications
    showXPNotification(xpAmount, description) {
        const notification = document.createElement('div');
        notification.className = 'xp-notification';
        notification.innerHTML = `
            <div class="xp-content">
                <i class="fas fa-star"></i>
                <span>+${xpAmount} XP</span>
                <small>${description}</small>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    showAchievementNotification(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                const notification = document.createElement('div');
                notification.className = 'achievement-notification';
                notification.innerHTML = `
                    <div class="achievement-content">
                        <div class="achievement-icon-large">${achievement.icon}</div>
                        <div class="achievement-text">
                            <div class="achievement-title">Achievement Unlocked!</div>
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-description">${achievement.description}</div>
                            <div class="achievement-xp">+${achievement.xp_reward} XP</div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => notification.classList.add('show'), 100);
                
                // Remove after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                    }, 500);
                }, 5000);
            }, index * 1000); // Stagger multiple achievements
        });
    }

    // Helper Methods
    calculateWeeklyProgress() {
        // This would ideally check actual mood logs
        // For now, return mock data
        return {
            completed: 4,
            total: 7,
            percentage: 57
        };
    }

    // Action Handlers
    async handleMoodLogged() {
        await this.addXP('mood_logged', 10, 'Logged a mood');
    }

    async handleMoodNoteWritten() {
        await this.addXP('mood_note_written', 5, 'Wrote a mood note');
    }

    async handleAIChat() {
        await this.addXP('ai_chat', 15, 'Chatted with AI');
    }

    async handleEmotionAnalysis() {
        await this.addXP('emotion_analysis', 20, 'Used emotion analysis');
    }

    async handleDailyCheckin() {
        await this.addXP('daily_checkin', 25, 'Completed daily check-in');
    }

    async handleForumHelp() {
        await this.addXP('forum_help', 50, 'Helped in forum');
    }
}

// Create global gamification manager
window.gamification = new GamificationManager();

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.gamification) {
        window.gamification.init();
    }
});

// CSS for notifications (inject into page)
const gamificationStyles = `
    .xp-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        font-family: 'Inter', sans-serif;
    }

    .xp-notification.show {
        transform: translateX(0);
    }

    .xp-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .xp-content i {
        color: #ffd700;
    }

    .xp-content small {
        opacity: 0.8;
        font-size: 0.8em;
    }

    .achievement-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1001;
        font-family: 'Inter', sans-serif;
        max-width: 400px;
        text-align: center;
    }

    .achievement-notification.show {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    .achievement-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }

    .achievement-icon-large {
        font-size: 3em;
        animation: bounce 0.6s ease;
    }

    .achievement-title {
        font-size: 1.2em;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .achievement-name {
        font-size: 1.4em;
        font-weight: 600;
        margin: 4px 0;
    }

    .achievement-description {
        font-size: 0.9em;
        opacity: 0.9;
    }

    .achievement-xp {
        background: rgba(255,255,255,0.2);
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 0.9em;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }

    .achievement-badge {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 8px;
    }

    .achievement-icon {
        font-size: 1.5em;
        width: 40px;
        text-align: center;
    }

    .achievement-info {
        flex: 1;
    }

    .achievement-name {
        font-weight: 600;
        color: #333;
        margin-bottom: 4px;
    }

    .achievement-description {
        font-size: 0.9em;
        color: #666;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = gamificationStyles;
document.head.appendChild(styleSheet);
