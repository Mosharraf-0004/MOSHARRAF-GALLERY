import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

test('renders User Login and Admin Login tab options on initial load', () => {
  render(<App />);
  const userTab = screen.getByRole('button', { name: /user login/i });
  const adminTab = screen.getByRole('button', { name: /admin login/i });
  expect(userTab).toBeInTheDocument();
  expect(adminTab).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /enter as user/i })).toBeInTheDocument();
});

test('regular User login: can view gallery but cannot delete or see upload link', () => {
  render(<App />);

  // Fill user name and submit
  const input = screen.getByPlaceholderText(/enter your name \/ username/i);
  fireEvent.change(input, { target: { value: 'StudentAlice' } });
  fireEvent.click(screen.getByRole('button', { name: /enter as user/i }));

  // Should navigate to gallery and show user badge
  expect(screen.getByText(/user: studentalice/i)).toBeInTheDocument();
  expect(screen.getByText(/apollo 11 moon landing/i)).toBeInTheDocument();

  // User should NOT see Upload navigation link
  expect(screen.queryByRole('link', { name: /upload/i })).not.toBeInTheDocument();

  // User should NOT see any Delete buttons
  expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
});

test('admin login with wrong password displays error banner', () => {
  render(<App />);

  // Switch to admin tab
  fireEvent.click(screen.getByRole('button', { name: /admin login/i }));

  // Enter invalid credentials
  fireEvent.change(screen.getByPlaceholderText(/admin username/i), { target: { value: 'admin' } });
  fireEvent.change(screen.getByPlaceholderText(/admin password/i), { target: { value: 'wrongpass' } });
  fireEvent.click(screen.getByRole('button', { name: /enter as administrator/i }));

  expect(screen.getByText(/invalid admin credentials/i)).toBeInTheDocument();
});

test('admin login with valid credentials: can see Upload link and Delete buttons', () => {
  render(<App />);

  // Switch to admin tab
  fireEvent.click(screen.getByRole('button', { name: /admin login/i }));

  // Auto-fill or enter valid credentials
  fireEvent.click(screen.getByRole('button', { name: /auto-fill admin credentials/i }));
  fireEvent.click(screen.getByRole('button', { name: /enter as administrator/i }));

  // Should navigate to gallery and show admin badge
  expect(screen.getByText(/admin: admin/i)).toBeInTheDocument();

  // Admin SHOULD see Upload link in navbar
  expect(screen.getByRole('link', { name: /upload/i })).toBeInTheDocument();

  // Admin SHOULD see Delete buttons on photo cards
  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  expect(deleteButtons.length).toBeGreaterThan(0);
});
