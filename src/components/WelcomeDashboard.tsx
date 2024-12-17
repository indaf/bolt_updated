import React, { useState, useEffect } from 'react';
import { Target, Rocket, Star, ChevronRight } from 'lucide-react';
import Confetti from 'react-confetti';
import { useAuthStore } from '../store/authStore';

interface WelcomeDashboardProps {
  onClose: () => void;
}

export function WelcomeDashboard({ onClose }: WelcomeDashboardProps) {
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      icon: <Target className="w-8 h-8 text-[#DC002B]" />,
      title: "Bienvenue sur CDTARGET !",
      description: `Merci pour votre inscription ${user?.firstName} ! Nous sommes ravis de vous compter parmi nous.`
    },
    {
      icon: <Star className="w-8 h-8 text-[#009B70]" />,
      title: "Votre espace personnel",
      description: "Découvrez votre tableau de bord personnalisé et commencez à explorer toutes les fonctionnalités."
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      title: "Prêt à commencer ?",
      description: "Prêt à renforcer votre maîtrise du tir et celle de vos tireurs ?"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      
      <div className="bg-[#202123] rounded-lg w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#DC002B]/20 to-[#009B70]/20 rounded-full 
                         flex items-center justify-center mx-auto mb-6">
            {steps[step - 1].icon}
          </div>
          <h2 className="text-2xl font-bebas text-white mb-4">
            {steps[step - 1].title}
          </h2>
          <p className="text-gray-300 text-lg">
            {steps[step - 1].description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index + 1 === step ? 'bg-[#009B70]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {step < steps.length ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors text-lg"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors text-lg"
            >
              C'est parti !
              <Rocket className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}