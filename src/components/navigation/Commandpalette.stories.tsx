import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { CommandPalette } from './CommandPalette'
import type { CommandItem } from './CommandPalette'

// CommandPalette is fully controlled and portals an overlay.
// All stories use render + useState. The ⌘K shortcut works in the
// Storybook canvas as long as focus is inside the iframe.

const meta: Meta = {
  title: 'Navigation/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Keyboard-first command palette. Opens on `⌘K` / `Ctrl+K` (capture phase listener). Arrow keys navigate; Enter executes the focused item; Escape closes. Items are grouped and filterable by label or description.',
      },
    },
  },
  tags: ['autodocs'],
  args: { open: false, onClose: () => {}, items: [] },
}

export default meta
type Story = StoryObj<Meta>

// Shared command sets

const IconDeploy = () => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>⬆</span>
const IconSettings = () => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>⚙</span>
const IconSearch = () => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>⌕</span>
const IconTheme = () => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>◑</span>
const IconDocs = () => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>⎘</span>
const IconNew = () => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>+</span>

const BASE_COMMANDS: CommandItem[] = [
  {
    id: 'deploy',
    label: 'Deploy to production',
    description: 'Push the current build to eu-west-1',
    icon: <IconDeploy />,
    kbd: '⌘D',
    group: 'Actions',
    action: () => alert('Deploying…'),
  },
  {
    id: 'new-project',
    label: 'New project',
    description: 'Create a new workspace project',
    icon: <IconNew />,
    kbd: '⌘N',
    group: 'Actions',
    action: () => alert('New project'),
  },
  {
    id: 'search',
    label: 'Search components',
    description: 'Full-text search across the library',
    icon: <IconSearch />,
    kbd: '⌘F',
    group: 'Navigate',
    action: () => alert('Search'),
  },
  {
    id: 'docs',
    label: 'Open documentation',
    description: 'View component API docs',
    icon: <IconDocs />,
    group: 'Navigate',
    action: () => alert('Docs'),
  },
  {
    id: 'settings',
    label: 'Workspace settings',
    description: 'Manage team, billing, and integrations',
    icon: <IconSettings />,
    kbd: '⌘,',
    group: 'Settings',
    action: () => alert('Settings'),
  },
  {
    id: 'theme',
    label: 'Toggle theme',
    description: 'Switch between light and dark mode',
    icon: <IconTheme />,
    kbd: '⌘⇧T',
    group: 'Settings',
    action: () => alert('Toggle theme'),
  },
]

// Trigger wrapper

const TriggerHint = ({ onClick }: { onClick: () => void }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        padding: '6px 14px',
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-fg-muted)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      Open palette
      <span style={{ opacity: 0.5, fontSize: 10 }}>⌘K</span>
    </button>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)' }}>
      or press ⌘K / Ctrl+K while focused in the canvas
    </span>
  </div>
)

// Stories

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <TriggerHint onClick={() => setOpen(true)} />
        <CommandPalette
          items={BASE_COMMANDS}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const InitiallyOpen: Story = {
  name: 'Initially Open',
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <TriggerHint onClick={() => setOpen(true)} />
        <CommandPalette
          items={BASE_COMMANDS}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Palette pre-opened — useful for screenshot/visual regression of the full UI.' },
    },
  },
}

export const CustomPlaceholder: Story = {
  name: 'Custom Placeholder',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <TriggerHint onClick={() => setOpen(true)} />
        <CommandPalette
          items={BASE_COMMANDS}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          placeholder="Search commands, docs, settings…"
        />
      </>
    )
  },
  parameters: { controls: { disable: true } },
}

export const FewItems: Story = {
  name: 'Few Items — No Groups',
  render: () => {
    const [open, setOpen] = useState(false)
    const items: CommandItem[] = [
      { id: 'deploy', label: 'Deploy', icon: <IconDeploy />, kbd: '⌘D', action: () => alert('Deploy') },
      { id: 'settings', label: 'Settings', icon: <IconSettings />, kbd: '⌘,', action: () => alert('Settings') },
      { id: 'docs', label: 'Documentation', icon: <IconDocs />, action: () => alert('Docs') },
    ]
    return (
      <>
        <TriggerHint onClick={() => setOpen(true)} />
        <CommandPalette items={items} open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} />
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Items without a `group` fall into the default "Commands" group. With only one group, the label is the only header.' },
    },
  },
}

export const ManyItems: Story = {
  name: 'Many Items',
  render: () => {
    const [open, setOpen] = useState(false)
    const extra: CommandItem[] = Array.from({ length: 12 }, (_, i) => ({
      id: `cmd-${i}`,
      label: `Command ${String(i + 1).padStart(2, '0')}`,
      description: `Description for command ${i + 1}`,
      group: i < 4 ? 'Actions' : i < 8 ? 'Navigate' : 'Settings',
    }))
    return (
      <>
        <TriggerHint onClick={() => setOpen(true)} />
        <CommandPalette items={extra} open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} />
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: '12 items across three groups — verifies scrollable results list and keyboard navigation.' },
    },
  },
}

export const EmptyState: Story = {
  name: 'Empty Search Result',
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <>
        <TriggerHint onClick={() => setOpen(true)} />
        <CommandPalette
          items={[{ id: 'deploy', label: 'Deploy', group: 'Actions', action: () => {} }]}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          placeholder='Try typing "xyz" to see empty state'
        />
      </>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Type a query that matches nothing — renders the "No results" empty state.' },
    },
  },
}