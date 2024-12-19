import type { Meta, StoryObj } from '@storybook/react';

import MatePage from '.';

const meta: Meta<typeof MatePage> = {
  title: 'Pages/Mate',
  component: MatePage,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof MatePage>;

export const Primary: Story = {};
