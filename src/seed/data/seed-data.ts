import * as bcrypt from 'bcrypt';

interface SeedRole {
  name: string;
  level: number;
}

interface SeedRoleUser {
  id: string;
  name: string;
  level: number;
}

interface SeedImageUser {
  url: string;
}

interface SeedUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: SeedRoleUser;
  images: SeedImageUser[];
}

interface SeedData {
  roles: SeedRole[];
  users: SeedUser[];
}

export const initialData: SeedData = {
  roles: [
    {
      name: 'super-user',
      level: 1,
    },
    {
      name: 'administrator',
      level: 2,
    },
    {
      name: 'user',
      level: 3,
    },
    {
      name: 'operator',
      level: 4,
    },
  ],

  users: [
    {
      email: 'user1@example.com',
      password: bcrypt.hashSync('***Abc123***', 10),
      firstName: 'John',
      lastName: 'Doe',
      role: {
        id: 'role1',
        name: 'super-user',
        level: 1,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
      ],
    },
    {
      email: 'user2@example.com',
      password: bcrypt.hashSync('Abc123', 10),

      firstName: 'Jane',
      lastName: 'Smith',
      role: {
        id: 'role2',
        name: 'user',
        level: 0,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
      ],
    },
    {
      email: 'user3@example.com',
      password: bcrypt.hashSync('Tb8%3NaY', 10),
      firstName: 'Alice',
      lastName: 'Johnson',
      role: {
        id: 'role3',
        name: 'administrator',
        level: 2,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
      ],
    },
    {
      email: 'user4@example.com',
      password: bcrypt.hashSync('Fg5!7RbQ', 10),
      firstName: 'Bob',
      lastName: 'Brown',
      role: {
        id: 'role4',
        name: 'operator',
        level: 1,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
      ],
    },
    {
      email: 'user5@example.com',
      password: bcrypt.hashSync('Qn7&6ZxL', 10),
      firstName: 'Charlie',
      lastName: 'Davis',
      role: {
        id: 'role5',
        name: 'user',
        level: 1,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
      ],
    },
    {
      email: 'user6@example.com',
      password: bcrypt.hashSync('Yt2#4MdS', 10),
      firstName: 'Diana',
      lastName: 'Miller',
      role: {
        id: 'role6',
        name: 'operator',
        level: 0,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
      ],
    },
    {
      email: 'user7@example.com',
      password: bcrypt.hashSync('Rk8^1WoB', 10),
      firstName: 'Edward',
      lastName: 'Wilson',
      role: {
        id: 'role7',
        name: 'user',
        level: 2,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
      ],
    },
    {
      email: 'user8@example.com',
      password: bcrypt.hashSync('Ln9*7TcX', 10),
      firstName: 'Fiona',
      lastName: 'Taylor',
      role: {
        id: 'role8',
        name: 'operator',
        level: 1,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
      ],
    },
    {
      email: 'user9@example.com',
      password: bcrypt.hashSync('Vb3&5PkQ', 10),
      firstName: 'George',
      lastName: 'Anderson',
      role: {
        id: 'role9',
        name: 'user',
        level: 1,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
      ],
    },
    {
      email: 'user10@example.com',
      password: bcrypt.hashSync('Ah7^2NcU', 10),
      firstName: 'Hannah',
      lastName: 'Thomas',
      role: {
        id: 'role10',
        name: 'operator',
        level: 0,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
      ],
    },
    {
      email: 'user11@example.com',
      password: bcrypt.hashSync('Qw4#8ZrM', 10),
      firstName: 'Ian',
      lastName: 'Jackson',
      role: {
        id: 'role11',
        name: 'user',
        level: 2,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
      ],
    },
    {
      email: 'user12@example.com',
      password: bcrypt.hashSync('Pu6*3BgS', 10),
      firstName: 'Julia',
      lastName: 'White',
      role: {
        id: 'role12',
        name: 'operator',
        level: 1,
      },
      images: [
        {
          url: 'https://randomuser.me/api/portraits/women/6.jpg',
        },
      ],
    },
  ],
};
