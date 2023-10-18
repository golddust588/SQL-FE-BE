import db from "../db.js";

const GET_ALL_CARS = async (req, res) => {
  try {
    const cars = await db.query("SELECT * from Cars");
    return res.json({ cars: cars.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const GET_CAR_BY_ID = async (req, res) => {
  try {
    const car = await db.query(`SELECT * from Cars WHERE id=${req.params.id} `);
    console.log(car);
    if (car.rowCount === 0) {
      return res.status(404).json({ response: "Car not found" });
    }
    return res.json({ car: car.rows[0] });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_CAR = async (req, res) => {
  const { title, image, price, numberplates } = req.body;

  if (!title || !image || isNaN(price) || !numberplates) {
    return res.status(400).json({ response: "Invalid input data" });
  }

  try {
    const car = await db.query(`
      INSERT INTO public.cars(title, image, price, numberplates)
      VALUES ('${title}', '${image}', ${price}, '${numberplates}')
    `);

    return res.status(201).json({ response: "Car was added", car });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const UPDATE_CAR = async (req, res) => {
  const { title, image, price, numberplates } = req.body;
  if (!title || !image || isNaN(price) || !numberplates) {
    return res.status(400).json({ response: "Invalid input data" });
  }
  try {
    const car = await db.query(`
      UPDATE public.cars
      SET title = '${title}', image = '${image}', price = ${price}, numberplates = '${numberplates}'
      WHERE id = ${req.params.id}
    `);
    if (car.rowCount === 0) {
      return res.status(404).json({ response: "Car not found" });
    }
    return res.status(200).json({ response: "Car was updated" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const DELETE_CAR = async (req, res) => {
  try {
    const car = await db.query(`DELETE from Cars WHERE id=${req.params.id} `);
    if (car.rowCount === 0) {
      return res.status(404).json({ response: car, status: "Car not found" });
    }
    return res.json({ response: car, status: "Car was deleted" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ status: "Something went wrong" });
  }
};

export { GET_ALL_CARS, ADD_CAR, GET_CAR_BY_ID, UPDATE_CAR, DELETE_CAR };
