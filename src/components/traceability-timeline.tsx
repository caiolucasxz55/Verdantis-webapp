"use client"

import { cn } from "@/src/lib/utils"
import { Droplets, Leaf, Scissors, MoreHorizontal } from "lucide-react"
import type { TraceabilityEvent } from "@/src/types"

const eventTypeConfig: Record<TraceabilityEvent["type"], { icon: typeof Leaf; label: string; color: string }> = {
  INPUT_ADDITION: { icon: Leaf, label: "Adicao de Insumo", color: "text-green-600 bg-green-500/10 border-green-500/30" },
  IRRIGATION: { icon: Droplets, label: "Irrigacao Especial", color: "text-blue-600 bg-blue-500/10 border-blue-500/30" },
  HARVEST: { icon: Scissors, label: "Colheita", color: "text-amber-600 bg-amber-500/10 border-amber-500/30" },
  OTHER: { icon: MoreHorizontal, label: "Outro Evento", color: "text-muted-foreground bg-muted border-border" },
}

interface TraceabilityTimelineProps {
  events: TraceabilityEvent[]
}

export function TraceabilityTimeline({ events }: TraceabilityTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <Leaf className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Nenhum evento registrado ainda</p>
        <p className="text-xs text-muted-foreground mt-1">Adicione eventos de cultivo para construir a rastreabilidade</p>
      </div>
    )
  }

  return (
    <div className="relative space-y-0">
      {/* Vertical line */}
      <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />

      {events.map((event, index) => {
        const config = eventTypeConfig[event.type]
        const Icon = config.icon
        const date = new Date(event.timestamp)

        return (
          <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Dot */}
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                config.color
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{config.label}</p>
                <time className="text-xs text-muted-foreground">
                  {date.toLocaleDateString("pt-BR")} - {date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </time>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
