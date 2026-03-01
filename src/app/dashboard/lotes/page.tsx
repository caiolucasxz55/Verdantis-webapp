"use client"

import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { AppButton } from "@/src/components/app-button"
import { SectionHeader } from "@/src/components/section-header"
import { LotCard } from "@/src/components/lot-card"
import { StatCard } from "@/src/components/stat-card"
import { Plus, TrendingUp, Grid3x3 } from "lucide-react"
import Link from "next/link"
import type { Lote } from "@/src/types"

const lots: Lote[] = [
  { id: "1", name: "Lote A1", crop: "Milho", production: 185, cost: 11500, salePrice: 85, revenue: 15725, profit: 4225, margin: 26.9, status: "Ativo", propertyName: "Fazenda Sao Jose" },
  { id: "2", name: "Lote B2", crop: "Soja", production: 160, cost: 8800, salePrice: 120, revenue: 19200, profit: 10400, margin: 54.2, status: "Ativo", propertyName: "Fazenda Boa Vista" },
  { id: "3", name: "Lote C3", crop: "Cafe", production: 75, cost: 16200, salePrice: 180, revenue: 13500, profit: -2700, margin: -20.0, status: "Ativo", propertyName: "Fazenda Verde" },
  { id: "4", name: "Lote D4", crop: "Trigo", production: 130, cost: 7200, salePrice: 70, revenue: 9100, profit: 1900, margin: 20.9, status: "Finalizado", propertyName: "Fazenda Sao Jose" },
  { id: "5", name: "Lote E5", crop: "Milho", production: 190, cost: 9800, salePrice: 85, revenue: 16150, profit: 6350, margin: 39.3, status: "Ativo", propertyName: "Fazenda Boa Vista" },
  { id: "6", name: "Lote F6", crop: "Alface", production: 48, cost: 3200, salePrice: 55, revenue: 2640, profit: -560, margin: -21.2, status: "Em Preparo", propertyName: "Fazenda Verde" },
]

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export default function LotesPage() {
  return (
    <>
      <Topbar title="Lotes" description="Gerencie seus lotes e acompanhe a lucratividade" />
      <PageContainer>
        <div className="space-y-6">
          <SectionHeader
            title="Lotes"
            description="Resumo da producao e lucratividade"
            actions={
              <Link href="/dashboard/lotes/novo">
                <AppButton variant="primary" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar lote
                </AppButton>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total de lotes"
              value={`${lots.length}`}
              icon={<Grid3x3 className="h-5 w-5 text-primary" />}
              description="Cadastrados no sistema"
            />
            <StatCard
              title="Lucro total"
              value={formatCurrency(lots.reduce((sum, lot) => sum + lot.profit, 0))}
              icon={<TrendingUp className="h-5 w-5 text-green-600" />}
              variant={lots.reduce((sum, lot) => sum + lot.profit, 0) >= 0 ? "success" : "danger"}
              description="Somatoria dos lotes"
            />
            <StatCard
              title="Cultivos ativos"
              value={`${lots.filter((lot) => lot.status === "Ativo").length}`}
              icon={<TrendingUp className="h-5 w-5 text-amber-600" />}
              description="Em andamento"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {lots.map((lot) => (
              <Link key={lot.id} href={`/dashboard/lotes/${lot.id}`} className="block">
                <LotCard
                  id={lot.id}
                  name={lot.name}
                  cropName={lot.crop}
                  production={lot.production}
                  cost={lot.cost}
                  revenue={lot.revenue}
                  profit={lot.profit}
                  status={lot.status === "Finalizado" ? "completed" : "active"}
                />
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  )
}
