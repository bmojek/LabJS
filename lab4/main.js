let maxId=0; 
let selected = []
showNotes();

function addNote(){
    const note = document.querySelector("#addNote")
    const title = note.querySelector("#title") 
    const content = note.querySelector("#content") 
    const color = note.querySelector("#color") 
    Object.values({...localStorage}).map((x)=>{
        const {id} = JSON.parse(x)
        if(!isNaN(id)) maxId = id
    })
    const id = maxId + 1
   
    if(title.value == ""){
        alert("Dodaj tytuł")
    }else{
        localStorage.setItem(
            id,
            JSON.stringify({
                id,
                title: title.value,
                content: content.value,
                color: color.value,
                date: new Date().toLocaleString()
            })
        )
        showNotes();
    }

    title.value =""
    content.value = ""  
    color.value = "#444444"
}
localStorage.setItem("pinned",JSON.stringify(selected))
function showNotes(){
    
    const notes = Object.values({...localStorage}).map((x) => {
        const { id, title, content, color, date} = JSON.parse(x)
        if(!isNaN(id) && id!=null){
            if((localStorage.getItem("pinned").includes(id))){
            return(`<div class="notes" style="background: ${color}">
            <input type="checkbox" value="${id}" class="pinBox" onclick="pinNote()">
            <button onClick="removeNote(${id})">Usuń</button>
            <button onClick="editNote(${id})">Edytuj</button>
            <h3>${title}</h3>
            <p>${content}</p>
            <p>${date}</p>    
            </div>`)
            } 
        }
        
    })
    const notez = Object.values({...localStorage}).map((x) => {
        const { id, title, content, color, date} = JSON.parse(x)
        if(!isNaN(id) && id!=null){
            if(!(localStorage.getItem("pinned").includes(id))){
            return(`<div class="notes" style="background: ${color}">
            <input type="checkbox" value="${id}" class="pinBox" onclick="pinNote()">
            <button onClick="removeNote(${id})">Usuń</button>
            <button onClick="editNote(${id})">Edytuj</button>
            <h3>${title}</h3>
            <p>${content}</p>
            <p>${date}</p>    
            </div>`)
            } 
        }
        
    })
    document.querySelector("#pinNoteTab").innerHTML = notes.join(" ")
    
    document.querySelector("#noteTab").innerHTML = notez.join(" ")
    selectBox();
}


document.querySelector("#addButton").addEventListener("click", () =>{
    if(document.getElementById("addNote").style.display=="none"){
        document.getElementById("addNote").style.display="block"
    }else{
        addNote();
        document.getElementById("addNote").style.display="none"
    }
    
});

document.querySelector("#clearAllNotes").addEventListener("click", () =>{
    localStorage.clear()
    showNotes()
    selected = []
    localStorage.setItem("pinned",JSON.stringify(selected))
});

function removeNote(id){
    localStorage.removeItem(id)
    showNotes()
    
}

function selectBox(){
    const boxs = document.querySelectorAll('input[type="checkbox"]')
    boxs.forEach(x => {
        if(localStorage.getItem("pinned").includes(x.value)){
            x.checked = true;
        }
    });
}

function pinNote(){
    const checked = document.querySelectorAll('input[type="checkbox"]:checked')
    selected = Array.from(checked).map(x=>x.value)
    localStorage.setItem("pinned",JSON.stringify(selected));
    showNotes();
}

function editNote(id){
    const editButton = document.getElementById("editButton")
    const addButton = document.getElementById("addButton")
    const addNotez = document.getElementById("addNote")    

    addNotez.style.display="block"
    editButton.style.display="inline-block"
    addButton.style.display="none"

    let noteRef = JSON.parse(localStorage.getItem(id))
    document.querySelector("#title").value = noteRef.title
    document.querySelector("#content").value = noteRef.content
    document.querySelector("#color").value = noteRef.color

    editButton.onclick = () =>{
    const note = document.querySelector("#addNote")
    const title = note.querySelector("#title") 
    const content = note.querySelector("#content") 
    const color = note.querySelector("#color") 
    
    localStorage.setItem(
        id,
        JSON.stringify({
            id,
            title: title.value,
            content: content.value,
            color: color.value,
            date: new Date().toLocaleString()
        })
    )
    showNotes()
    addNotez.style.display="none"
    editButton.style.display="none"
    addButton.style.display="inline-block"
    document.querySelector("#title").value = ""
    document.querySelector("#content").value = ""
    document.querySelector("#color").value = "#444444"
    }
}
    
    

    
    
