export const generateChatId = (user1Id, user2Id) => {
  // Sort user IDs to ensure consistency
  const sortedUserIds = [user1Id, user2Id].sort();

  // Concatenate sorted user IDs
  const chatId = sortedUserIds.join('_');

  console.log('Newssss', chatId);

  return chatId;
};
