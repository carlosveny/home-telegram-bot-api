const express = require('express')
const TelegramBot = require('node-telegram-bot-api')

const CONFIG = require('../configs/config-bot.json');
const NOTIFICATIONS = require('../configs/notifications.json');

const APP = express()
const PORT = 3001
const BOT = new TelegramBot(CONFIG.token, { polling: true })

APP.use(express.json())

APP.listen(PORT, () => {
  console.log(`home-telegram-bot-api listening on port ${PORT}`)
})

APP.post('/sendNotification', (req, res) => {
  const body = req.body
  let notificationToSend = NOTIFICATIONS
    ?.find(notification => notification.id === body?.id)?.actions?.[body?.action]
  if (notificationToSend) {
    notificationToSend = `${req.hostname === 'localhost' ? 'TEST: ' : ''}${notificationToSend}`
    BOT.sendMessage(CONFIG.chatId, notificationToSend)
      .then(_ => res.status(200).json({ message: "success", notificationSended: notificationToSend }))
      .catch(error => res.status(400).json({ message: error?.message }))
  } else {
    res.status(400).json({ message: "Notification not found in JSON" })
  }
})
