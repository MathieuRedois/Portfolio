# Portfolio de Mathieu Redois

Site en ligne : https://portfolio.jakkoos.fr

Une seule page, écrite à la main en HTML, CSS et JavaScript, sans framework ni étape de build.

## Organisation

- `index.html` : tout le contenu (accueil, projets, parcours, compétences, contact)
- `assets/css/style.css` : mise en page, thème clair et thème sombre
- `assets/js/script.js` : paquet de fiches de l'accueil, bouton de thème
- `assets/fonts/` : polices hébergées sur le site (Bricolage Grotesque et Source Serif 4, licence SIL OFL)
- `assets/pdf/cv-mathieu-redois.pdf` : le CV proposé au téléchargement

## Modifier le contenu

Tout le texte est dans `index.html`. Pour ajouter un projet, copier un bloc `<article class="project">`.
Pour voir le site en local : `python -m http.server` puis ouvrir http://localhost:8000.
