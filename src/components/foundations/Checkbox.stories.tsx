import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Foundations/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible checkbox with animated checkmark, indeterminate state, and optional hint text. Accent fill on checked, sharp 2px geometry consistent with the Modern Industrial system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label rendered to the right of the control.',
    },
    hint: {
      control: 'text',
      description: 'Mono xs hint rendered below the label row (indented to align with label).',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state.',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Uncontrolled initial state.',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Enable feature',
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Stories

export const Default: Story = {
  args: {
    label: 'Enable telemetry',
  },
}

export const Checked: Story = {
  args: {
    label: 'Enable telemetry',
    defaultChecked: true,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Enable telemetry',
    hint: 'Anonymous usage data — helps improve performance.',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hint renders in JetBrains Mono, indented to align with the label text.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Strict mode',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: {
    label: 'Strict mode',
    defaultChecked: true,
    disabled: true,
  },
}

export const Indeterminate: Story = {
  render: () => {
    // indeterminate can only be set imperatively via ref
    const ref = (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = true
    }
    return <Checkbox ref={ref} label="Select all" hint="Some items in this group are selected." />
  },
  parameters: {
    docs: {
      description: {
        story:
          'Indeterminate state is set imperatively via `ref` — the same pattern used in data-table row selection. The dash mark uses the accent fill, matching checked.',
      },
    },
    controls: { disable: true },
  },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label={checked ? 'Beta features enabled' : 'Enable beta features'}
        hint="Requires restart to take effect."
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled pattern — label updates to reflect state, driven by `useState`.',
      },
    },
    controls: { disable: true },
  },
}

export const Group: Story = {
  name: 'Checkbox Group',
  render: () => {
    const [vals, setVals] = useState({
      telemetry: true,
      strict: false,
      beta: false,
    })
    const toggle = (key: keyof typeof vals) =>
      setVals((v) => ({ ...v, [key]: !v[key] }))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Checkbox
          label="Enable telemetry"
          hint="Anonymous usage data."
          checked={vals.telemetry}
          onChange={() => toggle('telemetry')}
        />
        <Checkbox
          label="Strict mode"
          checked={vals.strict}
          onChange={() => toggle('strict')}
        />
        <Checkbox
          label="Beta features"
          hint="May be unstable."
          checked={vals.beta}
          onChange={() => toggle('beta')}
        />
        <Checkbox
          label="SSO enforced"
          hint="Managed by your organisation."
          disabled
          defaultChecked
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Typical settings group — mix of controlled, uncontrolled, and disabled items.',
      },
    },
    controls: { disable: true },
  },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="With hint" hint="Helper text in mono." defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'All discrete states in a single view.' },
    },
  },
}