const PRODUCTS_URL = "http://localhost:3000/cars";

export const getAllProducts = async () => {
  try {
    const response = await fetch(PRODUCTS_URL);
    const products = await response.json();
    return products;
  } catch (err) {
    console.log(err);
    return "server connection failure";
  }
};
