import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CoinInfo = () => {
  const params = useParams();

  useEffect(() => {
    const fetchSingleCoin = async (coinId) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCoin(params.id);
  }, [params.id]);

  return <div>CoinInfo</div>;
};

export default CoinInfo;
