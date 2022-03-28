import React, { useEffect, useState, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../../../context/cypto-context";
import axios from "axios";
import classes from "./CoinChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const params = useParams();
  const { currency } = useContext(CryptoContext);

  useEffect(() => {
    const fetchChartData = async (noOfdays) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${noOfdays}`
        );
        // const prices = response.data?.prices;
        setChartData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData(days);
  }, [params.id, currency, days]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    elements: {
      point: {
        radius: 2,
        pointStyle: "circle",
      },
    },
  };

  const labels = chartData?.prices.map((item) => {
    return days === 1
      ? new Date(item[0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date(item[0]).toLocaleDateString([], {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  });

  const priceData = chartData?.prices.map((item) => item[1].toFixed(2));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        data: priceData,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  console.log(labels);

  return (
    <section className={classes.chart}>
      <Line data={data} options={options} />
      <div className={classes.actions}>
        <button onClick={() => setDays(1)}>24 hours</button>
        <button onClick={() => setDays(30)}>1 month</button>
        <button onClick={() => setDays(90)}>3 months</button>
        <button onClick={() => setDays(180)}>6 months</button>
        <button onClick={() => setDays(365)}>1 year</button>
      </div>
    </section>
  );
};

export default CoinChart;
