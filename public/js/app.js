console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne=document.querySelector("#messageOne")
const messageTwo=document.querySelector("#messageTwo")
weatherForm.addEventListener('submit',(e)=>{ //e is event object 
    e.preventDefault() //method prevents default behaviour i.e is to refresh the browser

    const location= search.value
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
        messageOne.innerHTML=data.error
        }
        else{
            messageOne.innerHTML=data.location//or textContent instead of .innerHTML
            messageTwo.innerHTML=data.forecast
        }
    
    })
})
})