export interface Post {
  id: string;
  title: string;
}

export function createMockPosts(): Post[] {
  return [
    {
      id: '1',
      title: 'Login page is broken',
    },
    {
      id: '2',
      title: 'Everything is broken!!!',
    },
  ];
}
