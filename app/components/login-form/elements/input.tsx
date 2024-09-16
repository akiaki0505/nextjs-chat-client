import React from 'react'

type Props = {
    placeholder: string;
    type: string;
    className: string;
    width: string;
    height: string;
    viewBox: string;
    path1_d: string;
    path2_d: string;
}

export function Input({ placeholder, type, className, width, height, viewBox, path1_d, path2_d }: Props) {
  return (
    <div className="mb-2">
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width={width} height={height} viewBox={viewBox}>
                <path d={path1_d}/>
                <path d={path2_d}/>
              </svg>
            </div>
            <input type={type} id="email-address-icon" className="bg-gray-50 text-black text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-black/50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}  />
            </div>
        </div>
    </div>
  )
}
