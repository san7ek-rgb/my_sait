document.querySelectorAll('[role="tablist"]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  function select(tab) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(item.getAttribute('aria-controls'));
      panel.hidden = !active;
      if (!active) panel.querySelectorAll('video').forEach(video => video.pause());
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) { event.preventDefault(); select(next); next.focus(); }
    });
  });
});
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  event.currentTarget.querySelector('[role="status"]').textContent = 'Это демонстрация: заявка не отправлена. Чтобы связаться с командой, нажмите «Написать в Telegram».';
  event.currentTarget.reset();
});
// Future project videos: <video controls playsinline preload="none" poster="...">
// <source src="assets/project.mp4" type="video/mp4"></video>
// Do not autoplay project films. Keep large video files outside Git where practical.

const gallery = document.querySelector('.gallery-dialog');
const gallerySets = {
  moments: [ ['assets/agency-29.webp', 'Молодожёны с букетом'], ['assets/agency-24.webp', 'Образ невесты'], ['assets/agency-2.webp', 'Коллаж свадебных моментов'] ],
  details: [ ['assets/agency-26.webp', 'Свадебная сервировка'], ['assets/agency-23.webp', 'Ужин при свечах'], ['assets/agency-6.webp', 'Коллаж деталей свадебного дня'] ]
};
let galleryItems = [], galleryIndex = 0;
function showPhoto(index) {
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const [src, alt] = galleryItems[galleryIndex];
  const img = gallery.querySelector('.gallery-stage img');
  img.src = src; img.alt = alt;
  gallery.querySelector('.gallery-counter').textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
}
document.querySelectorAll('.gallery-open').forEach(button => button.addEventListener('click', () => {
  galleryItems = gallerySets[button.dataset.gallery]; showPhoto(0); gallery.showModal(); document.body.style.overflow = 'hidden';
}));
gallery.querySelector('.gallery-close').addEventListener('click', () => gallery.close());
gallery.querySelector('.gallery-prev').addEventListener('click', () => showPhoto(galleryIndex - 1));
gallery.querySelector('.gallery-next').addEventListener('click', () => showPhoto(galleryIndex + 1));
gallery.addEventListener('close', () => { document.body.style.overflow = ''; });
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(galleryIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(galleryIndex + 1); }
});
gallery.addEventListener('click', event => { if (event.target === gallery) gallery.close(); });
