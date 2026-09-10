import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserForm } from './UserForm'

const meta = {
  title: 'Features/Users/UserForm',
  component: UserForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
    loading: false,
  },
  argTypes: {
    loading: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserForm>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Prefilled: Story = {
  args: {
    defaultValues: {
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0900000000',
      company: 'Acme Inc.',
    },
  },
}

export const Loading: Story = {
  args: { loading: true },
}
