import genTestUserSig from "../utils/GenerateTestUserSig";

export const getUserSig = (userId) => {
  return Promise.resolve(genTestUserSig(userId).userSig);
};
