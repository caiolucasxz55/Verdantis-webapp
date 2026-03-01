"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ArrowLeft, Save, DollarSign, TrendingUp, Percent, Package } from "lucide-react"
import { StatCard } from "@/src/components/stat-card"
import { AppButton } from "@/src/components/app-button"
import { FormField } from "@/src/components/form-field"
import type { LoteFormData } from "@/src/types"

const crops = ["Milho", "Soja", "Cafe", "Trigo", "Alface", "Tomate", "Feijao", "Arroz"]

export default function NovoLotePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoteFormData>({
    name: "",
    cropId: "",
    production: 0,
    cost: 0,
    salePrice: 0,
  })

  const profitPreview = useMemo(() => {
    const revenue = formData.production * formData.salePrice
    const profit = revenue - formData.cost
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0
    return { revenue, profit, margin }
  }, [formData.production, formData.salePrice, formData.cost])

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
            <AppButton variant="tertiary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Lotes
            </AppButton>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informacoes do Lote</CardTitle>
                <CardDescription>Preencha os dados reais do lote para calcular a lucratividade</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Identification */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground">Identificacao</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField label="Nome do Lote *" htmlFor="name">
                        <Input
                          id="name"
                          placeholder="Ex: Lote A1"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                        />
                      </FormField>
                      <FormField label="Cultura *">
                        <Select value={formData.cropId} onValueChange={(v) => updateField("cropId", v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a cultura" />
                          </SelectTrigger>
                          <SelectContent>
                            {crops.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </div>
                  </div>

                  {/* Production & Financial */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground">Producao e Financeiro</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField label="Producao Total (sacas) *" htmlFor="production">
                        <Input
                          id="production"
                          type="number"
                          placeholder="Ex: 185"
                          value={formData.production || ""}
                          onChange={(e) => updateField("production", Number(e.target.value))}
                          required
                          min="0"
                        />
                      </FormField>
                      <FormField label="Custo Total (R$) *" htmlFor="cost">
                        <Input
                          id="cost"
                          type="number"
                          placeholder="Ex: 11500"
                          value={formData.cost || ""}
                          onChange={(e) => updateField("cost", Number(e.target.value))}
                          required
                          min="0"
                          step="0.01"
                        />
                      </FormField>
                      <FormField label="Preco de Venda (R$/saca) *" htmlFor="salePrice">
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
                      </FormField>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <AppButton type="submit" variant="primary" size="lg" className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Lote
                    </AppButton>
                    <Link href="/dashboard/lotes" className="flex-1">
                      <AppButton type="button" variant="secondary" size="md" className="w-full">
                        Cancelar
                      </AppButton>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Live Profit Preview */}
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
                title="Producao"
                value={`${formData.production} sacas`}
                icon={<Package className="h-5 w-5 text-muted-foreground" />}
                description={formData.salePrice > 0 ? `a ${formatCurrency(formData.salePrice)} / saca` : undefined}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
