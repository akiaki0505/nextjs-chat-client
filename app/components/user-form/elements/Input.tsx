import React from 'react'

type Props = {
    name: string;
    type: string;
    placeholder: string;
    id: string;
}

export function Input({ name, id, type, placeholder }: Props) {
  return (
    <div className="mb-2 flex justify-center">
        <input type={type} name={name} id={id} className="bg-black/20 text-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-3/5 p-3 bg-black/50" placeholder={placeholder}  />
    </div>
  )
}
