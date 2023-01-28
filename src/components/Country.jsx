import React from 'react'
import './country.css'

const Country = ({ country }) => {
  return (
    <div className='card__country'>
      <div className="top">
        <img src={country?.flags.svg} alt="" />
      </div>
      <div className="box__content">
        <h1>{country?.name.common}</h1>
        <p>{country?.name.common} es un pais ubicado en la región {country?.region}. Su capital es la ciudad de {country?.capital[0]}, ademas de contar con una población de {country?.population} ciudadanos según su ultimo censo.</p>

        <p>Su nombre oficial es {country?.name.official} y está ubicado en el contiente {country?.continents[0]}</p>
      </div>
    </div>
  )
}

export default Country