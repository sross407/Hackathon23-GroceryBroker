import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID;

let prices;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (prices) {
      return
    }
    try {
      prices = await conn.db("prices").collection("prices")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addPrice(name, locationid, location_name, price) {
    try {
      const priceDoc = {
        name: name,
        locationid: locationid,
        location_name: location_name,
        price: price,
      }
      console.log("adding")
      return await prices.insertOne(priceDoc)
    } catch (e) {
      console.error(`Unable to post price: ${e}`)
      return { error: e }
    }
  }

  static async getPrice(id) {
    try {
      return await prices.findOne({ _id: new mongodb.ObjectId(id) })
    } catch (e) {
      console.error(`Unable to get price: ${e}`)
      return { error: e }
    }
  }

  static async updatePrice(id, price) {
    try {
      const updateResponse = await prices.updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { price: price } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update price: ${e}`)
      return { error: e }
    }
  }

  static async deletePrice(id) {

    try {
      const deleteResponse = await prices.deleteOne({
        _id: new mongodb.ObjectId(id),
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete price: ${e}`)
      return { error: e }
    }
  }

  static async getPricesByName(name) {
    try {
      const cursor = await prices.find({ name: name })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get price: ${e}`)
      return { error: e }
    }
  }

  static async getAllPrices() {
    try {
      const cursor = await prices.find({})
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get price: ${e}`)
      return { error: e }
    }
  }

}