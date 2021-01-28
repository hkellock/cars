import { ValidatedUser } from '../auth/jwt.strategy';
import { Car } from '../car/car.entity';
import { CarType } from '../car/car.types';
import { User } from '../user/user.entity';
import { Action, CaslAbilityFactory } from './casl-ability.factory';

describe('CaslAbilityFactory', () => {
  const creator = new User();
  creator.id = 1;
  creator.username = 'car.creator';
  creator.cars = [];

  const car = new Car();
  car.id = 'id';
  car.brand = 'brand';
  car.model = 'model';
  car.type = CarType.Electric;
  car.price = 10000;
  car.yearlyTax = 100;
  car.wltpConsumption = 10;
  car.compareTo = [];
  car.user = creator;

  const validatedAdmin: ValidatedUser = {
    userId: 'admin',
    username: 'admin',
    isAdmin: true,
  };
  const validatedCreator: ValidatedUser = {
    userId: 'car.creator',
    username: 'car.creator',
    isAdmin: false,
  };
  const validatedUser: ValidatedUser = {
    userId: 'not.creator',
    username: 'not.creator',
    isAdmin: false,
  };

  const caslAbilityFactory = new CaslAbilityFactory();

  it('should be defined', () => {
    expect(caslAbilityFactory).toBeDefined();
  });

  describe('car abilities', () => {
    it.each([
      [Action.Create, true],
      [Action.Read, true],
      [Action.Update, true],
      [Action.Delete, true],
    ])(`has ability to %s car as admin: %s`, (action, expectedResult) => {
      const ability = caslAbilityFactory.createForUser(validatedAdmin);
      const result = ability.can(action, car);
      expect(result).toEqual(expectedResult);
    });

    it.each([
      [Action.Create, true],
      [Action.Read, true],
      [Action.Update, true],
      [Action.Delete, true],
    ])(`has ability to %s car as creator: %s`, (action, expectedResult) => {
      const ability = caslAbilityFactory.createForUser(validatedCreator);
      const result = ability.can(action, car);
      expect(result).toEqual(expectedResult);
    });

    it.each([
      [Action.Create, true],
      [Action.Read, true],
      [Action.Update, false],
      [Action.Delete, false],
    ])(
      `has ability to %s car as another user: %s`,
      (action, expectedResult) => {
        const ability = caslAbilityFactory.createForUser(validatedUser);
        const result = ability.can(action, car);
        expect(result).toEqual(expectedResult);
      },
    );
  });

  describe('user abilities', () => {
    it.each([
      [Action.Create, true],
      [Action.Read, true],
      [Action.Update, true],
      [Action.Delete, true],
    ])(`has ability to %s user as admin: %s`, (action, expectedResult) => {
      const ability = caslAbilityFactory.createForUser(validatedAdmin);
      const result = ability.can(action, creator);
      expect(result).toEqual(expectedResult);
    });

    it.each([
      [Action.Create, true],
      [Action.Read, true],
      [Action.Update, true],
      [Action.Delete, false],
    ])(`has ability to %s user as creator: %s`, (action, expectedResult) => {
      const ability = caslAbilityFactory.createForUser(validatedCreator);
      const result = ability.can(action, creator);
      expect(result).toEqual(expectedResult);
    });

    it.each([
      [Action.Create, true],
      [Action.Read, false],
      [Action.Update, false],
      [Action.Delete, false],
    ])(
      `has ability to %s user as another user: %s`,
      (action, expectedResult) => {
        const ability = caslAbilityFactory.createForUser(validatedUser);
        const result = ability.can(action, creator);
        expect(result).toEqual(expectedResult);
      },
    );
  });
});
