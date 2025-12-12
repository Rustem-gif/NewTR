type TestObjects = {
  [key: string]: {
    location: string;
    proxy: {
      username: string;
      password: string;
      server: string;
    };
    creds: { email: string; password: string };
    code: string;
  };
};

const proxyUsername = (countryCode: string) =>
  `geonode_Zr3aVjywHC-type-residential-country-${countryCode}`;
const proxyPassword = 'bebe29a2-c13b-4aa5-8c20-eb3dd10a8afd';
const proxyServer = 'proxy.geonode.io:9000';

export const DEPOSIT_TEST_OBJECTS: TestObjects = {
  NL: {
    location: 'Netherlands - Amsterdam',
    proxy: {
      username: proxyUsername('nl'),
      password: proxyPassword,
      server: proxyServer,
    },
    creds: { email: 'Desert_nl@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'nl',
  },
  DE: {
    location: 'Germany - Frankfurt - 1',
    proxy: {
      username: 'serhii_sysadmin',
      password: 'n8MHuECgae',
      server: '146.247.112.42:50100',
    },
    creds: { email: 'Desert_de@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'de',
  },
  CH: {
    location: 'Switzerland',
    proxy: {
      username: proxyUsername('ch'),
      password: proxyPassword,
      server: proxyServer,
    },
    creds: { email: 'Desert_ch@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'ch',
  },
  AT: {
    location: 'Austria',
    proxy: {
      username: proxyUsername('at'),
      password: proxyPassword,
      server: proxyServer,
    },
    creds: { email: 'Desert_at@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'at',
  },
};
