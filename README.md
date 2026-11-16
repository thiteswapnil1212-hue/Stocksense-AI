# Stocksense-AI

An **AI assistant for trading** — market data, AI-driven insights and interactive charts in one Next.js app.

Live demo: https://stocksense-ai-thiteswapnil1212-hues-projects.vercel.app/

## What it does

- **Market data** via `yahoo-finance2` (quotes, history)
- **AI assistance** via the OpenAI SDK — ask questions about stocks and strategies
- **Interactive charts** with Recharts
- **Persistence** — `better-sqlite3` locally, Upstash Redis for shared state
- **Validated inputs** with Zod/Yup, animated UI with Framer Motion

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v3 · OpenAI SDK · yahoo-finance2 · Recharts · better-sqlite3 · Upstash Redis · Zod/Yup · Framer Motion

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Configure API keys (OpenAI, Upstash) in `.env.local` before running.

## Architecture

```mermaid
flowchart LR
    User([Trader]) --> App["Next.js 15 app<br/>app/ + components/"]
    App --> YF["yahoo-finance2<br/>quotes · history"]
    App --> AI["OpenAI SDK<br/>AI insights · Q&A"]
    App --> Charts["Recharts<br/>interactive charts · 3D view"]
    App --> Store["Persistence<br/>better-sqlite3 local · Upstash Redis"]
```

## Disclaimer

Educational project — not financial advice. Market data may be delayed; verify before making decisions.
