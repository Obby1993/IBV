import React from 'react'

type Props = {
  params: {
    id: number
  }
}

export default function dynamicPage({params}: Props) {
  return (
    <div>event with id: {params.id}</div>
  )
}
