
import axios from 'axios'
import cheerio from 'cheerio'
const url = 'https://www.pensador.com/';
import state from './state.js'

async function textService() {

    const content = state.load()

    await getQuotes(content)
    await addIntroAndOutro(content)
    
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

    async function addIntroAndOutro(content){
        const intro = `${content.quotes.length} frases de ${content.searchTerm}` 
        const outro = `Se você gostou do vídeo, deixe um joinha. Inscreva-se e ative o sininho.` 
        content.quotes.unshift({text: intro, author: ''})
        content.quotes.push({text: outro, author: ''})
        state.save(content)
    }


    
}




export default textService;