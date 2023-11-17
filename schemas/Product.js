import z from "zod"

const Product = z.object({
  name: z.string(),
  price: z.number().int().positive().finite()
})

async function validateProduct (product) {
  return Product.safeParse(product)
}

export { validateProduct }