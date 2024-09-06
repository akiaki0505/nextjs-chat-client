import React from 'react'

type Props = {
    placeholder: string;
    type: string;
}

export function Input({ placeholder, type }: Props) {
  return (
    <div className="mb-2">
        <input 
            type={type}
            placeholder={placeholder} 
            className="text-xl w-3/5 p-3 border rounded"
        />
    </div>
  )
}
