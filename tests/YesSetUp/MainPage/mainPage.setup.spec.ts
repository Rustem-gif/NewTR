import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';
import type ActivityHub from '../../../src/PO/UserProfile/Components/Activity';

test.describe('Main Page', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to mainPage', async () => {
      await tombRiches.navTo('mainPage');
    });
  });

  test("Check 'Search your game' input", { tag: '@smoke' }, async () => {
    qase.comment('Testing search your game input functionality');
    const gameName = 'Fire Lightning';
    const gamePage = await test.step(`Search for game ${gameName}`, async () => {
      return await tombRiches.mainPage.header.searchForGame(gameName);
    });
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });

  test('Check "Slots" button', { tag: '@smoke' }, async () => {
    qase.comment('Testing Slots button navigation');
    await test.step('Click on Slots button', async () => {
      await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Slots').click();
    });
    await tombRiches.mainPage.gameBlock.first().waitFor({ state: 'visible', timeout: 5000 });
    await expect(tombRiches.mainPage.getNumberOfGames()).resolves.toBeGreaterThan(0);
    await expect(tombRiches.mainPage.gameCategorySlider.categoryTitle('All Games')).toBeVisible();
  });

  test('Check "Promotions" button', { tag: '@smoke' }, async () => {
    qase.comment('Testing Promotions button navigation');
    await test.step('Click on Promotions button', async () => {
      await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Promotions').click();
    });
    await expect(tombRiches.promoPage.promoBanner.first()).toBeVisible({ timeout: 5000 });
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('promoPage'));
  });

  test('Check "Bonuses" button', { tag: '@smoke' }, async () => {
    qase.comment('Testing Bonuses button navigation');
    await test.step('Click on Bonuses button', async () => {
      await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Bonuses').click();
    });
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('myBonusesPage'));
    const activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
    await expect(activityHub.activityHubButton('My Bonuses')).toBeVisible();
    await expect(activityHub.activityHubButton('Hub')).toBeVisible();
  });

  test('Check "Live Casino" button', { tag: '@smoke' }, async () => {
    qase.comment('Testing Live Casino button navigation');
    await test.step('Click on Live Casino button', async () => {
      await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Live Casino').click();
    });
    await tombRiches.mainPage.gameBlock.first().waitFor({ state: 'visible', timeout: 5000 });
    await expect(tombRiches.mainPage.getNumberOfGames()).resolves.toBeGreaterThan(0);
    await expect(tombRiches.mainPage.gameCategorySlider.categoryTitle('Live Games')).toBeVisible();
  });

  test('Support button functionality', { tag: '@smoke' }, async () => {
    qase.comment('Testing support button (intercom) functionality');
    await test.step('Click on intercom app', async () => {
      await tombRiches.clickOn(tombRiches.intercomApp);
    });
    await test.step('Scroll intercom body into view', async () => {
      await tombRiches.intercomBody.scrollIntoViewIfNeeded();
    });
    await expect(tombRiches.intercomBody).toBeVisible();
  });
});

test.describe('Main Page', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to mainPage', async () => {
      await tombRiches.navTo('mainPage');
    });
    await test.step('Scroll to promo block', async () => {
      await tombRiches.mainPage.promoBlock.scrollToPromoBlock();
    });
  });

  test('Promo Block Check the take it button', { tag: '@smoke' }, async () => {
    qase.comment('Checking promo block take it button count');
    expect(await tombRiches.mainPage.promoBlock.promoBanner.count()).toBeGreaterThan(0);
  });

  test('Promo Block check the buttons', { tag: '@smoke' }, async () => {
    qase.comment('Testing promo block take it button navigation');
    await test.step('Click on take it button', async () => {
      await tombRiches.mainPage.promoBlock.takeItButton.first().click();
    });
    await expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('cashboxPageDeposit')}`);
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });

  test('Promo card check the details buttons', { tag: '@smoke' }, async () => {
    qase.comment('Testing promo card details button functionality');
    const welcomePack = await test.step('Open welcome pack', async () => {
      return await tombRiches.mainPage.promoBlock.openWelcomePack();
    });
    await welcomePack.welcomePackHeader.waitFor({ state: 'visible' });
    await expect(welcomePack.welcomePackHeader).toHaveText('WELCOME PACK');
  });

  test('Provider Block "Get More" Button Navigation', { tag: '@smoke' }, async () => {
    qase.comment('Testing provider block get more button navigation');
    await test.step('Scroll page down', async () => {
      await tombRiches.mainPage.allProvidersBlock.scrollPageDown();
    });
    await test.step('Click on get more button', async () => {
      await tombRiches.mainPage.allProvidersBlock.getMoreButton.click();
    });
    expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('allProvidersPage')}`);
    expect(await tombRiches.allProvidersPage.providerCard.count()).toBeGreaterThan(0);
  });
});
