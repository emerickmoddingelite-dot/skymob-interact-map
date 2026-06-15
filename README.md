# 🏝️ Carte Interactive Cayo Perico - GTA V

Carte interactive de l'île de Cayo Perico (GTA V) pour afficher les informations d'événement et les emplacements des entreprises et stands. Hébergeable sur Vercel.

## 🚀 Fonctionnalités

- **Carte interactive** de l'île de Cayo Perico avec marqueurs cliquables
- **Informations événement** avec date, lieu et activités
- **Système de marqueurs** pour les entreprises, stands et zones
- **Interface moderne** avec design responsive
- **Panneau de détails** pour chaque emplacement
- **Légende interactive** pour identifier les types d'emplacements

## 🛠️ Technologies

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **TailwindCSS** - Styling moderne
- **React Hooks** - Gestion d'état

## 📋 Prérequis

- Node.js 18+ installé
- npm, yarn, pnpm ou bun

## 🏃 Démarrage

1. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

3. **Ouvrir le navigateur**
```
http://localhost:3000
```

## 🎨 Personnalisation

### Modifier les emplacements

Éditez le fichier `components/CayoPericoMap.tsx` et modifiez le tableau `locations`:

```typescript
const locations: Location[] = [
  {
    id: '1',
    name: 'Nom de l\'emplacement',
    type: 'entreprise' | 'stand' | 'zone',
    x: 50,  // Position X en pourcentage
    y: 50,  // Position Y en pourcentage
    description: 'Description de l\'emplacement',
    color: '#3b82f6'  // Couleur du marqueur
  },
  // Ajoutez d'autres emplacements...
];
```

### Modifier les informations événement

Éditez le fichier `components/EventInfo.tsx` pour modifier les informations de l'événement.

## 🚢 Déploiement sur Vercel

### Méthode 1: Via Vercel CLI

1. **Installer Vercel CLI**
```bash
npm install -g vercel
```

2. **Se connecter à Vercel**
```bash
vercel login
```

3. **Déployer**
```bash
vercel
```

### Méthode 2: Via GitHub

1. **Pousser le code sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/cayo-perico-map.git
git push -u origin main
```

2. **Importer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre repository GitHub
   - Cliquez sur "Deploy"

### Méthode 3: Via l'interface Vercel

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Importez votre repository
3. Cliquez sur "Deploy"

## 📝 Structure du projet

```
cayo-perico-map/
├── app/
│   ├── page.tsx          # Page principale
│   ├── layout.tsx        # Layout global
│   └── globals.css       # Styles globaux
├── components/
│   ├── CayoPericoMap.tsx # Composant carte interactive
│   ├── EventInfo.tsx     # Composant infos événement
│   └── LocationPanel.tsx # Composant panneau détails
├── public/               # Assets statiques
├── package.json          # Dépendances
└── README.md            # Ce fichier
```

## 🎯 Types d'emplacements

- **🏢 Entreprises** (bleu) - Lieux principaux et infrastructures
- **📍 Stands** (vert) - Points d'intérêt et services
- **🏝️ Zones** (rouge) - Aires géographiques et activités
- **VIP** (orange) - Zones exclusives

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à:
- **Desktop** (1024px+)
- **Tablette** (768px - 1023px)
- **Mobile** (< 768px)

## 🔧 Maintenance

Pour mettre à jour les dépendances:
```bash
npm update
```

Pour vérifier les vulnérabilités:
```bash
npm audit
```

## 📄 Licence

Ce projet est créé pour un événement GTA V sur Cayo Perico.

## 🤝 Contribution

Pour ajouter de nouvelles fonctionnalités ou corriger des bugs, n'hésitez pas à faire une pull request.
