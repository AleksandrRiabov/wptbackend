import Day from "../models/Day.js";

export const getDaysDataInRange = async (req, res) => {
  const { startDate, endDate } = req;

  try {
    const days = await Day.find({
      date: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    });
    res.json(days);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
