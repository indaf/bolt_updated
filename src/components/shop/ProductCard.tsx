import React from 'react';
import { Heart, Share2, ShoppingBag } from 'lucide-react';
import { Product } from '../../types/shop';
import { likeProduct, unlikeProduct } from '../../services/Shop/product.service';
import { notifyError, notifySuccess } from '../../helpers/Notify.helper';

interface ProductCardProps {
  product: Product;
  currentUserId: string;
  onProductUpdated: () => void;
}

export function ProductCard({ product, currentUserId, onProductUpdated }: ProductCardProps) {
  const isLiked = product.likes.includes(currentUserId);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikeProduct(parseInt(product.id));
      } else {
        await likeProduct(parseInt(product.id));
      }
      onProductUpdated();
    } catch (error) {
      console.error(error);
      notifyError('Erreur lors de la mise à jour du like');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(product.url)
      .then(() => notifySuccess('Lien copié dans le presse-papier'))
      .catch(() => notifyError('Erreur lors de la copie du lien'));
  };

  return (
    <div className="bg-[#202123] rounded-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.02]">
      <div className="aspect-video">
        <img 
          src={import.meta.env.VITE_SERVICE_API_URL + product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-medium text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-1">{product.description}</p>
        <p className="text-2xl font-bold text-[#009B70] mb-4">{product.price.toFixed(2)} €</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${
                isLiked
                  ? 'text-red-500 bg-red-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Obtenir</span>
          </a>
        </div>
      </div>
    </div>
  );
}