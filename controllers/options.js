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
    const { name, options } = req.body;

    // Validate the name property
    if (!name || typeof name !== "string") {
      return res.status(400).json("Invalid name property");
    }

    let updateFields = {};

    // Handle different name values
    switch (name) {
      case "loadType":
      case "freightType":
      case "contractor":
      case "crossed":
      case "products":
        // Validate the options property
        if (!Array.isArray(options)) {
          return res.status(400).json("Invalid options property");
        }
        updateFields = { [name]: options };
        break;

      default:
        return res.status(400).json("Invalid name property");
    }

    const updatedOptions = await Options.findOneAndUpdate({}, updateFields, {
      upsert: true, // Create the options if it doesn't exist
      new: true, // Return the updated options instead of the old one
    });

    res.json(updatedOptions);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
