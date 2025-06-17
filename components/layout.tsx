"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  List,
  Settings2,
  FileText,
  ClipboardCheck,
  Workflow,
  Play,
  CheckSquare,
  Settings,
  Bell,
  Search,
  User,
  Send,
  Mail,
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

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Contacts", path: "/contacts", icon: Users },
  { name: "Listes", path: "/listes", icon: List },
  { name: "Segments", path: "/segments", icon: Settings2 },
  { name: "Propositions", path: "/propositions", icon: FileText },
  { name: "Contrats", path: "/contracts", icon: ClipboardCheck },
  { name: "Marketing Auto", path: "/marketing-automation", icon: Send },
  { name: "Campagnes Email", path: "/email-campaigns", icon: Mail },
  { name: "Workflows", path: "/workflows", icon: Workflow },
  { name: "Instances", path: "/workflow-instances", icon: Play },
  { name: "Tâches", path: "/tasks", icon: CheckSquare },
  { name: "Paramètres", path: "/settings", icon: Settings },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#003366" }}></div>
            <h1 className="text-xl font-bold" style={{ color: "#003366" }}>
              Premunia CRM
            </h1>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
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
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {navigationItems.find((item) => item.path === pathname)?.name || "Premunia CRM"}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Rechercher..." className="pl-10 w-64" />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#D4AF37" }}
                      >
                        <User className="h-4 w-4 text-white" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Jean Conseiller</p>
                        <p className="text-xs leading-none text-muted-foreground">jean@premunia.fr</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/settings">Paramètres</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Déconnexion</DropdownMenuItem>
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
