import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Country from './components/Country'
import Start from './components/Start'
import Error from './components/Error'
import Loading from './components/Loading'

function App() {

  const body = document.querySelector('.body');
  const moon = document.querySelector('.bx bx-moon');
  const sun = document.querySelector('.bx-sun');

  const [displayMoon, setDisplayMoon] = useState('block')
  const [displaySun, setDisplaySun] = useState('none')

  const darkMode = () => {
    body.classList.add('dark__mode')
    setDisplayMoon('none')
    setDisplaySun('block')
  }

  const sunMode = () => {
    body.classList.remove('dark__mode')
    setDisplayMoon('block')
    setDisplaySun('none')
  }

  const [start, setStart] = useState(true)
  const [country, setCountry] = useState()
  const [inputValue, setInputValue] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ramdon, setRamdon] = useState(false)
  const [numRandom, setNumRandom] = useState(0)

  const randomF = e => {
    e.preventDefault()
    setRamdon(true)
    setNumRandom(Math.floor(Math.random() * 255))
    console.log(country);
  }

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/name/${inputValue}`
    const urlAll = `https://restcountries.com/v3.1/all`
    setIsLoading(true)
    axios.get(ramdon ? urlAll : url)
      .then(res => setCountry(res.data[numRandom]))
      .catch(err => {
        console.log(err)
        setHasError(true)
        setTimeout(() => { setStart(true) }, 7000);
      })
      .finally(() => setTimeout(() => { setIsLoading(false) }, 2000))

  }, [inputValue, numRandom])

  const search = e => {
    e.preventDefault()
    setInputValue(e.target.nameCountry.value);
    setRamdon(false)
    setNumRandom(0)
    setStart(false)
    setHasError(false)
    e.target.reset()
  }

  return (
    <div className="App">
      <header>
        <h1>Search your favorite country</h1>
        <div className="icons">
          <i className='bx bx-moon' onClick={darkMode} style={{ display: displayMoon }}></i>
          <i className='bx bx-sun' onClick={sunMode} style={{ display: displaySun }}></i>

        </div>
      </header>
      <form onSubmit={search}>
        <input type="text" id='nameCountry' />
        <button>Search</button>
      </form>
      <form className='suerte'>
        <h3>Quiero probar suerte...</h3> <button onClick={randomF}>Search</button>
      </form>
      {
        start ?
          <Start />
          : isLoading ? <Loading />
            : hasError ? <Error />
              : <Country country={country} />
      }

      <div className="repo">
        <a href="https://github.com/alpachm/countries-react.git" target="_blank">Link de repositorio <i className='bx bxl-github'></i></a>
      </div>

      <footer>
        <p>© Copyright Alex Pacheco | Todos los derechos reservados</p>
      </footer>

    </div>
  )
}

export default App
