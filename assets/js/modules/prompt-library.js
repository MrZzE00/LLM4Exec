/**
 * Gestion de la bibliothèque de prompts
 */
class PromptLibrary {
    constructor() {
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        this.renderCategoryFilters();
        this.displayPrompts(promptsDatabase);
        this.setupEventListeners();
        
        this.initialized = true;
    }
    
    renderCategoryFilters() {
        const filterContainer = document.getElementById('categoryFilters');
        
        let html = '';
        promptCategories.forEach(category => {
            const activeClass = category.id === 'all' ? 'active' : '';
            html += `
                <button class="category-filter ${activeClass}" data-category="${category.id}">
                    ${category.name}
                </button>
            `;
        });
        
        filterContainer.innerHTML = html;
    }
    
    displayPrompts(prompts) {
        const container = document.getElementById('prompts-container');
        
        if (prompts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Aucun prompt ne correspond à votre recherche.</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        prompts.forEach(prompt => {
            html += `
                <div class="prompt-card">
                    <div class="prompt-card-header">
                        <div class="prompt-card-categories">
                            <span class="prompt-category">${prompt.categoryName}</span>
                            <span class="prompt-subcategory">${prompt.subcategory}</span>
                        </div>
                        <div class="prompt-actions">
                            <button class="prompt-action-button copy-prompt" data-id="${prompt.id}" title="Copier">
                                <i class="far fa-copy"></i>
                            </button>
                            <button class="prompt-action-button save-prompt" data-id="${prompt.id}" title="Sauvegarder">
                                <i class="far fa-bookmark"></i>
                            </button>
                        </div>
                    </div>
                    <p class="prompt-text">${prompt.text}</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
        this.setupPromptActions();
    }
    
    setupEventListeners() {
        // Category filters
        document.querySelectorAll('.category-filter').forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.category-filter').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                
                // Filter prompts
                const category = button.getAttribute('data-category');
                const searchText = document.getElementById('prompt-search').value.toLowerCase();
                
                this.filterPrompts(category, searchText);
            });
        });
        
        // Search
        const searchInput = document.getElementById('prompt-search');
        const searchButton = document.getElementById('search-button');
        
        searchButton.addEventListener('click', () => {
            this.performSearch();
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }
    
    performSearch() {
        const searchText = document.getElementById('prompt-search').value.toLowerCase();
        const activeCategory = document.querySelector('.category-filter.active').getAttribute('data-category');
        
        this.filterPrompts(activeCategory, searchText);
    }
    
    filterPrompts(category, searchText) {
        let filteredPrompts = promptsDatabase;
        
        if (category !== 'all') {
            filteredPrompts = filteredPrompts.filter(prompt => prompt.category === category);
        }
        
        if (searchText) {
            filteredPrompts = filteredPrompts.filter(prompt => 
                prompt.text.toLowerCase().includes(searchText) || 
                prompt.categoryName.toLowerCase().includes(searchText) ||
                prompt.subcategory.toLowerCase().includes(searchText)
            );
        }
        
        this.displayPrompts(filteredPrompts);
    }
    
    setupPromptActions() {
        // Copy prompt
        document.querySelectorAll('.copy-prompt').forEach(button => {
            button.addEventListener('click', () => {
                const promptId = button.getAttribute('data-id');
                const prompt = promptsDatabase.find(p => p.id === promptId);
                
                if (prompt) {
                    navigator.clipboard.writeText(prompt.text)
                        .then(() => {
                            // Visual feedback
                            const icon = button.querySelector('i');
                            icon.classList.remove('far', 'fa-copy');
                            icon.classList.add('fas', 'fa-check');
                            button.classList.add('copied');
                            
                            // Reset after 2 seconds
                            setTimeout(() => {
                                icon.classList.remove('fas', 'fa-check');
                                icon.classList.add('far', 'fa-copy');
                                button.classList.remove('copied');
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Erreur lors de la copie: ', err);
                        });
                }
            });
        });
        
        // Save prompt
        document.querySelectorAll('.save-prompt').forEach(button => {
            button.addEventListener('click', () => {
                const icon = button.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    // Save
                    icon.classList.remove('far', 'fa-bookmark');
                    icon.classList.add('fas', 'fa-bookmark');
                    button.classList.add('saved');
                } else {
                    // Unsave
                    icon.classList.remove('fas', 'fa-bookmark');
                    icon.classList.add('far', 'fa-bookmark');
                    button.classList.remove('saved');
                }
            });
        });
    }
} 