import SightingCard from './SightingCard'

const SightingTable = ({ tableData }) => {
  const renderSightingCards = () => {
    let count = -1
    return tableData.map( rowObj => <SightingCard key={++count} sightingData={rowObj}/> )
  }
  return (
    <>
      { !tableData
        ?
          <p>No results yet, please search above</p>
        :
          <div className="sightingresults">
                {renderSightingCards()}
          </div>
      }
    </>
  );
}

export default SightingTable;
