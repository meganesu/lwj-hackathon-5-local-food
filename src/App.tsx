import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import Board from "./components/Board";
import { api } from "../convex/_generated/api";

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
  return (
    <>
      <Board />
    </>
  )
}
