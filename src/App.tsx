import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
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

function SignedIn() {
  const dialogRef = useRef(null);
  const [restaurants, setRestaurants] = useState(restaurantList)
  const [activeRestaurant, setActiveRestaurant] = useState(null)

  const updateDialog = (restaurantDetails) => {
    setActiveRestaurant(restaurantDetails);
    dialogRef.current.showModal();
  }


  const handleCheckIn = () => {
    // Create the new restaurants state object
    const newRestaurants = [...restaurants]
    const currentIndex = activeRestaurant.index
    newRestaurants[currentIndex].visited = true
    console.log("new restaurants", newRestaurants)

    setRestaurants(newRestaurants)
    
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
