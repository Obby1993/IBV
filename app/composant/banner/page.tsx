import React from "react";
import styles from "./banner.module.css";
import StyledLink from '../StyledLink';

type Props = {};

export default function Banner({}: Props) {
  return (<div className={styles.contenaire}>
    <div >
      <h1 className="titre">Imagine Beach Volley</h1>
      <div className="p-6">
      <p className={styles.textBanner}>Nous organisons des stages intensifs de Beach Volley en France et à l'étranger !</p>
      <StyledLink href={"/events"}>Les Stages  IBV </StyledLink>
      <StyledLink href={"#section2"}>Les  Coachs </StyledLink>
      </div>
    </div>
      <img src="/images/logo_ibv.png" alt="logo"/>

  </div>
)}
