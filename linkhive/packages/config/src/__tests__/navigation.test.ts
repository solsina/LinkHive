import { navigationConfig } from '../navigation';

describe('Navigation Configuration', () => {
  it('should have main navigation', () => {
    expect(navigationConfig.main).toBeDefined();
    expect(navigationConfig.main.length).toBeGreaterThan(0);
  });

  it('should have dashboard navigation', () => {
    expect(navigationConfig.dashboard).toBeDefined();
    expect(navigationConfig.dashboard.length).toBeGreaterThan(0);
  });

  it('should have footer navigation', () => {
    expect(navigationConfig.footer).toBeDefined();
    expect(navigationConfig.footer.length).toBeGreaterThan(0);
  });

  it('should have correct main navigation items', () => {
    const mainItems = navigationConfig.main.map(item => item.title);
    expect(mainItems).toContain('Accueil');
    expect(mainItems).toContain('Fonctionnalités');
    expect(mainItems).toContain('Tarifs');
    expect(mainItems).toContain('Support');
  });

  it('should have correct dashboard navigation items', () => {
    const dashboardItems = navigationConfig.dashboard.map(item => item.title);
    expect(dashboardItems).toContain('Vue d\'ensemble');
    expect(dashboardItems).toContain('Mes Pages');
    expect(dashboardItems).toContain('QR Codes');
    expect(dashboardItems).toContain('Liens Courts');
    expect(dashboardItems).toContain('Analytics');
    expect(dashboardItems).toContain('Paramètres');
  });

  it('should have correct dashboard navigation icons', () => {
    const dashboardItems = navigationConfig.dashboard.map(item => item.icon);
    expect(dashboardItems).toContain('Home');
    expect(dashboardItems).toContain('Link');
    expect(dashboardItems).toContain('QrCode');
    expect(dashboardItems).toContain('ExternalLink');
    expect(dashboardItems).toContain('BarChart');
    expect(dashboardItems).toContain('Settings');
  });

  it('should have footer navigation sections', () => {
    const footerSections = navigationConfig.footer.map(section => section.title);
    expect(footerSections).toContain('Produit');
    expect(footerSections).toContain('Support');
    expect(footerSections).toContain('Entreprise');
    expect(footerSections).toContain('Légal');
  });

  it('should have footer navigation items', () => {
    const productSection = navigationConfig.footer.find(section => section.title === 'Produit');
    expect(productSection?.items).toContainEqual(
      expect.objectContaining({ title: 'Fonctionnalités', href: '/features' })
    );
    expect(productSection?.items).toContainEqual(
      expect.objectContaining({ title: 'Tarifs', href: '/pricing' })
    );
  });
});
