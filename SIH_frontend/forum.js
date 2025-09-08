document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    if (!authUtils.isLoggedIn()) {
        window.location.href = 'Login.html';
        return;
    }

    const newDiscussionBtn = document.getElementById('new-discussion-btn');

    if (newDiscussionBtn) {
        newDiscussionBtn.addEventListener('click', () => {
            // For now, show a coming soon message
            // In the future, this could open a modal or redirect to a discussion creation page
            alert('The feature to start a new discussion is coming soon! We\'re working on integrating this with our backend forum system.');
        });
    }

    // Add user info display
    try {
        const userData = JSON.parse(localStorage.getItem('current_user'));
        if (userData && userData.username) {
            // You could display the username somewhere in the forum if needed
            console.log('Forum user:', userData.username);
        }
    } catch (error) {
        console.error('Error getting user info:', error);
    }
});