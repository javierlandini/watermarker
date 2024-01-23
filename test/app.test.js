const { exec } = require('child_process')
const path = require('path')

xtest('Generate watermarked file', (done) => {
  const scriptPath = path.resolve(__dirname, '../bin/cli.js')
  const bookPath = 'test_book.pdf'
  const watermarkCopy = 'test_watermark'
  exec('node ' + scriptPath + ' --book=' + bookPath + ' --watermark=' + watermarkCopy, (error, stdout, stderr) => {
    if (error) {
      console.error(`error:\n${error.message}`)
      done(error)
    }
    if (stderr) {
      console.error(`stderr:\n${stderr}`)
      done(stderr)
    }
    try {
      console.log(`stdout:\n${stdout}`)
      expect(stdout).toMatch('File generated successfully')
      done()
    } catch (error) {
      done(error)
    }
  })
})
