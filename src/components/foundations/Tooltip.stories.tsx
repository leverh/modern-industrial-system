import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const TriggerButton = ({ children }: { children: React.ReactNode }) => (
  <button
    style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      padding: '6px 12px',
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border)',
      color: 'var(--color-fg)',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)',
    }}
  >
    {children}
  </button>
)

const meta = {
  title: 'Foundations/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Lightweight hover/focus tooltip. Mono xs text, sharp border, entry animation. Placement is `top` or `bottom`; delay defaults to 400 ms to avoid tooltip noise on fast cursors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip body — accepts a string or any ReactNode.',
    },
    placement: {
      control: { type: 'radio' },
      options: ['top', 'bottom'],
      table: { defaultValue: { summary: 'top' } },
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Milliseconds before the tooltip appears. 0 = instant.',
      table: { defaultValue: { summary: '400' } },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    content: 'Tooltip content',
    placement: 'top',
    delay: 400,
    children: <TriggerButton>Hover me</TriggerButton>,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px 80px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

//  Stories 

export const Default: Story = {}

export const PlacementTop: Story = {
  name: 'Placement — Top',
  args: {
    content: 'Appears above the trigger',
    placement: 'top',
    children: <TriggerButton>Hover me ↑</TriggerButton>,
  },
}

export const PlacementBottom: Story = {
  name: 'Placement — Bottom',
  args: {
    content: 'Appears below the trigger',
    placement: 'bottom',
    children: <TriggerButton>Hover me ↓</TriggerButton>,
  },
}

export const NoDelay: Story = {
  name: 'No Delay',
  args: {
    content: 'Instant — use sparingly',
    delay: 0,
    children: <TriggerButton>Instant tooltip</TriggerButton>,
  },
  parameters: {
    docs: {
      description: {
        story: '`delay={0}` — shows immediately on hover. Only appropriate for icon-only buttons where the label is the tooltip.',
      },
    },
  },
}

export const LongDelay: Story = {
  name: 'Long Delay',
  args: {
    content: 'You waited for it',
    delay: 800,
    children: <TriggerButton>Slow tooltip</TriggerButton>,
  },
}

export const RichContent: Story = {
  name: 'Rich Content',
  args: {
    content: (
      <span>
        Cached build artifacts{' '}
        <span style={{ color: 'var(--color-fg-subtle)' }}>· 1.2 GB</span>
      </span>
    ),
    children: <TriggerButton>Rich tooltip</TriggerButton>,
  },
  parameters: {
    docs: {
      description: {
        story: '`content` accepts any ReactNode — useful for appending metadata in a muted colour.',
      },
    },
  },
}

export const OnIconButton: Story = {
  name: 'On Icon Button',
  args: {
    content: 'Copy to clipboard',
    delay: 0,
    placement: 'top',
    children: (
      <button
        aria-label="Copy"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-fg-muted)',
          cursor: 'pointer',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
          <rect x="9" y="9" width="13" height="13" rx="0" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'The canonical use case: `delay={0}` on an icon-only button where the tooltip serves as the accessible label.',
      },
    },
  },
}

export const BothPlacements: Story = {
  name: 'Both Placements',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '60px 0' }}>
      <Tooltip content="Source maps disabled in prod" placement="top">
        <TriggerButton>Top</TriggerButton>
      </Tooltip>
      <Tooltip content="Cached build artifacts" placement="bottom">
        <TriggerButton>Bottom</TriggerButton>
      </Tooltip>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Both placements side by side — hover each trigger.' },
    },
  },
}

export const InContext: Story = {
  name: 'In Context — Toolbar',
  render: () => {
    const actions = [
      { label: 'Undo',    key: '⌘Z',   icon: '↩' },
      { label: 'Redo',    key: '⌘⇧Z',  icon: '↪' },
      { label: 'Copy',    key: '⌘C',   icon: '⎘' },
      { label: 'Paste',   key: '⌘V',   icon: '⌅' },
      { label: 'Delete',  key: '⌫',    icon: '✕' },
    ]

    return (
      <div style={{ display: 'flex', gap: 4 }}>
        {actions.map(({ label, key, icon }) => (
          <Tooltip
            key={label}
            placement="bottom"
            delay={200}
            content={
              <span>
                {label}{' '}
                <span style={{ color: 'var(--color-fg-subtle)', marginLeft: 4 }}>{key}</span>
              </span>
            }
          >
            <button
              aria-label={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-fg-muted)',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {icon}
            </button>
          </Tooltip>
        ))}
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Icon toolbar — each button has a tooltip with the action name and keyboard shortcut. `delay={200}` keeps it snappy without being noisy.',
      },
    },
  },
}