/**
 ** Project : Bigjara Interface Library
 ** Author  : Adeleke Bright 
 ** Description :  This library is built to allow easy and fast product development 
**/
const AIL = {} 
AIL.selector = e => document.querySelector(e)
AIL.selectAll = e => Array.from(document.querySelectorAll(e))

AIL.toggle = (function(target , content , errorHandler  , ...icons) {
    try { 
        let triggers = AIL.selectAll(target) 
        let toggleAbleContents = AIL.selectAll(content)
        if (triggers.length < 1) throw new Error("The element is not available") 
        triggers.map((trigger , i) => {
            trigger.addEventListener("click" , e => { 
                e.preventDefault()
                let currentIcons = trigger.classList
                let realContent = toggleAbleContents[i].classList
                toggleAbleContents.filter((e , j) => j !== i)
                   .map(toggleable =>  {
                       toggleable.classList.remove("active")
                })
                realContent.toggle("active")
                if (icons.length > 0 && currentIcons.contains("fa")){
                   currentIcons.toggle("fa-plus")
                   currentIcons.toggle("fa-minus")
                }
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".tabber" , ".tab-content" , console.error , "fa fa-chevron-down") 


var Mobile = /** @class */ (function () {
    function Mobile(element) {
        this.element = element;
    }
    Mobile.prototype.toggle = function (event) {
        var target = event.target.classList;
        if (target.contains("toggler-icon")) {
            Mobile.root.classList.toggle("mobile-hide");
            target.toggle("fa-bars")
            target.toggle("fa-close")
        }
    };
    Mobile.prototype.addEventListener = function (type, e) {
        return addEventListener(type, e);
    };
    Mobile.root = document.querySelector(".mobile-nav");
    
    return Mobile;
}());

var mobileNav = new Mobile(".mobile-toggle");
mobileNav.addEventListener("click", function (event) {
    mobileNav.toggle(event);
});
AIL.modal = (function(target , content , closer ,  errorHandler ){
    try {
        let triggers = AIL.selectAll(target) 
        let contents = AIL.selectAll(content)
        let closers  = AIL.selectAll(closer)
        if (triggers.length < 1) throw new Error("The element is not available")
        triggers.map((trigger , i) => {
            trigger.addEventListener("click" , e => { 
                let currentContent = contents[i]
                currentContent.style.display = "block"
                
                let modalContent = currentContent.firstElementChild
                let contentWidth = Number(modalContent.getAttribute("data-modal-content-width"))
                let distanceFromTop = Number(modalContent.getAttribute("data-modal-content-distance-from-top"))
                modalContent.style.cssText += `;width:${contentWidth}%;margin:${distanceFromTop}% auto`
                closers[i].addEventListener("click" , e => {
                    currentContent.style.display = "none"
                })
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".modal-trigger" , ".modal" , ".close" ,  console.error) 

/**
 * The tab method handles revealing and hinding of contents to free up space
 */
AIL.tab = (function(targets , contents , errorHandler){
    try { 
        let tabs = AIL.selectAll(contents) 
        if (tabs.length === 0) throw new Error("No content to use as tab")
        let revealers = AIL.selectAll(targets) 
        revealers.map((reveal , i) => {
            reveal.addEventListener("click" , e=> { 
              e.preventDefault()
              let {target} = e
              tabs.filter((e , j) => j !== i).map(tab => tab.classList.remove("active-content")) 
              revealers.filter((e , j) => j !== i).map(reveal => reveal.classList.remove("active-link")) 
              if (!tabs[i].classList.contains("active-content")){
                 tabs[i].classList.add("active-content") 
                 target.classList.add("active-link")
              }
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".tab-reveal" , ".tab" , console.error) 


let mobileToggler = document.querySelector("#mobile-toggler")
if (mobileToggler) {
    let mobileNavigations = document.querySelector(".mobile-navigations") 
    mobileToggler.addEventListener("click" , event => {
        let {target} = event 
        if (target.id === "mobile-toggler"){
            mobileNavigations.classList.toggle("d-nothing") 
            //mobileNavigations.classList.toggle("st") 
            mobileNavigations.classList.toggle("out-of-view")
            target.classList.toggle("change-toggle")
        }
    }) 
}      

let mobileToggled = document.querySelector("#mobile-toggled")
if (mobileToggled) {
    let mobileNavigations = document.querySelector(".s") 
    mobileToggled.addEventListener("click" , event => {
        let {target} = event 
        if (target.id === "mobile-toggled"){
            mobileNavigations.classList.toggle("st") 
            
            target.classList.toggle("change-toggle")
        }
    })
}  

//This is for handling submission of contacts
let submitMessageButton = AIL.selector("#submitMessage") 
if (submitMessageButton){
    submitMessageButton.addEventListener("click" , e => {
        e.preventDefault()  
        let {parentNode}  = e.target 
        parentNode.style.cssText = `;position:relative` 
        let alert = document.createElement("div")  
        let alertMessage = text => {
            let theMessage = 
            `
            <span class="close" id="closer">*</span>
            <div>
               ${text}
            </div>
            ` 
             return theMessage
        }
       
        
        alert.setAttribute("class" , "bg-white shadow w-100") 
        alert.style.cssText = `;position:absolute;top:0;left:0;width:100%;height:100%;font-size:1.4rem;padding:2rem`
        let contactData = AIL.selectAll(".contact")  
        let data = {}
        contactData.map((field , i) => { 
            let {id , value} = field
            data[`${id}`] = value.trim() 
        }) 
        if (contactData.every(field => field.value !== "")){
            console.log(data)  
            fetch("/contact-us" , {
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json'
                } , 
		        body : JSON.stringify(data)
            })
            .then(res => res.json()) 
            .then(res => console.log(res)) 
            .catch(err => console.error(err))
            contactData.map(field => field.value = "") 
            alert.innerHTML = alertMessage("Thank you for contacting us. We will get back to you shortly")
            parentNode.append(alert)
        }else {
            console.log("Provide real values") 
            alert.innerHTML = alertMessage("Fill the contact form correctly")
            parentNode.append(alert)
        } 
        let closer  =  AIL.selector("#closer")  
        closer.addEventListener("click" , e => {
            alert.style.cssText = `;display :none`  
            history.go()
        }) 
       
    })
} 

//Handling Clicking of the close button 
AIL.close = (function(targets){   
   
    try {
        let closers = AIL.selectAll(targets) 
        if (closers){
            closers.map((button , i) => { 
                button.addEventListener("click" , e => {
                    e.target.parentNode.style.display ="none"
                })
            }) 
        }else {
            throw new Error("No closing Button added")
        }
    }catch(error){
        return error
    }
})(".close")