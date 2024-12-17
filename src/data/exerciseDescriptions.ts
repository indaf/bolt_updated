export const exerciseDescriptions: Record<string, Record<string, string>> = {
  distance: {
    faible: "La première ligne de la grille sera positionnée à 3 mètres, la deuxième à 5 mètres, la troisième à 7 mètres et la quatrième à 9 mètres.",
    moyen: "La première ligne de la grille sera positionnée à 5 mètres, la deuxième à 7 mètres, la troisième à 9 mètres et la quatrième à 11 mètres.",
    eleve: "La première ligne de la grille sera positionnée à 7 mètres, la deuxième à 9 mètres, la troisième à 11 mètres et la quatrième à 13 mètres."
  },
  targets: {
    "1": "Le tireur concentre ses tirs sur une seule cible centrale, quelle que soit la colonne où il se trouve dans la grille. Ce paramètre simplifie la configuration en limitant le nombre de cibles à traiter, permettant au tireur de se focaliser sur un point unique en face de la grille.",
    "4": `Quatre cibles sont alignées en hauteur devant la grille au sol, chacune correspondant à l'une des colonnes de la grille :

Cible 1 est alignée avec la première colonne de la grille.
Cible 2 est alignée avec la deuxième colonne.
Cible 3 est alignée avec la troisième colonne.
Cible 4 est alignée avec la quatrième colonne.

Dans cette configuration, le tireur devra :

Se déplacer physiquement sur les plots du sol en fonction des consignes (par exemple, une couleur ou une forme donnée).
Tirer sur la cible qui correspond à la colonne du plot où il se trouve. Par exemple, en se positionnant sur un plot de la première colonne, le tireur devra viser et tirer sur la cible 1 ; s'il est sur un plot de la deuxième colonne, il tirera sur la cible 2, et ainsi de suite.`
  },
  alphanumeric: {
    none: "Aucune lettre ou chiffre ne sera ajouté à la combinaison de tir annoncée par l'instructeur. La consigne se limitera aux critères de couleur, de forme et de direction sans éléments alphanumériques supplémentaires.",
    "1": `Un seul élément alphanumérique (une lettre ou un chiffre) sera ajouté, soit au début, soit à la fin de la combinaison de tir annoncée par l'instructeur.

Exemple de consigne : Si la consigne est "haut, vert, 3", le tireur devra :
Identifier et traiter les formes géométriques vertes de haut en bas, puis
Terminer en tirant sur la case correspondant au chiffre "3".`,
    "2": "Deux éléments alphanumériques (une lettre ou un chiffre) seront ajoutés, soit au début, soit à la fin de la combinaison de tir annoncée par l'instructeur."
  },
  weapon: {
    pistolet: "Le tireur utilisera le pistolet automatique pour l'ensemble de la séquence de tir. Si le champ \"Transition d'arme\" est configuré sur \"Oui\", une transition vers une autre arme peut être incluse dans la séquence d'exercice.",
    fusil: "Le tireur utilisera le fusil d'assaut pour l'ensemble de la séquence de tir. Si le champ \"Transition d'arme\" est configuré sur \"Oui\", une transition vers une autre arme peut être incluse dans la séquence d'exercice."
  },
  trigger: {
    libre: "Le tireur peut tirer de sa propre initiative à tout moment durant la séquence de tir, sans attendre de signal externe.",
    sonore: "Le tireur doit tirer uniquement lorsqu'un signal sonore (tel qu'un bip ou un ordre vocal) est donné par l'instructeur.",
    visuel: "Le tireur doit tirer lorsqu'il reçoit un signal visuel (comme une lampe, un laser, ou un dispositif de type Blazepod) activé par l'instructeur.",
    tactile: "Le tireur doit tirer en réponse à un signal tactile, ressenti par une pression physique exercée sur une partie du corps par l'instructeur."
  },
  shootType: {
    plot: "Le tireur doit tirer uniquement lorsqu'il est positionné sur un plot au sol. Chaque tir doit être exécuté une fois le tireur arrivé sur le plot désigné.",
    movement: "Le tireur doit tirer uniquement lorsqu'il est en déplacement entre les plots. Le tir doit être effectué en mouvement, avant d'atteindre le plot suivant."
  },
  shooters: {
    "1": "Un seul tireur participera à la séquence de tir.",
    "2": "Deux tireurs participeront simultanément à la séquence, à condition que la configuration comprenne de 2 à 16 plots au sol.",
    "3": "Trois tireurs participeront simultanément à la séquence, à condition que la configuration comprenne exactement 16 plots au sol.",
    "4": "Quatre tireurs participeront simultanément à la séquence, à condition que la configuration comprenne exactement 16 plots au sol."
  },
  grip: {
    two_hands_dom: "Le tireur doit utiliser ses deux mains, avec une prise axée sur la main dominante, pour toute la séquence de tir.",
    two_hands_support: "Le tireur doit utiliser ses deux mains, avec une prise axée sur la main de support, pour toute la séquence de tir.",
    dom_hand: "Le tireur doit tirer uniquement avec sa main dominante, sans l'appui de la main de support, pour toute la séquence de tir.",
    support_hand: "Le tireur doit tirer uniquement avec sa main de support, sans l'appui de la main dominante, pour toute la séquence de tir."
  },
  magChange: {
    none: "Aucun changement de chargeur ne sera effectué durant l'exercice. Le tireur utilise un chargeur unique pour l'ensemble de la séquence de tir.",
    tactical: "Le tireur effectuera un changement de chargeur tactique en réponse à un signal (sonore ou visuel) donné par l'instructeur durant la séquence de tir.",
    emergency: "Le tireur effectuera un changement de chargeur d'urgence, par exemple lorsqu'il rencontre des munitions inertes ou qu'il est à court de munitions."
  },
  incident: {
    none: "Aucun incident de tir n'est prévu lors de la séquence. Le tir se déroule normalement sans interruption.",
    click: "Un incident se produira durant la séquence, provoquant un \"clic\" à la pression de la détente. Le tireur devra gérer cet incident en appliquant les procédures apprises, pouvant être causé par une munition défectueuse ou un percuteur défaillant.",
    inert: "Un incident se produira, laissant la détente inerte. Le tireur devra gérer cet incident en suivant la gestuelle enseignée, pouvant être dû à une culasse mal verrouillée, l'absence de cartouche chambrée, une pièce interne cassée ou une détente non réarmée."
  },
  weaponTransition: {
    none: "Le tireur utilise la même arme pour l'ensemble de la séquence de tir, sans changement.",
    yes: "Le tireur effectuera une transition d'arme au cours de la séquence, en réponse à un signal donné par l'instructeur (visuel, sonore, ou tactile)."
  },
  bodyPosition: {
    plot_dependent: "Le tireur doit adapter sa position en fonction de sa place sur la grille de plots au sol. Par exemple, en première ligne, il tirera debout, et s'il est positionné sur la colonne de gauche, il devra tirer avec la main gauche. La position et la main utilisée peuvent changer en fonction de chaque déplacement sur la grille.",
    standing: "Le tireur doit rester en position debout pour l'ensemble de la séquence de tir, sans variation de posture.",
    kneeling: "Le tireur doit adopter une position fléchie pour toute la séquence, en pliant les genoux tout en maintenant une position stable.",
    prone_front: "Le tireur doit se placer en position allongée de face (ventre au sol) durant toute la séquence de tir.",
    prone_left: "Le tireur doit se placer en position allongée sur le côté gauche pour l'ensemble de la séquence de tir."
  },
  tacticalPosition: {
    libre: "Le tireur choisi la gestuelle qui lui est le plus approprié",
    contact: "Le tireur doit tirer depuis la position de contact. L'arme est maintenue près du corps, les bras fléchis et prêts à réagir rapidement, avec le canon dirigé vers le bas ou légèrement vers l'avant.",
    compress: "Le tireur doit tirer depuis la position compress ready, où l'arme est maintenue près de la poitrine, les coudes fléchis et le canon pointant vers l'avant, permettant une préparation rapide.",
    high: "Le tireur doit tirer depuis la position high ready. Dans cette position, l'arme est tenue près de la hanche avec le canon dirigé vers le sol, permettant une transition rapide vers la position de tir tout en maintenant la sécurité.",
    low: "Le tireur doit tirer depuis la position low ready, où l'arme est maintenue près de la poitrine, le canon légèrement pointé vers le haut, aligné aux yeux pour une réaction rapide aux menaces.",
    owb: "Le tireur doit tirer depuis la position avec l'arme à l'étui extérieur (OWB), portée à l'extérieur de la ceinture pour un accès rapide.",
    iwb: "Le tireur doit tirer depuis la position avec l'arme à l'étui intérieur (IWB), portée à l'intérieur de la ceinture pour une meilleure dissimulation de l'arme."
  },
  equipment: {
    light: "Le tireur utilise un équipement léger, permettant une sécurité de base et une grande liberté de mouvement, facilitant les déplacements amples sans contrainte.",
    heavy: "Le tireur utilise un équipement lourd, incluant un porte-plaque et un casque balistique, offrant une protection accrue tout en ajoutant une contrainte de poids qui peut limiter les mouvements."
  },
  nvg: {
    none: "Aucune jumelle de vision nocturne n'est utilisée durant la séquence de tir.",
    alone: "Le tireur utilise les jumelles de vision nocturne sans assistance d'appareils infrarouges tels que lampe ou laser.",
    ir: "Le tireur utilise les jumelles de vision nocturne en combinaison avec une lampe infrarouge et un laser, améliorant la visibilité et la précision dans l'obscurité."
  },
  upperBody: {
    none: "Aucune contrainte musculaire supplémentaire n'est ajoutée à l'exercice de base pour les membres supérieurs.",
    farmers_walk: "Le tireur marche entre les plots en portant des charges lourdes (comme des caisses de munitions, kettlebells ou haltères) dans chaque main, bras tendus vers le bas, ajoutant une contrainte musculaire aux membres supérieurs.",
    overhead: "Le tireur marche entre les plots en portant des charges lourdes (comme des caisses de munitions, kettlebells ou haltères) au-dessus de sa tête, bras tendus vers le haut, imposant une charge supplémentaire sur les épaules et les bras."
  },
  lowerBody: {
    none: "Aucune contrainte musculaire supplémentaire n'est ajoutée à l'exercice de base pour les membres inférieurs.",
    bear: "Le tireur se déplace entre les plots à quatre pattes, en appui sur les mains et les pieds, avec les genoux légèrement surélevés au-dessus du sol.",
    army: "Le tireur se déplace en rampant entre les plots au sol, en appui sur les avant-bras et les genoux, ajoutant une contrainte physique significative aux membres inférieurs."
  },
  lighting: {
    normal: "La séquence de tir se déroule dans des conditions de luminosité normale, avec une lumière suffisante comme en plein jour ou sous éclairage adéquat.",
    low: "La séquence de tir se déroule dans des conditions de faible luminosité, représentant un environnement au lever ou au coucher du soleil, avec une lumière réduite.",
    night: "La séquence de tir se déroule dans des conditions nocturnes, avec très peu de lumière résiduelle, simulant un environnement de nuit."
  },
  destabilization: {
    none: "",
    plaster: "Une grenade à plâtre est déclenchée à proximité du tireur pour le déstabiliser durant sa séquence de tir, créant un bruit et une dispersion de plâtre pour simuler une situation de stress.",
    laser: "Des pointeurs laser de couleurs variées et des lampes sont dirigés sur la cible, détournant l'attention du tireur en éclairant des zones aléatoires, pour perturber sa concentration.",
    smoke: "Une grenade fumigène est déclenchée, réduisant temporairement la visibilité du tireur en obscurcissant son champ de vision et masquant partiellement ses objectifs."
  },
  marker: {
    none: "",
    target: "À l'annonce de \"marque cible\" par l'instructeur, le tireur doit mémoriser la cible spécifique (forme géométrique et emplacement) sur laquelle il vient de tirer. À la fin de l'exercice, il devra restituer cette information à l'instructeur.",
    position: "À l'annonce de \"marque position\" par l'instructeur, le tireur doit mémoriser le plot exact depuis lequel il a tiré. À la fin de l'exercice, il devra indiquer sa position de tir à l'instructeur.",
    gesture: "À l'annonce de \"marque gestuelle\" par l'instructeur, le tireur doit mémoriser la gestuelle exacte qu'il a utilisée pour tirer. À la fin de l'exercice, il devra décrire cette gestuelle à l'instructeur."
  },
  back: {
    none: "",
    yes: "Si le tireur entend l'instructeur annoncer \"back\" alors qu'il s'apprête à terminer sa combinaison de tir, il doit revenir en arrière en suivant exactement le même chemin, en repassant par chaque plot et en ciblant chaque forme géométrique jusqu'à revenir à son point de départ initial."
  },
  next: {
    none: "",
    yes: "Si le tireur entend l'instructeur annoncer \"next\" en cours de combinaison, il doit ignorer l'élément qu'il s'apprêtait à tirer ainsi que le plot correspondant, et passer directement à l'étape suivante de la combinaison de tir. Si aucune étape suivante n'est prévue, l'exercice est terminé."
  },
  anchor: {
    none: "",
    yes: "Si le tireur entend l'instructeur annoncer \"ancre\" pendant la séquence de tir, il doit immédiatement interrompre sa combinaison actuelle et tirer sur la forme désignée comme \"ancre\" au début de la séance. Une fois cette cible traitée, le tireur reprend sa combinaison de tir initiale depuis l'endroit où il l'avait laissée."
  },
  counterOrder: {
    none: "",
    yes: "Si le tireur entend l'instructeur annoncer \"contre-ordre\" pendant la séquence, il doit interrompre sa combinaison actuelle et se concentrer sur un nouvel ordre. Ce contre-ordre consiste en une nouvelle forme géométrique ou couleur à traiter à partir de sa position actuelle. Par exemple, s'il traitait des formes rouges et entend l'instruction \"bleu\", il doit immédiatement passer à traiter les formes bleues dans la même direction de traitement que sa combinaison initiale."
  },
  noAnticipation: {
    none: "",
    yes: "Le tireur ne doit pas anticiper en regardant sa cible avant l'annonce de la combinaison par l'instructeur. Il doit fermer les yeux ou se tourner de dos à la cible jusqu'à ce que l'instructeur communique la combinaison de tir et donne le signal pour démarrer."
  },
  irrelevantInfo: {
    none: "",
    visual: "L'instructeur utilise des distractions visuelles (comme une lampe, un laser, ou un objet lumineux) pour détourner l'attention du tireur vers une information non pertinente. Le tireur doit ignorer cette distraction et rester concentré sur sa cible.",
    sound: "L'instructeur utilise des distractions sonores (comme un sifflet, une voix ou un bip) pour tenter de déconcentrer le tireur. Le tireur doit ignorer ce stimulus sonore non pertinent et continuer à se concentrer sur sa combinaison de tir.",
    physical: "L'instructeur applique une distraction physique, en touchant légèrement l'épaule ou la jambe du tireur (en toute sécurité) pour le déstabiliser. Le tireur doit ignorer cette distraction physique et maintenir sa concentration sur sa séquence de tir."
  }
};