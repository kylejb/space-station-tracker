import SightingCard from './SightingCard'

const SightingTable = ({ tableData }) => {

  const dateToday = new Date();
  const dateYesterday = new Date(dateToday.setDate(dateToday.getDate() - 1))

  const filteredSightingCards = () => {
    console.log(tableData)
    return tableData.filter(rowObj => {
      return rowObj.date > dateYesterday && parseInt(rowObj.maxElevation) >= 20 && parseInt(rowObj.duration[0])
    })
  }

  const renderSightingCards = () => {
    let count = -1
    return filteredSightingCards().map( rowObj => <SightingCard key={++count} sightingData={rowObj}/> )
  }

  const headerData = {
    date: "Date", time: "Time", duration: "Duration"
  }

  return (
    <>
      { !tableData
        ?
          <p>No results yet, please search above</p>
        :
          <div className="sightingresults">
                <SightingCard header sightingData={headerData}/>
                {renderSightingCards()}
          </div>
      }
    </>
  );
}

export default SightingTable;
