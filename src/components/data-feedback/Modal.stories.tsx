import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'


const meta = {
  title: 'Data & Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible dialog. Portals to `document.body`, traps focus within the modal, closes on Escape or overlay click, and locks body scroll while open. `open` and `onClose` are fully controlled — the parent owns visibility state.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    open: false,
    onClose: () => {},
    title: 'Modal title',
    children: null,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

//  Trigger wrapper

const TriggerButton = ({ label = 'Open modal' }: { label?: string }) => (
  <button
    style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      padding: '6px 14px',
      background: 'var(--color-accent)', border: 'none', color: '#fff',
      cursor: 'pointer',
    }}
  >
    {label}
  </button>
)

const BodyText = () => (
  <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', lineHeight: 1.6 }}>
    Modal body content goes here. Focus is trapped within this dialog — Tab cycles through focusable elements, Escape closes.
  </p>
)

const FooterActions = ({ onClose }: { onClose: () => void }) => (
  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
    <button
      onClick={onClose}
      style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-fg-muted)', cursor: 'pointer' }}
    >
      Cancel
    </button>
    <button
      onClick={onClose}
      style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'var(--color-accent)', border: 'none', color: '#fff', cursor: 'pointer' }}
    >
      Confirm
    </button>
  </div>
)

// Stories 

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'var(--color-accent)', border: 'none', color: '#fff', cursor: 'pointer' }}>
          Open modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} title="Default Modal" subtitle="Supporting subtitle text">
          <BodyText />
        </Modal>
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const WithFooter: Story = {
  name: 'With Footer',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'var(--color-accent)', border: 'none', color: '#fff', cursor: 'pointer' }}>
          Open with footer
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          subtitle="This cannot be undone."
          footer={<FooterActions onClose={() => setOpen(false)} />}
        >
          <BodyText />
        </Modal>
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const Destructive: Story = {
  name: 'Destructive Confirm',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'transparent', border: '1px solid var(--color-error)', color: 'var(--color-error)', cursor: 'pointer' }}>
          Delete project
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete Project"
          subtitle="This action is permanent and cannot be reversed."
          size="sm"
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-fg-muted)', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'var(--color-error)', border: 'none', color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
          }
        >
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', lineHeight: 1.6 }}>
            All builds, deployments, and settings for <strong style={{ color: 'var(--color-fg)' }}>lychee-studio</strong> will be permanently deleted.
          </p>
        </Modal>
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Destructive pattern — sm size, error-coloured confirm button, plain language warning.' },
    },
  },
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => {
    const [active, setActive] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null)
    const sizes = ['sm', 'md', 'lg', 'xl'] as const
    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-fg-muted)', cursor: 'pointer' }}
            >
              {s}
            </button>
          ))}
        </div>
        {sizes.map((s) => (
          <Modal
            key={s}
            open={active === s}
            onClose={() => setActive(null)}
            title={`Size — ${s.toUpperCase()}`}
            subtitle={`size="${s}"`}
            size={s}
            footer={<FooterActions onClose={() => setActive(null)} />}
          >
            <BodyText />
          </Modal>
        ))}
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All four size variants — click each button to compare max-width behaviour.' },
    },
  },
}

export const WithForm: Story = {
  name: 'With Form Content',
  render: () => {
    const [open, setOpen] = useState(false)
    const inputStyle = {
      height: 36, padding: '0 12px', width: '100%',
      fontFamily: 'var(--font-mono)', fontSize: 12,
      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
      color: 'var(--color-fg)', outline: 'none', boxSizing: 'border-box' as const,
    }
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px', background: 'var(--color-accent)', border: 'none', color: '#fff', cursor: 'pointer' }}>
          New workspace
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Create Workspace"
          subtitle="Workspaces group your projects and team."
          footer={<FooterActions onClose={() => setOpen(false)} />}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-fg-muted)' }}>Name</label>
              <input placeholder="my-workspace" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-fg-muted)' }}>Region</label>
              <input placeholder="eu-west-1" style={inputStyle} />
            </div>
          </div>
        </Modal>
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Form inside a modal — verifies focus trap cycles through all inputs and both footer buttons.' },
    },
  },
}