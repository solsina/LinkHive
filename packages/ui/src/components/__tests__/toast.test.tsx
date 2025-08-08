import { render, screen } from '@testing-library/react';
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastAction, ToastClose } from '../toast';
import userEvent from '@testing-library/user-event';

describe('Toast', () => {
  it('renders with title and description', () => {
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastTitle>Test Title</ToastTitle>
          <ToastDescription>Test Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders with default variant', () => {
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastTitle>Default Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const toast = screen.getByText('Default Toast').closest('[role="status"]');
    expect(toast).toHaveClass('border bg-background text-foreground');
  });

  it('renders with destructive variant', () => {
    render(
      <ToastProvider>
        <Toast open={true} variant="destructive">
          <ToastTitle>Destructive Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const toast = screen.getByText('Destructive Toast').closest('[role="status"]');
    expect(toast).toHaveClass('destructive border-destructive bg-destructive text-destructive-foreground');
  });

  it('renders with an action button', () => {
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastTitle>Action Toast</ToastTitle>
          <ToastAction altText="Undo action">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
  });

  it('renders with a close button', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <Toast open={true}>
          <ToastTitle>Closable Toast</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    
    // Simulate hover to make close button visible (due to opacity: 0 by default)
    await user.hover(closeButton);
    expect(closeButton).toHaveStyle('opacity: 1');
  });
});
