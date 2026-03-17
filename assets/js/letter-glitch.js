/**
 * LetterGlitch - Vanilla JS Port
 * Ported from ReactBits LetterGlitch
 */
class LetterGlitch {
    constructor(options = {}) {
        this.container = options.container;
        if (!this.container) throw new Error('LetterGlitch: Container element is required');

        this.glitchColors = options.glitchColors || ['#2b4539', '#61dca3', '#61b3dc'];
        this.glitchSpeed = options.glitchSpeed || 50;
        this.centerVignette = options.centerVignette !== undefined ? options.centerVignette : false;
        this.outerVignette = options.outerVignette !== undefined ? options.outerVignette : true;
        this.smooth = options.smooth !== undefined ? options.smooth : true;
        this.characters = options.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        // Only set default relative position if not already styled
        if (!this.container.style.position || this.container.style.position === 'static') {
            this.container.style.position = 'relative';
        }
        this.container.style.overflow = 'hidden';

        this.canvas.style.display = 'block';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        if (this.outerVignette) {
            const v = document.createElement('div');
            v.className = 'glitch-vignette-outer';
            this.container.appendChild(v);
        }
        if (this.centerVignette) {
            const v = document.createElement('div');
            v.className = 'glitch-vignette-center';
            this.container.appendChild(v);
        }

        this.letters = [];
        this.grid = { columns: 0, rows: 0 };
        this.fontSize = 16;
        this.charWidth = 10;
        this.charHeight = 20;
        this.lastGlitchTime = Date.now();
        this.animationFrame = null;
        this.lettersAndSymbols = Array.from(this.characters);

        this.init();
    }

    getRandomChar() {
        return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
    }

    getRandomColor() {
        return this.glitchColors[Math.floor(Math.random() * this.glitchColors.length)];
    }

    hexToRgb(hex) {
        if (hex.startsWith('rgb')) return hex;
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    interpolateColor(start, end, factor) {
        const result = {
            r: Math.round(start.r + (end.r - start.r) * factor),
            g: Math.round(start.g + (end.g - start.g) * factor),
            b: Math.round(start.b + (end.b - start.b) * factor)
        };
        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    }

    calculateGrid(width, height) {
        return {
            columns: Math.ceil(width / this.charWidth),
            rows: Math.ceil(height / this.charHeight)
        };
    }

    initializeLetters(columns, rows) {
        this.grid = { columns, rows };
        const totalLetters = columns * rows;
        this.letters = Array.from({ length: totalLetters }, () => ({
            char: this.getRandomChar(),
            color: this.getRandomColor(),
            targetColor: this.getRandomColor(),
            colorProgress: 1
        }));
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        // Use window dimensions for guaranteed full screen if container is large or not specified
        const rect = this.container.getBoundingClientRect();
        const width = Math.max(rect.width, window.innerWidth);
        const height = Math.max(rect.height, window.innerHeight);

        this.canvas.width = Math.floor(width * dpr);
        this.canvas.height = Math.floor(height * dpr);
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const { columns, rows } = this.calculateGrid(width, height);
        // Add a small buffer to columns and rows to ensure total coverage
        this.initializeLetters(columns + 2, rows + 2);
        this.draw();
    }

    draw() {
        if (!this.ctx || this.letters.length === 0) return;
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, rect.width, rect.height);
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.textBaseline = 'top';

        this.letters.forEach((letter, index) => {
            const x = (index % this.grid.columns) * this.charWidth;
            const y = Math.floor(index / this.grid.columns) * this.charHeight;
            this.ctx.fillStyle = letter.color;
            this.ctx.fillText(letter.char, x, y);
        });
    }

    update() {
        if (!this.letters || this.letters.length === 0) return;
        // Increase update density for a more active glitch
        const updateCount = Math.max(5, Math.floor(this.letters.length * 0.1));

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * this.letters.length);
            if (!this.letters[index]) continue;

            this.letters[index].char = this.getRandomChar();
            this.letters[index].targetColor = this.getRandomColor();

            if (!this.smooth) {
                this.letters[index].color = this.letters[index].targetColor;
                this.letters[index].colorProgress = 1;
            } else {
                this.letters[index].colorProgress = 0;
            }
        }
    }

    handleSmoothTransitions() {
        let needsRedraw = false;
        this.letters.forEach(letter => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05;
                if (letter.colorProgress > 1) letter.colorProgress = 1;

                const startRgb = this.hexToRgb(letter.color);
                const endRgb = this.hexToRgb(letter.targetColor);
                if (startRgb && endRgb) {
                    letter.color = this.interpolateColor(startRgb, endRgb, letter.colorProgress);
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) {
            this.draw();
        }
    }

    animate() {
        const now = Date.now();
        if (now - this.lastGlitchTime >= this.glitchSpeed) {
            this.update();
            this.draw();
            this.lastGlitchTime = now;
        }

        if (this.smooth) {
            this.handleSmoothTransitions();
        }

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    init() {
        this.resize();
        this.animate();

        this._resizeHandler = () => {
            cancelAnimationFrame(this.animationFrame);
            // Slight delay to ensure layout is updated
            setTimeout(() => {
                this.resize();
                this.animate();
            }, 50);
        };
        window.addEventListener('resize', this._resizeHandler);
    }

    destroy() {
        window.removeEventListener('resize', this._resizeHandler);
        cancelAnimationFrame(this.animationFrame);
        if (this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}
