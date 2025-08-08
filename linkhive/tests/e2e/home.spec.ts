import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /Une solution tout-en-un/i })).toBeVisible();
    
    // Check if the CTA button is present
    await expect(page.getByRole('link', { name: /Créer mon compte/i })).toBeVisible();
  });

  test('should display the features section', async ({ page }) => {
    await page.goto('/');
    
    // Check if the features section is visible
    await expect(page.getByRole('heading', { name: /Trois façons de l'essayer/i })).toBeVisible();
    
    // Check if all three feature cards are present
    await expect(page.getByText('Link in Bio')).toBeVisible();
    await expect(page.getByText('QR Codes')).toBeVisible();
    await expect(page.getByText('Short Links')).toBeVisible();
  });

  test('should display the pricing section', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to pricing section
    await page.evaluate(() => {
      const pricingSection = document.querySelector('[data-testid="pricing-section"]');
      if (pricingSection) {
        pricingSection.scrollIntoView();
      }
    });
    
    // Check if pricing cards are visible
    await expect(page.getByText('Gratuit')).toBeVisible();
    await expect(page.getByText('Pro')).toBeVisible();
  });

  test('should navigate to sign up page', async ({ page }) => {
    await page.goto('/');
    
    // Click on the main CTA button
    await page.getByRole('link', { name: /Créer mon compte/i }).click();
    
    // Should navigate to sign up page
    await expect(page).toHaveURL(/.*sign-up/);
  });
});
