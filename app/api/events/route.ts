import { NextResponse } from "next/server";

const getData = async () => {
  const res = await fetch("")
  const data = await res.json()
  return data
}
