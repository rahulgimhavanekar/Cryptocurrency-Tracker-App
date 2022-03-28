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
import LoadingSpinner from "../../UI/LoadingSpinner";
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
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);
  const params = useParams();
  const { currency } = useContext(CryptoContext);

  useEffect(() => {
    const fetchChartData = async (noOfdays) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${noOfdays}`
        );
        setChartData(response.data);
        setLoading(false);
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
        labels: {
          font: {
            family: "Metropolis, sans-serif",
            size: 16,
            lineHeight: 1.2,
          },
        },
      },
      tooltip: {
        titleFont: {
          family: "Metropolis, sans-serif",
        },
        bodyFont: {
          family: "Metropolis, sans-serif",
        },
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

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Price ( Past ${days} Days ) in ${currency}`,
        data: chartData?.prices.map((item) => item[1].toFixed(2)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <section className={classes.chart_container}>
      {loading ? (
        <div className={classes.centered}>
          <LoadingSpinner />
        </div>
      ) : (
        <Line data={data} options={options} />
      )}
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
