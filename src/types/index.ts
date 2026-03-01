// User Role Type - Only Farmer
export type UserRole = "produtor"

// Lot Interface with profitability
export interface Lote {
  id: string
  name: string
  crop: string
  expectedProduction: number
  actualProduction: number
  estimatedCost: number
  actualCost: number
  salePrice: number
  revenue: number
  profit: number
  margin: number
  status: "Ativo" | "Finalizado" | "Em Preparo"
  propertyName: string
}

// KPI Card Props
export interface KpiCardProps {
  title: string
  value: string
  description?: string
  icon: React.ReactNode
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "success" | "danger" | "warning"
}

// Stat Card Props
export interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  description?: string
  variant?: "default" | "success" | "danger"
}

// Chart Card Props
export interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

// Lot Form Data
export interface LoteFormData {
  name: string
  crop: string
  expectedProduction: number
  actualProduction: number
  estimatedCost: number
  actualCost: number
  salePrice: number
}

// Crop Data Interface
export type CropStatus = "Em Crescimento" | "Plantio" | "Pronto" | "Colheita"

export interface CropData {
  id: string
  name: string
  lot: string
  farm: string
  status: CropStatus
  plantingDate: string
  harvestDate: string
  area: number
  daysUntilHarvest: number
  progress: number
  irrigation: boolean
  weather: boolean
}

// Cultivo (Cultivation) Interface
export interface Cultivo extends CropData {
  loteId: string
  propertyId: string
  variety: string
  expectedYield: number
  actualYield?: number
  notes?: string
}

export interface CultivoFormData {
  name: string
  loteId: string
  propertyId: string
  variety: string
  plantingDate: string
  harvestDate: string
  area: number
  expectedYield: number
  notes?: string
}

// Chart Data Types
export interface ProfitByLotData {
  name: string
  lucro: number
  custo: number
  receita: number
}

export interface ProfitOverTimeData {
  month: string
  lucro: number
}

export interface ProfitByCropData {
  crop: string
  lucro: number
}

// Profile
export interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  memberSince: string
}
