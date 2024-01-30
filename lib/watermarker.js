const { PDFDocument, rgb, StandardFonts } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

class Watermarker {
  watermark
  #outputDir
  constructor (watermark) {
    this.watermark = watermark
    this.#outputDir = path.resolve(__dirname, '../output')
  }

  async print (bookPath) {
    const existingPdfBytes = fs.readFileSync(bookPath)
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Get the pages of the document
    const pages = pdfDoc.getPages()
    for (const page of pages) {
      // Draw a string of text at the bottom of the page
      page.drawText(this.watermark, {
        x: 70,
        y: 40,
        size: 20,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1)
      })
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()
    const printedBookPath = this.#outputDir + '/printed_book.pdf'
    try {
      fs.writeFileSync(printedBookPath, pdfBytes)
      return printedBookPath
    } catch (error) {
      console.log(error)
    }
    return false
  }
}

module.exports = Watermarker
