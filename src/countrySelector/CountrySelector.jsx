import React from "react";

import styles from "./countryPicker.module.scss";

const CountrySelector = ({ handleChange, countries }) => (
  <div className={styles.group}>
    <select onChange={(e) => handleChange(e.target.value)}>
      <option value="">Global state</option>
      {countries.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  </div>
);

export default CountrySelector;
