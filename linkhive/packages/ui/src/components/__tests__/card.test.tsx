import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Card className="custom-class">Card content</Card>);
    const card = screen.getByText('Card content').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Card ref={ref}>Card content</Card>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardHeader', () => {
  it('renders with children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<CardHeader className="custom-header">Header content</CardHeader>);
    const header = screen.getByText('Header content');
    expect(header).toHaveClass('custom-header');
  });
});

describe('CardTitle', () => {
  it('renders with children', () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders as h3 element', () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByText('Card Title');
    expect(title.tagName).toBe('H3');
  });

  it('renders with custom className', () => {
    render(<CardTitle className="custom-title">Card Title</CardTitle>);
    const title = screen.getByText('Card Title');
    expect(title).toHaveClass('custom-title');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<CardTitle ref={ref}>Card Title</CardTitle>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardDescription', () => {
  it('renders with children', () => {
    render(<CardDescription>Card description</CardDescription>);
    expect(screen.getByText('Card description')).toBeInTheDocument();
  });

  it('renders as p element', () => {
    render(<CardDescription>Card description</CardDescription>);
    const description = screen.getByText('Card description');
    expect(description.tagName).toBe('P');
  });

  it('renders with custom className', () => {
    render(<CardDescription className="custom-description">Card description</CardDescription>);
    const description = screen.getByText('Card description');
    expect(description).toHaveClass('custom-description');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<CardDescription ref={ref}>Card description</CardDescription>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardContent', () => {
  it('renders with children', () => {
    render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<CardContent className="custom-content">Content</CardContent>);
    const content = screen.getByText('Content');
    expect(content).toHaveClass('custom-content');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<CardContent ref={ref}>Content</CardContent>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('CardFooter', () => {
  it('renders with children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<CardFooter className="custom-footer">Footer content</CardFooter>);
    const footer = screen.getByText('Footer content');
    expect(footer).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<CardFooter ref={ref}>Footer content</CardFooter>);
    expect(ref).toHaveBeenCalled();
  });
});

describe('Card composition', () => {
  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(
      <Card className="test-card">
        <CardHeader className="test-header">
          <CardTitle className="test-title">Title</CardTitle>
          <CardDescription className="test-description">Description</CardDescription>
        </CardHeader>
        <CardContent className="test-content">Content</CardContent>
        <CardFooter className="test-footer">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Title').closest('div')).toHaveClass('test-card');
    expect(screen.getByText('Title').closest('div')).toHaveClass('test-header');
    expect(screen.getByText('Title')).toHaveClass('test-title');
    expect(screen.getByText('Description')).toHaveClass('test-description');
    expect(screen.getByText('Content')).toHaveClass('test-content');
    expect(screen.getByText('Footer')).toHaveClass('test-footer');
  });
});
