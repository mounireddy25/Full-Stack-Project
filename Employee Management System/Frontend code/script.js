// API Base URL
const API_URL = 'http://localhost:5000/api'; // Make sure your backend is running

// Register new user
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const userData = { name, email, password, role };

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
});

// Login user
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = { email, password };

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store JWT token
            window.location.href = 'profile.html';
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
});

// Fetch user profile
document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname === '/profile.html') {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please log in first');
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                document.getElementById('user-name').textContent = `Name: ${data.name}`;
                document.getElementById('user-email').textContent = `Email: ${data.email}`;
                document.getElementById('user-role').textContent = `Role: ${data.role}`;
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    }

    // Logout functionality
    if (window.location.pathname === '/profile.html') {
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});
