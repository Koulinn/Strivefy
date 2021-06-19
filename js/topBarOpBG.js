let topBar = document.getElementById('topNav-Bar-Album')
let mainContent = document.querySelector('#homeMainContent')

document.addEventListener('scroll', function(){
    if(window.scrollY > 100){
        return
    }

    if(window.scrollY > 30){
        topBar.classList.add('topNavOpacityChange')
    }

    if(window.scrollY < 50){
        topBar.classList.remove('topNavOpacityChange')
    }

})