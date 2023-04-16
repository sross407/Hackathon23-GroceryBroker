import PricesDAO from "../dao/pricesDAO.js"

export default class PricesController {
  static async apiPostPrice(req, res, next) {
    try {
      const name = req.body.name
      const locationid = req.body.locationid
      const location_name = req.body.location_name
      const price = parseFloat(req.body.price)
      console.log('name', name)
      const priceResponse = await PricesDAO.addPrice(
        name,
        locationid,
        location_name,
        price
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetPrice(req, res, next) {
    try {
      let id = req.params.id || {}
      let price = await PricesDAO.getPrice(id)
      if (!price) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(price)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdatePrice(req, res, next) {
    try {
      const id = req.params.id
      const price = parseFloat(req.body.price)

      const priceResponse = await PricesDAO.updatePrice(
        id,
        price
      )

      var { error } = priceResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (priceResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update price",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeletePrice(req, res, next) {
    try {
      const id = req.params.id
      const priceResponse = await PricesDAO.deletePrice(id)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetPrices(req, res, next) {
    try {
      let name = req.params.name || {}
      let prices = await PricesDAO.getPricesByName(name)
      if (!prices) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(prices)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetAllPrices(req, res, next) {
    try {
      let prices = await PricesDAO.getAllPrices()
      if (!prices) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(prices)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}