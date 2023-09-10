if( window.innerWidth <= 600 ){
    document.querySelector('.img-desktop').classList.add('hide');
    document.querySelector('.img-mobile').classList.remove('hide');
} else {
    document.querySelector('.img-mobile').classList.add('hide');
    document.querySelector('.img-desktop').classList.remove('hide');
} 

const api_url = 'https://api.adviceslip.com/advice';
const usedAdviceId = [];

async function getquote(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    const advice = data.slip.advice;
    const id = data.slip.id;
    
    if (!usedAdviceId.includes(id)) {
        document.querySelector('.id').innerHTML = id;
        document.querySelector('.quote').innerHTML = `"${advice}"`;
        
        usedAdviceId.push(id);

        localStorage.setItem('id', id);
        localStorage.setItem('advice', advice);
    } else {
        getquote(api_url);
    }
}

if (performance.getEntriesByType("navigation")[0].type === "reload") {
    const storedAdvice = localStorage.getItem('advice');
    const storedId = localStorage.getItem('id');

    if (storedAdvice && storedId) {
        document.querySelector('.id').innerHTML = storedId;
        document.querySelector('.quote').innerHTML = `"${storedAdvice}"`;
    } else {
        getquote(api_url);
    }
} else {
    getquote(api_url);
}
document.querySelector('.generate-btn').addEventListener('click', () => {
    getquote(api_url)
})
