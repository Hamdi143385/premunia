"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Award, Headphones, CheckSquare, Crown } from "lucide-react"

const users = [
  {
    id: 1,
    nom: "Directeur Admin",
    email: "admin@premunia.fr",
    password: "admin123",
    role: "admin",
    icon: Crown,
    color: "#D4AF37",
  },
  {
    id: 2,
    nom: "Jean Conseiller",
    email: "jean@premunia.fr",
    password: "conseiller123",
    role: "conseiller",
    icon: Award,
    color: "#10B981",
  },
  {
    id: 3,
    nom: "Sophie Gestionnaire",
    email: "sophie@premunia.fr",
    password: "gestionnaire123",
    role: "gestionnaire",
    icon: Headphones,
    color: "#9C27B0",
  },
  {
    id: 4,
    nom: "Pierre Qualité",
    email: "pierre@premunia.fr",
    password: "qualite123",
    role: "qualite",
    icon: CheckSquare,
    color: "#10B981",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulation d'authentification
    setTimeout(() => {
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        localStorage.setItem("user", JSON.stringify(user))

        // Redirection basée sur le rôle
        switch (user.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "conseiller":
            router.push("/conseiller/dashboard")
            break
          case "gestionnaire":
            router.push("/gestionnaire/dashboard")
            break
          case "qualite":
            router.push("/qualite/dashboard")
            break
          default:
            router.push("/dashboard")
        }
      } else {
        setError("Email ou mot de passe incorrect")
      }
      setLoading(false)
    }, 1000)
  }

  const handleQuickLogin = (user: any) => {
    setEmail(user.email)
    setPassword(user.password)
    setSelectedRole(user.role)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#003366] rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Premunia CRM</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre espace</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>Accédez à votre espace de travail</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#003366] hover:bg-[#004080]" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Connexion rapide pour démo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Connexion rapide (Démo)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {users.map((user) => {
                const Icon = user.icon
                return (
                  <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin(user)}
                    className="flex items-center justify-start p-2 h-auto"
                  >
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center mr-2"
                      style={{ backgroundColor: user.color }}
                    >
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-medium">{user.nom}</div>
                      <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
