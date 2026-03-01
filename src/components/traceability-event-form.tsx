"use client"

import type React from "react"
import { useState } from "react"
import { AppButton } from "@/src/components/app-button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import { Plus } from "lucide-react"
import type { TraceabilityEvent, TraceabilityEventType } from "@/src/types"

const eventTypes: { value: TraceabilityEventType; label: string }[] = [
  { value: "INPUT_ADDITION", label: "Adicao de Insumo" },
  { value: "IRRIGATION", label: "Irrigacao Especial" },
  { value: "HARVEST", label: "Colheita" },
  { value: "OTHER", label: "Outro Evento" },
]

interface TraceabilityEventFormProps {
  lotId: string
  onAddEvent: (event: TraceabilityEvent) => void
  disabled?: boolean
}

export function TraceabilityEventForm({ lotId, onAddEvent, disabled = false }: TraceabilityEventFormProps) {
  const [type, setType] = useState<TraceabilityEventType>("INPUT_ADDITION")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    const event: TraceabilityEvent = {
      id: crypto.randomUUID(),
      lotId,
      type,
      description: description.trim(),
      timestamp: new Date(),
    }

    onAddEvent(event)
    setDescription("")
    setType("INPUT_ADDITION")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Tipo de Evento</Label>
        <Select value={type} onValueChange={(v) => setType(v as TraceabilityEventType)} disabled={disabled}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((et) => (
              <SelectItem key={et.value} value={et.value}>{et.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="event-description">Descricao</Label>
        <Textarea
          id="event-description"
          placeholder="Descreva o evento de cultivo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          disabled={disabled}
          required
        />
      </div>

      <AppButton
        type="submit"
        variant="primary"
        size="lg"
        disabled={disabled || !description.trim()}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Registrar Evento
      </AppButton>
    </form>
  )
}
