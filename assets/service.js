const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');

function closeMenu() {
  if (!menu || !menuButton) return;
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('menu-open');
}

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

const modal = document.querySelector('[data-contact-modal]');
let lastFocus = null;

function openModal() {
  if (!modal) return;
  lastFocus = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('input, button')?.focus();
}

function closeModal() {
  if (!modal?.classList.contains('is-open')) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastFocus?.focus();
}

document.querySelectorAll('[data-contact-open]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    openModal();
  });
});
document.querySelectorAll('[data-contact-close]').forEach(button => button.addEventListener('click', closeModal));
modal?.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
    closeMenu();
  }
  if (event.key !== 'Tab' || !modal?.classList.contains('is-open')) return;
  const controls = [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])')];
  if (!controls.length) return;
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.querySelector('[data-contact-form]')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get('name') || '').trim();
  const contact = String(form.get('contact') || '').trim();
  const message = String(form.get('message') || '').trim();
  const subject = encodeURIComponent(`Обращение с сайта — ${name}`);
  const body = encodeURIComponent(`Имя: ${name}\nКонтакт: ${contact}\n\nЗадача:\n${message}`);
  window.location.href = `mailto:office@argument-group.ru?subject=${subject}&body=${body}`;
});
