// Handles mobile nav toggle and the header scroll-background effect
export function initNav(): void {
  const header = document.querySelector('header');
  const burger = document.querySelector<HTMLButtonElement>('.nav__burger');
  const nav = document.querySelector('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (header) {
    const scrollThreshold = 60;
    const toggleScrolledClass = () => {
      header.classList.toggle('scrolled', window.scrollY > scrollThreshold);
    };

    toggleScrolledClass();
    window.addEventListener('scroll', toggleScrolledClass);
  }
}
