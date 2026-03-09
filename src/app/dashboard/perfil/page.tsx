"use client"

import { useState } from "react"
import { Topbar } from "@/src/components/topbar"
import { PageContainer } from "@/src/components/page-container"
import { StatCard } from "@/src/components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AppButton } from "@/src/components/app-button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, Edit, Grid3x3, Sprout } from "lucide-react"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <Topbar title="Perfil" description="Gerencie suas informacoes pessoais" />
      <PageContainer>
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="flex flex-col items-center pt-8 pb-6 gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">JP</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground">Joao Pedro Silva</h3>
                  <p className="text-sm text-muted-foreground">Produtor Rural</p>
                  <Badge className="mt-2 border-green-500/30 bg-green-500/10 text-green-700" variant="outline">
                    Conta Verificada
                  </Badge>
                </div>
                <AppButton variant="secondary" size="md" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Alterar Foto
                </AppButton>
              </CardContent>
            </Card>

            {/* Details Card */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Dados Pessoais</CardTitle>
                  <CardDescription>Atualize suas informacoes de contato</CardDescription>
                </div>
                <AppButton
                  variant={isEditing ? "primary" : "secondary"}
                  size="md"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Salvar" : "Editar"}
                </AppButton>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Input id="name" defaultValue="Joao Pedro Silva" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Input id="email" type="email" defaultValue="joao.silva@email.com" disabled={!isEditing} />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Input id="phone" defaultValue="(11) 98765-4321" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joined">Membro desde</Label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Input id="joined" defaultValue="Janeiro 2024" disabled />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereco</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Input id="address" defaultValue="Zona Rural, Sao Paulo - SP" disabled={!isEditing} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Sobre</Label>
                  <Textarea
                    id="bio"
                    placeholder="Conte um pouco sobre voce..."
                    defaultValue="Produtor rural com 15 anos de experiencia em agricultura sustentavel."
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard
              title="Lotes Ativos"
              value="12"
              icon={<Grid3x3 className="h-5 w-5 text-primary" />}
              description="Distribuidos em 3 fazendas"
            />
            <StatCard
              title="Cultivos em Andamento"
              value="8"
              icon={<Sprout className="h-5 w-5 text-primary" />}
              description="Em diferentes estagios"
            />
            <StatCard
              title="Lucro Acumulado"
              value="R$ 20.175"
              icon={<User className="h-5 w-5 text-primary" />}
              variant="success"
              description="Safra atual"
            />
          </div>
        </div>
      </PageContainer>
    </>
  )
}
