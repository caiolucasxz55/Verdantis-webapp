"use client"

import type React from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Leaf, ArrowRight, CheckCircle2, Shield } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (formData.password === formData.confirmPassword) {
      router.push("/dashboard")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
                Crie sua <span className="text-primary">conta</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Comece a controlar a lucratividade dos seus lotes e tome decisoes melhores para a sua producao.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: CheckCircle2, title: "Cadastro gratuito", desc: "Comece sem custos iniciais" },
                { icon: Shield, title: "Dados protegidos", desc: "Seguranca e privacidade garantidas" },
                { icon: Leaf, title: "Suporte completo", desc: "Equipe dedicada ao seu sucesso" },
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

          {/* Right Side - Register Form */}
          <Card className="p-8 shadow-xl border-border/50">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Criar Conta</h2>
                <p className="text-sm text-muted-foreground">Preencha os dados para comecar</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Joao Silva"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Repita a senha"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1 rounded border-border" />
                  <span className="text-sm text-muted-foreground">
                    Concordo com os{" "}
                    <a href="#" className="text-primary hover:underline">termos de uso</a>{" "}
                    e{" "}
                    <a href="#" className="text-primary hover:underline">politica de privacidade</a>
                  </span>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Criar minha conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Ja tem uma conta?{" "}
                <Link href="/" className="text-primary hover:underline font-medium">
                  Faca login
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
