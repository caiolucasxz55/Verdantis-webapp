# Verdantis WebApp

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Blockchain-121D33?style=for-the-badge&logo=blockchain&logoColor=white" alt="Blockchain" />
</div>

## 🌾 Sobre o Projeto

WebApp da **Verdantis** - Sistema completo de rastreabilidade e gestão inteligente para o agronegócio brasileiro. Plataforma integrada com tecnologia blockchain que conecta produtores rurais, cooperativas, processadores e mercado global em uma cadeia transparente e verificável.

**Deploy:** [verdantis-webapp-vits.vercel.app](https://verdantis-webapp-vits.vercel.app/)

## 🎯 Objetivo

Fornecer uma solução end-to-end para rastreabilidade agrícola, permitindo:
- Registro e monitoramento de propriedades rurais
- Certificação digital de práticas sustentáveis
- Gestão de produtos e lotes
- Acesso facilitado a mercados premium (UE e EUA)
- Transparência total da cadeia produtiva (farm-to-market)

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação Multi-perfil
- **Produtor Rural**: Gestão de propriedades e cultivos
- **Cooperativa**: Agregação de produtores e certificações
- **Processador**: Rastreamento de transformação e industrialização
- **Mercado/Exportador**: Acesso a dados de rastreabilidade

### 📊 Dashboard Inteligente
- Métricas de produtividade em tempo real
- Análise de custos e recursos
- Indicadores de sustentabilidade
- Status de certificações ambientais
- Alertas e notificações

### 🗺️ Cadastro e Mapeamento
- Integração com Oracle Spatial para mapeamento preciso
- Geolocalização de propriedades
- Definição de áreas de cultivo
- Registro de recursos hídricos e mata nativa

### 🔗 Rastreabilidade Blockchain
- Registro imutável com Hyperledger Fabric
- ID único para cada produto/lote
- Histórico completo da jornada do produto
- Verificação instantânea de autenticidade

### 📋 Gestão de Certificações
- Certificações ambientais (ISO, Rainforest Alliance, etc.)
- Certificações orgânicas
- Conformidade com regulamentações internacionais
- Renovação e monitoramento automático

### 📈 Relatórios e Analytics
- Relatórios de sustentabilidade
- Análise de performance
- Exportação de dados para auditoria
- Integração com sistemas externos (ERP, contabilidade)

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Componentes**: shadcn/ui
- **State Management**: Zustand / React Context
- **Formulários**: React Hook Form + Zod
- **Gráficos**: Recharts / Chart.js
- **Mapas**: Leaflet / Mapbox

### Backend / Integrações
- **API**: Next.js API Routes / tRPC
- **Database**: PostgreSQL / MongoDB
- **Blockchain**: Hyperledger Fabric
- **Spatial Data**: Oracle Spatial / PostGIS
- **Autenticação**: NextAuth.js / Auth0
- **Storage**: AWS S3 / Vercel Blob

### DevOps
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics
- **Error Tracking**: Sentry

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm
- PostgreSQL (ou acesso ao banco de dados)
- Variáveis de ambiente configuradas

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/verdantis-webapp.git

# Entre no diretório
cd verdantis-webapp

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/verdantis"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Blockchain
HYPERLEDGER_ENDPOINT="https://your-blockchain-node"
HYPERLEDGER_API_KEY="your-api-key"

# Oracle Spatial
ORACLE_SPATIAL_API="your-oracle-api"

# AWS S3 (opcional)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_BUCKET_NAME="verdantis-uploads"
```

### Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

## 📁 Estrutura do Projeto

```
verdantis-webapp/
├── app/
│   ├── (auth)/              # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Área autenticada
│   │   ├── overview/        # Dashboard principal
│   │   ├── properties/      # Gestão de propriedades
│   │   ├── products/        # Gestão de produtos
│   │   ├── certifications/  # Certificações
│   │   ├── traceability/    # Rastreabilidade
│   │   └── analytics/       # Relatórios e análises
│   ├── api/                 # API Routes
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # Componentes base (shadcn/ui)
│   ├── forms/               # Formulários
│   ├── charts/              # Gráficos
│   ├── maps/                # Componentes de mapa
│   └── layout/              # Layout components
├── lib/
│   ├── auth.ts              # Configuração de autenticação
│   ├── db.ts                # Database client
│   ├── blockchain.ts        # Integração blockchain
│   └── utils.ts             # Utilitários
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript types
├── public/                  # Arquivos estáticos
├── prisma/                  # Schema do banco de dados
│   └── schema.prisma
└── next.config.js
```

## 👥 Tipos de Usuários

### 1. Produtor Rural 🌱
- Cadastro de propriedades e talhões
- Registro de plantio e colheita
- Solicitação de certificações
- Visualização de métricas de sustentabilidade

### 2. Cooperativa 🤝
- Agregação de múltiplos produtores
- Gestão coletiva de certificações
- Consolidação de lotes para exportação
- Relatórios consolidados

### 3. Processador 🏭
- Recebimento e transformação de matéria-prima
- Registro de processos industriais
- Manutenção da rastreabilidade pós-processamento
- Integração com sistemas ERP

### 4. Mercado/Exportador 🌍
- Consulta de rastreabilidade de produtos
- Verificação de certificações
- Acesso a relatórios de sustentabilidade
- Portal para compradores internacionais

## 🔒 Segurança

- ✅ Autenticação JWT com NextAuth.js
- ✅ Autorização baseada em roles (RBAC)
- ✅ Proteção CSRF
- ✅ Rate limiting
- ✅ Validação de dados com Zod
- ✅ Sanitização de inputs
- ✅ HTTPS obrigatório em produção

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📱 Responsividade

Interface otimizada para:
- 📱 **Mobile**: < 768px (touch-first)
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: > 1024px (full features)

## 🌐 Internacionalização

Suporte multi-idioma:
- 🇧🇷 Português (padrão)
- 🇺🇸 Inglês
- 🇪🇸 Espanhol

## 📊 Métricas e Monitoramento

- Performance monitoring com Vercel Analytics
- Error tracking com Sentry
- User behavior analytics
- Blockchain transaction monitoring

### Padrões de Código

- ESLint configurado
- Prettier para formatação
- Conventional Commits
- TypeScript strict mode
- Testes obrigatórios para novas features

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🗺️ Roadmap

- [ ] App mobile (React Native)
- [ ] Integração com IoT devices
- [ ] IA para previsão de safra
- [ ] Marketplace integrado
- [ ] API pública para parceiros
- [ ] SDK para desenvolvedores

---

<div align="center">
  <strong>Transformando o agronegócio brasileiro com tecnologia blockchain</strong>
  <br><br>
  Desenvolvido com 💚 pela equipe Verdantis
  <br><br>
  <a href="https://verdantis-webapp-vits.vercel.app/">🌐 Acesse a Plataforma</a> •
  <a href="https://verdantis-landing.vercel.app/">📱 Landing Page</a> •
  <a href="https://docs.verdantis.com.br">📖 Documentação</a>
</div>
