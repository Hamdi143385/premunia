"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn, Users, FileText, BarChart3 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login after a brief moment to show the landing page
    const timer = setTimeout(() => {
      router.push("/login")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/premunia-logo.png" alt="Premunia Logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenue sur Premunia CRM</h1>
          <p className="text-xl text-gray-600 mb-8">Votre solution complète de gestion pour courtiers en assurance</p>
          <Button onClick={handleLoginClick} size="lg" className="bg-[#003366] hover:bg-[#004080] text-white px-8 py-3">
            <LogIn className="h-5 w-5 mr-2" />
            Se connecter
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Users className="h-6 w-6 text-[#003366]" />
                <span>Gestion des Contacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Gérez vos prospects et clients en toute simplicité</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <FileText className="h-6 w-6 text-[#003366]" />
                <span>Contrats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Suivez vos contrats et commissions efficacement</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <BarChart3 className="h-6 w-6 text-[#003366]" />
                <span>Rapports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Analysez vos performances avec des rapports détaillés</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">Redirection automatique vers la page de connexion...</p>
        </div>
      </div>
    </div>
  )
}
