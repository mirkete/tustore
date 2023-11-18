import z from "zod"

const Product = z.object({
  name: z.string().max(36),
  price: z.number().int().positive().finite()
})

async function validateProduct (product) {
  const preFixedProduct = {
    name: product.name,
    price: parseInt(product.price)
  }

  return Product.safeParse(preFixedProduct)
}

export { validateProduct }