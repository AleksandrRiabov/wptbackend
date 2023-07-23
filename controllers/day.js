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
  const { withStats, day } = req.query;

  if (!withStats) {
    // If no withStats query, return data, else calculate and add coefficients
    const query = {
      date: {
        $gte: dateFrom,
        $lt: dateTo,
      },
    };

    if (day !== undefined) {
      query.day = day; // Filter for documents where day === specific day query
    }

    try {
      const days = await Day.find(query);
      console.log(query);
      res.json(days);
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  } else {
    // return data with coeficients
    if (!isValid(new Date(dateTo))) {
      return res.status(403).json({ message: "Invalid Date format." });
    }

    //Dates for the same day of the week for number of weeks befor
    const datesArray = getDatesForWeeksBefore(dateTo, 10);

    try {
      const numberOfWeeksSameDayData = await Day.find({
        date: { $in: datesArray },
      }).exec();
      // Check if retrived data contains requested date (Day data alredy exist in DB)
      // If Notification, add it to retrived data with empty products array
      if (numberOfWeeksSameDayData.length) {
        if (
          format(
            numberOfWeeksSameDayData[numberOfWeeksSameDayData.length - 1].date,
            "yyyy-MM-dd"
          ) !== datesArray[0]
        ) {
          numberOfWeeksSameDayData.push({ date: datesArray[0], products: [] });
        }

        const withCoefficients = calculateMedianCoefficients(
          numberOfWeeksSameDayData
        );

        return res.status(200).json([{ ...withCoefficients }]);
      }
      //if nothing found return empty array
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
