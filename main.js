document.addEventListener('DOMContentLoaded', () => {
    // Define o container principal que será movido para dentro do layout do header
    const mainContent = document.querySelector('.page-content');

    // Carrega o header
    fetch('/src/components/header/header.html')
        .then(response => response.text())
        .then(data => {
            // Insere o HTML do header no corpo do documento
            document.body.insertAdjacentHTML('afterbegin', data);

            // Move o conteúdo principal da página para dentro do .layout-container do header
            const layoutContainer = document.getElementById('layout-container');
            if (layoutContainer && mainContent) {
                layoutContainer.appendChild(mainContent);
            }

            // Anexa o script do header para garantir que a interatividade funcione
            const headerScript = document.createElement('script');
            headerScript.src = '/src/components/header/header.js';
            document.body.appendChild(headerScript);

            // Atualiza a classe 'active' no link de navegação correto
            updateActiveNav();
        });

    function updateActiveNav() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-nav a');

        navLinks.forEach(link => {
            // Remove a classe active de todos os links primeiro
            link.parentElement.classList.remove('active');

            // Verifica se o href do link corresponde à página atual
            if (link.getAttribute('href') === currentPage) {
                link.parentElement.classList.add('active');
            }
        });
    }
});
