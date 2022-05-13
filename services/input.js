const readLine = require('readline-sync')
const state = require('./state.js')
async function InputService() {
    const content = {}
    content.searchTerm = askAndReturnSearchTerm()
    state.save(content)
    function askAndReturnSearchTerm() {
        return readLine.question('Digite o termo da pesquisa: ') 
    }
}


module.exports = InputService;