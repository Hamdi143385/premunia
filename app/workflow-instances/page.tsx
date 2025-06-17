"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Square } from "lucide-react"

const instances = [
  {
    id: 1,
    workflowNom: "Onboarding Nouveau Prospect",
    contact: "Marie Dubois",
    statut: "En Cours",
    etapeActuelle: "Envoi Email de Bienvenue",
    progression: 60,
    dateDebut: "2024-01-20",
    prochainAction: "2024-01-25",
  },
  {
    id: 2,
    workflowNom: "Relance Proposition",
    contact: "Jean Martin",
    statut: "En Attente",
    etapeActuelle: "Attente Réponse Client",
    progression: 33,
    dateDebut: "2024-01-18",
    prochainAction: "2024-01-26",
  },
  {
    id: 3,
    workflowNom: "Onboarding Nouveau Prospect",
    contact: "Sophie Laurent",
    statut: "Terminé",
    etapeActuelle: "Workflow Complété",
    progression: 100,
    dateDebut: "2024-01-15",
    prochainAction: "-",
  },
  {
    id: 4,
    workflowNom: "Nurturing Client Froid",
    contact: "Pierre Durand",
    statut: "Arrêté",
    etapeActuelle: "Arrêt Manuel",
    progression: 25,
    dateDebut: "2024-01-10",
    prochainAction: "-",
  },
]

const getStatusColor = (statut: string) => {
  switch (statut) {
    case "En Cours":
      return "bg-blue-100 text-blue-800"
    case "En Attente":
      return "bg-yellow-100 text-yellow-800"
    case "Terminé":
      return "bg-green-100 text-green-800"
    case "Arrêté":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function WorkflowInstancesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instances de Workflow</h1>
            <p className="mt-2 text-gray-600">Suivez l'exécution de vos workflows</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-gray-600">En Cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <p className="text-xs text-gray-600">En Attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">23</div>
              <p className="text-xs text-gray-600">Terminées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-gray-600">Arrêtées</p>
            </CardContent>
          </Card>
        </div>

        {/* Instances List */}
        <Card>
          <CardHeader>
            <CardTitle>Instances Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instances.map((instance) => (
                <div key={instance.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{instance.workflowNom}</h3>
                        <Badge className={getStatusColor(instance.statut)}>{instance.statut}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Contact: {instance.contact}</p>
                      <p className="text-sm text-gray-600">Étape: {instance.etapeActuelle}</p>
                    </div>
                    <div className="flex space-x-2">
                      {instance.statut === "En Cours" && (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {instance.statut === "En Attente" && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{instance.progression}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${instance.progression}%`,
                          backgroundColor: "#003366",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Début: {instance.dateDebut}</span>
                    <span>Prochaine action: {instance.prochainAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
