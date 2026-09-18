const menuButton=document.querySelector('[data-menu-button]');
const menu=document.querySelector('[data-menu]');
if(menuButton&&menu){menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}))}
const modal=document.querySelector('[data-contact-modal]');
let lastFocus=null;
function openModal(){if(!modal)return;lastFocus=document.activeElement;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal.querySelector('input')?.focus()}
function closeModal(){if(!modal)return;modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');lastFocus?.focus()}
document.querySelectorAll('[data-contact-open]').forEach(el=>el.addEventListener('click',event=>{event.preventDefault();openModal()}));
document.querySelectorAll('[data-contact-close]').forEach(el=>el.addEventListener('click',closeModal));
modal?.addEventListener('click',event=>{if(event.target===modal)closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});
document.querySelector('[data-contact-form]')?.addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);const name=form.get('name')||'';const contact=form.get('contact')||'';const message=form.get('message')||'';const subject=encodeURIComponent(`Обращение с сайта — ${name}`);const body=encodeURIComponent(`Имя: ${name}\nКонтакт: ${contact}\n\nЗадача:\n${message}`);window.location.href=`mailto:office@argument-group.ru?subject=${subject}&body=${body}`});
