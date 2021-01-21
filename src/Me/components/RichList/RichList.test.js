import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import RichList from '.';

const items = [
  {
    id: '123',
    avatar: '../../assets/me/mentors.svg',
    title: 'Mooli m',
    subtitle: 'web dev',
    tag: {
      value: 'pending',
      theme: 'secondary',
    },
    info: '3 days ago',
    children: <h1>123</h1>,
  },
  {
    id: '456',
    avatar: '../../assets/me/camera.svg',
    title: 'Someone',
    subtitle: 'Rock star dev',
    tag: {
      value: 'Accepted',
      theme: 'primary',
    },
    info: '6 days ago',
    children: <h1>456</h1>,
  },
];

// jest.useFakeTimers()

describe('RichList component', () => {
  it('Should render 2 items', async () => {
    const { findAllByText } = render(<RichList items={items} />);
    const rgx = new RegExp(`${items[0].title}|${items[1].title}`);
    const itemsEl = await findAllByText(rgx);

    expect(itemsEl.length).toBe(2);
  });

  it('Should show/hide children content on item click', async () => {
    const { id, title } = items[0];
    const { getByText, queryByText } = render(<RichList items={items} />);
    const titleEl = getByText(title);

    fireEvent.click(titleEl);

    getByText(id);

    fireEvent.click(titleEl);

    await waitForElementToBeRemoved(() => queryByText(id));

    expect(queryByText(id)).toBeFalsy();
  });
});
