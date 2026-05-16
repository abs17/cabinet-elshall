# Cabinet Abdallah Elshall — Site vitrine

Site vitrine multilingue (FR / EN / AR) pour Maître **Abdallah Elshall**, avocat d'affaires basé au Caire.

## Stack

- **React 18** (via CDN) + **Babel standalone** pour la compilation JSX dans le navigateur
- **CSS** vanilla avec variables custom — thème noir profond + or terne
- **Polices** : Cormorant Garamond (serif) · Inter (sans) · Noto Naskh Arabic (AR)
- **Web Component** `<image-slot>` pour le portrait drag-and-drop
- 100% statique — aucun bundler requis

## Structure

```
.
├── index.html          # Point d'entrée — monte l'app React
├── styles.css          # Thème global
├── translations.js     # Dictionnaires FR / EN / AR
├── sections.jsx        # Composants React (Nav, Hero, Services, …)
├── image-slot.js       # Custom element pour le portrait
└── assets/
    ├── french-touch.webp
    └── wahasian.png
```

## Démarrage local

Aucune installation — il suffit de servir le dossier en HTTP (ne pas ouvrir `index.html` en `file://`, le `fetch()` du portrait échouerait).

```bash
# Option 1 — Python
python3 -m http.server 8080

# Option 2 — Node
npx serve .
```

Puis ouvrir [http://localhost:8080](http://localhost:8080).

## Configuration du dépôt

```bash
git init
git add .
git commit -m "Initial — site vitrine Cabinet Elshall"
gh repo create cabinet-elshall --public --source=. --push
```

## Personnalisation

### Portrait de Maître Elshall
Dans le Hero, **glisser-déposer** la photo sur la zone prévue. L'image est persistée dans `.image-slots.state.json` (à commiter pour qu'elle apparaisse en prod).

### Formulaire de contact
Actuellement local (confirmation visuelle uniquement). Pour le brancher, remplacer le `onSubmit` du `<form>` dans `sections.jsx` par un POST vers [Formspree](https://formspree.io), [Getform](https://getform.io), etc.

### Traductions
Tout le contenu textuel se trouve dans `translations.js` — trois clés `fr`, `en`, `ar`.

### Logos clients
Ajouter une nouvelle entrée dans `t.trust.clients` (`translations.js`) et — si un logo image est fourni — l'ajouter dans `assets/` puis l'enregistrer dans le composant `ClientGlyph` de `sections.jsx`.

## Déploiement

Site 100% statique — déployable tel quel sur **Netlify**, **Vercel**, **GitHub Pages**, **Cloudflare Pages**.

### GitHub Pages
```bash
gh repo edit --enable-pages --pages-branch main
```

## Coordonnées

- **Téléphone** : +20 106 338 8394
- **Localisation** : Le Caire, Égypte (30.077291, 31.311699)
