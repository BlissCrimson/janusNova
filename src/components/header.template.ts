export function createHeaderTemplate() {
  const headerRef = document.querySelector("#header");
  if (!headerRef) return;
  return `
    <header>
        <div class="header__brand">
            <p class="header__logo">Janus Nova</p>
            <span class="header__tagline">Textilveredelung und Folienherstellung</span>
        </div>
        <nav>
            <button class="button button__nav"><a href="#hero">Home</a></button>
            <button class="button button__nav"><a href="#leistungen">Leistungen</a></button>
            <button class="button button__nav"><a href="#techniken">Techniken</a></button>
            <button class="button button__nav"><a href="#ueber-uns">Über uns</a></button>
            <button class="button button__nav"><a href="#kontakt">Kontakt</a></button>
        </nav>
        <button class="nav__burger" type="button" aria-expanded="false" aria-label="Menü öffnen">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header>
  `;
}
