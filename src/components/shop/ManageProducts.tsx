import React, { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { notifyError, notifySuccess } from "../../helpers/Notify.helper";
import { DeleteConfirmationModal } from "../DeleteConfirmationModal";
import { deleteProduct } from "../../services/Shop/shop.service";
import { EditProductModal } from "./EditProductModal";

interface ManageProductsProps {
  products: any[];
  onProductUpdated: () => void;
}

export function ManageProducts({
  products,
  onProductUpdated,
}: ManageProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(parseInt(selectedProduct.id));
      notifySuccess("Produit supprimé avec succès");
      onProductUpdated();
    } catch (error) {
      console.error(error);
      notifyError("Erreur lors de la suppression du produit");
    }
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
          />
        </div>
      </div>

      <div className="bg-[#202123] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#343541]">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Nom
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Prix
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Likes
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Clicks
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-[#343541]">
                  <td className="px-4 py-3">
                    <div className="w-16 h-10 rounded overflow-hidden">
                      <img
                        src={
                          import.meta.env.VITE_SERVICE_API_URL +
                          product.image_path
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">{product.price} €</td>
                  <td className="px-4 py-3 text-white">
                    {product.likes.length}
                  </td>
                  <td className="px-4 py-3 text-white">{product.clicks}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onProductEdited={onProductUpdated}
        product={selectedProduct}
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le produit"
        message={`Êtes-vous sûr de vouloir supprimer le produit "${selectedProduct?.name}" ? Cette action est irréversible.`}
      />
    </div>
  );
}
