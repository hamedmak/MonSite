# SAFARIHOO - Site de Voyage

Un site web statique moderne et élégant pour rediriger vers vos liens d'affiliation de voyage. Conçu avec un design 3D captivant aux couleurs safran et blanc.

## 🎨 Caractéristiques

- **Design 3D Moderne** : Effets 3D séduisants avec animations fluides
- **Responsive** : Compatible avec tous les types d'appareils (mobile, tablette, desktop)
- **Couleurs Safran & Blanc** : Palette de couleurs professionnelle et attrayante
- **Sections Séparées** : Chaque section est visuellement distincte avec des effets 3D
- **Navigation Fluide** : Menu de navigation avec animations
- **Barre de Recherche Interactive** : Recherche pour Vols, Hôtels et Voitures
- **Section Astuces de Voyage** : Articles et guides pratiques
- **Page Promotions** : Affichage des offres spéciales avec filtres
- **Chat AI** : Assistant virtuel pour aider les utilisateurs
- **Statique** : Site 100% statique, prêt pour GitHub Pages

## 📁 Structure du Projet

```
MonSite/
├── index.html          # Page d'accueil principale
├── promotions.html     # Page des promotions
├── styles.css          # Fichier CSS avec tous les styles
├── script.js           # JavaScript pour l'interactivité
└── README.md           # Documentation
```

## 🚀 Déploiement sur GitHub Pages

### Méthode 1 : Déploiement Direct

1. Créez un nouveau dépôt sur GitHub
2. Nommez-le `safarihoo` (ou tout autre nom)
3. Uploadez tous les fichiers du projet
4. Allez dans **Settings** > **Pages**
5. Sélectionnez la branche `main` (ou `master`)
6. Sélectionnez le dossier `/ (root)`
7. Cliquez sur **Save**
8. Votre site sera disponible à : `https://votre-username.github.io/safarihoo/`

### Méthode 2 : Via GitHub CLI

```bash
# Initialiser git
git init

# Ajouter les fichiers
git add .

# Commit
git commit -m "Initial commit - SAFARIHOO"

# Ajouter le remote
git remote add origin https://github.com/votre-username/safarihoo.git

# Push
git branch -M main
git push -u origin main
```

Ensuite, activez GitHub Pages dans les paramètres du dépôt.

## ⚙️ Configuration des Liens d'Affiliation

Pour configurer vos liens d'affiliation, modifiez le fichier `script.js` :

```javascript
const affiliateLinks = {
    'vols': 'https://votre-lien-affiliation-vols.com',
    'hotels': 'https://votre-lien-affiliation-hotels.com',
    'voitures': 'https://votre-lien-affiliation-voitures.com',
    'promo-europe': 'https://votre-lien-promo-europe.com',
    // ... ajoutez vos autres liens
};
```

## 🎯 Sections du Site

### Header
- Navigation : Accueil, Vols, Hôtels, Voitures, Promotions
- Bouton AI Chat
- Sélecteur de langue (🌐)

### Section Héro
- Barre de recherche interactive
- Onglets pour Vols, Hôtels, Voitures
- Design 3D avec effets de perspective

### Section Astuces de Voyage
- Articles sur le voyage avec animaux
- Hôtels acceptant les animaux
- Hôtels pour familles
- Autres conseils de voyage

### Section Promotions
- Offres spéciales
- Cartes promotionnelles avec effets 3D
- Lien vers la page complète des promotions

### Page Promotions
- Filtres par catégorie (Toutes, Vols, Hôtels, Voitures, Packages)
- Cartes promotionnelles détaillées
- Informations complètes sur chaque offre

### Footer
- Informations de contact
- Liens vers les réseaux sociaux
- Liens légaux
- Navigation rapide

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `styles.css` via des variables CSS :

```css
:root {
    --safran: #FF8C00;
    --safran-light: #FFA500;
    --safran-dark: #FF7F00;
    --white: #FFFFFF;
    /* ... */
}
```

Modifiez ces valeurs pour changer la palette de couleurs.

### Polices

Le site utilise la police Google Fonts "Poppins". Pour changer :

1. Modifiez le lien dans `<head>` de `index.html`
2. Changez `font-family: 'Poppins'` dans `styles.css`

## 📱 Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 🔧 Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec animations 3D
- **JavaScript (Vanilla)** : Interactivité sans dépendances
- **Google Fonts** : Police Poppins

## 📝 Notes

- Le site est entièrement statique, aucune dépendance externe requise
- Tous les liens d'affiliation doivent être configurés dans `script.js`
- Les images de fond utilisent des gradients CSS (pas d'images externes)
- Le chat AI est une simulation basique (peut être connecté à une vraie API)

## 📄 Licence

Ce projet est libre d'utilisation. N'oubliez pas de remplacer les liens d'affiliation par vos propres liens.

## 🤝 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Créé avec ❤️ pour SAFARIHOO**

