import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter, BlueprintCard } from './Card'

const meta = {
  title: 'Complex/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Composable card system. `Card` sets the container variant; `CardHeader`, `CardBody`, `CardFooter` are the content slots. `BlueprintCard` is a standalone variant with measurement annotations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'interactive', 'outlined', 'filled', 'accented', 'blueprint'],
      table: { defaultValue: { summary: 'default' } },
    },
    children: { table: { disable: true } },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Shared sub-content

const SampleBody = () => (
  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', margin: 0, lineHeight: 1.6 }}>
    Component content goes here. The body slot accepts any ReactNode — text, lists, visuals, or nested components.
  </p>
)

const SampleActions = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <button style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', background: 'var(--color-accent)', border: 'none', color: '#fff', cursor: 'pointer' }}>
      Action
    </button>
    <button style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-fg-muted)', cursor: 'pointer' }}>
      Cancel
    </button>
  </div>
)

// Stories 

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader title="Card Title" subtitle="Supporting subtitle text" />
      <CardBody><SampleBody /></CardBody>
      <CardFooter><SampleActions /></CardFooter>
    </Card>
  ),
}

export const Interactive: Story = {
  args: { variant: 'interactive' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader title="Interactive Card" subtitle="Focusable, hoverable — role=button" />
      <CardBody><SampleBody /></CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      description: { story: 'Adds `tabIndex={0}` and `role="button"`. Use for clickable card patterns — link cards, selection cards, etc.' },
    },
  },
}

export const Outlined: Story = {
  args: { variant: 'outlined' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader title="Outlined" subtitle="Border only, no fill" />
      <CardBody><SampleBody /></CardBody>
    </Card>
  ),
}

export const Filled: Story = {
  args: { variant: 'filled' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader title="Filled" subtitle="Surface fill variant" />
      <CardBody><SampleBody /></CardBody>
    </Card>
  ),
}

export const Accented: Story = {
  args: { variant: 'accented' },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader title="Accented" subtitle="Accent border treatment" />
      <CardBody><SampleBody /></CardBody>
    </Card>
  ),
}

export const WithHeaderActions: Story = {
  name: 'Header with Actions',
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader
        title="Build Pipeline"
        subtitle="Last run 4 minutes ago"
        actions={
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 8px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: 'var(--color-success)' }}>
            PASSING
          </span>
        }
      />
      <CardBody><SampleBody /></CardBody>
      <CardFooter><SampleActions /></CardFooter>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Header `actions` slot — badge, icon button, or any node pinned to the right.' },
    },
  },
}

export const HeaderOnly: Story = {
  name: 'Header Only',
  render: () => (
    <Card style={{ maxWidth: 380 }}>
      <CardHeader title="Minimal Card" subtitle="No body or footer" />
    </Card>
  ),
  parameters: { controls: { disable: true } },
}

export const BodyOnly: Story = {
  name: 'Body Only',
  render: () => (
    <Card style={{ maxWidth: 380 }}>
      <CardBody><SampleBody /></CardBody>
    </Card>
  ),
  parameters: { controls: { disable: true } },
}

export const BlueprintVariant: Story = {
  name: 'Blueprint Card',
  render: () => (
    <BlueprintCard
      title="Component Anatomy"
      annotations={[
        { label: '16px', top: '8px', left: '8px' },
        { label: 'border-radius: 0', bottom: '8px', right: '8px' },
        { label: '1px solid', top: '8px', right: '8px' },
      ]}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-subtle)', margin: '8px 0 0' }}>
        Measurement annotations overlay the card surface.
      </p>
    </BlueprintCard>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Standalone `BlueprintCard` — crosshair rules + annotation labels. Used in the portfolio exploded-view presentation.' },
    },
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {(['default', 'interactive', 'outlined', 'filled', 'accented'] as const).map((v) => (
        <Card key={v} variant={v}>
          <CardHeader title={v.charAt(0).toUpperCase() + v.slice(1)} />
          <CardBody>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-fg-subtle)', margin: 0 }}>
              variant="{v}"
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All five standard variants in a single view.' },
    },
  },
}