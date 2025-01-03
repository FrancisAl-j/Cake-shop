import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  date: {
    type: Date,
  },
  saleRate: {
    type: Number,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
