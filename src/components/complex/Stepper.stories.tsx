import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Stepper } from './Stepper'

const meta = {
  title: 'Complex/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress indicator for multi-step flows. Steps are `completed`, `active`, or `upcoming` based on `currentStep`. The `content` slot renders only on the active step. `currentStep` is fully controlled — wire it to your own navigation logic.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0 },
      description: 'Zero-based index of the active step.',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
    steps: { table: { disable: true } },
  },
  args: { steps: [], currentStep: 0 },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

// Shared step definitions 

const SETUP_STEPS = [
  { title: 'Account',     description: 'Create your credentials' },
  { title: 'Workspace',   description: 'Name your workspace' },
  { title: 'Invite',      description: 'Add team members' },
  { title: 'Deploy',      description: 'Push your first build' },
]

// Stories 

export const StepOne: Story = {
  name: 'Step 1 of 4',
  args: { steps: SETUP_STEPS, currentStep: 0, orientation: 'horizontal' },
}

export const StepTwo: Story = {
  name: 'Step 2 of 4',
  args: { steps: SETUP_STEPS, currentStep: 1 },
}

export const StepThree: Story = {
  name: 'Step 3 of 4',
  args: { steps: SETUP_STEPS, currentStep: 2 },
}

export const Completed: Story = {
  name: 'All Completed',
  args: { steps: SETUP_STEPS, currentStep: 4 },
  parameters: {
    docs: {
      description: { story: '`currentStep` beyond the last index — all steps show the completed checkmark.' },
    },
  },
}

export const Vertical: Story = {
  args: { steps: SETUP_STEPS, currentStep: 1, orientation: 'vertical' },
  parameters: {
    docs: {
      description: { story: 'Vertical orientation — better for sidebar progress or tall viewports.' },
    },
  },
}

export const WithContent: Story = {
  name: 'With Active Content',
  args: {
    currentStep: 1,
    orientation: 'vertical',
    steps: [
      {
        title: 'Account',
        description: 'Create your credentials',
      },
      {
        title: 'Workspace',
        description: 'Name your workspace',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
            <input
              placeholder="my-workspace"
              style={{
                height: 36,
                padding: '0 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-fg)',
                outline: 'none',
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)' }}>
              Used as your URL slug — lowercase, hyphens only.
            </span>
          </div>
        ),
      },
      {
        title: 'Invite',
        description: 'Add team members',
      },
      {
        title: 'Deploy',
        description: 'Push your first build',
      },
    ],
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'The `content` slot renders only on the active step — use for inline forms, instructions, or contextual actions.' },
    },
  },
}

export const Interactive: Story = {
  name: 'Interactive — Full Flow',
  render: () => {
    const [step, setStep] = useState(0)

    const steps = [
      { title: 'Account',   description: 'Create your credentials' },
      { title: 'Workspace', description: 'Name your workspace' },
      { title: 'Invite',    description: 'Add team members' },
      { title: 'Deploy',    description: 'Launch your project' },
    ]

    const done = step >= steps.length

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Stepper steps={steps} currentStep={step} orientation="horizontal" />

        <div style={{
          padding: '24px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          minHeight: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {done ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-success)' }}>
              ✓ All steps complete
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-fg-muted)' }}>
              Step {step + 1} — {steps[step].title}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '6px 14px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: step === 0 ? 'var(--color-fg-subtle)' : 'var(--color-fg)',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              opacity: step === 0 ? 0.4 : 1,
            }}
          >
            ← Back
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
            disabled={done}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              padding: '6px 14px',
              background: done ? 'transparent' : 'var(--color-accent)',
              border: '1px solid var(--color-border)',
              color: done ? 'var(--color-fg-subtle)' : '#fff',
              cursor: done ? 'not-allowed' : 'pointer',
              opacity: done ? 0.4 : 1,
            }}
          >
            {step === steps.length - 1 ? 'Finish' : 'Next →'}
          </button>
          {done && (
            <button
              onClick={() => setStep(0)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                padding: '6px 14px',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-fg-muted)',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Fully wired flow — Back / Next / Finish / Reset. This is the reference implementation for connecting `Stepper` to navigation state.',
      },
    },
  },
}