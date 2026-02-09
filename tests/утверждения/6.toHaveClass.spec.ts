import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveclass');
});

test('1. Проверка начальных классов элементов', async ({ page }) => {
  // Задание: Проверить начальные классы элементов
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  // 2. Проверить что box1 не имеет класса "error"
  // 3. Найти элемент box2 и проверить что он имеет класс "error"
  // 4. Найти элемент box3 и проверить что он имеет класс "hidden"
  const box1 = page.locator('#box1');
  const box2 = page.locator('#box2');
  const box3 = page.locator('#box3');
  await expect(box1).toHaveClass(/active/);
  await expect(box1).not.toHaveClass(/error/);
  await expect(box2).toHaveClass(/error/);
  await expect(box3).toHaveClass(/hidden/);
});

test('2. Проверка переключения классов box1', async ({ page }) => {
  // Задание: Проверить изменение классов при взаимодействии
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  const box1 = page.locator('#box1');
  await expect(box1).toHaveClass(/active/);
  // 2. Нажать кнопку "Переключить box1"
  const toggleBox1 = page.locator('#toggle-box1');
  await toggleBox1.click();
  // 3. Проверить что box1 теперь имеет класс "error"
  await expect(box1).toHaveClass(/error/);
  // 4. Проверить что box1 больше не имеет класса "active"
  await expect(box1).not.toHaveClass(/active/);
  // 5. Еще раз нажать кнопку
  await toggleBox1.click();
  // 6. Проверить что классы вернулись к исходным
  await expect(box1).toHaveClass(/active/);
});

test('3. Проверка показа/скрытия элемента', async ({ page }) => {
  // Задание: Проверить классы при скрытии/показе элемента
  // 1. Найти элемент box3 и проверить что он имеет класс "hidden"
  const box3 = page.locator('#box3');
  await expect(box3).toHaveClass(/hidden/);
  // 2. Нажать кнопку "Показать/скрыть box3"
  const toggleBox3 = page.locator('#toggle-box3');
  await toggleBox3.click();
  // 3. Проверить что box3 больше не имеет класса "hidden"
  await expect(box3).not.toHaveClass(/hidden/);
  // 4. Еще раз нажать кнопку
  await toggleBox3.click();
  // 5. Проверить что класс "hidden" снова присутствует
  await expect(box3).toHaveClass(/hidden/);
});

test('4. Проверка классов карточки пользователя', async ({ page }) => {
  // Задание: Проверить классы карточки пользователя
  // 1. Найти карточку пользователя и проверить что у нее нет класса "premium"
  const userCard = page.locator('#user-card');
  await expect(userCard).not.toHaveClass(/premium/);
  // 2. Нажать кнопку "Перейти на Премиум"
  const upgradeUser = page.locator('#upgrade-user');
  await upgradeUser.click();
  // 3. Проверить что карточка получила класс "premium"
  await expect(userCard).toHaveClass(/premium/);
  // 4. Нажать кнопку "Отметить как просроченный"
  const expireUser = page.locator('#expire-user');
  await expireUser.click();
  // 5. Проверить что карточка имеет оба класса: "premium" и "expired"
  await expect(userCard).toHaveClass(/premium/);
  await expect(userCard).toHaveClass(/expired/);
  // 6. Проверить что классы содержатся в любом порядке
  await expect(userCard).toHaveClass(/premium.*expired|expired.*premium/);
});

test('5. Проверка элемента с несколькими классами', async ({ page }) => {
  // Задание: Проверить элемент с множеством классов
  // 1. Найти элемент multi-class и проверить что он имеет все классы:
  //    "box", "warning", "large", "rounded" (в любом порядке)
  const multiClass = page.locator('#multi-class');
  await expect(multiClass).toHaveClass(/box/);
  await expect(multiClass).toHaveClass(/warning/);
  await expect(multiClass).toHaveClass(/large/);
  await expect(multiClass).toHaveClass(/rounded/);
  // 2. Нажать кнопку "Изменить классы"
  const modifyClasses = page.locator('#modify-classes');
  await modifyClasses.click();
  // 3. Проверить что класс "warning" заменен на "error"
  await expect(multiClass).toHaveClass(/error/);
  await expect(multiClass).not.toHaveClass(/warning/);
  // 4. Проверить что класс "large" удален
  await expect(multiClass).not.toHaveClass(/large/);
  // 5. Проверить что класс "rounded" остался
  await expect(multiClass).toHaveClass(/rounded/);
  // 6. Проверить что элемент имеет класс "box" (основной класс)
  await expect(multiClass).toHaveClass(/box/);
});
