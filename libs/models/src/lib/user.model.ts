// ISSUE: https://github.com/Microsoft/TypeScript/issues/16936
export interface User {
  _id: string;
  email: string;
  emailVerified: boolean;
  name?: string;
  pictureUrl?: string;
  phoneNumber?: string;
}

export function createMockUsers(): Partial<User>[] {
  return [
    {
      _id: '1',
      email: 'one@mail.com',
    },
    {
      _id: '2',
      email: 'two@mail.com',
    },
  ];
}
