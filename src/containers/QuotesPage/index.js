import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quotesRequest } from "./actions";
import dayjs from "dayjs";
import { Table } from "antd";
import PageLoader from "../../components/PageLoader";
import capitalizeFirstLetter, { PriceFormat } from "../../helpers/common";
import "./styles.scss";

let firstTime = true;
let runningIntervalId;
function Quotes() {
  const dispatch = useDispatch();
  const quotesData = useSelector((state) => state?.quotes.quotesData);
  const quotesLoading = useSelector((state) => state?.quotes.quotesLoading);
  const quotesError = useSelector((state) => state?.quotes.quotesError);
  const [allQuotesData, setAllQuotesData] = useState([]);
  // const [pollingPause, setPollingPause] = useState(false);
  // const [pollingPause, setPollingPause] = useState(false);
  const [allQuotesColumns, setAllQuotesColumns] = useState([]);

  // fetch the api for respective symbol
  const callQuotesApi = () => {
    const tempSymbol = new URLSearchParams(window?.location?.search).get(
      "symbol"
    );
    // if no symbol in query params redirecting to stocks page
    if (tempSymbol) {
      dispatch(quotesRequest(`${tempSymbol}`));
    } else window.location.href = "/stocks";
  };

  useEffect(() => {
    callQuotesApi();
  }, []);

  const setIntervalFunc = (tempTable) => {
    runningIntervalId = setInterval(() => {
      if (tempTable.some((i) => new Date(i?.valid_till) < new Date())) {
        callQuotesApi();
      }
    }, 1000);
  };

  useEffect(() => {
    if (quotesData?.payload) {
      firstTime = false;
      const tempTable = quotesData?.payload[
        new URLSearchParams(window?.location?.search)
          ?.get("symbol")
          ?.toUpperCase()
      ]?.map((i, index) => ({
        ...i,
        price: PriceFormat(Number(i?.price)),
        time: new Date(`${i.time} UTC`).toString(),
        valid_till: new Date(`${i.valid_till} UTC`).toString(),
      }));
      // this will get all the unique columns and save it in a state
      const tempTableCoulumnsData = Object.keys(tempTable[0])?.map(
        (i, index) => ({
          title: capitalizeFirstLetter(i),
          dataIndex: i,
          key: i,
          sorter:
            i === "time"
              ? {
                  compare: (a, b) =>
                    dayjs(a.time).unix() - dayjs(b.time).unix(),
                }
              : null,
        })
      );
      setAllQuotesColumns(tempTableCoulumnsData);
      // this will check if the current response is having any expired quote
      if (tempTable?.some((i) => new Date(i?.valid_till) < new Date())) {
        // if true then it will clear the clear interval and re-call the api after 6 seconds
        if (allQuotesData?.length === 0) {
          setAllQuotesData(tempTable);
        }
        clearInterval(runningIntervalId);
        runningIntervalId = null;
        setTimeout(() => {
          callQuotesApi();
        }, 6000);
      } else {
        // if false it will save the new data and show it on the screen
        setAllQuotesData(tempTable);
        setIntervalFunc(tempTable);
      }
      // this will save the parsed table data in a state
    }

    return () => {};
  }, [quotesData]);

  const QuotesTable = () => (
    <Table
      dataSource={allQuotesData}
      columns={allQuotesColumns}
      loading={quotesLoading}
    ></Table>
  );

  return (
    <div>
      {firstTime && quotesLoading ? (
        <PageLoader />
      ) : (
        <div className={`quotes-page ${quotesLoading && `pulse`}`}>
          <QuotesTable />
        </div>
      )}
    </div>
  );
}

export default Quotes;
