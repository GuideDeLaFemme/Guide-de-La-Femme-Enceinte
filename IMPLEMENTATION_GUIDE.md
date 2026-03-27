# 📋 Guide d'implémentation — Installation complète

## 🎯 Objectif
Déployer le "Guide de la Femme Enceinte" modifié avec tous les changements, animations et traductions.

---

## 📦 Fichiers à préparer

### ✅ Fichiers HTML/JS/CSS (fournis)
```
✓ index.html              — Page d'accueil
✓ main.html               — Page principale (MODIFIÉE)
✓ bilan.html              — Bilan santé 100% offline (MODIFIÉE)
✓ script.js               — Logique & traductions (MODIFIÉE)
✓ style.css               — Styles & animations (MODIFIÉE)
```

### 📹 Fichiers vidéo (À AJOUTER)
```
⚠️ accouchement physiologique .mp4
   ├─ Durée recommandée: 3-5 minutes
   ├─ Format: MP4 (H.264, AAC audio)
   ├─ Résolution: 720p minimum, 1080p idéal
   ├─ Taille: < 50MB pour chargement rapide
   └─ Placement: racine du dossier

⚠️ alternatives.mp4
   ├─ Durée recommandée: 2-4 minutes
   ├─ Format: MP4 (H.264, AAC audio)
   ├─ Résolution: 720p minimum, 1080p idéal
   ├─ Taille: < 50MB
   └─ Placement: racine du dossier
```

### 🖼️ Fichiers images (existants)
```
✓ enceinte.png                    — Icon accueil
✓ mere.png                        — Icon sidebar
✓ Décubitus Latéral Gauche.jpeg   — Posture
✓ Position accroupie.jpeg         — Posture
✓ Position à quatre pattes.jpeg   — Posture
✓ Posture de suspension.jpeg      — Posture
✓ Octobre_rose_animations.mp4     — Vidéo sidebar (existante)
```

### 🎵 Fichiers audio (existants)
```
✓ Dag Al Mani - دق الماني.mp3 — Musique de fond menu
```

---

## 📂 Structure finale du dossier

```
pregnancy-guide/
├── index.html                          ✓ Page d'accueil
├── main.html                           ✓ MODIFIÉE
├── bilan.html                          ✓ MODIFIÉE (100% offline)
├── script.js                           ✓ MODIFIÉE (traductions + animations)
├── style.css                           ✓ MODIFIÉE (animations)
│
├── 📹 Videos (À AJOUTER)
│   ├── accouchement physiologique .mp4 ⚠️ REQUIS
│   ├── alternatives.mp4                ⚠️ REQUIS
│   └── Octobre_rose_animations.mp4     ✓ Existant
│
├── 🖼️ Images
│   ├── enceinte.png                    ✓
│   ├── mere.png                        ✓
│   ├── Décubitus Latéral Gauche.jpeg   ✓
│   ├── Position accroupie.jpeg         ✓
│   ├── Position à quatre pattes.jpeg   ✓
│   └── Posture de suspension.jpeg      ✓
│
├── 🎵 Audio
│   └── Dag Al Mani - دق الماني.mp3   ✓
│
├── 📚 Documentation
│   ├── README.md                       (existant)
│   ├── MODIFICATIONS.md                ✓ NOUVEAU
│   └── IMPLEMENTATION_GUIDE.md         ✓ NOUVEAU (ce fichier)
│
└── 📝 Fichiers source (optionnel)
    ├── messages.docx
    ├── respiration.docx
    ├── postures.docx
    ├── accouchement_physio.docx
    └── Alternatives.docx
```

---

## 🚀 Étapes d'installation

### Étape 1: Préparation du dossier
```bash
# Créer le dossier du projet
mkdir pregnancy-guide
cd pregnancy-guide

# Ajouter tous les fichiers HTML, CSS, JS
# (index.html, main.html, bilan.html, script.js, style.css)

# Créer des sous-dossiers si nécessaire
mkdir videos images audio
```

### Étape 2: Préparer les vidéos
```
1. Créez/préparez "accouchement physiologique .mp4"
   - Optimisez la taille (compression si nécessaire)
   - Testez la qualité vidéo
   - Placez dans le dossier racine

2. Créez/préparez "alternatives.mp4"
   - Format: MP4
   - Placez dans le dossier racine
```

### Étape 3: Vérifier les images
```bash
# Assurez-vous que tous les fichiers image sont présents:
ls -la *.jpeg *.png

# Résultat attendu:
✓ enceinte.png
✓ mere.png
✓ Décubitus Latéral Gauche.jpeg
✓ Position accroupie.jpeg
✓ Position à quatre pattes.jpeg
✓ Posture de suspension.jpeg
```

### Étape 4: Test local
```bash
# Option 1 - Serveur Python (recommandé)
python3 -m http.server 8080

# Option 2 - Node.js
npx serve .

# Option 3 - PHP
php -S localhost:8080

# Accédez à:
http://localhost:8080
```

---

## ✅ Checklist de validation

### Navigation
- [ ] 🏠 Bouton "Accueil" fonctionne
- [ ] 👶 Bouton "Accouchement" fonctionne
- [ ] 🌬️ Bouton "Respiration" fonctionne
- [ ] 🤱 Bouton "Postures" fonctionne (dédoublonné)
- [ ] ✨ Bouton "Alternatives" fonctionne
- [ ] 📋 Bouton "Bilan Santé" fonctionne

### Slides & Contenu
- [ ] Accueil: 5 slides (pas de "comment utiliser")
- [ ] Accueil Slide 2: "Messages Essentiels" avec 6 cartes
- [ ] Accouchement: 4 slides + vidéo
- [ ] Respiration: 3 slides
- [ ] Postures: 5 slides
- [ ] Alternatives: 6 slides + vidéo

### Traductions
- [ ] Français: tous les textes traduits ✓
- [ ] English: tous les textes traduits ✓
- [ ] العربية: tous les textes traduits ✓
- [ ] RTL arabe: direction correcte

### Animations
- [ ] Slides: animation slideUp
- [ ] Feature chips: animation bounce avec délai
- [ ] Message cards: animation décalée
- [ ] Icônes: animation float
- [ ] Survol: transformation smooth

### Bilan Santé
- [ ] Formulaire affiche tous les champs
- [ ] Pas d'appel API Anthropic
- [ ] Analyse générée localement
- [ ] Résultats s'affichent correctement
- [ ] Mode offline fonctionne

### Mode sombre
- [ ] Toggle fonctionne
- [ ] Préférence stockée en localStorage
- [ ] Texte du bouton se met à jour
- [ ] Style appliqué correctement

### Crédits
- [ ] Menu: Raed Azouzi visible
- [ ] Pied de page: crédits visibles
- [ ] Liens Instagram: @raed__az
- [ ] Numéro: +216 29 446 035

### Responsivité
- [ ] Desktop: mise en page correcte
- [ ] Tablet: adaptation fluide
- [ ] Mobile: lisibilité optimale
- [ ] Vidéos: adaptatives

---

## 🔧 Configuration avancée

### Option A: Personnalisations de texte

**Pour modifier les textes, éditez `script.js`:**
```javascript
// Trouvez la section TRANSLATIONS
const translations = {
    fr: {
        // Modifiez ici les valeurs françaises
        slide_birth_0_title: "👶 Accouchement Physiologique",
        // etc.
    },
    en: {
        // Modifiez ici les valeurs anglaises
    },
    ar: {
        // Modifiez ici les valeurs arabes
    }
};
```

### Option B: Changer les images

**Pour remplacer une image de posture:**
```html
<!-- Dans main.html, trouvez: -->
<img src="Décubitus Latéral Gauche.jpeg" alt="...">

<!-- Remplacez par votre image: -->
<img src="mon-image-dlg.jpeg" alt="...">
```

### Option C: Modifier les vidéos

**Dans main.html, section Accouchement:**
```html
<video controls>
    <source src="accouchement physiologique .mp4" type="video/mp4">
</video>
```

**Dans main.html, section Alternatives:**
```html
<video controls>
    <source src="alternatives.mp4" type="video/mp4">
</video>
```

### Option D: Changer les couleurs

**Dans style.css, modifiez les variables:**
```css
:root {
    --pink-light: #ffd6e7;   /* Rose clair */
    --pink-mid: #f7a8c4;     /* Rose moyen */
    --crimson: #b0005c;      /* Cramoisi */
    --purple: #c084fc;       /* Violet */
    /* etc. */
}
```

---

## 📱 Tests de compatibilité

### Navigateurs supportés
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Samsung Internet 13+

### Appareils
- ✅ iPhone 12+
- ✅ Android 10+
- ✅ iPad (tous)
- ✅ Desktop (tous)

### Tester sur différents appareils
```bash
# Chrome DevTools
1. F12 ou Cmd+Option+I
2. Ctrl+Shift+M (Toggle device toolbar)
3. Testez les breakpoints

# Appareils réels
- iPhone: accédez via Safari
- Android: accédez via Chrome
- Testez le mode portrait et paysage
```

---

## 🌐 Déploiement en ligne

### Option 1: GitHub Pages (Gratuit)

```bash
# 1. Initialiser le repo
git init
git add .
git commit -m "Initial commit - Pregnancy Guide"

# 2. Pousser vers GitHub
git remote add origin https://github.com/YOUR_USERNAME/pregnancy-guide.git
git branch -M main
git push -u origin main

# 3. Activer GitHub Pages
# → Settings → Pages → Source: main branch → Save
# Site disponible à: https://YOUR_USERNAME.github.io/pregnancy-guide/
```

### Option 2: Netlify (Gratuit + Facile)

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Déployer
netlify deploy --prod

# 3. Suivez les instructions
# Site automatiquement hébergé
```

### Option 3: Serveur web personnel

```bash
# Upload via FTP/SFTP tous les fichiers vers:
public_html/pregnancy-guide/

# Accédez à:
https://votredomaine.com/pregnancy-guide/
```

---

## 🐛 Dépannage

### Problem: Vidéos ne jouent pas
```
Solution:
1. Vérifiez le chemin du fichier (case-sensitive!)
2. Testez le format: MP4 H.264 + AAC audio
3. Vérifiez la taille du fichier (< 50MB recommandé)
4. Testez directement: <video src="...">
```

### Problem: Traductions ne s'affichent pas
```
Solution:
1. Vérifiez les clés data-i18n en HTML
2. Vérifiez que les clés existent dans translations{}
3. Console: changeLang('fr') et vérifiez
4. Rafraîchissez Ctrl+F5
```

### Problem: Animations ne fonctionnent pas
```
Solution:
1. Vérifiez que style.css est chargé
2. Vérifiez les @keyframes CSS
3. Vérifiez les classes d'animation sur les éléments
4. Console: inspect les éléments
```

### Problem: Bilan Santé ne fonctionne pas
```
Solution:
1. Vérifiez que bilan.html est présent
2. Testez que generateOfflineAnalysis() existe
3. Vérifiez la console pour les erreurs JavaScript
4. Testez avec données simples
```

---

## 📊 Statistiques du projet

| Métrique | Valeur |
|----------|--------|
| Pages HTML | 3 |
| Fichiers JavaScript | 1 (intégré) |
| Fichiers CSS | 1 (intégré) |
| Animations CSS | 10+ |
| Langues supportées | 3 (FR/EN/AR) |
| Slides totales | 23 |
| Vidéos | 3 |
| Images de postures | 4 |
| Cartes de messages | 6 |
| Traductions de clés | 200+ |

---

## 💾 Sauvegarde & Maintenance

### Sauvegarder régulièrement
```bash
# Créer une sauvegarde
tar -czf pregnancy-guide-backup-$(date +%Y%m%d).tar.gz .

# Lister les sauvegardes
ls -la *.tar.gz
```

### Mettre à jour le contenu
```bash
# Modifier directement les textes dans script.js
# Modifier les images (remplacement fichiers)
# Modifier les vidéos (remplacer fichiers)
# Pas de redéploiement compliqué nécessaire!
```

### Suivi des versions
```
v1.0 - Version initiale
  - 3 langues
  - 5 sections
  - Bilan santé offline

v1.1 - Améliorations
  - Animations ajoutées
  - Nouvelle section Accouchement
  - Nouvelle section Alternatives
  - Crédits Raed Azouzi
```

---

## 📞 Support technique

### Pour les problèmes:
- **Développeur:** Raed Azouzi
- **Téléphone:** +216 29 446 035
- **Instagram:** @raed__az
- **Problèmes courants:** Voir section "Dépannage"

### Questions fréquentes

**Q: Puis-je modifier le texte après le déploiement?**
R: Oui! Éditez script.js et redéployez.

**Q: Comment ajouter une nouvelle langue?**
R: Ajoutez une nouvelle section dans `translations` avec la clé ISO 639-1 (ex: 'es', 'de', 'it').

**Q: Les vidéos doivent-elles être hébergées?**
R: Non, placez-les dans le même dossier que index.html.

**Q: Comment améliorer la performance?**
R: Compressez les vidéos, optimisez les images, utilisez un CDN.

---

## ✨ Prochaines améliorations possibles

1. **Dark mode** — Déjà implémenté! ✓
2. **PWA** — App web progressive installable
3. **Service Worker** — Fonctionnement offline complet
4. **Analytics** — Suivi utilisateur anonyme
5. **Feedback** — Formulaire de retour utilisateur
6. **Notification** — Alertes de suivi de grossesse
7. **Export PDF** — Télécharger les résultats

---

## 📄 Licence & Crédits

**© 2026 Guide de la Femme Enceinte**

- **Équipe médicale:** Rayen Azouzi, Oumayma Bel Haj, Manel Maati, Israa Louhichi, Mariem Aridhi
- **Développement:** Raed Azouzi
- **Conception:** Équipe Tunisienne

---

## 🎓 Pour apprendre davantage

- **MDN Web Docs:** https://developer.mozilla.org
- **CSS Animations:** https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- **HTML5 Video:** https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
- **JavaScript i18n:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

---

**Félicitations! Vous êtes prêt à déployer le Guide de la Femme Enceinte! 💗**

*Pour toute question: +216 29 446 035 ou @raed__az sur Instagram*
