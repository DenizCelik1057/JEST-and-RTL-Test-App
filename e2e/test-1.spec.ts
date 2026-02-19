import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('');
  await expect(page.getByTestId('email-input')).toBeEmpty();
  await expect(page.getByTestId('password-input')).toBeEmpty();
  await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Login" [level=1]`);
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - heading "Login" [level=1]
    - textbox "Email"
    - textbox "Password"
    - button "Login"
    `);
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('admin@test.com1');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('pasass');
  await page.screenshot({path: "screenshot1.png"})
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('paragraph')).toMatchAriaSnapshot(`- paragraph: Sign in failed. Check the details you provided are correct.`);
  await expect(page.locator('#submitButton')).toMatchAriaSnapshot(`- button "Sign in with Credentials"`);
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - paragraph: Sign in failed. Check the details you provided are correct.
    - button "Sign in with Credentials"
    `);
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - paragraph: Sign in failed. Check the details you provided are correct.
    - button "Sign in with Credentials"
    `);
  await page.screenshot({path: "screenshot2.png"})
  await page.goto('http://localhost:3000/login');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').press('ArrowRight');
  await page.getByTestId('email-input').press('ArrowRight');
  await page.getByTestId('email-input').press('ArrowRight');
  await page.getByTestId('email-input').fill('admin@test.com');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('password');
  await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Login" [level=1]`);
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Dashboard" [level=1]`);
  await expect(page.getByRole('paragraph')).toMatchAriaSnapshot(`- paragraph: Welcome admin@test.com`);
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - heading "Dashboard" [level=1]
    - paragraph: Welcome admin@test.com
    `);
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - heading "Dashboard" [level=1]
      - paragraph: Welcome admin@test.com
      - alert
    `);
  await page.screenshot({path: "screenshot3.png"})
});