import { useRef, useState, useEffect } from "react";
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
import restaurantList from "./restaurants.json";
import "./App.css";

type RestaurantDetails = {
  restaurantName: string;
  address: string;
  visited: boolean;
  index: number;
};

export default function App() {
  return (
    <div id="page-wrapper">
      <nav>
        <p id="site-title">Bingo Bites</p>
        <Authenticated>
          <UserButton />
        </Authenticated>
        <Unauthenticated>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </div>
        </Unauthenticated>
      </nav>
      <main>
        <Authenticated>
          <Content />
        </Authenticated>
        <Unauthenticated>
          <h1>Welcome to Bingo Bites!</h1>
          <h2>Your Restaurant Bingo Adventure Starts Here!</h2>
          <p className="emoji">🍔 ✅ 🏆</p>
          <p>
            Love dining out? Love rewards? Bingo Bites brings you the best of
            both worlds! Explore local restaurants, enjoy delicious meals, and
            play Bingo all at once. Here's how it works:
          </p>
          <ol>
            <li>
              <strong>Visit Local Spots:</strong> Discover participating restaurants near you.
            </li>
            <li>
              <strong>Make a Purchase:</strong> Whether it's lunch, dinner, or just a snack,
              every purchase gets you one step closer to a Bingo!
            </li>
            <li>
              <strong>Cross it Off:</strong> Check off each restaurant you visit on your Bingo
              board.
            </li>
            <li>
              <strong>Win Big:</strong> Get a Bingo and score awesome rewards—like discounts or
              free treats—just by showing your board to the cashier!
            </li>
          </ol>
          <p>
            Ready to eat your way to victory? Download the app and start
            crossing off those restaurants today. Delicious prizes are waiting!
          </p>
        </Unauthenticated>
      </main>
      <footer>
        👩‍💻 This app was created as part of the Learn with Jason <a href="https://www.learnwithjason.dev/blog/web-dev-challenge-s1e5-food-scene-hackathon">Web Dev Challenge Hackathon #5.</a>
      </footer>
    </div>
  );
}

const LoadingPlaceholder = () => {
  return <p>Loading board...</p>;
};

function Content() {
  const dialogRef: React.RefObject<HTMLDialogElement> = useRef(null);
  const [activeRestaurant, setActiveRestaurant] =
    useState<RestaurantDetails | null>(null);
  const createBoardForCurrentUser = useMutation(
    api.boards.createBoardForCurrentUser
  );
  const updateRestaurantsForCurrentUser = useMutation(
    api.boards.updateRestaurantsForCurrentUser
  );

  // check if the current user has an existing board
  // if they don't, create one for them
  const board = useQuery(api.boards.getBoardForCurrentUser);
  console.log("board after useQuery", board);

  const [restaurants, setRestaurants] = useState(board?.restaurants);

  // Create a new board if the user doesn't have one in the database yet
  useEffect(() => {
    const createBoard = async () => {
      console.log("inside createBoard()");
      if (board === null) {
        console.log(
          "about to call createBoardForCurrentUser (Convex function)"
        );
        await createBoardForCurrentUser({ restaurants: restaurantList });
      }
    };

    console.log("inside useEffect to create board");
    createBoard().catch((error) => console.log("ERROR:", error));
  }, [board]);

  // Update the restaurants in state based on the board,
  // to trigger a rerender when the board changes
  useEffect(() => {
    console.log("inside useEffect for board changes");
    setRestaurants(board?.restaurants);
  }, [board]);

  if (!board || !restaurants) {
    return <LoadingPlaceholder />;
  }

  const updateDialog = (restaurantDetails: RestaurantDetails) => {
    setActiveRestaurant(restaurantDetails);
    dialogRef?.current?.showModal();
  };

  const handleCheckIn = async () => {
    // Create the new restaurants state object
    const newRestaurants = [...restaurants];
    const currentIndex = activeRestaurant?.index;
    if (currentIndex === undefined) {
      throw new Error("Current Index is not defined");
    }
    newRestaurants[currentIndex].visited = true;

    setRestaurants(newRestaurants);

    // call a Convex function to update the board in the database
    await updateRestaurantsForCurrentUser({
      boardId: board._id,
      restaurants: newRestaurants,
    });

    dialogRef?.current?.close();
  };

  return (
    <>
      <details>
        <summary>
          How It Works
        </summary>
        <p>
          Visit participating restaurants and make a purchase to cross them off your Bingo board. Once you get a Bingo, show your board to a cashier at any participating location to claim your reward, like a discount or a free treat. Happy dining and good luck!
        </p>
      </details>
      <Board updateDialog={updateDialog} restaurantList={restaurants} />
      <Modal
        dialogRef={dialogRef}
        activeRestaurant={activeRestaurant}
        handleCheckIn={handleCheckIn}
      />
    </>
  );
}
