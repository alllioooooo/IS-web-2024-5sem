const AMOUNT_OF_SEEDS = 52
const SPEED = 1

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('DOMContentLoaded', () => {
    const seedContainer = document.getElementsByClassName("main-content")[0];

    [...Array(AMOUNT_OF_SEEDS).keys()].forEach(() => {
        const seed = document.createElement('span')
        seed.classList.add('seed')

        seedContainer.appendChild(seed)
    })

    const seeds = document.querySelectorAll('.seed');
    
    function animate(seed) {
        let x = 0;
        let y = 0;
        let xDirection = random(1, 10);
        let yDirection = random(1, 10);

        function moveDVD() {
          x += SPEED * xDirection;
          y += SPEED * yDirection;
        
          if (x >= seedContainer.offsetWidth - seed.offsetWidth || x <= 0) {
            xDirection *= -1;
          }
          if (y >= seedContainer.offsetHeight - seed.offsetHeight || y <= 0) {
            yDirection *= -1;
          }
          
          seed.style.left = x + 'px';
          seed.style.top = y + 'px';

          requestAnimationFrame(moveDVD)
        }

        requestAnimationFrame(moveDVD, 100);
    }
    
    for (const seed of seeds) {
        animate(seed)
    }
})