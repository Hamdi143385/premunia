import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

type Contrat = Database["public"]["Tables"]["contrats"]["Row"]
type ContratInsert = Database["public"]["Tables"]["contrats"]["Insert"]
type ContratUpdate = Database["public"]["Tables"]["contrats"]["Update"]

export class ContratsService {
  // Récupérer tous les contrats
  static async getAll() {
    const { data, error } = await supabase.from("contrats").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Récupérer les contrats par conseiller
  static async getByConseiller(conseiller: string) {
    const { data, error } = await supabase
      .from("contrats")
      .select("*")
      .eq("attribution", conseiller)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Récupérer les contrats en attente de validation
  static async getEnAttenteValidation() {
    const { data, error } = await supabase
      .from("contrats")
      .select("*")
      .eq("statut_validation", "En attente validation")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  // Créer un nouveau contrat
  static async create(contrat: ContratInsert) {
    const { data, error } = await supabase.from("contrats").insert(contrat).select().single()

    if (error) throw error
    return data
  }

  // Mettre à jour un contrat
  static async update(id: string, updates: ContratUpdate) {
    const { data, error } = await supabase.from("contrats").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Valider un contrat
  static async valider(id: string, validePar: string, commentaires?: string) {
    const { data, error } = await supabase
      .from("contrats")
      .update({
        statut_validation: "Validé",
        valide_par: validePar,
        date_validation: new Date().toISOString(),
        commentaires_validation: commentaires,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Rejeter un contrat
  static async rejeter(id: string, validePar: string, commentaires: string) {
    const { data, error } = await supabase
      .from("contrats")
      .update({
        statut_validation: "Rejeté",
        valide_par: validePar,
        date_validation: new Date().toISOString(),
        commentaires_validation: commentaires,
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Importer des contrats depuis Excel
  static async importFromExcel(contrats: ContratInsert[]) {
    const { data, error } = await supabase.from("contrats").insert(contrats).select()

    if (error) throw error
    return data
  }
}
