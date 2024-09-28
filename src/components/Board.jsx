import "./Board.css"

const Board = ({ updateDialog, restaurantList }) => {
  const restaurantList2D = []
  for (let i = 0; i < restaurantList.length; i += 5) {
    const row = restaurantList.slice(i, i + 5)
    restaurantList2D.push(row)
  }

  return (
    <table>
      <tbody>
        {
          restaurantList2D.map(row => {
            return (
              <tr>
                { row.map(restaurant => (
                  <td>
                    <button
                      className={restaurant.visited && "visited"}
                      onClick={() => {updateDialog(restaurant)}}
                      aria-label={`${restaurant.restaurantName}, ${restaurant.visited ? 'visited' : 'not visited'}`}
                    >
                      {restaurant.restaurantName}
                    </button>
                  </td>
                )) }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Board