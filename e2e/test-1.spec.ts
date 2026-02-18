import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.screenshot({ path: 'screenshot.png' });  
  await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Login" [level=1]`);
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await expect(page.locator('form')).toMatchAriaSnapshot(`- button "Login"`);
  await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Login" [level=1]`);
  await page.getByTestId('email-input').click();
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test1.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('paragraph')).toMatchAriaSnapshot(`- paragraph: Sign in failed. Check the details you provided are correct.`);
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - paragraph: Sign in failed. Check the details you provided are correct.
    - button "Sign in with Credentials"
    `);
  await expect(page.locator('#submitButton')).toMatchAriaSnapshot(`- button "Sign in with Credentials"`);
  await page.goto('http://localhost:3000/');
  await page.getByRole('textbox', { name: 'Email' }).dblclick();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Dashboard" [level=1]`);
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - heading "Dashboard" [level=1]
    - paragraph: Welcome admin@test.com
    `);
  await page.screenshot({ path: 'screenshot2.png' });  
  await expect(page.getByRole('paragraph')).toMatchAriaSnapshot(`- paragraph: Welcome admin@test.com`);
});