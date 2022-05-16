import gm from "gm"
import path from 'path'
import state from './state.js'

const im = gm.subClass({ imageMagick: true })
const __dirname = path.resolve();
async function imagesService() {
    const content = state.load()
    const quotesLength = content.quotes.length;
    await createAllSentenceImages(content)

    async function createAllSentenceImages(content){


        for (let quoteIndex = 0; quoteIndex < content.quotes.length; quoteIndex++) {
            await createSentenceImage(quoteIndex, content.quotes[quoteIndex])
          }
    } 

    async function createSentenceImage(quoteIndex, quote) {
        return new Promise((resolve, reject) => {
          const outputFile = path.join(__dirname, 'content', 'images', `${quoteIndex}-sentence.png`)
    
          const text = quoteIndex === 0 || quoteIndex === quotesLength ? quote.text : `"${quote.text}"`
          const author = quote.author ? ' - ' + quote.author: ''

          const parsedSentence = `${text}${author}`
          im()
            .out('-size','1280x500')
            .out('-gravity', 'center')
            .out('-background', 'black')
            .out('-fill', 'white')
            .out('-kerning', '-1')
            .font('Arial', 50) 
            .in('-weight', '900')
            .out(`caption:${parsedSentence}`)
            .write(outputFile, (error) => {
              if (error) {
                return reject(error)
              }
    
              console.log(`Sentence created: ${outputFile}`)
              resolve()
            })
        })
    }


}


export default imagesService;