const SightingTable = ({ tableData }) => {
  const chartRows = () => {
    return tableData.map( row => <p>{row}</p> )
  }
    return (
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
