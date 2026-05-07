import type { Meta, StoryObj } from '@storybook/react'
import { BentoGrid, BentoCell } from './BentoGrid'

const meta = {
  title: 'Complex/BentoGrid',
  component: BentoGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS Grid wrapper for asymmetric card layouts. `BentoGrid` sets the column count; `BentoCell` controls spanning and variant. Compose freely — cells fill the grid in DOM order.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: { type: 'radio' },
      options: [2, 3, 4],
      table: { defaultValue: { summary: '3' } },
    },
    children: { table: { disable: true } },
  },
  args: { children: null },
} satisfies Meta<typeof BentoGrid>

export default meta
type Story = StoryObj<typeof meta>

// Placeholder cell content 

const Placeholder = ({ label }: { label: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: 80,
    fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-subtle)',
  }}>
    {label}
  </div>
)

// Stories 

export const Default: Story = {
  args: { cols: 3 },
  render: (args) => (
    <BentoGrid {...args}>
      <BentoCell tag="01" title="Standard cell"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="02" title="Standard cell"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="03" title="Standard cell"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="04" title="Standard cell"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="05" title="Standard cell"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="06" title="Standard cell"><Placeholder label="1 × 1" /></BentoCell>
    </BentoGrid>
  ),
}

export const WithSpanning: Story = {
  name: 'With Spanning',
  render: () => (
    <BentoGrid cols={3}>
      <BentoCell tag="HERO" title="Wide cell" spanCols={2}>
        <Placeholder label="spanCols={2}" />
      </BentoCell>
      <BentoCell tag="SIDE" title="Tall cell" spanRows={2}>
        <Placeholder label="spanRows={2}" />
      </BentoCell>
      <BentoCell tag="01" title="Standard"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="02" title="Standard"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="FULL" title="Full-width" spanCols={3}>
        <Placeholder label="spanCols={3}" />
      </BentoCell>
    </BentoGrid>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Mix of `spanCols` and `spanRows` to create an asymmetric hero layout.' },
    },
  },
}

export const Variants: Story = {
  name: 'Cell Variants',
  render: () => (
    <BentoGrid cols={3}>
      <BentoCell tag="DEFAULT" title="Default" variant="default">
        <Placeholder label="default" />
      </BentoCell>
      <BentoCell tag="ACCENT" title="Accent" variant="accent">
        <Placeholder label="accent" />
      </BentoCell>
      <BentoCell tag="DARK" title="Dark" variant="dark">
        <Placeholder label="dark" />
      </BentoCell>
    </BentoGrid>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All three cell variants side by side.' },
    },
  },
}

export const TwoColumn: Story = {
  name: '2-Column Grid',
  render: () => (
    <BentoGrid cols={2}>
      <BentoCell tag="FEATURE" title="Primary feature" variant="accent" spanRows={2}>
        <Placeholder label="Tall accent hero" />
      </BentoCell>
      <BentoCell tag="01" title="Detail A"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="02" title="Detail B"><Placeholder label="1 × 1" /></BentoCell>
    </BentoGrid>
  ),
  parameters: { controls: { disable: true } },
}

export const FourColumn: Story = {
  name: '4-Column Grid',
  render: () => (
    <BentoGrid cols={4}>
      <BentoCell tag="01" title="Alpha"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="02" title="Beta" variant="accent"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="03" title="Gamma"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="04" title="Delta" variant="dark"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="WIDE" title="Wide" spanCols={2}><Placeholder label="spanCols={2}" /></BentoCell>
      <BentoCell tag="05" title="Epsilon"><Placeholder label="1 × 1" /></BentoCell>
      <BentoCell tag="06" title="Zeta"><Placeholder label="1 × 1" /></BentoCell>
    </BentoGrid>
  ),
  parameters: { controls: { disable: true } },
}

export const InContext: Story = {
  name: 'In Context — Feature Grid',
  render: () => (
    <BentoGrid cols={3}>
      <BentoCell tag="SYSTEM" title="Design System" variant="accent" spanCols={2}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', margin: '0 0 16px', lineHeight: 1.6 }}>
          Modern Industrial — a Mono + 1 component library built for high-contrast interfaces.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Button', 'Input', 'Checkbox', 'Badge', 'Tooltip'].map(c => (
            <span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 8px', border: '1px solid var(--color-border)', color: 'var(--color-fg-muted)' }}>{c}</span>
          ))}
        </div>
      </BentoCell>
      <BentoCell tag="STACK" title="Tech Stack" variant="dark" spanRows={2}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          {['Next.js 15', 'TypeScript', 'CSS Modules', 'Storybook'].map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-muted)' }}>→ {t}</span>
          ))}
        </div>
      </BentoCell>
      <BentoCell tag="TOKENS" title="Design Tokens">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--color-accent)', display: 'block', marginTop: 8 }}>48</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)' }}>CSS custom properties</span>
      </BentoCell>
      <BentoCell tag="COMPONENTS" title="Components">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--color-fg)', display: 'block', marginTop: 8 }}>20</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)' }}>across 4 categories</span>
      </BentoCell>
    </BentoGrid>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Realistic feature showcase — mixed variants, spans, and live content.' },
    },
  },
}