"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  FileText,
  ClipboardCheck,
  Euro,
  TrendingUp,
  Mail,
  Target,
  Send,
  Eye,
  Settings,
  Plus,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Contacts Total",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    color: "#003366",
    link: "/contacts",
  },
  {
    name: "Propositions Actives",
    value: "89",
    change: "+5%",
    changeType: "positive",
    icon: FileText,
    color: "#D4AF37",
    link: "/propositions",
  },
  {
    name: "Contrats Signés",
    value: "156",
    change: "+8%",
    changeType: "positive",
    icon: ClipboardCheck,
    color: "#10B981",
    link: "/contracts",
  },
  {
    name: "CA Mensuel",
    value: "€45,230",
    change: "+15%",
    changeType: "positive",
    icon: Euro,
    color: "#8B5CF6",
    link: "/reports",
  },
]

const commerciaux = [
  {
    id: 1,
    nom: "Jean Conseiller",
    objectifContacts: 50,
    contactsActuels: 42,
    objectifPropositions: 15,
    propositionsActuelles: 12,
    objectifCA: 25000,
    caActuel: 18500,
    tauxConversion: 24,
  },
  {
    id: 2,
    nom: "Sophie Admin",
    objectifContacts: 40,
    contactsActuels: 38,
    objectifPropositions: 12,
    propositionsActuelles: 14,
    objectifCA: 20000,
    caActuel: 22000,
    tauxConversion: 37,
  },
  {
    id: 3,
    nom: "Pierre Commercial",
    objectifContacts: 60,
    contactsActuels: 55,
    objectifPropositions: 20,
    propositionsActuelles: 18,
    objectifCA: 30000,
    caActuel: 27500,
    tauxConversion: 33,
  },
]

const campagnesEmail = [
  {
    id: 1,
    nom: "Relance Prospects Chauds",
    statut: "Active",
    envoyes: 245,
    ouverts: 156,
    clics: 42,
    conversions: 8,
    tauxOuverture: 63.7,
    tauxClic: 17.1,
    tauxConversion: 3.3,
  },
  {
    id: 2,
    nom: "Newsletter Mensuelle",
    statut: "Terminée",
    envoyes: 1247,
    ouverts: 623,
    clics: 89,
    conversions: 12,
    tauxOuverture: 49.9,
    tauxClic: 7.1,
    tauxConversion: 1.0,
  },
  {
    id: 3,
    nom: "Onboarding Nouveaux Clients",
    statut: "Active",
    envoyes: 89,
    ouverts: 67,
    clics: 23,
    conversions: 5,
    tauxOuverture: 75.3,
    tauxClic: 25.8,
    tauxConversion: 5.6,
  },
]

const automationStats = [
  {
    nom: "Workflows Actifs",
    valeur: 8,
    couleur: "#003366",
  },
  {
    nom: "Emails Automatiques Envoyés",
    valeur: 1456,
    couleur: "#D4AF37",
  },
  {
    nom: "Leads Relancés",
    valeur: 234,
    couleur: "#10B981",
  },
  {
    nom: "Taux de Réponse Auto",
    valeur: "18.5%",
    couleur: "#8B5CF6",
  },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30j")
  const [isObjectifDialogOpen, setIsObjectifDialogOpen] = useState(false)
  const [selectedCommercial, setSelectedCommercial] = useState(null)
  const [newObjectifs, setNewObjectifs] = useState({
    contacts: "",
    propositions: "",
    ca: "",
  })

  const handleTaskAction = (taskId: number, action: string) => {
    console.log(`Action ${action} sur tâche ${taskId}`)
  }

  const handleSetObjectifs = () => {
    console.log("Définir objectifs pour", selectedCommercial, newObjectifs)
    setIsObjectifDialogOpen(false)
    setNewObjectifs({ contacts: "", propositions: "", ca: "" })
  }

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return "#10B981"
    if (percentage >= 75) return "#D4AF37"
    if (percentage >= 50) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header avec actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
            <p className="mt-2 text-gray-600">Vue d'ensemble de votre activité CRM et Marketing Automation</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={selectedPeriod === "7j" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("7j")}
            >
              7 jours
            </Button>
            <Button
              variant={selectedPeriod === "30j" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("30j")}
            >
              30 jours
            </Button>
            <Button
              variant={selectedPeriod === "90j" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("90j")}
            >
              90 jours
            </Button>
          </div>
        </div>

        {/* Stats Grid Cliquables */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.name} href={stat.link}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <p className="text-xs text-green-600">{stat.change} vs période précédente</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Marketing Automation Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Marketing Automation
              </CardTitle>
              <CardDescription>Performance de vos campagnes automatisées</CardDescription>
            </div>
            <Link href="/marketing-automation">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Gérer
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {automationStats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg border">
                  <div className="text-2xl font-bold" style={{ color: stat.couleur }}>
                    {stat.valeur}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{stat.nom}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objectifs Commerciaux */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Objectifs Commerciaux
              </CardTitle>
              <CardDescription>Suivi des performances par commercial</CardDescription>
            </div>
            <Dialog open={isObjectifDialogOpen} onOpenChange={setIsObjectifDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Définir Objectifs
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Définir les Objectifs</DialogTitle>
                  <DialogDescription>Configurez les objectifs mensuels pour un commercial</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label>Commercial</Label>
                    <Select onValueChange={setSelectedCommercial}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un commercial" />
                      </SelectTrigger>
                      <SelectContent>
                        {commerciaux.map((commercial) => (
                          <SelectItem key={commercial.id} value={commercial.nom}>
                            {commercial.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Objectif Contacts</Label>
                    <Input
                      type="number"
                      value={newObjectifs.contacts}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, contacts: e.target.value })}
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <Label>Objectif Propositions</Label>
                    <Input
                      type="number"
                      value={newObjectifs.propositions}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, propositions: e.target.value })}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label>Objectif CA (€)</Label>
                    <Input
                      type="number"
                      value={newObjectifs.ca}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, ca: e.target.value })}
                      placeholder="25000"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsObjectifDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSetObjectifs}>Définir</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {commerciaux.map((commercial) => (
                <div key={commercial.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{commercial.nom}</h3>
                    <Badge
                      className={`${
                        commercial.tauxConversion > 30
                          ? "bg-green-100 text-green-800"
                          : commercial.tauxConversion > 20
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {commercial.tauxConversion}% conversion
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Contacts */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Contacts</span>
                        <span>
                          {commercial.contactsActuels}/{commercial.objectifContacts}
                        </span>
                      </div>
                      <Progress
                        value={(commercial.contactsActuels / commercial.objectifContacts) * 100}
                        className="h-2"
                        style={{
                          backgroundColor: getProgressColor(commercial.contactsActuels, commercial.objectifContacts),
                        }}
                      />
                    </div>

                    {/* Propositions */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Propositions</span>
                        <span>
                          {commercial.propositionsActuelles}/{commercial.objectifPropositions}
                        </span>
                      </div>
                      <Progress
                        value={(commercial.propositionsActuelles / commercial.objectifPropositions) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* CA */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CA</span>
                        <span>
                          €{commercial.caActuel.toLocaleString()}/€{commercial.objectifCA.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(commercial.caActuel / commercial.objectifCA) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campagnes Email */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Campagnes Email
              </CardTitle>
              <CardDescription>Performance de vos campagnes d'emailing</CardDescription>
            </div>
            <Link href="/email-campaigns">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir Tout
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campagnesEmail.map((campagne) => (
                <div key={campagne.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{campagne.nom}</h3>
                      <Badge
                        className={
                          campagne.statut === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {campagne.statut}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{campagne.envoyes} envoyés</p>
                      <p className="text-sm font-medium text-green-600">{campagne.conversions} conversions</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold" style={{ color: "#003366" }}>
                        {campagne.tauxOuverture}%
                      </p>
                      <p className="text-xs text-gray-600">Taux d'ouverture</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold" style={{ color: "#D4AF37" }}>
                        {campagne.tauxClic}%
                      </p>
                      <p className="text-xs text-gray-600">Taux de clic</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-600">{campagne.tauxConversion}%</p>
                      <p className="text-xs text-gray-600">Taux de conversion</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Rapides */}
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/contacts">
                <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Nouveau Contact</span>
                </Button>
              </Link>
              <Link href="/propositions">
                <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Créer Proposition</span>
                </Button>
              </Link>
              <Link href="/marketing-automation">
                <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                  <Send className="h-6 w-6" />
                  <span className="text-sm">Nouveau Workflow</span>
                </Button>
              </Link>
              <Link href="/email-campaigns">
                <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                  <Mail className="h-6 w-6" />
                  <span className="text-sm">Campagne Email</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
