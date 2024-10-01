import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useQuery,
  useMutation,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Board from "./components/Board";
import Modal from "./components/Modal";
import restaurantList from "./restaurants.json"

export default function App() {
 
  return (
    <main>
      <h1>
        Bingo Bites
      </h1>
      <Authenticated>
        <SignedIn />
      </Authenticated>
      <Unauthenticated>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </main>
  );
}

const LoadingPlaceholder = () => {
  return (
    <p>Loading board...</p>
  )
}

function SignedIn() {
  const dialogRef = useRef(null);
  const [activeRestaurant, setActiveRestaurant] = useState(null)
  const createBoardForCurrentUser = useMutation(api.boards.createBoardForCurrentUser)
  const updateRestaurantsForCurrentUser = useMutation(api.boards.updateRestaurantsForCurrentUser)

  // check if the current user has an existing board
  // if they don't, create one for them
  const board = useQuery(api.boards.getBoardForCurrentUser)
  console.log("board after useQuery", board)

  const [restaurants, setRestaurants] = useState(board?.restaurants)

  // Create a new board if the user doesn't have one in the database yet
  useEffect(() => {
    const createBoard = async () => {
      console.log("inside createBoard()")
      if (board === null) {
        console.log("about to call createBoardForCurrentUser (Convex function)")
        await createBoardForCurrentUser({ restaurants: restaurantList })
      }
    }

    console.log("inside useEffect to create board")
    createBoard()
      .catch(error => console.log("ERROR:", error))
  }, [board])

  // Update the restaurants in state based on the board,
  // to trigger a rerender when the board changes
  useEffect(() => {
    console.log("inside useEffect for board changes")
    setRestaurants(board?.restaurants)
  }, [board])

  
  if (!board || !restaurants) {
    return <LoadingPlaceholder />
  }
  
  const updateDialog = (restaurantDetails) => {
    setActiveRestaurant(restaurantDetails);
    dialogRef.current.showModal();
  }

  const handleCheckIn = async () => {
    // Create the new restaurants state object
    const newRestaurants = [...restaurants]
    const currentIndex = activeRestaurant.index
    newRestaurants[currentIndex].visited = true

    setRestaurants(newRestaurants)

    // call a Convex function to update the board in the database
    await updateRestaurantsForCurrentUser({
      boardId: board._id,
      restaurants: newRestaurants,
    })

    dialogRef.current.close();
  }

  return (
    <>
      <UserButton />
      <Board updateDialog={updateDialog} restaurantList={restaurants} />
      <Modal
        dialogRef={dialogRef}
        activeRestaurant={activeRestaurant}
        handleCheckIn={handleCheckIn}
      />
    </>
  )
}
