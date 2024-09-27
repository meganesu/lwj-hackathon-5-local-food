import restaurantList from "./restaurants.json"
import "./Board.css"

const Board = () => {
  console.log(restaurantList)

  const restaurantList2D = []
  for (let i = 0; i < restaurantList.length; i += 5) {
    const row = restaurantList.slice(i, i + 5)
    restaurantList2D.push(row)
  }
  console.log(restaurantList2D)

  return (
    <table>
      {
        restaurantList2D.map(row => {
          return (
            <tr>
              { row.map(restaurant => (
                <td>
                  <button>{restaurant.restaurantName}</button>
                </td>
              )) }
            </tr>
          )
        })
      }
    </table>
  )
}

export default Board