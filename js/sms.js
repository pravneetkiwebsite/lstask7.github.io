let selector = e => document.querySelector(e) 
let selectorAll = e => document.querySelectorAll(e) 
let createElement = e => document.createElement(e) 

let numbers = selector("#numbers") ,
numberInput = selector("#mobiles") , 
message = selector("#message") ,
textCount = selector("#textCount") 

lists = ""
numbers.addEventListener("blur" , e => {
    console.log(numbers.value) 
    lists += numbers.value 
})
console.log("hello")

numberInput.addEventListener("focus" , e => {
    if(numbers.value){
        numberInput.value = numbers.value
    }
}) 

let totalChar = 160
message.addEventListener("input" , e => {  
    // console.log(message.textContent)
    // console.log(message.textContent.trim().length) 
    messageLength = message.textContent.trim().length
    textCount.textContent = totalChar - messageLength 
    if (messageLength === 160){
        //console.log(message.textContent.trim().length) 
        e.target.addEventListener("keypress" , f => {
            f.preventDefault()
        })
        let numbers = numberInput.value.replace("/\s+/g" , "").split(",")
        let data = {
            numbers : numbers , 
            message : message.textContent.trim()
        } 
        console.log(data)
        
    }
}) 
