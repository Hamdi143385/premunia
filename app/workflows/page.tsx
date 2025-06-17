"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause } from "lucide-react"

const workflows = [
  {
    id: 1,
    nom: "Onboarding Nouveau Prospect",
    description: "Séquence d'accueil pour les nouveaux prospects",
    statut: "Actif",
    declencheurs: ["Tag Ajouté: nouveau_prospect"],
    etapes: 5,
    instancesActives: 12,
    tauxConversion: 68,
  },
  {
    id: 2,
    nom: "Relance Proposition",
    description: "Relance automatique après envoi de proposition",
    statut: "Actif",
    declencheurs: ["Proposition Envoyée"],
    etapes: 3,
    instancesActives: 8,
    tauxConversion: 45,
  },
  {
    id: 3,
    nom: "Nurturing Client Froid",
    description: "Réchauffage des prospects inactifs",
    statut: "Inactif",
    declencheurs: ["Inactivité 30 jours"],
    etapes: 4,
    instancesActives: 0,
    tauxConversion: 23,
  },
]

export default function WorkflowsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
            <p className="mt-2 text-gray-600">Automatisez vos processus commerciaux</p>
          </div>
          <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Workflow
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-600">Workflows Totaux</p>
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
              <div className="text-2xl font-bold">20</div>
              <p className="text-xs text-gray-600">Instances Actives</p>
            </CardContent>
          </Card>
        </div>

        {/* Workflows List */}
        <div className="grid gap-6">
          {workflows.map((workflow) => (
            <Card key={workflow.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{workflow.nom}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        workflow.statut === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {workflow.statut}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      {workflow.statut === "Actif" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Déclencheurs</p>
                    <div className="mt-1">
                      {workflow.declencheurs.map((declencheur, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {declencheur}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Étapes</p>
                    <p className="text-lg font-semibold">{workflow.etapes}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Instances Actives</p>
                    <p className="text-lg font-semibold">{workflow.instancesActives}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Taux de Conversion</p>
                    <p className="text-lg font-semibold text-green-600">{workflow.tauxConversion}%</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    Voir Détails
                  </Button>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    Instances
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
