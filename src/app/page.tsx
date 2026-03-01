"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Leaf, ArrowRight, TrendingUp, BarChart3, Shield } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/farmland-background.jpg')] bg-cover bg-center opacity-[0.03]" />

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground tracking-tight">Verdantis</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-balance leading-[1.1] text-foreground">
                Gerencie sua fazenda com <span className="text-primary">inteligencia</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
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
                  title: "Dados seguros",
                  desc: "Suas informacoes protegidas e acessiveis",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="p-8 shadow-xl border-border/50">
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
                    className="h-11"
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
                    className="h-11"
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

                <Button type="submit" size="lg" className="w-full">
                  Entrar no painel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
      </div>
    </div>
  )
}
