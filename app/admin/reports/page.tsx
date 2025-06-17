"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Download, Users, Euro, Target, Activity } from "lucide-react"

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold premunia-text-gradient">Rapports & Analytics</h1>
            <p className="mt-2 text-gray-600">Analyses détaillées et rapports de performance</p>
          </div>

          <div className="flex space-x-2">
            <Select defaultValue="30j">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7j">7 jours</SelectItem>
                <SelectItem value="30j">30 jours</SelectItem>
                <SelectItem value="90j">90 jours</SelectItem>
                <SelectItem value="1an">1 an</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <Card className="border-l-4 border-l-premunia-orange">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">€156,780</div>
                  <p className="text-xs text-gray-600">Chiffre d'Affaires</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+22%</span>
                  </div>
                </div>
                <Euro className="h-8 w-8 text-premunia-orange" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-red">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-gray-600">Contacts Totaux</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+18%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-premunia-red" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-pink">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-gray-600">Propositions</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+5%</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-premunia-pink" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-premunia-purple">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">68.5%</div>
                  <p className="text-xs text-gray-600">Taux Conversion</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+5.2%</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-premunia-purple" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder pour les graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-premunia-primary" />
                Évolution du CA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <p className="text-gray-500">Graphique CA - À implémenter</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-premunia-secondary" />
                Performance par Conseiller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <p className="text-gray-500">Graphique Performance - À implémenter</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rapports Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm">Rapport CA</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Rapport Contacts</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Target className="h-6 w-6" />
                <span className="text-sm">Rapport Performance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
