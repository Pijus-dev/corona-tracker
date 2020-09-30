import React, { useState, useEffect } from "react";

import { Line, Bar } from "react-chartjs-2";
import Card from "../card/card";
import CountrySelector from "../countrySelector/CountrySelector";

import {
  fetchCountries,
  fetchTotalData,
  handleSubmit,
  getTotalNumbers,
} from "../apiCalls";

import FeedOverview from "../feedOverview/FeedOverview";

import styles from "./homepage.module.scss";

const HomePage = () => {
  const [nations, setNations] = useState([]);
  const [info, setInfo] = useState([]);
  const [totalInfo, setTotalInfo] = useState([]);
  const [totalNumber, setTotalNumbers] = useState({});

  const handleSingleCountryData = async (country) => {
    const data = await handleSubmit(country);
    setInfo(data);
  };

  const getCountries = async () => {
    const countries = await fetchCountries();
    setNations(countries);
  };

  const getTotalData = async () => {
    const data = await fetchTotalData();
    setTotalInfo(data);
  };

  const getNumbers = async () => {
    const data = await getTotalNumbers();
    setTotalNumbers(data);
  };

  useEffect(() => {
    getCountries();
    getTotalData();
    getNumbers();
  }, []);

  const { confirmed, recovered, deaths } = info;

  const renderData = () => {
    if (info && info.confirmed) {
      const lastUpdate = new Date(info.lastUpdate.substring(0, 10))
        .toString()
        .split(" ")
        .splice(1, 3)
        .join(" ");
      return (
        <Card
          confirmed={confirmed.value}
          recovered={recovered.value}
          deaths={deaths.value}
          lastUpdate={lastUpdate}
        />
      );
    } else {
      return (
        <Card
          confirmed={totalNumber.confirmed ? totalNumber.confirmed.value : null}
          recovered={totalNumber.recovered ? totalNumber.recovered.value : null}
          deaths={totalNumber.deaths ? totalNumber.deaths.value : null}
          lastUpdate={new Date().toString().split(" ").splice(1, 3).join(" ")}
        />
      );
    }
  };

  const renderChart = () => {
    if (info && info.deaths) {
      return (
        <Bar
          data={{
            labels: ["Infected", "Recovered", "Deaths"],
            datasets: [
              {
                label: "People",
                backgroundColor: ["#FF9D00", "#65da9a", "#F65064"],
                data: [confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
            legend: { display: false },
          }}
        />
      );
    } else {
      return (
        <Line
          data={{
            labels: totalInfo.map(({ date }) => date),
            datasets: [
              {
                data: totalInfo.map((data) => data.confirmed),
                label: "Infected",
                borderColor: "#FF9D00",
                fill: true,
              },
              {
                data: totalInfo.map((data) => data.deaths),
                label: "Deaths",
                borderColor: "red",
                backgroundColor: "#F65064",
                fill: true,
              },
            ],
          }}
          height={190}
        />
      );
    }
  };

  return (
    <div className={styles.homepage}>
      <nav className={styles.navbar}>
        <a href="#">
          <div className={styles.logo}></div>
        </a>
      </nav>
      <div className={styles.background}>
        <CountrySelector
          countries={nations}
          handleChange={handleSingleCountryData}
        />
        <div className={styles.mobile}>
          {renderData()}
          <div className={styles.chart}>{renderChart()}</div>
        </div>
      </div>
      <FeedOverview />
    </div>
  );
};

export default HomePage;
