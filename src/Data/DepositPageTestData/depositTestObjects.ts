type TestObjects = {
  [key: string]: {
    location: string;
    creds: { email: string; password: string };
    code: string;
  };
};

export const DEPOSIT_TEST_OBJECTS: TestObjects = {
  NL: {
    location: 'Netherlands - Amsterdam',
    creds: { email: 'Desert_nl@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'nl',
  },
  DE: {
    location: 'Germany - Frankfurt - 1',
    creds: { email: 'Desert_de@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'de',
  },
  CH: {
    location: 'Switzerland',
    creds: { email: 'Desert_ch@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'ch',
  },
  AT: {
    location: 'Austria',
    creds: { email: 'Desert_at@kingbilly.xyz', password: 'KingBilly123!' },
    code: 'at',
  },
};
