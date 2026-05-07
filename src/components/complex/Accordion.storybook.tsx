import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const meta = {
  title: 'Complex/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animated expand/collapse list. Height transitions via measured `scrollHeight` — no CSS `max-height` hacks. Each item is independently controlled. Numeric index prefix is optional.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showIndex: {
      control: 'boolean',
      description: 'Prepends a zero-padded index (01, 02…) to each trigger.',
      table: { defaultValue: { summary: 'true' } },
    },
    items: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

//  Shared content helpers

const prose = (text: string) => (
  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-fg-muted)', lineHeight: 1.6, margin: 0 }}>
    {text}
  </p>
)

const FAQ_ITEMS = [
  {
    trigger: 'What is the Modern Industrial design system?',
    content: prose('A "Mono + 1" visual language built for high-contrast, geometric interfaces. Black, white, and grays anchored by a single accent — Fieber Pink or Summit Orange.'),
  },
  {
    trigger: 'How does the animation work?',
    content: prose('The height is measured via scrollHeight on open, then set to "auto" after the transition completes — preserving correct layout for dynamic content. On close it reverses through a double rAF to force a paint between the two states.'),
  },
  {
    trigger: 'Can items be open by default?',
    content: prose('Yes — pass defaultOpen: true on any item in the items array. Each AccordionItem manages its own open state independently.'),
  },
  {
    trigger: 'Is this accessible?',
    content: prose('Each trigger has aria-expanded and aria-controls pointing to the content region. The region has role="region" and aria-labelledby referencing the trigger.'),
  },
]

// Stories

export const Default: Story = {
  args: {
    items: FAQ_ITEMS,
    showIndex: true,
  },
}

export const NoIndex: Story = {
  name: 'Without Index',
  args: {
    items: FAQ_ITEMS,
    showIndex: false,
  },
  parameters: {
    docs: {
      description: { story: 'Index prefix hidden — cleaner for FAQ or content-first contexts.' },
    },
  },
}

export const WithDefaultOpen: Story = {
  name: 'With Default Open',
  args: {
    showIndex: true,
    items: [
      {
        trigger: 'Getting started',
        defaultOpen: true,
        content: prose('This item is open by default. Pass defaultOpen: true on any item in the array.'),
      },
      {
        trigger: 'Configuration',
        content: prose('Collapsed by default. Click to expand.'),
      },
      {
        trigger: 'Deployment',
        content: prose('Collapsed by default. Click to expand.'),
      },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'First item pre-expanded via `defaultOpen: true`.' },
    },
  },
}

export const WithRichContent: Story = {
  name: 'Rich Content',
  args: {
    showIndex: true,
    items: [
      {
        trigger: 'Spacing scale',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[4, 8, 12, 16, 24, 32].map((v) => (
              <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', width: 32 }}>{v}px</span>
                <div style={{ height: 4, width: v * 2, background: 'var(--color-accent)' }} />
              </div>
            ))}
          </div>
        ),
      },
      {
        trigger: 'Color tokens',
        content: (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['#0a0a0a', '#1a1a1a', '#2a2a2a', '#404040', '#6b6b6b', '#f0f0f0', '#FF4D00'].map((c) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 32, height: 32, background: c, border: '1px solid var(--color-border)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-fg-subtle)' }}>{c}</span>
              </div>
            ))}
          </div>
        ),
      },
      {
        trigger: 'Type scale',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'xs', size: 12 },
              { label: 'sm', size: 14 },
              { label: 'base', size: 16 },
              { label: 'lg', size: 18 },
              { label: 'xl', size: 20 },
            ].map(({ label, size }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-fg-subtle)', width: 28 }}>{label}</span>
                <span style={{ fontSize: size, color: 'var(--color-fg)', lineHeight: 1 }}>The quick brown fox</span>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: { story: 'Content slot accepts any ReactNode — components, tables, visuals.' },
    },
  },
}

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    showIndex: false,
    items: [
      {
        trigger: 'Expand for details',
        content: prose('A standalone accordion item — useful for progressive disclosure without a full list.'),
      },
    ],
  },
}