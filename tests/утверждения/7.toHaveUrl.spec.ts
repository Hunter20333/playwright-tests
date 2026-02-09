import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveurl');
});

test('1. Проверка изменения URL при навигации', async ({ page }) => {
  // Задание: Проверить изменение URL при клике по ссылкам

  // 1. Нажать на ссылку "О нас"
  const aboutLink = page.locator('#about-link');
  await aboutLink.click();

  // 2. Проверить что URL изменился и содержит "#about"
  // ✅ Ждем изменения URL и проверяем текущий URL
  await page.waitForURL('**/*#about');
  expect(page.url()).toContain('#about');

  // 3. Нажать на ссылку "Контакты"
  const contactsLink = page.locator('#contacts-link');
  await contactsLink.click();

  // 4. Проверить что URL изменился и содержит "#contacts"
  // ✅ Ждем изменения URL и проверяем ТЕКУЩИЙ URL
  await page.waitForURL('**/*#contacts');
  expect(page.url()).toContain('#contacts');

  // 5. Нажать на ссылку "Главная"
  const homeLink = page.locator('#home-link');
  await homeLink.click();

  // 6. Проверить что URL снова содержит "#home"
  // ✅ Ждем изменения URL и проверяем ТЕКУЩИЙ URL
  await page.waitForURL('**/*#home');
  expect(page.url()).toContain('#home');
});

test('2. Проверка URL при программной навигации', async ({ page }) => {
  // Задание: Проверить URL после программного перехода
  // 1. Нажать кнопку "Перейти в раздел"
  const redirectBtn = page.locator('#redirect-btn');
  await redirectBtn.click();
  // 2. Проверить что URL изменился на "#contacts"
  await page.waitForURL('**/*#contacts');
  expect(page.url()).toContain('#contacts');
  // 3. Нажать кнопку "Вернуться назад" (back() в истории)back-btn
  const backBtn = page.locator('#back-btn');
  await backBtn.click();
  // 4. Проверить что URL вернулся к "#home"
  await page.waitForURL('**/*#home');
  expect(page.url()).toContain('#home');
});

test('3. Проверка URL после ручного ввода', async ({ page }) => {
  // Задание: Проверить обработку ручного ввода URL
  // 1. Перейти напрямую по URL с хешем "#about"
  await page.goto('https://osstep.github.io/assertion_tohaveurl#about');
  // 2. Проверить что страница отображает раздел "О нас"
  const aboutSection = page.locator('#about-section');
  await expect(aboutSection).toBeEnabled();
  // 3. Проверить что URL содержит "#about"
  await page.waitForURL('**/*#about');
  expect(page.url()).toContain('#about');
  // 4. Обновить страницу
  await page.reload();
  // 5. Проверить что URL сохранился с "#about"
  await page.waitForURL('**/*#about');
  expect(page.url()).toContain('#about');
});
