import { siteConfig } from '../site';

describe('Site Configuration', () => {
  it('should have correct name', () => {
    expect(siteConfig.name).toBe('LinkHive');
  });

  it('should have correct description', () => {
    expect(siteConfig.description).toContain('link-in-bio');
    expect(siteConfig.description).toContain('QR codes');
  });

  it('should have correct URL', () => {
    expect(siteConfig.url).toBeDefined();
  });

  it('should have social links', () => {
    expect(siteConfig.links.twitter).toBeDefined();
    expect(siteConfig.links.github).toBeDefined();
    expect(siteConfig.links.discord).toBeDefined();
  });

  it('should have keywords', () => {
    expect(siteConfig.keywords).toContain('link in bio');
    expect(siteConfig.keywords).toContain('QR codes');
    expect(siteConfig.keywords).toContain('analytics');
  });

  it('should have authors', () => {
    expect(siteConfig.authors).toHaveLength(1);
    expect(siteConfig.authors[0].name).toBe('LinkHive Team');
  });
});
