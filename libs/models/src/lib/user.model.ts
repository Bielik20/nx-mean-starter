export interface User {
  // ISSUE: https://github.com/Microsoft/TypeScript/issues/16936
  _id: any;
  email: string;
}

export function createMockUsers(): User[] {
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
