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
    console.log(articles);
    setNews(articles);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const removeItem = news.splice(3, 1);

  return (
    <div className={styles.feedOverview}>
      {news.map(
        ({ urlToImage, author, description, title, url, publishedAt }, idx) => {
          const time = new Date(publishedAt)
            .toString()
            .split(" ")
            .splice(1, 3)
            .join(" ");
          return (
            <Feed
              key={idx}
              image={urlToImage}
              url={url}
              author={author}
              time={time}
              title={title}
              description={description}
              publishedAt={publishedAt}
            />
          );
        }
      )}
    </div>
  );
};

export default FeedOverview;
