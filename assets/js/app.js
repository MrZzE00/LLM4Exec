/**
 * Point d'entrée de l'application
 */
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si nous sommes sur la page d'accueil (index.html)
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html' ||
                       window.location.pathname.endsWith('/');
    
    // Si nous sommes sur la page d'accueil mais pas sur welcome.html, rediriger
    if (isHomePage && !window.location.href.includes('welcome.html')) {
        window.location.href = 'welcome.html';
        return;
    }
    
    // Initialiser les composants
    window.sidebarInstance = new Sidebar();
    window.contentLoaderInstance = new ContentLoader();
    window.promptLibraryInstance = new PromptLibrary();
    
    // Ajouter un gestionnaire d'événements pour le bouton de bibliothèque
    document.getElementById('libraryButton').addEventListener('click', () => {
        window.contentLoaderInstance.loadContent('prompt-library', 'Bibliothèque de prompts');
    });
}); 