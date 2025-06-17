"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Download, Phone, Mail, Edit, Trash2, Users, Target } from "lucide-react"

const contacts = [
  {
    id: 1,
    nom: "Dubois",
    prenom: "Marie",
    email: "marie.dubois@email.com",
    telephone: "01 23 45 67 89",
    statut: "Prospect Chaud",
    source: "Site Web",
    score: 85,
    tags: ["Intérêt Santé", "Paris"],
    dateCreation: "2024-01-15",
    dernierContact: "2024-01-20",
    conseiller: "Jean Conseiller",
    valeurPotentielle: 25000,
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Jean",
    email: "jean.martin@email.com",
    telephone: "01 98 76 54 32",
    statut: "Qualifié RDV Pris",
    source: "Référence",
    score: 92,
    tags: ["Client Potentiel", "Lyon"],
    dateCreation: "2024-01-10",
    dernierContact: "2024-01-18",
    conseiller: "Sophie Martin",
    valeurPotentielle: 45000,
  },
  {
    id: 3,
    nom: "Laurent",
    prenom: "Sophie",
    email: "sophie.laurent@email.com",
    telephone: "01 11 22 33 44",
    statut: "Contact Tentative 1",
    source: "Publicité Facebook",
    score: 67,
    tags: ["Retraite", "Marseille"],
    dateCreation: "2024-01-05",
    dernierContact: "2024-01-12",
    conseiller: "Pierre Commercial",
    valeurPotentielle: 18000,
  },
]

export default function AdminContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [conseillerFilter, setConseillerFilter] = useState("all")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || contact.statut === statusFilter
    const matchesConseiller = conseillerFilter === "all" || contact.conseiller === conseillerFilter

    return matchesSearch && matchesStatus && matchesConseiller
  })

  const totalContacts = contacts.length
  const totalValeur = contacts.reduce((sum, contact) => sum + contact.valeurPotentielle, 0)
  const scoresMoyen = Math.round(contacts.reduce((sum, contact) => sum + contact.score, 0) / contacts.length)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold premunia-text-gradient">Gestion des Contacts</h1>
            <p className="mt-2 text-gray-600">Vue d'ensemble de tous les contacts de la plateforme</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-premunia-gradient text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau contact</DialogTitle>
                <DialogDescription>Remplissez les informations du nouveau contact.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input id="telephone" />
                </div>
                <div>
                  <Label htmlFor="conseiller">Conseiller assigné</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un conseiller" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jean">Jean Conseiller</SelectItem>
                      <SelectItem value="sophie">Sophie Martin</SelectItem>
                      <SelectItem value="pierre">Pierre Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Annuler</Button>
                <Button className="bg-premunia-primary text-white">Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card className="border-l-4 border-l-premunia-orange">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalContacts}</div>
                  <p className="text-xs text-gray-600">Contacts Totaux</p>
                </div>
                <Users className="h-8 w-8 text-premunia-orange" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-red">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {contacts.filter((c) => c.statut.includes("Qualifié")).length}
                  </div>
                  <p className="text-xs text-gray-600">Qualifiés</p>
                </div>
                <Target className="h-8 w-8 text-premunia-red" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-pink">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{scoresMoyen}</div>
                  <p className="text-xs text-gray-600">Score Moyen</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-premunia-pink flex items-center justify-center text-white font-bold">
                  {scoresMoyen}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-purple">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">€{totalValeur.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Valeur Potentielle</p>
                </div>
                <div className="text-premunia-purple">€</div>
              </div>
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
                    placeholder="Rechercher un contact..."
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
                  <SelectItem value="Nouveau Prospect">Nouveau Prospect</SelectItem>
                  <SelectItem value="Prospect Chaud">Prospect Chaud</SelectItem>
                  <SelectItem value="Qualifié RDV Pris">Qualifié RDV Pris</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                </SelectContent>
              </Select>
              <Select value={conseillerFilter} onValueChange={setConseillerFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par conseiller" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les conseillers</SelectItem>
                  <SelectItem value="Jean Conseiller">Jean Conseiller</SelectItem>
                  <SelectItem value="Sophie Martin">Sophie Martin</SelectItem>
                  <SelectItem value="Pierre Commercial">Pierre Commercial</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liste des contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Contacts ({filteredContacts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Téléphone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Conseiller</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Score</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Valeur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {contact.prenom} {contact.nom}
                          </div>
                          <div className="text-sm text-gray-500">Source: {contact.source}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{contact.email}</td>
                      <td className="py-4 px-4 text-gray-600">{contact.telephone}</td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">{contact.statut}</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{contact.conseiller}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="h-2 rounded-full bg-premunia-gradient"
                              style={{ width: `${contact.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{contact.score}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-premunia-primary">
                        €{contact.valeurPotentielle.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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
    </AdminLayout>
  )
}
