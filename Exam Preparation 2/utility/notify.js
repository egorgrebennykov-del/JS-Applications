export function showError(message) {
    const errorBox = document.getElementById('errorBox');
    const span = errorBox.querySelector('span');

    span.textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);

    // ❗ ДОБАВЬ ЭТО
    alert(message);
}