import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './Breadcrumbs'

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible breadcrumb trail. Renders as `<nav aria-label="Breadcrumb"><ol role="list">` — correct landmark and list semantics. Last item gets `aria-current="page"` and is non-interactive.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      table: { defaultValue: { summary: '/' } },
    },
    items: { table: { disable: true } },
  },
  args: {
    items: [
      { label: 'Workspace', href: '#' },
      { label: 'Component Lib', href: '#' },
      { label: 'Navigation' },
    ],
    separator: '/',
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

// Stories

export const Default: Story = {}

export const TwoLevels: Story = {
  name: 'Two Levels',
  args: {
    items: [
      { label: 'Projects', href: '#' },
      { label: 'lychee-studio' },
    ],
  },
}

export const DeepPath: Story = {
  name: 'Deep Path',
  args: {
    items: [
      { label: 'Workspace', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'lychee-studio', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Integrations' },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Five levels — verify separator spacing and that only the last item is non-interactive.' },
    },
  },
}

export const CustomSeparator: Story = {
  name: 'Custom Separator',
  args: {
    items: [
      { label: 'Workspace', href: '#' },
      { label: 'Component Lib', href: '#' },
      { label: 'Breadcrumbs' },
    ],
    separator: '→',
  },
}

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: [{ label: 'Dashboard' }],
  },
  parameters: {
    docs: {
      description: { story: 'Edge case — single item renders as current page only, no separator.' },
    },
  },
}

export const AllSeparators: Story = {
  name: 'Separator Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['/', '→', '›', '·', '//'].map((sep) => (
        <Breadcrumbs
          key={sep}
          separator={sep}
          items={[
            { label: 'Workspace', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Active page' },
          ]}
        />
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Common separator options — pick what fits your header context.' },
    },
  },
}