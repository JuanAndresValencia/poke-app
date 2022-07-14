import React from 'react'
import './Stats.css'

export const Stats = ({ stats, orderStats }) => {

  return (
    <div className='stats-box'>
      <div className='stats-title'>
        <h1>Estadisticas</h1>
        <button onClick={() => orderStats()}>Valor</button>
      </div>
      {stats.map((stat, i) => (
        <div className='stat-box' key={i}>
          <h2>{stat.stat.name}</h2>
          <p>{stat.base_stat}</p>
        </div>
      ))}
    </div>
  )
}