const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

const style = document.createElement('style');
style.innerHTML = `
            .dark-mode {
                background-color: #121212;
                color: #ffffff;
            }
            .dark-mode table {
                border-color: #333333;
            }
            .dark-mode th {
                background-color: #333333;
            }
            .dark-mode td {
                border-color: #333333;
            }
            .dark-mode nav {
                background-color: #333333;
                color: #ffffff;
                border-color: #444444;
            }
            .dark-mode nav ul li a {
                color: #ffffff;
            }
            .dark-mode nav ul li a:hover {
                color: #007acc;
            }
        `;
document.head.appendChild(style);

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Make the nav draggable
const nav = document.querySelector('nav');
let isDragging = false;
let offsetX, offsetY;

nav.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - nav.offsetLeft;
    offsetY = e.clientY - nav.offsetTop;
    nav.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        nav.style.left = `${e.clientX - offsetX}px`;
        nav.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    nav.style.cursor = 'move';
});