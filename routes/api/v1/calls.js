const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const nexmo = require('../../../config/keys').nexmo

// @route   Calls
// @desc    Route to make a single custom call
// @access  Public
router.post(
  '/',
  [
    check('telephone', 'Por favor ingrese un número')
      .not()
      .isEmpty(),
    check('message', 'Por favor agregue un mensaje válido')
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    } else {
      const {telephone, message} = req.body

      const ncco = [
        {
          action: 'talk',
          voiceName: 'Conchita',
          text: '<speak>'+
          '<p>'+ message +'</p>'+
          '<break time="2s" />'+
          '</speak>',
          loop: 3
        },
        {
          action: "notify",
          eventMethod: "POST",
          payload: {
            "foo": "bar"
          },
          eventUrl: ["http://sisycomgps.com/webhook/demo.php"]
        }
      ]

      nexmo.calls.create(
        {
          to: [
            {
              type: 'phone', 
              number: '521'+telephone // Jesús 3331716223  Luna  3312074416  JC 3310407830
            }
          ],
          from: { 
            type: 'phone', 
            number: '12017780477',
            name: 'SisycomGPS'
          },
          ncco,
        },
        (err, result) => {
          if (err) {
            console.log(err)
            console.log('Problemas al realizar la llamada. Info: ', JSON.stringify(req.body))
            res.json({ estatus: 500, msg: 'Problemas al realizar la llamada, por favor vuelva a intentarlo' })
          } else {
            console.log('Llamada realizada correctamente. Info: ', JSON.stringify(req.body))
            res.json({ estatus: 200, msg: 'Llamada realizada correctamente.', uuid: result.uuid })
          }
          console.log('Prints err or result')
          console.log(err || result)
        }
      )
      console.log(req.body)

    }
  }
)

module.exports = router