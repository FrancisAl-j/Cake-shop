import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodModel",
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
