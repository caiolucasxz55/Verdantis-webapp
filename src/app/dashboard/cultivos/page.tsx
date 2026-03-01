"use client"

import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Leaf, Plus, Calendar, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Cultivo, CropStatus } from "@/src/types"

const cultivos: Cultivo[] = [
  {
    id: "1", name: "Milho", lot: "Lote A3", loteId: "1", farm: "Fazenda Sao Jose", propertyId: "1",
    status: "Em Crescimento", plantingDate: "15 de Janeiro, 2025", harvestDate: "20 de Maio, 2025",
    area: 25, daysUntilHarvest: 15, progress: 85, irrigation: true, weather: true,
    variety: "AG 8088 PRO3", expectedYield: 180,
  },
  {
    id: "2", name: "Soja", lot: "Lote B1", loteId: "2", farm: "Fazenda Boa Vista", propertyId: "2",
    status: "Plantio", plantingDate: "10 de Marco, 2025", harvestDate: "15 de Julho, 2025",
    area: 30, daysUntilHarvest: 127, progress: 15, irrigation: true, weather: true,
    variety: "M 6210 IPRO", expectedYield: 210,
  },
  {
    id: "3", name: "Alface", lot: "Lote C2", loteId: "3", farm: "Fazenda Verde", propertyId: "3",
    status: "Pronto", plantingDate: "20 de Fevereiro, 2025", harvestDate: "05 de Abril, 2025",
    area: 15, daysUntilHarvest: 2, progress: 98, irrigation: true, weather: true,
    variety: "Crespa", expectedYield: 45,
  },
]

function getStatusColor(status: CropStatus) {
  const map: Record<CropStatus, string> = {
    "Em Crescimento": "border-green-500/30 bg-green-500/10 text-green-700",
    "Plantio": "border-amber-500/30 bg-amber-500/10 text-amber-700",
    "Pronto": "border-blue-500/30 bg-blue-500/10 text-blue-700",
    "Colheita": "border-primary/30 bg-primary/10 text-primary",
  }
  return map[status]
}

export default function CultivosPage() {
  return (
    <>
      <Topbar title="Cultivos" description="Acompanhe todos os seus cultivos em andamento" />
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{cultivos.length} cultivos ativos</p>
            <Link href="/dashboard/cultivos/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Cultivo
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {cultivos.map((cultivo) => (
              <Card key={cultivo.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{cultivo.name} - {cultivo.lot}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {cultivo.farm}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-0.5">Variedade: {cultivo.variety}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(cultivo.status)}>{cultivo.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6 mb-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Data de Plantio
                      </p>
                      <p className="font-medium text-foreground text-sm">{cultivo.plantingDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Previsao de Colheita
                      </p>
                      <p className="font-medium text-foreground text-sm">{cultivo.harvestDate}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Area Cultivada</p>
                      <p className="font-medium text-foreground text-sm">{cultivo.area} hectares</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Produtividade Esperada
                      </p>
                      <p className="font-medium text-foreground text-sm">{cultivo.expectedYield} sc/ha</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso do Cultivo</span>
                      <span className="font-medium text-foreground">
                        {cultivo.progress}% - {cultivo.daysUntilHarvest} dias ate colheita
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${cultivo.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  )
}
