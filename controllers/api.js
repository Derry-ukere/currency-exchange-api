const asyncHandler = require('express-async-handler')
const axios = require('axios')
const { response } = require('express')
// const request = require('request')

// @desc    Fetch rates
// @route   GET /api/rates
// @access  Public
module.exports = {
  getRates: asyncHandler(async (req, res) => {
    try {
      //Get Data
      const data = await axios.get('https://api.exchangeratesapi.io/latest')

      //GET CURRENCY AND BASE VALUES FROM URL
      const base = req.query.base
      const currency = req.query.currency

      const date = data.data.date
      const receivedData = currency.split(',')
      const firstCurrency = receivedData[0]
      const secondCurrency = receivedData[1]
      const thirdCurrency = receivedData[2]
      const rates = {}
      const apiData = data.data.rates

      rates[firstCurrency] = apiData[firstCurrency]
      rates[secondCurrency] = apiData[secondCurrency]
      rates[thirdCurrency] = apiData[thirdCurrency]

      res.json({
        results: {
          base: base,
          date: date,
          rates: rates,
        },
      })
    } catch (error) {
      res.json({ error: error })
    }
  }),
}
