import React from "react";
import { Heart, Share2, ShoppingBag } from "lucide-react";
// import { likeProduct, unlikeProduct } from '../../services/Shop/product.service';
import { notifyError, notifySuccess } from "../../helpers/Notify.helper";
import { addLikeProduct } from "../../services/Like/like.service";
import { handleClickProduct } from "../../services/Shop/shop.service";

interface ProductCardProps {
  product: any;
  currentUserId: string;
  onProductUpdated: () => void;
}

export function ProductCard({
  product,
  currentUserId,
  onProductUpdated,
}: ProductCardProps) {
  const isLiked =
    product.likes.filter((like: any) => like.user.id == currentUserId).length >
    0;

  const handleLike = async () => {
    try {
      await addLikeProduct({ product_id: product.id });
      onProductUpdated();
    } catch (error) {
      console.error(error);
      notifyError("Erreur lors de la mise à jour du like");
    }
  };

  const handleClick = async (event: any) => {
    try {
      await handleClickProduct(product.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(product.url_product)
      .then(() => notifySuccess("Lien copié dans le presse-papier"))
      .catch(() => notifyError("Erreur lors de la copie du lien"));
  };

  return (
    <div className="bg-[#202123] rounded-lg overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:scale-[1.02]">
      <div className="aspect-video h-[300px]">
        <img
          src={import.meta.env.VITE_SERVICE_API_URL + product.image_path}
          alt={product.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-medium text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-1">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-[#009B70] mb-4">
          {product.price} €
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg flex items-center justify-center gap-2 ${
                isLiked
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className={`${isLiked ? "text-red-500" : "text-gray-400"}`}>
                {product.likes.length}
              </span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <a
            onClick={handleClick}
            href={product.url_product}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Obtenir</span>
          </a>
        </div>
      </div>
    </div>
  );
}
