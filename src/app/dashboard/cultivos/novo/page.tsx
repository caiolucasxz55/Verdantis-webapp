"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import type { CultivoFormData } from "@/src/types"

const properties = [
  { id: "1", name: "Fazenda Sao Jose", lotes: [{ id: "1", name: "Lote A1" }, { id: "4", name: "Lote A3" }] },
  { id: "2", name: "Fazenda Boa Vista", lotes: [{ id: "2", name: "Lote B1" }, { id: "5", name: "Lote B2" }] },
  { id: "3", name: "Fazenda Verde", lotes: [{ id: "3", name: "Lote C2" }] },
]
const crops = ["Milho", "Soja", "Alface", "Tomate", "Feijao", "Trigo", "Arroz", "Cafe"]

export default function NovoCultivoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<CultivoFormData>({
    name: "", loteId: "", propertyId: "", variety: "",
    plantingDate: "", harvestDate: "", area: 0, expectedYield: 0, notes: "",
  })

  const selectedProperty = properties.find((p) => p.id === formData.propertyId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard/cultivos")
  }

  return (
    <>
      <Topbar title="Novo Cultivo" description="Cadastre um novo cultivo em seu lote" />
      <PageContainer>
        <div className="space-y-6">
          <Link href="/dashboard/cultivos">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Cultivos
            </Button>
          </Link>

          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle className="text-base">Informacoes do Cultivo</CardTitle>
              <CardDescription>Preencha os dados do cultivo</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Propriedade *</Label>
                    <Select value={formData.propertyId} onValueChange={(v) => setFormData({ ...formData, propertyId: v, loteId: "" })}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {properties.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Lote *</Label>
                    <Select value={formData.loteId} onValueChange={(v) => setFormData({ ...formData, loteId: v })} disabled={!formData.propertyId}>
                      <SelectTrigger><SelectValue placeholder="Selecione o lote" /></SelectTrigger>
                      <SelectContent>
                        {selectedProperty?.lotes.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cultura *</Label>
                    <Select value={formData.name} onValueChange={(v) => setFormData({ ...formData, name: v })}>
                      <SelectTrigger><SelectValue placeholder="Selecione a cultura" /></SelectTrigger>
                      <SelectContent>
                        {crops.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variety">Variedade *</Label>
                    <Input id="variety" placeholder="Ex: AG 8088 PRO3" value={formData.variety} onChange={(e) => setFormData({ ...formData, variety: e.target.value })} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plantingDate">Data de Plantio *</Label>
                    <Input id="plantingDate" type="date" value={formData.plantingDate} onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Previsao de Colheita *</Label>
                    <Input id="harvestDate" type="date" value={formData.harvestDate} onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area Cultivada (hectares) *</Label>
                    <Input id="area" type="number" placeholder="Ex: 25" value={formData.area || ""} onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })} required min="0" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedYield">Produtividade Esperada (sc/ha) *</Label>
                    <Input id="expectedYield" type="number" placeholder="Ex: 180" value={formData.expectedYield || ""} onChange={(e) => setFormData({ ...formData, expectedYield: Number(e.target.value) })} required min="0" step="0.1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observacoes</Label>
                  <Textarea id="notes" placeholder="Adicione observacoes sobre o cultivo..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} rows={3} />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1"><Save className="h-4 w-4 mr-2" />Salvar Cultivo</Button>
                  <Link href="/dashboard/cultivos" className="flex-1"><Button type="button" variant="outline" className="w-full">Cancelar</Button></Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
