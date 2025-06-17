"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Eye, Edit, Copy, Trash2, Users, BarChart3, Calendar, Filter, Download, Play, Pause } from "lucide-react"

const campagnes = [
  {
    id: 1,
    nom: "Relance Prospects Chauds",
    sujet: "Votre projet d'assurance nous intéresse",
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
  },
  {
    id: 2,
    nom: "Newsletter Mensuelle Janvier",
    sujet: "Actualités assurance - Janvier 2024",
    statut: "Terminée",
    type: "Newsletter",
    dateCreation: "2024-01-15",
    dateLancement: "2024-01-16",
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
  },
  {
    id: 3,
    nom: "Onboarding Nouveaux Clients",
    sujet: "Bienvenue chez Premunia - Vos premiers pas",
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
  },
  {
    id: 4,
    nom: "Promotion Assurance Vie",
    sujet: "Offre spéciale - Assurance Vie Premium",
    statut: "Programmée",
    type: "Promotion",
    dateCreation: "2024-01-22",
    dateLancement: "2024-01-25",
    destinataires: 456,
    envoyes: 0,
    ouverts: 0,
    clics: 0,
    conversions: 0,
    desabonnes: 0,
    tauxOuverture: 0,
    tauxClic: 0,
    tauxConversion: 0,
    budget: 200,
    roi: 0,
  },
]

const templates = [
  "Newsletter Standard",
  "Relance Prospect",
  "Onboarding Client",
  "Promotion Produit",
  "Rappel RDV",
  "Remerciement",
  "Template Vierge",
]

const listes = [
  "Tous les contacts",
  "Prospects Chauds",
  "Clients Actifs",
  "Newsletter Abonnés",
  "Prospects Parisiens",
  "Clients Retraite",
]

export default function EmailCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedCampagne, setSelectedCampagne] = useState(null)
  const [newCampagne, setNewCampagne] = useState({
    nom: "",
    sujet: "",
    template: "",
    liste: "",
    contenu: "",
    dateLancement: "",
  })

  const filteredCampagnes = campagnes.filter((campagne) => {
    const matchesSearch =
      campagne.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campagne.sujet.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campagne.statut === statusFilter
    const matchesType = typeFilter === "all" || campagne.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleCampagneAction = (campagne: any, action: string) => {
    switch (action) {
      case "view":
        setSelectedCampagne(campagne)
        break
      case "edit":
        console.log(`Modifier campagne ${campagne.nom}`)
        break
      case "duplicate":
        console.log(`Dupliquer campagne ${campagne.nom}`)
        break
      case "pause":
        console.log(`Mettre en pause ${campagne.nom}`)
        break
      case "resume":
        console.log(`Reprendre ${campagne.nom}`)
        break
      case "delete":
        console.log(`Supprimer ${campagne.nom}`)
        break
    }
  }

  const handleCreateCampagne = () => {
    console.log("Créer nouvelle campagne:", newCampagne)
    setIsCreateDialogOpen(false)
    setNewCampagne({
      nom: "",
      sujet: "",
      template: "",
      liste: "",
      contenu: "",
      dateLancement: "",
    })
  }

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
      case "Brouillon":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalEnvoyes = campagnes.reduce((sum, c) => sum + c.envoyes, 0)
  const totalOuverts = campagnes.reduce((sum, c) => sum + c.ouverts, 0)
  const totalClics = campagnes.reduce((sum, c) => sum + c.clics, 0)
  const totalConversions = campagnes.reduce((sum, c) => sum + c.conversions, 0)
  const totalROI = campagnes.reduce((sum, c) => sum + c.roi, 0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campagnes Email</h1>
            <p className="mt-2 text-gray-600">Gérez vos campagnes d'emailing et newsletters</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Campagne
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle campagne</DialogTitle>
                <DialogDescription>Configurez votre campagne d'emailing</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="nom">Nom de la campagne</Label>
                  <Input
                    id="nom"
                    value={newCampagne.nom}
                    onChange={(e) => setNewCampagne({ ...newCampagne, nom: e.target.value })}
                    placeholder="Ex: Newsletter Février 2024"
                  />
                </div>
                <div>
                  <Label htmlFor="sujet">Sujet de l'email</Label>
                  <Input
                    id="sujet"
                    value={newCampagne.sujet}
                    onChange={(e) => setNewCampagne({ ...newCampagne, sujet: e.target.value })}
                    placeholder="Sujet accrocheur pour votre email"
                  />
                </div>
                <div>
                  <Label htmlFor="template">Template</Label>
                  <Select
                    value={newCampagne.template}
                    onValueChange={(value) => setNewCampagne({ ...newCampagne, template: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template} value={template}>
                          {template}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="liste">Liste de destinataires</Label>
                  <Select
                    value={newCampagne.liste}
                    onValueChange={(value) => setNewCampagne({ ...newCampagne, liste: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une liste" />
                    </SelectTrigger>
                    <SelectContent>
                      {listes.map((liste) => (
                        <SelectItem key={liste} value={liste}>
                          {liste}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateLancement">Date de lancement</Label>
                  <Input
                    id="dateLancement"
                    type="datetime-local"
                    value={newCampagne.dateLancement}
                    onChange={(e) => setNewCampagne({ ...newCampagne, dateLancement: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contenu">Contenu de l'email</Label>
                  <Textarea
                    id="contenu"
                    value={newCampagne.contenu}
                    onChange={(e) => setNewCampagne({ ...newCampagne, contenu: e.target.value })}
                    placeholder="Rédigez le contenu de votre email..."
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateCampagne}>Créer la Campagne</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold" style={{ color: "#003366" }}>
                {totalEnvoyes.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Emails Envoyés</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
                {totalOuverts.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Emails Ouverts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{totalClics}</div>
              <p className="text-xs text-gray-600">Clics Totaux</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{totalConversions}</div>
              <p className="text-xs text-gray-600">Conversions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">€{totalROI.toLocaleString()}</div>
              <p className="text-xs text-gray-600">ROI Total</p>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Terminée">Terminée</SelectItem>
                  <SelectItem value="Programmée">Programmée</SelectItem>
                  <SelectItem value="En Pause">En Pause</SelectItem>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Newsletter">Newsletter</SelectItem>
                  <SelectItem value="Relance">Relance</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                  <SelectItem value="Promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
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
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        ROI: €{campagne.roi}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleCampagneAction(campagne, "view")}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleCampagneAction(campagne, "edit")}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleCampagneAction(campagne, "duplicate")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    {campagne.statut === "Active" && (
                      <Button variant="ghost" size="sm" onClick={() => handleCampagneAction(campagne, "pause")}>
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {campagne.statut === "En Pause" && (
                      <Button variant="ghost" size="sm" onClick={() => handleCampagneAction(campagne, "resume")}>
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleCampagneAction(campagne, "delete")}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {campagne.envoyes > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold" style={{ color: "#003366" }}>
                        {campagne.tauxOuverture}%
                      </p>
                      <p className="text-xs text-gray-600">Taux d'ouverture</p>
                      <p className="text-xs text-gray-500">
                        {campagne.ouverts}/{campagne.envoyes}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold" style={{ color: "#D4AF37" }}>
                        {campagne.tauxClic}%
                      </p>
                      <p className="text-xs text-gray-600">Taux de clic</p>
                      <p className="text-xs text-gray-500">
                        {campagne.clics}/{campagne.ouverts}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-green-600">{campagne.tauxConversion}%</p>
                      <p className="text-xs text-gray-600">Taux de conversion</p>
                      <p className="text-xs text-gray-500">
                        {campagne.conversions}/{campagne.clics}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-purple-600">€{campagne.roi}</p>
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
                    <Progress value={(campagne.envoyes / campagne.destinataires) * 100} className="h-2" />
                  </div>
                )}

                {/* Informations pour les campagnes programmées */}
                {campagne.statut === "Programmée" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-sm text-yellow-800">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Programmée pour le {campagne.dateLancement} - {campagne.destinataires} destinataires
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog pour voir les détails d'une campagne */}
        {selectedCampagne && (
          <Dialog open={!!selectedCampagne} onOpenChange={() => setSelectedCampagne(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedCampagne.nom}</DialogTitle>
                <DialogDescription>Détails de la campagne</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Sujet</Label>
                    <p className="text-sm">{selectedCampagne.sujet}</p>
                  </div>
                  <div>
                    <Label>Statut</Label>
                    <Badge className={getStatusColor(selectedCampagne.statut)}>{selectedCampagne.statut}</Badge>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <p className="text-sm">{selectedCampagne.type}</p>
                  </div>
                  <div>
                    <Label>Date de lancement</Label>
                    <p className="text-sm">{selectedCampagne.dateLancement}</p>
                  </div>
                </div>

                {selectedCampagne.envoyes > 0 && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded">
                    <div className="text-center">
                      <p className="text-2xl font-bold" style={{ color: "#003366" }}>
                        {selectedCampagne.ouverts}
                      </p>
                      <p className="text-sm text-gray-600">Ouvertures</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
                        {selectedCampagne.clics}
                      </p>
                      <p className="text-sm text-gray-600">Clics</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedCampagne.conversions}</p>
                      <p className="text-sm text-gray-600">Conversions</p>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedCampagne(null)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  )
}
