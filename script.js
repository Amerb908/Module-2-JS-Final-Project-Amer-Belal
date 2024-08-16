const lengthInput = document.getElementById('length');
const uppercaseInput = document.getElementById('uppercase');
const numbersInput = document.getElementById('numbers');
const specialInput = document.getElementById('special');
const greekInput = document.getElementById('greek'); // Checkbox for Greek words
const generateButton = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const copyButton = document.getElementById('copy');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const scoreBreakdown = document.getElementById('score-breakdown');

// Array of Greek words
const greekWords = [
    "αγάπη", "ελπίδα", "φως", "ψυχή", "αλήθεια", "χρόνος", "γνώση",
    "κλέος", "οδύσσεια", "σοφία", "δάκρυα", "ισχύς", "πίστη", "δόξα"
];

generateButton.addEventListener('click', () => {
    generatePassword();
    updateStrengthMeter(passwordInput.value);
});

copyButton.addEventListener('click', copyPassword);

function generatePassword() {
    const length = parseInt(lengthInput.value);
    const uppercase = uppercaseInput.checked;
    const numbers = numbersInput.checked;
    const special = specialInput.checked;
    const includeGreek = greekInput.checked;
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let password = '';

    if (uppercase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (numbers) {
        characters += '0123456789';
    }
    if (special) {
        characters += '!@#$%^&*()_+-={}:<>?,./';
    }

    // Basic random character generation
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Ensure password includes at least one of each selected character type
    if (uppercase && !password.match(/[A-Z]/)) {
        password = password.slice(0, -1) + getRandomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (numbers && !password.match(/[0-9]/)) {
        password = password.slice(0, -1) + getRandomCharacter('0123456789');
    }
    if (special && !password.match(/[^a-zA-Z0-9]/)) {
        password = password.slice(0, -1) + getRandomCharacter('!@#$%^&*()_+-={}:<>?,./');
    }

    // If Greek words are enabled, add a Greek word randomly into the password
    if (includeGreek) {
        const greekWord = greekWords[Math.floor(Math.random() * greekWords.length)];
        const insertIndex = Math.floor(Math.random() * (password.length + 1));
        password = password.slice(0, insertIndex) + greekWord + password.slice(insertIndex);
    }

    passwordInput.value = password;
}

function getRandomCharacter(characters) {
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

function copyPassword() {
    passwordInput.select();
    document.execCommand('copy');
}

function calculateStrength(password) {
    let strength = 0;
    let breakdown = []; // For the score breakdown
    
    // Length points
    if (password.length >= 8) { 
        strength += 10; 
        console.log("+10 for minimum length of 8 characters");
    } 
    if (password.length >= 12) {
        strength += 10;
        console.log("+10 for length of 12 characters");
    }
    if (password.length >= 16) {
        strength += 10;
        console.log("+10 for length of 16 characters");
    }
    if (password.length >= 20) {
        strength += 10;
        console.log("+10 for length of 20+ characters");
    }

    // Character variety
    if (/[a-z]/.test(password)) {
        strength += 5;
        console.log("+5 for using lowercase letters");
    }
    if (/[A-Z]/.test(password)) {
        strength += 10;
        console.log("+10 for using uppercase letters");
    }
    if (/[0-9]/.test(password)) {
        strength += 10;
        console.log("+10 for using numbers");
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
        strength += 15;
        console.log("+15 for using special characters");
    }

    // Penalize repetition
    if (/([a-zA-Z0-9])\1\1/.test(password)) {
        strength -= 10;
        console.log("-10 for repeated characters");
    }

    // Penalize sequences (e.g., 1234, abcd)
    if (password.match(/(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh)/)) {
        strength -= 15;
        console.log("-15 for sequential characters");
    }

    // Penalize common keyboard patterns
    if (/qwerty|asdf|zxcv|12345|password|admin/.test(password.toLowerCase())) {
        strength -= 20;
        console.log("-20 for common keyboard patterns or weak passwords");
    }

    // Cap the score between 0 and 100
    if (strength > 100) strength = 100;
    if (strength < 0) strength = 0;

    return { strength, breakdown };
}

function updateStrengthMeter(password) {
    const { strength, breakdown } = calculateStrength(password);

    // Update the strength bar based on the score
    strengthBar.style.width = strength + '%';
    if (strength <= 30) {
        strengthBar.style.backgroundColor = 'red';
        strengthText.textContent = 'Very Weak';
    } else if (strength <= 60) {
        strengthBar.style.backgroundColor = 'yellow';
        strengthText.textContent = 'Moderate';
    } else if (strength <= 80) {
        strengthBar.style.backgroundColor = 'lightgreen';
        strengthText.textContent = 'Strong';
    } else if (strength <= 85) {
        strengthBar.style.backgroundColor = 'green';
        strengthText.textContent = 'Very Strong';
    }

    // Clear previous breakdown
    scoreBreakdown.innerHTML = '';

    // Add new breakdown
    breakdown.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        scoreBreakdown.appendChild(li);
    });
}

let secretClicks = 0;

document.getElementById('secret-button').addEventListener('click', () => {
	secretClicks++;
	if (secretClicks >= 10) { // Changed to 10 clicks
		window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		secretClicks = 0; // Reset the click counter
	}
});
