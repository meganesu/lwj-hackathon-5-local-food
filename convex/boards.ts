import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getBoardForCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject;
    console.log(identity)
    console.log("userId", userId)

    return await ctx.db
      .query("boards")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();
  }
})

export const createBoardForCurrentUser = mutation({
  args: { 
    restaurants: v.array(v.object({
      restaurantName: v.string(),
      address: v.string(),
      visited: v.boolean(),
      index: v.number()
    }))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject;
    const restaurants = args.restaurants;

    console.log("create a new board!")
    const newBoardId = await ctx.db.insert("boards", {
      restaurants,
      userId
    })

    return newBoardId
  }
})