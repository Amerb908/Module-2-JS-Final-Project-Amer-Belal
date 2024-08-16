// Elements
const generateButton = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const copyButton = document.getElementById('copy');
const saveButton = document.getElementById('save');
const historyButton = document.getElementById('history-btn');

// Event Listeners
generateButton.addEventListener('click', () => {
    generatePassword();
    updateStrengthMeter(passwordInput.value);
});

copyButton.addEventListener('click', copyPassword);
saveButton.addEventListener('click', savePasswordToHistory);

historyButton.addEventListener('click', () => {
    window.location.href = 'history.html';
});

// Password Generation Function
function generatePassword() {
    const lengthInput = document.getElementById('length').value;
    const uppercaseInput = document.getElementById('uppercase').checked;
    const numbersInput = document.getElementById('numbers').checked;
    const specialInput = document.getElementById('special').checked;
    const greekInput = document.getElementById('greek').checked;

    const length = parseInt(lengthInput);
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let password = '';

    // Add character sets based on options selected
    if (uppercaseInput) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbersInput) characters += '0123456789';
    if (specialInput) characters += '!@#$%^&*()_+-={}:<>?,./';
    if (greekInput) characters += 'αβγδεζηθικλμνξοπρστυφχψω';

    // Generate password from available character sets
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    passwordInput.value = password;
}

// Copy Password Function
function copyPassword() {
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

// Save Password to Local Storage Function
function savePasswordToHistory() {
    const password = passwordInput.value;

    if (password) {
        let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];

        // Add the new password to the history with a timestamp
        history.push({ password, date: new Date().toLocaleString() });

        // Save updated history back to localStorage
        localStorage.setItem('passwordHistory', JSON.stringify(history));

        alert('Password saved successfully!');
    } else {
        alert('No password to save!');
    }
}

// Password Strength Meter Function
function updateStrengthMeter(password) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');
    
    let strength = 0;

    // Increase strength based on password composition
    if (/[A-Z]/.test(password)) strength++;   // Uppercase letters
    if (/[0-9]/.test(password)) strength++;   // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) strength++;  // Special characters
    if (password.length >= 12) strength++;  // Minimum length of 12 characters

    // Update strength meter based on the strength score
    if (strength === 0) {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = 'red';
        strengthLabel.textContent = 'Very Weak';
    } else if (strength === 1) {
        strengthBar.style.width = '25%';
        strengthBar.style.backgroundColor = 'red';
        strengthLabel.textContent = 'Weak';
    } else if (strength === 2) {
        strengthBar.style.width = '50%';
        strengthBar.style.backgroundColor = 'yellow';
        strengthLabel.textContent = 'Medium';
    } else if (strength === 3) {
        strengthBar.style.width = '75%';
        strengthBar.style.backgroundColor = 'green';
        strengthLabel.textContent = 'Strong';
    } else if (strength === 4) {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'green';
        strengthLabel.textContent = 'Very Strong';
    }
}

let secretClicks = 0;

document.getElementById('secret-button').addEventListener('click', () => {
	secretClicks++;
	if (secretClicks >= 10) { // Changed to 10 clicks
		window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		secretClicks = 0; // Reset the click counter
	}
});
