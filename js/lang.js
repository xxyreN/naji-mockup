// Language toggle + FOUT fix
(function () {
  // FOUT fix
  var timeout = setTimeout(function () { document.body.classList.add('fonts-ready'); }, 800);
  document.fonts.ready.then(function () {
    clearTimeout(timeout);
    document.body.classList.add('fonts-ready');
  });

  // Language
  var saved = localStorage.getItem('naji-lang') || 'es';
  document.documentElement.classList.remove('lang-es', 'lang-en');
  document.documentElement.classList.add('lang-' + saved);

  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    if (btn.dataset.lang === saved) btn.classList.add('active');
    btn.addEventListener('click', function () {
      var lang = this.dataset.lang;
      localStorage.setItem('naji-lang', lang);
      document.documentElement.classList.remove('lang-es', 'lang-en');
      document.documentElement.classList.add('lang-' + lang);
      document.querySelectorAll('.lang-toggle button').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // Nav scroll effect
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Image load — hide placeholder labels when image loads successfully
  document.querySelectorAll('img[src*="img/"]').forEach(function (img) {
    img.addEventListener('load', function () {
      var ph = this.parentNode.querySelector('.ph-label, .hero-ph');
      if (ph) ph.style.display = 'none';
      if (this.parentNode.classList.contains('img-placeholder')) {
        this.parentNode.style.border = 'none';
      }
    });
    img.addEventListener('error', function () {
      var filename = this.src.split('/').pop();
      var parent = this.parentNode;
      this.style.display = 'none';
      var placeholder = document.createElement('div');
      placeholder.style.cssText = 'background:#221A15;display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:200px;font-family:monospace;font-size:12px;color:#E8762D;letter-spacing:0.05em;padding:20px;text-align:center;border:1px dashed rgba(232,118,45,0.15);border-radius:16px;position:absolute;inset:0;';
      placeholder.textContent = filename;
      if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
      parent.appendChild(placeholder);
    });
  });
})();

(function () {
  var btn = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    btn.classList.toggle('active');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      btn.classList.remove('active');
      menu.classList.remove('open');
    });
  });
})();
