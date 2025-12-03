import bcrypt from 'bcrypt'

;(async () => {
  const hash = await bcrypt.hash('test', 10)
  console.log('Hash:', hash)
})()
