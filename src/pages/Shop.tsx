import React, { useContext, useState } from 'react';
import { ShoppingBag, Plus, Settings } from 'lucide-react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/Auth.context';
import { ProductCard } from '../components/shop/ProductCard';
import { AddProductModal } from '../components/shop/AddProductModal';
import { ManageProducts } from '../components/shop/ManageProducts';
import { Product } from '../types/shop';

type View = 'products' | 'manage';

export function Shop() {
  const { user } = useContext<any>(AuthContext);
  const [currentView, setCurrentView] = useState<View>('products');
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const isAdmin = user?.groups?.some((group: any) => group.name === 'admin');

  const handleProductAdded = () => {
    loadProducts();
  };

  const loadProducts = () => {
    // TODO: Implémenter le chargement des produits depuis l'API
  };

  return (
    <Layout pageTitle="Boutique">
      <div className="min-h-[calc(100vh-8rem)] flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bebas tracking-wider text-white">Boutique</h1>
                <p className="text-gray-400">Découvrez notre sélection de produits</p>
              </div>

              {isAdmin && (
                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#009B70] text-white rounded-lg hover:bg-[#007B56] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter un produit</span>
                  </button>
                  <button
                    onClick={() => setCurrentView(currentView === 'products' ? 'manage' : 'products')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#343541] text-white rounded-lg hover:bg-[#3E3F4B] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{currentView === 'products' ? 'Gérer les produits' : 'Voir les produits'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              {currentView === 'products' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 bg-[#202123] rounded-lg">
                      <ShoppingBag className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-400 text-center">Aucun produit disponible pour le moment</p>
                    </div>
                  ) : (
                    products.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        currentUserId={user?.id}
                        onProductUpdated={loadProducts}
                      />
                    ))
                  )}
                </div>
              ) : (
                <ManageProducts 
                  products={products}
                  onProductUpdated={loadProducts}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onProductAdded={handleProductAdded}
      />
    </Layout>
  );
}