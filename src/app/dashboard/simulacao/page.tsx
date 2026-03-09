"use client"

import { useState, useCallback } from "react"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Badge } from "@/src/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Checkbox } from "@/src/components/ui/checkbox"
import { 
  Calculator, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  BarChart3,
  Target,
  Scale,
  History,
  ArrowRight,
  RefreshCw
} from "lucide-react"
import type { SimulationScenario, SimulationResult, SimulationLot } from "@/src/types"

// Existing lots from the system
const existingLots = [
  { id: "1", name: "Lote A1", crop: "Milho", area: 25 },
  { id: "2", name: "Lote B2", crop: "Soja", area: 30 },
  { id: "3", name: "Lote C3", crop: "Cafe", area: 15 },
  { id: "4", name: "Lote D4", crop: "Trigo", area: 20 },
  { id: "5", name: "Lote E5", crop: "Milho", area: 35 },
  { id: "6", name: "Lote F6", crop: "Alface", area: 10 },
]

const crops = ["Milho", "Soja", "Cafe", "Trigo", "Arroz", "Feijao", "Algodao", "Alface"]

interface ScenarioFormData {
  name: string
  useExistingLot: boolean
  existingLotId: string
  tempLotName: string
  tempLotCrop: string
  tempLotArea: number
  estimatedYield: number
  estimatedPrice: number
  laborCost: number
  inputCost: number
  otherCosts: number
}

const initialFormData: ScenarioFormData = {
  name: "",
  useExistingLot: true,
  existingLotId: "",
  tempLotName: "",
  tempLotCrop: "",
  tempLotArea: 0,
  estimatedYield: 0,
  estimatedPrice: 0,
  laborCost: 0,
  inputCost: 0,
  otherCosts: 0,
}

function calculateSimulation(scenario: SimulationScenario): SimulationResult {
  const totalProduction = scenario.estimatedYield * scenario.lot.area
  const totalRevenue = totalProduction * scenario.estimatedPrice
  const totalCost = scenario.laborCost + scenario.inputCost + scenario.otherCosts
  const profit = totalRevenue - totalCost
  const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0
  const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
  const breakEvenPrice = totalProduction > 0 ? totalCost / totalProduction : 0
  const breakEvenYield = scenario.estimatedPrice > 0 && scenario.lot.area > 0 
    ? totalCost / (scenario.estimatedPrice * scenario.lot.area) 
    : 0

  return {
    id: crypto.randomUUID(),
    scenario,
    totalRevenue,
    totalCost,
    profit,
    margin,
    roi,
    breakEvenPrice,
    breakEvenYield,
  }
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

// Simulation Form Component
function SimulationForm({ 
  formData, 
  setFormData, 
  onSubmit,
  formTitle = "Cenario 1"
}: { 
  formData: ScenarioFormData
  setFormData: (data: ScenarioFormData) => void
  onSubmit: () => void
  formTitle?: string
}) {
  const selectedExistingLot = existingLots.find(l => l.id === formData.existingLotId)
  const showLotDetails = formData.useExistingLot ? !!selectedExistingLot : (formData.tempLotArea > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          {formTitle}
        </CardTitle>
        <CardDescription>Configure os parametros da simulacao</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Name */}
        <div className="space-y-2">
          <Label htmlFor="scenario-name">Nome do Cenario</Label>
          <Input
            id="scenario-name"
            placeholder="Ex: Cenario Otimista"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Lot Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="use-existing"
              checked={formData.useExistingLot}
              onCheckedChange={(checked) => setFormData({ 
                ...formData, 
                useExistingLot: checked as boolean,
                existingLotId: "",
                tempLotName: "",
                tempLotCrop: "",
                tempLotArea: 0
              })}
            />
            <Label htmlFor="use-existing" className="text-sm cursor-pointer">
              Usar lote existente
            </Label>
          </div>

          {formData.useExistingLot ? (
            <div className="space-y-2">
              <Label>Selecionar Lote</Label>
              <Select 
                value={formData.existingLotId} 
                onValueChange={(v) => setFormData({ ...formData, existingLotId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um lote" />
                </SelectTrigger>
                <SelectContent>
                  {existingLots.map((lot) => (
                    <SelectItem key={lot.id} value={lot.id}>
                      {lot.name} - {lot.crop} ({lot.area} ha)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-4 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm font-medium text-foreground">Lote Temporario (apenas para simulacao)</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temp-lot-name">Nome</Label>
                  <Input
                    id="temp-lot-name"
                    placeholder="Ex: Lote Teste"
                    value={formData.tempLotName}
                    onChange={(e) => setFormData({ ...formData, tempLotName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cultura</Label>
                  <Select 
                    value={formData.tempLotCrop} 
                    onValueChange={(v) => setFormData({ ...formData, tempLotCrop: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp-lot-area">Area (ha)</Label>
                  <Input
                    id="temp-lot-area"
                    type="number"
                    placeholder="0"
                    value={formData.tempLotArea || ""}
                    onChange={(e) => setFormData({ ...formData, tempLotArea: Number(e.target.value) })}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Production Parameters - Only show after lot selection */}
        {showLotDetails && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground">Parametros de Producao</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yield">Produtividade Estimada (sc/ha)</Label>
                <Input
                  id="yield"
                  type="number"
                  placeholder="Ex: 180"
                  value={formData.estimatedYield || ""}
                  onChange={(e) => setFormData({ ...formData, estimatedYield: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preco Estimado (R$/sc)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Ex: 85.00"
                  value={formData.estimatedPrice || ""}
                  onChange={(e) => setFormData({ ...formData, estimatedPrice: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <h4 className="text-sm font-semibold text-foreground pt-2">Custos Estimados</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labor">Mao de Obra (R$)</Label>
                <Input
                  id="labor"
                  type="number"
                  placeholder="0"
                  value={formData.laborCost || ""}
                  onChange={(e) => setFormData({ ...formData, laborCost: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inputs">Insumos (R$)</Label>
                <Input
                  id="inputs"
                  type="number"
                  placeholder="0"
                  value={formData.inputCost || ""}
                  onChange={(e) => setFormData({ ...formData, inputCost: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other">Outros Custos (R$)</Label>
                <Input
                  id="other"
                  type="number"
                  placeholder="0"
                  value={formData.otherCosts || ""}
                  onChange={(e) => setFormData({ ...formData, otherCosts: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={onSubmit} 
          className="w-full"
          disabled={!showLotDetails || formData.estimatedYield <= 0 || formData.estimatedPrice <= 0}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calcular Simulacao
        </Button>
      </CardContent>
    </Card>
  )
}

// Result Card Component
function ResultCard({ result, onRemove }: { result: SimulationResult; onRemove: () => void }) {
  const isProfitable = result.profit >= 0

  return (
    <Card className={isProfitable ? "border-green-500/30" : "border-red-500/30"}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{result.scenario.name || "Simulacao"}</CardTitle>
            <CardDescription>
              {result.scenario.lot.name} - {result.scenario.lot.crop} ({result.scenario.lot.area} ha)
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8 text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Receita Total</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(result.totalRevenue)}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Custo Total</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(result.totalCost)}</p>
          </div>
          <div className={`text-center p-3 rounded-lg ${isProfitable ? "bg-green-500/10" : "bg-red-500/10"}`}>
            <p className="text-xs text-muted-foreground mb-1">Lucro</p>
            <p className={`text-lg font-bold ${isProfitable ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(result.profit)}
            </p>
          </div>
        </div>

        {/* Decision metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Margem de Lucro</p>
              <p className={`font-semibold ${result.margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                {result.margin.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">ROI</p>
              <p className={`font-semibold ${result.roi >= 0 ? "text-green-600" : "text-red-600"}`}>
                {result.roi.toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Preco de Equilibrio</p>
              <p className="font-semibold text-foreground">{formatCurrency(result.breakEvenPrice)}/sc</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Produtividade Min.</p>
              <p className="font-semibold text-foreground">{result.breakEvenYield.toFixed(1)} sc/ha</p>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`p-3 rounded-lg ${isProfitable ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"}`}>
          <p className={`text-sm ${isProfitable ? "text-green-700" : "text-red-700"}`}>
            {isProfitable 
              ? `Cenario viavel com margem de ${result.margin.toFixed(1)}%. ROI de ${result.roi.toFixed(1)}%.`
              : `Cenario com prejuizo projetado. Considere reduzir custos ou aumentar preco/produtividade.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// History Card Component
function HistoryCard({ result }: { result: SimulationResult }) {
  const isProfitable = result.profit >= 0
  const createdAt = result.scenario.createdAt ? new Date(result.scenario.createdAt) : new Date()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-medium text-foreground">{result.scenario.name || "Simulacao"}</p>
            <p className="text-xs text-muted-foreground">
              {result.scenario.lot.name} - {result.scenario.lot.crop}
            </p>
          </div>
          <Badge 
            variant="outline" 
            className={isProfitable 
              ? "border-green-500/30 bg-green-500/10 text-green-700"
              : "border-red-500/30 bg-red-500/10 text-red-700"
            }
          >
            {isProfitable ? "Viavel" : "Inviavel"}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Lucro</p>
            <p className={`text-sm font-semibold ${isProfitable ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(result.profit)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Margem</p>
            <p className="text-sm font-semibold text-foreground">{result.margin.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ROI</p>
            <p className="text-sm font-semibold text-foreground">{result.roi.toFixed(1)}%</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-right">
          {createdAt.toLocaleDateString("pt-BR")} - {createdAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </CardContent>
    </Card>
  )
}

export default function SimulacaoPage() {
  const [formData1, setFormData1] = useState<ScenarioFormData>({ ...initialFormData, name: "Cenario 1" })
  const [formData2, setFormData2] = useState<ScenarioFormData>({ ...initialFormData, name: "Cenario 2" })
  const [results, setResults] = useState<SimulationResult[]>([])
  const [history, setHistory] = useState<SimulationResult[]>([])

  const createScenarioFromForm = (formData: ScenarioFormData): SimulationScenario => {
    let lot: SimulationLot

    if (formData.useExistingLot) {
      const existingLot = existingLots.find(l => l.id === formData.existingLotId)!
      lot = {
        id: existingLot.id,
        name: existingLot.name,
        isTemporary: false,
        area: existingLot.area,
        crop: existingLot.crop,
      }
    } else {
      lot = {
        id: crypto.randomUUID(),
        name: formData.tempLotName || "Lote Temporario",
        isTemporary: true,
        area: formData.tempLotArea,
        crop: formData.tempLotCrop,
      }
    }

    return {
      id: crypto.randomUUID(),
      name: formData.name,
      lot,
      estimatedYield: formData.estimatedYield,
      estimatedPrice: formData.estimatedPrice,
      estimatedCost: formData.laborCost + formData.inputCost + formData.otherCosts,
      laborCost: formData.laborCost,
      inputCost: formData.inputCost,
      otherCosts: formData.otherCosts,
      createdAt: new Date(),
    }
  }

  const handleSubmit1 = useCallback(() => {
    const scenario = createScenarioFromForm(formData1)
    const result = calculateSimulation(scenario)
    setResults(prev => {
      const newResults = prev.filter(r => r.scenario.name !== formData1.name)
      return [...newResults, result]
    })
    setHistory(prev => [result, ...prev])
  }, [formData1])

  const handleSubmit2 = useCallback(() => {
    const scenario = createScenarioFromForm(formData2)
    const result = calculateSimulation(scenario)
    setResults(prev => {
      const newResults = prev.filter(r => r.scenario.name !== formData2.name)
      return [...newResults, result]
    })
    setHistory(prev => [result, ...prev])
  }, [formData2])

  const handleRemoveResult = useCallback((id: string) => {
    setResults(prev => prev.filter(r => r.id !== id))
  }, [])

  const handleClearResults = useCallback(() => {
    setResults([])
  }, [])

  return (
    <>
      <Topbar title="Simulacoes" description="Projete cenarios e compare resultados" />
      <PageContainer>
        <div className="space-y-6">
          {/* Introduction */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Simulador de Cenarios</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare diferentes cenarios de producao para tomar decisoes mais assertivas. 
                    Voce pode usar lotes existentes ou criar lotes temporarios apenas para simulacao.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Forms Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimulationForm 
              formData={formData1}
              setFormData={setFormData1}
              onSubmit={handleSubmit1}
              formTitle="Cenario 1"
            />
            <SimulationForm 
              formData={formData2}
              setFormData={setFormData2}
              onSubmit={handleSubmit2}
              formTitle="Cenario 2"
            />
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Resultados da Simulacao
                </h3>
                <Button variant="outline" size="sm" onClick={handleClearResults}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Limpar Resultados
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {results.map((result) => (
                  <ResultCard 
                    key={result.id} 
                    result={result} 
                    onRemove={() => handleRemoveResult(result.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* History Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Historico de Simulacoes
              </CardTitle>
              <CardDescription>
                Todas as simulacoes realizadas nesta sessao
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((result) => (
                    <HistoryCard key={result.id} result={result} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <Calculator className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Nenhuma simulacao realizada ainda</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Preencha os formularios acima e clique em "Calcular Simulacao"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
