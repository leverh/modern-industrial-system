import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'


const meta: Meta = {
  title: 'Data & Feedback/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Context-based notification system. Wrap your app in `ToastProvider` once; call `useToast()` anywhere in the tree to fire toasts. Toasts auto-dismiss after `duration` ms (default 4000) with an exit animation. The stack is `aria-live="polite"`.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<Meta>

// Inner trigger components (must be inside ToastProvider tree)

const TriggerButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      padding: '6px 14px',
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border)',
      color: 'var(--color-fg-muted)',
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
)

// Stories 

export const Default: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Show toast"
        onClick={() => toast({ type: 'default', title: 'Notification', description: 'Something happened.' })}
      />
    )
  },
}

export const Success: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Deploy succeeded"
        onClick={() => toast({ type: 'success', title: 'Deployed', description: 'api-gateway v2.4.1 is live on eu-west-1.' })}
      />
    )
  },
}

export const ErrorToast: Story = {
  name: 'Error',
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Build failed"
        onClick={() => toast({ type: 'error', title: 'Build failed', description: 'billing-worker exited with code 1.' })}
      />
    )
  },
}

export const Warning: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Service degraded"
        onClick={() => toast({ type: 'warning', title: 'Degraded', description: 'storage-proxy latency above threshold.' })}
      />
    )
  },
}

export const Info: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Maintenance window"
        onClick={() => toast({ type: 'info', title: 'Scheduled maintenance', description: 'Downtime window: 02:00–03:00 UTC.' })}
      />
    )
  },
}

export const TitleOnly: Story = {
  name: 'Title Only',
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Show (no description)"
        onClick={() => toast({ type: 'success', title: 'Copied to clipboard' })}
      />
    )
  },
  parameters: {
    docs: {
      description: { story: 'Without `description` — title-only is the right pattern for quick confirmations.' },
    },
  },
}

export const ShortDuration: Story = {
  name: 'Short Duration',
  render: () => {
    const { toast } = useToast()
    return (
      <TriggerButton
        label="Quick toast (1.5s)"
        onClick={() => toast({ type: 'default', title: 'Saved', duration: 1500 })}
      />
    )
  },
  parameters: {
    docs: {
      description: { story: '`duration` in ms — 1500 for transient confirmations, leave default (4000) for actionable messages.' },
    },
  },
}

export const AllTypes: Story = {
  name: 'All Types',
  render: () => {
    const { toast } = useToast()
    const fire = () => {
      const types = ['default', 'success', 'error', 'warning', 'info'] as const
      types.forEach((type, i) => {
        setTimeout(() => {
          toast({
            type,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            description: `This is a ${type} notification.`,
            duration: 6000,
          })
        }, i * 300)
      })
    }
    return (
      <TriggerButton label="Fire all types" onClick={fire} />
    )
  },
  parameters: {
    docs: {
      description: { story: 'Fires all five types in sequence with 300ms stagger — shows the stacked toast layout.' },
    },
  },
}

export const Stacked: Story = {
  name: 'Stacked',
  render: () => {
    const { toast } = useToast()
    const fire = () => {
      Array.from({ length: 4 }).forEach((_, i) => {
        setTimeout(() => {
          toast({ type: 'default', title: `Notification ${i + 1}`, description: 'Stacked in the queue.', duration: 5000 })
        }, i * 200)
      })
    }
    return <TriggerButton label="Stack 4 toasts" onClick={fire} />
  },
  parameters: {
    docs: {
      description: { story: 'Multiple toasts stacked — verifies the container layout and dismiss behaviour under load.' },
    },
  },
}