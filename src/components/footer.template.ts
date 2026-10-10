export function createFooterTemplate() {
  const footerRef = document.querySelector("#footer");
  if (!footerRef) return;
  return `
    <p>© 2026 Janus Nova. Alle Rechte Vorbehalten.</p>
    <button><a href="/impressum.html"></a></button>
    <div id="allInklBanner"></div>
    `;
}
