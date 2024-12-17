import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, HelpCircle, Target, Users, Settings, Shield, Medal, MessageSquare } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ_CATEGORIES = [
  {
    id: 'general',
    label: 'Général',
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        question: "Qu'est-ce que CDTARGET ?",
        answer: "CDTARGET est une plateforme professionnelle dédiée à l'instruction du tir. Elle permet aux instructeurs de créer et gérer des exercices personnalisés, de suivre les performances des tireurs, et offre un espace communautaire pour partager les expériences."
      },
      {
        question: "Comment fonctionne le système de niveaux et d'XP ?",
        answer: "Le système de niveaux récompense votre activité sur la plateforme. Vous gagnez de l'XP en complétant des exercices, en créant du contenu, en interagissant avec la communauté. Chaque niveau débloque de nouvelles fonctionnalités et médailles."
      },
      {
        question: "Comment contacter le support ?",
        answer: "Vous pouvez contacter notre équipe support via l'adresse support@cdtarget.com ou en utilisant le formulaire de contact disponible dans vos paramètres."
      }
    ]
  },
  {
    id: 'exercises',
    label: "Générateur d'exercices",
    icon: <Target className="w-5 h-5" />,
    questions: [
      {
        question: "Comment créer un exercice personnalisé ?",
        answer: "Le générateur d'exercices vous guide à travers différentes étapes : configuration de la distance, nombre de cibles, conditions de tir, etc. Chaque paramètre influence la difficulté globale de l'exercice. Une fois configuré, vous pouvez le sauvegarder et le partager."
      },
      {
        question: "Comment fonctionne le système de difficulté ?",
        answer: "La difficulté est calculée en fonction des paramètres sélectionnés. Chaque option a un impact sur le score final de difficulté, représenté par des points. Plus le score est élevé, plus l'exercice est complexe."
      },
      {
        question: "Comment partager un exercice avec mes tireurs ?",
        answer: "Après avoir créé un exercice, vous pouvez le partager de plusieurs façons : en l'assignant directement à vos contacts, en générant un code unique, ou en le rendant public dans la bibliothèque d'exercices."
      }
    ]
  },
  {
    id: 'contacts',
    label: 'Gestion des contacts',
    icon: <Users className="w-5 h-5" />,
    questions: [
      {
        question: "Comment ajouter des contacts ?",
        answer: "Rendez-vous dans la section 'Mes contacts' pour rechercher des utilisateurs par nom ou identifiant. Vous pouvez également scanner un QR code ou utiliser le système de suggestion basé sur votre régiment."
      },
      {
        question: "Comment organiser mes contacts ?",
        answer: "Vous pouvez créer des groupes personnalisés, attribuer des tags, et filtrer vos contacts selon différents critères (régiment, niveau, statut, etc.)."
      }
    ]
  },
  {
    id: 'profile',
    label: 'Profil et paramètres',
    icon: <Settings className="w-5 h-5" />,
    questions: [
      {
        question: "Comment personnaliser mon profil ?",
        answer: "Dans les paramètres de votre profil, vous pouvez modifier votre photo, bannière, bio, et informations personnelles. Vous pouvez également lier vos réseaux sociaux et personnaliser vos préférences de notification."
      },
      {
        question: "Comment gérer ma confidentialité ?",
        answer: "Les paramètres de confidentialité vous permettent de contrôler qui peut voir votre profil, vos résultats, et vous contacter. Vous pouvez également gérer les blocages et les notifications."
      }
    ]
  },
  {
    id: 'instructors',
    label: 'Espace instructeur',
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        question: "Comment devenir instructeur certifié ?",
        answer: "Pour devenir instructeur certifié, vous devez fournir vos justificatifs professionnels lors de l'inscription. Notre équipe vérifiera vos credentials et validera votre statut d'instructeur."
      },
      {
        question: "Quels sont les outils spécifiques aux instructeurs ?",
        answer: "Les instructeurs ont accès à des fonctionnalités avancées : création d'exercices personnalisés, suivi détaillé des performances, statistiques avancées, création de programmes d'entraînement, et outils de gestion de groupe."
      }
    ]
  },
  {
    id: 'achievements',
    label: 'Médailles et récompenses',
    icon: <Medal className="w-5 h-5" />,
    questions: [
      {
        question: "Comment obtenir des médailles ?",
        answer: "Les médailles sont débloquées en accomplissant des objectifs spécifiques : performance aux exercices, participation communautaire, création de contenu, etc. Chaque médaille a ses propres critères de déblocage."
      },
      {
        question: "Quels sont les différents types de médailles ?",
        answer: "Il existe plusieurs catégories : médailles de performance, médailles d'instruction, médailles communautaires, et médailles spéciales. Chaque catégorie a différents niveaux de rareté : commun, rare, épique, et légendaire."
      }
    ]
  },
  {
    id: 'community',
    label: 'Communauté',
    icon: <MessageSquare className="w-5 h-5" />,
    questions: [
      {
        question: "Comment participer aux discussions ?",
        answer: "Vous pouvez participer aux discussions dans les différents salons thématiques, commenter les publications, et partager votre expérience. Respectez toujours les règles de la communauté."
      },
      {
        question: "Comment signaler un contenu inapproprié ?",
        answer: "Utilisez le bouton de signalement présent sur chaque contenu pour alerter les modérateurs. Vous pouvez également contacter directement le support pour les cas graves."
      }
    ]
  }
];

export function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev => 
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202123] rounded-lg w-full max-w-3xl p-6 relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Aide & FAQ</h2>

        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-[#343541]">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.id} className="py-2">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#343541] rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[#009B70]">{category.icon}</div>
                    <span className="text-white text-lg">{category.label}</span>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedCategory === category.id && (
                  <div className="mt-2 space-y-2">
                    {category.questions.map((item) => (
                      <div key={item.question} className="ml-12">
                        <button
                          onClick={() => toggleQuestion(item.question)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-[#343541] rounded-lg transition-colors"
                        >
                          <span className="text-white">{item.question}</span>
                          {expandedQuestions.includes(item.question) ? (
                            <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {expandedQuestions.includes(item.question) && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}