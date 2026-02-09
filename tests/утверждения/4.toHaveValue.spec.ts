import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"
  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');
  await expect(userName).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(comments).toHaveValue('');
  await expect(country).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения
  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');

  await userName.fill('Алексей');
  await email.fill('alex@example.com');
  await phone.fill('+7 (123) 456-78-90');
  await comments.fill('Тестовый комментарий');
  await country.selectOption('Казахстан');

  await expect(userName).toHaveValue('Алексей');
  await expect(email).toHaveValue('alex@example.com');
  await expect(phone).toHaveValue('+7 (123) 456-78-90');
  await expect(comments).toHaveValue('Тестовый комментарий');
  await expect(country).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');
  const reset = page.getByRole('button', { name: 'Сбросить' });

  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  await userName.fill('Петр');
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  await email.fill('test@test.ru');
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  await country.selectOption('Беларусь');
  // 4. Нажать кнопку "Сбросить"
  await reset.click();
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  await expect(userName).toHaveValue('Гость');
  // 6. Проверить что поле "Электронная почта" пустое
  await expect(email).toHaveValue('');
  // 7. Проверить что поле "Телефон" содержит "+7"
  await expect(phone).toHaveValue('+7');
  // 8. Проверить что список "Страна" содержит значение "ru"
  await expect(country).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');
  const refresh = page.getByRole('button', { name: 'Обновить данные' });
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  await userName.fill('Мария');
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  await email.fill('maria@mail.ru');
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  await comments.fill('Важный комментарий');
  // 4. Нажать кнопку "Обновить данные"
  await refresh.click();
  // 5. Проверить что в блоке вывода содержится текст с введенными данными
  await expect(comments).toHaveValue('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  const userName = page.getByLabel('Имя пользователя:');
  const email = page.getByLabel('Электронная почта:');
  const phone = page.getByLabel('Телефон:');
  const comments = page.getByLabel('Комментарии:');
  const country = page.getByLabel('Страна:');
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  await userName.clear();
  // 2. Очистить поле "Телефон"
  await phone.clear();
  // 3. Выбрать пустое значение в списке "Страна"
  await country.selectOption('-- Выберите страну --');
  // 4. Проверить что поле "Имя пользователя" пустое
  await expect(userName).toHaveValue('');
  // 5. Проверить что поле "Телефон" пустое
  await expect(phone).toHaveValue('');
  // 6. Проверить что список "Страна" содержит пустое значение
  await expect(country).toHaveValue('');
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым
  await expect(email).toHaveValue('');
});
