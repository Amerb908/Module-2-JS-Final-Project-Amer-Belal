# Password Generator

This project is a customizable password generator that allows users to generate strong, secure passwords. The password generator includes features such as:
- Customizable password length
- Option to include uppercase letters, numbers, special characters, and even Greek words
- A strength meter that evaluates the security of the generated password, based on length, character variety, and pattern analysis
- An option to copy the generated password to the clipboard

## Features
- **Password Length**: Set the desired length of your password (between 8 and 128 characters).
- **Uppercase Letters**: Option to include uppercase letters.
- **Numbers**: Option to include numbers.
- **Special Characters**: Option to include special characters like `!@#$%^&*()`.
- **Greek Words**: Option to insert a randomly selected Greek word into the password to make it even more unique.
- **Strength Meter**: A visual strength meter that rates the password's strength (Very Weak, Moderate, Strong, Very Strong) and provides a breakdown of the password's strengths and weaknesses.
- **Copy to Clipboard**: One-click option to copy the generated password.

## How It Works
The password is generated based on the selected options (e.g., uppercase letters, numbers, special characters, Greek words). A random password is created, ensuring it contains at least one of each type of character (if selected). If the user selects the option to include Greek words, a randomly chosen Greek word is inserted into the password.

The strength of the password is evaluated based on:
- **Length**: Passwords of greater length score higher.
- **Character Variety**: Passwords that include lowercase letters, uppercase letters, numbers, and special characters score higher.
- **Patterns**: Passwords with repeated or sequential characters (e.g., "12345" or "aaaa") are penalized.

The strength meter visually indicates the password's strength in real-time.

## Example Usage
You can test the live password generator by visiting the link below:

[**Try the Password Generator**](https://amerb908.github.io/Module-2-JS-Final-Project-Amer-Belal/)  

