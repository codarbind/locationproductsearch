import mongoose from "mongoose";

const checkRecordExists = async (modelName, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid record ID");
  }

  try {
    const Model = mongoose.model(modelName);

    const record = await Model.findById(id);

    return record !== null;
  } catch (error) {
    console.error("Error checking record existence:", error);
    throw new Error("Internal server error");
  }
};

export default checkRecordExists;
