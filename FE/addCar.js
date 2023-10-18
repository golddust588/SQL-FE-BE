const addNewFormButton = document.getElementById("submit-button");
const submitMessage = document.getElementById("submit-message");

const getItem = () => {
  const itemTitle = document.getElementById("item-title").value;
  const itemPhotoUrl = document.getElementById("photo-url").value;
  const itemPrice = document.getElementById("item-price").value;
  const numberPlate = document.getElementById("number-plate").value;

  const itemObject = {
    title: itemTitle,
    image: itemPhotoUrl,
    price: itemPrice,
    numberplates: numberPlate,
  };

  return itemObject;
};

const insertItem = async (itemObject) => {
  try {
    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemObject),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const onItemInserted = (data) => {
  if (data.response === "Car was added") {
    submitMessage.innerHTML = "Car inserted!";
  } else {
    submitMessage.innerHTML =
      "Car was not inserted, please fill all fields correctly and try again.";
  }
};

addNewFormButton.addEventListener("click", async () => {
  console.log("cliiiik");
  try {
    const itemObject = getItem();
    console.log(itemObject);
    const data = await insertItem(itemObject);
    console.log(data);
    onItemInserted(data);
  } catch (err) {
    console.log(err);
  }
});
