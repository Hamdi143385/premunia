"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
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
  Euro,
  TrendingUp,
  Mail,
  Target,
  Send,
  Eye,
  Settings,
  BarChart3,
  Activity,
  Zap,
  Crown,
} from "lucide-react"
import Link from "next/link"

const globalStats = [
  {
    name: "Contacts Total",
    value: "2,847",
    change: "+18%",
    changeType: "positive",
    icon: Users,
    color: "#003366",
    link: "/admin/contacts",
  },
  {
    name: "Campagnes Actives",
    value: "12",
    change: "+3",
    changeType: "positive",
    icon: Send,
    color: "#D4AF37",
    link: "/admin/campaigns",
  },
  {
    name: "CA Global",
    value: "€156,780",
    change: "+22%",
    changeType: "positive",
    icon: Euro,
    color: "#10B981",
    link: "/admin/reports",
  },
  {
    name: "Workflows Actifs",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: Zap,
    color: "#8B5CF6",
    link: "/admin/automation",
  },
]

const conseillers = [
  {
    id: 1,
    nom: "Jean Conseiller",
    email: "jean@premunia.fr",
    avatar: "JC",
    objectifContacts: 50,
    contactsActuels: 42,
    objectifPropositions: 15,
    propositionsActuelles: 12,
    objectifCA: 25000,
    caActuel: 18500,
    tauxConversion: 24,
    dernierConnexion: "Il y a 2h",
    statut: "En ligne",
    performance: 84,
  },
  {
    id: 2,
    nom: "Sophie Martin",
    email: "sophie@premunia.fr",
    avatar: "SM",
    objectifContacts: 40,
    contactsActuels: 38,
    objectifPropositions: 12,
    propositionsActuelles: 14,
    objectifCA: 20000,
    caActuel: 22000,
    tauxConversion: 37,
    dernierConnexion: "Il y a 1h",
    statut: "En ligne",
    performance: 95,
  },
  {
    id: 3,
    nom: "Pierre Commercial",
    email: "pierre@premunia.fr",
    avatar: "PC",
    objectifContacts: 60,
    contactsActuels: 55,
    objectifPropositions: 20,
    propositionsActuelles: 18,
    objectifCA: 30000,
    caActuel: 27500,
    tauxConversion: 33,
    dernierConnexion: "Il y a 30min",
    statut: "En ligne",
    performance: 92,
  },
]

const automationMetrics = [
  {
    nom: "Emails Automatiques",
    valeur: "2,456",
    evolution: "+15%",
    couleur: "#003366",
  },
  {
    nom: "Leads Qualifiés",
    valeur: "234",
    evolution: "+28%",
    couleur: "#D4AF37",
  },
  {
    nom: "Taux Engagement",
    valeur: "68.5%",
    evolution: "+5.2%",
    couleur: "#10B981",
  },
  {
    nom: "ROI Automation",
    valeur: "€45,230",
    evolution: "+32%",
    couleur: "#8B5CF6",
  },
]

const recentActivities = [
  {
    id: 1,
    action: "Nouveau workflow créé",
    details: "Relance Prospects Immobilier",
    user: "Admin",
    time: "Il y a 1h",
    type: "workflow",
  },
  {
    id: 2,
    action: "Campagne lancée",
    details: "Newsletter Février - 1,247 destinataires",
    user: "Sophie Martin",
    time: "Il y a 2h",
    type: "campaign",
  },
  {
    id: 3,
    action: "Objectifs mis à jour",
    details: "Jean Conseiller - Objectifs Q1 2024",
    user: "Admin",
    time: "Il y a 3h",
    type: "objective",
  },
  {
    id: 4,
    action: "Nouveau contact qualifié",
    details: "Marie Dubois - Score: 85/100",
    user: "Pierre Commercial",
    time: "Il y a 4h",
    type: "contact",
  },
]

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30j")
  const [isObjectifDialogOpen, setIsObjectifDialogOpen] = useState(false)
  const [selectedConseiller, setSelectedConseiller] = useState(null)
  const [newObjectifs, setNewObjectifs] = useState({
    contacts: "",
    propositions: "",
    ca: "",
  })

  const handleSetObjectifs = () => {
    console.log("Définir objectifs pour", selectedConseiller, newObjectifs)
    setIsObjectifDialogOpen(false)
    setNewObjectifs({ contacts: "", propositions: "", ca: "" })
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "#10B981"
    if (performance >= 75) return "#D4AF37"
    if (performance >= 60) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Admin */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6" style={{ color: "#D4AF37" }} />
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
            </div>
            <p className="mt-2 text-gray-600">Vue d'ensemble complète de la plateforme CRM</p>
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

        {/* Stats Globales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {globalStats.map((stat) => {
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

        {/* Performance Marketing Automation */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Performance Marketing Automation
              </CardTitle>
              <CardDescription>Métriques globales d'automatisation</CardDescription>
            </div>
            <Link href="/admin/automation">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Gérer
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {automationMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="text-2xl font-bold" style={{ color: metric.couleur }}>
                    {metric.valeur}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{metric.nom}</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">{metric.evolution}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gestion des Conseillers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Performance des Conseillers
              </CardTitle>
              <CardDescription>Suivi des objectifs et performances individuelles</CardDescription>
            </div>
            <Dialog open={isObjectifDialogOpen} onOpenChange={setIsObjectifDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Définir Objectifs
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Définir les Objectifs</DialogTitle>
                  <DialogDescription>Configurez les objectifs mensuels pour un conseiller</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label>Conseiller</Label>
                    <Select onValueChange={setSelectedConseiller}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un conseiller" />
                      </SelectTrigger>
                      <SelectContent>
                        {conseillers.map((conseiller) => (
                          <SelectItem key={conseiller.id} value={conseiller.nom}>
                            {conseiller.nom}
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
              {conseillers.map((conseiller) => (
                <div key={conseiller.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: "#003366" }}
                      >
                        {conseiller.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{conseiller.nom}</h3>
                        <p className="text-sm text-gray-600">{conseiller.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        className={`${
                          conseiller.statut === "En ligne" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {conseiller.statut}
                      </Badge>
                      <div className="text-right">
                        <div
                          className="text-lg font-bold"
                          style={{ color: getPerformanceColor(conseiller.performance) }}
                        >
                          {conseiller.performance}%
                        </div>
                        <p className="text-xs text-gray-600">Performance</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Contacts */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Contacts</span>
                        <span>
                          {conseiller.contactsActuels}/{conseiller.objectifContacts}
                        </span>
                      </div>
                      <Progress
                        value={(conseiller.contactsActuels / conseiller.objectifContacts) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Propositions */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Propositions</span>
                        <span>
                          {conseiller.propositionsActuelles}/{conseiller.objectifPropositions}
                        </span>
                      </div>
                      <Progress
                        value={(conseiller.propositionsActuelles / conseiller.objectifPropositions) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* CA */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CA</span>
                        <span>
                          €{conseiller.caActuel.toLocaleString()}/€{conseiller.objectifCA.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(conseiller.caActuel / conseiller.objectifCA) * 100} className="h-2" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500">Dernière connexion: {conseiller.dernierConnexion}</div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir Détails
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configurer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activité Récente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Activité Récente
              </CardTitle>
              <CardDescription>Dernières actions sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#003366" }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-sm text-gray-600">{item.details}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.user} • {item.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions Rapides Admin */}
          <Card>
            <CardHeader>
              <CardTitle>Actions Administrateur</CardTitle>
              <CardDescription>Accès rapide aux fonctions d'administration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/users">
                  <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Gérer Utilisateurs</span>
                  </Button>
                </Link>
                <Link href="/admin/automation">
                  <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                    <Zap className="h-6 w-6" />
                    <span className="text-sm">Workflows</span>
                  </Button>
                </Link>
                <Link href="/admin/campaigns">
                  <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm">Campagnes</span>
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button className="h-20 flex flex-col space-y-2 w-full" variant="outline">
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-sm">Rapports</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
