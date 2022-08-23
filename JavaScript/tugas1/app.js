let inputTodo = document.getElementsByName("todo")
let todoList = document.getElementById("todolist")
console.log(inputTodo);
function addTodo(e){
    e.preventDefault();
    console.log(`value = ${inputTodo.value}`)
}

const todoForm = document.getElementById("todoForm");
console.log(todoForm);
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = document.createElement("label");
    const text = document.createTextNode(inputTodo[0].value)
    const div = document.createElement('div')
    const list = document.createElement("li");
    const checkbox = document.createElement('input')
    if(inputTodo[0].value == ""){
        alert("To Do List tidak boleh kosong")
    }
    else{
        checkbox.setAttribute('type', 'checkbox');
        div.classList.add('todo')
        label.appendChild(text);
        checkbox.setAttribute('name', 'check')
        div.appendChild(checkbox);
        div.appendChild(label);
        div.addEventListener('click', checkTodo)
        list.appendChild(div);
        todoList.appendChild(list);
        inputTodo[0].value = '';
    }
})

let checkboxs = document.getElementsByName('check');
console.log(checkboxs)
// todoList.addEventListener('onClick', (e) => {
//     console.log(e);
// })

const btnRemoveAll = document.getElementById('removeAll');

function removeAllTodos(){
    todoList.innerHTML = '';
    console.log(todoList.outerHTML)
}
// const allList = document.querySelectorAll('.todo')
// console.log(allList)
// allList.forEach(list => {
//     list.addEventListener("click", checkTodo) 
// })

function checkTodo(e) {
    const todo = e.target.parentElement
    const checkbox = todo.childNodes[0]
    const label = todo.childNodes[1]
    console.log(checkbox.checked)
    console.log(checkbox.outerHTML)
    checkbox.checked = !checkbox.checked
    console.log(label)
    if(checkbox.checked){
        label.style.textDecoration = "line-through"
    }else{
        label.style.textDecoration = "none"
    }
}