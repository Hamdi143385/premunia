import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          nom: string
          email: string
          password_hash: string
          role: "admin" | "conseiller" | "gestionnaire" | "qualite"
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          nom: string
          email: string
          password_hash: string
          role: "admin" | "conseiller" | "gestionnaire" | "qualite"
          avatar?: string | null
        }
        Update: {
          nom?: string
          email?: string
          password_hash?: string
          role?: "admin" | "conseiller" | "gestionnaire" | "qualite"
          avatar?: string | null
        }
      }
      contrats: {
        Row: {
          id: string
          numero_contrat: string | null
          nom_prenom: string
          ville: string | null
          date_signature: string | null
          date_effet: string | null
          fin_contrat: string | null
          compagnie: string | null
          cotisation_mensuelle: number | null
          cotisation_annuelle: number | null
          commission_mensuelle: number | null
          commission_annuelle: number | null
          commission_annuelle_1ere_annee: number | null
          annee_recurrente: number | null
          annee_recu: number | null
          statut: string | null
          attribution: string | null
          pays: string | null
          charge: number | null
          depenses: number | null
          statut_validation: string | null
          valide_par: string | null
          date_validation: string | null
          commentaires_validation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          numero_contrat?: string | null
          nom_prenom: string
          ville?: string | null
          date_signature?: string | null
          date_effet?: string | null
          fin_contrat?: string | null
          compagnie?: string | null
          cotisation_mensuelle?: number | null
          cotisation_annuelle?: number | null
          commission_mensuelle?: number | null
          commission_annuelle?: number | null
          commission_annuelle_1ere_annee?: number | null
          annee_recurrente?: number | null
          annee_recu?: number | null
          statut?: string | null
          attribution?: string | null
          pays?: string | null
          charge?: number | null
          depenses?: number | null
          statut_validation?: string | null
          valide_par?: string | null
          date_validation?: string | null
          commentaires_validation?: string | null
        }
        Update: {
          numero_contrat?: string | null
          nom_prenom?: string
          ville?: string | null
          date_signature?: string | null
          date_effet?: string | null
          fin_contrat?: string | null
          compagnie?: string | null
          cotisation_mensuelle?: number | null
          cotisation_annuelle?: number | null
          commission_mensuelle?: number | null
          commission_annuelle?: number | null
          commission_annuelle_1ere_annee?: number | null
          annee_recurrente?: number | null
          annee_recu?: number | null
          statut?: string | null
          attribution?: string | null
          pays?: string | null
          charge?: number | null
          depenses?: number | null
          statut_validation?: string | null
          valide_par?: string | null
          date_validation?: string | null
          commentaires_validation?: string | null
        }
      }
      tickets: {
        Row: {
          id: string
          numero_ticket: string
          client: string
          email: string | null
          telephone: string | null
          sujet: string
          description: string | null
          priorite: "Basse" | "Moyenne" | "Haute" | "Urgente" | null
          statut: "Nouveau" | "En cours" | "En attente" | "Résolu" | "Fermé" | null
          categorie: string | null
          numero_contrat: string | null
          assigne_a: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          numero_ticket: string
          client: string
          email?: string | null
          telephone?: string | null
          sujet: string
          description?: string | null
          priorite?: "Basse" | "Moyenne" | "Haute" | "Urgente" | null
          statut?: "Nouveau" | "En cours" | "En attente" | "Résolu" | "Fermé" | null
          categorie?: string | null
          numero_contrat?: string | null
          assigne_a?: string | null
        }
        Update: {
          numero_ticket?: string
          client?: string
          email?: string | null
          telephone?: string | null
          sujet?: string
          description?: string | null
          priorite?: "Basse" | "Moyenne" | "Haute" | "Urgente" | null
          statut?: "Nouveau" | "En cours" | "En attente" | "Résolu" | "Fermé" | null
          categorie?: string | null
          numero_contrat?: string | null
          assigne_a?: string | null
        }
      }
      impayes: {
        Row: {
          id: string
          client: string
          numero_contrat: string
          montant_du: number
          date_echeance: string
          jours_retard: number | null
          statut: "En retard" | "Relance 1" | "Relance 2" | "Contentieux" | "Résolu" | null
          dernier_contact: string | null
          prochaine_action: string | null
          conseiller: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          client: string
          numero_contrat: string
          montant_du: number
          date_echeance: string
          jours_retard?: number | null
          statut?: "En retard" | "Relance 1" | "Relance 2" | "Contentieux" | "Résolu" | null
          dernier_contact?: string | null
          prochaine_action?: string | null
          conseiller?: string | null
        }
        Update: {
          client?: string
          numero_contrat?: string
          montant_du?: number
          date_echeance?: string
          jours_retard?: number | null
          statut?: "En retard" | "Relance 1" | "Relance 2" | "Contentieux" | "Résolu" | null
          dernier_contact?: string | null
          prochaine_action?: string | null
          conseiller?: string | null
        }
      }
    }
  }
}
