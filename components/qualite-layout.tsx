"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  Home,
  CheckSquare,
  FileText,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  Bell,
  Search,
  User,
  Shield,
  LogOut,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const qualiteNavigationItems = [
  { name: "Dashboard", path: "/qualite/dashboard", icon: Home },
  { name: "Validation Contrats", path: "/qualite/validation", icon: CheckSquare },
  { name: "Contrôle Qualité", path: "/qualite/controle", icon: Shield },
  { name: "Audits", path: "/qualite/audits", icon: ClipboardList },
  { name: "Non-conformités", path: "/qualite/non-conformites", icon: AlertTriangle },
  { name: "Rapports Qualité", path: "/qualite/rapports", icon: TrendingUp },
  { name: "Processus", path: "/qualite/processus", icon: FileText },
]

export function QualiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      if (parsedUser.role !== "qualite") {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) {
    return <div>Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Qualité */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#003366" }}>
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold" style={{ color: "#003366" }}>
                Contrôle Qualité
              </h1>
              <p className="text-xs text-gray-600">Validation & Audit</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-1">
            {qualiteNavigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive ? "text-white shadow-md" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    style={isActive ? { backgroundColor: "#003366" } : {}}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Qualité Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-xs font-medium text-emerald-900">Contrôle Qualité</p>
                <p className="text-xs text-emerald-700">Validation active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header Qualité */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {qualiteNavigationItems.find((item) => item.path === pathname)?.name || "Contrôle Qualité"}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Rechercher..." className="pl-10 w-64" />
                </div>

                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#10B981" }}
                      >
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.nom}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Shield className="h-3 w-3 text-emerald-600" />
                          <span className="text-xs text-emerald-600 font-medium">Qualité</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
