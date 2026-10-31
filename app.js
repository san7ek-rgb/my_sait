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
