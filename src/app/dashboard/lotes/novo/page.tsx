"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ArrowLeft, Save, DollarSign, TrendingUp, TrendingDown, Percent } from "lucide-react"
import { StatCard } from "@/src/components/stat-card"
import type { LoteFormData } from "@/src/types"

const crops = ["Milho", "Soja", "Cafe", "Trigo", "Alface", "Tomate", "Feijao", "Arroz"]

export default function NovoLotePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoteFormData>({
    name: "",
    crop: "",
    expectedProduction: 0,
    actualProduction: 0,
    estimatedCost: 0,
    actualCost: 0,
    salePrice: 0,
  })

  const profitPreview = useMemo(() => {
    const revenue = formData.actualProduction * formData.salePrice
    const profit = revenue - formData.actualCost
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0
    return { revenue, profit, margin }
  }, [formData.actualProduction, formData.salePrice, formData.actualCost])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard/lotes")
  }

  const updateField = (field: keyof LoteFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <>
      <Topbar title="Novo Lote" description="Cadastre um novo lote de producao" />
      <PageContainer>
        <div className="space-y-6">
          <Link href="/dashboard/lotes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Lotes
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Informacoes do Lote</CardTitle>
                <CardDescription>Preencha os dados para calcular a lucratividade</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Identificacao</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome do Lote *</Label>
                        <Input
                          id="name"
                          placeholder="Ex: Lote A1"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cultura *</Label>
                        <Select value={formData.crop} onValueChange={(v) => updateField("crop", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a cultura" />
                          </SelectTrigger>
                          <SelectContent>
                            {crops.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Production */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Producao</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expectedProduction">Producao Esperada (sacas) *</Label>
                        <Input
                          id="expectedProduction"
                          type="number"
                          placeholder="Ex: 200"
                          value={formData.expectedProduction || ""}
                          onChange={(e) => updateField("expectedProduction", Number(e.target.value))}
                          required
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="actualProduction">Producao Real (sacas)</Label>
                        <Input
                          id="actualProduction"
                          type="number"
                          placeholder="Ex: 185"
                          value={formData.actualProduction || ""}
                          onChange={(e) => updateField("actualProduction", Number(e.target.value))}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Financeiro</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="estimatedCost">Custo Estimado (R$) *</Label>
                        <Input
                          id="estimatedCost"
                          type="number"
                          placeholder="Ex: 12000"
                          value={formData.estimatedCost || ""}
                          onChange={(e) => updateField("estimatedCost", Number(e.target.value))}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="actualCost">Custo Real (R$)</Label>
                        <Input
                          id="actualCost"
                          type="number"
                          placeholder="Ex: 11500"
                          value={formData.actualCost || ""}
                          onChange={(e) => updateField("actualCost", Number(e.target.value))}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salePrice">Preco de Venda (R$/saca) *</Label>
                        <Input
                          id="salePrice"
                          type="number"
                          placeholder="Ex: 85"
                          value={formData.salePrice || ""}
                          onChange={(e) => updateField("salePrice", Number(e.target.value))}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Lote
                    </Button>
                    <Link href="/dashboard/lotes" className="flex-1">
                      <Button type="button" variant="outline" className="w-full">
                        Cancelar
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Profit Preview */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Previsao de Lucro</h3>
              <StatCard
                title="Receita"
                value={formatCurrency(profitPreview.revenue)}
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
              />
              <StatCard
                title="Lucro"
                value={formatCurrency(profitPreview.profit)}
                icon={<DollarSign className="h-5 w-5 text-green-600" />}
                variant={profitPreview.profit >= 0 ? "success" : "danger"}
              />
              <StatCard
                title="Margem"
                value={`${profitPreview.margin.toFixed(1)}%`}
                icon={<Percent className="h-5 w-5 text-amber-600" />}
                variant={profitPreview.margin >= 0 ? "success" : "danger"}
              />
              <StatCard
                title="Custo Estimado"
                value={formatCurrency(formData.estimatedCost)}
                icon={<TrendingDown className="h-5 w-5 text-muted-foreground" />}
                description={formData.actualCost > 0 ? `Real: ${formatCurrency(formData.actualCost)}` : undefined}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
