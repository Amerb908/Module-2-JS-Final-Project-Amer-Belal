const lengthInput = document.getElementById('length');
const uppercaseInput = document.getElementById('uppercase');
const numbersInput = document.getElementById('numbers');
const specialInput = document.getElementById('special');
const generateButton = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const copyButton = document.getElementById('copy');

generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyPassword);

function generatePassword() {
	const length = parseInt(lengthInput.value);
	const uppercase = uppercaseInput.checked;
	const numbers = numbersInput.checked;
	const special = specialInput.checked;
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

	passwordInput.value = password;
}

function getRandomCharacter(characters) {
	return characters.charAt(Math.floor(Math.random() * characters.length));
}

function copyPassword() {
	passwordInput.select();
	document.execCommand('copy');
}

let secretClicks = 0;

document.getElementById('secret-button').addEventListener('click', () => {
	secretClicks++;
	if (secretClicks >= 10) { // Changed to 10 clicks
		window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		secretClicks = 0; // Reset the click counter
	}
});