import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from './Sidebar'
import { Badge } from '../foundations/Badge'

// Inline SVG icons (square linecap, on-system)

const IconGrid    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
const IconBox     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
const IconLayers  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
const IconSettings= () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
const IconBook    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconUser    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Vertical navigation sidebar. Composed from sections with optional labels. Each item supports an icon, active state, badge, and click handler. Footer slot accepts any ReactNode.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    sections: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  args: { sections: [] },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 240, border: '1px solid var(--color-border)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// Shared data

const MAIN_SECTIONS = [
  {
    items: [
      { label: 'Overview',    href: '#', icon: <IconGrid />,     active: true },
      { label: 'Components',  href: '#', icon: <IconBox /> },
      { label: 'Foundations', href: '#', icon: <IconLayers /> },
      { label: 'Patterns',    href: '#', icon: <IconBook /> },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Workspace',   href: '#', icon: <IconSettings /> },
      { label: 'Account',     href: '#', icon: <IconUser /> },
    ],
  },
]

// Stories

export const Default: Story = {
  args: {
    title: 'LYCHEE',
    sections: MAIN_SECTIONS,
  },
}

export const NoTitle: Story = {
  name: 'Without Title',
  args: { sections: MAIN_SECTIONS },
  parameters: {
    docs: {
      description: { story: 'Title is optional — omit when the sidebar sits inside a layout that already has a header.' },
    },
  },
}

export const WithBadges: Story = {
  name: 'With Badges',
  args: {
    title: 'LYCHEE',
    sections: [
      {
        items: [
          { label: 'Overview',   href: '#', icon: <IconGrid />, active: true },
          { label: 'Components', href: '#', icon: <IconBox />,  badge: <Badge variant="accent" size="sm">20</Badge> },
          { label: 'Changelog',  href: '#', icon: <IconBook />, badge: <Badge variant="success" size="sm" pulseDot>New</Badge> },
        ],
      },
      {
        label: 'Settings',
        items: [
          { label: 'Workspace', href: '#', icon: <IconSettings />, badge: <Badge variant="error" size="sm">2</Badge> },
          { label: 'Account',   href: '#', icon: <IconUser /> },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Badge slot accepts any ReactNode — count badges, status badges, or "New" indicators.' },
    },
  },
}

export const WithFooter: Story = {
  name: 'With Footer',
  args: {
    title: 'LYCHEE',
    sections: MAIN_SECTIONS,
    footer: (
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff', flexShrink: 0,
        }}>L</div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-fg)', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Lychee Studio</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>lychee.fieber.studio</p>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: { story: 'Footer slot — typically a user/workspace switcher. Pinned to the bottom of the sidebar.' },
    },
  },
}

export const NoIcons: Story = {
  name: 'Without Icons',
  args: {
    title: 'NAVIGATION',
    sections: [
      {
        label: 'Library',
        items: [
          { label: 'Components', href: '#', active: true },
          { label: 'Foundations', href: '#' },
          { label: 'Patterns', href: '#' },
        ],
      },
      {
        label: 'Meta',
        items: [
          { label: 'Changelog', href: '#' },
          { label: 'Settings', href: '#' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Icons are optional — label-only works well for dense navigation or secondary sidebars.' },
    },
  },
}

export const SingleSection: Story = {
  name: 'Single Section',
  args: {
    sections: [
      {
        items: [
          { label: 'Overview',   href: '#', icon: <IconGrid />, active: true },
          { label: 'Components', href: '#', icon: <IconBox /> },
          { label: 'Docs',       href: '#', icon: <IconBook /> },
        ],
      },
    ],
  },
}