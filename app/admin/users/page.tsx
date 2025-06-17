"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
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
import { Plus, Search, Filter, Edit, Trash2, Users, Shield, Award, Activity } from "lucide-react"

const users = [
  {
    id: 1,
    nom: "Directeur Admin",
    email: "admin@premunia.fr",
    role: "admin",
    statut: "Actif",
    dernierConnexion: "Il y a 1h",
    dateCreation: "2024-01-01",
    permissions: ["Tous droits"],
    avatar: "DA",
  },
  {
    id: 2,
    nom: "Jean Conseiller",
    email: "jean@premunia.fr",
    role: "conseiller",
    statut: "Actif",
    dernierConnexion: "Il y a 2h",
    dateCreation: "2024-01-05",
    permissions: ["Contacts", "Propositions", "Contrats"],
    avatar: "JC",
    objectifs: { contacts: 50, propositions: 15, ca: 25000 },
    performance: 84,
  },
  {
    id: 3,
    nom: "Sophie Martin",
    email: "sophie@premunia.fr",
    role: "conseiller",
    statut: "Actif",
    dernierConnexion: "Il y a 1h",
    dateCreation: "2024-01-08",
    permissions: ["Contacts", "Propositions", "Contrats"],
    avatar: "SM",
    objectifs: { contacts: 40, propositions: 12, ca: 20000 },
    performance: 95,
  },
  {
    id: 4,
    nom: "Pierre Commercial",
    email: "pierre@premunia.fr",
    role: "conseiller",
    statut: "Inactif",
    dernierConnexion: "Il y a 2 jours",
    dateCreation: "2024-01-10",
    permissions: ["Contacts", "Propositions"],
    avatar: "PC",
    objectifs: { contacts: 60, propositions: 20, ca: 30000 },
    performance: 72,
  },
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.statut === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-premunia-purple" />
      case "conseiller":
        return <Award className="h-4 w-4 text-premunia-pink" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-premunia-purple text-white">Administrateur</Badge>
      case "conseiller":
        return <Badge className="bg-premunia-pink text-white">Conseiller</Badge>
      default:
        return <Badge variant="secondary">Utilisateur</Badge>
    }
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Actif":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "Inactif":
        return <Badge className="bg-red-100 text-red-800">Inactif</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold premunia-text-gradient">Gestion des Utilisateurs</h1>
            <p className="mt-2 text-gray-600">Administration des comptes et permissions</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-premunia-gradient text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Nouvel Utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                <DialogDescription>Créez un nouveau compte utilisateur avec ses permissions.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="nom">Nom complet</Label>
                  <Input id="nom" placeholder="Jean Dupont" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jean.dupont@premunia.fr" />
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="conseiller">Conseiller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe temporaire</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Annuler</Button>
                <Button className="bg-premunia-primary text-white">Créer</Button>
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
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-gray-600">Utilisateurs Totaux</p>
                </div>
                <Users className="h-8 w-8 text-premunia-orange" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-red">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{users.filter((u) => u.statut === "Actif").length}</div>
                  <p className="text-xs text-gray-600">Actifs</p>
                </div>
                <Activity className="h-8 w-8 text-premunia-red" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-pink">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{users.filter((u) => u.role === "admin").length}</div>
                  <p className="text-xs text-gray-600">Administrateurs</p>
                </div>
                <Shield className="h-8 w-8 text-premunia-pink" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-purple">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{users.filter((u) => u.role === "conseiller").length}</div>
                  <p className="text-xs text-gray-600">Conseillers</p>
                </div>
                <Award className="h-8 w-8 text-premunia-purple" />
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
                    placeholder="Rechercher un utilisateur..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="conseiller">Conseiller</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Actif">Actif</SelectItem>
                  <SelectItem value="Inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des utilisateurs */}
        <div className="grid gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{
                        background:
                          user.role === "admin"
                            ? "var(--premunia-purple)"
                            : "linear-gradient(135deg, #E91E63, #9C27B0)",
                      }}
                    >
                      {user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{user.nom}</h3>
                        {getRoleIcon(user.role)}
                      </div>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">Créé le {user.dateCreation}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.statut)}
                    {user.performance && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-premunia-primary">{user.performance}%</div>
                        <div className="text-xs text-gray-600">Performance</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Permissions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {user.objectifs && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Objectifs Mensuels</p>
                      <div className="text-sm text-gray-700 mt-1">
                        <div>Contacts: {user.objectifs.contacts}</div>
                        <div>Propositions: {user.objectifs.propositions}</div>
                        <div>CA: €{user.objectifs.ca.toLocaleString()}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-500">Dernière Activité</p>
                    <p className="text-sm text-gray-700 mt-1">{user.dernierConnexion}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  {user.role !== "admin" && (
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
