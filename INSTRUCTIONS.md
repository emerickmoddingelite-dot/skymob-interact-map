# 🗺️ Comment ajouter la vraie carte de Cayo Perico

## Étape 1 : Trouver l'image de la carte

Vous avez besoin d'une image de la carte de Cayo Perico de GTA V. Voici quelques sources possibles :

- **GTAWeb.eu** : https://gtaweb.eu/gtao-map/cp/35r
- **Reddit** : Cherchez "Cayo Perico high res map" sur r/gtaonline
- **GTA Wiki** : https://gta.fandom.com/wiki/Cayo_Perico
- **Screenshots personnels** : Prenez une screenshot de la carte dans GTA V Online

## Étape 2 : Télécharger l'image

1. Téléchargez l'image de la carte de Cayo Perico
2. Renommez-la en `cayo-perico-map.png` (format PNG requis)
3. Assurez-vous que l'image est de haute résolution (minimum 1920x1080 recommandé, idéalement 4K pour un meilleur affichage)

## Étape 3 : Ajouter l'image au projet

Placez l'image dans le dossier `public/` du projet :

```
cayo-perico-map/
├── public/
│   ├── cayo-perico-map.png  ← Ajoutez votre image ici (format PNG)
│   ├── next.svg
│   └── vercel.svg
├── app/
├── components/
└── ...
```

## Étape 4 : Ajuster les positions des marqueurs

Une fois l'image ajoutée, vous devrez probablement ajuster les positions des marqueurs dans `components/CayoPericoMap.tsx` :

```typescript
const locations: Location[] = [
  {
    id: '1',
    name: 'Villa El Rubio',
    type: 'zone',
    x: 40,  // Ajustez ces valeurs (0-100)
    y: 30,  // Ajustez ces valeurs (0-100)
    description: 'Zone principale de l\'événement',
    color: '#ef4444'
  },
  // ...
];
```

**Conseils pour le positionnement :**
- `x: 0` = bord gauche, `x: 100` = bord droit
- `y: 0` = bord haut, `y: 100` = bord bas
- Utilisez le mode développement pour tester les positions en temps réel

## Étape 5 : Tester

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez http://localhost:3000 et vérifiez que :
1. L'image de la carte s'affiche correctement
2. Les marqueurs sont aux bons endroits
3. Les tooltips fonctionnent au survol
4. Le clic sur les marqueurs affiche les détails

## Alternative : Utiliser une URL externe

Si vous ne voulez pas ajouter l'image localement, vous pouvez utiliser une URL externe :

Modifiez `components/CayoPericoMap.tsx` :

```typescript
<img 
  src="https://votre-url.com/cayo-perico-map.jpg" 
  alt="Carte de Cayo Perico"
  className="w-full h-full object-cover"
  onError={(e) => {
    e.currentTarget.style.display = 'none';
  }}
/>
```

## Dépannage

### L'image ne s'affiche pas
- Vérifiez que le fichier est bien dans le dossier `public/`
- Vérifiez que le nom du fichier correspond exactement (`cayo-perico-map.jpg`)
- Vérifiez les permissions du fichier

### Les marqueurs sont mal positionnés
- Ajustez les valeurs `x` et `y` dans le tableau `locations`
- Utilisez des valeurs entre 0 et 100 (pourcentage)
- Testez en temps réel avec `npm run dev`

### L'image est déformée
- L'image utilise `object-cover` pour remplir le conteneur
- Si vous voulez préserver les proportions, changez `object-cover` en `object-contain`
- Ajustez le ratio d'aspect dans `aspect-video` si nécessaire

## Support

Si vous avez des problèmes, n'hésitez pas à vérifier :
- La console du navigateur pour les erreurs
- Les logs du terminal avec `npm run dev`
- La documentation Next.js pour les images statiques
