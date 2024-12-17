import React, { useEffect, useState } from "react";
import { useShooterStore } from "../store/shooterStore";
import { useResultStore } from "../store/resultStore";
import {
  Search,
  Filter,
  ArrowUpDown,
  Activity,
  Users,
  TrendingDown,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Plus,
  CheckCircle2,
  XCircle,
  RefreshCw,
  UserX,
  UserCheck,
} from "lucide-react";
import { AddShooterModal } from "../components/AddShooterModal";
import Layout from "../components/Layout";
import { getAllShooters, updateUserById } from "../services/Auth/Auth.service";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";

export function ShooterManagement() {
  const [shooters, setShooters] = useState<Array<any>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<
    "all" | "instructor" | "shooter"
  >("all");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingInstructors, setPendingInstructors] = useState<Array<any>>([]);

  const filteredUsers = shooters.filter((user) => {
    const matchesSearch = `${user.first_name} ${user.last_name} ${user.email} ${
      user.military_id || ""
    } ${user.regiment || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "all" || user.groups[0].name === filterRole;
    const matchesStatus =
      filterStatus === "all" ||
      user.is_active === (filterStatus == "active" ? true : false);
    // const isPending = user.pending === false;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const updateStatusUser = (userId: number) => {
    const user = shooters.find((u) => u.id === userId);
    if (!user) return;

    updateUserById(user.id, { is_active: !user.is_active })
      .then((_: AxiosResponse) => {
        notifySuccess("Statut de l'utilisateur mis à jour avec succès");
        loadShooters();
      })
      .catch((err) => {
        console.error(err);
        notifyError(
          "Une erreur est survenue lors de la mise à jour de l'utilisateur"
        );
      });
  };

  const updatePendingUser = (userId: number, status: boolean) => {
    const user = shooters.find((u) => u.id === userId);
    if (!user) return;

    updateUserById(user.id, { is_active: status, pending: false })
      .then((_: AxiosResponse) => {
        notifySuccess("Statut de l'utilisateur mis à jour avec succès");
        loadShooters();
      })
      .catch((err) => {
        console.error(err);
        notifyError(
          "Une erreur est survenue lors de la mise à jour de l'utilisateur"
        );
      });
  };

  const loadShooters = () => {
    setIsRefreshing(true);
    getAllShooters()
      .then((res: AxiosResponse) => {
        setShooters(res.data);
        setPendingInstructors(
          res.data.filter(
            (u: any) => u.groups[0].name === "instructor" && u.pending === true
          )
        );
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.error(err);
        notifyError("Une erreur est survenue lors du chargement des tireurs");
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    loadShooters();
  }, []);

  return (
    <Layout pageTitle="Gestion des tireurs">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bebas tracking-wider text-white">
              Gestion des utilisateurs
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsRefreshing(true)}
                className={`p-2 text-gray-400 hover:text-white transition-colors rounded-lg
                       ${isRefreshing ? "animate-spin" : ""}`}
                disabled={isRefreshing}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
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
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Nom
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Régiment
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Matricule
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingInstructors.map((instructor) => (
                      <tr
                        key={instructor.id}
                        className="border-b border-[#343541]"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {instructor.first_name[0]}
                                {instructor.last_name[0]}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">
                                {instructor.first_name} {instructor.last_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {instructor.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {instructor.regiment || "Non renseigné"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {instructor.military_id || "Non renseigné"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updatePendingUser(instructor.id, true)
                              }
                              className="p-1 text-green-500 hover:text-green-400 transition-colors"
                              title="Activer"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                updatePendingUser(instructor.id, false)
                              }
                              className="p-1 text-red-500 hover:text-red-400 transition-colors"
                              title="Désactiver"
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

          <div className="bg-[#202123] rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6 flex-col md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
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
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#343541]">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                      Rôle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#343541]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              {user.first_name[0]}
                              {user.last_name[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user.first_name} {user.last_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${
                          user.groups[0].name === "instructor"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                        >
                          {user.groups[0].name === "instructor"
                            ? "Instructeur"
                            : "Tireur"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${
                          user.is_active === true
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                        >
                          {user.is_active === true ? "Actif" : "Inactif"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatusUser(user.id)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                            title={
                              user.is_active === true ? "Désactiver" : "Activer"
                            }
                          >
                            {user.is_active === true ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
