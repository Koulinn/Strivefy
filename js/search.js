
async function getSearchValue(e){
    e.preventDefault()
    let userInput = e.target.value
    await sendRequestToApi(dataFromSearch, userInput)
    let sections = document.querySelectorAll('section')
    sections.forEach(section => section.remove())
    generateSections('Show_Results', 0, 7)    

}


