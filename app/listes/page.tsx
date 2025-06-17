"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Mail } from "lucide-react"

const listes = [
  {
    id: 1,
    nom: "Newsletter Générale",
    description: "Liste principale pour la newsletter",
    nombreContacts: 1247,
    statut: "Active",
    dateCreation: "2024-01-01",
    dernierEnvoi: "2024-01-20",
    tauxOuverture: 68,
  },
  {
    id: 2,
    nom: "Prospects Chauds",
    description: "Prospects avec score élevé",
    nombreContacts: 89,
    statut: "Active",
    dateCreation: "2024-01-05",
    dernierEnvoi: "2024-01-18",
    tauxOuverture: 85,
  },
  {
    id: 3,
    nom: "Clients Retraite",
    description: "Clients intéressés par les produits retraite",
    nombreContacts: 234,
    statut: "Inactive",
    dateCreation: "2023-12-15",
    dernierEnvoi: "2024-01-10",
    tauxOuverture: 45,
  },
]

export default function ListesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Listes</h1>
            <p className="mt-2 text-gray-600">Gérez vos listes de contacts</p>
          </div>
          <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Liste
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-600">Listes Totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">2</div>
              <p className="text-xs text-gray-600">Actives</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">1,570</div>
              <p className="text-xs text-gray-600">Contacts Totaux</p>
            </CardContent>
          </Card>
        </div>

        {/* Lists Grid */}
        <div className="grid gap-6">
          {listes.map((liste) => (
            <Card key={liste.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{liste.nom}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{liste.description}</p>
                  </div>
                  <Badge
                    className={liste.statut === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {liste.statut}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contacts</p>
                      <p className="text-lg font-semibold">{liste.nombreContacts.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date Création</p>
                    <p className="text-sm text-gray-900">{liste.dateCreation}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Dernier Envoi</p>
                      <p className="text-sm text-gray-900">{liste.dernierEnvoi}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Taux d'Ouverture</p>
                    <p className="text-lg font-semibold text-green-600">{liste.tauxOuverture}%</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    Voir Contacts
                  </Button>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    Envoyer Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
