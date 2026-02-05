
class TotoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'toto-generator');

    const h1 = document.createElement('h1');
    h1.textContent = 'Toto Number Generator';

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers-container');

    const style = document.createElement('style');
    style.textContent = `
      .toto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;
        margin-top: 50px;
        background-color: var(--background-color);
        color: var(--text-color);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: var(--text-color);
      }

      button {
        padding: 10px 20px;
        font-size: 1.2rem;
        cursor: pointer;
        margin-bottom: 20px;
        border: none;
        border-radius: 5px;
        background-color: var(--button-background);
        color: var(--button-text);
        transition: background-color 0.3s, color 0.3s;
      }

      .numbers-container {
        display: flex;
        gap: 10px;
      }

      .number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--number-background);
        color: var(--number-text);
        font-size: 1.5rem;
        font-weight: bold;
        transition: background-color 0.3s, color 0.3s;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(h1);
    wrapper.appendChild(button);
    wrapper.appendChild(numbersContainer);

    button.addEventListener('click', () => {
      this.generateNumbers();
    });
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.numbers-container');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }

    for (const number of numbers) {
      const numberDiv = document.createElement('div');
      numberDiv.setAttribute('class', 'number');
      numberDiv.textContent = number;
      numbersContainer.appendChild(numberDiv);
    }
  }
}

customElements.define('toto-generator', TotoGenerator);

// Theme toggling logic
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
  }

  themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
});
