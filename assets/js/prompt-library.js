class PromptLibrary {
    constructor() {
        this.prompts = promptsDatabase; // Base de données des prompts
        this.categories = this.getUniqueCategories();
        this.init();
    }

    getUniqueCategories() {
        return [...new Set(this.prompts.map(prompt => prompt.category))];
    }

    init() {
        this.renderCategories();
        this.setupEventListeners();
    }

    renderCategories() {
        const container = document.getElementById('prompt-library-content');
        if (!container) return;

        const html = this.categories.map(category => {
            const categoryPrompts = this.prompts.filter(p => p.category === category);
            const categoryName = categoryPrompts[0].categoryName;
            
            return `
                <div class="prompt-category">
                    <h3 class="category-title">${categoryName}</h3>
                    <div class="prompts-grid">
                        ${categoryPrompts.map(prompt => this.renderPromptCard(prompt)).join('')}
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = html;
    }

    renderPromptCard(prompt) {
        return `
            <div class="prompt-card" data-prompt-id="${prompt.id}">
                <div class="prompt-header">
                    <span class="prompt-subcategory">${prompt.subcategory}</span>
                </div>
                <p class="prompt-text">${prompt.text}</p>
                <button class="copy-button" data-prompt="${prompt.text}">
                    <i class="fas fa-copy"></i>
                    Copier
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.copy-button')) {
                const button = e.target.closest('.copy-button');
                const promptText = button.dataset.prompt;
                this.copyToClipboard(promptText, button);
            }
        });
    }

    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copié !';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        });
    }
} 