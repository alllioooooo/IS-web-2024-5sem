(() => {
    window.addEventListener('load', () => {
        performance.mark('pageEnd');
        const loadTime = performance.now();
        const loadTimeSpan = document.querySelector('.load-time');
        if (loadTimeSpan) {
            loadTimeSpan.innerHTML = `Page loaded in ${Math.floor(loadTime)} ms.`;
        }
    });
})();

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.nav-button').forEach(function(button) {
        button.addEventListener('mouseover', function() {
            button.style.boxShadow = '0 0 10px orange';
        });

        button.addEventListener('mouseout', function() {
            button.style.boxShadow = 'none';
        });
    });
});
