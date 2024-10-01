# Bingo Bites

Welcome to Bingo Bites!

This app was created as part of the [Learn with Jason Web Dev Challenge Hackathon #5](https://www.learnwithjason.dev/blog/web-dev-challenge-s1e5-food-scene-hackathon).

## Goal

Tired of going to the same old restaurants again and again? Want to expand your culinary horizons while supporting local businesses? Try Bingo Bites!

Bingo Bites is a bingo-style game where each square on your board has the name of a different restaurant in your area. When you visit a restaurant on your board, you can check it off. Once you get a bingo, you can take your board into a participating restaurant and show it to the cashier to  to earn a discount or free treat.

## How To Test

- Create a new account. A bingo board will be generated for you.
- Click on a square to see the details for that restaurant.
- Once you get a bingo, you can take your board into a participating restaurant to redeem your prize! (Or at least, that's how it would work if this were a real app and not just a hackathon project.)

## Tools I Used

- Vite & React
- Convex (for database)
- Clerk (for auth)
- pnpm (for package management)
- Netlify (for hosting)
- ChatGPT (to generate the home page text, & for debugging)

## Plans for v2 and Beyond

- Have the user enter their city, and populate their board with restaurants in their area. Show a map for where the restaurant is located.
- When a user checks into a restaurant, they have to upload a photo of the meal they got. When users are browsing the restaurant details on their board, it shows them a list of photos that other patrons have uploaded.
- Automatically detect when a user has gotten a bingo and add a new reward token to their account. Users can redeem reward tokens at a restaurant, which updates the number of rewards associated with their account.
- Make boards a monthly contest. At the end of the month, automatically generate a new board for each user.
- Add a monthly raffle to earn a bigger prize. Earn raffle tickets by getting bingos on your board, or get a blackout to earn bonus tickets!
