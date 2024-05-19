import React from "react";
import Image from "next/image";
import styles from "./banner.module.css";

type Props = {};

export default function Banner({}: Props) {
  return <div className={styles.contenaire}>
    <div className={styles.elemBanner}>
      <h1>Imagine Beach Volley</h1>
      <p className={styles.textBanner}>Nous organisons des stages intensifs de Beach Volley en France et à l'étranger !</p>
      <button className="btn btn-outline btn-warning mr-10">Les Stages  IBV</button>
      <button className="btn btn-outline btn-warning font-emoji">Les  Coachs</button>

    </div>
      <img src="/images/logo_ibv.png" alt="logo"/>

  </div>;
}
