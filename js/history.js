// Display the Password History
document.addEventListener('DOMContentLoaded', displayHistory);

function displayHistory() {
    const historyList = document.getElementById('history-list');
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];

    // Clear the list before adding new elements
    historyList.innerHTML = '';

    if (history.length === 0) {
        // If no passwords are found in localStorage
        historyList.innerHTML = '<li>No passwords saved yet.</li>';
        return;
    }

    // Loop through the stored passwords and add them to the history list
    history.forEach(item => {
        let li = document.createElement('li');
        li.textContent = `${item.password} (Generated on: ${item.date})`;
        historyList.appendChild(li);
    });
}

// Back Button Event Listener
const backButton = document.getElementById('back-btn');
backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Clear History Button Event Listener
const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', clearHistory);

function clearHistory() {
    // Clear localStorage for passwordHistory
    localStorage.removeItem('passwordHistory');

    // Refresh the display
    displayHistory();

    alert('Password history cleared!');
}
