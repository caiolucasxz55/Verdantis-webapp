"use client"

import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Eye, Edit } from "lucide-react"
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

function getStatusBadge(status: Lote["status"]) {
  const map = {
    "Ativo": "border-green-500/30 bg-green-500/10 text-green-700",
    "Finalizado": "border-muted-foreground/30 bg-muted text-muted-foreground",
    "Em Preparo": "border-amber-500/30 bg-amber-500/10 text-amber-700",
  }
  return map[status]
}

export default function LotesPage() {
  return (
    <>
      <Topbar title="Lotes" description="Gerencie seus lotes e acompanhe a lucratividade" />
      <PageContainer>
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{lots.length} lotes cadastrados</p>
            </div>
            <Link href="/dashboard/lotes/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Lote
              </Button>
            </Link>
          </div>

          {/* Lots Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Todos os Lotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Lote</th>
                      <th className="text-left py-3 px-3 font-medium text-muted-foreground">Cultura</th>
                      <th className="text-right py-3 px-3 font-medium text-muted-foreground">Producao</th>
                      <th className="text-right py-3 px-3 font-medium text-muted-foreground">Custo</th>
                      <th className="text-right py-3 px-3 font-medium text-muted-foreground">Receita</th>
                      <th className="text-right py-3 px-3 font-medium text-muted-foreground">Lucro</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-3 font-medium text-muted-foreground">Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lots.map((lot) => (
                      <tr key={lot.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-3">
                          <div>
                            <p className="font-medium text-foreground">{lot.name}</p>
                            <p className="text-xs text-muted-foreground">{lot.propertyName}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-foreground">{lot.crop}</td>
                        <td className="py-3 px-3 text-right text-foreground">{lot.production} sc</td>
                        <td className="py-3 px-3 text-right text-foreground">{formatCurrency(lot.cost)}</td>
                        <td className="py-3 px-3 text-right text-foreground">{formatCurrency(lot.revenue)}</td>
                        <td className={`py-3 px-3 text-right font-semibold ${lot.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(lot.profit)}
                          <span className="block text-xs font-normal text-muted-foreground">
                            {lot.margin >= 0 ? "+" : ""}{lot.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Badge variant="outline" className={getStatusBadge(lot.status)}>
                            {lot.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center justify-center gap-1">
                            <Link href={`/dashboard/lotes/${lot.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Ver detalhes</span>
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
