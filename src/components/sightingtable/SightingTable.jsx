const SightingTable = ({ tableData }) => {
  const chartRows = () => {
    let count = -1
    return tableData.map( rowObj => <tr key={++count}>
      <td>{rowObj.date}</td>
      <td>{rowObj.time}</td>
      <td>{rowObj.duration}</td>
      <td>{rowObj.maxElevation}</td>
      <td>{rowObj.approach}</td>
      <td>{rowObj.departure}</td>
    </tr> )
  }
  return (
    <>
      {/* <h1>SightingTable Component</h1> */}
      { !tableData
        ?
          <p>No results yet, please search above</p>
        :
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Maximum Elevation</th>
                <th>Approach</th>
                <th>Departure</th>
              </tr>
                {chartRows()}
            </tbody>
          </table>
      }
    </>
  );
}

export default SightingTable;
