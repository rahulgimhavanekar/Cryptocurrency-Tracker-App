import React, { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
        );
        // const prices = response.data?.prices;
        setChartData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
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
    return new Date(item[0]).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const priceData = chartData?.prices.map((item) => item[1].toFixed(2));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "BitCoin Price",
        data: priceData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log(labels);

  return (
    <section className={classes.chart}>
      <p>Coin Chart</p>
      <Line data={data} options={options} />
    </section>
  );
};

export default CoinChart;
