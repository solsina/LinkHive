import { pricingConfig } from '../pricing';

describe('Pricing Configuration', () => {
  it('should have three plans', () => {
    expect(pricingConfig.plans).toHaveLength(3);
  });

  it('should have correct plan names', () => {
    const planNames = pricingConfig.plans.map(plan => plan.name);
    expect(planNames).toContain('Gratuit');
    expect(planNames).toContain('Pro');
    expect(planNames).toContain('Enterprise');
  });

  it('should have correct prices', () => {
    const freePlan = pricingConfig.plans.find(plan => plan.name === 'Gratuit');
    const proPlan = pricingConfig.plans.find(plan => plan.name === 'Pro');
    const enterprisePlan = pricingConfig.plans.find(plan => plan.name === 'Enterprise');

    expect(freePlan?.price).toBe(0);
    expect(proPlan?.price).toBe(9);
    expect(enterprisePlan?.price).toBe(29);
  });

  it('should have one popular plan', () => {
    const popularPlans = pricingConfig.plans.filter(plan => plan.popular);
    expect(popularPlans).toHaveLength(1);
    expect(popularPlans[0].name).toBe('Pro');
  });

  it('should have features configuration', () => {
    expect(pricingConfig.features).toBeDefined();
    expect(pricingConfig.features.linkInBio).toBeDefined();
    expect(pricingConfig.features.qrCodes).toBeDefined();
    expect(pricingConfig.features.shortLinks).toBeDefined();
  });

  it('should have correct feature limits for free plan', () => {
    expect(pricingConfig.features.linkInBio.free).toBe('1 page');
    expect(pricingConfig.features.qrCodes.free).toBe('5 codes');
    expect(pricingConfig.features.shortLinks.free).toBe('10 liens');
  });

  it('should have unlimited features for pro plan', () => {
    expect(pricingConfig.features.linkInBio.pro).toBe('Illimitées');
    expect(pricingConfig.features.qrCodes.pro).toBe('Illimités');
    expect(pricingConfig.features.shortLinks.pro).toBe('Illimités');
  });
});
