class TrainingManager {
    constructor() {
        this.currentModule = null;
        this.contentFrame = document.getElementById('content-frame');
        this.modulesList = document.getElementById('modules-list');
        this.progressData = this.loadProgress();
        
        // Configuration complète des modules avec les URLs réelles
        this.modules = {
            module1: {
                title: "Comprendre les LLM",
                lessons: [
                    { id: "1.1", title: "Les LLM expliqués simplement", url: "https://comprendre-llm-xmumju1.gamma.site" },
                    { id: "1.2", title: "Potentiel de transformation", url: "https://amplifiez-votre-expertis-nj550ee.gamma.site/" },
                    { id: "1.3", title: "Les cas d'usage à fort impact", url: "https://cas-dusage-llm-nxvjk07.gamma.site/" }
                ]
            },
            module2: {
                title: "Dialoguer avec les LLM",
                lessons: [
                    { id: "2.1", title: "Formuler des instructions claires", url: "https://dialoguer-avec-les-llm-nhbm0p6.gamma.site/" },
                    { id: "2.2", title: "Techniques avancées", url: "https://techniques-ia-w2k0pbh.gamma.site/" },
                    { id: "2.3", title: "Exercices pratiques", url: "https://exercices-pratiques-ugero89.gamma.site/" }
                ]
            },
            module3: {
                title: "Applications métier",
                lessons: [
                    { id: "3.1", title: "Rédaction et communication", url: "https://applications-metier-impa-fl3p4qo.gamma.site/" },
                    { id: "3.2", title: "Analyse et traitement", url: "https://analyse-info-tnlxyga.gamma.site/" },
                    { id: "3.3", title: "Résolution de problèmes", url: "https://creativite-innovation-dcah0cn.gamma.site/" }
                ]
            },
            module4: {
                title: "Intégrer les LLM",
                lessons: [
                    { id: "4.1", title: "Identifier les opportunités", url: "https://optimisation-taches-llm-mxryz9t.gamma.site/" },
                    { id: "4.2", title: "Construire vos prompts", url: "https://bibliotheque-de-super-pr-ngier1d.gamma.site/" },
                    { id: "4.3", title: "Mesurer les gains", url: "https://mesurer-gains-llm-oi8yxbi.gamma.site/" }
                ]
            },
            module5: {
                title: "Plan d'action",
                lessons: [
                    { id: "5.1", title: "Feuille de route", url: "https://adoption-llm-30-jours-a1x2pos.gamma.site/" },
                    { id: "5.2", title: "Bibliothèque de prompts", url: "https://bibliotheque-prompts-sj9tf7j.gamma.site/" },
                    { id: "5.3", title: "Ressources avancées", url: "https://maitriser-ia-y7ie7bo.gamma.site/" }
                ]
            }
        };
        
        this.init();
        this.setupMenuTrigger();
        this.setupContentClickHandler();
    }

    init() {
        this.renderModules();
        this.setupEventListeners();
        this.updateProgress();
        this.setupHomeButton();
        
        // Ajouter l'écouteur pour fermer les stats
        document.querySelector('.close-stats')?.addEventListener('click', () => {
            document.querySelector('.stats-panel').classList.remove('active');
        });
    }

    setupHomeButton() {
        const homeButton = document.querySelector('.home-link');
        if (homeButton) {
            homeButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    }

    renderModules() {
        if (!this.modulesList) return;
        
        let html = '';
        Object.entries(this.modules).forEach(([moduleId, moduleData]) => {
            html += `
                <div class="module" data-module-id="${moduleId}">
                    <div class="module-header">
                        <span>${moduleData.title}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="module-content">
                        ${moduleData.lessons.map(lesson => `
                            <div class="lesson" data-lesson-id="${lesson.id}">
                                <a href="#" data-url="${lesson.url}">
                                    ${lesson.title}
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        this.modulesList.innerHTML = html;
    }

    setupEventListeners() {
        // Gestion des clics sur les en-têtes de modules
        this.modulesList.addEventListener('click', (e) => {
            const moduleHeader = e.target.closest('.module-header');
            if (moduleHeader) {
                const module = moduleHeader.parentElement;
                module.classList.toggle('active');
                return;
            }

            // Gestion des clics sur les leçons
            const lessonLink = e.target.closest('[data-url]');
            if (lessonLink) {
                e.preventDefault();
                const url = lessonLink.dataset.url;
                const lesson = lessonLink.closest('.lesson');
                const module = lesson.closest('.module');
                
                if (url && lesson && module) {
                    this.loadContent(
                        url,
                        module.dataset.moduleId,
                        lesson.dataset.lessonId
                    );
                }
            }
        });
    }

    setupContentClickHandler() {
        // Gérer le clic sur l'iframe pour masquer le menu
        document.addEventListener('click', (e) => {
            const iframe = e.target.closest('.content-iframe');
            if (iframe) {
                this.toggleFullscreen(true);
            }
        });

        // Gérer les clics dans l'iframe
        window.addEventListener('message', (event) => {
            // Vérifier l'origine pour la sécurité
            if (event.data === 'iframe-clicked') {
                this.toggleFullscreen(true);
            }
        });
    }

    loadContent(url, moduleId, lessonId) {
        if (!url) return;
        
        this.toggleFullscreen(true);
        this.contentFrame.innerHTML = '<div class="loader"></div>';
        
        // Créer l'iframe
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.className = 'content-iframe';
        
        // Ajouter un script dans l'iframe pour détecter les clics
        iframe.onload = () => {
            try {
                iframe.contentWindow.document.body.addEventListener('click', () => {
                    window.postMessage('iframe-clicked', '*');
                });
            } catch (e) {
                console.warn('Impossible d\'ajouter le gestionnaire de clics à l\'iframe:', e);
            }
            
            this.markAsCompleted(moduleId, lessonId);
            this.updateProgress();
            this.addNavigationControls(moduleId, lessonId);
        };
        
        iframe.onerror = () => {
            this.contentFrame.innerHTML = `
                <div class="error-message">
                    <h3>Erreur de chargement</h3>
                    <p>Impossible de charger le contenu. Veuillez réessayer.</p>
                </div>
            `;
        };
        
        // Remplacer le loader par l'iframe
        this.contentFrame.innerHTML = '';
        this.contentFrame.appendChild(iframe);
        
        // Ajouter le bouton de menu si pas déjà présent
        if (!document.querySelector('.menu-toggle')) {
            const menuButton = document.createElement('button');
            menuButton.className = 'menu-toggle';
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            menuButton.addEventListener('click', () => {
                this.toggleFullscreen(false);
            });
            document.body.appendChild(menuButton);
        }
    }

    markAsCompleted(moduleId, lessonId) {
        if (!this.progressData[moduleId]) {
            this.progressData[moduleId] = [];
        }
        if (!this.progressData[moduleId].includes(lessonId)) {
            this.progressData[moduleId].push(lessonId);
            this.saveProgress();
        }
    }

    updateProgress() {
        const progressBars = document.getElementById('progress-bars');
        if (!progressBars) return;

        let html = '';
        Object.entries(this.modules).forEach(([moduleId, moduleData]) => {
            const completed = this.progressData[moduleId]?.length || 0;
            const total = moduleData.lessons.length;
            const percentage = (completed / total) * 100;

            html += `
                <div class="progress-item">
                    <div class="progress-header">
                        <span>${moduleData.title}</span>
                        <span>${completed}/${total}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        });

        progressBars.innerHTML = html;
    }

    loadProgress() {
        try {
            return JSON.parse(localStorage.getItem('trainingProgress')) || {};
        } catch {
            return {};
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('trainingProgress', JSON.stringify(this.progressData));
        } catch (e) {
            console.warn('Impossible de sauvegarder la progression:', e);
        }
    }

    // Ajouter une méthode pour basculer l'affichage du menu
    toggleFullscreen(show) {
        const container = document.querySelector('.training-container');
        const burgerMenu = document.querySelector('.burger-menu');
        
        if (show) {
            container.classList.add('fullscreen');
            burgerMenu.style.display = 'flex';
        } else {
            container.classList.remove('fullscreen');
            burgerMenu.style.display = 'none';
        }
    }

    setupMenuTrigger() {
        // Créer la zone sensible
        const triggerArea = document.createElement('div');
        triggerArea.className = 'menu-trigger-area';
        document.body.appendChild(triggerArea);

        // Ajouter l'événement
        triggerArea.addEventListener('mouseenter', () => {
            this.toggleFullscreen(false);
        });
    }

    addNavigationControls(currentModuleId, currentLessonId) {
        // Supprimer les contrôles existants s'il y en a
        const existingControls = document.querySelector('.navigation-controls');
        if (existingControls) {
            existingControls.remove();
        }

        // Trouver les leçons précédente et suivante
        const { prevLesson, nextLesson } = this.findAdjacentLessons(currentModuleId, currentLessonId);

        // Créer les contrôles de navigation
        const controls = document.createElement('div');
        controls.className = 'navigation-controls';

        // Bouton précédent
        const prevButton = document.createElement('button');
        prevButton.className = 'nav-button';
        prevButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
        if (prevLesson) {
            const tooltip = document.createElement('span');
            tooltip.className = 'nav-button-tooltip';
            tooltip.innerHTML = `
                <span class="direction">Chapitre précédent</span>
                <span class="title">${prevLesson.title}</span>
            `;
            prevButton.appendChild(tooltip);
            prevButton.addEventListener('click', () => {
                this.loadContent(prevLesson.url, prevLesson.moduleId, prevLesson.id);
            });
        } else {
            prevButton.disabled = true;
            const tooltip = document.createElement('span');
            tooltip.className = 'nav-button-tooltip';
            tooltip.innerHTML = `
                <span class="direction">Premier chapitre</span>
                <span class="title">Vous êtes au début de la formation</span>
            `;
            prevButton.appendChild(tooltip);
        }

        // Bouton suivant
        const nextButton = document.createElement('button');
        nextButton.className = 'nav-button';
        nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
        if (nextLesson) {
            const tooltip = document.createElement('span');
            tooltip.className = 'nav-button-tooltip';
            tooltip.innerHTML = `
                <span class="direction">Chapitre suivant</span>
                <span class="title">${nextLesson.title}</span>
            `;
            nextButton.appendChild(tooltip);
            nextButton.addEventListener('click', () => {
                this.loadContent(nextLesson.url, nextLesson.moduleId, nextLesson.id);
            });
        } else {
            nextButton.disabled = true;
            const tooltip = document.createElement('span');
            tooltip.className = 'nav-button-tooltip';
            tooltip.innerHTML = `
                <span class="direction">Dernier chapitre</span>
                <span class="title">Vous avez terminé la formation</span>
            `;
            nextButton.appendChild(tooltip);
        }

        controls.appendChild(prevButton);
        controls.appendChild(nextButton);
        document.body.appendChild(controls);
    }

    findAdjacentLessons(currentModuleId, currentLessonId) {
        let prevLesson = null;
        let nextLesson = null;
        let foundCurrent = false;
        
        // Créer une liste plate de toutes les leçons
        const allLessons = [];
        Object.entries(this.modules).forEach(([moduleId, moduleData]) => {
            moduleData.lessons.forEach(lesson => {
                allLessons.push({
                    ...lesson,
                    moduleId
                });
            });
        });

        // Trouver les leçons adjacentes
        for (let i = 0; i < allLessons.length; i++) {
            if (allLessons[i].moduleId === currentModuleId && allLessons[i].id === currentLessonId) {
                if (i > 0) prevLesson = allLessons[i - 1];
                if (i < allLessons.length - 1) nextLesson = allLessons[i + 1];
                break;
            }
        }

        return { prevLesson, nextLesson };
    }

    toggleStats() {
        const statsPanel = document.querySelector('.stats-panel');
        statsPanel.classList.toggle('active');
        this.renderStats();
    }

    renderStats() {
        const statsContent = document.querySelector('.stats-content');
        let html = '';
        
        Object.entries(this.modules).forEach(([moduleId, moduleData]) => {
            const completed = this.progressData[moduleId]?.length || 0;
            const total = moduleData.lessons.length;
            
            html += `
                <div class="module-stat">
                    <div class="module-stat-header">
                        <span class="module-stat-title">${moduleData.title}</span>
                        <span class="module-stat-count">${completed}/${total}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(completed/total) * 100}%"></div>
                    </div>
                </div>
            `;
        });
        
        statsContent.innerHTML = html;
    }

    showPromptLibrary() {
        const contentFrame = document.getElementById('content-frame');
        
        // Masquer l'écran de bienvenue
        const welcomeScreen = contentFrame.querySelector('.welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
        }
        
        // Charger la bibliothèque de prompts directement
        contentFrame.innerHTML = `
            <div class="prompt-library">
                <h2 class="text-2xl font-bold mb-4">Bibliothèque de Prompts</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${promptsDatabase.map(prompt => `
                        <div class="prompt-card bg-gray-800 p-4 rounded-lg">
                            <div class="flex justify-between items-start mb-2">
                                <span class="text-sm text-blue-400">${prompt.categoryName}</span>
                                <button class="copy-button" data-prompt="${prompt.text}">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <p class="text-sm text-gray-300 mb-2">${prompt.subcategory}</p>
                            <p class="text-white">${prompt.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Ajouter les écouteurs d'événements pour les boutons de copie
        contentFrame.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', () => {
                const text = button.dataset.prompt;
                navigator.clipboard.writeText(text).then(() => {
                    const icon = button.querySelector('i');
                    icon.className = 'fas fa-check';
                    setTimeout(() => {
                        icon.className = 'fas fa-copy';
                    }, 2000);
                });
            });
        });
    }
}

// Initialiser le gestionnaire de formation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.trainingManager = new TrainingManager();
}); 