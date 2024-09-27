import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import Board from "./components/Board";
import Modal from "./components/Modal"

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

  const updateDialog = () => {
    dialogRef.current.showModal();
  }

  return (
    <>
      <UserButton />
      <Board updateDialog={updateDialog} />
      <Modal dialogRef={dialogRef} />
    </>
  )
}
