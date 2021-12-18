import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { NEXT_DATA_SIZE, PAGE_LIMIT } from "../app-constant";
import useNoblePrizeWinnerList from "../customHooks/useNoblePrizeWinnerList";
import DetailCard from "./DetailCard";

export default function App({ onLogout }) {
  const [pageNumber, setPageNumber] = useState(PAGE_LIMIT);

  const { loading, error, noblePriceWinner, hasMoreData } =
    useNoblePrizeWinnerList(pageNumber);

  const observer = useRef();

  const updateList = useCallback(() => {
    if (loading) return;
    if (observer.current && hasMoreData) {
      setPageNumber((prevPageNumber) => prevPageNumber + NEXT_DATA_SIZE);
      observer.current = null;
    }
  }, [loading, observer, hasMoreData]);
  useEffect(() => {
    let addScrollEvent = document.addEventListener("scroll", (e) => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasMoreData
      ) {
        observer.current = e;
        updateList();
      }
    });
    return () => {
      document.removeEventListener("scroll", addScrollEvent);
    };
  }, [loading]);

  return (
    <Container>
      <div onClick={onLogout}><Button>Logout</Button></div>
      {Array.isArray(noblePriceWinner) &&
        noblePriceWinner.map((personDetail, index) => {
          return (
            <DetailCard
              key={personDetail.awardYear + index}
              data={personDetail}
            />
          );
        })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </Container>
  );
}
