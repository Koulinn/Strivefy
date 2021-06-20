let topBar = document.getElementById('topBar')
let mainContent = document.querySelector('#homeMainContent')

window.addEventListener('scroll', function(){

    if(window.pageYOffset < 70){
        topBar.classList.remove('gradientBG')
    }
    if(topBar.classList.contains('gradientBG') && window.pageYOffset > 100){
        return
    }
    if(window.pageYOffset > 70){
        topBar.classList.add('gradientBG')
    }
}

)
