export const parseCookies = (allCookies: Array<any>) => {
  const obj: { [key: string]: any } = {};
  for (let i = 0; i < allCookies.length; i++) {
    const item = allCookies[i];
    obj[item.name] = item.value;
  }
  return obj;
};
