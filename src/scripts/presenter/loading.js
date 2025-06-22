export const showLoadingIndicator = () => {
    const overlay = document.createElement('div');
    const spinner = document.createElement('div');

    overlay.classList.add('loading-overlay');
    spinner.classList.add('loading-spinner');

    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .loading-spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #4CAF50;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    return () => {
        document.body.removeChild(overlay);
        document.head.removeChild(style);
    };
};
