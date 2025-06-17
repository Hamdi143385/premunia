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
import { Plus, Calendar, User, Phone, Mail, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

const initialTasks = [
  {
    id: 1,
    titre: "Appeler Marie Dubois",
    description: "Suivi après envoi de proposition d'assurance vie",
    priorite: "Haute",
    statut: "À Faire",
    assigneA: "Jean Conseiller",
    dateEcheance: "2024-01-25",
    contact: "Marie Dubois",
    type: "Appel",
    dateCreation: "2024-01-20",
  },
  {
    id: 2,
    titre: "Préparer contrat Jean Martin",
    description: "Finaliser les documents pour signature du PER",
    priorite: "Moyenne",
    statut: "En Cours",
    assigneA: "Sophie Admin",
    dateEcheance: "2024-01-26",
    contact: "Jean Martin",
    type: "Administratif",
    dateCreation: "2024-01-18",
  },
  {
    id: 3,
    titre: "Relance Sophie Laurent",
    description: "Proposition expirée, relancer le client par email",
    priorite: "Basse",
    statut: "Terminé",
    assigneA: "Pierre Commercial",
    dateEcheance: "2024-01-20",
    contact: "Sophie Laurent",
    type: "Email",
    dateCreation: "2024-01-15",
  },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    titre: "",
    description: "",
    priorite: "Moyenne",
    assigneA: "Jean Conseiller",
    dateEcheance: "",
    contact: "",
    type: "Appel",
  })

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "Haute":
        return "bg-red-100 text-red-800"
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
      case "À Faire":
        return "bg-blue-100 text-blue-800"
      case "En Cours":
        return "bg-yellow-100 text-yellow-800"
      case "Terminé":
        return "bg-green-100 text-green-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Appel":
        return <Phone className="h-4 w-4 text-blue-500" />
      case "Email":
        return <Mail className="h-4 w-4 text-green-500" />
      case "Administratif":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "RDV":
        return <Calendar className="h-4 w-4 text-orange-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || task.statut === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priorite === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleAddTask = () => {
    const task = {
      id: tasks.length + 1,
      ...newTask,
      statut: "À Faire",
      dateCreation: new Date().toISOString().split("T")[0],
    }
    setTasks([...tasks, task])
    setNewTask({
      titre: "",
      description: "",
      priorite: "Moyenne",
      assigneA: "Jean Conseiller",
      dateEcheance: "",
      contact: "",
      type: "Appel",
    })
    setIsAddDialogOpen(false)
  }

  const handleTaskAction = (taskId: number, action: string) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          switch (action) {
            case "complete":
              return { ...task, statut: "Terminé" }
            case "start":
              return { ...task, statut: "En Cours" }
            case "cancel":
              return { ...task, statut: "Annulé" }
            case "postpone":
              const newDate = new Date(task.dateEcheance)
              newDate.setDate(newDate.getDate() + 1)
              return { ...task, dateEcheance: newDate.toISOString().split("T")[0] }
            default:
              return task
          }
        }
        return task
      }),
    )
  }

  const isTaskOverdue = (dateEcheance: string, statut: string) => {
    if (statut === "Terminé" || statut === "Annulé") return false
    const today = new Date()
    const dueDate = new Date(dateEcheance)
    return dueDate < today
  }

  const tasksOverdue = tasks.filter((task) => isTaskOverdue(task.dateEcheance, task.statut))

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tâches</h1>
            <p className="mt-2 text-gray-600">Gérez vos tâches et suivis ({filteredTasks.length} tâches)</p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white hover:opacity-90" style={{ backgroundColor: "#003366" }}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Tâche
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle tâche</DialogTitle>
                <DialogDescription>Remplissez les informations de la tâche.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="titre">Titre</Label>
                  <Input
                    id="titre"
                    value={newTask.titre}
                    onChange={(e) => setNewTask({ ...newTask, titre: e.target.value })}
                    placeholder="Titre de la tâche"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Description détaillée"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priorite">Priorité</Label>
                    <Select
                      value={newTask.priorite}
                      onValueChange={(value) => setNewTask({ ...newTask, priorite: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basse">Basse</SelectItem>
                        <SelectItem value="Moyenne">Moyenne</SelectItem>
                        <SelectItem value="Haute">Haute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appel">Appel</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="RDV">Rendez-vous</SelectItem>
                        <SelectItem value="Administratif">Administratif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    value={newTask.contact}
                    onChange={(e) => setNewTask({ ...newTask, contact: e.target.value })}
                    placeholder="Nom du contact"
                  />
                </div>
                <div>
                  <Label htmlFor="dateEcheance">Date d'échéance</Label>
                  <Input
                    id="dateEcheance"
                    type="date"
                    value={newTask.dateEcheance}
                    onChange={(e) => setNewTask({ ...newTask, dateEcheance: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="assigneA">Assigné à</Label>
                  <Select
                    value={newTask.assigneA}
                    onValueChange={(value) => setNewTask({ ...newTask, assigneA: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jean Conseiller">Jean Conseiller</SelectItem>
                      <SelectItem value="Sophie Admin">Sophie Admin</SelectItem>
                      <SelectItem value="Pierre Commercial">Pierre Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddTask}>Créer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alerte tâches en retard */}
        {tasksOverdue.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800 font-medium">
                  {tasksOverdue.length} tâche(s) en retard nécessite(nt) votre attention
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {filteredTasks.filter((t) => t.statut === "À Faire").length}
              </div>
              <p className="text-xs text-gray-600">À Faire</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredTasks.filter((t) => t.statut === "En Cours").length}
              </div>
              <p className="text-xs text-gray-600">En Cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {filteredTasks.filter((t) => t.statut === "Terminé").length}
              </div>
              <p className="text-xs text-gray-600">Terminées</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">{tasksOverdue.length}</div>
              <p className="text-xs text-gray-600">En Retard</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="À Faire">À Faire</SelectItem>
                  <SelectItem value="En Cours">En Cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                  <SelectItem value="Annulé">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="Haute">Haute</SelectItem>
                  <SelectItem value="Moyenne">Moyenne</SelectItem>
                  <SelectItem value="Basse">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des tâches */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Tâches ({filteredTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                    isTaskOverdue(task.dateEcheance, task.statut) ? "border-red-200 bg-red-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(task.type)}
                        <h3 className="font-medium text-gray-900">{task.titre}</h3>
                        <Badge className={getPriorityColor(task.priorite)}>{task.priorite}</Badge>
                        <Badge className={getStatusColor(task.statut)}>{task.statut}</Badge>
                        {isTaskOverdue(task.dateEcheance, task.statut) && (
                          <Badge className="bg-red-100 text-red-800">En Retard</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {task.assigneA}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {task.dateEcheance}
                        </div>
                        <div>Contact: {task.contact}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {task.statut === "À Faire" && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleTaskAction(task.id, "start")}>
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleTaskAction(task.id, "complete")}>
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {task.statut === "En Cours" && (
                        <Button variant="ghost" size="sm" onClick={() => handleTaskAction(task.id, "complete")}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleTaskAction(task.id, "postpone")}>
                        →
                      </Button>
                    </div>
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
