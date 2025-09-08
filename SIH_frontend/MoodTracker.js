document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in
    if (!authUtils.isLoggedIn()) {
        window.location.href = 'Login.html';
        return;
    }

    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodFeedbackEl = document.getElementById('mood-feedback');
    const moodErrorEl = document.getElementById('mood-error');
    const moodNoteSection = document.getElementById('mood-note-section');
    const moodNote = document.getElementById('mood-note');
    const saveMoodBtn = document.getElementById('save-mood');
    const cancelMoodBtn = document.getElementById('cancel-mood');
    const moodHistoryEl = document.getElementById('mood-history');

    let selectedMood = null;
    let currentUser = null;

    // Get current user info
    try {
        const userData = JSON.parse(localStorage.getItem('current_user'));
        currentUser = userData.username;
        await loadMoodHistory();
    } catch (error) {
        console.error('Error getting user info:', error);
        window.location.href = 'Login.html';
        return;
    }

    // Mood button click handlers
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedMood = btn.dataset.mood;
            
            // Show mood note section
            moodNoteSection.classList.remove('hidden');
            moodNote.focus();
            
            // Clear previous feedback
            moodFeedbackEl.textContent = '';
            moodErrorEl.classList.add('hidden');
        });
    });

    // Save mood handler
    saveMoodBtn.addEventListener('click', async () => {
        if (!selectedMood || !currentUser) return;

        const note = moodNote.value.trim();
        const saveButton = saveMoodBtn;
        
        // Show loading state
        loadingUtils.showLoading(saveButton);
        moodErrorEl.classList.add('hidden');

        try {
            const moodData = {
                user_id: currentUser,
                mood: selectedMood.toLowerCase(),
                note: note || null
            };

            const response = await apiClient.logMood(moodData);
            
            // Show success feedback
            moodFeedbackEl.textContent = `Thanks for logging your mood as "${selectedMood}" today!`;
            moodFeedbackEl.style.color = '#10b981';
            
            // Clear the message after 3 seconds
            setTimeout(() => {
                moodFeedbackEl.textContent = '';
            }, 3000);

            // Hide note section and reset
            moodNoteSection.classList.add('hidden');
            moodNote.value = '';
            selectedMood = null;

            // Reload mood history
            await loadMoodHistory();

        } catch (error) {
            moodErrorEl.textContent = error.message;
            moodErrorEl.classList.remove('hidden');
        } finally {
            loadingUtils.hideLoading(saveButton, 'Save Mood');
        }
    });

    // Cancel mood handler
    cancelMoodBtn.addEventListener('click', () => {
        moodNoteSection.classList.add('hidden');
        moodNote.value = '';
        selectedMood = null;
        moodErrorEl.classList.add('hidden');
    });

    // Load mood history from backend
    async function loadMoodHistory() {
        try {
            const response = await apiClient.getMoodHistory(currentUser);
            displayMoodHistory(response.history);
        } catch (error) {
            console.error('Error loading mood history:', error);
        }
    }

    // Display mood history
    function displayMoodHistory(history) {
        if (!history || history.length === 0) {
            moodHistoryEl.innerHTML = '<p class="text-gray-500 text-center">No mood entries yet. Start tracking your mood!</p>';
            return;
        }

        const historyHTML = history.slice(0, 5).map(entry => {
            const date = new Date(entry.timestamp).toLocaleDateString();
            const time = new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const moodEmoji = getMoodEmoji(entry.mood);
            
            return `
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">${moodEmoji}</span>
                            <span class="font-medium capitalize">${entry.mood}</span>
                        </div>
                        <span class="text-sm text-gray-500">${date} ${time}</span>
                    </div>
                    ${entry.note ? `<p class="text-sm text-gray-600 mt-2">${entry.note}</p>` : ''}
                </div>
            `;
        }).join('');

        moodHistoryEl.innerHTML = historyHTML;
    }

    // Get emoji for mood
    function getMoodEmoji(mood) {
        const moodEmojis = {
            'awesome': '😊',
            'good': '🙂',
            'okay': '😐',
            'bad': '😟',
            'awful': '😢'
        };
        return moodEmojis[mood.toLowerCase()] || '😐';
    }
});