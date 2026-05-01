'use client'

import { useState } from 'react'
import {
  Button, Input, Checkbox, Badge, Tooltip,
  Navbar, Breadcrumbs, TabSwitcher, CommandPalette, Sidebar,
  DataTable, ProgressBar, SkeletonCard, Modal,
  BentoGrid, BentoCell, Accordion, RangeSlider, Stepper,
  Card, CardHeader, CardBody, CardFooter, BlueprintCard,
  useToast, ThemeToggle,
} from '@/components'
import type { Column } from '@/components'


/* ─── ICONS ─────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
  </svg>
)
const TerminalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 4l4 3-4 3M7 10h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
  </svg>
)
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8" y="1" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="1" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="8" y="8" width="5" height="5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const LayersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1L13 4.5L7 8L1 4.5L7 1Z" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 7.5L7 11L13 7.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const BoltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M8 1L3 8h4l-1 5 5-7H7L8 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)
const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
  </svg>
)
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 9V1h8" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
  </svg>
)

/* ─── SECTION WRAPPER ───────────────────────────────── */
function Section({ id, tag, title, children, toggle }: {
  id: string; tag: string; title: string; children: React.ReactNode; toggle?: React.ReactNode
}) {
  return (
    <section id={id} style={{ padding: '80px 0', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--color-accent)', marginBottom: 8 }}>{tag}</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-fg)', lineHeight: 1.1 }}>{title}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {toggle}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.06em' }}>{id.toUpperCase()}</span>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

/* ─── GRID ──────────────────────────────────────────── */
function Grid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1, background: 'var(--color-border)', border: '1px solid var(--color-border)' }}>
      {children}
    </div>
  )
}

/* ─── FRAME ─────────────────────────────────────────── */
function Frame({ label, hint, children, span }: {
  label: string; hint?: string; children: React.ReactNode; dark?: boolean; span?: boolean
}) {
  return (
    <div style={{ gridColumn: span ? '1 / -1' : undefined, background: 'var(--color-bg)' }}>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-surface)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-fg-subtle)' }}>{label}</span>
        {hint && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-fg-subtle)', opacity: 0.6 }}>{hint}</span>}
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  )
}

/* ─── CODE SNIPPET ──────────────────────────────────── */
function CodeSnip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ position: 'relative', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)', lineHeight: 1.6 }}>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: '1px solid var(--color-border)', color: copied ? 'var(--color-accent)' : 'var(--color-fg-subtle)', cursor: 'pointer', padding: '3px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, display: 'flex', alignItems: 'center', gap: 4 }}
        aria-label="Copy code"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? 'COPIED' : 'COPY'}
      </button>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' as const }}>{code}</pre>
    </div>
  )
}

/* ─── TABLE DATA ────────────────────────────────────── */
type BuildRow = { module: string; status: string; size: string; time: string; env: string }

const tableData: BuildRow[] = [
  { module: 'Button.tsx',      status: 'PASS', size: '2.1 kB', time: '12ms', env: 'prod' },
  { module: 'DataTable.tsx',   status: 'PASS', size: '4.8 kB', time: '31ms', env: 'prod' },
  { module: 'CommandPalette',  status: 'PASS', size: '5.2 kB', time: '28ms', env: 'prod' },
  { module: 'Modal.tsx',       status: 'WARN', size: '3.4 kB', time: '19ms', env: 'dev'  },
  { module: 'RangeSlider.tsx', status: 'PASS', size: '1.9 kB', time: '9ms',  env: 'prod' },
]

const tableColumns: Column<BuildRow>[] = [
  { key: 'module', header: 'Module', sortable: true, mono: true, render: (v) => <span style={{ color: 'var(--color-fg)' }}>{String(v)}</span> },
  { key: 'status', header: 'Status', sortable: true, render: (v) => <Badge variant={v === 'PASS' ? 'success' : 'warning'} size="sm">{String(v)}</Badge> },
  { key: 'size',   header: 'Size',   sortable: true, mono: true },
  { key: 'time',   header: 'Build',  sortable: true, mono: true },
  { key: 'env',    header: 'Env',    render: (v) => <Badge variant={v === 'prod' ? 'accent' : 'default'} size="sm">{String(v)}</Badge> },
]

/* ─── MAIN ──────────────────────────────────────────── */
export default function ShowcasePage() {
  const { toast } = useToast()
  const [cmdOpen,    setCmdOpen]    = useState(false)
  const [modalOpen,  setModalOpen]  = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [sliderVal,  setSliderVal]  = useState(64)
  const [stepperStep, setStepperStep] = useState(1)
  const [checked,    setChecked]    = useState(false)

  const triggerLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({ type: 'success', title: 'Build complete', description: '20 components compiled in 847ms' })
    }, 2000)
  }

  const cmdItems = [
    { id: '1', label: 'Foundations',    group: 'Navigate', icon: <GridIcon />,    kbd: 'G F', action: () => document.getElementById('foundations')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: '2', label: 'Navigation',     group: 'Navigate', icon: <LayersIcon />,  kbd: 'G N', action: () => document.getElementById('navigation')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: '3', label: 'Data',           group: 'Navigate', icon: <TerminalIcon />,kbd: 'G D', action: () => document.getElementById('data')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: '4', label: 'Complex',        group: 'Navigate', icon: <BoltIcon />,    kbd: 'G C', action: () => document.getElementById('complex')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: '5', label: 'Toast — Success',group: 'Actions', action: () => toast({ type: 'success', title: 'Action executed',  description: 'Command dispatched successfully' }) },
    { id: '6', label: 'Toast — Error',  group: 'Actions', action: () => toast({ type: 'error',   title: 'Build failed',      description: 'Module resolution error in Tooltip.tsx' }) },
    { id: '7', label: 'Open Modal',     group: 'Actions', action: () => setModalOpen(true) },
  ]

  return (
    <>
      <CommandPalette
        items={cmdItems}
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpen={() => setCmdOpen(true)}   // ← add this
        />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Component Specification"
        subtitle="MODAL — DATA-FEEDBACK / 01"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => { setModalOpen(false); toast({ type: 'success', title: 'Exported', description: 'Spec written to /dist/spec.md' }) }}>
              Export Spec
            </Button>
          </>
        }
      >
        <p style={{ marginBottom: 16, lineHeight: 1.7 }}>Full interaction pattern — keyboard trap, ESC dismiss, scroll lock, focus management, and the architect accent line at top.</p>
        <CodeSnip code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Title"
  footer={<Button variant="primary">Confirm</Button>}
>
  Content
</Modal>`} />
      </Modal>

      <Navbar
        brand="E·SYSTEM"
        version="v1.0.0"
        items={[
          { label: 'Foundations', href: '#foundations' },
          { label: 'Navigation',  href: '#navigation' },
          { label: 'Data',        href: '#data' },
          { label: 'Complex',     href: '#complex' },
        ]}
        actions={
          <Button size="sm" variant="secondary" iconLeft={<SearchIcon />} onClick={() => setCmdOpen(true)}>
            Ctrl K
          </Button>
        }
      />

      {/* HERO */}
      <div style={{ padding: '120px 40px 80px', maxWidth: 1100, margin: '0 auto', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Badge variant="accent" pulseDot>LIVE</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em' }}>
              20 COMPONENTS — NEXT.JS 16 — TYPESCRIPT — CSS MODULES
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--color-fg)', marginBottom: 4 }}>MODERN</h1>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--color-accent)', marginBottom: 4 }}>INDUSTRIAL</h1>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--color-fg)', marginBottom: 32 }}>SYSTEM.</h1>
          <p style={{ fontSize: 17, color: 'var(--color-fg-muted)', lineHeight: 1.6, maxWidth: 480, marginBottom: 40 }}>
            High-velocity component library engineered for performance-critical interfaces. Architectural constraints, not conventions.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 56 }}>
            <Button variant="primary" size="lg" iconRight={<ArrowRightIcon />} loading={loading} onClick={triggerLoading}>
              Run Build
            </Button>
            <Button variant="secondary" size="lg" iconLeft={<SearchIcon />} onClick={() => setCmdOpen(true)}>
              Ctrl K Command
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 48 }}>
            {[['20', 'Components'], ['4px', 'Grid Unit'], ['0px', 'Border Radius'], ['AA', 'WCAG']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '-0.02em' }}>{val}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 01 FOUNDATIONS ─────────────────────────── */}
      <Section id="foundations" tag="01 / FOUNDATIONS" title="The DNA." toggle={<ThemeToggle />}>
        <Grid>
          <Frame label="Button" hint="all variants + states">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <Button variant="primary" loading>Building</Button>
                <Button variant="secondary" loading>Deploying</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" iconLeft={<BoltIcon />}>With Icon</Button>
              </div>
            </div>
          </Frame>

          <Frame label="Input" hint="variants + error states">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Project Name" placeholder="my-component-lib" hint="Used as the npm package name" />
              <Input label="Search" placeholder="Filter components..." iconLeft={<SearchIcon />} />
              <Input label="API Key" placeholder="sk-..." mono error="Invalid key format — must start with sk-" />
            </div>
          </Frame>

          <Frame label="Badge" hint="all variants + dot states">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge variant="default">Default</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge variant="accent" pulseDot>Live</Badge>
                <Badge variant="success" dot>Deployed</Badge>
                <Badge variant="error" dot>Degraded</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="accent" size="lg">v1.0.0</Badge>
                <Badge variant="default" size="sm">v0.9</Badge>
              </div>
            </div>
          </Frame>

          <Frame label="Checkbox + Tooltip" hint="custom animation + placement">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Checkbox label="Enable telemetry" hint="Anonymous usage data" checked={checked} onChange={e => setChecked(e.target.checked)} />
              <Checkbox label="Strict TypeScript mode" defaultChecked />
              <Checkbox label="Beta features (disabled)" disabled />
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <Tooltip content="Cached build artifacts from last run" placement="top">
                  <Button variant="ghost" size="sm">Hover ↑ Top</Button>
                </Tooltip>
                <Tooltip content="Source maps disabled in production" placement="bottom">
                  <Button variant="ghost" size="sm">Hover ↓ Bottom</Button>
                </Tooltip>
              </div>
            </div>
          </Frame>
        </Grid>
        <div style={{ marginTop: 1 }}>
          <Frame label="Usage" span>
            <CodeSnip code={`import { Button, Badge, Input, Checkbox, Tooltip } from '@/components'

<Button variant="primary" size="lg" loading={isBuilding} iconRight={<ArrowRight />}>
  Deploy to Production
</Button>

<Badge variant="accent" pulseDot>Live</Badge>

<Input label="API Key" mono error="Invalid format" iconLeft={<KeyIcon />} />

<Checkbox label="Enable telemetry" hint="Anonymous usage only" />

<Tooltip content="Cached artifacts" placement="top">
  <Button variant="ghost">Hover me</Button>
</Tooltip>`} />
          </Frame>
        </div>
      </Section>

      {/* ── 02 NAVIGATION ──────────────────────────── */}
      <Section id="navigation" tag="02 / NAVIGATION" title="The Wayfinding.">
        <Grid>
          <Frame label="Breadcrumbs + Tab Switcher">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <Breadcrumbs items={[
                { label: 'Workspace', href: '#' },
                { label: 'Component Lib', href: '#' },
                { label: 'Navigation', href: '#' },
                { label: 'Breadcrumbs' },
              ]} />
              <TabSwitcher
                variant="line"
                defaultTab="props"
                tabs={[
                  { id: 'props', label: 'Props', count: 7, content: <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)' }}>items[], separator?, className?</span> },
                  { id: 'usage', label: 'Usage', content: <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)' }}>&lt;Breadcrumbs items={'{[{ label, href }]}'} /&gt;</span> },
                  { id: 'a11y',  label: 'A11y',  content: <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)' }}>role=&quot;navigation&quot; — aria-current=&quot;page&quot;</span> },
                ]}
              />
              <TabSwitcher variant="pill" defaultTab="a"
                tabs={[
                  { id: 'a', label: 'Week',  content: null },
                  { id: 'b', label: 'Month', content: null },
                  { id: 'c', label: 'Year',  content: null },
                ]}
              />
            </div>
          </Frame>

          <Frame label="Sidebar">
            <div style={{ height: 300, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <Sidebar
                title="MI SYSTEM"
                sections={[
                  {
                    label: 'Components',
                    items: [
                      { label: 'Foundations', icon: <GridIcon />,    active: true },
                      { label: 'Navigation',  icon: <LayersIcon /> },
                      { label: 'Data',        icon: <TerminalIcon />, badge: <Badge variant="accent" size="sm">5</Badge> },
                      { label: 'Complex',     icon: <BoltIcon /> },
                    ],
                  },
                  {
                    label: 'Resources',
                    items: [
                      { label: 'Design Tokens', icon: <GridIcon /> },
                      { label: 'Changelog',     icon: <ArrowRightIcon /> },
                    ],
                  },
                ]}
              />
            </div>
          </Frame>

          <Frame label="Command Palette" hint="⌘K · keyboard navigation · fuzzy search" span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Button variant="secondary" iconLeft={<SearchIcon />} onClick={() => setCmdOpen(true)}>
                Open Palette
              </Button>
              <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-subtle)' }}>
                {['↑↓ navigate', '↵ select', 'ESC close', 'fuzzy search', 'grouped results'].map(h => (
                  <span key={h}>{h}</span>
                ))}
              </div>
            </div>
          </Frame>
        </Grid>
      </Section>

      {/* ── 03 DATA & FEEDBACK ─────────────────────── */}
      <Section id="data" tag="03 / DATA & FEEDBACK" title="The Logic.">
        <Grid>
          <Frame label="Data Table" hint="click column headers to sort" span>
            <DataTable columns={tableColumns} data={tableData} rowKey="module" />
          </Frame>

          <Frame label="Progress Bar" hint="variants + indeterminate" span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ProgressBar label="Build Progress"  value={72} />
                <ProgressBar label="Bundle Size"     value={45} variant="success" />
                <ProgressBar label="Error Rate"      value={8}  variant="error" size="sm" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ProgressBar label="Cache Hit Rate"  value={89} variant="success" striped />
                <ProgressBar label="Type Coverage"   value={94} variant="neutral" />
                <ProgressBar label="Analyzing..."    indeterminate />
              </div>
            </div>
          </Frame>

          <Frame label="Skeleton Loader" hint="staggered shimmer animation">
            <SkeletonCard />
          </Frame>

          <Frame label="Toast + Modal" hint="4 types · slide-up animation">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {([
                ['success', 'Build complete',   '20 components compiled in 847ms'],
                ['error',   'Build failed',     'Module resolution error in Tooltip.tsx'],
                ['warning', 'Bundle too large', 'Exceeds 500kB performance budget'],
                ['info',    'Update available', 'v1.1.0 is ready to install'],
              ] as const).map(([type, title, desc]) => (
                <Button key={type} variant="secondary" size="sm"
                  onClick={() => toast({ type, title, description: desc })}>
                  Fire {type} toast
                </Button>
              ))}
              <div style={{ height: 1, background: 'var(--color-border)', margin: '4px 0' }} />
              <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
                Open Modal →
              </Button>
            </div>
          </Frame>
        </Grid>
      </Section>

      {/* ── 04 COMPLEX ─────────────────────────────── */}
      <Section id="complex" tag="04 / COMPLEX UNITS" title="The Architect.">
        <div style={{ marginBottom: 1 }}>
          <Frame label="Bento Grid Wrapper" span>
            <BentoGrid cols={3}>
              <BentoCell tag="01 / PERFORMANCE" title="Zero dropped frames." spanCols={2} variant="accent">
                <p style={{ fontSize: 13, marginTop: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                  GPU-composited animations. No layout thrash. Every transition pre-calculated at component definition time.
                </p>
              </BentoCell>
              <BentoCell tag="02 / TOKENS" variant="dark">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                  {[['--color-accent', '#FF4D00'], ['--radius-none', '0px'], ['--space-4', '16px'], ['--font-mono', 'JetBrains']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-muted)' }}>{k}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-accent)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </BentoCell>
              <BentoCell tag="03 / ACCESSIBILITY" title="WCAG 2.1 AA.">
                <p style={{ fontSize: 12, marginTop: 8, color: 'var(--color-fg-muted)', lineHeight: 1.5 }}>
                  Focus traps, ARIA roles, keyboard nav, skip links. Non-negotiable.
                </p>
              </BentoCell>
              <BentoCell tag="04 / TYPOGRAPHY" title="Geist + JetBrains." spanCols={2}>
                <p style={{ fontSize: 12, marginTop: 8, color: 'var(--color-fg-muted)' }}>
                  Rock-solid sans paired with precision monospace. Consistent scale from 11px to 48px.
                </p>
              </BentoCell>
            </BentoGrid>
          </Frame>
        </div>

        <Grid>
          <Frame label="Accordion" hint="animated height transition">
            <Accordion items={[
              { trigger: 'Why CSS Modules over Tailwind-only?', defaultOpen: true, content: 'CSS Modules give us scoped, maintainable animation code. Complex micro-interactions (scan-line effects, custom slider thumbs, shimmer keyframes) belong in dedicated stylesheets — not utility class strings.' },
              { trigger: 'How is focus management handled?', content: 'Every interactive element has a distinct focus-visible state via box-shadow. Modal implements a full keyboard trap. CommandPalette manages focus internally. None of this is optional or an afterthought.' },
              { trigger: 'What is the 4px grid rule?', content: 'Every spacing value in the system is a multiple of 4px — defined as CSS custom properties. This enforces visual rhythm without needing a linter or design token plugin.' },
            ]} />
          </Frame>

          <Frame label="Range Slider" hint="custom track, fill & thumb">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              <RangeSlider label="Compression Level" value={sliderVal} onChange={setSliderVal} unit="%" showTicks tickCount={5} />
              <RangeSlider label="Thread Count" defaultValue={4} min={1} max={16} step={1} unit=" threads" />
              <RangeSlider label="Cache TTL" defaultValue={3600} min={0} max={86400} step={300} unit="s" />
            </div>
          </Frame>

          <Frame label="Stepper" hint="click to advance steps" span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <Stepper
                currentStep={stepperStep}
                steps={[
                  { title: 'Configure',  description: 'Set project parameters' },
                  { title: 'Build',      description: 'Compile component tree', content: <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)', padding: '8px 0' }}>▶ Running pipeline... 12/20 components compiled</div> },
                  { title: 'Validate',   description: 'Type checks + a11y audit' },
                  { title: 'Publish',    description: 'Release to npm registry' },
                ]}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="ghost" size="sm" onClick={() => setStepperStep(s => Math.max(0, s - 1))}>← Back</Button>
                <Button variant="primary" size="sm" onClick={() => setStepperStep(s => Math.min(3, s + 1))}>Next →</Button>
                <Button variant="secondary" size="sm" onClick={() => setStepperStep(1)}>Reset</Button>
              </div>
            </div>
          </Frame>

          <Frame label="Card — Default + Accented">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Card variant="accented">
                <CardHeader title="Summit Trail Discovery" subtitle="GEOSPATIAL / MAPBOX GL + GEOJSON" />
                <CardBody>
                  <p style={{ fontSize: 13, color: 'var(--color-fg-muted)', lineHeight: 1.6 }}>High-performance geospatial platform. Visualizing complex coordinate data with zero frame drops.</p>
                </CardBody>
                <CardFooter>
                  <Badge variant="success" dot>Production</Badge>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)' }}>99+ Lighthouse</span>
                </CardFooter>
              </Card>
              <Card variant="interactive" onClick={() => toast({ type: 'info', title: 'Card clicked', description: 'Interactive card with hover lift' })}>
                <CardBody>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-muted)' }}>↗ Interactive card — hover for lift effect, click me</span>
                </CardBody>
              </Card>
            </div>
          </Frame>

          <Frame label="Card — Blueprint (Architect View)" hint="component anatomy · technical drawing">
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--color-accent)' }}>BUTTON / PRIMARY</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-fg-subtle)' }}>MI-SYSTEM — COMPONENT SPEC</span>
              </div>

              <svg viewBox="0 0 500 180" width="100%" style={{ display: 'block', marginBottom: 24, color: 'var(--accent)' }} aria-label="Button component technical drawing">
  {/* Grid dots */}
  {Array.from({ length: 20 }).map((_, xi) =>
    Array.from({ length: 8 }).map((_, yi) => (
      <circle key={`${xi}-${yi}`} cx={xi * 26 + 3} cy={yi * 24 + 3} r={0.8} fill="currentColor" opacity={0.15} />
    ))
  )}
  {/* Button */}
  <rect x={140} y={62} width={220} height={56} fill="currentColor" />
  <text x={250} y={96} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={11} fontWeight={700} fill="white" letterSpacing={2}>PRIMARY BUTTON</text>
  {/* Height dimension */}
  <line x1={378} y1={62} x2={400} y2={62} stroke="currentColor" strokeWidth={0.5} opacity={0.5} strokeDasharray="3,2"/>
  <line x1={378} y1={118} x2={400} y2={118} stroke="currentColor" strokeWidth={0.5} opacity={0.5} strokeDasharray="3,2"/>
  <line x1={393} y1={65} x2={393} y2={115} stroke="currentColor" strokeWidth={0.8} opacity={0.7}/>
  <polygon points="393,62 390,70 396,70" fill="currentColor" opacity={0.7}/>
  <polygon points="393,118 390,110 396,110" fill="currentColor" opacity={0.7}/>
  <text x={408} y={93} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.9}>36px</text>
  {/* Padding zones */}
  <rect x={140} y={62} width={36} height={56} fill="white" opacity={0.06}/>
  <rect x={324} y={62} width={36} height={56} fill="white" opacity={0.06}/>
  {/* Left padding */}
  <line x1={140} y1={148} x2={176} y2={148} stroke="currentColor" strokeWidth={0.8} opacity={0.7}/>
  <polygon points="140,148 148,145 148,151" fill="currentColor" opacity={0.7}/>
  <polygon points="176,148 168,145 168,151" fill="currentColor" opacity={0.7}/>
  <line x1={140} y1={118} x2={140} y2={152} stroke="currentColor" strokeWidth={0.5} opacity={0.4} strokeDasharray="3,2"/>
  <line x1={176} y1={118} x2={176} y2={152} stroke="currentColor" strokeWidth={0.5} opacity={0.4} strokeDasharray="3,2"/>
  <text x={158} y={162} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.9}>20px</text>
  {/* Right padding */}
  <line x1={324} y1={148} x2={360} y2={148} stroke="currentColor" strokeWidth={0.8} opacity={0.7}/>
  <polygon points="324,148 332,145 332,151" fill="currentColor" opacity={0.7}/>
  <polygon points="360,148 352,145 352,151" fill="currentColor" opacity={0.7}/>
  <line x1={324} y1={118} x2={324} y2={152} stroke="currentColor" strokeWidth={0.5} opacity={0.4} strokeDasharray="3,2"/>
  <line x1={360} y1={118} x2={360} y2={152} stroke="currentColor" strokeWidth={0.5} opacity={0.4} strokeDasharray="3,2"/>
  <text x={342} y={162} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.9}>20px</text>
  {/* Full width */}
  <line x1={140} y1={44} x2={360} y2={44} stroke="currentColor" strokeWidth={0.8} opacity={0.7}/>
  <polygon points="140,44 148,41 148,47" fill="currentColor" opacity={0.7}/>
  <polygon points="360,44 352,41 352,47" fill="currentColor" opacity={0.7}/>
  <line x1={140} y1={44} x2={140} y2={60} stroke="currentColor" strokeWidth={0.5} opacity={0.4} strokeDasharray="3,2"/>
  <line x1={360} y1={44} x2={360} y2={60} stroke="currentColor" strokeWidth={0.5} opacity={0.4} strokeDasharray="3,2"/>
  <text x={250} y={38} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.9}>220px content width</text>
  {/* Border callout */}
  <line x1={60} y1={90} x2={138} y2={90} stroke="currentColor" strokeWidth={0.5} opacity={0.5} strokeDasharray="2,2"/>
  <circle cx={139} cy={90} r={2} fill="currentColor" opacity={0.6}/>
  <text x={8} y={85} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.8}>border</text>
  <text x={8} y={97} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.8}>1px solid</text>
  {/* Radius callout */}
  <line x1={60} y1={116} x2={141} y2={116} stroke="currentColor" strokeWidth={0.5} opacity={0.5} strokeDasharray="2,2"/>
  <circle cx={141} cy={118} r={2} fill="currentColor" opacity={0.6}/>
  <text x={8} y={111} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.8}>radius</text>
  <text x={8} y={121} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.8}>0px</text>
  {/* Font callout */}
  <line x1={362} y1={90} x2={420} y2={76} stroke="currentColor" strokeWidth={0.5} opacity={0.5} strokeDasharray="2,2"/>
  <circle cx={361} cy={90} r={2} fill="currentColor" opacity={0.6}/>
  <text x={422} y={72} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.8}>13px / 600</text>
  <text x={422} y={83} fontFamily="JetBrains Mono, monospace" fontSize={9} fill="currentColor" opacity={0.8}>0.06em LS</text>
  {/* Focus ring */}
  <rect x={136} y={58} width={228} height={64} fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray="4,3" opacity={0.3}/>
  <text x={362} y={58} fontFamily="JetBrains Mono, monospace" fontSize={8} fill="currentColor" opacity={0.5}>focus-visible</text>
</svg>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0, borderTop: '1px solid var(--color-border)' }}>
                {[
                  ['HEIGHT', '36px'], ['PADDING', '20px H'], ['FONT', '13px / 600'], ['TRACKING', '0.06em'],
                  ['BORDER', '1px solid'], ['RADIUS', '0px'], ['FOCUS', '2px accent'], ['TRANSFORM', 'translateY(-1px)'],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: '8px 12px', borderRight: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)', fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Frame>
        </Grid>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--color-fg-muted)' }}>MI·SYSTEM</span>
          <Badge variant="default" size="sm">v1.0.0</Badge>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['20 COMPONENTS', 'NEXT.JS 15', 'TYPESCRIPT', 'CSS MODULES', 'WCAG 2.1 AA'].map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em' }}>{t}</span>
          ))}
        </div>
      </footer>
    </>
  )
}