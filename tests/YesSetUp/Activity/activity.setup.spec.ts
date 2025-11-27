import test from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { expect } from '../../../src/utils/qaseHelper';
import TombRiches from '../../../src/PageManager/TombRiches';
import type ActivityHub from '../../../src/PO/UserProfile/Components/Activity';

test.describe('Activity', () => {
  let tombRiches: TombRiches;
  let activityHub: ActivityHub;

  test.beforeEach(async ({ page }) => {
    tombRiches = new TombRiches(page);
    await test.step('Navigate to playerProfile', async () => {
      await tombRiches.navTo('playerProfile');
    });
  });

  test('Open "Activity" tab in User Profile', { tag: '@smoke' }, async () => {
    qase.comment('Testing opening Activity tab in User Profile');
    activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
    await expect(activityHub.activityHubButton('Hub')).toBeVisible();
    await expect(activityHub.activityHubButton('My Bonuses')).toBeVisible();
  });

  test('Verify Activity sub-tabs: Hub', { tag: '@smoke' }, async () => {
    qase.comment('Verifying Hub sub-tab elements visibility');
    activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
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

  test('Verify Activity sub-tabs: My Bonuses', { tag: '@smoke' }, async () => {
    qase.comment('Verifying My Bonuses sub-tab functionality');
    activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
    await test.step('Click on My Bonuses button', async () => {
      await activityHub.activityHubButton('My Bonuses').click();
    });
    await expect(activityHub.activeBonusesSquare).toBeVisible();
  });

  test('Hub, verify disabled features panel', { tag: '@smoke' }, async () => {
    qase.comment('Verifying disabled features panel in Hub');
    activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
    await activityHub.inactiveBackground.first().waitFor({ state: 'visible' });
    await expect(await activityHub.inactiveBackground.count()).toBe(3);
  });

  test('Verify VIP card functionality in Activity Hub', { tag: '@smoke' }, async () => {
    qase.comment('Testing VIP card functionality in Activity Hub');
    activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
    await test.step('Click on VIP card', async () => {
      await activityHub.vipCard.click();
    });
    expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('vipPage')}`);
    await expect(tombRiches.vipPage.levelsGalleryTitle).toBeVisible();
  });

  test('Verify Wheel card functionality in Activity Hub', { tag: '@smoke' }, async () => {
    qase.comment('Testing Wheel card functionality in Activity Hub');
    activityHub = (await test.step('Open section Activity', async () => {
      return await tombRiches.userProfile.openSection('Activity');
    })) as ActivityHub;
    await test.step('Click on wheel card', async () => {
      await activityHub.wheelCard.click();
    });
    expect(tombRiches.page.url()).toBe(`${await tombRiches.getUrl('wheelPage')}`);
    await expect(tombRiches.wheelPage.luckyPrizeHeaderContent).toBeVisible();
  });
});
