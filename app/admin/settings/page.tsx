"use client"

import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Settings, Shield, Database, Mail, Bell } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold premunia-text-gradient">Paramètres Administrateur</h1>
          <p className="mt-2 text-gray-600">Configuration globale de la plateforme</p>
        </div>

        <div className="grid gap-6">
          {/* Configuration Générale */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-premunia-primary" />
                Configuration Générale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input id="company-name" defaultValue="Premunia" />
                </div>
                <div>
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Input id="timezone" defaultValue="Europe/Paris" />
                </div>
              </div>
              <div>
                <Label htmlFor="currency">Devise par défaut</Label>
                <Input id="currency" defaultValue="EUR" className="w-32" />
              </div>
              <Button className="bg-premunia-primary text-white">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-premunia-secondary" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Authentification à deux facteurs</Label>
                  <p className="text-sm text-gray-600">Activer 2FA pour tous les utilisateurs</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Expiration des sessions</Label>
                  <p className="text-sm text-gray-600">Déconnexion automatique après inactivité</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="session-timeout">Durée d'inactivité (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" className="w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Configuration Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-premunia-accent" />
                Configuration Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-server">Serveur SMTP</Label>
                  <Input id="smtp-server" placeholder="smtp.premunia.fr" />
                </div>
                <div>
                  <Label htmlFor="smtp-port">Port SMTP</Label>
                  <Input id="smtp-port" type="number" defaultValue="587" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-user">Utilisateur SMTP</Label>
                  <Input id="smtp-user" placeholder="noreply@premunia.fr" />
                </div>
                <div>
                  <Label htmlFor="smtp-password">Mot de passe SMTP</Label>
                  <Input id="smtp-password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SSL/TLS</Label>
                  <p className="text-sm text-gray-600">Utiliser une connexion sécurisée</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-premunia-orange" />
                Notifications Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications Admin</Label>
                  <p className="text-sm text-gray-600">Recevoir les alertes système</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rapports automatiques</Label>
                  <p className="text-sm text-gray-600">Envoi hebdomadaire des rapports</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alertes de performance</Label>
                  <p className="text-sm text-gray-600">Notifications si objectifs non atteints</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Base de données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-premunia-purple" />
                Base de Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <p className="text-sm text-gray-600">Disponibilité</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.8GB</div>
                  <p className="text-sm text-gray-600">Taille DB</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">15ms</div>
                  <p className="text-sm text-gray-600">Latence moy.</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">Sauvegarder DB</Button>
                <Button variant="outline">Optimiser</Button>
                <Button variant="outline">Maintenance</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
