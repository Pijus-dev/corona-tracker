import React, { useState, useEffect } from "react";

import Feed from "./feed/Feed";

import { fetchNews } from "../apiCalls";

import styles from "./feedOverview.module.scss";

const FeedOverview = () => {
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const data = await fetchNews();
    setNews(data);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className={styles.feedOverview}>
      {news
        // .filter(
        //   ({ urlToImage }) => urlToImage !== null && urlToImage !== "unknown"
        // )
        .map((props, idx) => {
          const time = new Date(props.elabDate)
            .toString()
            .split(" ")
            .splice(1, 3)
            .join(" ");
          return <Feed {...props} key={idx} time={time} />;
        })}
    </div>
  );
};

export default FeedOverview;
