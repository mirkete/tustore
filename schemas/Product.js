import z from "zod"

const Product = z.object({
  name: z.string().max(36),
  price: z.number().int().positive().finite(),
  id: z.string().uuid()
})

async function validateProduct (product) {
  const preFixedProduct = {
    name: product.name,
    id: product.id,
    price: parseInt(product.price)
  }

  return Product.safeParse(preFixedProduct)
}

export { validateProduct }