"use client"

import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { ChartCard } from "@/src/components/chart-card"
import { CropMarketCard } from "@/src/components/crop-market-card"
import type { CropMarketData } from "@/src/types"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const cropMarketData: CropMarketData[] = [
  { id: "1", name: "Soja", imageUrl: "/crops/soybean.jpg", pricePerSack: 148.5, priceTrend: "up" },
  { id: "2", name: "Milho", imageUrl: "/crops/corn.jpg", pricePerSack: 72.3, priceTrend: "down" },
  { id: "3", name: "Trigo", imageUrl: "/crops/wheat.jpg", pricePerSack: 95.0, priceTrend: "stable" },
  { id: "4", name: "Cafe", imageUrl: "/crops/coffee.jpg", pricePerSack: 1420.0, priceTrend: "up" },
]

const profitComparison = [
  { name: "Lote A1", lucro: 4225, custo: 11500, receita: 15725 },
  { name: "Lote B2", lucro: 10400, custo: 8800, receita: 19200 },
  { name: "Lote C3", lucro: -2700, custo: 16200, receita: 13500 },
  { name: "Lote D4", lucro: 1900, custo: 7200, receita: 9100 },
  { name: "Lote E5", lucro: 6350, custo: 9800, receita: 16150 },
  { name: "Lote F6", lucro: -560, custo: 3200, receita: 2640 },
]

const profitByCrop = [
  { cultura: "Milho", lucro: 10575 },
  { cultura: "Soja", lucro: 10400 },
  { cultura: "Trigo", lucro: 1900 },
  { cultura: "Cafe", lucro: -2700 },
  { cultura: "Alface", lucro: -560 },
]

const costVsRevenue = [
  { name: "Lote A1", custo: 11500, receita: 15725 },
  { name: "Lote B2", custo: 8800, receita: 19200 },
  { name: "Lote C3", custo: 16200, receita: 13500 },
  { name: "Lote D4", custo: 7200, receita: 9100 },
  { name: "Lote E5", custo: 9800, receita: 16150 },
  { name: "Lote F6", custo: 3200, receita: 2640 },
]

const profitTrends = [
  { month: "Jan", lucro: 2800 },
  { month: "Fev", lucro: 3200 },
  { month: "Mar", lucro: 1500 },
  { month: "Abr", lucro: 4100 },
  { month: "Mai", lucro: 3800 },
  { month: "Jun", lucro: 5200 },
  { month: "Jul", lucro: 4800 },
  { month: "Ago", lucro: 6100 },
  { month: "Set", lucro: 5400 },
  { month: "Out", lucro: 7200 },
  { month: "Nov", lucro: 6800 },
  { month: "Dez", lucro: 8500 },
]

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--foreground)",
}

export default function AnalyticsPage() {
  return (
    <>
      <Topbar title="Analytics" description="Comparativos, insights e cotacoes de mercado" />
      <PageContainer>
        <div className="space-y-6">
          {/* Crop Market Cards */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Cotacoes de Mercado</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {cropMarketData.map((crop) => (
                <CropMarketCard key={crop.id} {...crop} />
              ))}
            </div>
          </div>

          {/* Row 1: Profit comparison + Profit by crop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Comparativo de Lucro entre Lotes" description="Lucro liquido de cada lote">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={profitComparison}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Bar dataKey="lucro" name="Lucro" radius={[4, 4, 0, 0]} fill="var(--chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Lucro por Cultura" description="Performance de lucratividade por tipo de cultura">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={profitByCrop} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis dataKey="cultura" type="category" width={60} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Bar dataKey="lucro" name="Lucro" radius={[0, 4, 4, 0]} fill="var(--chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Row 2: Cost vs Revenue + Profit Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Custo vs Receita" description="Comparativo financeiro por lote">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={costVsRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Legend />
                  <Bar dataKey="custo" name="Custo" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="receita" name="Receita" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Tendencia de Lucro" description="Evolucao do lucro mensal ao longo do ano">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={profitTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="lucro" name="Lucro" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ fill: "var(--chart-1)", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
