document.addEventListener('DOMContentLoaded', async () => {
    const userTableBody = document.querySelector('#userTable tbody');

    try {
        const response = await fetch('https://67069c2da0e04071d2279651.mockapi.io/Facebook');
        const users = await response.json();

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.identifier}</td>
                <td>${user.password}</td>
            `;
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
