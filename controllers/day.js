import Day from "../models/Day.js";

// === GET ALL DAYS INFO WITHIN THE SPECIFIED RANGE ===
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

// === CREATE NEW DAY OR UPDATE EXISTING DAY ===
export const createOrUpdateDay = async (req, res) => {
  const { date, products } = req.body;

  try {
    const formatedDate = date?.split("-").reverse().join("-");

    // Check if the day already exists
    const existingDay = await Day.findOne({ date: new Date(formatedDate) });

    if (existingDay) {
      // Update the existing day
      existingDay.products = products;
      existingDay.editedBy = req.user.name || req.user.email;
      await existingDay.save();

      res.status(200).json({ message: `${date} Day has been updated` });
    } else {
      // Create a new day
      const newDay = await Day.create({
        date: new Date(formatedDate),
        day: new Date(formatedDate).getDay(),
        products,
        editedBy: req.user.name || req.user.email,
      });

      res.status(201).json({ message: `${date} Day has been create  d` });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
