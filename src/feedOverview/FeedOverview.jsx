import React, { useState, useEffect } from "react";

import Feed from "./feed/Feed";

import styles from "./feedOverview.module.scss";

const FeedOverview = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines?q=covid-19&language=en&sortBy=publishedAt&apiKey=906a42b176b34597b23bc0d302880ece"
    );
    const data = await res.json();
    const { articles } = data;

    const info = articles.filter(
      (val, idx, array) => array.findIndex((t) => t.title === val.title) === idx
    );

    setNews(info);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className={styles.feedOverview}>
      {news
        .filter(
          ({ urlToImage }) => urlToImage !== null && urlToImage != "unknown"
        )
        .map((props, idx) => {
          const time = new Date(props.publishedAt)
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
