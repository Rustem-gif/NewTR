import { Locator } from '@playwright/test';

type FieldType = 'input' | 'select';

export interface UserData {
  email?: { type: FieldType; value: string };
  password?: { type: FieldType; value: string };
  firstName?: { type: FieldType; value: string };
  lastName?: { type: FieldType; value: string };
  region?: { type: FieldType; value: string };
  city?: { type: FieldType; value: string };
  homeAddress?: { type: FieldType; value: string };
  zipCode?: { type: FieldType; value: string };
  birthDate?: {
    year: { type: FieldType; value: string };
    month: { type: FieldType; value: string };
    day: { type: FieldType; value: string };
  };
}

export interface RegUser {
  email?: { type: FieldType; value: string; locator: Locator };
  password?: { type: FieldType; value: string; locator: Locator };
  firstName?: { type: FieldType; value: string; locator: Locator };
  lastName?: { type: FieldType; value: string; locator: Locator };
  region?: { type: FieldType; value: string; locator: Locator };
  city?: { type: FieldType; value: string; locator: Locator };
  homeAddress?: { type: FieldType; value: string; locator: Locator };
  zipCode?: { type: FieldType; value: string; locator: Locator };
  birthDate?: {
    year: { type: FieldType; value: string; locator: Locator };
    month: { type: FieldType; value: string; locator: Locator };
    day: { type: FieldType; value: string; locator: Locator };
  };
}

export default class UserBuilder {
  private user: UserData = {};

  withEmail(email: string): UserBuilder {
    this.user.email = {
      type: 'input',
      value: email,
    };
    return this;
  }

  withRandomEmail(): UserBuilder {
    const randomEmail = `automaton-${Date.now()}@kingbilly.xyz`;
    return this.withEmail(randomEmail);
  }

  withPassword(password: string): UserBuilder {
    this.user.password = {
      type: 'input',
      value: password,
    };
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = {
      type: 'input',
      value: firstName,
    };
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.user.lastName = {
      type: 'input',
      value: lastName,
    };
    return this;
  }

  withFullName(firstName: string, lastName: string): UserBuilder {
    return this.withFirstName(firstName).withLastName(lastName);
  }

  withRegion(region: string): UserBuilder {
    this.user.region = {
      type: 'input',
      value: region,
    };
    return this;
  }

  withCity(city: string): UserBuilder {
    this.user.city = {
      type: 'input',
      value: city,
    };
    return this;
  }

  withAddress(homeAddress: string): UserBuilder {
    this.user.homeAddress = {
      type: 'input',
      value: homeAddress,
    };
    return this;
  }

  withZipCode(zipCode: string): UserBuilder {
    this.user.zipCode = {
      type: 'input',
      value: zipCode,
    };
    return this;
  }

  withBirthDate(year: string, month: string, day: string): UserBuilder {
    this.user.birthDate = {
      year: { type: 'select', value: year },
      month: { type: 'select', value: month },
      day: { type: 'select', value: day },
    };
    return this;
  }

  withAdultBirthDate(): UserBuilder {
    return this.withBirthDate('1990', '01', '15');
  }

  static validUser(): UserBuilder {
    return new UserBuilder()
      .withRandomEmail()
      .withPassword('193786Az()')
      .withFullName('John', 'Doe')
      .withRegion('US')
      .withCity('New York')
      .withAddress('123 Main St')
      .withZipCode('10001')
      .withAdultBirthDate();
  }

  static minimalUser(): UserBuilder {
    return new UserBuilder().withRandomEmail().withPassword('193786Az()');
  }

  build(): UserData {
    return { ...this.user };
  }
}
