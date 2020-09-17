import React from "react";

import CountUp from "react-countup";

import styles from "./card.module.scss";

const Card = ({ confirmed, recovered, deaths, lastUpdate }) => {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <h2>Infected</h2>
        <h3 style={{ color: "#FF9D00" }}>
          <CountUp start={0} end={confirmed} duration={2} separator="," />
        </h3>
        <p>{lastUpdate}</p>
      </div>
      <div className={styles.card}>
        <h2>Recovered</h2>
        <h3 style={{ color: "#65da9a" }}>
          <CountUp start={0} end={recovered} duration={2} separator="," />
        </h3>
        <p>{lastUpdate}</p>
      </div>
      <div className={styles.card}>
        <h2>Deaths</h2>
        <h3 style={{ color: "#F65064" }}>
          <CountUp start={0} end={deaths} duration={2} separator="," />
        </h3>
        <p>{lastUpdate}</p>
      </div>
    </div>
  );
};

export default Card;
