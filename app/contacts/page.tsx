"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Users, Euro, MapPin, Download } from "lucide-react"
import { Layout } from "@/components/layout"
import { ErrorBoundary } from "@/components/error-boundary"
import { ExcelUpload } from "@/components/excel-upload"

interface Contact {
  id: string
  contact: string
  ville: string
  creation: string
  signature: string
  origine: string
  statut: string
  attribution: string
  cpl: number
  pays: string
}

const sampleContacts: Contact[] = [
  {
    id: "1",
    contact: "barty Laurent",
    ville: "Marigot",
    creation: "02/01/2025",
    signature: "",
    origine: "fb_sync",
    statut: "A Relancer",
    attribution: "SNOUSSI ZOUHAIR",
    cpl: 2.19,
    pays: "France Métropolitaine",
  },
  {
    id: "2",
    contact: "meinart",
    ville: "Saint-Laurent-du-Maroni",
    creation: "02/01/2025",
    signature: "",
    origine: "fb_sync",
    statut: "A Relancer",
    attribution: "SNOUSSI ZOUHAIR",
    cpl: 2.19,
    pays: "Guyane",
  },
  {
    id: "3",
    contact: "Riviere Jean Hugues",
    ville: "Saint-Pierre",
    creation: "02/01/2025",
    signature: "",
    origine: "fb_sync",
    statut: "Devis envoyé",
    attribution: "Radhia MAATOUG",
    cpl: 2.19,
    pays: "La Réunion",
  },
  {
    id: "4",
    contact: "Satge Jocelyn",
    ville: "Capesterre-Belle-Eau",
    creation: "02/01/2025",
    signature: "",
    origine: "fb_sync",
    statut: "Inexploitable",
    attribution: "DAHMANI Mouna",
    cpl: 2.19,
    pays: "Guadeloupe",
  },
]

function ContactsContent() {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [attributionFilter, setAttributionFilter] = useState<string>("all")

  const handleExcelUpload = (newContacts: any[]) => {
    const formattedContacts = newContacts.map((contact, index) => ({
      id: (contacts.length + index + 1).toString(),
      contact: contact.Contact || "",
      ville: contact.Ville || "",
      creation: contact.Création || new Date().toLocaleDateString("fr-FR"),
      signature: contact.Signature || "",
      origine: contact.Origine || "excel_import",
      statut: contact.Statut || "Nouveau Prospect",
      attribution: contact.Attribution || "",
      cpl:
        typeof contact.Cpl === "string"
          ? Number.parseFloat(contact.Cpl.replace("€", "").replace(",", "."))
          : contact.Cpl || 2.19,
      pays: contact.Pays || "",
    }))

    setContacts([...contacts, ...formattedContacts])
  }

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.pays.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || contact.statut === statusFilter
      const matchesAttribution = attributionFilter === "all" || contact.attribution === attributionFilter

      return matchesSearch && matchesStatus && matchesAttribution
    })
  }, [contacts, searchTerm, statusFilter, attributionFilter])

  const totalCpl = filteredContacts.reduce((sum, contact) => sum + contact.cpl, 0)

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Devis envoyé":
        return "bg-blue-100 text-blue-800"
      case "A Relancer":
        return "bg-yellow-100 text-yellow-800"
      case "Inexploitable":
        return "bg-red-100 text-red-800"
      case "Signé":
        return "bg-green-100 text-green-800"
      case "Nouveau Prospect":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const statusCounts = contacts.reduce(
    (acc, contact) => {
      acc[contact.statut] = (acc[contact.statut] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600">Gestion de vos prospects et clients</p>
          </div>
          <div className="flex space-x-2">
            <ExcelUpload type="contacts" onUploadComplete={handleExcelUpload} />
            <Button className="bg-[#003366] hover:bg-[#004080]">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau contact
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredContacts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devis envoyés</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts["Devis envoyé"] || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">À relancer</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts["A Relancer"] || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPL Total</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCpl.toFixed(2)}€</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom, ville ou pays..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="A Relancer">A Relancer</SelectItem>
                  <SelectItem value="Devis envoyé">Devis envoyé</SelectItem>
                  <SelectItem value="Inexploitable">Inexploitable</SelectItem>
                  <SelectItem value="Signé">Signé</SelectItem>
                  <SelectItem value="Nouveau Prospect">Nouveau Prospect</SelectItem>
                </SelectContent>
              </Select>

              <Select value={attributionFilter} onValueChange={setAttributionFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Attribution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les attributions</SelectItem>
                  <SelectItem value="SNOUSSI ZOUHAIR">SNOUSSI ZOUHAIR</SelectItem>
                  <SelectItem value="Radhia MAATOUG">Radhia MAATOUG</SelectItem>
                  <SelectItem value="DAHMANI Mouna">DAHMANI Mouna</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des contacts ({filteredContacts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>Création</TableHead>
                    <TableHead>Origine</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Attribution</TableHead>
                    <TableHead>CPL</TableHead>
                    <TableHead>Pays</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.contact}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {contact.ville}
                        </div>
                      </TableCell>
                      <TableCell>{contact.creation}</TableCell>
                      <TableCell>{contact.origine}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(contact.statut)}>{contact.statut}</Badge>
                      </TableCell>
                      <TableCell>{contact.attribution}</TableCell>
                      <TableCell>{contact.cpl.toFixed(2)}€</TableCell>
                      <TableCell>{contact.pays}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default function ContactsPage() {
  return (
    <ErrorBoundary>
      <ContactsContent />
    </ErrorBoundary>
  )
}
