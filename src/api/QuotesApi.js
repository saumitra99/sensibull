import { get } from "./helpers/methodHelper";

const getQuotes = async (data) => {
  const res = await get(`quotes/${data}`);
  return res;
};

export { getQuotes as default };
