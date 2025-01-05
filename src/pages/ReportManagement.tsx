import React, { useEffect, useState } from "react";
import { useShooterStore } from "../store/shooterStore";
import { useResultStore } from "../store/resultStore";
import {
  Search,
  CheckCircle2,
  XCircle,
  RefreshCw,
  UserX,
  UserCheck,
  MessageSquareX,
} from "lucide-react";
import Layout from "../components/Layout";
import { notifyError, notifySuccess } from "../helpers/Notify.helper";
import { AxiosResponse } from "axios";
import { getAllReports, updateReport } from "../services/Report/report.service";
import { updateUserById } from "../services/Auth/Auth.service";
import { deletePublication } from "../services/Publication/publication.service";
import { ReportComment } from "../components/ReportComment";
import { useNavigate } from "react-router-dom";

export function ReportManagement() {
  const [reports, setReports] = useState<Array<any>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingReport, setEditingReport] = useState<any>(null);
  const [modalCommentIsOpen, setModalCommentIsOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const filteredReport = reports.filter((rep) => {
    const matchesSearch =
      `${rep.user.first_name} ${rep.user.last_name} ${rep.user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const desactivateUser = (userId: number) => {
    updateUserById(userId, { is_active: false, pending: false })
      .then((_: AxiosResponse) => {
        notifySuccess("L'utilisateur a été désactivé avec succès");
        loadReports();
      })
      .catch((err) => {
        console.error(err);
        notifyError(
          "Une erreur est survenue lors de la mise à jour de l'utilisateur"
        );
      });
  };

  const updateRep = (comment: string) => {
    if (!editingReport) return;
    updateReport(editingReport.id, {
      comments: comment,
      is_active: false,
    })
      .then((_: any) => {
        loadReports();
        setModalCommentIsOpen(false);
        notifySuccess("Le signalement a été traité avec succès");
      })
      .catch((error: any) => {
        console.error(error);
        notifyError(
          "Une erreur est survenue lors du traitement du signalement"
        );
      });
  };

  const deletePost = (postId: number) => {
    deletePublication(postId)
      .then((_: AxiosResponse) => {
        loadReports();
      })
      .catch((err: any) => {
        console.error(err);
        notifyError("Une erreur est survenue lors de la suppression du post");
      });
  };

  const loadReports = () => {
    setIsRefreshing(true);
    getAllReports()
      .then((res: AxiosResponse) => {
        setReports(res.data);
        console.log(res.data);
        setIsRefreshing(false);
      })
      .catch((err) => {
        console.error(err);
        notifyError("Une erreur est survenue lors du chargement des rapports");
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <Layout pageTitle="Gestion des tireurs">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bebas tracking-wider text-white">
              Gestion des rapports
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

          {filteredReport.filter((report: any) => report.is_active === true)
            .length > 0 && (
            <div className="bg-[#202123] rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bebas tracking-wider text-white mb-4">
                Signalement non traités
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#343541]">
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Utilisateur signalé
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Post associé
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Signalé par
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Raison
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Signalé le
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports
                      .filter((report: any) => report.is_active === true)
                      .map((report: any) => (
                        <tr
                          key={report.id}
                          className="border-b border-[#343541]"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                                <span className="text-xs font-medium text-white">
                                  {report.user.first_name[0]}
                                  {report.user.last_name[0]}
                                </span>
                              </div>
                              <div>
                                <p
                                  className="underline text-green-400 cursor-pointer underline"
                                  onClick={() =>
                                    navigate(`/profile/${report.user.id}`)
                                  }
                                >
                                  {report.user.first_name}{" "}
                                  {report.user.last_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {report.post && (
                              <p
                                className="underline text-green-400 cursor-pointer underline"
                                onClick={() =>
                                  navigate(`/post/${report.post.id}`)
                                }
                              >
                                Post n°{report.post.id}
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {report.submitted_by.first_name}{" "}
                            {report.submitted_by.last_name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {report.reason || "Non renseigné"}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {new Date(report.created_at).toLocaleDateString() ||
                              "Non renseigné"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {report.post && (
                                <button
                                  onClick={() => deletePost(report.post.id)}
                                  className="p-1 text-red-500 hover:text-red-400 transition-colors"
                                  title="Supprimer le post"
                                >
                                  <MessageSquareX className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => desactivateUser(report.user.id)}
                                className="p-1 text-red-500 hover:text-red-400 transition-colors"
                                title="Désactiver l'utilisateur"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingReport(report);
                                  setModalCommentIsOpen(true);
                                }}
                                className="p-1 text-xs text-green-500 hover:text-green-400 transition-colors"
                                title="Finaliser la modération pour ce signalement"
                              >
                                <CheckCircle2 className="w-4 h-4" />
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
              {/* <div className="flex gap-4 ml-4">
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
              </div> */}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#343541]">
                    <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                      Utilisateur signalé
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                      Post associé
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                      Signalé par
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                      Raison
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                      Signalé le
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-bebas tracking-wider text-gray-400">
                      Commentaire
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReport
                    .filter((report: any) => report.is_active !== true)
                    .map((report) => (
                      <tr key={report.id} className="border-b border-[#343541]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#009B70] flex items-center justify-center">
                              <span className="text-xs font-medium text-white">
                                {report.user.first_name[0]}
                                {report.user.last_name[0]}
                              </span>
                            </div>
                            <div>
                              <p
                                className="text-green-400 cursor-pointer underline"
                                onClick={() =>
                                  navigate(`/profile/${report.user.id}`)
                                }
                              >
                                {report.user.first_name} {report.user.last_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {report.post && (
                            <p
                              className="underline text-green-400 cursor-pointer"
                              onClick={() =>
                                navigate(`/post/${report.post.id}`)
                              }
                            >
                              Post n°{report.post.id}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {report.submitted_by.first_name}{" "}
                          {report.submitted_by.last_name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {report.reason || "Non renseigné"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {new Date(report.created_at).toLocaleDateString() ||
                            "Non renseigné"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {report.comments || "Non renseigné"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ReportComment
        onClose={() => setModalCommentIsOpen(false)}
        onConfirm={updateRep}
        isOpen={modalCommentIsOpen}
      ></ReportComment>
    </Layout>
  );
}
