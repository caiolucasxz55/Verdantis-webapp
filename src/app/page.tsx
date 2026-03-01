"use client"

import type React from "react"
import Link from "next/link"
import { AppButton } from "@/src/components/app-button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Leaf, ArrowRight, TrendingUp, BarChart3, Shield } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BackgroundOverlayLayout } from "@/src/components/background-overlay-layout"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <BackgroundOverlayLayout>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Verdantis</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-balance leading-[1.1] text-white">
              Gerencie sua fazenda com <span className="text-green-400">inteligencia</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed text-pretty">
              Controle lotes, cultivos, custos e lucratividade em uma plataforma feita para o produtor rural.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: TrendingUp,
                title: "Lucratividade em tempo real",
                desc: "Acompanhe lucro, receita e custos por lote",
              },
              {
                icon: BarChart3,
                title: "Analytics de performance",
                desc: "Graficos comparativos para decisoes rapidas",
              },
              {
                icon: Shield,
                title: "Rastreabilidade completa",
                desc: "Hash de verificacao e timeline de eventos",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="text-sm text-white/60">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 shadow-2xl border-border/50 bg-card/95 backdrop-blur-md">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Entrar</h2>
              <p className="text-sm text-muted-foreground">Acesse o painel da sua fazenda</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Lembrar de mim</span>
                </label>
                <a href="#" className="text-primary hover:underline font-medium">
                  Esqueceu a senha?
                </a>
              </div>

              <AppButton type="submit" variant="primary" size="lg" className="w-full">
                Entrar no painel
                <ArrowRight className="ml-2 h-4 w-4" />
              </AppButton>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Ainda nao tem conta?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Cadastre-se gratuitamente
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </BackgroundOverlayLayout>
  )
}
