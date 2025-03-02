/**
 * Gestion du menu latéral
 */
class Sidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.burgerMenu = document.getElementById('burgerMenu');
        this.closeMenu = document.getElementById('closeMenu');
        this.overlay = document.getElementById('overlay');
        this.sidebarContent = document.getElementById('sidebarContent');
        
        this.init();
    }
    
    init() {
        this.renderModules();
        this.setupEventListeners();
    }
    
    renderModules() {
        let html = '';
        
        courseModules.forEach(module => {
            html += `
                <div class="module-wrapper">
                    <div class="module-title" data-module="${module.id}">
                        ${module.title}
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="module-content" id="${module.id}">
                        ${module.items.map(item => `
                            <div class="sub-item">
                                <a href="#" data-url="${item.url}" data-id="${item.id}">
                                    ${item.title}
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        this.sidebarContent.innerHTML = html;
        this.setupModuleToggles();
    }
    
    setupEventListeners() {
        // Toggle sidebar
        this.burgerMenu.addEventListener('click', () => this.openSidebar());
        
        // Close sidebar
        this.closeMenu.addEventListener('click', () => this.closeSidebar());
        this.overlay.addEventListener('click', () => this.closeSidebar());
    }
    
    setupModuleToggles() {
        const moduleTitles = document.querySelectorAll('.module-title');
        
        moduleTitles.forEach(title => {
            title.addEventListener('click', function() {
                const moduleId = this.getAttribute('data-module');
                const moduleContent = document.getElementById(moduleId);
                
                // Close all other modules
                document.querySelectorAll('.module-content').forEach(content => {
                    if (content.id !== moduleId) {
                        content.classList.remove('open');
                    }
                });
                
                // Toggle current module
                moduleContent.classList.toggle('open');
            });
        });
    }
    
    openSidebar() {
        this.sidebar.classList.add('open');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        document.querySelector('.main-content').classList.add('sidebar-open');
    }
    
    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        document.querySelector('.main-content').classList.remove('sidebar-open');
    }
} 