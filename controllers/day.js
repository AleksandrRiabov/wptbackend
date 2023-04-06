import Day from "../models/Day.js";





export const getDayData = async (req, res) => {
  const { date } = req.params;

  try {
    await Day.create({
      date: "04.04.2023",
      day: "Monday",
      products: [{ name: "Chill", cases: "33", pallets: "23", category: "1" }],
    });
  } catch (error) {
    console.log(error)
  }
};



