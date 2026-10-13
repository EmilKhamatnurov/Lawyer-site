const filterButtons = [...document.querySelectorAll('[data-news-filter]')];
const items = [...document.querySelectorAll('[data-news-kind]')];
const count = document.querySelector('[data-news-count]');

filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.newsFilter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let visible = 0;
  items.forEach(item => {
    const show = selected === 'all' || item.dataset.newsKind === selected;
    item.hidden = !show;
    if (show) visible++;
  });
  if (count) count.textContent = `Показано материалов: ${visible}`;
}));

document.querySelector('[data-copy-link]')?.addEventListener('click', async () => {
  const status = document.querySelector('[data-copy-status]');
  try {
    await navigator.clipboard.writeText(window.location.href);
    if (status) status.textContent = 'Ссылка скопирована';
  } catch {
    if (status) status.textContent = 'Скопируйте адрес из строки браузера';
  }
});
