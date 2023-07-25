export const randomString = (strlen = 8) => {
  const chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = strlen; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};
