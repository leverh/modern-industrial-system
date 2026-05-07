import type { Meta, StoryObj } from '@storybook/react'
import { Navbar } from './Navbar'

const meta = {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top navigation bar. Adds a `scrolled` class via a passive scroll listener — use this to trigger backdrop blur or border in CSS. Brand initial is used as the logo mark. `actions` slot accepts any ReactNode.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'text', table: { defaultValue: { summary: 'SYSTEM' } } },
    version: { control: 'text' },
    items: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
  args: {
    brand: 'LYCHEE',
    version: 'v1.0.0',
    items: [
      { label: 'Components', href: '#', active: true },
      { label: 'Foundations', href: '#' },
      { label: 'Patterns', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

// Shared action slot

const NavActions = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <button style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      padding: '5px 12px',
      background: 'transparent',
      border: '1px solid var(--color-border)',
      color: 'var(--color-fg-muted)',
      cursor: 'pointer',
    }}>
      Sign in
    </button>
    <button style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      padding: '5px 12px',
      background: 'var(--color-accent)',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
    }}>
      Get started
    </button>
  </div>
)

// Scroll demo decorator
// Wraps the story in a tall scrollable container so the scroll-triggered
// .scrolled class can actually fire during manual testing.

const ScrollDecorator = (Story: React.ComponentType) => (
  <div style={{ height: '300vh', position: 'relative' }}>
    <Story />
    <div style={{
      position: 'absolute', top: 80, left: 24,
      fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-subtle)',
    }}>
      ↓ Scroll down to see the scrolled state
    </div>
  </div>
)

// Stories

export const Default: Story = {}

export const WithActions: Story = {
  name: 'With Actions',
  args: { actions: <NavActions /> },
  parameters: {
    docs: {
      description: { story: 'Actions slot — typically sign-in + CTA. Accepts any ReactNode, pinned to the right.' },
    },
  },
}

export const WithScrollBehaviour: Story = {
  name: 'Scroll Behaviour',
  args: { actions: <NavActions /> },
  decorators: [ScrollDecorator],
  parameters: {
    docs: {
      description: { story: 'Scroll the canvas to trigger the `.scrolled` modifier — backdrop blur and border appear via CSS on the scroll state.' },
    },
  },
}

export const NoVersion: Story = {
  name: 'Without Version',
  args: { version: undefined },
}

export const NoLinks: Story = {
  name: 'Brand Only',
  args: { items: [], version: undefined, actions: <NavActions /> },
  parameters: {
    docs: {
      description: { story: 'Minimal navbar — brand + actions, no nav links. Common for app shells with sidebar navigation.' },
    },
  },
}

export const AllActive: Story = {
  name: 'Active State',
  args: {
    items: [
      { label: 'Components', href: '#', active: true },
      { label: 'Foundations', href: '#' },
      { label: 'Patterns', href: '#' },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'First item active — `aria-current="page"` and accent underline treatment.' },
    },
  },
}