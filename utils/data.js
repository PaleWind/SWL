import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'aoi',
      email: 'shadow.work.lighting@gmail.com',
      password: bcrypt.hashSync('bananas'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Shigoto Light',
      slug: 'shigoto-light',
      category: 'Lights',
      image: '/images/pink-neon-lamp-tube',
      price: 300,
      countInStock: 20,
      description: 'The Shigoto Light offers endless visual possibilities for your live performance.',
    },
    {
      name: 'Carrying Case',
      slug: 'carrying-case',
      category: 'Accessories',
      image: '/images/carrying-case',
      price: 40,
      countInStock: 20,
      description: 'This sleek carrying case makes it easy to transport your entire setup at once.',
    },
  ],
};

export default data;
