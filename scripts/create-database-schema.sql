-- Création des tables pour Premunia CRM

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'conseiller', 'gestionnaire', 'qualite')),
    avatar VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des contacts/prospects
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    ville VARCHAR(255),
    email VARCHAR(255),
    telephone VARCHAR(20),
    date_creation DATE DEFAULT CURRENT_DATE,
    date_signature DATE,
    origine VARCHAR(100),
    statut VARCHAR(100),
    attribution VARCHAR(255),
    cpl DECIMAL(10,2),
    pays VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des contrats
CREATE TABLE IF NOT EXISTS contrats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_contrat VARCHAR(100) UNIQUE,
    nom_prenom VARCHAR(255) NOT NULL,
    ville VARCHAR(255),
    date_signature DATE,
    date_effet DATE,
    fin_contrat DATE,
    compagnie VARCHAR(100),
    cotisation_mensuelle DECIMAL(10,2),
    cotisation_annuelle DECIMAL(10,2),
    commission_mensuelle DECIMAL(10,2),
    commission_annuelle DECIMAL(10,2),
    commission_annuelle_1ere_annee DECIMAL(10,2),
    annee_recurrente DECIMAL(10,2),
    annee_recu DECIMAL(10,2),
    statut VARCHAR(100),
    attribution VARCHAR(255),
    pays VARCHAR(100),
    charge DECIMAL(10,2),
    depenses DECIMAL(10,2),
    statut_validation VARCHAR(50) DEFAULT 'En attente validation',
    valide_par UUID REFERENCES users(id),
    date_validation TIMESTAMP WITH TIME ZONE,
    commentaires_validation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_ticket VARCHAR(100) UNIQUE NOT NULL,
    client VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telephone VARCHAR(20),
    sujet VARCHAR(500) NOT NULL,
    description TEXT,
    priorite VARCHAR(20) CHECK (priorite IN ('Basse', 'Moyenne', 'Haute', 'Urgente')),
    statut VARCHAR(20) CHECK (statut IN ('Nouveau', 'En cours', 'En attente', 'Résolu', 'Fermé')),
    categorie VARCHAR(100),
    numero_contrat VARCHAR(100),
    assigne_a UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des impayés
CREATE TABLE IF NOT EXISTS impayes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client VARCHAR(255) NOT NULL,
    numero_contrat VARCHAR(100) NOT NULL,
    montant_du DECIMAL(10,2) NOT NULL,
    date_echeance DATE NOT NULL,
    jours_retard INTEGER,
    statut VARCHAR(50) CHECK (statut IN ('En retard', 'Relance 1', 'Relance 2', 'Contentieux', 'Résolu')),
    dernier_contact DATE,
    prochaine_action VARCHAR(255),
    conseiller VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des objectifs des conseillers
CREATE TABLE IF NOT EXISTS objectifs_conseillers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conseiller_id UUID REFERENCES users(id),
    mois INTEGER NOT NULL,
    annee INTEGER NOT NULL,
    objectif_contacts INTEGER,
    objectif_propositions INTEGER,
    objectif_ca DECIMAL(12,2),
    contacts_actuels INTEGER DEFAULT 0,
    propositions_actuelles INTEGER DEFAULT 0,
    ca_actuel DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(conseiller_id, mois, annee)
);

-- Insertion des utilisateurs de démonstration
INSERT INTO users (nom, email, password_hash, role, avatar) VALUES
('Directeur Admin', 'admin@premunia.fr', '$2b$10$hash_admin', 'admin', 'DA'),
('Jean Conseiller', 'jean@premunia.fr', '$2b$10$hash_jean', 'conseiller', 'JC'),
('Sophie Gestionnaire', 'sophie@premunia.fr', '$2b$10$hash_sophie', 'gestionnaire', 'SG'),
('Pierre Qualité', 'pierre@premunia.fr', '$2b$10$hash_pierre', 'qualite', 'PQ')
ON CONFLICT (email) DO NOTHING;

-- Création des index pour les performances
CREATE INDEX IF NOT EXISTS idx_contrats_attribution ON contrats(attribution);
CREATE INDEX IF NOT EXISTS idx_contrats_statut_validation ON contrats(statut_validation);
CREATE INDEX IF NOT EXISTS idx_tickets_statut ON tickets(statut);
CREATE INDEX IF NOT EXISTS idx_tickets_priorite ON tickets(priorite);
CREATE INDEX IF NOT EXISTS idx_impayes_statut ON impayes(statut);
CREATE INDEX IF NOT EXISTS idx_contacts_attribution ON contacts(attribution);
