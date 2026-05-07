import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RangeSlider } from './RangeSlider'

const meta = {
  title: 'Complex/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Custom-styled range input. The native `<input type="range">` handles all interaction and accessibility; the visual track, fill, and thumb are layered on top via absolute positioning. Supports controlled and uncontrolled usage.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    defaultValue: { control: 'number' },
    unit: { control: 'text' },
    showTicks: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    tickCount: {
      control: { type: 'number', min: 2, max: 10 },
      table: { defaultValue: { summary: '5' } },
    },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    label: 'Threshold',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    unit: '',
    showTicks: false,
    tickCount: 5,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, padding: '8px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

// Stories

export const Default: Story = {}

export const WithUnit: Story = {
  args: {
    label: 'Opacity',
    unit: '%',
    defaultValue: 75,
  },
}

export const WithTicks: Story = {
  name: 'With Ticks',
  args: {
    label: 'Quality',
    min: 0,
    max: 100,
    defaultValue: 60,
    showTicks: true,
    tickCount: 5,
  },
  parameters: {
    docs: {
      description: { story: 'Tick marks and labels rendered below the track. Count is configurable.' },
    },
  },
}

export const CustomRange: Story = {
  name: 'Custom Range',
  args: {
    label: 'Max connections',
    min: 1,
    max: 32,
    step: 1,
    defaultValue: 8,
    showTicks: true,
    tickCount: 5,
  },
}

export const DecimalStep: Story = {
  name: 'Decimal Step',
  args: {
    label: 'Scale',
    min: 0.5,
    max: 3,
    step: 0.1,
    defaultValue: 1,
    unit: 'x',
    showTicks: true,
    tickCount: 6,
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <RangeSlider
          label="Budget"
          min={0}
          max={1000}
          step={10}
          unit="€"
          value={value}
          onChange={setValue}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 250, 500, 750, 1000].map((v) => (
            <button
              key={v}
              onClick={() => setValue(v)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                padding: '4px 10px',
                background: value === v ? 'var(--color-accent)' : 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: value === v ? '#fff' : 'var(--color-fg-muted)',
                cursor: 'pointer',
              }}
            >
              {v}€
            </button>
          ))}
        </div>
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled via `value` + `onChange`. Preset buttons drive the slider externally — the canonical pattern for syncing sliders with other inputs.',
      },
    },
  },
}

export const MultipleSliders: Story = {
  name: 'Multiple Sliders',
  render: () => {
    const [vals, setVals] = useState({ brightness: 80, contrast: 50, saturation: 60 })
    const set = (key: keyof typeof vals) => (v: number) => setVals((s) => ({ ...s, [key]: v }))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <RangeSlider label="Brightness" unit="%" value={vals.brightness} onChange={set('brightness')} />
        <RangeSlider label="Contrast"   unit="%" value={vals.contrast}   onChange={set('contrast')} />
        <RangeSlider label="Saturation" unit="%" value={vals.saturation} onChange={set('saturation')} />
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Multiple controlled sliders sharing a single state object — typical image/audio settings pattern.' },
    },
  },
}