import React from 'react'
import style from '@/app/loader/styles/style.module.css'

export default function page() {
  return (
    <div className={style.body}>
        <div className={style.loader}>
            <span></span>
            <span></span>
            <span></span>
            <h2>Now loading...</h2>
        </div>
    </div>
  )
}
