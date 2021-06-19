/**
 * 
 * @param {string: HTML Tag} HTMLTag 
 * @param {Template Literal} innerText 
 * @param {Array} ArrClassesToAdd 
 * @param {string: querySelector} HtmlNodeSelector 
 * @param {string: 'afterend', 'afterbegin', 'beforeend', 'beforebegin'} positionToInsert 
 */
function createHtmlContent(HTMLTag, innerText, ArrClassesToAdd, HtmlNodeSelector, positionToInsert){
    let htmlTagCreated = document.createElement(`${HTMLTag}`)
    htmlTagCreated.innerText = `${innerText}`
    ArrClassesToAdd.forEach(element => {htmlTagCreated.classList.add(`${element}`)})
    
    let htmlNode = document.querySelector(`${HtmlNodeSelector}`)

    htmlNode.insertAdjacentElement(`${positionToInsert}`, htmlTagCreated)
}