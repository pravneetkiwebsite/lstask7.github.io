

/**
 * @description 
 * validateResidence checks to ensure that the user provides a valid residential name
 * @param {String} val string whose value will be check for a match
 */
const validateResidence = (val) => {
    let residencePattern = /^([a-zA-Z]+(\s+)?)+$/ 
    try { 
        if ( String(val).match(residencePattern)) {
            return { 
                name : "Matched" , 
                value : val.trim() 
            } 
        }else {
            throw {
                name : "Please provide a valid email" , 
                value : null 
            }
        }
    }catch(err) {
        return {
            name : err.name , 
            value : err.value 
        }
    }
} 

/**
 * @description 
 * validateSocialUrl checks if a value is the specified url
 * @param {String} val string whose value will be check for a match
 */
const validateSocialUrl = (val) => {
    let urlPattern = /^((https:\/\/)([a-zA-Z0-9]+(\s+)?))+$/ 
    try { 
        if ( String(val).match(urlPattern)) {
            return { 
                name : "Matched" , 
                value : val.trim() 
            } 
        }else {
            throw {
                name : "Please provide a valid email" , 
                value : null 
            }
        }
    }catch(err) {
        return {
            name : err.name , 
            value : err.value 
        }
    }
} 

const validateMobile = (val) => { 
    const firstPattern = /^[0]{1}[8]{1}[0|1]{1}[0-9]{8}$/  
	const secondPattern = /^[0]{1}[7 | 9]{1}[0]{1}[0-9]{8}$/ 
	try {
		if ( String(val).match(firstPattern) || String(val).match(secondPattern)) {
	        return {
		        name : "Matched" , 
		        value : val.trim() 
	        } 
		}else {
			throw {
				name : "Please provide a valid name" , 
				value : null 
			}
		}
	}catch(err) {
		return {
			name : err.name , 
			value : err.value 
		}
	}
}

/**
 * @description 
 * validation is a helper function for dynamically checking if 
 * input matchces the specified format
 * @param {Function} fn a pattern checking function
 * @param {DOM Object} targetObject the target element
 * @param {Object} styles an object of styles specified in CSS
 * @param {String} text message displayed on error
 */
const validation = (fn , targetObject, styles , text ) => { 
    let {value , classList ,  parentNode} = targetObject 
    let {error ,  success} = styles
    if (fn(value).value !== null){
        classList.contains(error) ? classList.remove(error) : null  
        classList.add(success) 
        if (parentNode.nextElementSibling.tagName === "P") parentNode.nextElementSibling.remove() 
    }else {
        if (parentNode.nextElementSibling.tagName === "P") parentNode.nextElementSibling.remove()
        let msg = document.createElement("p") 
        msg.className = "label" 
        let brother = parentNode.nextElementSibling 
        msg.textContent = text 
        classList.contains(success) ? classList.remove(success) : null  
        classList.add(error) 
        parentNode.parentNode.insertBefore(msg , brother)
    } 
} 

/**
 * @description 
 * User is a template for holding user information 
 */

class User {
    constructor(name , email){
        this.userInformation = {
            name : name ,
            email : email
        } 
    } 
    addDetail(detail){
        this.userInformation.detail = detail
    } 
    editDetail = detail => {} 
    removeInfo = info => {} 
    printInfo  = info => {}
}

/**
 * @description 
 * AppView initializes the view of our application
 */
class AppView {
    constructor(input){
        this.inputs = Array.from(document.querySelectorAll(input)) 
        this.wordCount = document.querySelector("#textCount")
    }
    
} 

/**
 * @description 
 * ProfileManager is the template for creating profiles
 */
class ProfileManager{
    constructor(name , email , view){
        this.view = new view(".a-p") 
        this.addEvent() 
    }
    handleChangeImage(event) { 
        let target = event.target
        if (target.id === "avatar"){
            // Grab the uplodaded file  
            let files = target.files[0]  
            let acceptedFormat = ["image/jpeg" , "image/jpg" , "image/png" , "image/gif"] 
            let divisor = 1024*1024
            let size = Number(files.size)/divisor
            let fileType = files.type 
            console.log(fileType)
            if (acceptedFormat.includes(fileType)  && size  < 10) { 
                // Read the uploaded file using the FileReader API 
                let reader = new FileReader() 
                reader.onload = function(event) {
                    let img = new Image() 
                    img.onload = function() { 
                        let imgHolder = document.createElement("div")  
                        imgHolder.append(img) 
                        imgHolder.style.cssText = `;margin-bottom:1.5rem;`
                       target.parentNode.replaceChild(imgHolder , target.previousElementSibling)
                    }
                    img.src = event.target.result 
                    img.style.cssText = `;width:100px;height:100px;display:block;boder-radius:50%`
                }
                reader.onerror = function(event) {
                   target.previousElementSibling.textContent = "An error just occured"
                }
                reader.readAsDataURL(files) 
            }else{
                event.preventDefault() 
                target.previousElementSibling.textContent = "File size too large or not supported."
                event.target.value = null
            }
        } 
    } 
    handleClick(e){ 
        let {target} = e 
        let {parentNode} = target
       
        let workFields = Array.from(document.querySelectorAll(".data-experience")) 
        try {
           switch(target.id) { 
               
                case "check-work" : 
                    e.preventDefault() 
                    target.parentNode.remove()
                    break ; 
                case "submit-experience" : 
                    e.preventDefault() 
                    //Select all input fields related to work 
                    let workExperience = {} //This will hold work related information 
                    console.log(workFields)
                    if (workFields.every(field => field.value !== "")){ //Verify that every work information is provided
                        
                        workFields.map(field => { 
                            let {id , value} = field 
                            field.value = value
                            workExperience[`${id}`] = value
                        })
                        console.log(workExperience) 
                        if (parentNode.nextElementSibling) parentNode.nextElementSibling.remove()
                        //Save the user work experience to local storage 
                        //Create a new element within the dom to show localStorage related text 
                        let msg
                        if (!parentNode.nextElementSibling){
                            msg = document.createElement("p") 
                            msg.textContent = "Saving your content...." 
                            msg.setAttribute("class" , "red-text") 
                            parentNode.parentNode.append(msg)
                        }else {
                            msg = parentNode.nextElementSibling
                        }
                        if (window.localStorage){ 
                           
                            if (localStorage.user){
                                let experience = JSON.parse(localStorage.user).experience 
                                experience.push(workExperience)
                                localStorage.user = JSON.stringify({experience : experience}) 
                                return localStorage.response
                            }else { 
                                let experience = [workExperience]
                                localStorage.user = JSON.stringify({experience : experience}) 
                                return localStorage.user
                            }
                        }else{
                            msg.textContent = "Local Storage not supported"
                        }
                    }else {
                        if (!parentNode.nextElementSibling){
                            let errorMsg = document.createElement("p") 
                            errorMsg.textContent = "Fill your work information correctly" 
                            errorMsg.setAttribute("class" , "red-text") 
                            parentNode.parentNode.append(errorMsg)
                        }
                    }
                    break;
                case "reset-experience" : 
                    e.preventDefault() 
                    workFields.map(field => field.value = null) 
                    //history.go()
                default :
                    throw new Error()
           }
        }catch(error){
            return false
        }
    }
    handleLoad(){
        window.addEventListener("load" , e =>  {
            if (window.localStorage && localStorage.user){
                delete localStorage.user
            }
        })
    }
    handleBlur(e) {
        let target = e.target 
        let parent = target.parentNode 
        let value  = target.value 
        let nextSibling = target.nextElementSibling 
        let classList = target.classList
        let styles = {
            success : "border-good-color"  , 
            error    : "border-error-color"  , 
            moderate : "border-moderate-color"  , 
        }
        try { 
            switch(target.id){
                case "residence" :
                    validation(validateResidence , target, styles , "Wrong residence")
                    break;
               
                case "mobile" : 
                   validation(validateMobile, target , styles , "Please , provide a valid phone number")
                   break;
                case "linkedin" : 
                    let {error ,  success} = styles
                    if (target.value.match(/^(https:)\/\/(linkedin\.com\/in\/)([a-zA-Z0-9]+(\s+)?)+/)){
                        
                        classList.contains(error) ? classList.remove(error) : null  
                        classList.add(success) 
                    }else {
                        if (!nextSibling) {
                            let msg = document.createElement("p") 
                            msg.className = "label" 
                            msg.textContent =  "Enter a valid linkedin profile"
                            classList.contains(success) ? classList.remove(success) : null  
                            classList.add(error) 
                            parent.append(msg)
                        }else {
                            nextSibling.textContent = "Enter a valid linkedin profile"
                        }
                    }
                   break;
                default : 
                  throw new Error() 
            }
            
        }catch(error){
            const errorConfig = {
                name : error.name ,
                msg  : error.message
            }
            console.error(errorConfig)
        }
    } 
    handleInput(e){ 
        let characterSize = 160
        let target = e.target 
     
        let sibling = target.previousElementSibling
        let styles = {
            success : "border-good-color"  , 
            error    : "border-error-color"  , 
            moderate : "border-moderate-color"  , 
        }
        try { 
            if (target.id === "message"){
               let  messageLength = target.textContent.trim().length 
                document.querySelector("#textCount").textContent = characterSize - messageLength 
                if (messageLength === 160){
                   target.addEventListener("keypress" , f => f.preventDefault())
                }
            }
        }catch(error){
            return false
        }
    }
    addEvent(){
        this.view.inputs.map(input => {
            input.addEventListener("change" , this.handleChangeImage) 
            input.addEventListener("blur" , this.handleBlur) 
            input.addEventListener("input" , this.handleInput) 
            input.addEventListener("click" , this.handleClick)
        })
        this.handleLoad()
    }
}
new ProfileManager("Adeleke Bright" , "adetight@gmail.com" , AppView) 
