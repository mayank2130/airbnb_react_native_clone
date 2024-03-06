const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopDescription: {
    type: String,
    required: true,
  },
  openDate: {
    type: Number,
    required: true,
  },
  shopCategory: {
    type: String,
    enum: ["Clothing"], // Add more categories as needed
    required: true,
  },
  openFrom: {
    type: String, // or use a specific library for time, e.g., 'moment' or 'dayjs'
    required: true
  },
  closedAt: {
    type: String,
    required: true
  },
});

const Employee = mongoose.model("Shop", storeSchema);

module.exports = Employee;
