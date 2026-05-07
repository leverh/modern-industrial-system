import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Data & Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress indicator. Fill position driven by a `--progress-value` CSS custom property set inline — keeps animation in CSS and avoids JS-driven style injection. Supports determinate, indeterminate, and striped states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      table: { defaultValue: { summary: '0' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error', 'neutral'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    label: { control: 'text' },
    showValue: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    striped: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value: 60,
    variant: 'default',
    size: 'md',
    showValue: true,
    striped: false,
    indeterminate: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

// Stories

export const Default: Story = {}

export const WithLabel: Story = {
  args: { label: 'Build progress', value: 72 },
}

export const Indeterminate: Story = {
  args: { label: 'Deploying…', indeterminate: true, showValue: false },
  parameters: {
    docs: {
      description: { story: 'Indeterminate — `aria-busy="true"`, no value shown. Use for operations with unknown duration.' },
    },
  },
}

export const Striped: Story = {
  args: { label: 'Uploading', value: 45, striped: true },
  parameters: {
    docs: {
      description: { story: 'Striped fill — animated diagonal lines. Use for active long-running tasks.' },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ProgressBar label="Default"  variant="default"  value={70} />
      <ProgressBar label="Success"  variant="success"  value={100} />
      <ProgressBar label="Warning"  variant="warning"  value={55} />
      <ProgressBar label="Error"    variant="error"    value={30} />
      <ProgressBar label="Neutral"  variant="neutral"  value={80} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ProgressBar label="Small"  size="sm" value={60} />
      <ProgressBar label="Medium" size="md" value={60} />
      <ProgressBar label="Large"  size="lg" value={60} />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const EdgeValues: Story = {
  name: 'Edge Values',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ProgressBar label="Empty"    value={0} />
      <ProgressBar label="Near zero" value={2} />
      <ProgressBar label="Half"     value={50} />
      <ProgressBar label="Complete" value={100} variant="success" />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

export const Animated: Story = {
  name: 'Animated — Live Progress',
  render: () => {
    const [value, setValue] = useState(0)
    const [running, setRunning] = useState(false)

    useEffect(() => {
      if (!running) return
      if (value >= 100) { setRunning(false); return }
      const t = setTimeout(() => setValue((v) => Math.min(100, v + Math.ceil(Math.random() * 4))), 80)
      return () => clearTimeout(t)
    }, [running, value])

    const reset = () => { setValue(0); setRunning(false) }

    const variant = value === 100 ? 'success' : value > 70 ? 'default' : 'default'

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ProgressBar
          label={value === 100 ? 'Deploy complete' : running ? 'Deploying…' : 'Ready'}
          value={value}
          variant={variant}
          striped={running && value < 100}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setRunning(true)}
            disabled={running || value === 100}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '5px 12px',
              background: 'var(--color-accent)', border: 'none', color: '#fff',
              cursor: running || value === 100 ? 'not-allowed' : 'pointer',
              opacity: running || value === 100 ? 0.4 : 1,
            }}
          >
            Deploy
          </button>
          <button
            onClick={reset}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '5px 12px',
              background: 'transparent', border: '1px solid var(--color-border)',
              color: 'var(--color-fg-muted)', cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Simulated deploy — striped while running, switches to success on completion. Shows the striped → determinate transition.' },
    },
  },
}

export const StatusBoard: Story = {
  name: 'In Context — Status Board',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <ProgressBar label="CPU usage"      variant="warning"  value={82} size="sm" />
      <ProgressBar label="Memory"         variant="error"    value={94} size="sm" />
      <ProgressBar label="Disk I/O"       variant="default"  value={31} size="sm" />
      <ProgressBar label="Network in"     variant="neutral"  value={48} size="sm" />
      <ProgressBar label="Build pipeline" indeterminate showValue={false} size="sm" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Typical server metrics panel — sm size, mixed variants, one indeterminate.' },
    },
  },
}