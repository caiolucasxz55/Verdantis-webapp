"use client"

import Link from "next/link"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { StatCard } from "@/src/components/stat-card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Percent } from "lucide-react"

const lot = {
  id: "1",
  name: "Lote A1",
  crop: "Milho",
  production: 185,
  cost: 11500,
  salePrice: 85,
  revenue: 15725,
  profit: 4225,
  margin: 26.9,
  status: "Ativo" as const,
  propertyName: "Fazenda Sao Jose",
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export default function LoteDetailPage() {
  return (
    <>
      <Topbar title={`Lote ${lot.name}`} description={`${lot.propertyName} - ${lot.crop}`} />
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/lotes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Lotes
              </Button>
            </Link>
            <Badge
              variant="outline"
              className={
                lot.profit >= 0
                  ? "border-green-500/30 bg-green-500/10 text-green-700"
                  : "border-red-500/30 bg-red-500/10 text-red-700"
              }
            >
              {lot.profit >= 0 ? "Lucrativo" : "Prejuizo"}
            </Badge>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Lucro"
              value={formatCurrency(lot.profit)}
              icon={<DollarSign className={`h-5 w-5 ${lot.profit >= 0 ? "text-green-600" : "text-red-600"}`} />}
              variant={lot.profit >= 0 ? "success" : "danger"}
            />
            <StatCard
              title="Receita"
              value={formatCurrency(lot.revenue)}
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
            />
            <StatCard
              title="Custo Total"
              value={formatCurrency(lot.cost)}
              icon={<TrendingDown className="h-5 w-5 text-amber-600" />}
            />
            <StatCard
              title="Margem"
              value={`${lot.margin >= 0 ? "+" : ""}${lot.margin.toFixed(1)}%`}
              icon={<Percent className={`h-5 w-5 ${lot.margin >= 0 ? "text-green-600" : "text-red-600"}`} />}
              variant={lot.margin >= 0 ? "success" : "danger"}
            />
          </div>

          {/* Production & Financial Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Producao</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Producao Total</span>
                  <span className="font-medium text-foreground">{lot.production} sacas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Preco de Venda</span>
                  <span className="font-medium text-foreground">{formatCurrency(lot.salePrice)}/saca</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cultura</span>
                  <span className="font-medium text-foreground">{lot.crop}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Financeiro</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Custo Total</span>
                  <span className="font-medium text-foreground">{formatCurrency(lot.cost)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Receita</span>
                  <span className="font-medium text-foreground">{formatCurrency(lot.revenue)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold text-foreground">Lucro Liquido</span>
                  <span className={`font-bold text-lg ${lot.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatCurrency(lot.profit)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
