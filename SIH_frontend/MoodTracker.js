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
    const quickSaveMoodBtn = document.getElementById('quick-save-mood');
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

    // Quick save mood handler (no note required)
    quickSaveMoodBtn.addEventListener('click', async () => {
        if (!selectedMood || !currentUser) return;

        const saveButton = quickSaveMoodBtn;
        
        // Show loading state
        loadingUtils.showLoading(saveButton);
        moodErrorEl.classList.add('hidden');

        try {
            const moodData = {
                user_id: currentUser,
                mood: selectedMood.toLowerCase(),
                note: null
            };

            const response = await apiClient.logMood(moodData);
            
            // Add gamification XP
            if (window.gamification) {
                await window.gamification.handleMoodLogged();
            }
            
            // Show success feedback
            moodFeedbackEl.textContent = `Mood "${selectedMood}" logged successfully! 🎉`;
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
            loadingUtils.hideLoading(saveButton, 'Quick Save');
        }
    });

    // Save mood handler (with note)
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
            
            // Add gamification XP
            if (window.gamification) {
                await window.gamification.handleMoodLogged();
                if (note) {
                    await window.gamification.handleMoodNoteWritten();
                }
            }
            
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
            loadingUtils.hideLoading(saveButton, 'Save with Note');
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
            console.log('Loading mood history for user:', currentUser);
            const response = await apiClient.getMoodHistory(currentUser);
            console.log('Mood history response:', response);
            displayMoodHistory(response.history);
        } catch (error) {
            console.error('Error loading mood history:', error);
            moodErrorEl.textContent = `Failed to load mood history: ${error.message}`;
            moodErrorEl.classList.remove('hidden');
        }
    }

    // Display mood history
    function displayMoodHistory(history) {
        console.log('Displaying mood history:', history);
        if (!history || history.length === 0) {
            console.log('No mood history found, showing empty message');
            moodHistoryEl.innerHTML = '<p class="text-gray-500 text-center">No mood entries yet. Start tracking your mood!</p>';
            return;
        }

        const historyHTML = history.slice(0, 5).map(entry => {
            console.log('Processing mood entry:', entry);
            const date = new Date(entry.timestamp).toLocaleDateString();
            const time = new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const moodEmoji = getMoodEmoji(entry.mood);
            
            return `
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mb-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">${moodEmoji}</span>
                            <span class="font-medium capitalize">${entry.mood}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-500">${date} ${time}</span>
                            <button 
                                class="delete-mood-btn"
                                data-mood-id="${entry._id}"
                                title="Delete this mood entry"
                            >
                                <i class="fas fa-trash"></i> 🗑️
                            </button>
                        </div>
                    </div>
                    ${entry.note ? `<p class="text-sm text-gray-600 mt-2">${entry.note}</p>` : ''}
                </div>
            `;
        }).join('');

        console.log('Generated history HTML:', historyHTML);
        moodHistoryEl.innerHTML = historyHTML;
        
        // Add event listeners to delete buttons
        addDeleteButtonListeners();
    }

    // Add event listeners to delete buttons
    function addDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.delete-mood-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const moodId = button.dataset.moodId;
                
                // Show confirmation dialog
                if (confirm('Are you sure you want to delete this mood entry? This action cannot be undone.')) {
                    await deleteMoodEntry(moodId, button);
                }
            });
        });
    }

    // Delete mood entry
    async function deleteMoodEntry(moodId, buttonElement) {
        try {
            // Show loading state on the button
            const originalHTML = buttonElement.innerHTML;
            buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            buttonElement.disabled = true;

            // Call API to delete mood
            await apiClient.deleteMood(moodId);
            
            // Show success feedback
            moodFeedbackEl.textContent = 'Mood entry deleted successfully!';
            moodFeedbackEl.style.color = '#10b981';
            
            // Clear the message after 3 seconds
            setTimeout(() => {
                moodFeedbackEl.textContent = '';
            }, 3000);

            // Reload mood history to reflect changes
            await loadMoodHistory();

        } catch (error) {
            console.error('Error deleting mood:', error);
            moodErrorEl.textContent = `Failed to delete mood: ${error.message}`;
            moodErrorEl.classList.remove('hidden');
            
            // Reset button state
            buttonElement.innerHTML = originalHTML;
            buttonElement.disabled = false;
        }
    }

    // Get emoji for mood
    function getMoodEmoji(mood) {
        const moodEmojis = {
            'happy': '😊',
            'excited': '🤩',
            'content': '🙂',
            'calm': '😌',
            'sad': '😢',
            'anxious': '😰',
            'stressed': '😫',
            'angry': '😠',
            'confused': '😕',
            'grateful': '🙏',
            'lonely': '😔',
            'overwhelmed': '😵'
        };
        return moodEmojis[mood.toLowerCase()] || '😐';
    }
});