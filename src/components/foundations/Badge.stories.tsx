import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Foundations/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Status and label chip. Mono uppercase, sharp geometry. Seven semantic variants, three sizes, solid fill modifier, and an optional animated dot for live-status use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'accent', 'success', 'warning', 'error', 'info', 'outline'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    solid: {
      control: 'boolean',
      description: 'Filled background variant — white text, full accent/semantic colour.',
      table: { defaultValue: { summary: 'false' } },
    },
    dot: {
      control: 'boolean',
      description: 'Static status dot prepended to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    pulseDot: {
      control: 'boolean',
      description: 'Animated pulsing dot — use for live / real-time states.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    solid: false,
    dot: false,
    pulseDot: false,
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

//  Stories

export const Default: Story = {}

export const Accent: Story = {
  args: { variant: 'accent', children: 'New' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Deployed' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Degraded' },
}

export const Error: Story = {
  args: { variant: 'error', children: 'Failed' },
}

export const Info: Story = {
  args: { variant: 'info', children: 'In review' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Draft' },
}

export const WithDot: Story = {
  name: 'With Dot',
  args: { variant: 'success', dot: true, children: 'Operational' },
  parameters: {
    docs: {
      description: { story: 'Static dot — use for stable status states.' },
    },
  },
}

export const WithPulseDot: Story = {
  name: 'With Pulse Dot',
  args: { variant: 'success', pulseDot: true, children: 'Live' },
  parameters: {
    docs: {
      description: {
        story: 'Animated pulse dot — use only for genuinely real-time states (live stream, active connection). Avoid overuse.',
      },
    },
  },
}

export const SolidAccent: Story = {
  name: 'Solid — Accent',
  args: { variant: 'accent', solid: true, children: 'Beta' },
}

export const SolidSuccess: Story = {
  name: 'Solid — Success',
  args: { variant: 'success', solid: true, children: 'Deployed' },
}

export const SolidError: Story = {
  name: 'Solid — Error',
  args: { variant: 'error', solid: true, children: 'Failed' },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge variant="accent" size="sm">Small</Badge>
      <Badge variant="accent" size="md">Medium</Badge>
      <Badge variant="accent" size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}

export const SolidVariants: Story = {
  name: 'Solid Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="accent" solid>Accent</Badge>
      <Badge variant="success" solid>Success</Badge>
      <Badge variant="error" solid>Error</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Solid modifier is available on accent, success, and error only.' },
    },
  },
}

export const DotVariants: Story = {
  name: 'Dot Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="success" dot>Operational</Badge>
        <Badge variant="warning" dot>Degraded</Badge>
        <Badge variant="error" dot>Outage</Badge>
        <Badge variant="info" dot>Maintenance</Badge>
        <Badge variant="default" dot>Unknown</Badge>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="success" pulseDot>Live</Badge>
        <Badge variant="accent" pulseDot>Streaming</Badge>
        <Badge variant="error" pulseDot>Incident</Badge>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Static dots (row 1) vs animated pulse dots (row 2). Dot colour inherits from variant automatically.' },
    },
  },
}

export const InContext: Story = {
  name: 'In Context — Status Board',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340 }}>
      {[
        { label: 'API Gateway',       variant: 'success' as const, dot: true,      text: 'Operational' },
        { label: 'Edge CDN',          variant: 'success' as const, pulseDot: true,  text: 'Live'        },
        { label: 'Build Pipeline',    variant: 'warning' as const, dot: true,       text: 'Degraded'    },
        { label: 'Auth Service',      variant: 'error'   as const, pulseDot: true,  text: 'Incident'    },
        { label: 'Storage',           variant: 'info'    as const, dot: true,       text: 'Maintenance' },
      ].map(({ label, variant, dot, pulseDot, text }) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)' }}>
            {label}
          </span>
          <Badge variant={variant} dot={dot} pulseDot={pulseDot}>{text}</Badge>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Realistic status-board layout — the primary use case for dot variants.' },
    },
  },
}