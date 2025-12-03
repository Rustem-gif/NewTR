import { test as base, expect } from '@playwright/test';
import TombRiches from '../PageManager/TombRiches';

type TestFixtures = {
  tombRiches: TombRiches;
};

export const test = base.extend<TestFixtures>({
  tombRiches: async ({ page }, use) => {
    const tombRiches = new TombRiches(page);
    await use(tombRiches);
  },
});

export { expect } from '@playwright/test';
