/**
 * 
 * @param {String} HTMLTag 
 * @param {String} innerText 
 * @param {Array} ArrClassesToAdd 
 * @param {String} HtmlNodeSelector 
 * @param {String} positionToInsert 
 */
function createHtmlContent(HTMLTag, innerText, ArrClassesToAdd, HtmlNodeSelector, positionToInsert){
    let htmlTagCreated = document.createElement(`${HTMLTag}`)
    htmlTagCreated.innerText = `${innerText}`
    ArrClassesToAdd.forEach(element => {htmlTagCreated.classList.add(`${element}`)})
    
    let htmlNode = document.querySelector(`${HtmlNodeSelector}`)

    htmlNode.insertAdjacentElement(`${positionToInsert}`, htmlTagCreated)
}