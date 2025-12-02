import { VpnController } from './vpnController';
import { VpnControllerMac } from './vpnControllerMac';

/**
 * Interface that both VPN controllers implement
 */
export interface IVpnController {
  vpnConnect(location: string): Promise<void>;
  vpnDisconnect(): Promise<void>;
  vpnCheckStatus(): Promise<string>;
  vpnListLocations(): Promise<string[]>;
  sleepVPN(ms: number): Promise<void>;
  getCurrentIP(): Promise<string>;
  verifyVPNConnection(originalIP: string): Promise<boolean>;
}

/**
 * Factory function to create the appropriate VPN controller based on OS
 * Checks the OS_TYPE environment variable or uses process.platform
 *
 * @returns IVpnController - Windows or Mac VPN controller
 *
 * @example
 * // Set OS_TYPE environment variable (optional)
 * // OS_TYPE=windows or OS_TYPE=mac
 *
 * const vpnController = getVpnController();
 * await vpnController.vpnConnect('Australia - Melbourne');
 */
export function getVpnController(): IVpnController {
  // Check environment variable first
  const osType = process.env.OS_TYPE?.toLowerCase();

  if (osType) {
    console.log(`Using OS_TYPE environment variable: ${osType}`);

    if (osType === 'mac' || osType === 'darwin' || osType === 'macos') {
      console.log('Initializing Mac VPN Controller');
      return new VpnControllerMac();
    } else if (osType === 'windows' || osType === 'win32' || osType === 'win') {
      console.log('Initializing Windows VPN Controller');
      return new VpnController();
    }
  }

  // Fall back to detecting OS from process.platform
  const platform = process.platform;
  console.log(`Auto-detecting OS from process.platform: ${platform}`);

  switch (platform) {
    case 'darwin':
      console.log('Initializing Mac VPN Controller');
      return new VpnControllerMac();

    case 'win32':
      console.log('Initializing Windows VPN Controller');
      return new VpnController();

    default:
      console.warn(`Unsupported platform: ${platform}. Defaulting to Windows VPN Controller`);
      return new VpnController();
  }
}

/**
 * Get the current operating system type
 * @returns 'windows' | 'mac' | 'unknown'
 */
export function getOsType(): 'windows' | 'mac' | 'unknown' {
  const osType = process.env.OS_TYPE?.toLowerCase();

  if (osType) {
    if (osType === 'mac' || osType === 'darwin' || osType === 'macos') {
      return 'mac';
    } else if (osType === 'windows' || osType === 'win32' || osType === 'win') {
      return 'windows';
    }
  }

  const platform = process.platform;

  switch (platform) {
    case 'darwin':
      return 'mac';
    case 'win32':
      return 'windows';
    default:
      return 'unknown';
  }
}
