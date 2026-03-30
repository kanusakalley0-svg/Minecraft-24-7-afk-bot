const mineflayer = require('mineflayer')

const HOST = 'pastamc.aternos.me' // example: yourserver.aternos.me
const USERNAME = 'RICHAFK_BOT'

function createBot() {
  console.log("🔄 Starting bot...")

  const bot = mineflayer.createBot({
    host: HOST,
    username: USERNAME,
    version: false // auto detect
  })

  bot.on('login', () => {
    console.log('✅ Bot joined server')
  })

  bot.on('spawn', () => {
    console.log('📍 Spawned - AFK mode ON')

    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      console.log("🤖 Anti-AFK")
    }, 20000)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Kicked:', reason)
  })

  bot.on('error', (err) => {
    console.log('❌ Error:', err.message)
  })

  bot.on('end', () => {
    console.log('🔁 Reconnecting in 10 sec...')
    setTimeout(createBot, 10000)
  })
}

createBot()
