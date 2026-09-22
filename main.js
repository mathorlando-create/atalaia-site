/* Menu móvel acessível — Atalaia Soluções Integradas */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  var mq = window.matchMedia('(max-width: 820px)');

  function setOpen(open, returnFocus) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.nav-toggle-label').textContent = open ? 'Fechar' : 'Menu';
    nav.hidden = !open;
    if (!open && returnFocus) toggle.focus();
  }

  function sync() {
    if (mq.matches) {
      setOpen(false, false);
    } else {
      nav.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(open, false);
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mq.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, true);
    }
  });

  // Fecha ao sair do menu com Tab
  nav.addEventListener('focusout', function (e) {
    if (!mq.matches) return;
    var next = e.relatedTarget;
    if (next && !nav.contains(next) && next !== toggle) setOpen(false, false);
  });

  // Fecha ao escolher um link (inclusive âncoras na mesma página)
  nav.addEventListener('click', function (e) {
    if (mq.matches && e.target.closest('a')) setOpen(false, false);
  });

  if (mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
  sync();
})();
