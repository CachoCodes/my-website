const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#nav-links');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Reset the mobile menu whenever the viewport returns to the desktop layout.
  const desktopViewport = window.matchMedia('(min-width: 961px)');
  desktopViewport.addEventListener('change', closeMenu);
}

