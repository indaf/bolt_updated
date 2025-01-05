import { Exercise } from '../../types/Exercise';
import { createExerciseBase } from './utils';

// Series ID for Adaptive One exercises
const SERIES_ID = 1;

export const adaptiveOneExercises: Exercise[] = [
  {
    ...createExerciseBase(SERIES_ID, 1, "Adaptive One"),
    objective: "Réaliser une combinaison de tir en utilisant les formes ou les couleurs...",
    direction: "Balayage par ligne et par colonne",
    images: {
      drill: "https://drive.google.com/open?id=1Ew-3DKlH3gjJC-rel_q_4InVtF_1m2Kd",
      target: "https://drive.google.com/open?id=1h94tE07nPu66gfNu41brPGb58QzonQz4"
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
    skills: [],
    audio: {
      soundcloud: "https://soundcloud.com/creative-digital-target/sets/adaptative-one",
      embed: '<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1023376465&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"></iframe>'
    }
  }
  // Add other exercises with incrementing numbers
];