

const SightingTable = ({ tableData }) => {

  const chartRows = () => {
    return tableData.map( row => <p>{row}</p> )
  }

    return(
      <>
        <h2>Search results below</h2>
        { !tableData
          ?
            <p>No results yet, please search above</p>
          :
            <p>
              Chart data!!! ...after you search and then hit fetch button
              {chartRows()}
              Also example of needing to conditionally render with useState
            </p>
        }
      </>
    )

}


export default SightingTable

/*
Where you got stuck trying to convert stuff to state - forever re-rendering error:

const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [cityList, setCityList] = useState("")
    const [cityName, setCityName] = useState("")

    useEffect((tableData) => {
        if(tableData)
            {
                setLatitude( tableData.lat )
                setLongitude( tableData.lon )
                setCountry( tableData.display_name.split(", ")[4].replace(" ","_") )
                setState( tableData.display_name.split(", ")[2].replace(" ","_") )
            }
        }, [tableData]
    )

    const getCityArray = () => {
        if(country && state){
            const geoLibCityArray = geoMap[country][state]
            setCityList(geoMap[country][state])

            // cityList = geoMap[country][state].map((cityObj) => {
            //     return {...cityObj}
            // })

            geoLibCityArray.forEach((cityObj) => {
                delete cityObj['city']
            })
            return geoLibCityArray
        }
    }
    console.log(latitude)

    //Will probably want to refactor to render chart conditionally - using a useEffect?
    if(country && state){
        const closestLatLon = findNearest({latitude: latitude,longitude: longitude} ,getCityArray())
        // cityName = cityList.find((city) => city["latitude"] === closestLatLon.latitude && city["longitude"] === closestLatLon.longitude)
        // console.log(cityName)
    }



*/
