//selecting the elaments 

let Not_area = document.querySelector(".note-area")
let title = document.querySelector(".title")
let noteText = document.querySelector(".note-text")
let Notes = document.querySelector("#notes")
let Note = document.querySelector(".note")






//create  ShowNotArea function
const ShowNotArea = () => {
    // console.log("Hi")
    // textarea  soomuuji
    noteText.style = "display:block"
    Not_area.classList.add("note-now")
    title.setAttribute("placeholder", "Title")
    title.style = "font-size:20px"
}


//event not-Area

Not_area.addEventListener("click", ShowNotArea)


//  event all the document  to hide (NOTE-AREA)


// HideNotArea function
const HideNotArea = () => {
    noteText.style = "display:none"
    Not_area.classList.remove("note-now")
}




///create addnot function

const AddNot = (Title, Note) => { //input and textarea
    Notes.innerHTML += `

        <div class="note">
                <h3 class="title-text" id="title-text">${Title}</h3>
                <p class="note-blog">${Note} </p>
                
                <i class="fa fa-trash"></i>

            </div>
    
    `
        // waxii horay lasoogaliyay kasaar
    title.value = "";
    noteText.value = "";

}


//Local storage  functions
//xogtaan gee localstorage

const addtolocalstorage = (note) => {

    if (note.length < 0) {

        return

    }
    console.log(note)

    let oldNote; // waxaan kujegaren donaa in localStorage wax lagasooceliyay iyo in kala
    //hadaan wax lagasoocelin
    if (localStorage.getItem("notes") === null) { //000000000

        oldNote = []

        //hadii wax lagasoceliyo 
    } else { oldNote = JSON.parse(localStorage.getItem("notes")) }

    //local storage waxaa kasooqaada key notes haduu jiro

    oldNote.push(note) // note==note ka cusub


    //localstorage ka dib oogu celi

    localStorage.setItem("notes", JSON.stringify(oldNote))
    console.log(oldNote)







}

////Local storage  functions
//Read from local storage
const GetNotFromLocalStorage = () => {

        let oldNote;
        if (localStorage.getItem("notes") === null) { //local ka wax ba kamasoolaban

            oldNote = []
        } else { oldNote = JSON.parse(localStorage.getItem("notes")) } //local ka wax makasoolabteen


        //sooqabo data walboo local ka taalo kunasoobandhig  document
        oldNote.forEach(note => {

            Notes.innerHTML += `

        <div class="note">
                <h3 class="title-text" id="title-text">${note[0]}</h3>
                <p class="note-blog">${note[1]} </p>
                
                <i class="fa fa-trash"></i>

            </div>
    
    `

            console.log(note);

            //display in the notbox
        })
    }
    //Delel From Local Storage
const deletFromLocalStorage = (deleNote) => {

    let oldNote;
    if (localStorage.getItem("notes") === null) { //local ka wax ba kamasoolaban

        oldNote = []
    } else { oldNote = JSON.parse(localStorage.getItem("notes")) } //local ka wax makasoolabteen

    //wax kastoo localstorage kujiro sooqabo
    oldNote.map((note, index) => {
        console.log(note, index);

        if (note[0] == deleNote.children[0].textContent.trim() && note[1] == deleNote.children[1].textContent.trim()) {
            // console.log(note, index)

            //kasaar localstorage
            oldNote.splice(index, 1)
            return oldNote
        }

    })

    //markaad wax kasaarto local ka kuceli hadana
    localStorage.setItem("notes", JSON.stringify(oldNote))
}

//Page refresh

document.addEventListener("DOMContentLoaded", GetNotFromLocalStorage)






document.addEventListener("click", (event) => {
    // console.log("Yes it has success")
    let sclicked = Not_area.contains(event.target); // booska click lasiiyay note area mayahay
    if (!sclicked) { //haduu truuu aheen
        HideNotArea()

        // qofka inuusan note ka wax 0  kusoodarin asagoon wax galinin 00
        if (title.value.length === 0 && noteText.value.length == 0) {
            // alert("you have forget to write somthing")
            return;

        } else {

            //local storage
            addtolocalstorage([title.value, noteText.value])
                //add note box
            AddNot(title.value, noteText.value)






        }
    }

})












// show and hide delet icon
//5/9/23
//add delet icon
document.addEventListener("mouseover", (Event) => {
    if (Event.target.classList.contains("note")) {
        Event.target.querySelector("i").classList.add("show") //note (i) kujirto soqobo
    }


})

//remove delet icon

document.addEventListener("mouseout", (Event) => {
    if (Event.target.classList.contains("note")) {
        Event.target.querySelector("i").classList.remove("show") //note (i) kujirto soqobo

    }


})






//working delet icon

document.addEventListener("click", (Event) => {

    if (Event.target.classList.contains("fa-trash")) {
        Event.target.parentElement.remove()
            //note (i) kujirto soqobo

        //REmoe data from Local storage

        deletFromLocalStorage(Event.target.parentElement)
    }


})