import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowRight, Trash2, Plus } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Foundations/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// --- Core variants ---

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Execute',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Execute',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Execute',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

// --- States ---

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Processing',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Execute',
    disabled: true,
  },
}

// --- With icons ---

export const WithIconRight: Story = {
  args: {
    variant: 'primary',
    children: 'Continue',
    iconRight: <ArrowRight size={16} />,
  },
}

export const WithIconLeft: Story = {
  args: {
    variant: 'secondary',
    children: 'Add Item',
    iconLeft: <Plus size={16} />,
  },
}

export const DestructiveWithIcon: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
    iconLeft: <Trash2 size={16} />,
  },
}

// --- Sizes ---

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Execute' },
}

export const Medium: Story = {
  args: { variant: 'primary', size: 'md', children: 'Execute' },
}

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Execute' },
}