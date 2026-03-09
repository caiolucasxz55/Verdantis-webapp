"use client"

import { useState } from "react"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { AppButton } from "@/src/components/app-button"
import { SectionHeader } from "@/src/components/section-header"
import { CultivationLotCard } from "@/src/components/cultivation-lot-card"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Cultivo } from "@/src/types"

const initialCultivos: Cultivo[] = [
  {
    id: "1", name: "Milho", lot: "Lote A3", loteId: "1", farm: "Fazenda Sao Jose", propertyId: "1",
    status: "Em Crescimento", plantingDate: "15 de Janeiro, 2025", harvestDate: "20 de Maio, 2025",
    area: 25, daysUntilHarvest: 15, progress: 85, irrigation: true, weather: true,
    variety: "AG 8088 PRO3", expectedYield: 180, isComplete: false,
    events: [
      { id: "e1", lotId: "1", type: "INPUT_ADDITION", description: "Aplicacao de fertilizante NPK 10-10-10, 200kg/ha", timestamp: new Date("2025-01-20") },
      { id: "e2", lotId: "1", type: "IRRIGATION", description: "Irrigacao por gotejamento - 4 horas", timestamp: new Date("2025-02-05") },
      { id: "e3", lotId: "1", type: "INPUT_ADDITION", description: "Aplicacao de defensivo contra lagarta-do-cartucho", timestamp: new Date("2025-03-10") },
    ],
  },
  {
    id: "2", name: "Soja", lot: "Lote B1", loteId: "2", farm: "Fazenda Boa Vista", propertyId: "2",
    status: "Plantio", plantingDate: "10 de Marco, 2025", harvestDate: "15 de Julho, 2025",
    area: 30, daysUntilHarvest: 127, progress: 15, irrigation: true, weather: true,
    variety: "M 6210 IPRO", expectedYield: 210, isComplete: false, events: [],
  },
  {
    id: "3", name: "Alface", lot: "Lote C2", loteId: "3", farm: "Fazenda Verde", propertyId: "3",
    status: "Colheita", plantingDate: "20 de Fevereiro, 2025", harvestDate: "05 de Abril, 2025",
    area: 15, daysUntilHarvest: 0, progress: 100, irrigation: true, weather: true,
    variety: "Crespa", expectedYield: 45, isComplete: true,
    traceabilityHash: {
      lotId: "3",
      hash: "0xa3f7b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
      generatedAt: new Date("2025-04-06"),
      eventCount: 5,
    },
    events: [
      { id: "e4", lotId: "3", type: "INPUT_ADDITION", description: "Adubacao organica com composto", timestamp: new Date("2025-02-22") },
      { id: "e5", lotId: "3", type: "IRRIGATION", description: "Irrigacao por aspersao", timestamp: new Date("2025-03-01") },
      { id: "e6", lotId: "3", type: "INPUT_ADDITION", description: "Aplicacao de calcario dolomitico", timestamp: new Date("2025-03-10") },
      { id: "e7", lotId: "3", type: "OTHER", description: "Inspecao de qualidade - folhas saudaveis", timestamp: new Date("2025-03-25") },
      { id: "e8", lotId: "3", type: "HARVEST", description: "Colheita manual - 42 sacas colhidas", timestamp: new Date("2025-04-05") },
    ],
  },
]

export default function CultivosPage() {
  const [cultivos] = useState(initialCultivos)

  return (
    <>
      <Topbar title="Cultivos" description="Acompanhe cultivos e rastreabilidade" />
      <PageContainer>
        <div className="space-y-6">
          <SectionHeader
            title="Cultivos ativos"
            description={`${cultivos.length} cultivos em acompanhamento`}
            actions={
              <Link href="/dashboard/cultivos/novo">
                <AppButton variant="primary" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cultivo
                </AppButton>
              </Link>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cultivos.map((cultivo) => (
              <Link
                key={cultivo.id}
                href={`/dashboard/cultivos/${cultivo.id}/traceability`}
                className="block"
              >
                <CultivationLotCard
                  lotId={cultivo.id}
                  lotName={cultivo.lot}
                  cropName={cultivo.name}
                  status={cultivo.status}
                  eventCount={cultivo.events?.length || 0}
                  isComplete={cultivo.isComplete}
                />
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  )
}
