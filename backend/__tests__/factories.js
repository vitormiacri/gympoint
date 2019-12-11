import faker from 'faker';
import factory from 'factory-girl';

import Student from '../src/app/Models/Student';
import Plan from '../src/app/Models/Plan';

faker.locale = 'pt_BR';

factory.define('Student', Student, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number(70),
  weight: faker.finance.amount(20, 100, 2),
  height: faker.finance.amount(1, 2.5, 2),
}));

factory.define('Plan', Plan, () => ({
  title: faker.commerce.productName(),
  duration: faker.random.number(12),
  price: faker.finance.amount(50, 150, 2),
}));

export default factory;
