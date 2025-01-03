import Sale from "./models/saleModel.js";

export const checkDate = async () => {
  try {
    let date = new Date("2025-01-07");
    const sales = await Sale.find().exec();
    console.log(date);

    //! Installing cron next to auto run the functions

    for (const sale of sales) {
      const id = sale._id;
      const oneSale = await Sale.findById(id);

      const saleDate = oneSale.date;

      if (saleDate < date) {
        console.log("The sale is done.");
        await Sale.findByIdAndDelete(id);
      } else {
        console.log("The sale is still available");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
