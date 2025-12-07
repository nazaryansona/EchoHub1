export const mockReactions = {
  blueHeart: 0,   // 💙
  sad: 0,         // 😢
  smirk: 0,       // 😏
  eyebrow: 0,     // 🤨
  scream: 0,      // 😱
  angry: 0,       // 🤬
};

export const mockPost = {
  id: 1,
  author: 'user1',
  content: 'Testing post content',
  reactions: mockReactions,
  comments: [
    { id: 1, author: 'user2', text: 'Nice!' },
    { id: 2, author: 'user3', text: 'Cool!' },
  ],
};

export const mockUsers = [
  { id: 1, username: 'user1' },
  { id: 2, username: 'user2' },
];
