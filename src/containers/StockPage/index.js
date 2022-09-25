import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";
import { stocksInstrumentRequest } from "./actions";
import Papa from "papaparse";
import PageLoader from "../../components/PageLoader";
import ErrorPage from "../ErrorPage";
import "./styles.scss";

function Stock() {
  const dispatch = useDispatch();
  const stocksLoading = useSelector((state) => state?.stocks.stocksLoadings);
  const stocksError = useSelector((state) => state?.stocks.stocksErrors);
  const [instrumentData, setInstrumentData] = useState(null);
  const [instrumentDataColumns, setInstrumentDataColumns] = useState(null);
  const stocksInstrument = useSelector(
    (state) => state?.stocks.stocksInstruments
  );

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
          // this will get all the unique columns and save it in a state
          setInstrumentDataColumns(
            Object.keys(results?.data[0])?.map((i) => ({
              title: i,
              dataIndex: i,
              key: i,
              render:
                i === "Symbol"
                  ? (text) => <a onClick={() => console.log(text)}>{text}</a>
                  : null,
            }))
          );
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
              <StocksTable />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Stock;
