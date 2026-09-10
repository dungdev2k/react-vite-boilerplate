import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { LoginForm } from './LoginForm'

const meta = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  args: {
    onSuccess: fn(),
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
