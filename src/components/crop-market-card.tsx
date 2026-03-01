import Image from "next/image"
import { Card, CardContent } from "@/src/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/src/lib/utils"
import type { CropMarketData } from "@/src/types"

const trendConfig = {
  up: {
    icon: TrendingUp,
    label: "Em alta",
    color: "text-green-600",
    bg: "bg-green-500/10",
  },
  down: {
    icon: TrendingDown,
    label: "Em baixa",
    color: "text-red-600",
    bg: "bg-red-500/10",
  },
  stable: {
    icon: Minus,
    label: "Estavel",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
}

export function CropMarketCard({ name, imageUrl, pricePerSack, priceTrend }: CropMarketData) {
  const trend = trendConfig[priceTrend]
  const TrendIcon = trend.icon

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-28 w-full">
        <Image
          src={imageUrl}
          alt={`Imagem de ${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <p className="text-white font-semibold text-sm drop-shadow-md">{name}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Preco / saca</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(pricePerSack)}</p>
          </div>
          <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", trend.bg, trend.color)}>
            <TrendIcon className="h-3 w-3" />
            {trend.label}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
