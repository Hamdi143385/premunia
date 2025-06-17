"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Users } from "lucide-react"

const segments = [
  {
    id: 1,
    nom: "Prospects Parisiens Santé",
    description: "Prospects de Paris intéressés par l'assurance santé",
    nombreContacts: 156,
    statut: "Actif",
    dateCreation: "2024-01-10",
    derniereMiseAJour: "2024-01-22",
    criteres: ["Ville: Paris", "Tag: Intérêt Santé", "Score > 50"],
  },
  {
    id: 2,
    nom: "Clients Retraite Lyon",
    description: "Clients de Lyon avec produits retraite",
    nombreContacts: 89,
    statut: "Actif",
    dateCreation: "2024-01-05",
    derniereMiseAJour: "2024-01-20",
    criteres: ["Ville: Lyon", "Produit: Retraite", "Statut: Client"],
  },
  {
    id: 3,
    nom: "Prospects Inactifs",
    description: "Prospects sans activité depuis 30 jours",
    nombreContacts: 234,
    statut: "Inactif",
    dateCreation: "2023-12-20",
    derniereMiseAJour: "2024-01-15",
    criteres: ["Dernière activité > 30 jours", "Statut: Prospect"],
  },
]

export default function SegmentsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Segments</h1>
            <p className="mt-2 text-gray-600">Segmentez vos contacts selon des critères précis</p>
          </div>
          <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Segment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-600">Segments Totaux</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">2</div>
              <p className="text-xs text-gray-600">Actifs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">479</div>
              <p className="text-xs text-gray-600">Contacts Segmentés</p>
            </CardContent>
          </Card>
        </div>

        {/* Segments Grid */}
        <div className="grid gap-6">
          {segments.map((segment) => (
            <Card key={segment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="h-5 w-5 mr-2" style={{ color: "#003366" }} />
                      {segment.nom}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{segment.description}</p>
                  </div>
                  <Badge
                    className={segment.statut === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                  >
                    {segment.statut}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contacts</p>
                      <p className="text-lg font-semibold">{segment.nombreContacts.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date Création</p>
                    <p className="text-sm text-gray-900">{segment.dateCreation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dernière MAJ</p>
                    <p className="text-sm text-gray-900">{segment.derniereMiseAJour}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Critères de Segmentation</p>
                  <div className="flex flex-wrap gap-2">
                    {segment.criteres.map((critere, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {critere}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Voir Contacts
                  </Button>
                  <Button variant="outline" size="sm">
                    Modifier Critères
                  </Button>
                  <Button variant="outline" size="sm">
                    Créer Campagne
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
