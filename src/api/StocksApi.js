import { get } from "./helpers/methodHelper";

const getStocksInstruments = async (data) => {
  const res = await get("instruments", data);
  return res;
};

export default getStocksInstruments;
