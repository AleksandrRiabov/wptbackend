import Options from "../models/Options.js";

// Get Options object
export const getOptions = async (req, res) => {
  try {
    const options = await Options.findOne({});
    if (options) {
      res.status(200).json(options);
    } else {
      res.status(404).json({ message: "Options object not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create / Update existing Options
export const updateOptions = async (req, res) => {
  try {
    const updatedOptions = await Options.findOneAndUpdate({}, req.body, {
      upsert: true, // Create the options if it doesn't exist
      new: true, // Return the updated options instead of the old one
    });
    res.json(updatedOptions);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
