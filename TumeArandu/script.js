(() => {
  const root = document.documentElement;
  const updateViewport = () => {
    const width = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    root.style.setProperty('--vw', width + 'px');
    root.style.setProperty('--vh', height + 'px');
  };
  const setupReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { elements.forEach((element) => element.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
  };
  let resizeFrame = 0;
  const handleResize = () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(updateViewport); };
  updateViewport();
  setupReveal();
  window.addEventListener('resize', handleResize, { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', handleResize, { passive: true });
})();