"use client"

import { useState, useCallback } from "react"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Leaf, Plus, Calendar, MapPin, ChevronDown, ChevronUp, History, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { TraceabilityTimeline } from "@/src/components/traceability-timeline"
import { TraceabilityEventForm } from "@/src/components/traceability-event-form"
import { TraceabilityHashPanel } from "@/src/components/traceability-hash-panel"
import { CultivationExport } from "@/src/components/cultivation-export"
import type { Cultivo, CropStatus, TraceabilityEvent, TraceabilityHash } from "@/src/types"

// Mock data without property references
const initialCultivos: Cultivo[] = [
  {
    id: "1", name: "Milho", lot: "Lote A3", loteId: "1",
    status: "Em Crescimento", plantingDate: "15 de Janeiro, 2025", harvestDate: "20 de Maio, 2025",
    area: 25, daysUntilHarvest: 15,
    variety: "AG 8088 PRO3", expectedYield: 180, isComplete: false,
    events: [
      { id: "e1", lotId: "1", type: "SOIL_PREPARATION", description: "Preparo do solo com aracao profunda de 30cm para melhor drenagem", timestamp: new Date("2025-01-10") },
      { id: "e2", lotId: "1", type: "INPUT_ADDITION", description: "Aplicacao de fertilizante NPK 10-10-10, 200kg/ha em toda area do lote", timestamp: new Date("2025-01-20") },
      { id: "e3", lotId: "1", type: "IRRIGATION", description: "Irrigacao por gotejamento - sistema ativado por 4 horas", timestamp: new Date("2025-02-05") },
      { id: "e4", lotId: "1", type: "PEST_CONTROL", description: "Aplicacao de defensivo biologico contra lagarta-do-cartucho", timestamp: new Date("2025-03-10") },
      { id: "e5", lotId: "1", type: "FERTILIZATION", description: "Adubacao de cobertura com ureia, 150kg/ha", timestamp: new Date("2025-03-25") },
      { id: "e6", lotId: "1", type: "INSPECTION", description: "Inspecao visual - plantas saudaveis, altura media 1.8m", timestamp: new Date("2025-04-05") },
    ],
  },
  {
    id: "2", name: "Soja", lot: "Lote B1", loteId: "2",
    status: "Plantio", plantingDate: "10 de Marco, 2025", harvestDate: "15 de Julho, 2025",
    area: 30, daysUntilHarvest: 127,
    variety: "M 6210 IPRO", expectedYield: 210, isComplete: false,
    events: [
      { id: "e7", lotId: "2", type: "SOIL_PREPARATION", description: "Calagem corretiva com 2 ton/ha de calcario dolomitico", timestamp: new Date("2025-02-20") },
      { id: "e8", lotId: "2", type: "INPUT_ADDITION", description: "Inoculacao de sementes com Bradyrhizobium japonicum", timestamp: new Date("2025-03-08") },
    ],
  },
  {
    id: "3", name: "Alface", lot: "Lote C2", loteId: "3",
    status: "Colheita", plantingDate: "20 de Fevereiro, 2025", harvestDate: "05 de Abril, 2025",
    area: 15, daysUntilHarvest: 0,
    variety: "Crespa", expectedYield: 45, isComplete: true,
    traceabilityHash: {
      lotId: "3",
      hash: "0xa3f7b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
      generatedAt: new Date("2025-04-06"),
      eventCount: 5,
    },
    events: [
      { id: "e9", lotId: "3", type: "SOIL_PREPARATION", description: "Preparo de canteiros com composto organico incorporado", timestamp: new Date("2025-02-18") },
      { id: "e10", lotId: "3", type: "INPUT_ADDITION", description: "Adubacao organica com composto curtido, 5kg/m2", timestamp: new Date("2025-02-22") },
      { id: "e11", lotId: "3", type: "IRRIGATION", description: "Irrigacao por aspersao - 15 minutos, 2x ao dia", timestamp: new Date("2025-03-01") },
      { id: "e12", lotId: "3", type: "FERTILIZATION", description: "Aplicacao de calcario dolomitico para correcao de pH", timestamp: new Date("2025-03-10") },
      { id: "e13", lotId: "3", type: "INSPECTION", description: "Inspecao de qualidade - folhas saudaveis, sem pragas detectadas", timestamp: new Date("2025-03-25") },
      { id: "e14", lotId: "3", type: "HARVEST", description: "Colheita manual realizada - 42 sacas colhidas com sucesso", timestamp: new Date("2025-04-05") },
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

// Recent Events Preview Component (outside card, max 10 events with pagination)
function RecentEventsPreview({ events, cultivoName, lotName }: { events: TraceabilityEvent[], cultivoName: string, lotName: string }) {
  const [currentPage, setCurrentPage] = useState(0)
  const eventsPerPage = 10
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage)
  const displayedEvents = sortedEvents.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage)

  const eventTypeLabels: Record<string, string> = {
    "INPUT_ADDITION": "Adicao de Insumos",
    "IRRIGATION": "Irrigacao",
    "HARVEST": "Colheita",
    "PEST_CONTROL": "Controle de Pragas",
    "SOIL_PREPARATION": "Preparo do Solo",
    "PRUNING": "Poda",
    "FERTILIZATION": "Adubacao",
    "INSPECTION": "Inspecao",
    "OTHER": "Outro",
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-lg">
        Nenhum evento registrado ainda
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          Eventos Recentes - {cultivoName} ({lotName})
        </h4>
        <Badge variant="outline" className="text-xs">{events.length} eventos</Badge>
      </div>
      
      <div className="border border-border rounded-lg divide-y divide-border">
        {displayedEvents.map((event) => (
          <div key={event.id} className="p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {eventTypeLabels[event.type] || event.type}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {event.description}
                </p>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(event.timestamp).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Pagina {currentPage + 1} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Full Event History with Pagination (inside card, no limit)
function FullEventHistory({ events }: { events: TraceabilityEvent[] }) {
  const [currentPage, setCurrentPage] = useState(0)
  const eventsPerPage = 10
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage)
  const displayedEvents = sortedEvents.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage)

  if (events.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        Nenhum evento registrado
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="border border-border rounded-lg max-h-[400px] overflow-y-auto">
        <TraceabilityTimeline events={displayedEvents} />
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentPage + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
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
                Variedade: {cultivo.variety}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(cultivo.status)}>{cultivo.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Essential Info Only - NO progress bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Plantio
            </p>
            <p className="font-medium text-foreground text-sm">{cultivo.plantingDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Colheita Est.
            </p>
            <p className="font-medium text-foreground text-sm">{cultivo.harvestDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-medium text-foreground text-sm">{cultivo.area} ha</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Eventos</p>
            <p className="font-medium text-foreground text-sm">{events.length} registrados</p>
          </div>
        </div>

        {/* Traceability Hash Indicator */}
        {cultivo.traceabilityHash && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-700">
              Rastreabilidade Finalizada
            </Badge>
            <span className="text-xs text-muted-foreground">
              Hash: {cultivo.traceabilityHash.hash.slice(0, 16)}...
            </span>
          </div>
        )}

        {/* Expand/Collapse Traceability Management */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Ocultar Gerenciamento
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Gerenciar Rastreabilidade
            </>
          )}
        </Button>

        {/* INSIDE CARD: Full traceability management */}
        {expanded && (
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Event Form + Hash Panel */}
              <div className="space-y-6">
                {/* Add New Event */}
                {!isComplete && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Registrar Novo Evento</h4>
                    <TraceabilityEventForm
                      lotId={cultivo.id}
                      onAddEvent={(event) => onAddEvent(cultivo.id, event)}
                      disabled={isComplete}
                    />
                  </div>
                )}

                {/* Hash Panel */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Hash de Rastreabilidade</h4>
                  <TraceabilityHashPanel
                    hash={cultivo.traceabilityHash || null}
                    onGenerate={() => onFinalize(cultivo.id)}
                    canGenerate={events.length > 0 && !isComplete}
                  />
                </div>

                {/* Finish Cultivation Export */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Finalizar Cultivo</h4>
                  <CultivationExport 
                    cultivo={cultivo}
                    farmerName="Joao Paulo"
                    onFinish={() => onFinalize(cultivo.id)}
                  />
                </div>
              </div>

              {/* Right Column: Full Event History (no limit, with pagination) */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Historico Completo de Eventos
                </h4>
                <FullEventHistory events={events} />
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

          {/* OUTSIDE CARDS: Recent Events Preview (max 10 per cultivation) */}
          <div className="space-y-4">
            {cultivos.map((cultivo) => (
              <RecentEventsPreview
                key={`preview-${cultivo.id}`}
                events={cultivo.events || []}
                cultivoName={cultivo.name}
                lotName={cultivo.lot}
              />
            ))}
          </div>

          {/* Cultivation Cards */}
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
