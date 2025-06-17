"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ExcelUploadProps {
  type: "contacts" | "contracts"
  onUploadComplete: (data: any[]) => void
}

export function ExcelUpload({ type, onUploadComplete }: ExcelUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (
        selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel"
      ) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError("Veuillez sélectionner un fichier Excel (.xlsx ou .xls)")
      }
    }
  }

  const simulateExcelParsing = (file: File): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (type === "contacts") {
          resolve([
            {
              Contact: "Nouveau Contact 1",
              Ville: "Paris",
              Création: new Date().toLocaleDateString("fr-FR"),
              Signature: "",
              Origine: "excel_import",
              Statut: "Nouveau Prospect",
              Attribution: "SNOUSSI ZOUHAIR",
              Cpl: "2,19 €",
              Pays: "France Métropolitaine",
            },
            {
              Contact: "Nouveau Contact 2",
              Ville: "Lyon",
              Création: new Date().toLocaleDateString("fr-FR"),
              Signature: "",
              Origine: "excel_import",
              Statut: "A Relancer",
              Attribution: "DAHMANI Mouna",
              Cpl: "2,19 €",
              Pays: "France Métropolitaine",
            },
          ])
        } else {
          resolve([
            {
              id: Date.now().toString(),
              nomPrenom: "Nouveau Client 1",
              ville: "Marseille",
              signature: new Date().toLocaleDateString("fr-FR"),
              dateEffet: new Date().toLocaleDateString("fr-FR"),
              finContrat: "",
              numeroContrat: `CONT-${Date.now()}`,
              compagnie: "ZENIOO",
              cotisationMensuelle: 150.0,
              cotisationAnnuelle: 1800.0,
              commissionMensuelle: 45.0,
              commissionAnnuelle: 540.0,
              commissionAnnuelle1ereAnnee: 450.0,
              anneeRecurrente: 180.0,
              anneeRecu: 150.0,
              statut: "En attente validation",
              attribution: "SNOUSSI ZOUHAIR",
              pays: "France Métropolitaine",
              charge: 120.0,
              depenses: 50.0,
            },
          ])
        }
      }, 2000)
    })
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      // Simulation du progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const parsedData = await simulateExcelParsing(file)

      clearInterval(progressInterval)
      setProgress(100)

      setTimeout(() => {
        onUploadComplete(parsedData)
        setSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          setFile(null)
          setProgress(0)
          setSuccess(false)
          setUploading(false)
        }, 1500)
      }, 500)
    } catch (err) {
      setError("Erreur lors de l'import du fichier Excel")
      setUploading(false)
      setProgress(0)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setError(null)
    setSuccess(false)
    setProgress(0)
    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
          <Upload className="h-4 w-4 mr-2" />
          Importer Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />
            Importer {type === "contacts" ? "des contacts" : "des contrats"} depuis Excel
          </DialogTitle>
          <DialogDescription>
            Sélectionnez un fichier Excel (.xlsx ou .xls) contenant vos {type === "contacts" ? "contacts" : "contrats"}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!success && (
            <>
              <div>
                <Label htmlFor="excel-file">Fichier Excel</Label>
                <Input
                  ref={fileInputRef}
                  id="excel-file"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  className="mt-1"
                />
              </div>

              {file && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      {!uploading && (
                        <Button variant="ghost" size="sm" onClick={resetUpload}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Import en cours...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Import réussi ! Les données ont été ajoutées avec succès.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={uploading}>
            Annuler
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || uploading || success}
            className="bg-green-600 hover:bg-green-700"
          >
            {uploading ? "Import en cours..." : "Importer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
