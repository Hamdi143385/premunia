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
import { Plus, Search, Filter, Download, Eye, Edit, Send, FileText } from "lucide-react"

const initialPropositions = [
  {
    id: 1,
    numero: "PROP-2024-001",
    contact: "Marie Dubois",
    produit: "Assurance Vie Premium",
    montant: 25000,
    statut: "En Attente Signature",
    dateCreation: "2024-01-15",
    dateExpiration: "2024-02-15",
    commission: 1250,
    notes: "Client intéressé, relance prévue",
  },
  {
    id: 2,
    numero: "PROP-2024-002",
    contact: "Jean Martin",
    produit: "Plan Épargne Retraite",
    montant: 50000,
    statut: "Acceptée Signée",
    dateCreation: "2024-01-10",
    dateExpiration: "2024-02-10",
    commission: 2500,
    notes: "Signature rapide, client satisfait",
  },
  {
    id: 3,
    numero: "PROP-2024-003",
    contact: "Sophie Laurent",
    produit: "Assurance Santé",
    montant: 15000,
    statut: "Refusée",
    dateCreation: "2024-01-05",
    dateExpiration: "2024-02-05",
    commission: 750,
    notes: "Budget insuffisant selon le client",
  },
]

const produits = [
  "Assurance Vie Premium",
  "Plan Épargne Retraite",
  "Assurance Santé",
  "Assurance Auto",
  "Assurance Habitation",
  "Prévoyance",
]

export default function PropositionsPage() {
  const [propositions, setPropositions] = useState(initialPropositions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProposition, setNewProposition] = useState({
    contact: "",
    produit: "",
    montant: "",
    notes: "",
  })

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "Acceptée Signée":
        return "bg-green-100 text-green-800"
      case "En Attente Signature":
        return "bg-yellow-100 text-yellow-800"
      case "Refusée":
        return "bg-red-100 text-red-800"
      case "Brouillon":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPropositions = propositions.filter((prop) => {
    const matchesSearch =
      prop.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.produit.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || prop.statut === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleAddProposition = () => {
    const proposition = {
      id: propositions.length + 1,
      numero: `PROP-2024-${String(propositions.length + 1).padStart(3, "0")}`,
      ...newProposition,
      montant: Number.parseFloat(newProposition.montant),
      statut: "Brouillon",
      dateCreation: new Date().toISOString().split("T")[0],
      dateExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      commission: Number.parseFloat(newProposition.montant) * 0.05,
    }
    setPropositions([...propositions, proposition])
    setNewProposition({
      contact: "",
      produit: "",
      montant: "",
      notes: "",
    })
    setIsAddDialogOpen(false)
  }

  const handlePropositionAction = (proposition: any, action: string) => {
    switch (action) {
      case "view":
        console.log(`Voir proposition ${proposition.numero}`)
        break
      case "edit":
        console.log(`Modifier proposition ${proposition.numero}`)
        break
      case "send":
        console.log(`Envoyer proposition ${proposition.numero}`)
        // Mettre à jour le statut
        setPropositions((props) =>
          props.map((p) => (p.id === proposition.id ? { ...p, statut: "En Attente Signature" } : p)),
        )
        break
      case "duplicate":
        const duplicated = {
          ...proposition,
          id: propositions.length + 1,
          numero: `PROP-2024-${String(propositions.length + 1).padStart(3, "0")}`,
          statut: "Brouillon",
          dateCreation: new Date().toISOString().split("T")[0],
        }
        setPropositions([...propositions, duplicated])
        break
    }
  }

  const totalMontant = filteredPropositions.reduce((sum, prop) => sum + prop.montant, 0)
  const totalCommission = filteredPropositions.reduce((sum, prop) => sum + prop.commission, 0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Propositions</h1>
            <p className="mt-2 text-gray-600">Gérez vos propositions commerciales</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Proposition
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle proposition</DialogTitle>
                <DialogDescription>Remplissez les informations de la proposition.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    value={newProposition.contact}
                    onChange={(e) => setNewProposition({ ...newProposition, contact: e.target.value })}
                    placeholder="Nom du contact"
                  />
                </div>
                <div>
                  <Label htmlFor="produit">Produit</Label>
                  <Select
                    value={newProposition.produit}
                    onValueChange={(value) => setNewProposition({ ...newProposition, produit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      {produits.map((produit) => (
                        <SelectItem key={produit} value={produit}>
                          {produit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="montant">Montant (€)</Label>
                  <Input
                    id="montant"
                    type="number"
                    value={newProposition.montant}
                    onChange={(e) => setNewProposition({ ...newProposition, montant: e.target.value })}
                    placeholder="25000"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newProposition.notes}
                    onChange={(e) => setNewProposition({ ...newProposition, notes: e.target.value })}
                    placeholder="Notes sur la proposition..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddProposition}>Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {filteredPropositions.filter((p) => p.statut === "En Attente Signature").length}
              </div>
              <p className="text-xs text-gray-600">En Attente</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {filteredPropositions.filter((p) => p.statut === "Acceptée Signée").length}
              </div>
              <p className="text-xs text-gray-600">Acceptées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">€{totalMontant.toLocaleString()}</div>
              <p className="text-xs text-gray-600">Valeur Totale</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">€{totalCommission.toLocaleString()}</div>
              <p className="text-xs text-gray-600">Commission Totale</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher une proposition..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Brouillon">Brouillon</SelectItem>
                  <SelectItem value="En Attente Signature">En Attente Signature</SelectItem>
                  <SelectItem value="Acceptée Signée">Acceptée Signée</SelectItem>
                  <SelectItem value="Refusée">Refusée</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des propositions */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Propositions ({filteredPropositions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Numéro</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Produit</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Montant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Commission</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Expiration</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPropositions.map((prop) => (
                    <tr key={prop.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium" style={{ color: "#003366" }}>
                        {prop.numero}
                      </td>
                      <td className="py-4 px-4">{prop.contact}</td>
                      <td className="py-4 px-4">{prop.produit}</td>
                      <td className="py-4 px-4 font-medium">€{prop.montant.toLocaleString()}</td>
                      <td className="py-4 px-4 text-green-600 font-medium">€{prop.commission.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(prop.statut)}>{prop.statut}</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{prop.dateExpiration}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handlePropositionAction(prop, "view")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handlePropositionAction(prop, "edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {prop.statut === "Brouillon" && (
                            <Button variant="ghost" size="sm" onClick={() => handlePropositionAction(prop, "send")}>
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handlePropositionAction(prop, "duplicate")}>
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
