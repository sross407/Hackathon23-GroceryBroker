import express from "express"
import PricesCtrl from "./prices.controller.js"

const router = express.Router()

router.route("/product/:name").get(PricesCtrl.apiGetPrices)
router.route("/all").get(PricesCtrl.apiGetAllPrices)
router.route("/new").post(PricesCtrl.apiPostPrice)
router.route("/:id")
    .get(PricesCtrl.apiGetPrice)
    .put(PricesCtrl.apiUpdatePrice)
    .delete(PricesCtrl.apiDeletePrice)

export default router