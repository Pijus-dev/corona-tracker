import React from "react";

import styles from "./feed.module.scss";

const Feed = (props) => {
  // const { urlToImage, url, title, description, author, time } = props;
  // return (
  //   <div className={styles.feed}>
  //     <a href={url}>
  //       <img src={urlToImage} alt="article" />
  //     </a>
  //     <a href={url}>
  //       <h2>{title}</h2>
  //     </a>
  //     <p>{description}</p>
  //     <p>{author}</p>
  //     <p>{time}</p>
  //   </div>
  // );
  const { image, url, title, summarization, source, elabDate } = props;
  return (
    <div className={styles.feed}>
      <a href={url}>
        <img src={image} alt="article" />
      </a>
      <a href={url}>
        <h2>{title}</h2>
      </a>
      <p>{summarization}</p>
      <p>{source}</p>
      <p>{elabDate}</p>
    </div>
  );
};
export default Feed;
