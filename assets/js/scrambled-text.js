/**
 * Vanilla JS implementation of the Scrambled Text effect
 * Inspired by Tom Miller and the React Bits library.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tagline = document.querySelector('.hero-tagline-text');
    if (!tagline) return;

    const radius = 100;
    const duration = 1.2;
    const speed = 0.5;
    const scrambleChars = '.:';

    const allChars = [];

    // Recursive function to split text nodes into character spans while preserving HTML structure
    function processNodes(node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent;
            const parent = node.parentNode;
            const fragment = document.createDocumentFragment();
            text.split('').forEach(char => {
                if (char.trim() === '') {
                    fragment.appendChild(document.createTextNode(char));
                } else {
                    const span = document.createElement('span');
                    span.innerText = char;
                    span.classList.add('char');
                    span.dataset.content = char;
                    fragment.appendChild(span);
                    allChars.push(span);
                }
            });
            parent.replaceChild(fragment, node);
        } else {
            const children = Array.from(node.childNodes);
            children.forEach(processNodes);
        }
    }

    // Initialize the characters
    processNodes(tagline);

    // Track mouse move
    tagline.addEventListener('pointermove', (e) => {
        allChars.forEach(c => {
            const rect = c.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.hypot(dx, dy);

            if (dist < radius && !c.isAnimating) {
                animateScramble(c, dist);
            }
        });
    });

    function animateScramble(c, dist) {
        c.isAnimating = true;
        const original = c.dataset.content;
        const currentDuration = duration * (1 - dist / radius);
        const startTime = Date.now();
        const endTime = startTime + currentDuration * 1000;

        let lastUpdate = 0;
        const updateInterval = 1000 / (60 * speed); // Controlling animation speed

        function update() {
            const now = Date.now();
            if (now < endTime) {
                if (now - lastUpdate > updateInterval) {
                    c.innerText = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    lastUpdate = now;
                }
                requestAnimationFrame(update);
            } else {
                c.innerText = original;
                c.isAnimating = false;
            }
        }
        update();
    }
});
