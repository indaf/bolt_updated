import React from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import Confetti from 'react-confetti';
import { useNavigateStore } from '../hooks/useNavigate';
import { useAuthStore } from '../store/authStore';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPendingInstructor?: boolean;
}

export function SuccessModal({ isOpen, onClose, isPendingInstructor }: SuccessModalProps) {
  const setCurrentPage = useNavigateStore((state) => state.setCurrentPage);
  const { isAuthenticated } = useAuthStore();

  if (!isOpen) return null;

  const handleDashboardAccess = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />
      <div className="bg-[#202123] rounded-lg w-full max-w-md p-6 relative">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#009B70]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#009B70]" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-4">Compte créé avec succès !</h2>
          
          {isPendingInstructor ? (
            <>
              <div className="mb-6 p-4 bg-[#343541] rounded-lg text-left">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#009B70] shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="mb-2 font-medium">Compte instructeur en attente de validation</p>
                    <p className="mb-2">
                      Pour des raisons de sécurité, les comptes instructeurs nécessitent une validation par notre équipe. 
                      Cette procédure nous permet de vérifier les justificatifs professionnels et maintenir un haut niveau 
                      de qualité dans notre communauté.
                    </p>
                    <p>
                      Vous aurez accès à toutes les fonctionnalités une fois votre compte validé. 
                      En attendant, vous pouvez accéder à votre tableau de bord et explorer les fonctionnalités de base.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDashboardAccess}
                className="px-6 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
              >
                Accéder à mon tableau de bord
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-300 mb-6">
                Votre compte a été créé avec succès. Vous pouvez maintenant accéder 
                à votre tableau de bord et commencer à utiliser CDTARGET.
              </p>
              <button
                onClick={handleDashboardAccess}
                className="px-6 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
              >
                Commencer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}