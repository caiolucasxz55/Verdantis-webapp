"use client"

import { useState, useCallback } from "react"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Leaf, Plus, Calendar, MapPin, TrendingUp, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { ProgressIndicator } from "@/src/components/progress-indicator"
import { TraceabilityTimeline } from "@/src/components/traceability-timeline"
import { TraceabilityEventForm } from "@/src/components/traceability-event-form"
import { TraceabilityHashPanel } from "@/src/components/traceability-hash-panel"
import type { Cultivo, CropStatus, TraceabilityEvent, TraceabilityHash } from "@/src/types"

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

function getStatusColor(status: CropStatus) {
  const map: Record<CropStatus, string> = {
    "Em Crescimento": "border-green-500/30 bg-green-500/10 text-green-700",
    "Plantio": "border-amber-500/30 bg-amber-500/10 text-amber-700",
    "Pronto": "border-blue-500/30 bg-blue-500/10 text-blue-700",
    "Colheita": "border-primary/30 bg-primary/10 text-primary",
  }
  return map[status]
}

function generateHash(events: TraceabilityEvent[], lotId: string): string {
  const data = events.map((e) => `${e.type}:${e.description}:${new Date(e.timestamp).getTime()}`).join("|")
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0")
  return `0x${hex}${lotId.padStart(4, "0")}${"a3f7b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0".slice(0, 52)}`
}

interface CropLotCardProps {
  cultivo: Cultivo
  onAddEvent: (cultivoId: string, event: TraceabilityEvent) => void
  onFinalize: (cultivoId: string) => void
}

function CropLotCard({ cultivo, onAddEvent, onFinalize }: CropLotCardProps) {
  const [expanded, setExpanded] = useState(false)
  const events = cultivo.events || []
  const isComplete = cultivo.isComplete || false

  return (
    <Card>
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
      <CardContent className="space-y-5">
        {/* Info row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Plantio
            </p>
            <p className="font-medium text-foreground text-sm">{cultivo.plantingDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Colheita
            </p>
            <p className="font-medium text-foreground text-sm">{cultivo.harvestDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-medium text-foreground text-sm">{cultivo.area} ha</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Produtividade
            </p>
            <p className="font-medium text-foreground text-sm">{cultivo.expectedYield} sc/ha</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStatus={cultivo.status} />

        {/* Expand/Collapse Traceability */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Ocultar Rastreabilidade
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Ver Rastreabilidade ({events.length} eventos)
            </>
          )}
        </Button>

        {expanded && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Timeline de Eventos</h4>
                <TraceabilityTimeline events={events} />
              </div>

              {/* Event form + Hash panel */}
              <div className="space-y-4">
                {!isComplete && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Registrar Evento</h4>
                    <TraceabilityEventForm
                      lotId={cultivo.id}
                      onAddEvent={(event) => onAddEvent(cultivo.id, event)}
                      disabled={isComplete}
                    />
                  </div>
                )}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Hash de Rastreabilidade</h4>
                  <TraceabilityHashPanel
                    hash={cultivo.traceabilityHash || null}
                    onGenerate={() => onFinalize(cultivo.id)}
                    canGenerate={events.length > 0 && !isComplete}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function CultivosPage() {
  const [cultivos, setCultivos] = useState(initialCultivos)

  const handleAddEvent = useCallback((cultivoId: string, event: TraceabilityEvent) => {
    setCultivos((prev) =>
      prev.map((c) =>
        c.id === cultivoId
          ? { ...c, events: [...(c.events || []), event] }
          : c
      )
    )
  }, [])

  const handleFinalize = useCallback((cultivoId: string) => {
    setCultivos((prev) =>
      prev.map((c) => {
        if (c.id !== cultivoId) return c
        const events = c.events || []
        const hash: TraceabilityHash = {
          lotId: c.id,
          hash: generateHash(events, c.id),
          generatedAt: new Date(),
          eventCount: events.length,
        }
        return { ...c, isComplete: true, traceabilityHash: hash, status: "Colheita" as CropStatus }
      })
    )
  }, [])

  return (
    <>
      <Topbar title="Cultivos" description="Acompanhe cultivos e gerencie rastreabilidade" />
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
              <CropLotCard
                key={cultivo.id}
                cultivo={cultivo}
                onAddEvent={handleAddEvent}
                onFinalize={handleFinalize}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  )
}
