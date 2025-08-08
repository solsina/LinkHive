import { featuresConfig } from '../features';

describe('Features Configuration', () => {
  it('should have all feature categories', () => {
    expect(featuresConfig.linkInBio).toBeDefined();
    expect(featuresConfig.qrCodes).toBeDefined();
    expect(featuresConfig.shortLinks).toBeDefined();
    expect(featuresConfig.analytics).toBeDefined();
    expect(featuresConfig.themes).toBeDefined();
  });

  it('should have correct link in bio features', () => {
    expect(featuresConfig.linkInBio.title).toBe('Link in Bio');
    expect(featuresConfig.linkInBio.description).toContain('réseaux sociaux');
    expect(featuresConfig.linkInBio.features).toContain('Pages personnalisables');
    expect(featuresConfig.linkInBio.features).toContain('Analytics en temps réel');
  });

  it('should have correct QR codes features', () => {
    expect(featuresConfig.qrCodes.title).toBe('QR Codes');
    expect(featuresConfig.qrCodes.description).toContain('personnalisables');
    expect(featuresConfig.qrCodes.features).toContain('QR codes personnalisables');
    expect(featuresConfig.qrCodes.features).toContain('Suivi des scans');
  });

  it('should have correct short links features', () => {
    expect(featuresConfig.shortLinks.title).toBe('Liens Courts');
    expect(featuresConfig.shortLinks.description).toContain('domaines personnalisés');
    expect(featuresConfig.shortLinks.features).toContain('Liens courts automatiques');
    expect(featuresConfig.shortLinks.features).toContain('Analytics détaillées');
  });

  it('should have correct analytics features', () => {
    expect(featuresConfig.analytics.title).toBe('Analytics Avancées');
    expect(featuresConfig.analytics.description).toContain('temps réel');
    expect(featuresConfig.analytics.features).toContain('Vues en temps réel');
    expect(featuresConfig.analytics.features).toContain('Géolocalisation');
  });

  it('should have correct themes features', () => {
    expect(featuresConfig.themes.title).toBe('Thèmes Personnalisés');
    expect(featuresConfig.themes.description).toContain('apparence');
    expect(featuresConfig.themes.features).toContain('Thèmes prédéfinis');
    expect(featuresConfig.themes.features).toContain('Mode sombre/clair');
  });

  it('should have features arrays with content', () => {
    Object.values(featuresConfig).forEach(feature => {
      expect(feature.features).toBeInstanceOf(Array);
      expect(feature.features.length).toBeGreaterThan(0);
    });
  });
});
