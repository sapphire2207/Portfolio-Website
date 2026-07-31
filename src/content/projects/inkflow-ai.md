# ✒️ Inkflow AI — Autonomous Multi-Agent AI Blog Writer

**Inkflow AI** is an advanced, full-stack, autonomous multi-agent content generation platform. It converts high-level topics into deeply researched, structured, fully illustrated, and professionally formatted technical blog posts in real time.

Powered by **LangGraph**, **FastAPI**, **Mistral AI**, **Tavily Search**, and **Next.js 16**, Inkflow AI orchestrates a team of specialized AI agents that dynamically perform web research, formulate execution blueprints, write sections in parallel, plan visual assets, generate custom illustrations on the fly, and stream progress live to an interactive dark-themed web application.

---

## 🏗️ System Architecture & Workflow

```
                                    ┌────────────────────────────────────────┐
                                    │      Next.js 16 Web Application        │
                                    │    (Zustand State & SSE Listener)      │
                                    └───────────────────┬────────────────────┘
                                                        │
                                      SSE Stream / REST │ POST /blog/stream
                                                        ▼
                                    ┌────────────────────────────────────────┐
                                    │          FastAPI Async Backend         │
                                    │        (Middleware & Static Server)    │
                                    └───────────────────┬────────────────────┘
                                                        │
                                                        ▼
                                    ┌────────────────────────────────────────┐
                                    │       LangGraph Multi-Agent DAG        │
                                    └───────────────────┬────────────────────┘
                                                        │
                                     ┌──────────────────┴──────────────────┐
                                     │                                     │
                                     ▼                                     ▼
                        ┌────────────────────────┐            ┌────────────────────────┐
                        │      Router Agent      │            │     Research Agent     │
                        │ (Mistral AI Reasoning) │            │   (Tavily Search API)  │
                        └────────────┬───────────┘            └────────────┬───────────┘
                                     │                                     │
                                     └──────────────────┬──────────────────┘
                                                        │
                                                        ▼
                                           ┌────────────────────────┐
                                           │   Orchestrator Agent   │
                                           │   (Outline & Strategy) │
                                           └────────────┬───────────┘
                                                        │
                                                        ▼
                                           ┌────────────────────────┐
                                           │ Parallel Worker Agents │
                                           │  (Fan-out Sub-sections)│
                                           └────────────┬───────────┘
                                                        │
                                                        ▼
                                           ┌────────────────────────┐
                                           │    Reducer Subgraph    │
                                           │ ┌────────────────────┐ │
                                           │ │ Merge Markdown     │ │
                                           │ ├────────────────────┤ │
                                           │ │ Decide Images      │ │
                                           │ ├────────────────────┤ │
                                           │ │ Pollinations.ai    │ │
                                           │ └────────────────────┘ │
                                           └────────────┬───────────┘
                                                        │
                                                        ▼
                                           ┌────────────────────────┐
                                           │ Markdown & Image Asset │
                                           │        Export          │
                                           └────────────────────────┘
```

---

## 🌟 Key Concepts & Architectural Highlights

### 1. LangGraph Multi-Agent Orchestration
Instead of relying on a single prompt-response LLM call, Inkflow AI decomposes blog creation into a deterministic state machine managed by **LangGraph** (`StateGraph`):

* **Shared Execution State ([State](file:///c:/Users/sreem/Desktop/inkflow-ai/backend/app/models/state_models.py))**: Tracks topic context, recency parameters, evidence list, writing plan, section outputs, image specs, and final markdown content.
* **Router Agent ([router.py](file:///c:/Users/sreem/Desktop/inkflow-ai/backend/app/graph/nodes/router.py))**: Classifies user queries into execution modes:
  * **Open Book (7-Day Cutoff)**: Used for breaking news and current events. Forces format to `news_roundup`.
  * **Hybrid (45-Day Cutoff)**: Used for ongoing industry developments and tech updates.
  * **Closed Book (3650-Day Cutoff)**: Used for evergreen/educational topics using LLM parametric knowledge.
* **Research Agent ([research.py](file:///c:/Users/sreem/Desktop/inkflow-ai/backend/app/graph/nodes/research.py))**: Executes targeted Tavily web queries in parallel, extracts structured evidence (`EvidencePack`), deduplicates URLs, and filters out stale references based on recency rules.
* **Orchestrator Agent ([orchestrator.py](file:///c:/Users/sreem/Desktop/inkflow-ai/backend/app/graph/nodes/orchestrator.py))**: Acts as the managing editor. Constructs a detailed writing `Plan` defining blog title, target audience, tone, style constraints, and section tasks (`Task`).
* **Worker Agents ([worker.py](file:///c:/Users/sreem/Desktop/inkflow-ai/backend/app/graph/nodes/worker.py))**: Executes section-writing tasks in parallel using LangGraph fan-out routing (`fanout`). Workers strictly adhere to word count targets and cite evidence URLs.
* **Reducer Subgraph ([reducer.py](file:///c:/Users/sreem/Desktop/inkflow-ai/backend/app/graph/reducer.py))**:
  1. `merge_content`: Aggregates and orders drafted sections into a cohesive markdown draft.
  2. `decide_images`: Analyzes text flow and proposes image placements (`GlobalImagePlan`) with visual prompts.
  3. `generate_and_place_images`: Concurrently fetches image binaries from Pollinations.ai, saves them to `output/images/`, updates image tags, and exports the final `.md` file.

---

### 2. ⚡ 3-Tier Resilient SSE Streaming Architecture
The frontend web application communicates with the backend through a 3-tier resilient streaming engine ([api.ts](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/lib/api.ts)):

* **Tier 1 (Live SSE Stream)**: Connects to `/blog/stream` via `text/event-stream` POST request. Parses incoming events in real time to update progress indicators, node step labels, evidence counters, and terminal logs without polling.
* **Tier 2 (Snapshot Recovery)**: If network interruptions terminate the stream prematurely, state is recovered using the last parsed stream payload snapshot.
* **Tier 3 (Batch Rest Fallback)**: If streaming is unsupported or blocked by proxies, the frontend transparently falls back to `POST /blog/generate`.

---

### 3. 🎨 Dark-Themed Next.js 16 Web Workspace
The frontend provides a dark-themed user interface:
* **Interactive Generation Suite**: Real-time progress tracker ([ProgressTracker.tsx](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/components/generation/ProgressTracker.tsx)) and live terminal log stream ([EventLog.tsx](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/components/generation/EventLog.tsx)).
* **Multi-Tab Workspace**:
  * **Blog Reader**: Renders styled GitHub-flavored markdown with code syntax highlighting and resolved image URLs ([BlogRenderer.tsx](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/components/reader/BlogRenderer.tsx)).
  * **Plan Blueprint**: Displays multi-agent task breakdown, target word counts, and audience strategy ([PlanPanel.tsx](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/components/reader/PlanPanel.tsx)).
  * **Evidence Panel**: Interactive list of research web sources and citations ([EvidencePanel.tsx](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/components/reader/EvidencePanel.tsx)).
  * **Gallery & Image Specs**: Image grid browser and raw prompt JSON inspector.
  * **ZIP Bundle Export**: One-click export bundling markdown and local image assets into a `.zip` archive using `JSZip` ([ExportMenu.tsx](file:///c:/Users/sreem/Desktop/inkflow-ai/frontend/components/reader/ExportMenu.tsx)).

---

## 📁 Repository Structure

```
inkflow-ai/
├── backend/                     # FastAPI & LangGraph Python Engine
│   ├── app/
│   │   ├── api/                 # REST routes (/generate, /stream) & schemas
│   │   ├── config/              # App settings & LLM initialization (Mistral AI)
│   │   ├── graph/               # LangGraph DAG (router, research, orchestrator, worker, reducer)
│   │   ├── models/              # Pydantic state & data domain models
│   │   ├── prompts/             # System prompts for AI agents
│   │   ├── services/            # File I/O, Tavily search, Pollinations.ai image generator
│   │   └── main.py              # FastAPI entry point & CORS configuration
│   ├── output/                  # Generated .md blogs & output/images directory
│   ├── .env                     # Environment variables (API Keys)
│   ├── requirements.txt         # Python backend dependencies
│   └── README.md                # Detailed Backend Documentation
├── frontend/                    # Next.js 16 Web Application
│   ├── app/                     # App Router pages & layout
│   ├── components/              # UI components (Generation, Reader, Layout)
│   ├── lib/                     # Zustand store, API SSE client, Export utilities
│   ├── package.json             # Frontend Node dependencies
│   └── README.md                # Detailed Frontend Documentation
└── README.md                    # Root Project Documentation
```

---

## 🛠️ Tech Stack & Key Libraries

| Component | Stack / Library | Key Purpose |
| :--- | :--- | :--- |
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) + Uvicorn | High-performance async REST & streaming web server |
| **Agentic Framework** | [LangGraph](https://langchain-ai.github.io/langgraph/) + [LangChain](https://www.langchain.com/) | Stateful multi-agent workflow orchestration & DAG execution |
| **LLM Provider** | [Mistral AI](https://mistral.ai/) (`mistral-medium-latest`) | Reasoning, planning, evidence synthesis, and content generation |
| **Web Research** | [Tavily Search API](https://tavily.com/) | Real-time web research and citation extraction |
| **Image Synthesis** | [Pollinations.ai](https://pollinations.ai/) | Contextual AI image generation REST API |
| **Frontend Framework**| [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/) | SSR/CSR web framework |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) | Global reactive state store |
| **Styling & Motion** | [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion 12](https://www.framer.com/motion/) | Dark-themed UI and smooth animations |
| **Markdown Processing**| `react-markdown` + `remark-gfm` | GitHub-flavored markdown rendering |
| **File Archiving** | `jszip` + `date-fns` | Client-side ZIP bundle packaging |

---

## 🚀 Quickstart Guide

### Prerequisites
* **Python 3.10+**
* **Node.js 18+**
* Valid API Keys for **Mistral AI** and **Tavily**

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file in backend/ root
cat <<EOT > .env
MISTRAL_API_KEY=your_mistral_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
EOT

# Start FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
Backend API will be running at: **`http://localhost:8000`** (Swagger docs at `http://localhost:8000/docs`).

---

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file in frontend/ root
cat <<EOT > .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
EOT

# Start Next.js development server
npm run dev
```
Frontend web application will be accessible at: **`http://localhost:3000`**.

---

## 📡 API Endpoints Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /` | `GET` | API Health Check. |
| `POST /blog/stream` | `POST` | **Server-Sent Events (SSE)** endpoint. Streams live LangGraph node updates and final result payload. |
| `POST /blog/generate` | `POST` | Synchronous REST endpoint. Runs the graph to completion and returns full blog JSON payload. |

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for details.
