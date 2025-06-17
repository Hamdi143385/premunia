import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

type Ticket = Database["public"]["Tables"]["tickets"]["Row"]
type TicketInsert = Database["public"]["Tables"]["tickets"]["Insert"]
type TicketUpdate = Database["public"]["Tables"]["tickets"]["Update"]

export class TicketsService {
  // Récupérer tous les tickets
  static async getAll() {
    const { data, error } = await supabase.from("tickets").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Récupérer les tickets par statut
  static async getByStatut(statut: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("statut", statut)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Récupérer les tickets assignés à un gestionnaire
  static async getByGestionnaire(gestionnaireId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("assigne_a", gestionnaireId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Créer un nouveau ticket
  static async create(ticket: TicketInsert) {
    const { data, error } = await supabase.from("tickets").insert(ticket).select().single()

    if (error) throw error
    return data
  }

  // Mettre à jour un ticket
  static async update(id: string, updates: TicketUpdate) {
    const { data, error } = await supabase.from("tickets").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Générer un numéro de ticket unique
  static async generateTicketNumber(): Promise<string> {
    const { count } = await supabase.from("tickets").select("*", { count: "exact", head: true })

    const ticketNumber = `TK-${new Date().getFullYear()}-${String((count || 0) + 1).padStart(3, "0")}`
    return ticketNumber
  }
}
