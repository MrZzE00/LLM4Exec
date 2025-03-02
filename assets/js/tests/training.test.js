describe('TrainingManager', () => {
    let trainingManager;
    
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="content-frame"></div>
            <div id="modules-list"></div>
            <div id="progress-bars"></div>
        `;
        trainingManager = new TrainingManager();
    });

    test('should initialize properly', () => {
        expect(trainingManager.contentFrame).not.toBeNull();
        expect(trainingManager.modulesList).not.toBeNull();
        expect(trainingManager.modules).toBeDefined();
    });

    test('should load content correctly', async () => {
        const mockUrl = 'test-url';
        const mockContent = '<div>Test Content</div>';
        
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(mockContent)
            })
        );

        await trainingManager.loadContent(mockUrl, 'module1', '1.1');
        expect(trainingManager.contentFrame.innerHTML).toBe(mockContent);
    });

    test('should handle content loading errors', async () => {
        global.fetch = jest.fn(() => Promise.reject('Error'));
        await trainingManager.loadContent('invalid-url', 'module1', '1.1');
        expect(trainingManager.contentFrame.innerHTML).toContain('Erreur de chargement');
    });
}); 