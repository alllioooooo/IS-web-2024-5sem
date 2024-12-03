document.addEventListener("DOMContentLoaded", () => {
    const registrationButton = document.getElementById('registration-btn');

    if (!registrationButton) return;

    registrationButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (window.innerWidth <= 768) {
            window.location.href = 'https://fitp.itmo.ru/files/lgd.pdf';
        } else {
            window.location.href = 'pages/registration.html';
        }
    });
});
