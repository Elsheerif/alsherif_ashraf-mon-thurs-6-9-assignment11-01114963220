// Select input and feedback elements
const useremail = document.getElementById('email');
const userpassword = document.getElementById('password');
const username = document.getElementById('name');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const success = document.getElementById('success');

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,16}$/;

document.addEventListener('DOMContentLoaded', () => {
    // Attach submit event to login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            login();
        });
    }
    // Attach submit event to signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            signUp();
        });
    }
    // Attach click event to logout button if present
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logOut);
    }
});

function validateUsername(name) {
    if (!name || name.trim() === "") {
        if (nameError) {
            nameError.textContent = "Name is required";
            nameError.style.display = "block";
        }
        return false;
    }
    if (nameError) nameError.style.display = "none";
    return true;
}

function validateEmail(email) {
    if (!email || email.trim() === "") {
        if (emailError) {
            emailError.textContent = "Email is required";
            emailError.style.display = "block";
        }
        return false;
    }
    if (!regexEmail.test(email)) {
        if (emailError) {
            emailError.textContent = "Invalid email format";
            emailError.style.display = "block";
        }
        return false;
    }
    if (emailError) emailError.style.display = "none";
    return true;
}

function validatePassword(password) {
    if (!password || password.trim() === "") {
        if (passwordError) {
            passwordError.textContent = "Password is required";
            passwordError.style.display = "block";
        }
        return false;
    }
    if (!regexPassword.test(password)) {
        if (passwordError) {
            passwordError.textContent = "Password must be 6-16 characters, with at least one letter and one number.";
            passwordError.style.display = "block";
        }
        return false;
    }
    if (passwordError) passwordError.style.display = "none";
    return true;
}

function clearForm() {
    if (useremail) useremail.value = "";
    if (userpassword) userpassword.value = "";
    if (username) username.value = "";
}

function resetMessages() {
    if (nameError) nameError.style.display = "none";
    if (emailError) emailError.style.display = "none";
    if (passwordError) passwordError.style.display = "none";
    if (success) {
        success.textContent = "";
        success.style.display = "none";
    }
}

function login() {
    resetMessages();
    if (!useremail || !userpassword) return;
    const validEmail = validateEmail(useremail.value);
    const validPassword = validatePassword(userpassword.value);
    if (validEmail && validPassword) {
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userpassword");
        if (useremail.value === storedEmail && userpassword.value === storedPassword) {
            clearForm();
            if (success) {
                success.textContent = "Login successful!";
                success.style.color = "green";
                success.style.display = "block";
            }
            setTimeout(() => {
                window.location.href = "welcome.html";
            }, 500);
        } else {
            if (success) {
                success.textContent = "Invalid email or password!";
                success.style.color = "red";
                success.style.display = "block";
            }
        }
    }
}

function signUp() {
    resetMessages();
    if (!useremail || !userpassword || !username) return;
    const validEmail = validateEmail(useremail.value);
    const validPassword = validatePassword(userpassword.value);
    const validUsername = validateUsername(username.value);
    if (validEmail && validPassword && validUsername) {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail === useremail.value) {
            if (emailError) {
                emailError.textContent = "Email already registered!";
                emailError.style.display = "block";
            }
            return;
        }
        localStorage.setItem("username", username.value);
        localStorage.setItem("userEmail", useremail.value);
        localStorage.setItem("userpassword", userpassword.value);
        clearForm();
        if (success) {
            success.textContent = "Signup successful!";
            success.style.color = "green";
            success.style.display = "block";
        }
        setTimeout(() => {
            window.location.href = "login.html";
        }, 500);
    }
}

function logOut() {
    resetMessages();
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
}