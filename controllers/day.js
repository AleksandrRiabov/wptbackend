import {
  calculateMedianCoefficients,
  getDatesForWeeksBefore,
} from "../helpers.js";
import Day from "../models/Day.js";
import { isValid, format } from "date-fns";

// === GET ALL DAYS INFO WITHIN THE SPECIFIED RANGE ===
//If only start date provided, the end date by default is Today.
// If no date range specified, it will return info for current day (Today)
// If "withStats" query is true, it will calculate coefficients
//and expected cases and return requested day including those values
export const getDaysDataInRange = async (req, res) => {
  const { dateFrom, dateTo } = req;
  const { withStats } = req.query;

  if (!withStats) {
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
  } else {
    if (!isValid(new Date(dateTo))) {
      return res.status(403).json({ message: "Invalid Date format." });
    }

    const dateArray = getDatesForWeeksBefore(dateTo, 6);
    try {
      const fiveWeeksSameDayData = await Day.find({
        date: { $in: dateArray },
      }).exec();

      if (fiveWeeksSameDayData.length) {
        if (
          fiveWeeksSameDayData[
            fiveWeeksSameDayData.length - 1
          ].date.toISOString() !== dateArray[0]
        ) {
          fiveWeeksSameDayData.push({ date: dateArray[0], products: [] });
        }

        const withCoefficients =
          calculateMedianCoefficients(fiveWeeksSameDayData);
        return res.status(200).json([withCoefficients]);
      }

      return res.status(200).json([]);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal server error." });
    }
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
