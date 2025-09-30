// --- LÓGICA DO DROPDOWN DO PERFIL ---
const profileButton = document.getElementById('profile-button');
const profileDropdown = document.getElementById('profile-dropdown');

if (profileButton) {
    profileButton.addEventListener('click', (event) => {
        event.stopPropagation();
        profileDropdown.classList.toggle('hidden');
    });
}

// --- LÓGICA PARA MINIMIZAR/EXPANDIR A SIDEBAR (DESKTOP) ---
const sidebar = document.getElementById('sidebar');
const layoutContainer = document.getElementById('layout-container');
const sidebarToggleButton = document.getElementById('sidebar-toggle');

if (sidebarToggleButton) {
    sidebarToggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        layoutContainer.classList.toggle('sidebar-collapsed');
    });
}

// --- LÓGICA DO MENU MOBILE (HAMBURGER) ---
const bodyContainer = document.body; // Alterado para usar o body diretamente
const hamburgerButton = document.getElementById('hamburger-button');
const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');

function toggleMobileNav() {
    bodyContainer.classList.toggle('mobile-nav-is-open');
}

if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMobileNav);
}
if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', toggleMobileNav);
}

// --- LÓGICA PARA FECHAR DROPDOWN AO CLICAR FORA ---
window.addEventListener('click', function(event) {
    // Garante que os elementos existem antes de tentar acessá-los
    if (profileDropdown && profileButton && !profileDropdown.classList.contains('hidden') && !profileButton.contains(event.target)) {
        profileDropdown.classList.add('hidden');
    }
});
