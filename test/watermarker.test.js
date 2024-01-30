const Watermarker = require('../lib/watermarker')
const path = require('path')
const fs = require('fs')
let printedFile = ''

test('Initialize with text to print', () => {
  const watermark = 'test watermark'
  const watermarker = new Watermarker(watermark)
  expect(watermarker.watermark).toBe(watermark)
})

test('Print file', async () => {
  const watermark = 'test watermark'
  const watermarker = new Watermarker(watermark)
  const bookPath = path.resolve(__dirname, './data/book.pdf')
  printedFile = await watermarker.print(bookPath)
  expect(fs.existsSync(printedFile)).toBeTruthy()
})

afterAll(() => {
  return fs.existsSync(printedFile) ? fs.unlinkSync(printedFile) : false
})
