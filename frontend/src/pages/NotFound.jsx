import React from "react";
import { styles } from "../styles";
const NotFound = ({ ...props }) => {
  return (
    <div className={styles.body}>
      <h1>This page was not found, please navigate back to home</h1>
    </div>
  );
};

export default NotFound;
