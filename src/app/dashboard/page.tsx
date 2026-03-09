"use client"

import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { KpiCard } from "@/src/components/kpi-card"
import { ChartCard } from "@/src/components/chart-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/table"
import { Badge } from "@/src/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, Sprout, Grid3x3 } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { Lote } from "@/src/types"

const lots: Lote[] = [
  { id: "1", name: "Lote A1", crop: "Milho", production: 185, cost: 11500, salePrice: 85, revenue: 15725, profit: 4225, margin: 26.9, status: "Ativo", propertyName: "Fazenda Sao Jose" },
  { id: "2", name: "Lote B2", crop: "Soja", production: 160, cost: 8800, salePrice: 120, revenue: 19200, profit: 10400, margin: 54.2, status: "Ativo", propertyName: "Fazenda Boa Vista" },
  { id: "3", name: "Lote C3", crop: "Cafe", production: 75, cost: 16200, salePrice: 180, revenue: 13500, profit: -2700, margin: -20.0, status: "Ativo", propertyName: "Fazenda Verde" },
  { id: "4", name: "Lote D4", crop: "Trigo", production: 130, cost: 7200, salePrice: 70, revenue: 9100, profit: 1900, margin: 20.9, status: "Finalizado", propertyName: "Fazenda Sao Jose" },
  { id: "5", name: "Lote E5", crop: "Milho", production: 190, cost: 9800, salePrice: 85, revenue: 16150, profit: 6350, margin: 39.3, status: "Ativo", propertyName: "Fazenda Boa Vista" },
]

const profitByLot = lots.map((l) => ({
  name: l.name,
  lucro: l.profit,
  receita: l.revenue,
  custo: l.cost,
}))

const profitOverTime = [
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

const profitByCrop = [
  { crop: "Milho", lucro: 10575 },
  { crop: "Soja", lucro: 10400 },
  { crop: "Trigo", lucro: 1900 },
  { crop: "Cafe", lucro: -2700 },
]

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--foreground)",
}

export default function DashboardPage() {
  const totalProfit = lots.reduce((sum, l) => sum + l.profit, 0)
  const totalRevenue = lots.reduce((sum, l) => sum + l.revenue, 0)
  const totalCost = lots.reduce((sum, l) => sum + l.cost, 0)
  const mostProfitableCrop = profitByCrop.reduce((prev, curr) => (curr.lucro > prev.lucro ? curr : prev))
  const mostProfitableLot = lots.reduce((prev, curr) => (curr.profit > prev.profit ? curr : prev))

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <>
      <Topbar title="Dashboard" description="Visao geral da sua producao" />
      <PageContainer>
        <div className="space-y-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard
              title="Lucro Total"
              value={formatCurrency(totalProfit)}
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              variant={totalProfit >= 0 ? "success" : "danger"}
              trend={{ value: 12, label: "vs. safra anterior" }}
            />
            <KpiCard
              title="Receita Total"
              value={formatCurrency(totalRevenue)}
              icon={<TrendingUp className="h-5 w-5 text-primary" />}
              trend={{ value: 8, label: "vs. safra anterior" }}
            />
            <KpiCard
              title="Custo Total"
              value={formatCurrency(totalCost)}
              icon={<TrendingDown className="h-5 w-5 text-primary" />}
              variant="warning"
              trend={{ value: -3, label: "reducao" }}
            />
            <KpiCard
              title="Cultura Mais Lucrativa"
              value={mostProfitableCrop.crop}
              description={formatCurrency(mostProfitableCrop.lucro)}
              icon={<Sprout className="h-5 w-5 text-primary" />}
            />
            <KpiCard
              title="Lote Mais Lucrativo"
              value={mostProfitableLot.name}
              description={formatCurrency(mostProfitableLot.profit)}
              icon={<Grid3x3 className="h-5 w-5 text-primary" />}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Lucro por Lote" description="Comparativo de desempenho financeiro">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitByLot}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Bar dataKey="lucro" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Lucro ao Longo do Tempo" description="Evolucao mensal do lucro">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={profitOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="lucro" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ fill: "var(--chart-1)", r: 3 }} name="Lucro" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Profit by crop + Recent lots table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard title="Lucro por Cultura" description="Performance de cada cultura">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={profitByCrop} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <YAxis dataKey="crop" type="category" width={60} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={tooltipStyle} />
                  <Bar dataKey="lucro" radius={[0, 4, 4, 0]} name="Lucro" fill="var(--chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Recent Lots Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Lotes Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Lote</TableHead>
                        <TableHead>Cultura</TableHead>
                        <TableHead className="text-right">Custo</TableHead>
                        <TableHead className="text-right">Receita</TableHead>
                        <TableHead className="text-right">Lucro</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lots.map((lot) => (
                        <TableRow key={lot.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{lot.name}</p>
                              <p className="text-xs text-muted-foreground">{lot.propertyName}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-foreground">{lot.crop}</TableCell>
                          <TableCell className="text-right text-foreground">{formatCurrency(lot.cost)}</TableCell>
                          <TableCell className="text-right text-foreground">{formatCurrency(lot.revenue)}</TableCell>
                          <TableCell className={`text-right font-semibold ${lot.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {formatCurrency(lot.profit)}
                          </TableCell>
                          <TableCell className="text-center">
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
