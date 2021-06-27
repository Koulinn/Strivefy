let tableHeader = document.querySelector('#tableHeader')


window.addEventListener('scroll', function(){

    if(window.pageYOffset < 350){
        console.log('inside offset', window.pageYOffset)
        tableHeader.classList.remove('gradientBG')
    }
    if(tableHeader.offsetTop > 490){
        tableHeader.classList.add('gradientBG')
    }
    if(tableHeader.classList.contains('gradientBG') && tableHeader.offsetTop > 490){
        return
    }
}

)
