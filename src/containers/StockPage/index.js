import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";
import { stocksInstrumentRequest } from "./actions";
import Papa from "papaparse";
import PageLoader from "../../components/PageLoader";
import ErrorPage from "../ErrorPage";
import "./styles.scss";

let backupTableData = [];
function Stock() {
  const dispatch = useDispatch();
  const stocksLoading = useSelector((state) => state?.stocks.stocksLoadings);
  const stocksError = useSelector((state) => state?.stocks.stocksErrors);
  const [instrumentData, setInstrumentData] = useState(null);
  const [instrumentDataColumns, setInstrumentDataColumns] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const stocksInstrument = useSelector(
    (state) => state?.stocks.stocksInstruments
  );
  const searchOptions = {
    includeScore: true,
    // Search in `Symbol` and in `Name` array
    keys: ["Symbol", "Name"],
  };

  const handleSearch = (e) => {
    setSearchParams(e.target.value);
    console.log(backupTableData, "backupTableData");
    const fuse = new Fuse(backupTableData, searchOptions);
    if (e.target.value) {
      const filteredTable = fuse
        .search(e.target.value)
        ?.sort((prev, curr) => curr.score - prev.score)
        ?.map((i) => i.item);
      setInstrumentData(filteredTable);
      console.log(filteredTable, "fuse.search('tion')");
    } else {
      setInstrumentData(backupTableData);
    }
  };

  // useEffect to fetch the api data
  useEffect(() => {
    dispatch(stocksInstrumentRequest());
    return () => {};
  }, []);

  // useEffect to catch and parse the csv response
  useEffect(() => {
    if (stocksInstrument) {
      Papa.parse(stocksInstrument, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(Object.keys(results?.data[0]), "stocksInstrument");
          const tempTableData = Object.keys(results?.data[0])?.map((i) => ({
            title: i,
            dataIndex: i,
            key: i,
            render:
              i === "Symbol"
                ? (text) => <a onClick={() => console.log(text)}>{text}</a>
                : null,
          }));
          backupTableData = results?.data;
          // this will get all the unique columns and save it in a state
          setInstrumentDataColumns(tempTableData);
          // this will save the parsed table data in a state
          setInstrumentData(results?.data);
        },
      });
    }
    return () => {};
  }, [stocksInstrument]);

  const StocksTable = () => (
    <Table dataSource={instrumentData} columns={instrumentDataColumns}></Table>
  );

  return (
    <div>
      {stocksError ? (
        <ErrorPage />
      ) : (
        <>
          {stocksLoading && !instrumentData ? (
            <PageLoader />
          ) : (
            <div className="stocks-instruments">
              <div className="stocks-instruments-search">
                <input
                  type="text"
                  name="search"
                  value={searchParams}
                  onChange={handleSearch}
                  placeholder="Search"
                />
              </div>
              <div className="stocks-instruments-table">
                <StocksTable />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Stock;
