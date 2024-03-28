import { faker } from '@faker-js/faker';

import { Dev } from '@type/dbase/dev.interface';

export const generateDevs = (): Dev[] => {
  const ids = [...Array(205).keys()];

  return ids.map((id) => {
    const firstName = faker.person.firstName();

    const dev: Dev = {
      id: id + 1,
      idSquad: faker.number.int({
        min: 1,
        max: 4,
      }),
      avatar: `https://picsum.photos/seed/${firstName}/300`,
      firstName,
      bio: faker.person.bio(),
      jobTitle: faker.person.jobTitle(),
    };

    return dev;
  });
};
