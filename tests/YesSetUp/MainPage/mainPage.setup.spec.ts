import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import type ActivityHub from '../../../src/PO/UserProfile/Components/Activity';
import { qase } from 'playwright-qase-reporter';

test.describe('Main Page', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
  });

  test(qase(377, "Check 'Search your game' input"), { tag: '@smoke' }, async () => {
    const gameName = 'Fire Lightning';
    const gamePage = await tombRiches.mainPage.header.searchForGame(gameName);
    await expect(gamePage.gameFrame).toBeVisible({ timeout: 20000 });
  });

  test(qase(462, 'Check "Slots" button'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Slots').click();
    await tombRiches.mainPage.gameBlock.first().waitFor({ state: 'visible', timeout: 5000 });
    await expect(tombRiches.mainPage.getNumberOfGames()).resolves.toBeGreaterThan(0);
    await expect(tombRiches.mainPage.gameCategorySlider.categoryTitle('All Games')).toBeVisible();
  });

  test(qase(461, 'Check "Promotions" button'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Promotions').click();
    await expect(tombRiches.promoPage.promoBanner.first()).toBeVisible({ timeout: 5000 });
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('promoPage'));
  });

  test(qase(465, 'Check "Bonuses" button'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Bonuses').click();
    expect(tombRiches.page.url()).toBe(await tombRiches.getUrl('myBonusesPage'));
    const activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    await expect(activityHub.activityHubButton('My Bonuses')).toBeVisible();
    await expect(activityHub.activityHubButton('Hub')).toBeVisible();
  });

  test(qase(467, 'Check "Live Casino" button'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.upperNavigationPanel.navPanelButton('Live Casino').click();
    await tombRiches.mainPage.gameBlock.first().waitFor({ state: 'visible', timeout: 5000 });
    await expect(tombRiches.mainPage.getNumberOfGames()).resolves.toBeGreaterThan(0);
    await expect(tombRiches.mainPage.gameCategorySlider.categoryTitle('Live Games')).toBeVisible();
  });

  test(qase(477, 'Support button functionality'), { tag: '@smoke' }, async () => {
    await tombRiches.clickOn(tombRiches.intercomApp);
    await tombRiches.intercomBody.scrollIntoViewIfNeeded();
    await expect(tombRiches.intercomBody).toBeVisible();
  });
});

test.describe('Main Page', () => {
  let tombRiches: TombRiches;
  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('mainPage');
    await tombRiches.mainPage.promoBlock.scrollToPromoBlock();
  });

  test(qase(470, 'Promo Block Check the take it button'), { tag: '@smoke' }, async () => {
    expect(await tombRiches.mainPage.promoBlock.promoBanner.count()).toBeGreaterThan(0);
  });

  test(qase(471, 'Promo Block check the buttons'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.promoBlock.takeItButton.first().click();
    await expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('cashboxPageDeposit')}`);
    await expect(tombRiches.CashboxPage.creditCards).toBeVisible();
    await expect(tombRiches.CashboxPage.applePay).toBeVisible();
    await expect(tombRiches.CashboxPage.googlePay).toBeVisible();
    await expect(tombRiches.CashboxPage.cryptoDeposit).toBeVisible();
  });

  test(qase(473, 'Promo card check the details buttons'), { tag: '@smoke' }, async () => {
    const welcomePack = await tombRiches.mainPage.promoBlock.openWelcomePack();
    await welcomePack.welcomePackHeader.waitFor({ state: 'visible' });
    await expect(welcomePack.welcomePackHeader).toHaveText('WELCOME PACK');
  });

  test(qase(476, 'Provider Block "Get More" Button Navigation'), { tag: '@smoke' }, async () => {
    await tombRiches.mainPage.allProvidersBlock.scrollPageDown();
    await tombRiches.mainPage.allProvidersBlock.getMoreButton.click();
    expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('allProvidersPage')}`);
    expect(await tombRiches.allProvidersPage.providerCard.count()).toBeGreaterThan(0);
  });
});
