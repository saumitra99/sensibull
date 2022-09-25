import { post } from "./helpers/methodHelper";

const getQuotes = async (data) => {
  const res = await post("quotes", data);
  return res;
};

export { postBulkOrder as default };
