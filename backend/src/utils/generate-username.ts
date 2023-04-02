export const generateUsername = (email: string) => {
  const name = email.split('@')[0];

  return name
    .replace(/[^A-Za-z0-9]/g, '')
    .concat(`#${Math.floor(1000 + Math.random() * 9000)}`)
    .toLocaleLowerCase();
};
