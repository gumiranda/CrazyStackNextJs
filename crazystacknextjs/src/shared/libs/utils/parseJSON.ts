/* eslint-disable @typescript-eslint/no-unused-vars */
export const parseJSON = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error: any) {
    return null;
  }
};
