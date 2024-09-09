import React from 'react'

type Props = {
    type: "submit";
    name: string;
}

export function Button({ type, name }: Props) {
  return (
    <button type={type} className="text-xl w-3/5 bg-gradient-to-r from-emerald-500 to-emerald-300 text-white py-2 rounded">{name}</button>
  )
}
