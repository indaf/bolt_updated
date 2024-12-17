export const exerciseOptions = [
  {
    id: 'distance',
    label: 'Distance de la grille',
    description: 'Définit la distance entre le tireur et les différentes lignes de la grille',
    options: [
      { value: 'faible', label: 'Faible (3-9m)', description: 'Première ligne à 3m, dernière à 9m', difficulty: 1 },
      { value: 'moyen', label: 'Moyen (5-11m)', description: 'Première ligne à 5m, dernière à 11m', difficulty: 2 },
      { value: 'eleve', label: 'Élevé (7-13m)', description: 'Première ligne à 7m, dernière à 13m', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'targets',
    label: 'Nombre de cibles',
    description: 'Détermine le nombre de cibles à utiliser pendant l\'exercice',
    options: [
      { value: '1', label: '1 cible centrale', difficulty: 1 },
      { value: '4', label: '4 cibles alignées', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'shooters',
    label: 'Nombre de tireurs',
    description: 'Nombre de tireurs participant simultanément',
    options: [
      { value: '1', label: '1 tireur', difficulty: 1 },
      { value: '2', label: '2 tireurs', difficulty: 2 },
      { value: '3', label: '3 tireurs', difficulty: 3 },
      { value: '4', label: '4 tireurs', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'lighting',
    label: 'Luminosité',
    description: 'Conditions de luminosité pour l\'exercice',
    options: [
      { value: 'normal', label: 'Normal', difficulty: 0 },
      { value: 'low', label: 'Basse', difficulty: 1 },
      { value: 'night', label: 'Nuit', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'destabilization',
    label: 'Environnement déstabilisant',
    description: 'Éléments perturbateurs pendant l\'exercice',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'laser', label: 'Laser et lampe', difficulty: 1 },
      { value: 'smoke', label: 'Fumigène', difficulty: 2 },
      { value: 'plaster', label: 'Grenade à plâtre', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'equipment',
    label: 'Équipement',
    description: 'Type d\'équipement à porter pendant l\'exercice',
    options: [
      { value: 'light', label: 'Léger', difficulty: 1 },
      { value: 'heavy', label: 'Lourd', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'nvg',
    label: 'Jumelle de vision nocturne',
    description: 'Utilisation de jumelles de vision nocturne',
    options: [
      { value: 'none', label: 'Aucune', difficulty: 0 },
      { value: 'alone', label: 'Seule', difficulty: 1 },
      { value: 'ir', label: 'Lampe et laser IR', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'weapon',
    label: 'Armes',
    description: 'Type d\'arme à utiliser pour l\'exercice',
    options: [
      { value: 'pistolet', label: 'Pistolet automatique', difficulty: 2 },
      { value: 'fusil', label: 'Fusil d\'assaut', difficulty: 1 }
    ],
    difficulty: 2
  },
  {
    id: 'bodyPosition',
    label: 'Position du corps',
    description: 'Position du corps à adopter lors du tir',
    options: [
      { value: 'plot_dependent', label: 'En fonction du plot', difficulty: 3 },
      { value: 'standing', label: 'Debout', difficulty: 1 },
      { value: 'kneeling', label: 'Fléchis', difficulty: 2 },
      { value: 'prone_front', label: 'Allongé de face', difficulty: 2 },
      { value: 'prone_left', label: 'Allongé côté gauche', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'tacticalPosition',
    label: 'Position de tir tactique',
    description: 'Position tactique à adopter pour le tir',
    options: [
      { value: 'contact', label: 'Contact', difficulty: 1 },
      { value: 'compress', label: 'Compress ready', difficulty: 2 },
      { value: 'high', label: 'High ready', difficulty: 2 },
      { value: 'low', label: 'Low ready', difficulty: 2 },
      { value: 'owb', label: 'Arme à l\'étui - OWB', difficulty: 3 },
      { value: 'iwb', label: 'Arme à l\'étui - IWB', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'shootType',
    label: 'Type de tir',
    description: 'Position de tir par rapport aux plots',
    options: [
      { value: 'plot', label: 'Au plot', difficulty: 1 },
      { value: 'movement', label: 'En mouvement', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'trigger',
    label: 'Déclenchement du tir',
    description: 'Définit le signal de déclenchement du tir',
    options: [
      { value: 'libre', label: 'Libre', difficulty: 0 },
      { value: 'sonore', label: 'Sonore', difficulty: 1 },
      { value: 'visuel', label: 'Visuel', difficulty: 1 },
      { value: 'tactile', label: 'Tactile', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'grip',
    label: 'Prise en main',
    description: 'Position des mains sur l\'arme',
    options: [
      { value: 'two_hands_dom', label: 'Deux mains dominante', difficulty: 1 },
      { value: 'two_hands_support', label: 'Deux mains support', difficulty: 2 },
      { value: 'dom_hand', label: 'Main dominante', difficulty: 2 },
      { value: 'support_hand', label: 'Main support', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'magChange',
    label: 'Changement de chargeur',
    description: 'Type de changement de chargeur à effectuer',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'tactical', label: 'Tactique', difficulty: 2 },
      { value: 'emergency', label: 'D\'urgence', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'incident',
    label: 'Incident de tir',
    description: 'Type d\'incident à gérer pendant l\'exercice',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'click', label: 'Détente avec un clic', difficulty: 1 },
      { value: 'inert', label: 'Détente inerte', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'weaponTransition',
    label: 'Transition d\'arme',
    description: 'Définit si une transition d\'arme est nécessaire pendant l\'exercice',
    options: [
      { value: 'none', label: 'Aucune', difficulty: 0 },
      { value: 'yes', label: 'Oui', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'noAnticipation',
    label: 'Anticipation interdite',
    description: 'Interdiction de regarder la cible avant l\'exercice',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'yes', label: 'Oui', difficulty: 1 }
    ],
    difficulty: 1
  },
  {
    id: 'alphanumeric',
    label: 'Alphanumérique',
    description: 'Ajoute des éléments alphanumériques à la séquence de tir',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: '1', label: '1 élément', difficulty: 1 },
      { value: '2', label: '2 éléments', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'next',
    label: 'Next',
    description: 'Passage à l\'élément suivant',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'yes', label: 'Sur le plot et la cible', difficulty: 1 }
    ],
    difficulty: 1
  },
  {
    id: 'back',
    label: 'Back',
    description: 'Retour en arrière dans la séquence',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'yes', label: 'Sur le plot et la cible', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'anchor',
    label: 'Ancre',
    description: 'Point de référence fixe',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'yes', label: 'Sur le plot et la cible', difficulty: 1 }
    ],
    difficulty: 1
  },
  {
    id: 'counterOrder',
    label: 'Contre-ordre',
    description: 'Modification de la séquence en cours',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'yes', label: 'Sur le plot et la cible', difficulty: 2 }
    ],
    difficulty: 2
  },
  {
    id: 'marker',
    label: 'Marqueur',
    description: 'Type d\'information à mémoriser pendant l\'exercice',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'target', label: 'Marque cible', difficulty: 1 },
      { value: 'position', label: 'Marque position', difficulty: 2 },
      { value: 'gesture', label: 'Marque gestuelle', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'irrelevantInfo',
    label: 'Informations non pertinentes',
    description: 'Distractions à ignorer pendant l\'exercice',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'visual', label: 'Visuelle', difficulty: 2 },
      { value: 'sound', label: 'Sonore', difficulty: 2 },
      { value: 'physical', label: 'Physique', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'upperBody',
    label: 'Musculaire (membre supérieur)',
    description: 'Exercice musculaire pour les membres supérieurs',
    options: [
      { value: 'none', label: 'Aucun', difficulty: 0 },
      { value: 'farmers_walk', label: 'Farmer\'s Walk', difficulty: 2 },
      { value: 'overhead', label: 'Dumbbell overhead', difficulty: 3 }
    ],
    difficulty: 3
  },
  {
    id: 'lowerBody',
    label: 'Musculaire (membre inférieur)',
    description: 'Exercice musculaire pour les membres inférieurs',
    options: [
      { value: 'none', label: 'Aucune', difficulty: 0 },
      { value: 'bear', label: 'Bear Crawl', difficulty: 2 },
      { value: 'army', label: 'Army Crawl', difficulty: 3 }
    ],
    difficulty: 3
  }
] as const;