/* Portfolio de Mathieu Redois : paquet de fiches de l'accueil et choix du thème. */
(function () {
  'use strict';

  /* ----- Thème clair / sombre -------------------------------------------- */

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  function renderToggle() {
    var dark = currentTheme() === 'dark';
    toggle.textContent = dark ? 'Mode clair' : 'Mode sombre';
    toggle.setAttribute('aria-pressed', String(dark));
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* Stockage indisponible : le choix vaut pour cette visite seulement. */
      }
      renderToggle();
    });
    systemDark.addEventListener('change', renderToggle);
    renderToggle();
  }

  /* ----- Paquet de fiches ------------------------------------------------ */

  var deck = document.getElementById('deck-cards');
  if (!deck) return;

  var cards = Array.prototype.slice.call(deck.querySelectorAll('.fiche'));
  var count = document.getElementById('deck-count');
  var flipButton = document.getElementById('deck-flip');
  var nextButton = document.getElementById('deck-next');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var top = 0;        // indice de la fiche du dessus
  var busy = false;   // vrai pendant qu'une fiche quitte le dessus du paquet

  /* Met à jour la position de chaque fiche dans la pile, et ce qui est
     accessible au clavier et aux lecteurs d'écran : seule la face visible
     de la fiche du dessus l'est. */
  function render() {
    cards.forEach(function (card, i) {
      var pos = (i - top + cards.length) % cards.length;
      var flipped = card.classList.contains('is-flipped');
      card.dataset.pos = String(pos);
      card.inert = pos !== 0;
      card.querySelector('.fiche-front').inert = flipped;
      card.querySelector('.fiche-back').inert = !flipped;
    });
    var flippedTop = cards[top].classList.contains('is-flipped');
    flipButton.textContent = flippedTop ? 'Revoir la question' : 'Retourner la fiche';
    count.textContent = 'Fiche ' + (top + 1) + ' sur ' + cards.length;
  }

  function flip() {
    if (busy) return;
    cards[top].classList.toggle('is-flipped');
    render();
  }

  function next() {
    if (busy) return;
    var leaving = cards[top];

    function settle() {
      leaving.classList.remove('is-leaving', 'is-flipped');
      top = (top + 1) % cards.length;
      busy = false;
      render();
    }

    if (reducedMotion.matches) {
      settle();
      return;
    }
    busy = true;
    leaving.classList.add('is-leaving');
    window.setTimeout(settle, 280);
  }

  flipButton.addEventListener('click', flip);
  nextButton.addEventListener('click', next);

  /* Un clic sur la question retourne aussi la fiche. Les boutons restent
     le moyen d'y accéder au clavier. */
  deck.addEventListener('click', function (event) {
    var front = event.target.closest('.fiche-front');
    if (front && front.parentNode.parentNode === cards[top]) flip();
  });

  render();

  /* Les fiches partent empilées bien droit, puis se décalent une fois. */
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      deck.classList.add('is-dealt');
    });
  });
})();
