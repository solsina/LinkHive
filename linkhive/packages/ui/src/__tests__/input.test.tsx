import { render, screen } from '@testing-library/react';
import { Input } from '../components/input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    
    let input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('type', 'email');
    
    rerender(<Input type="password" placeholder="Password" />);
    input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    
    const input = screen.getByPlaceholderText('Custom');
    expect(input).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Input ref={ref} placeholder="Ref test" />);
    
    expect(ref).toHaveBeenCalled();
  });

  it('handles all input attributes', () => {
    render(
      <Input
        placeholder="Test"
        name="test-input"
        id="test-id"
        value="test value"
        onChange={() => {}}
        required
        minLength={5}
        maxLength={10}
      />
    );
    
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('id', 'test-id');
    expect(input).toHaveAttribute('value', 'test value');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('minLength', '5');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
