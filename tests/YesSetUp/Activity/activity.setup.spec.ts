import test, { expect } from '@playwright/test';
import TombRiches from '../../../src/PageManager/TombRiches';
import type ActivityHub from '../../../src/PO/UserProfile/Components/Activity';
import { qase } from 'playwright-qase-reporter';

test.describe('Activity', () => {
  let tombRiches: TombRiches;
  let activityHub: ActivityHub;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await tombRiches.navTo('playerProfile');
  });

  test(qase(508, 'Open "Activity" tab in User Profile'), { tag: '@smoke' }, async () => {
    activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    await expect(activityHub.activityHubButton('Hub')).toBeVisible();
    await expect(activityHub.activityHubButton('My Bonuses')).toBeVisible();
  });

  test(qase(509, 'Verify Activity sub-tabs: Hub'), { tag: '@smoke' }, async () => {
    activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    const elementsToverify = [
      activityHub.hubTable,
      activityHub.linkTicket,
      activityHub.linkWheel,
      activityHub.userAvatar,
    ];
    for (const element of elementsToverify) {
      await expect(element).toBeVisible();
    }
  });

  test(qase(509, 'Verify Activity sub-tabs: My Bonuses'), { tag: '@smoke' }, async () => {
    activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    await activityHub.activityHubButton('My Bonuses').click();
    await expect(activityHub.activeBonusesSquare).toBeVisible();
  });

  test(qase(510, 'Hub, verify disabled features panel'), { tag: '@smoke' }, async () => {
    activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    await activityHub.inactiveBackground.first().waitFor({ state: 'visible' });
    await expect(await activityHub.inactiveBackground.count()).toBe(3);
  });

  test('Verify VIP card functionality in Activity Hub', { tag: '@smoke' }, async () => {
    activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    await activityHub.vipCard.click();
    expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('vipPage')}`);
    await expect(tombRiches.vipPage.levelsGalleryTitle).toBeVisible();
  });

  test('Verify Wheel card functionality in Activity Hub', { tag: '@smoke' }, async () => {
    activityHub = (await tombRiches.userProfile.openSection('Activity')) as ActivityHub;
    await activityHub.wheelCard.click();
    expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('wheelPage')}`);
    await expect(tombRiches.wheelPage.luckyPrizeHeaderContent).toBeVisible();
  });
});
