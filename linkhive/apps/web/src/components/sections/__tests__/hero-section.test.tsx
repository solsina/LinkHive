import { render, screen } from '@testing-library/react';
import { HeroSection } from '../hero-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Une solution tout-en-un/i)).toBeInTheDocument();
    expect(screen.getByText(/pour gérer tous vos liens/i)).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Créez de meilleurs, incroyables, ceux-là et QR Codes avec LinkHive/i)).toBeInTheDocument();
  });

  it('renders the CTA buttons', () => {
    render(<HeroSection />);
    
    expect(screen.getByRole('link', { name: /Créer mon compte/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Voir la démo/i })).toBeInTheDocument();
  });

  it('renders the social proof', () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Rejoignez les 242 000 utilisateurs/i)).toBeInTheDocument();
  });

  it('renders the visual feature overview', () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Un outil, trois façons de l'essayer/i)).toBeInTheDocument();
  });
});
