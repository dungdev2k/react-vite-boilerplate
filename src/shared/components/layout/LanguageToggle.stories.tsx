import type { Meta, StoryObj } from '@storybook/react-vite'

import { LanguageToggle } from './LanguageToggle'

const meta = {
  title: 'Shared/Layout/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
