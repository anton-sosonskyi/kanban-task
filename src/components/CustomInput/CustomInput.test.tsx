/* eslint-env jest */
import { render, fireEvent, screen } from '@testing-library/react';
import {vi, describe, expect, it} from 'vitest';
import { CustomInput } from './CustomInput';
import '@testing-library/jest-dom';

describe('CustomInput', () => {
  it('renders input field with placeholder and search button', () => {
    const mockHandleURLChange = vi.fn();
    render(<CustomInput handleURLChange={mockHandleURLChange} />);
    const input = screen.getByPlaceholderText('Enter repo URL');
    const searchButton = screen.getByText('Load issues');
    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('calls handleURLChange when search button is clicked', () => {
    const mockHandleURLChange = vi.fn();
    render(<CustomInput handleURLChange={mockHandleURLChange} />);
    const input = screen.getByPlaceholderText('Enter repo URL');
    const searchButton = screen.getByText('Load issues');
    fireEvent.change(input, { target: { value: 'https://github.com/facebook/react' } });
    fireEvent.click(searchButton);
    expect(mockHandleURLChange).toHaveBeenCalledTimes(1);
    expect(mockHandleURLChange).toHaveBeenCalledWith('https://github.com/facebook/react');
  });

  it('displays error message when isError is true', () => {
    const mockHandleURLChange = vi.fn();
    render(<CustomInput handleURLChange={mockHandleURLChange} />);
    const errorMessage = 'Invalid repository URL';
    fireEvent.change(screen.getByPlaceholderText('Enter repo URL'), { target: { value: 'invalid-url' } });
    fireEvent.click(screen.getByText('Load issues'));
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
