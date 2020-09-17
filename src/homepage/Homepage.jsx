import React, { useState, useEffect } from "react";

import { Line, Bar } from "react-chartjs-2";
import Card from "../card/card";
import CountrySelector from "../countrySelector/CountrySelector";

import styles from "./homepage.module.scss";

const HomePage = () => {
  const [nations, setNations] = useState([]);
  const [info, setInfo] = useState([]);
  const [totalInfo, setTotalInfo] = useState([]);

  const fetchCountries = async () => {
    const response = await fetch("https://covid19.mathdro.id/api/countries");
    const data = await response.json();
    const { countries } = data;
    setNations(countries);
  };

  const handleSubmit = async (country) => {
    const res = await fetch(
      `https://covid19.mathdro.id/api/countries/${country}`
    );
    const data = await res.json();
    setInfo(data);
  };

  useEffect(() => {
    fetchCountries();
    fetchTotalData();
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
          confirmed={totalInfo.reduce((acc, cull) => acc + cull.confirmed, 0)}
          recovered={15521145}
          deaths={totalInfo.reduce((acc, cull) => acc + cull.deaths, 0)}
          lastUpdate={new Date().toString().split(" ").splice(1, 3).join(" ")}
        />
      );
    }
  };

  const fetchTotalData = async () => {
    const response = await fetch("https://covid19.mathdro.id/api/daily");
    const data = await response.json();

    const finalData = data.map(
      ({ confirmed, deaths, recovered, reportDate: date }) => ({
        confirmed: confirmed.total,
        deaths: deaths.total,
        recovered: recovered.total,
        date,
      })
    );

    setTotalInfo(finalData);
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
          height="190px"
        />
      );
    }
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}></div>
      </nav>
      <div className={styles.background}>
        <CountrySelector countries={nations} handleChange={handleSubmit} />
        <div className={styles.mobile}>
          {renderData()}
          <div className={styles.chart}>{renderChart()}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
