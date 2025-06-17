"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Plus, Play, Pause, Mail, Phone, Clock, Zap, Target, Filter, Eye, Edit, Copy, Settings } from "lucide-react"

const workflows = [
  {
    id: 1,
    nom: "Relance Leads Non Répondants Pro",
    description: "Séquence avancée pour prospects qui ne répondent pas au téléphone avec scoring dynamique",
    statut: "Actif",
    declencheur: "Appel manqué + Score > 60",
    etapes: [
      {
        type: "email",
        delai: "0h",
        sujet: "Nous avons essayé de vous joindre - Votre projet nous intéresse",
        template: "relance_immediate",
      },
      {
        type: "sms",
        delai: "2h",
        message: "Bonjour, nous avons tenté de vous joindre. Rappel gratuit au 01.XX.XX.XX.XX",
        template: "sms_rappel",
      },
      {
        type: "email",
        delai: "1j",
        sujet: "Votre simulation d'assurance personnalisée vous attend",
        template: "simulation_personnalisee",
      },
      { type: "task", delai: "3j", action: "Appel commercial avec script adapté au profil", assignee: "auto" },
      {
        type: "email",
        delai: "7j",
        sujet: "Témoignage client - Comment Marie a économisé 40% sur son assurance",
        template: "social_proof",
      },
      {
        type: "email",
        delai: "14j",
        sujet: "Dernière chance - Offre spéciale expire dans 48h",
        template: "urgence_limitee",
      },
      { type: "task", delai: "21j", action: "Appel final avec offre de réactivation", assignee: "manager" },
    ],
    instancesActives: 127,
    tauxConversion: 23.5,
    emailsEnvoyes: 1456,
    conversions: 34,
    roi: 15600,
    cible: "Prospects score > 60",
  },
  {
    id: 2,
    nom: "Onboarding VIP Nouveau Client",
    description: "Parcours d'accueil premium pour nouveaux clients avec valeur élevée",
    statut: "Actif",
    declencheur: "Contrat signé + Valeur > 20k€",
    etapes: [
      {
        type: "email",
        delai: "0h",
        sujet: "Bienvenue dans la famille Premunia - Votre conseiller dédié",
        template: "welcome_vip",
      },
      { type: "task", delai: "1h", action: "Appel de bienvenue personnalisé", assignee: "conseiller_attribue" },
      { type: "email", delai: "1j", sujet: "Votre espace client personnalisé est prêt", template: "espace_client" },
      {
        type: "email",
        delai: "7j",
        sujet: "Guide exclusif - Optimisez votre protection",
        template: "guide_optimisation",
      },
      {
        type: "task",
        delai: "30j",
        action: "Bilan satisfaction et opportunités cross-sell",
        assignee: "conseiller_attribue",
      },
    ],
    instancesActives: 45,
    tauxConversion: 67.8,
    emailsEnvoyes: 234,
    conversions: 28,
    roi: 45200,
    cible: "Nouveaux clients VIP",
  },
  {
    id: 3,
    nom: "Réactivation Clients Dormants",
    description: "Campagne de réactivation intelligente pour clients inactifs avec analyse comportementale",
    statut: "Actif",
    declencheur: "Inactivité 90 jours + Historique positif",
    etapes: [
      {
        type: "email",
        delai: "0h",
        sujet: "Nous pensons à vous - Votre conseiller Premunia",
        template: "pensee_personnelle",
      },
      {
        type: "email",
        delai: "5j",
        sujet: "Nouveautés assurance qui pourraient vous intéresser",
        template: "nouveautes_ciblees",
      },
      {
        type: "email",
        delai: "12j",
        sujet: "Offre de réactivation exclusive - 3 mois offerts",
        template: "offre_reactivation",
      },
      {
        type: "task",
        delai: "20j",
        action: "Appel de réactivation avec offre personnalisée",
        assignee: "commercial_senior",
      },
    ],
    instancesActives: 89,
    tauxConversion: 18.2,
    emailsEnvoyes: 567,
    conversions: 16,
    roi: 8900,
    cible: "Clients inactifs 90j+",
  },
]

const templates = [
  { id: 1, nom: "Relance Immédiate", type: "email", usage: 156, performance: 68.5 },
  { id: 2, nom: "SMS Rappel", type: "sms", usage: 89, performance: 45.2 },
  { id: 3, nom: "Social Proof", type: "email", usage: 234, performance: 72.1 },
  { id: 4, nom: "Urgence Limitée", type: "email", usage: 123, performance: 58.9 },
  { id: 5, nom: "Welcome VIP", type: "email", usage: 67, performance: 89.3 },
]

const declencheurs = [
  "Nouveau contact créé",
  "Appel manqué + Score > 60",
  "Proposition expirée",
  "Inactivité 30 jours",
  "Inactivité 90 jours + Historique positif",
  "Contrat signé + Valeur > 20k€",
  "Tag ajouté: prospect_chaud",
  "Score modifié > 80",
  "Email ouvert 3 fois",
  "Lien cliqué dans email",
  "Page de prix visitée",
  "Formulaire abandonné",
]

export default function AdminAutomationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = workflow.nom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.statut === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalInstancesActives = workflows.reduce((sum, w) => sum + w.instancesActives, 0)
  const totalEmailsEnvoyes = workflows.reduce((sum, w) => sum + w.emailsEnvoyes, 0)
  const totalConversions = workflows.reduce((sum, w) => sum + w.conversions, 0)
  const totalROI = workflows.reduce((sum, w) => sum + w.roi, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Automation</h1>
            <p className="mt-2 text-gray-600">Gestion avancée des workflows et séquences automatisées</p>
          </div>

          <div className="flex space-x-2">
            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Gestion des Templates</DialogTitle>
                  <DialogDescription>Templates d'emails et SMS pour vos workflows</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <h3 className="font-medium">{template.nom}</h3>
                        <p className="text-sm text-gray-600">
                          {template.usage} utilisations • {template.performance}% performance
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Workflow
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Créer un workflow avancé</DialogTitle>
                  <DialogDescription>
                    Configurez votre séquence d'automation marketing professionnelle
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nom du workflow</Label>
                      <Input placeholder="Ex: Relance Prospects Premium" />
                    </div>
                    <div>
                      <Label>Cible</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la cible" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prospects_chauds">Prospects Chauds</SelectItem>
                          <SelectItem value="clients_vip">Clients VIP</SelectItem>
                          <SelectItem value="leads_froids">Leads Froids</SelectItem>
                          <SelectItem value="tous">Tous les contacts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Décrivez l'objectif et la stratégie de ce workflow" />
                  </div>
                  <div>
                    <Label>Déclencheur</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un déclencheur" />
                      </SelectTrigger>
                      <SelectContent>
                        {declencheurs.map((declencheur) => (
                          <SelectItem key={declencheur} value={declencheur}>
                            {declencheur}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button>Créer le Workflow</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {workflows.filter((w) => w.statut === "Actif").length}
              </div>
              <p className="text-xs text-gray-600">Workflows Actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold" style={{ color: "#003366" }}>
                {totalInstancesActives}
              </div>
              <p className="text-xs text-gray-600">Instances en Cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
                {totalEmailsEnvoyes.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Emails Envoyés</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">€{totalROI.toLocaleString()}</div>
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
                  placeholder="Rechercher un workflow..."
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
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des workflows */}
        <div className="grid gap-6">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{workflow.nom}</CardTitle>
                      <Badge
                        className={
                          workflow.statut === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {workflow.statut}
                      </Badge>
                      <Badge variant="outline">{workflow.cible}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>

                    {/* Métriques de performance */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{workflow.instancesActives}</div>
                        <div className="text-xs text-gray-600">Instances actives</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{workflow.tauxConversion}%</div>
                        <div className="text-xs text-gray-600">Taux conversion</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <div className="text-lg font-bold text-purple-600">{workflow.conversions}</div>
                        <div className="text-xs text-gray-600">Conversions</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="text-lg font-bold text-yellow-600">€{workflow.roi.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">ROI généré</div>
                      </div>
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
                    <Button variant="ghost" size="sm">
                      {workflow.statut === "Actif" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="font-medium">Déclencheur:</span>
                    <span className="ml-2">{workflow.declencheur}</span>
                  </div>

                  {/* Aperçu des étapes */}
                  <div>
                    <p className="text-sm font-medium mb-2">Séquence ({workflow.etapes.length} étapes)</p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.etapes.map((etape, index) => (
                        <div key={index} className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1 text-xs">
                          {etape.type === "email" && <Mail className="h-3 w-3 text-blue-500" />}
                          {etape.type === "sms" && <Phone className="h-3 w-3 text-green-500" />}
                          {etape.type === "task" && <Target className="h-3 w-3 text-purple-500" />}
                          {etape.type === "wait" && <Clock className="h-3 w-3 text-gray-500" />}
                          <span>{etape.delai}</span>
                          <span>→</span>
                          <span className="max-w-32 truncate">{etape.sujet || etape.action || etape.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
