let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.querySelector("#dark_theme");

function enableDarkmode() {
    document.body.classList.add("toggledark");
    localStorage.setItem("darkmode", "active");
}
function disableDarkMode() {
    document.body.classList.remove("toggledark");
    localStorage.setItem("darkmode", "not");
}
if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkMode();
});

let listcontainer = document.querySelector(".listcontainer");
let input = document.querySelector("#input");
let add = document.querySelector("#add");
let localtododata = gettodolist() || [];
let errmsg = document.querySelector(".err");
// let delbtn = document.querySelectorAll("#del");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {  
        addtodolist();        
    }
});

function addelementDynamically(element) {
    const listitemdiv = document.createElement("div");
    listitemdiv.classList.add("listitem");
    listitemdiv.innerHTML = ` 
    <li class="item">${element}</li>
          <button class="del">
            <span class="material-symbols-outlined"> delete </span>
          </button>
          `;
    listcontainer.append(listitemdiv);
}
function gettodolist() {
    let datainarray = JSON.parse(localStorage.getItem("todolist"));
    return datainarray||[];
}

function addtodolist() {
    if (input.value.trim() !== "") {

        let newdata = input.value.trim().toLowerCase();
        if (!localtododata.includes(newdata)) {


            localtododata.push(newdata);
            // localtododata = [...new Set(localtododata)];
            console.log(localtododata);

            localStorage.setItem("todolist", JSON.stringify(localtododata));

            addelementDynamically(newdata);

            input.value = "";
        }
        else {
            errmsg.innerText = "Already inserted !! try something else ." ;
            setTimeout(() => {
                errmsg.innerText = "";
            }, 2000)
        }

    }
    else{
        errmsg.innerText = "Empty string can't be Added" ;
        setTimeout(() => {
            errmsg.innerText = "";
        }, 2000)
    }

}

function showdata() {
    localtododata.forEach(element => {
        addelementDynamically(element);
    });
}


listcontainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("del") || e.target.closest(".del")) {
        let delButton = e.target.classList.contains("del") ? e.target : e.target.closest(".del");
        let parentElement = delButton.parentElement;
        let todoListContent = parentElement.querySelector(".item").innerText.toLowerCase();  

        localtododata = localtododata.filter((currenttodo) => currenttodo !== todoListContent);

        localStorage.setItem("todolist", JSON.stringify(localtododata));

        parentElement.remove();
    }
});


add.addEventListener("click", (e) => {
    addtodolist(e);
})


showdata();
