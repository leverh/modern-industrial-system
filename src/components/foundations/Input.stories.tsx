import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

//  Icons (inline SVGs) 
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const AtSignIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
)

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <rect x="3" y="11" width="18" height="11" rx="0" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const meta = {
  title: 'Foundations/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single-line text input. Monospace labels, sharp geometry, accent focus ring. Supports left/right icons, error state, hint text, and three size variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Uppercase mono label rendered above the field.',
    },
    placeholder: {
      control: 'text',
    },
    hint: {
      control: 'text',
      description: 'Subtle helper text below the field (mono, xs).',
    },
    error: {
      control: 'text',
      description: 'Error message — overrides hint and turns label + border red.',
    },
    mono: {
      control: 'boolean',
      description: 'Renders the input value in JetBrains Mono.',
      table: { defaultValue: { summary: 'false' } },
    },
    sizing: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Height variant: 32 / 40 / 48px.',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    iconLeft: {
      table: { disable: true },
    },
    iconRight: {
      table: { disable: true },
    },
  },
  args: {
    label: 'Project Name',
    placeholder: 'my-component-lib',
    sizing: 'md',
    mono: false,
    disabled: false,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Stories

export const Default: Story = {}

export const WithHint: Story = {
  args: {
    label: 'npm Package',
    placeholder: '@scope/my-lib',
    hint: 'Used as the published package identifier.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Repository URL',
    placeholder: 'https://github.com/org/repo',
    defaultValue: 'not-a-valid-url',
    error: 'Must be a valid HTTPS URL.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state: label turns accent-error, border red, hint replaced by `role="alert"` message.',
      },
    },
  },
}

export const WithIconLeft: Story = {
  args: {
    label: 'Search',
    placeholder: 'Find component…',
    iconLeft: <SearchIcon />,
  },
}

export const WithIconRight: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    iconRight: <EyeIcon />,
  },
}

export const WithBothIcons: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@fieber.studio',
    iconLeft: <AtSignIcon />,
    iconRight: <LockIcon />,
    hint: 'Work email only.',
  },
}

export const Mono: Story = {
  args: {
    label: 'API Key',
    placeholder: 'sk-••••••••••••••••',
    defaultValue: 'sk-prod-a1b2c3d4e5f6',
    mono: true,
    iconLeft: <LockIcon />,
    hint: 'Treat this like a password.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Mono variant renders the value in JetBrains Mono — ideal for tokens, slugs, and code identifiers.',
      },
    },
  },
}

export const SizeSm: Story = {
  name: 'Size — sm',
  args: {
    label: 'Tag',
    placeholder: 'v1.0.0',
    sizing: 'sm',
  },
}

export const SizeMd: Story = {
  name: 'Size — md (default)',
  args: {
    sizing: 'md',
  },
}

export const SizeLg: Story = {
  name: 'Size — lg',
  args: {
    label: 'Headline',
    placeholder: 'Enter a page title…',
    sizing: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Environment',
    defaultValue: 'production',
    disabled: true,
    hint: 'Cannot be changed after deploy.',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Deploy URL',
    defaultValue: 'https://lychee.fieber.studio',
    readOnly: true,
    hint: 'Generated automatically.',
  },
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
      <Input label="Small" placeholder="32px height" sizing="sm" />
      <Input label="Medium" placeholder="40px height" sizing="md" />
      <Input label="Large" placeholder="48px height" sizing="lg" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All three height variants stacked.' },
    },
  },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
      <Input label="Default" placeholder="Idle state" />
      <Input label="With Value" defaultValue="fieber-studio" />
      <Input label="With Hint" placeholder="hint below" hint="This is helper text." />
      <Input label="Error" defaultValue="bad-value!" error="Invalid format — alphanumeric only." />
      <Input label="Disabled" defaultValue="read-only value" disabled />
      <Input label="Read Only" defaultValue="https://generated.url" readOnly hint="Auto-generated." />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Complete state matrix in a single view.' },
    },
  },
}