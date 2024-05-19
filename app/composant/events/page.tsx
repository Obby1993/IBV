import React from "react";
import Card from "./card/page"
import style from "./events.module.css"
type Props = {};

export default function Events({}: Props) {
  return(
  <div className={style.contenaire}>
    <Card />
    <Card />
    <Card />
  </div>

  )
}
