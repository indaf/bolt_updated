import { Exercise } from '../../types/Exercise';

export const consistencyOneExercises: Exercise[] = [
  {
    id: 1,
    name: "Cible Consistency One - Exercice 0001",
    module: {
      name: "Module initial",
      difficulty: "Module initial ⭐"
    },
    categories: ["modèles", "mois", "semaines"],
    target: {
      name: "Consistency One",
      count: 1
    },
    weapon: {
      type: "PA",
      transition: false,
      starting: "Arme de poing",
      position: "Position contact"
    },
    objective: "Sur la ligne 1, tirer 1 munition par élément.",
    direction: "Libre",
    images: {
      drill: "https://drive.google.com/file/d/1sN4fux0vTY9RvdHEv6dD1Jw3lm8M3BCf/view",
      target: "https://drive.google.com/file/d/1_C8CA7-7NGxlzDyg9sPlwpa0tKPjDRqw/view"
    },
    ammunition: {
      withoutConstraints: 4,
      withConstraints: 4,
      magazineChangesPA: false,
      magazineChangesFA: false,
      magazine1PA: 4,
      magazine2PA: 0,
      magazine1FA: 0,
      magazine2FA: 0,
      distance: 5
    },
    constraints: [],
    skills: [
      {
        name: "Gestuelle globale",
        description: "Réaliser la bonne gestuelle de tir durant chaque action de feu est primordial. Dans cet exercice, le tireur doit focaliser son attention sur ce qu'il est entrain de faire dans sa gestuelle. Pour qu'elle soit parfaitement réussi, il doit se remémorer chaque étape important du tir.",
        icon: "https://drive.google.com/file/d/1NIsypS96LviM4CyL72MgU9qMHsbcrPL5/view"
      }
    ],
    audio: {
      soundcloud: "https://soundcloud.com/creative-digital-target/sets/adaptative-one",
      embed: '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1023376465&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>'
    }
  }
];