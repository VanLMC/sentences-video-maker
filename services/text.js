
const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.pensador.com/';
const state = require('./state.js')

async function textService() {

    //Tratar para nao colocar no video quotes muito longas
    const content = state.load()
    content.quotes = await getQuotes(content)
    state.save(content)
    async function getQuotes(content){

        const parsedSearchTerm = content.searchTerm.replace(/\s/g, '_')
        const {data} = await axios.get(`${url}${parsedSearchTerm}`);
        const quotes = [];
        const $ = cheerio.load(data);
    
        $('#phrasesList .thought-card').each((i, element) => {
            const quote = $(element).find('.frase').text().replace('\n', '');
            if(quote.length > 1000) return
            quotes.push(quote)
        });

        return quotes;
    }


    
}




module.exports = textService;