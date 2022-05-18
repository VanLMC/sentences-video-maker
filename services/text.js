
import axios from 'axios'
import cheerio from 'cheerio'
import Browser from 'zombie';
const url = 'https://www.pensador.com/';
import state from './state.js'

async function textService() {

    const content = state.load()

    // await getQuotes(content)
    await getQuotesZombie(content)
    // await addIntroAndOutro(content)
    
    async function getQuotes(content){
        const parsedSearchTerm = content.searchTerm.replace(/\s/g, '_')
        const {data} = await axios.get(`${url}${parsedSearchTerm}`);
        const quotes = [];
        const $ = cheerio.load(data);


        $('#phrasesList .thought-card').each((i, element) => {
            const text = $(element).find('.frase').text().replace('\n', '');
            const autor = $(element).find('.autor>a').text();
            if(text.length > 1000) return
            quotes.push({text: text, author: autor})
        });


        const sortedQuotes = quotes.sort(function(a, b){
            return a.text.length - b.text.length;
          });

        content.quotes = sortedQuotes
        state.save(content)
    }

    async function getQuotesZombie(content){
      
    // https://stackoverflow.com/questions/33954232/how-can-i-do-a-loop-using-promises-with-nodejs-and-zombie-js
    
        let browser = new Browser();
        console.log(content.searchTerm);
        const parsedSearchTerm = content.searchTerm.replace(/\s/g, '_')
        const mountedUrl = `${url}${parsedSearchTerm}`
        browser.visit(mountedUrl).then(() => {
            console.log(`Visited ${mountedUrl}..`);
            var result = browser.queryAll('#phrasesList .thought-card');
            var cellTextArray = result.map(r => 
                    // console.log(r.query('.frase').textContent.trim())
                     console.log(r)
                )
            // .filter(text => text && (text || '').length > 3);

            console.log(result);
        }).catch(error => {
            console.error(`Error occurred visiting ${mountedUrl}`);
        });
    }

    async function addIntroAndOutro(content){
        const intro = `${content.quotes.length} frases de ${content.searchTerm}` 
        const outro = `Se você gostou do vídeo, deixe um joinha. Inscreva-se e ative o sininho.` 
        content.quotes.unshift({text: intro, author: ''})
        content.quotes.push({text: outro, author: ''})
        state.save(content)
    }

    
}




export default textService;