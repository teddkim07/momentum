
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement; //target: 무슨 버튼 클릭 인식, parentElement: 그 버튼의 부모(li)
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); //filter는 false인 element를 제외한 array를 재생성함 (toDo)는 filter가 전송하는 array 속 각각의 element들
    saveToDos();  //위에서 바꾼 toDos를 localstorage 에도 적용해야됨
    li.remove();
}

function beforeDeleteToDo(event) {
    const span = event.target.parentElement;
    span.className = "blurWhite"
}

function quiteDeleteToDo(event) {
    const span = event.target.parentElement;
    span.className = "white"
}


function paintToDo(newToDo){
    const li = document.createElement("li")
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    span.addEventListener("mouseenter", beforeDeleteToDo)
    span.addEventListener("mouseout", quiteDeleteToDo)
    span.addEventListener("click", deleteToDo)
    li.appendChild(span);               //append(끝에), prepend(앞에)
    toDoList.appendChild(li);
}


function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newToDo,
        id: Date.now()
    }
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);              //불러온 string을 array로 바꿈   
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

if (savedToDos !== null) {
    toDoForm.classList.remove(HIDDEN_CLASSNAME);
}