import { Auth } from "../types/route-item";

const authCheck = (auth: Auth | undefined, loggedIn: boolean): boolean => {
  if (!auth) return true;
  if (auth === "authenticated") return loggedIn;
  return !loggedIn;
};

export { authCheck };
