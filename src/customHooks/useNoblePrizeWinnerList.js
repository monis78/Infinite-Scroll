import { useEffect, useState } from "react";
import axios from "axios";
import { APP_ENDPOINT } from "../app-endpoint";
import { INITIAL_DATA, PAGE_LIMIT } from "../app-constant";

export default function useNoblePrizeWinnerList(nextData) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noblePriceWinner, setNoblePriceWinner] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [limit, setLimit] = useState(false)

  const onError = (error) => {
    setNoblePriceWinner([]);
    setError(true);
    setLoading(false);
    console.error(error);
  };

  useEffect(() => {
    if(limit) return
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: APP_ENDPOINT.noblePriceWinner,
      params: {
        limit: nextData === PAGE_LIMIT ? INITIAL_DATA : PAGE_LIMIT,
        sort: "desc",
        offset: nextData,
      },
    })
      .then((res) => {
        try {
          setTimeout(() => {
            if (res.status === 200) {
              setNoblePriceWinner((prevState)=>[...prevState, ...res.data.nobelPrizes]);
              setHasMoreData(nextData <= res.data.meta.count);
              setLimit(!(nextData <= res.data.meta.count))
              setLoading(false);
            } else {
              throw res;
            }
          }, 1000);
     
        } catch (error) {
          console.error(error);
          onError(error);
        }
      })
      .catch((error) => {
        onError(error);
      });
  }, [nextData]);

  return { loading, error, noblePriceWinner, hasMoreData };
}
