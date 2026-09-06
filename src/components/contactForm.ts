// No backend exists yet, so submitting opens a pre-filled mailto: draft as an interim workaround.
export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const telefon = data.get('telefon');
    const leistungsbereich = data.get('leistungsbereich');
    const message = data.get('message');

    const subject = `Anfrage über die Website von ${name}`;
    const body = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${telefon}`,
      `Leistungsbereich: ${leistungsbereich}`,
      '',
      `${message}`,
    ].join('\n');

    const mailtoUrl = `mailto:info@janusnova.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  });
}
