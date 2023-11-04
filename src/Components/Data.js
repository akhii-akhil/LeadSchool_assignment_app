import axios from 'axios'
import React, { useState } from 'react'

const Data = () => {
  const [val, setVal] = useState()
  const [dat, setDat] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [clear, setClear] = useState(true)
  const [final,setFinal]=useState()
  const handleChange = (e) => {
    setVal(e.target.value)
  }
  const handleSubmit = () => {
    setFinal(val)
    setLoading(true)
    axios.get(`https://api.zippopotam.us/in/${val}`).then((res) => {
      setClear(false)
      setError(false)
      setDat(res.data)
      setLoading(false)
      console.log(res.data);
    }).catch((err) => {
      setError(true)
      setLoading(false)
      setClear(false)
    })
  }


  return (
    <div>
      <div class="input-group mb-3">
        <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={val} onChange={(e) => handleChange(e)} />
        <button className='btn btn-outline-success' onClick={handleSubmit}>Fetch Data</button>
      </div>
      <br />
      <br />
      {
        loading && <div class="loader"></div>
      }
      {
        error && !loading && <div class="address-box"><h2>No Places With PinCode({ val})</h2> </div>
      }
      {
        dat && !loading && !error && !clear &&
        <div class="address-box">
            <h2>Places With PinCode({ final})</h2>
            <ul class="address-list">
              {
                dat.places.map((i) => {
                  return (
                    <li>{i["place name"]},{i.state} ({i["state abbreviation"]}), {dat.country} ({dat["country abbreviation"]})</li>
                  )
                })
              }
           
           
            
          </ul>
          <div className='clearButton'>
              <button className='btn btn-outline-danger clear' onClick={() => {
                setClear(true)
            }}>Clear Data</button>
          </div>
        </div>
      }
      {
        !loading &&clear && dat && <button className='btn btn-outline-dark clear' onClick={ handleSubmit }>Retrieve the Prev Data</button>
      }
      <br />
      <br />
    </div>
  )
}

export default Data
