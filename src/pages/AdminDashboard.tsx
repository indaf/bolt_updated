import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import { BarChart2, Users, Target, Activity, Search, Filter, Edit2, UserCheck, UserX, AlertTriangle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { EditContactModal } from '../components/EditContactModal';

export function AdminDashboard() {
  const { stats, fetchStats, users, fetchUsers, validateInstructor } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'instructor' | 'shooter'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchStats(), fetchUsers()]);
    setIsRefreshing(false);
  };

  if (!stats) return null;

  const pendingInstructors = users.filter(user => 
    user.role === 'instructor' && user.status === 'pending'
  );

  const filteredUsers = users.filter(user => {
    const matchesSearch = `${user.firstName} ${user.lastName} ${user.email} ${user.militaryId || ''} ${user.regiment || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bebas tracking-wider text-white">Tableau de bord administrateur</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={refreshData}
              className={`p-2 text-gray-400 hover:text-white transition-colors rounded-lg
                       ${isRefreshing ? 'animate-spin' : ''}`}
              disabled={isRefreshing}
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-[#009B70] text-white'
                    : 'bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]'
                }`}
              >
                Statistiques
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'contacts'
                    ? 'bg-[#009B70] text-white'
                    : 'bg-[#343541] text-gray-300 hover:bg-[#3E3F4B]'
                }`}
              >
                Carnet de contacts
                {pendingInstructors.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#DC002B] text-white text-xs rounded-full">
                    {pendingInstructors.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-[#202123] rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Utilisateurs</p>
                    <p className="text-2xl font-bebas tracking-wider text-white">{stats.totalUsers}</p>
                    <p className="text-xs text-gray-400">{stats.activeUsers} actifs</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#202123] rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#DC002B]/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-[#DC002B]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Instructeurs en attente</p>
                    <p className="text-2xl font-bebas tracking-wider text-white">{pendingInstructors.length}</p>
                    <p className="text-xs text-gray-400">Validation requise</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#202123] rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Exercices créés</p>
                    <p className="text-2xl font-bebas tracking-wider text-white">{stats.totalExercises}</p>
                    <p className="text-xs text-gray-400">{stats.exercisesThisMonth} ce mois</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#202123] rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Moyenne d'exercices</p>
                    <p className="text-2xl font-bebas tracking-wider text-white">
                      {stats.averageExercisesPerUser.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-400">par utilisateur</p>
                  </div>
                </div>
              </div>
            </div>

            {pendingInstructors.length > 0 && (
              <div className="bg-[#202123] rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bebas tracking-wider text-white mb-4">
                  Demandes d'instructeurs en attente
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#343541]">
                        <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">Nom</th>
                        <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">Régiment</th>
                        <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">Matricule</th>
                        <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingInstructors.map((instructor) => (
                        <tr key={instructor.id} className="border-b border-[#343541]">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                                <span className="text-xs font-medium text-white">
                                  {instructor.firstName[0]}
                                  {instructor.lastName[0]}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {instructor.firstName} {instructor.lastName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">{instructor.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{instructor.regiment || 'Non renseigné'}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{instructor.militaryId || 'Non renseigné'}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => validateInstructor(instructor.id, true)}
                                className="p-1 text-green-500 hover:text-green-400 transition-colors"
                                title="Approuver"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => validateInstructor(instructor.id, false)}
                                className="p-1 text-red-500 hover:text-red-400 transition-colors"
                                title="Refuser"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-[#202123] rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bebas tracking-wider text-white">Carnet de contacts</h2>
              {pendingInstructors.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#DC002B]/10 text-[#DC002B] rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {pendingInstructors.length} demande{pendingInstructors.length > 1 ? 's' : ''} en attente
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-[#009B70]"
                />
              </div>
              <div className="flex gap-4 ml-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as any)}
                  className="px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:border-[#009B70]"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="instructor">Instructeurs</option>
                  <option value="shooter">Tireurs</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 bg-[#2A2B32] border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:border-[#009B70]"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actifs</option>
                  <option value="inactive">Inactifs</option>
                  <option value="pending">En attente</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#343541]">
                    <th className="px-4 py-3 text-sm font-bebas tracking-wider text-gray-400">Nom</th>
                    <th className="px-4 py-3 text-sm font-bebas tracking-wider text-gray-400">Email</th>
                    <th className="px-4 py-3 text-sm font-bebas tracking-wider text-gray-400">Rôle</th>
                    <th className="px-4 py-3 text-sm font-bebas tracking-wider text-gray-400">Statut</th>
                    <th className="px-4 py-3 text-sm font-bebas tracking-wider text-gray-400">Dernière activité</th>
                    <th className="px-4 py-3 text-sm font-bebas tracking-wider text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#343541]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-400">{user.militaryId || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${user.role === 'instructor' 
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {user.role === 'instructor' ? 'Instructeur' : 'Tireur'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${user.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : user.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {user.status === 'active' 
                            ? 'Actif' 
                            : user.status === 'pending'
                            ? 'En attente'
                            : 'Inactif'
                          }
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {user.role === 'instructor' 
                          ? `${user.exerciseCount} exercices créés`
                          : `${user.exerciseCount} exercices réalisés`
                        }
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingUser(user.id)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {user.status === 'pending' && user.role === 'instructor' ? (
                            <>
                              <button
                                onClick={() => validateInstructor(user.id, true)}
                                className="p-1 text-green-500 hover:text-green-400 transition-colors"
                                title="Approuver"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => validateInstructor(user.id, false)}
                                className="p-1 text-red-500 hover:text-red-400 transition-colors"
                                title="Refuser"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            user.status !== 'pending' && (
                              <button
                                onClick={() => useAdminStore.getState().updateUserStatus(
                                  user.id,
                                  user.status === 'active' ? 'inactive' : 'active'
                                )}
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                                title={user.status === 'active' ? 'Désactiver' : 'Activer'}
                              >
                                {user.status === 'active' ? (
                                  <UserX className="w-4 h-4" />
                                ) : (
                                  <UserCheck className="w-4 h-4" />
                                )}
                              </button>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {editingUser && (
        <EditContactModal
          userId={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}