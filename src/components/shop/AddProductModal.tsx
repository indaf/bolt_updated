import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { createProduct } from '../../services/Shop/product.service';
import { notifyError, notifySuccess } from '../../helpers/Notify.helper';
import { CreateProductData } from '../../types/shop';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [formData, setFormData] = useState<Omit<CreateProductData, 'image'>>({
    name: '',
    description: '',
    price: '',
    url: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      notifyError('Veuillez sélectionner une image');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      notifyError('Veuillez entrer un prix valide');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', price.toString());
    data.append('url', formData.url);
    data.append('image', image);

    try {
      await createProduct(data);
      notifySuccess('Produit ajouté avec succès');
      onProductAdded();
      onClose();
    } catch (error) {
      console.error(error);
      notifyError('Erreur lors de l\'ajout du produit');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#202123] rounded-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">Ajouter un produit</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image du produit
            </label>
            <div className="relative aspect-video bg-[#2A2B32] rounded-lg overflow-hidden">
              {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-400">
                    Cliquez ou déposez une image ici
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom du produit
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]
                       resize-none h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prix (€)
            </label>
            <input
              type="text"
              pattern="^\d*\.?\d*$"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  setFormData(prev => ({ ...prev, price: value }));
                }
              }}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL du produit
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#009B70] text-white rounded-lg
                       hover:bg-[#007B56] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}