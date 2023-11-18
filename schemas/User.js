import z from "zod"

const User = z.object({
  username: z.string().max(36),
  password: z.string().max(36)
})

export async function validateUser (user) {
  return User.safeParse(user)
}