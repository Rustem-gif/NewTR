import { expect as baseExpect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

/**
 * Enhanced expect that automatically logs errors to Qase
 * Usage: expect(element).toBeVisible()
 *
 * The error message is automatically captured from the Playwright assertion
 */
export const expect: typeof baseExpect = new Proxy(baseExpect, {
  apply(target, thisArg, args) {
    const assertion = Reflect.apply(target, thisArg, args);
    return wrapAssertions(assertion);
  },
});

function wrapAssertions(assertion: any): any {
  return new Proxy(assertion, {
    get(target, prop) {
      const original = target[prop];
      if (typeof original === 'function') {
        return async function (...args: any[]) {
          try {
            return await original.apply(target, args);
          } catch (error) {
            qase.comment(`Assertion failed: ${(error as Error).message}`);
            throw error;
          }
        };
      }
      return original;
    },
  });
}
