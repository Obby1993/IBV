import React from "react";
import Coach from "./coach/page";
import style from "./coachs.module.css"
import coachesData from "../../data/coaches.json";
type Props = {};

export default function Coachs({}: Props) {
  return (
  <div className={style.contener}>
    {coachesData.map((coach) => (
    <Coach key={coach.id} coachData={coach} />
  ))}
  </div>
)
}
