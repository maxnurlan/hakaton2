const API = "http://localhost:8000/info";

let add = document.querySelector(".add");
let img = document.querySelector(".addPhoto");
let modalImg = document.querySelector(".photos");
let inputImg = document.querySelector(".inputImg");
let btn = document.querySelector(".btn");
let show = document.querySelector(".show");
let close = document.querySelector(".close");
let desc = document.querySelector(".desc");
let elements = document.querySelector(".elements");
let modal = document.querySelector(".modal");


//!Search
let search = document.querySelector('.search')
let searchVal = ''



//Todo Edit
let btnEdit = document.querySelector(".btn-edit");
let editImg = document.querySelector(".editImg");
let editDesc = document.querySelector(".editDesc");

img.addEventListener("click", function () {
  add.style.display = "flex";
  add.style.justifyContent = "center";
  add.style.padding = "10px";
  btn.addEventListener("click", function () {
    let obj = {
      img: inputImg.value,
      desc: desc.value,
    };
    if (!obj.img.trim() || !obj.desc.trim()) {
      alert("Заполните");
      return;
    }
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(obj),
    });
    inputImg.value = "";
    desc.value = "";
  });
});
close.addEventListener("click", function () {
  add.style.display = "none";
});

function render() {
  fetch(`${API}?=${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((a) => {
            
            elements.innerHTML += `<div class='elem'><div class='Profedit'> 
            <div class='test'>
            <div class='usersInfo'>
            <img class='user' src='https://cdn-icons-png.flaticon.com/512/1946/1946429.png'>
            <span>User</span>
            </div>
            <div>
            <button id=${a.id} class="edit">Edit</button>
            <button id=${a.id} class="delete">Delete</button>
           </div></div>
            <img src = '${a.img}' class='images'>
            <div>
            <span class='likeAnim'> <img class ='like' src='photo.png'>
            </span>
            <span class='talking'>
             <a href='#' class="aTalk">  
             <img class = 'talk'src='talk.png'>
            </a>
            </span>
            </div>
            <div>
            <div class='divLike' style="width: 350px">
            <p class='loveIt'>Нравится: ${i} </p>
            <span>User: ${a.desc}</span></div></div>`;
        });
    });
    elements.innerHTML += "";
}
let i = 1
document.addEventListener('click',function(e){
let loveIt = document.querySelector('.loveIt')
let animLike = document.querySelector('.likeAnim') 
if(e.target.classList.contains('like')){
    i +=1
    loveIt.innerHTML = `<p>Нравится: ${i}</p>`
    animLike.innerHTML = `<img class = 'like' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png'>`
}
else if (e.target.classList.contains('talk')){
    let comm = document.querySelector('.comm')
    
    }
})




document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {
        modal.style.display = "block";
        let id = e.target.id
        fetch(`${API}/${id}`)
        .then((res)=> res.json())
        .then((data)=>{{
            editImg.value = data.img
            editDesc.value = data.desc
            btnEdit.setAttribute('id',data.id)
        }})
    }
});

btnEdit.addEventListener("click", function (c) {
    let newEdit = {
        img: editImg.value,
        desc: editDesc.value
    }
    saveEdit(newEdit, this.id)
});
function saveEdit(editedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charse=utf-8",
    },
    body: JSON.stringify(editedProduct),
  }).then(() => {
    render();
  });
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let id = e.target.id;
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => render());
  }
});
render();



search.addEventListener('input',()=>{
    searchVal=search.value
    render()
})