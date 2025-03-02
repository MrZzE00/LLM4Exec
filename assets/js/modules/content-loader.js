/**
 * Gestion du chargement du contenu
 */
class ContentLoader {
    constructor() {
        this.content = document.getElementById('content');
        this.contentContainer = document.getElementById('contentContainer');
        this.sidebar = document.getElementById('sidebar');
        
        this.init();
    }
    
    init() {
        this.setupContentLinks();
    }
    
    setupContentLinks() {
        // Utiliser MutationObserver pour détecter les nouveaux liens ajoutés au DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    document.querySelectorAll('.sub-item a').forEach(link => {
                        if (!link.hasAttribute('data-initialized')) {
                            link.setAttribute('data-initialized', 'true');
                            link.addEventListener('click', (e) => {
                                e.preventDefault();
                                
                                const url = link.getAttribute('data-url');
                                const title = link.textContent.trim();
                                
                                console.log("Link clicked:", url, title);
                                this.loadContent(url, title);
                            });
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Initialiser les liens existants
        document.querySelectorAll('.sub-item a').forEach(link => {
            link.setAttribute('data-initialized', 'true');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const url = link.getAttribute('data-url');
                const title = link.textContent.trim();
                
                console.log("Link clicked:", url, title);
                this.loadContent(url, title);
            });
        });
    }
    
    loadContent(url, title) {
        console.log("Loading content:", url, title);
        
        // Update page title
        document.querySelector('.page-title').textContent = title;
        document.querySelector('.page-description').style.display = 'none';
        
        // Show loading state
        this.content.classList.remove('loaded');
        this.content.innerHTML = '<div class="loader"></div>';
        
        // Close sidebar on mobile
        if (window.innerWidth < 768) {
            window.sidebarInstance.closeSidebar();
        }
        
        // Check if it's the prompt library
        if (url === 'prompt-library') {
            console.log("Loading prompt library");
            
            // Chargement direct sans délai
            const template = document.getElementById('prompt-library-template');
            if (!template) {
                console.error("Template not found");
                this.content.innerHTML = '<p>Erreur: Template de bibliothèque non trouvé</p>';
                return;
            }
            
            this.content.innerHTML = template.innerHTML;
            
            // Initialize the prompt library
            if (window.promptLibraryInstance) {
                window.promptLibraryInstance.init();
            } else {
                console.error("Prompt library instance not found");
            }
            
            // Show content with animation
            setTimeout(() => {
                this.content.classList.add('loaded');
            }, 100);
        } else {
            // Load content in iframe after a short delay
            setTimeout(() => {
                this.content.innerHTML = `
                    <div class="iframe-container">
                        <iframe class="responsive-iframe" src="${url}" title="${title}" allowfullscreen></iframe>
                    </div>
                `;
                
                // Show content with animation
                setTimeout(() => {
                    this.content.classList.add('loaded');
                }, 100);
            }, 500);
        }
    }
} 