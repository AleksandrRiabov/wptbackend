import Day from "../models/Day.js";

// GET ALL DAYS INFO IN THE SPECIFIED RANGE.
//If only start date provided, the end date by default is Today.
// If no date range specified, it will return info for current day (Today)
export const getDaysDataInRange = async (req, res) => {
  const { dateFrom, dateTo } = req;

  try {
    const days = await Day.find({
      date: {
        $gte: dateFrom,
        $lt: dateTo,
      },
    });
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

//======================================
//Create new day
export const createDay = async (req, res) => {
  const { date, products } = req.body;
  console.log(req.user);
  try {
    const formatedDate = date?.split("-").reverse().join("-");

    await Day.create({
      date: new Date(formatedDate),
      day: new Date(formatedDate).getDay(),
      products,
      editedBy: req.user.name || req.user.email,
    });

    res.status(201).json({ message: `${date} Day has been created` });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

//=======================================
//Update Day figures or add the product to the list
export const updateDayFigures = async (req, res) => {
  const { _id } = req.body;

  try {
    const foundDay = await Day.findById(_id);
    const editedBy = [
      ...foundDay.editedBy,
      { name: "Developer", date: new Date() },
    ];
    const updatedDay = await Day.findByIdAndUpdate(_id, {
      products: req.body.products,
      editedBy,
    });
    updatedDay.save();
    res.status(200).json({ message: "Details has been updated" });
  } catch (error) {
    res.status(404).json({ error: true, message: "Day does not exist" });
  }
};
