"use client"

import { useState } from "react"
import { QualiteLayout } from "@/components/qualite-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckSquare,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Calendar,
  Euro,
  Eye,
  MessageSquare,
} from "lucide-react"

// Types pour les contrats à valider
interface ContratValidation {
  id: string
  numeroContrat: string
  client: string
  conseiller: string
  compagnie: string
  cotisationMensuelle: number
  cotisationAnnuelle: number
  commissionMensuelle: number
  commissionAnnuelle: number
  dateSignature: string
  dateEffet: string
  statut: "En attente validation" | "Validé" | "Rejeté" | "En révision"
  priorite: "Normale" | "Haute" | "Urgente"
  documentsManquants: string[]
  commentaires: string
  dateValidation?: string
  validePar?: string
}

// Données de démonstration
const contratsValidationDemo: ContratValidation[] = [
  {
    id: "1",
    numeroContrat: "CONT-2024-005",
    client: "Marie Dubois",
    conseiller: "Jean Conseiller",
    compagnie: "ZENIOO",
    cotisationMensuelle: 142.95,
    cotisationAnnuelle: 1715.4,
    commissionMensuelle: 42.885,
    commissionAnnuelle: 514.62,
    dateSignature: "2024-01-20",
    dateEffet: "2024-02-01",
    statut: "En attente validation",
    priorite: "Haute",
    documentsManquants: ["Pièce d'identité", "Justificatif de domicile"],
    commentaires: "Client VIP - Traitement prioritaire",
  },
  {
    id: "2",
    numeroContrat: "CONT-2024-006",
    client: "Pierre Martin",
    conseiller: "Sophie Martin",
    compagnie: "NÉOLIANE",
    cotisationMensuelle: 89.5,
    cotisationAnnuelle: 1074.0,
    commissionMensuelle: 26.85,
    commissionAnnuelle: 322.2,
    dateSignature: "2024-01-18",
    dateEffet: "2024-02-01",
    statut: "En révision",
    priorite: "Normale",
    documentsManquants: [],
    commentaires: "Vérification des revenus nécessaire",
  },
  {
    id: "3",
    numeroContrat: "CONT-2024-007",
    client: "Sophie Laurent",
    conseiller: "Jean Conseiller",
    compagnie: "ZENIOO",
    cotisationMensuelle: 156.2,
    cotisationAnnuelle: 1874.4,
    commissionMensuelle: 46.86,
    commissionAnnuelle: 562.32,
    dateSignature: "2024-01-19",
    dateEffet: "2024-02-01",
    statut: "En attente validation",
    priorite: "Urgente",
    documentsManquants: ["Questionnaire médical"],
    commentaires: "Contrat avec surprime médicale",
  },
]

export default function QualiteDashboardPage() {
  const [contrats, setContrats] = useState<ContratValidation[]>(contratsValidationDemo)
  const [selectedContrat, setSelectedContrat] = useState<ContratValidation | null>(null)
  const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false)
  const [validationCommentaire, setValidationCommentaire] = useState("")
  const [actionType, setActionType] = useState<"valider" | "rejeter" | "revision">("valider")

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "En attente validation":
        return "bg-yellow-100 text-yellow-800"
      case "Validé":
        return "bg-green-100 text-green-800"
      case "Rejeté":
        return "bg-red-100 text-red-800"
      case "En révision":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case "Urgente":
        return "bg-red-100 text-red-800"
      case "Haute":
        return "bg-orange-100 text-orange-800"
      case "Normale":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleValidation = (contrat: ContratValidation, action: "valider" | "rejeter" | "revision") => {
    setSelectedContrat(contrat)
    setActionType(action)
    setIsValidationDialogOpen(true)
  }

  const confirmValidation = () => {
    if (!selectedContrat) return

    let newStatut: ContratValidation["statut"]
    switch (actionType) {
      case "valider":
        newStatut = "Validé"
        break
      case "rejeter":
        newStatut = "Rejeté"
        break
      case "revision":
        newStatut = "En révision"
        break
    }

    setContrats(
      contrats.map((contrat) =>
        contrat.id === selectedContrat.id
          ? {
              ...contrat,
              statut: newStatut,
              commentaires: validationCommentaire || contrat.commentaires,
              dateValidation: new Date().toLocaleDateString("fr-FR"),
              validePar: "Pierre Qualité",
            }
          : contrat,
      ),
    )

    setIsValidationDialogOpen(false)
    setValidationCommentaire("")
    setSelectedContrat(null)
  }

  const stats = {
    total: contrats.length,
    enAttente: contrats.filter((c) => c.statut === "En attente validation").length,
    valides: contrats.filter((c) => c.statut === "Validé").length,
    rejetes: contrats.filter((c) => c.statut === "Rejeté").length,
    urgents: contrats.filter((c) => c.priorite === "Urgente").length,
  }

  // Grouper les contrats par conseiller
  const contratsParConseiller = contrats.reduce(
    (acc, contrat) => {
      if (!acc[contrat.conseiller]) {
        acc[contrat.conseiller] = []
      }
      acc[contrat.conseiller].push(contrat)
      return acc
    },
    {} as Record<string, ContratValidation[]>,
  )

  return (
    <QualiteLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contrôle Qualité</h1>
            <p className="text-gray-600">Validation et contrôle des contrats</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contrats</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.enAttente}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Validés</CardTitle>
              <CheckSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.valides}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejetes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.urgents}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs pour différentes vues */}
        <Tabs defaultValue="tous" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tous">Tous les Contrats</TabsTrigger>
            <TabsTrigger value="conseillers">Par Conseiller</TabsTrigger>
            <TabsTrigger value="attente">En Attente</TabsTrigger>
          </TabsList>

          {/* Onglet Tous les Contrats */}
          <TabsContent value="tous">
            <Card>
              <CardHeader>
                <CardTitle>Tous les Contrats ({contrats.length})</CardTitle>
                <CardDescription>Liste complète des contrats à valider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contrats.map((contrat) => (
                    <div key={contrat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{contrat.numeroContrat}</h3>
                          <p className="text-gray-600">{contrat.client}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPrioriteColor(contrat.priorite)}>{contrat.priorite}</Badge>
                          <Badge className={getStatutColor(contrat.statut)}>{contrat.statut}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {contrat.conseiller}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {contrat.dateSignature}
                        </div>
                        <div className="flex items-center">
                          <Euro className="h-4 w-4 mr-1" />€{contrat.cotisationMensuelle}/mois
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {contrat.compagnie}
                        </div>
                      </div>

                      {contrat.documentsManquants.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-red-600">Documents manquants:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {contrat.documentsManquants.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-red-600 border-red-200">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {contrat.commentaires && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">
                            <MessageSquare className="h-4 w-4 inline mr-1" />
                            {contrat.commentaires}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Commission: €{contrat.commissionMensuelle.toFixed(2)}/mois
                        </div>
                        {contrat.statut === "En attente validation" && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleValidation(contrat, "revision")}
                              className="text-blue-600 border-blue-200"
                            >
                              Révision
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleValidation(contrat, "rejeter")}
                              className="text-red-600 border-red-200"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleValidation(contrat, "valider")}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckSquare className="h-4 w-4 mr-1" />
                              Valider
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Par Conseiller */}
          <TabsContent value="conseillers">
            <div className="space-y-6">
              {Object.entries(contratsParConseiller).map(([conseiller, contratsConseiller]) => (
                <Card key={conseiller}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{conseiller}</span>
                      <Badge variant="outline">{contratsConseiller.length} contrats</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contratsConseiller.map((contrat) => (
                        <div key={contrat.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{contrat.numeroContrat}</h4>
                              <p className="text-sm text-gray-600">
                                {contrat.client} • {contrat.compagnie}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatutColor(contrat.statut)}>{contrat.statut}</Badge>
                              {contrat.statut === "En attente validation" && (
                                <div className="flex space-x-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleValidation(contrat, "rejeter")}
                                    className="text-red-600"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleValidation(contrat, "valider")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckSquare className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet En Attente */}
          <TabsContent value="attente">
            <Card>
              <CardHeader>
                <CardTitle>Contrats en Attente de Validation ({stats.enAttente})</CardTitle>
                <CardDescription>Contrats nécessitant une validation immédiate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contrats
                    .filter((c) => c.statut === "En attente validation")
                    .map((contrat) => (
                      <div key={contrat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{contrat.numeroContrat}</h3>
                            <p className="text-gray-600">{contrat.client}</p>
                          </div>
                          <Badge className={getPrioriteColor(contrat.priorite)}>{contrat.priorite}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                          <div>Conseiller: {contrat.conseiller}</div>
                          <div>Compagnie: {contrat.compagnie}</div>
                          <div>Cotisation: €{contrat.cotisationMensuelle}/mois</div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleValidation(contrat, "revision")}
                            className="text-blue-600"
                          >
                            Révision
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleValidation(contrat, "rejeter")}
                            className="text-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeter
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleValidation(contrat, "valider")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckSquare className="h-4 w-4 mr-1" />
                            Valider
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog de Validation */}
        <Dialog open={isValidationDialogOpen} onOpenChange={setIsValidationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "valider" && "Valider le contrat"}
                {actionType === "rejeter" && "Rejeter le contrat"}
                {actionType === "revision" && "Demander une révision"}
              </DialogTitle>
              <DialogDescription>
                {selectedContrat && `Contrat ${selectedContrat.numeroContrat} - ${selectedContrat.client}`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="commentaire">Commentaire</Label>
                <Textarea
                  id="commentaire"
                  value={validationCommentaire}
                  onChange={(e) => setValidationCommentaire(e.target.value)}
                  placeholder="Ajoutez un commentaire sur votre décision..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsValidationDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={confirmValidation}
                className={
                  actionType === "valider"
                    ? "bg-green-600 hover:bg-green-700"
                    : actionType === "rejeter"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                }
              >
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </QualiteLayout>
  )
}
