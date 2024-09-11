import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserList from './UserList';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders loading state initially', () => {
  fetchMock.mockResponseOnce(JSON.stringify([]));
  render(<UserList />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders list of users after data is fetched successfully', async () => {
  const mockUsers = [
    { id: 1, name: 'Leanne Graham' },
    { id: 2, name: 'Ervin Howell' },
  ];
  fetchMock.mockResponseOnce(JSON.stringify(mockUsers));

  render(<UserList />);

  await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument());
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
});

test('renders error message when API call fails', async () => {
  fetchMock.mockReject(() => Promise.reject('API is down'));

  render(<UserList />);

  await waitFor(() => expect(screen.getByText(/Error/i)).toBeInTheDocument());
});
