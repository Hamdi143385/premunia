"use client"

import { useState, useEffect } from "react"
import { ConseillerLayout } from "@/components/conseiller-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  ClipboardCheck,
  Euro,
  TrendingUp,
  Target,
  Phone,
  Mail,
  CheckSquare,
  Activity,
  Award,
} from "lucide-react"

const conseillerStats = [
  {
    name: "Mes Contacts",
    value: "156",
    change: "+8",
    changeType: "positive",
    icon: Users,
    color: "#003366",
  },
  {
    name: "Mes Propositions",
    value: "12",
    change: "+3",
    changeType: "positive",
    icon: FileText,
    color: "#D4AF37",
  },
  {
    name: "Contrats Signés",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: ClipboardCheck,
    color: "#10B981",
  },
  {
    name: "Mon CA",
    value: "€18,500",
    change: "+15%",
    changeType: "positive",
    icon: Euro,
    color: "#8B5CF6",
  },
]

const mesObjectifs = {
  contacts: { actuel: 42, objectif: 50, pourcentage: 84 },
  propositions: { actuel: 12, objectif: 15, pourcentage: 80 },
  ca: { actuel: 18500, objectif: 25000, pourcentage: 74 },
  conversion: { actuel: 24, objectif: 30, pourcentage: 80 },
}

const mesContacts = [
  {
    id: 1,
    nom: "Marie Dubois",
    email: "marie.dubois@email.com",
    telephone: "01 23 45 67 89",
    statut: "Prospect Chaud",
    score: 85,
    dernierContact: "2024-01-20",
    prochainAction: "Appel de suivi",
    engagement: "Élevé",
  },
  {
    id: 2,
    nom: "Jean Martin",
    email: "jean.martin@email.com",
    telephone: "01 98 76 54 32",
    statut: "RDV Programmé",
    score: 92,
    dernierContact: "2024-01-18",
    prochainAction: "RDV Mardi 14h",
    engagement: "Très Élevé",
  },
  {
    id: 3,
    nom: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    telephone: "01 11 22 33 44",
    statut: "Proposition Envoyée",
    score: 67,
    dernierContact: "2024-01-15",
    prochainAction: "Relance proposition",
    engagement: "Moyen",
  },
]

const mesTaches = [
  {
    id: 1,
    task: "Appeler Marie Dubois",
    priority: "Haute",
    due: "Aujourd'hui 14h",
    contact: "Marie Dubois",
    type: "call",
  },
  {
    id: 2,
    task: "Préparer proposition Jean Martin",
    priority: "Haute",
    due: "Demain 10h",
    contact: "Jean Martin",
    type: "document",
  },
  {
    id: 3,
    task: "Relancer Sophie Laurent",
    priority: "Moyenne",
    due: "Cette semaine",
    contact: "Sophie Laurent",
    type: "email",
  },
]

const engagementData = [
  { contact: "Marie Dubois", emails: 5, ouvertures: 4, clics: 2, score: 85 },
  { contact: "Jean Martin", emails: 3, ouvertures: 3, clics: 3, score: 92 },
  { contact: "Sophie Laurent", emails: 4, ouvertures: 2, clics: 1, score: 67 },
]

export default function ConseillerDashboardPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "Très Élevé":
        return "bg-green-100 text-green-800"
      case "Élevé":
        return "bg-blue-100 text-blue-800"
      case "Moyen":
        return "bg-yellow-100 text-yellow-800"
      case "Faible":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"
    if (score >= 60) return "#D4AF37"
    if (score >= 40) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <ConseillerLayout>
      <div className="space-y-6">
        {/* Header Conseiller */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6" style={{ color: "#D4AF37" }} />
              <h1 className="text-3xl font-bold text-gray-900">Bonjour {user?.nom || "Conseiller"}</h1>
            </div>
            <p className="mt-2 text-gray-600">Votre tableau de bord personnel</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Performance globale</p>
            <div className="text-2xl font-bold text-green-600">84%</div>
          </div>
        </div>

        {/* Stats Personnelles */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {conseillerStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.name}</CardTitle>
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">{stat.change} ce mois</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mes Objectifs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
              Mes Objectifs du Mois
            </CardTitle>
            <CardDescription>Suivi de vos performances personnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Contacts</span>
                  <span>
                    {mesObjectifs.contacts.actuel}/{mesObjectifs.contacts.objectif}
                  </span>
                </div>
                <Progress value={mesObjectifs.contacts.pourcentage} className="h-3" />
                <p className="text-xs text-gray-600 mt-1">{mesObjectifs.contacts.pourcentage}% atteint</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Propositions</span>
                  <span>
                    {mesObjectifs.propositions.actuel}/{mesObjectifs.propositions.objectif}
                  </span>
                </div>
                <Progress value={mesObjectifs.propositions.pourcentage} className="h-3" />
                <p className="text-xs text-gray-600 mt-1">{mesObjectifs.propositions.pourcentage}% atteint</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Chiffre d'Affaires</span>
                  <span>
                    €{mesObjectifs.ca.actuel.toLocaleString()}/€{mesObjectifs.ca.objectif.toLocaleString()}
                  </span>
                </div>
                <Progress value={mesObjectifs.ca.pourcentage} className="h-3" />
                <p className="text-xs text-gray-600 mt-1">{mesObjectifs.ca.pourcentage}% atteint</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Taux Conversion</span>
                  <span>
                    {mesObjectifs.conversion.actuel}%/{mesObjectifs.conversion.objectif}%
                  </span>
                </div>
                <Progress value={mesObjectifs.conversion.pourcentage} className="h-3" />
                <p className="text-xs text-gray-600 mt-1">{mesObjectifs.conversion.pourcentage}% atteint</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mes Contacts et Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Mes Contacts Prioritaires
              </CardTitle>
              <CardDescription>Contacts nécessitant votre attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mesContacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{contact.nom}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: getScoreColor(contact.score) }}>
                          {contact.score}
                        </div>
                        <p className="text-xs text-gray-600">Score</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{contact.statut}</Badge>
                      <Badge className={getEngagementColor(contact.engagement)}>{contact.engagement}</Badge>
                    </div>

                    <div className="mt-2 text-sm text-gray-600">
                      <p>Prochaine action: {contact.prochainAction}</p>
                      <p>Dernier contact: {contact.dernierContact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                Engagement des Contacts
              </CardTitle>
              <CardDescription>Interactions et engagement par contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementData.map((data, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{data.contact}</h3>
                      <div className="text-lg font-bold" style={{ color: getScoreColor(data.score) }}>
                        {data.score}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold text-blue-600">{data.emails}</div>
                        <div className="text-gray-600">Emails</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">{data.ouvertures}</div>
                        <div className="text-gray-600">Ouvertures</div>
                      </div>
                      <div>
                        <div className="font-semibold text-purple-600">{data.clics}</div>
                        <div className="text-gray-600">Clics</div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Engagement</span>
                        <span>{Math.round((data.clics / data.emails) * 100)}%</span>
                      </div>
                      <Progress value={(data.clics / data.emails) * 100} className="h-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mes Tâches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckSquare className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
              Mes Tâches du Jour
            </CardTitle>
            <CardDescription>Actions prioritaires à réaliser</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mesTaches.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {task.type === "call" && <Phone className="h-4 w-4 text-blue-500" />}
                    {task.type === "email" && <Mail className="h-4 w-4 text-green-500" />}
                    {task.type === "document" && <FileText className="h-4 w-4 text-purple-500" />}
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-gray-600">{task.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        task.priority === "Haute" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <div className="text-sm text-gray-600">{task.due}</div>
                    <Button size="sm" variant="outline">
                      ✓
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ConseillerLayout>
  )
}
