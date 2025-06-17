"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
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
import {
  Plus,
  Play,
  Pause,
  Mail,
  Phone,
  Clock,
  Users,
  BarChart3,
  Zap,
  Target,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

const workflows = [
  {
    id: 1,
    nom: "Relance Leads Non Répondants",
    description: "Séquence automatique pour les prospects qui ne répondent pas au téléphone",
    statut: "Actif",
    declencheur: "Appel manqué + 24h",
    etapes: [
      { type: "email", delai: "0h", sujet: "Nous avons essayé de vous joindre" },
      { type: "email", delai: "3j", sujet: "Votre projet d'assurance nous intéresse" },
      { type: "sms", delai: "7j", message: "Rappel: votre devis d'assurance vous attend" },
      { type: "email", delai: "14j", sujet: "Dernière chance - Offre spéciale" },
      { type: "task", delai: "21j", action: "Appel commercial final" },
    ],
    instancesActives: 45,
    tauxConversion: 18.5,
    emailsEnvoyes: 234,
    conversions: 12,
  },
  {
    id: 2,
    nom: "Onboarding Nouveau Prospect",
    description: "Séquence d'accueil pour les nouveaux prospects",
    statut: "Actif",
    declencheur: "Nouveau contact créé",
    etapes: [
      { type: "email", delai: "0h", sujet: "Bienvenue chez Premunia" },
      { type: "email", delai: "1j", sujet: "Découvrez nos solutions d'assurance" },
      { type: "task", delai: "3j", action: "Appel de qualification" },
      { type: "email", delai: "7j", sujet: "Témoignages clients" },
    ],
    instancesActives: 23,
    tauxConversion: 32.1,
    emailsEnvoyes: 156,
    conversions: 8,
  },
  {
    id: 3,
    nom: "Relance Proposition Expirée",
    description: "Relance automatique pour les propositions non signées",
    statut: "Actif",
    declencheur: "Proposition expirée",
    etapes: [
      { type: "email", delai: "0h", sujet: "Votre proposition a expiré" },
      { type: "email", delai: "2j", sujet: "Nouvelle proposition mise à jour" },
      { type: "task", delai: "5j", action: "Appel de relance" },
    ],
    instancesActives: 12,
    tauxConversion: 25.0,
    emailsEnvoyes: 89,
    conversions: 5,
  },
  {
    id: 4,
    nom: "Nurturing Client Froid",
    description: "Réchauffage des prospects inactifs depuis 30 jours",
    statut: "Inactif",
    declencheur: "Inactivité 30 jours",
    etapes: [
      { type: "email", delai: "0h", sujet: "Nous pensons à vous" },
      { type: "email", delai: "7j", sujet: "Actualités assurance" },
      { type: "email", delai: "14j", sujet: "Offre de réactivation" },
    ],
    instancesActives: 0,
    tauxConversion: 12.3,
    emailsEnvoyes: 67,
    conversions: 2,
  },
]

const declencheurs = [
  "Nouveau contact créé",
  "Appel manqué + 24h",
  "Proposition expirée",
  "Inactivité 30 jours",
  "Tag ajouté",
  "Score modifié",
  "Email ouvert",
  "Lien cliqué",
]

const typesEtapes = [
  { value: "email", label: "Email", icon: Mail },
  { value: "sms", label: "SMS", icon: Phone },
  { value: "task", label: "Tâche", icon: Target },
  { value: "wait", label: "Attente", icon: Clock },
]

export default function MarketingAutomationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [newWorkflow, setNewWorkflow] = useState({
    nom: "",
    description: "",
    declencheur: "",
    etapes: [],
  })
  const [newEtape, setNewEtape] = useState({
    type: "email",
    delai: "",
    sujet: "",
    contenu: "",
  })

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = workflow.nom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.statut === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleWorkflowAction = (workflow: any, action: string) => {
    switch (action) {
      case "toggle":
        console.log(`${workflow.statut === "Actif" ? "Désactiver" : "Activer"} workflow ${workflow.nom}`)
        break
      case "edit":
        setSelectedWorkflow(workflow)
        break
      case "duplicate":
        console.log(`Dupliquer workflow ${workflow.nom}`)
        break
      case "delete":
        console.log(`Supprimer workflow ${workflow.nom}`)
        break
      case "view":
        console.log(`Voir détails workflow ${workflow.nom}`)
        break
    }
  }

  const handleCreateWorkflow = () => {
    console.log("Créer nouveau workflow:", newWorkflow)
    setIsCreateDialogOpen(false)
    setNewWorkflow({ nom: "", description: "", declencheur: "", etapes: [] })
  }

  const addEtapeToWorkflow = () => {
    setNewWorkflow({
      ...newWorkflow,
      etapes: [...newWorkflow.etapes, newEtape],
    })
    setNewEtape({ type: "email", delai: "", sujet: "", contenu: "" })
  }

  const getTypeIcon = (type: string) => {
    const typeObj = typesEtapes.find((t) => t.value === type)
    if (typeObj) {
      const Icon = typeObj.icon
      return <Icon className="h-4 w-4" />
    }
    return <Mail className="h-4 w-4" />
  }

  const totalInstancesActives = workflows.reduce((sum, w) => sum + w.instancesActives, 0)
  const totalEmailsEnvoyes = workflows.reduce((sum, w) => sum + w.emailsEnvoyes, 0)
  const totalConversions = workflows.reduce((sum, w) => sum + w.conversions, 0)
  const tauxConversionMoyen = totalConversions > 0 ? ((totalConversions / totalEmailsEnvoyes) * 100).toFixed(1) : 0

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing Automation</h1>
            <p className="mt-2 text-gray-600">Automatisez vos relances et scénarios d'emails</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer un nouveau workflow</DialogTitle>
                <DialogDescription>Configurez votre séquence d'automation marketing</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div>
                  <Label htmlFor="nom">Nom du workflow</Label>
                  <Input
                    id="nom"
                    value={newWorkflow.nom}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, nom: e.target.value })}
                    placeholder="Ex: Relance Leads Non Répondants"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                    placeholder="Décrivez l'objectif de ce workflow"
                  />
                </div>
                <div>
                  <Label htmlFor="declencheur">Déclencheur</Label>
                  <Select
                    value={newWorkflow.declencheur}
                    onValueChange={(value) => setNewWorkflow({ ...newWorkflow, declencheur: value })}
                  >
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

                {/* Étapes du workflow */}
                <div>
                  <Label>Étapes du workflow</Label>
                  <div className="space-y-2 mt-2">
                    {newWorkflow.etapes.map((etape, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                        {getTypeIcon(etape.type)}
                        <span className="text-sm">{etape.sujet || etape.action}</span>
                        <Badge variant="outline">{etape.delai}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ajouter une étape */}
                <div className="border-t pt-4">
                  <Label>Ajouter une étape</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Select value={newEtape.type} onValueChange={(value) => setNewEtape({ ...newEtape, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {typesEtapes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Délai (ex: 2j, 3h)"
                      value={newEtape.delai}
                      onChange={(e) => setNewEtape({ ...newEtape, delai: e.target.value })}
                    />
                  </div>
                  <Input
                    className="mt-2"
                    placeholder="Sujet de l'email ou action"
                    value={newEtape.sujet}
                    onChange={(e) => setNewEtape({ ...newEtape, sujet: e.target.value })}
                  />
                  <Button variant="outline" size="sm" className="mt-2" onClick={addEtapeToWorkflow}>
                    Ajouter l'étape
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateWorkflow}>Créer le Workflow</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                {totalEmailsEnvoyes}
              </div>
              <p className="text-xs text-gray-600">Emails Envoyés</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{tauxConversionMoyen}%</div>
              <p className="text-xs text-gray-600">Taux Conversion Moyen</p>
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
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
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
                    </div>
                    <p className="text-sm text-gray-600">{workflow.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        {workflow.declencheur}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {workflow.instancesActives} actives
                      </div>
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        {workflow.tauxConversion}% conversion
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow, "view")}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow, "edit")}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow, "toggle")}>
                      {workflow.statut === "Actif" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleWorkflowAction(workflow, "delete")}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Performance</span>
                    <span>
                      {workflow.conversions} conversions sur {workflow.emailsEnvoyes} emails
                    </span>
                  </div>

                  {/* Étapes du workflow */}
                  <div>
                    <p className="text-sm font-medium mb-2">Étapes ({workflow.etapes.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.etapes.map((etape, index) => (
                        <div key={index} className="flex items-center space-x-1 bg-gray-100 rounded px-2 py-1 text-xs">
                          {getTypeIcon(etape.type)}
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
    </Layout>
  )
}
