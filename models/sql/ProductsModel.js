export class ProductsModel {

  static getAllProducts = async () => {
    return { success: true, data: [{ nombre: "Zapatilla Nike", precio: 10 }] }
  }
}