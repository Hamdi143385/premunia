"use client"

import { useState } from "react"
import { GestionnaireLayout } from "@/components/gestionnaire-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, AlertTriangle, Clock, Euro, Phone, Mail, User, Calendar, Plus, Eye } from "lucide-react"

// Types pour les tickets
interface Ticket {
  id: string
  numeroTicket: string
  client: string
  email: string
  telephone: string
  sujet: string
  description: string
  priorite: "Basse" | "Moyenne" | "Haute" | "Urgente"
  statut: "Nouveau" | "En cours" | "En attente" | "Résolu" | "Fermé"
  categorie: string
  dateCreation: string
  derniereReponse: string
  assigneA: string
  numeroContrat?: string
}

// Types pour les impayés
interface Impaye {
  id: string
  client: string
  numeroContrat: string
  montantDu: number
  dateEcheance: string
  joursRetard: number
  statut: "En retard" | "Relance 1" | "Relance 2" | "Contentieux" | "Résolu"
  dernierContact: string
  prochainAction: string
  conseiller: string
}

// Données de démonstration pour les tickets
const ticketsDemo: Ticket[] = [
  {
    id: "1",
    numeroTicket: "TK-2024-001",
    client: "Marie Dubois",
    email: "marie.dubois@email.com",
    telephone: "01 23 45 67 89",
    sujet: "Problème de remboursement",
    description: "Je n'ai pas reçu mon remboursement pour les frais médicaux du mois dernier",
    priorite: "Haute",
    statut: "Nouveau",
    categorie: "Remboursement",
    dateCreation: "2024-01-20",
    derniereReponse: "2024-01-20",
    assigneA: "Sophie Gestionnaire",
    numeroContrat: "CONT-2024-001",
  },
  {
    id: "2",
    numeroTicket: "TK-2024-002",
    client: "Jean Martin",
    email: "jean.martin@email.com",
    telephone: "01 98 76 54 32",
    sujet: "Modification de contrat",
    description: "Je souhaite modifier les bénéficiaires de mon contrat d'assurance vie",
    priorite: "Moyenne",
    statut: "En cours",
    categorie: "Modification",
    dateCreation: "2024-01-18",
    derniereReponse: "2024-01-19",
    assigneA: "Sophie Gestionnaire",
    numeroContrat: "CONT-2024-002",
  },
]

// Données de démonstration pour les impayés
const impayesDemo: Impaye[] = [
  {
    id: "1",
    client: "Pierre Durand",
    numeroContrat: "CONT-2024-003",
    montantDu: 142.95,
    dateEcheance: "2024-01-15",
    joursRetard: 5,
    statut: "En retard",
    dernierContact: "2024-01-18",
    prochainAction: "Appel de relance",
    conseiller: "Jean Conseiller",
  },
  {
    id: "2",
    client: "Sophie Laurent",
    numeroContrat: "CONT-2024-004",
    montantDu: 89.5,
    dateEcheance: "2024-01-10",
    joursRetard: 10,
    statut: "Relance 1",
    dernierContact: "2024-01-16",
    prochainAction: "Email de relance",
    conseiller: "Sophie Martin",
  },
]

export default function GestionnaireDashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsDemo)
  const [impayes, setImpayes] = useState<Impaye[]>(impayesDemo)
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({
    priorite: "Moyenne",
    statut: "Nouveau",
    categorie: "Général",
  })

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "Urgente":
        return "bg-red-100 text-red-800"
      case "Haute":
        return "bg-orange-100 text-orange-800"
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800"
      case "Basse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Nouveau":
        return "bg-blue-100 text-blue-800"
      case "En cours":
        return "bg-purple-100 text-purple-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Résolu":
        return "bg-green-100 text-green-800"
      case "Fermé":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpayeStatusColor = (statut: string) => {
    switch (statut) {
      case "En retard":
        return "bg-yellow-100 text-yellow-800"
      case "Relance 1":
        return "bg-orange-100 text-orange-800"
      case "Relance 2":
        return "bg-red-100 text-red-800"
      case "Contentieux":
        return "bg-red-100 text-red-800"
      case "Résolu":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateTicket = () => {
    if (newTicket.client && newTicket.sujet) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        numeroTicket: `TK-2024-${String(tickets.length + 1).padStart(3, "0")}`,
        client: newTicket.client || "",
        email: newTicket.email || "",
        telephone: newTicket.telephone || "",
        sujet: newTicket.sujet || "",
        description: newTicket.description || "",
        priorite: (newTicket.priorite as any) || "Moyenne",
        statut: "Nouveau",
        categorie: newTicket.categorie || "Général",
        dateCreation: new Date().toLocaleDateString("fr-FR"),
        derniereReponse: new Date().toLocaleDateString("fr-FR"),
        assigneA: "Sophie Gestionnaire",
        numeroContrat: newTicket.numeroContrat,
      }
      setTickets([...tickets, ticket])
      setNewTicket({
        priorite: "Moyenne",
        statut: "Nouveau",
        categorie: "Général",
      })
      setIsNewTicketOpen(false)
    }
  }

  const handleUpdateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, statut: newStatus as any, derniereReponse: new Date().toLocaleDateString("fr-FR") }
          : ticket,
      ),
    )
  }

  const handleUpdateImpayeStatus = (impayeId: string, newStatus: string) => {
    setImpayes(
      impayes.map((impaye) =>
        impaye.id === impayeId
          ? { ...impaye, statut: newStatus as any, dernierContact: new Date().toLocaleDateString("fr-FR") }
          : impaye,
      ),
    )
  }

  const ticketsStats = {
    total: tickets.length,
    nouveaux: tickets.filter((t) => t.statut === "Nouveau").length,
    enCours: tickets.filter((t) => t.statut === "En cours").length,
    urgents: tickets.filter((t) => t.priorite === "Urgente").length,
  }

  const impayesStats = {
    total: impayes.length,
    montantTotal: impayes.reduce((sum, i) => sum + i.montantDu, 0),
    enRetard: impayes.filter((i) => i.statut === "En retard").length,
    contentieux: impayes.filter((i) => i.statut === "Contentieux").length,
  }

  return (
    <GestionnaireLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Gestionnaire</h1>
            <p className="text-gray-600">Gestion des tickets clients et impayés</p>
          </div>
          <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer un nouveau ticket</DialogTitle>
                <DialogDescription>Enregistrez une nouvelle demande client</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={newTicket.client || ""}
                      onChange={(e) => setNewTicket({ ...newTicket, client: e.target.value })}
                      placeholder="Nom du client"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTicket.email || ""}
                      onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
                      placeholder="email@client.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={newTicket.telephone || ""}
                      onChange={(e) => setNewTicket({ ...newTicket, telephone: e.target.value })}
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contrat">N° Contrat (optionnel)</Label>
                    <Input
                      id="contrat"
                      value={newTicket.numeroContrat || ""}
                      onChange={(e) => setNewTicket({ ...newTicket, numeroContrat: e.target.value })}
                      placeholder="CONT-2024-XXX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sujet">Sujet</Label>
                  <Input
                    id="sujet"
                    value={newTicket.sujet || ""}
                    onChange={(e) => setNewTicket({ ...newTicket, sujet: e.target.value })}
                    placeholder="Résumé de la demande"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTicket.description || ""}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Description détaillée de la demande"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priorite">Priorité</Label>
                    <Select
                      value={newTicket.priorite}
                      onValueChange={(value) => setNewTicket({ ...newTicket, priorite: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basse">Basse</SelectItem>
                        <SelectItem value="Moyenne">Moyenne</SelectItem>
                        <SelectItem value="Haute">Haute</SelectItem>
                        <SelectItem value="Urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select
                      value={newTicket.categorie}
                      onValueChange={(value) => setNewTicket({ ...newTicket, categorie: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Remboursement">Remboursement</SelectItem>
                        <SelectItem value="Modification">Modification</SelectItem>
                        <SelectItem value="Réclamation">Réclamation</SelectItem>
                        <SelectItem value="Information">Information</SelectItem>
                        <SelectItem value="Technique">Technique</SelectItem>
                        <SelectItem value="Général">Général</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewTicketOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateTicket}>Créer le ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Actifs</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ticketsStats.total}</div>
              <p className="text-xs text-muted-foreground">{ticketsStats.nouveaux} nouveaux</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Urgents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{ticketsStats.urgents}</div>
              <p className="text-xs text-muted-foreground">Priorité haute/urgente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impayés</CardTitle>
              <Euro className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{impayesStats.total}</div>
              <p className="text-xs text-muted-foreground">€{impayesStats.montantTotal.toFixed(2)} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Cours</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{ticketsStats.enCours}</div>
              <p className="text-xs text-muted-foreground">Tickets en traitement</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs pour Tickets et Impayés */}
        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tickets">Tickets Clients</TabsTrigger>
            <TabsTrigger value="impayes">Gestion Impayés</TabsTrigger>
          </TabsList>

          {/* Onglet Tickets */}
          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Tickets Clients ({tickets.length})</CardTitle>
                <CardDescription>Gestion des demandes et réclamations clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold text-lg">{ticket.numeroTicket}</h3>
                            <p className="text-gray-600">{ticket.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(ticket.priorite)}>{ticket.priorite}</Badge>
                          <Badge className={getStatusColor(ticket.statut)}>{ticket.statut}</Badge>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="font-medium">{ticket.sujet}</h4>
                        <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {ticket.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {ticket.telephone}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {ticket.dateCreation}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {ticket.assigneA}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Catégorie: {ticket.categorie}
                          {ticket.numeroContrat && ` • Contrat: ${ticket.numeroContrat}`}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Select
                            value={ticket.statut}
                            onValueChange={(value) => handleUpdateTicketStatus(ticket.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Nouveau">Nouveau</SelectItem>
                              <SelectItem value="En cours">En cours</SelectItem>
                              <SelectItem value="En attente">En attente</SelectItem>
                              <SelectItem value="Résolu">Résolu</SelectItem>
                              <SelectItem value="Fermé">Fermé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Impayés */}
          <TabsContent value="impayes">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Impayés ({impayes.length})</CardTitle>
                <CardDescription>Suivi et relance des paiements en retard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {impayes.map((impaye) => (
                    <div key={impaye.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{impaye.client}</h3>
                          <p className="text-gray-600">Contrat: {impaye.numeroContrat}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getImpayeStatusColor(impaye.statut)}>{impaye.statut}</Badge>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">€{impaye.montantDu.toFixed(2)}</div>
                            <div className="text-sm text-gray-500">{impaye.joursRetard} jours</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Échéance:</span>
                          <br />
                          {impaye.dateEcheance}
                        </div>
                        <div>
                          <span className="font-medium">Dernier contact:</span>
                          <br />
                          {impaye.dernierContact}
                        </div>
                        <div>
                          <span className="font-medium">Conseiller:</span>
                          <br />
                          {impaye.conseiller}
                        </div>
                        <div>
                          <span className="font-medium">Prochaine action:</span>
                          <br />
                          {impaye.prochainAction}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Appeler
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                        <Select
                          value={impaye.statut}
                          onValueChange={(value) => handleUpdateImpayeStatus(impaye.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="En retard">En retard</SelectItem>
                            <SelectItem value="Relance 1">Relance 1</SelectItem>
                            <SelectItem value="Relance 2">Relance 2</SelectItem>
                            <SelectItem value="Contentieux">Contentieux</SelectItem>
                            <SelectItem value="Résolu">Résolu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </GestionnaireLayout>
  )
}
