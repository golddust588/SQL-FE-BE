const PRODUCTS_URL = "http://localhost:3000/cars";

// export const updateProduct = async (productId, itemObject) => {
//   try {
//     const response = await fetch(PRODUCTS_URL + "/" + productId, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(itemObject),
//     });
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(PRODUCTS_URL + "/" + productId, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
