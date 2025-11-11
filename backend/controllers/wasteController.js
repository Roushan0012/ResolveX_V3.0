import WasteReport from "../models/WasteReport.js";

export const createWasteReport = async (req, res) => {
  try {
    const { wasteType, location, landmark, description } = req.body;

    if (!wasteType || !location || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let files = [];
    if (req.files && req.files.length > 0) {
      files = req.files.map((f) => f.filename);
    }

    const newReport = new WasteReport({
      wasteType,
      location,
      landmark,
      description,
      files,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report saved successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Report submission error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
