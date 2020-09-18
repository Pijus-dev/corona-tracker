import React from "react";

import styles from "./feed.module.scss";

const Feed = ({ image, url, title, description, author, time }) => (
  <div className={styles.feed}>
    <a href={url}>
      <img src={image} alt="article Image" />
    </a>
    <a href={url}>
      <h2>{title}</h2>
    </a>
    <p>{description}</p>
    <p>{author}</p>
    <p>{time}</p>
  </div>
);
export default Feed;
