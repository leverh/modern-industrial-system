import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TabSwitcher } from './TabSwitcher'

const meta = {
  title: 'Navigation/TabSwitcher',
  component: TabSwitcher,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animated tab switcher. The sliding indicator is positioned via `getBoundingClientRect` on a `useLayoutEffect` — pixel-perfect regardless of tab label length. Two variants: `line` (underline indicator) and `pill` (filled background). Content panel renders only for the active tab.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['line', 'pill'],
      table: { defaultValue: { summary: 'line' } },
    },
    defaultTab: { control: 'text' },
    tabs: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    tabs: [],
    variant: 'line',
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

// Shared tab content

const Panel = ({ label }: { label: string }) => (
  <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)' }}>
    Content for "{label}" panel.
  </p>
)

const BASIC_TABS = [
  { id: 'props',  label: 'Props',   content: <Panel label="Props" /> },
  { id: 'usage',  label: 'Usage',   content: <Panel label="Usage" /> },
  { id: 'a11y',   label: 'A11y',    content: <Panel label="A11y" /> },
]

// Stories

export const LineVariant: Story = {
  name: 'Line (default)',
  args: { tabs: BASIC_TABS, variant: 'line' },
}

export const PillVariant: Story = {
  name: 'Pill',
  args: { tabs: BASIC_TABS, variant: 'pill' },
  parameters: {
    docs: {
      description: { story: 'Pill variant — filled background indicator instead of underline. Use in card headers or toolbar contexts.' },
    },
  },
}

export const WithCounts: Story = {
  name: 'With Counts',
  args: {
    variant: 'line',
    tabs: [
      { id: 'open',   label: 'Open',   count: 12, content: <Panel label="Open" /> },
      { id: 'closed', label: 'Closed', count: 48, content: <Panel label="Closed" /> },
      { id: 'draft',  label: 'Draft',  count: 3,  content: <Panel label="Draft" /> },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Optional `count` badge — rendered in mono, dimmed. Use for issue lists, queues, or filter tabs.' },
    },
  },
}

export const DefaultTab: Story = {
  name: 'Non-First Default',
  args: {
    tabs: BASIC_TABS,
    defaultTab: 'usage',
  },
  parameters: {
    docs: {
      description: { story: '`defaultTab` sets the initially active tab to something other than the first item.' },
    },
  },
}

export const NoContent: Story = {
  name: 'No Content Panels',
  args: {
    variant: 'line',
    tabs: [
      { id: 'all',      label: 'All' },
      { id: 'active',   label: 'Active' },
      { id: 'archived', label: 'Archived' },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Tabs without `content` — panel area is suppressed. Use when tabs control external state (table filters, route changes).' },
    },
  },
}

export const BothVariants: Story = {
  name: 'Both Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Line</p>
        <TabSwitcher variant="line" tabs={BASIC_TABS} />
      </div>
      <div>
        <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pill</p>
        <TabSwitcher variant="pill" tabs={BASIC_TABS} />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Both variants side by side — indicator animation plays independently in each.' },
    },
  },
}

export const Controlled: Story = {
  name: 'Controlled via onChange',
  render: () => {
    const [active, setActive] = useState('props')
    const tabs = [
      { id: 'props', label: 'Props',   count: 7, content: <Panel label="Props" /> },
      { id: 'usage', label: 'Usage',              content: <Panel label="Usage" /> },
      { id: 'a11y',  label: 'A11y',               content: <Panel label="A11y" /> },
    ]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TabSwitcher tabs={tabs} onChange={setActive} />
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-subtle)' }}>
          Active tab: <span style={{ color: 'var(--color-accent)' }}>{active}</span>
        </p>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: '`onChange` fires with the active tab id — wire to router, filter state, or any external logic.' },
    },
  },
}

export const ManyTabs: Story = {
  name: 'Many Tabs',
  render: () => (
    <TabSwitcher
      variant="line"
      tabs={[
        { id: 'overview',    label: 'Overview' },
        { id: 'components',  label: 'Components', count: 20 },
        { id: 'foundations', label: 'Foundations' },
        { id: 'patterns',    label: 'Patterns' },
        { id: 'changelog',   label: 'Changelog', count: 3 },
        { id: 'settings',    label: 'Settings' },
      ]}
    />
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Six tabs — verifies indicator positioning across variable-width labels.' },
    },
  },
}

export const InContext: Story = {
  name: 'In Context — Component Docs',
  render: () => (
    <div style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Button</p>
        <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--color-fg)' }}>Primary interactive element</p>
      </div>
      <div style={{ padding: '0 20px' }}>
        <TabSwitcher
          variant="line"
          tabs={[
            {
              id: 'preview',
              label: 'Preview',
              content: (
                <div style={{ display: 'flex', gap: 8, padding: '20px 0', flexWrap: 'wrap', alignItems: 'center' }}>
                  {['Primary', 'Secondary', 'Ghost', 'Destructive'].map((v) => (
                    <button key={v} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: v === 'Primary' ? 'var(--color-accent)' : 'transparent', border: '1px solid var(--color-border)', color: v === 'Primary' ? '#fff' : 'var(--color-fg-muted)', cursor: 'pointer' }}>{v}</button>
                  ))}
                </div>
              ),
            },
            {
              id: 'code',
              label: 'Code',
              content: (
                <pre style={{ margin: '16px 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-muted)', lineHeight: 1.7, overflowX: 'auto' }}>
{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`}
                </pre>
              ),
            },
            {
              id: 'props',
              label: 'Props',
              count: 6,
              content: (
                <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'destructive'", default: "'primary'" },
                    { name: 'size',    type: "'sm' | 'md' | 'lg'",   default: "'md'" },
                    { name: 'loading', type: 'boolean',               default: 'false' },
                    { name: 'disabled',type: 'boolean',               default: 'false' },
                  ].map(({ name, type, default: def }) => (
                    <div key={name} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 80px', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-muted)' }}>
                      <span style={{ color: 'var(--color-accent)' }}>{name}</span>
                      <span>{type}</span>
                      <span style={{ color: 'var(--color-fg-subtle)' }}>{def}</span>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Realistic component doc card — Preview / Code / Props tabs, the primary use case for TabSwitcher in this library.' },
    },
  },
}