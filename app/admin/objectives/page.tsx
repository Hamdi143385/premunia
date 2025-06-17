"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
import { Plus, Target, TrendingUp, Edit, Users, Euro, FileText } from "lucide-react"

const conseillers = [
  {
    id: 1,
    nom: "Jean Conseiller",
    email: "jean@premunia.fr",
    avatar: "JC",
    objectifs: {
      contacts: { objectif: 50, actuel: 42, pourcentage: 84 },
      propositions: { objectif: 15, actuel: 12, pourcentage: 80 },
      ca: { objectif: 25000, actuel: 18500, pourcentage: 74 },
      conversion: { objectif: 30, actuel: 24, pourcentage: 80 },
    },
    performance: 84,
    periode: "Janvier 2024",
  },
  {
    id: 2,
    nom: "Sophie Martin",
    email: "sophie@premunia.fr",
    avatar: "SM",
    objectifs: {
      contacts: { objectif: 40, actuel: 38, pourcentage: 95 },
      propositions: { objectif: 12, actuel: 14, pourcentage: 117 },
      ca: { objectif: 20000, actuel: 22000, pourcentage: 110 },
      conversion: { objectif: 35, actuel: 37, pourcentage: 106 },
    },
    performance: 107,
    periode: "Janvier 2024",
  },
  {
    id: 3,
    nom: "Pierre Commercial",
    email: "pierre@premunia.fr",
    avatar: "PC",
    objectifs: {
      contacts: { objectif: 60, actuel: 55, pourcentage: 92 },
      propositions: { objectif: 20, actuel: 18, pourcentage: 90 },
      ca: { objectif: 30000, actuel: 27500, pourcentage: 92 },
      conversion: { objectif: 28, actuel: 33, pourcentage: 118 },
    },
    performance: 98,
    periode: "Janvier 2024",
  },
]

export default function AdminObjectivesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedConseiller, setSelectedConseiller] = useState("")
  const [newObjectifs, setNewObjectifs] = useState({
    contacts: "",
    propositions: "",
    ca: "",
    conversion: "",
    periode: "",
  })

  const getPerformanceColor = (performance: number) => {
    if (performance >= 100) return "text-green-600"
    if (performance >= 80) return "text-premunia-orange"
    if (performance >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (pourcentage: number) => {
    if (pourcentage >= 100) return "bg-green-500"
    if (pourcentage >= 80) return "bg-premunia-orange"
    if (pourcentage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const handleCreateObjectifs = () => {
    console.log("Créer objectifs:", { conseiller: selectedConseiller, objectifs: newObjectifs })
    setIsCreateDialogOpen(false)
    setNewObjectifs({
      contacts: "",
      propositions: "",
      ca: "",
      conversion: "",
      periode: "",
    })
    setSelectedConseiller("")
  }

  const performanceMoyenne = Math.round(conseillers.reduce((sum, c) => sum + c.performance, 0) / conseillers.length)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold premunia-text-gradient">Gestion des Objectifs</h1>
            <p className="mt-2 text-gray-600">Définition et suivi des objectifs commerciaux par conseiller</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-premunia-gradient text-white hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Définir Objectifs
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Définir de nouveaux objectifs</DialogTitle>
                <DialogDescription>Configurez les objectifs mensuels pour un conseiller</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label>Conseiller</Label>
                  <Select value={selectedConseiller} onValueChange={setSelectedConseiller}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un conseiller" />
                    </SelectTrigger>
                    <SelectContent>
                      {conseillers.map((conseiller) => (
                        <SelectItem key={conseiller.id} value={conseiller.nom}>
                          {conseiller.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Période</Label>
                  <Input
                    value={newObjectifs.periode}
                    onChange={(e) => setNewObjectifs({ ...newObjectifs, periode: e.target.value })}
                    placeholder="Ex: Février 2024"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Objectif Contacts</Label>
                    <Input
                      type="number"
                      value={newObjectifs.contacts}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, contacts: e.target.value })}
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <Label>Objectif Propositions</Label>
                    <Input
                      type="number"
                      value={newObjectifs.propositions}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, propositions: e.target.value })}
                      placeholder="15"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Objectif CA (€)</Label>
                    <Input
                      type="number"
                      value={newObjectifs.ca}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, ca: e.target.value })}
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <Label>Taux Conversion (%)</Label>
                    <Input
                      type="number"
                      value={newObjectifs.conversion}
                      onChange={(e) => setNewObjectifs({ ...newObjectifs, conversion: e.target.value })}
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateObjectifs} className="bg-premunia-primary text-white">
                  Définir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card className="border-l-4 border-l-premunia-orange">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{conseillers.length}</div>
                  <p className="text-xs text-gray-600">Conseillers Actifs</p>
                </div>
                <Users className="h-8 w-8 text-premunia-orange" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-red">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${getPerformanceColor(performanceMoyenne)}`}>
                    {performanceMoyenne}%
                  </div>
                  <p className="text-xs text-gray-600">Performance Moyenne</p>
                </div>
                <Target className="h-8 w-8 text-premunia-red" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-pink">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{conseillers.filter((c) => c.performance >= 100).length}</div>
                  <p className="text-xs text-gray-600">Objectifs Dépassés</p>
                </div>
                <TrendingUp className="h-8 w-8 text-premunia-pink" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-purple">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    €{conseillers.reduce((sum, c) => sum + c.objectifs.ca.actuel, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">CA Réalisé</p>
                </div>
                <Euro className="h-8 w-8 text-premunia-purple" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suivi des objectifs par conseiller */}
        <div className="grid gap-6">
          {conseillers.map((conseiller) => (
            <Card key={conseiller.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: "var(--premunia-gradient)" }}
                    >
                      {conseiller.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{conseiller.nom}</CardTitle>
                      <p className="text-sm text-gray-600">{conseiller.email}</p>
                      <p className="text-xs text-gray-500">Période: {conseiller.periode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getPerformanceColor(conseiller.performance)}`}>
                      {conseiller.performance}%
                    </div>
                    <p className="text-sm text-gray-600">Performance Globale</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Contacts */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-premunia-orange" />
                        <span className="text-sm font-medium">Contacts</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {conseiller.objectifs.contacts.actuel}/{conseiller.objectifs.contacts.objectif}
                      </span>
                    </div>
                    <Progress value={conseiller.objectifs.contacts.pourcentage} className="h-2" />
                    <p className="text-xs text-gray-500">{conseiller.objectifs.contacts.pourcentage}% atteint</p>
                  </div>

                  {/* Propositions */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-premunia-red" />
                        <span className="text-sm font-medium">Propositions</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {conseiller.objectifs.propositions.actuel}/{conseiller.objectifs.propositions.objectif}
                      </span>
                    </div>
                    <Progress value={conseiller.objectifs.propositions.pourcentage} className="h-2" />
                    <p className="text-xs text-gray-500">{conseiller.objectifs.propositions.pourcentage}% atteint</p>
                  </div>

                  {/* CA */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Euro className="h-4 w-4 text-premunia-pink" />
                        <span className="text-sm font-medium">Chiffre d'Affaires</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        €{conseiller.objectifs.ca.actuel.toLocaleString()}/€
                        {conseiller.objectifs.ca.objectif.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={conseiller.objectifs.ca.pourcentage} className="h-2" />
                    <p className="text-xs text-gray-500">{conseiller.objectifs.ca.pourcentage}% atteint</p>
                  </div>

                  {/* Conversion */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-premunia-purple" />
                        <span className="text-sm font-medium">Taux Conversion</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {conseiller.objectifs.conversion.actuel}%/{conseiller.objectifs.conversion.objectif}%
                      </span>
                    </div>
                    <Progress value={conseiller.objectifs.conversion.pourcentage} className="h-2" />
                    <p className="text-xs text-gray-500">{conseiller.objectifs.conversion.pourcentage}% atteint</p>
                  </div>
                </div>

                {/* Résumé performance */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Résumé de Performance</p>
                      <p className="text-xs text-gray-600">
                        {conseiller.performance >= 100
                          ? "🎉 Objectifs dépassés ! Excellent travail !"
                          : conseiller.performance >= 80
                            ? "👍 Bonne performance, continuez ainsi !"
                            : "⚠️ Performance à améliorer"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getPerformanceColor(conseiller.performance)}`}>
                        {conseiller.performance}%
                      </div>
                      <p className="text-xs text-gray-600">Score global</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
