"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Eye, Edit, Copy, Trash2, Users, Calendar, Download, Play, Pause } from "lucide-react"

const campagnes = [
  {
    id: 1,
    nom: "Relance Prospects Chauds Q1",
    sujet: "Votre projet d'assurance nous intéresse - Offre personnalisée",
    statut: "Active",
    type: "Relance",
    dateCreation: "2024-01-20",
    dateLancement: "2024-01-21",
    destinataires: 245,
    envoyes: 245,
    ouverts: 156,
    clics: 42,
    conversions: 8,
    desabonnes: 3,
    tauxOuverture: 63.7,
    tauxClic: 17.1,
    tauxConversion: 3.3,
    budget: 150,
    roi: 2400,
    createur: "Admin",
  },
  {
    id: 2,
    nom: "Newsletter Mensuelle Février",
    sujet: "Actualités assurance - Nouveautés et conseils",
    statut: "Terminée",
    type: "Newsletter",
    dateCreation: "2024-01-15",
    dateLancement: "2024-02-01",
    destinataires: 1247,
    envoyes: 1247,
    ouverts: 623,
    clics: 89,
    conversions: 12,
    desabonnes: 8,
    tauxOuverture: 49.9,
    tauxClic: 7.1,
    tauxConversion: 1.0,
    budget: 300,
    roi: 3600,
    createur: "Sophie Martin",
  },
  {
    id: 3,
    nom: "Onboarding VIP Nouveaux Clients",
    sujet: "Bienvenue chez Premunia - Votre parcours premium commence",
    statut: "Active",
    type: "Onboarding",
    dateCreation: "2024-01-10",
    dateLancement: "2024-01-11",
    destinataires: 89,
    envoyes: 89,
    ouverts: 67,
    clics: 23,
    conversions: 5,
    desabonnes: 1,
    tauxOuverture: 75.3,
    tauxClic: 25.8,
    tauxConversion: 5.6,
    budget: 80,
    roi: 1250,
    createur: "Jean Conseiller",
  },
]

export default function AdminCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredCampagnes = campagnes.filter((campagne) => {
    const matchesSearch =
      campagne.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campagne.sujet.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campagne.statut === statusFilter
    const matchesType = typeFilter === "all" || campagne.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalEnvoyes = campagnes.reduce((sum, c) => sum + c.envoyes, 0)
  const totalOuverts = campagnes.reduce((sum, c) => sum + c.ouverts, 0)
  const totalClics = campagnes.reduce((sum, c) => sum + c.clics, 0)
  const totalROI = campagnes.reduce((sum, c) => sum + c.roi, 0)

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Terminée":
        return "bg-blue-100 text-blue-800"
      case "Programmée":
        return "bg-yellow-100 text-yellow-800"
      case "En Pause":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold premunia-text-gradient">Gestion des Campagnes</h1>
            <p className="mt-2 text-gray-600">Administration des campagnes email et newsletters</p>
          </div>

          <Button className="bg-premunia-gradient text-white hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Campagne
          </Button>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card className="border-l-4 border-l-premunia-orange">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalEnvoyes.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Emails Envoyés</p>
                </div>
                <div className="text-premunia-orange">📧</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-red">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalOuverts.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Emails Ouverts</p>
                </div>
                <div className="text-premunia-red">👁️</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-pink">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalClics}</div>
                  <p className="text-xs text-gray-600">Clics Totaux</p>
                </div>
                <div className="text-premunia-pink">🖱️</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-purple">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">€{totalROI.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">ROI Total</p>
                </div>
                <div className="text-premunia-purple">💰</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher une campagne..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="Active">Active</option>
                <option value="Terminée">Terminée</option>
                <option value="Programmée">Programmée</option>
                <option value="En Pause">En Pause</option>
              </select>
              <select
                className="px-3 py-2 border rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Relance">Relance</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Promotion">Promotion</option>
              </select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des campagnes */}
        <div className="grid gap-6">
          {filteredCampagnes.map((campagne) => (
            <Card key={campagne.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{campagne.nom}</CardTitle>
                      <Badge className={getStatusColor(campagne.statut)}>{campagne.statut}</Badge>
                      <Badge variant="outline">{campagne.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campagne.sujet}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {campagne.dateLancement}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {campagne.destinataires} destinataires
                      </div>
                      <div>Créé par: {campagne.createur}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    {campagne.statut === "Active" && (
                      <Button variant="ghost" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {campagne.statut === "En Pause" && (
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {campagne.envoyes > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <p className="text-lg font-bold text-premunia-orange">{campagne.tauxOuverture}%</p>
                      <p className="text-xs text-gray-600">Taux d'ouverture</p>
                      <p className="text-xs text-gray-500">
                        {campagne.ouverts}/{campagne.envoyes}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                      <p className="text-lg font-bold text-premunia-red">{campagne.tauxClic}%</p>
                      <p className="text-xs text-gray-600">Taux de clic</p>
                      <p className="text-xs text-gray-500">
                        {campagne.clics}/{campagne.ouverts}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                      <p className="text-lg font-bold text-premunia-pink">{campagne.tauxConversion}%</p>
                      <p className="text-xs text-gray-600">Taux de conversion</p>
                      <p className="text-xs text-gray-500">
                        {campagne.conversions}/{campagne.clics}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <p className="text-lg font-bold text-premunia-purple">€{campagne.roi}</p>
                      <p className="text-xs text-gray-600">ROI</p>
                      <p className="text-xs text-gray-500">Budget: €{campagne.budget}</p>
                    </div>
                  </div>
                )}

                {/* Barre de progression pour les campagnes actives */}
                {campagne.statut === "Active" && campagne.envoyes > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression de la campagne</span>
                      <span>
                        {campagne.envoyes}/{campagne.destinataires} envoyés
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-premunia-gradient"
                        style={{ width: `${(campagne.envoyes / campagne.destinataires) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
