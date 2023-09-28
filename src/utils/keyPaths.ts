export const getUserPublicKeyPath = (userId: string) =>
  `secure-chat.${userId}.public-key`;

export const getUserPrivateKeyPath = (userId: string) =>
  `secure-chat.${userId}.private-key`;
