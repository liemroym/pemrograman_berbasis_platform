// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*                                       BAGIAN MENAMBAHKAN TODO BARU KE DALAM LIST                                       */
// Ambil elemen penting untuk membuat todo baru dari input pengguna (dimasukkan ke dalam const / constant / konstanta)
const todoForm = document.getElementById("todoForm"); // Form utama         <form>
const inputTodo = document.getElementsByName("todo"); // Bagian input text  <input type="text">   --> Array of elements
const todoList = document.getElementById("todolist"); // Bagian list todo   <ul> {unordered list}

// Menambahkan tanggal hari ini ke judul (h1)
const todayDate = document.getElementById("title");
const date = new Date().toLocaleString()
todayDate.innerHTML += ` ${date}`;
 
// Event listener di bawah: Apabila form utama di submit, todo yang diinput user akan ditambahkan ke dalam list
todoForm.addEventListener("submit", (e) => {
    // Dilakukan e.preventDefault() agar halaman tidak direfresh ketika disubmit
    e.preventDefault();                                      
    
    // Cek input pengguna. Bila kosong, lakukan alert bahwa todo tidak boleh kosong
    if (inputTodo[0].value == "") {
        alert("To Do List tidak boleh kosong")
    } else {
        /* Membuat elemen penting dari todo
            Treenya: (Format: <elemen_html> {nama const dalam JavaScript})
            <ul>                                      {todoList, declare di bagian paling atas }
                <li>                                  {list}
                    <div>                             {div}
                        <input type="checkbox" />     {check}
                        <label>{Text}</label>         {label, di dalamnya ada text node (const text)}
                    </div>
                </li>
            </ul>
        */  

        const checkbox = document.createElement("input");         
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "check");
        checkbox.classList.add("form-check-input", "me-1")        

        checkbox.onclick = checkTodo

        const label = document.createElement("label");
        const text = document.createTextNode(inputTodo[0].value);
        label.appendChild(text);
        label.setAttribute("for", "check");
        label.classList.add("form-check-label", "fw-semibold", "text-light", "user-select-none");
        
        const div = document.createElement("div");                 
        div.classList.add("todo", "d-inline-block")                 
        div.appendChild(checkbox);                                 
        div.appendChild(label);
        
        const removeBtn = document.createElement("button");       
        removeBtn.innerHTML = "delete";
        removeBtn.classList.add("btn", "btn-outline-danger", "text-uppercase", "fw-semibold");        
        removeBtn.onclick = removeThisTodo                        

        const list = document.createElement("li");                
        list.appendChild(div);                                    
        list.appendChild(removeBtn)
        list.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "mb-2", "bg-dark");    // Tambahkan class styling ke li
        list.onclick = checkTodo                                 
        
        todoList.appendChild(list);
        
        // Hapus input dari pengguna
        inputTodo[0].value = "";
    }
})

// Mencentang todo ketika label maupun checkbox dari todo diklik
// Fungsi untuk event click pada div wrapper label dan checkbox
function checkTodo(e) {
    // Mencari div wrapper dari checkbox dan label
    // Bila label / div diklik, maka todoDiv diambil dari parent dengan tag div terdekat (yaitu div wrapper label / div itu sendiri)
    let todoDiv = e.target.closest('div')      
    if (e.target.tagName == 'LI') {            // Bila bagian yang diklik adalah li (bagian di luar checkbox dan label), maka ambil child pertama dari li
        todoDiv = e.target.childNodes[0]
    }
    const checkbox = todoDiv.childNodes[0]     // Child pertama dari div wrapper pasti merupakan checkbox
    const label = todoDiv.childNodes[1]        // Child kedua dari div wrapper pasti merupakan label
    
    // Ubah value dari checkbox. Apabila sebelumnya tercentang, maka hilangkan centangnya
    // Apabila sebelumnya tidak tercentang, berikan tanda centang
    checkbox.checked = !checkbox.checked    
    
    // Berikan style strikethrough pada label todo yang tercentang
    if(checkbox.checked){
        label.style.textDecoration = "line-through"
    }else{
        label.style.textDecoration = "none"
    }
}

// Hapus 1 todo yang ingin dihapus (implementasi onclick removeBtn (button silang todo))
// Fungsi akan berjalan ketika tombol delete pada salah satu todo diklik
function removeThisTodo(e) {
    // Mencegah event click parent berjalan ketika button diklik
    e.stopPropagation()
    // Dengan menggunakan method removeChild pada array of li todoList (<ul></ul>), hapus elemen e.target.parentElement (hapus
    // elemen <li></li> dari todo yang ingin dihapus secara keseluruhan
    todoList.removeChild(e)
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*                                            IMPLEMENTASI REMOVE SEMUA TODO DALAM LIST                                        */
// Implementasi onclick tombol "Remove All"
function removeAllTodos(){
    // Bila innerHTML dari suatu elemen diset sebagai empty string (""), maka semua elemen dan text di dalamnya akan terhapus
    // Dalam kasus ini, isi innerHTML dari <ul></ul> (todoList) diubah menjadi ""
    todoList.innerHTML = "";
}