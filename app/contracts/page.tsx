"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, FileText, Euro } from "lucide-react"
import { Layout } from "@/components/layout"
import { ErrorBoundary } from "@/components/error-boundary"

// Type definitions based on your actual data structure
interface Contract {
  id: string
  nomPrenom: string
  ville: string
  signature: string
  dateEffet: string
  finContrat: string
  numeroContrat: string
  compagnie: string
  cotisationMensuelle: number
  cotisationAnnuelle: number
  commissionMensuelle: number
  commissionAnnuelle: number
  commissionAnnuelle1ereAnnee: number
  anneeRecurrente: number
  anneeRecu: number
  statut: string
  attribution: string
  pays: string
  charge: number
  depenses: number
}

// Sample data based on your provided table
const sampleContracts: Contract[] = [
  {
    id: "1",
    nomPrenom: "Ali chahout abraham guillaume",
    ville: "Carbet",
    signature: "05/05/2025",
    dateEffet: "01/07/2025",
    finContrat: "",
    numeroContrat: "",
    compagnie: "ZENIOO",
    cotisationMensuelle: 142.95,
    cotisationAnnuelle: 1715.4,
    commissionMensuelle: 42.885,
    commissionAnnuelle: 514.62,
    commissionAnnuelle1ereAnnee: 450.29,
    anneeRecurrente: 171.54,
    anneeRecu: 150.1,
    statut: "Précompte",
    attribution: "SNOUSSI ZOUHAIR",
    pays: "France Métropolitaine",
    charge: 108.33,
    depenses: 49.08,
  },
  {
    id: "2",
    nomPrenom: "Albora Guibert",
    ville: "Saint-Pierre",
    signature: "06/05/2025",
    dateEffet: "15/05/2025",
    finContrat: "",
    numeroContrat: "ZEN00018099",
    compagnie: "ZENIOO",
    cotisationMensuelle: 61.01,
    cotisationAnnuelle: 732.12,
    commissionMensuelle: 18.303,
    commissionAnnuelle: 219.636,
    commissionAnnuelle1ereAnnee: 192.18,
    anneeRecurrente: 73.21,
    anneeRecu: 64.06,
    statut: "Précompte",
    attribution: "DAHMANI Mouna",
    pays: "La Réunion",
    charge: 220.0,
    depenses: 67.64,
  },
  {
    id: "3",
    nomPrenom: "HUBERT Jean Bernard",
    ville: "Trappes",
    signature: "06/05/2025",
    dateEffet: "01/07/2025",
    finContrat: "",
    numeroContrat: "5863628",
    compagnie: "NÉOLIANE",
    cotisationMensuelle: 33.12,
    cotisationAnnuelle: 397.44,
    commissionMensuelle: 14.2416,
    commissionAnnuelle: 170.8992,
    commissionAnnuelle1ereAnnee: 149.54,
    anneeRecurrente: 39.74,
    anneeRecu: 34.78,
    statut: "Précompte",
    attribution: "Gestion PREMUNIA",
    pays: "France Métropolitaine",
    charge: 120.0,
    depenses: 44.91,
  },
  {
    id: "4",
    nomPrenom: "Lesage Alain Noel Gabriel",
    ville: "Baie-Mahault",
    signature: "06/05/2025",
    dateEffet: "01/07/2025",
    finContrat: "",
    numeroContrat: "ZEN00018114",
    compagnie: "ZENIOO",
    cotisationMensuelle: 107.05,
    cotisationAnnuelle: 1284.6,
    commissionMensuelle: 32.115,
    commissionAnnuelle: 385.38,
    commissionAnnuelle1ereAnnee: 337.21,
    anneeRecurrente: 128.46,
    anneeRecu: 112.4,
    statut: "Précompte",
    attribution: "SNOUSSI ZOUHAIR",
    pays: "Guadeloupe",
    charge: 108.33,
    depenses: 49.08,
  },
]

function ContractsContent() {
  const [contracts] = useState<Contract[]>(sampleContracts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [companyFilter, setCompanyFilter] = useState<string>("all")

  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesSearch =
        contract.nomPrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.numeroContrat.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || contract.statut === statusFilter
      const matchesCompany = companyFilter === "all" || contract.compagnie === companyFilter

      return matchesSearch && matchesStatus && matchesCompany
    })
  }, [contracts, searchTerm, statusFilter, companyFilter])

  const totalCommissionAnnuelle = filteredContracts.reduce((sum, contract) => sum + contract.commissionAnnuelle, 0)
  const totalCotisationAnnuelle = filteredContracts.reduce((sum, contract) => sum + contract.cotisationAnnuelle, 0)

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Précompte":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contrats</h1>
            <p className="text-gray-600">Gestion de vos contrats d'assurance</p>
          </div>
          <Button className="bg-[#003366] hover:bg-[#004080]">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau contrat
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contrats</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredContracts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Totale</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCommissionAnnuelle.toFixed(2)}€</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cotisation Totale</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCotisationAnnuelle.toFixed(2)}€</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux Commission</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCotisationAnnuelle > 0
                  ? ((totalCommissionAnnuelle / totalCotisationAnnuelle) * 100).toFixed(1)
                  : 0}
                %
              </div>
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
                    placeholder="Rechercher par nom, ville ou numéro de contrat..."
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
                  <SelectItem value="Précompte">Précompte</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Annulé">Annulé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Compagnie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les compagnies</SelectItem>
                  <SelectItem value="ZENIOO">ZENIOO</SelectItem>
                  <SelectItem value="NÉOLIANE">NÉOLIANE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contracts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des contrats ({filteredContracts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom et Prénom</TableHead>
                    <TableHead>Ville</TableHead>
                    <TableHead>N° Contrat</TableHead>
                    <TableHead>Compagnie</TableHead>
                    <TableHead>Date d'effet</TableHead>
                    <TableHead>Cotisation Annuelle</TableHead>
                    <TableHead>Commission Annuelle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Attribution</TableHead>
                    <TableHead>Pays</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.nomPrenom}</TableCell>
                      <TableCell>{contract.ville}</TableCell>
                      <TableCell>{contract.numeroContrat || "N/A"}</TableCell>
                      <TableCell>{contract.compagnie}</TableCell>
                      <TableCell>{contract.dateEffet}</TableCell>
                      <TableCell>{contract.cotisationAnnuelle.toFixed(2)}€</TableCell>
                      <TableCell>{contract.commissionAnnuelle.toFixed(2)}€</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(contract.statut)}>{contract.statut}</Badge>
                      </TableCell>
                      <TableCell>{contract.attribution}</TableCell>
                      <TableCell>{contract.pays}</TableCell>
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

export default function ContractsPage() {
  return (
    <ErrorBoundary>
      <ContractsContent />
    </ErrorBoundary>
  )
}
