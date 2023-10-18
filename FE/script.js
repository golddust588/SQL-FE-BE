import { getAllProducts } from "./src/allProductsFetch.js";
import { deleteProduct } from "./src/oneProductFetch.js";

const productsWrapper = document.getElementById("products-wrapper");

const buildItemCard = (product) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "product-wrapper");

  const numberplates = document.createElement("h1");
  numberplates.innerHTML = product.numberplates;

  const title = document.createElement("h4");
  title.innerHTML = product.title;

  const price = document.createElement("h4");
  price.innerHTML = `Price: ${product.price} €`;
  price.setAttribute("class", "price");

  const image = document.createElement("img");
  image.setAttribute("class", "product-image");
  image.src = product.image;

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "DELETE";
  deleteButton.setAttribute("class", "delete-button");
  deleteButton.addEventListener("click", async () => {
    console.log("cliiiik");
    try {
      const response = await deleteProduct(product.id);
      console.log(response);
      alert(response.status);
      location.reload();
    } catch (err) {
      console.log(err);
      alert(response.status);
    }
  });

  wrapper.append(numberplates);
  wrapper.append(title);
  wrapper.append(price);
  wrapper.append(image);
  wrapper.append(deleteButton);

  return wrapper;
};

const fillCardsWithData = async () => {
  const data = await getAllProducts();
  console.log(data);
  const cars = data.cars;
  console.log(cars);
  if (data == []) {
    const wrapper = document.createElement("h1");
    wrapper.innerHTML = "There are no cars to show";
    productsWrapper.append(wrapper);
  } else if (data === "server connection failure") {
    const wrapper = document.createElement("h1");
    wrapper.innerHTML = "Status 500, something went wrong";
    productsWrapper.append(wrapper);
    const header = document.getElementById("header");
    header.style.display = "none";
  } else {
    cars.forEach((car) => {
      const card = buildItemCard(car);
      productsWrapper.append(card);
    });
  }
};

fillCardsWithData();
