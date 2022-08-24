/* SYNTAX PENTING
Arrow function: function tanpa nama di JavaScript
    Syntax: ({parameter}) => {
                 // Isi kode
            }

    Tanpa parameter: () => {
                 // Isi kode
            }

    Satu parameter: {parameter} => {
                 // Isi kode
            }
    Atau: (parameter) => {
                 // Isi kode
            }
    
    Digunakan apabila hanya ingin membuat sebuah fungsi yang berjalan di satu tempat saja
    Karena tanpa nama, kalau ingin membuat function bernama, buat function dengan syntax biasa saja
    ----------------------------------------------------------------------------------------------------------------------
    Arrow Function dapat didefinisikan namanya (menjadi function biasa) dengan mengassign Arrow Function ke dalam variabel

    Contoh:
        addition = (a, b) => {
            console.log(a + b)
        }

        addition(5, 10)     // Output console: 15 {5 + 10}

    Setara dengan function bernama (function biasa):
        function addition(a, b) {
            console.log(a + b)
        }
=============================================================================================================================
Event listener: melakukan suatu fungsi apabila suatu event terjadi
    Syntax: {element}.addEventListener({event: string}, {function})

    Contoh: 
        const todoForm = document.getElementById("todoForm"); // Form utama         <form>
        todoForm.addEventListener("submit", (e) => {
            // Isi kode
        })

        Penjelasan:
            Kode di atas memberikan event listener kepada form todoForm. Ketika form tersebut disubmit (dengan button atau tombol 
            enter), arrow function dengan parameter e {event} akan dijalankan

    ** Contoh-contoh event yang dapat digunakan bisa disearch di web
=============================================================================================================================
Parameter e / event {(e) => {}}: digunakan mengakses informasi event
    Biasanya dimasukkan dalam event listener (apabila fungsi ketika event membutuhkan informasi event)
    Apabila sudah ada parameter event, tidak boleh ada parameter tambahan disampingnya {(e, a, b) -> parameter e bukan event parameter}
    
    Contoh method dari parameter event dan implementasinya:
        document.addEventListener("click", (e) => {
            console.log(e.target)
        })

    Fungsi:
        Ketika halaman web diklik, elemen yang diklik oleh user akan muncul di dalam console 

    ** Method-method lain dapat dilihat di web
*/

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*                                       BAGIAN MENAMBAHKAN TODO BARU KE DALAM LIST                                       */
// Ambil elemen penting untuk membuat todo baru dari input pengguna (dimasukkan ke dalam const / constant / konstanta)
const todoForm = document.getElementById("todoForm"); // Form utama         <form>
const inputTodo = document.getElementsByName("todo"); // Bagian input text  <input type="text">
const todoList = document.getElementById("todolist"); // Bagian list todo   <ul> {unordered list}

// Event listener di bawah: Apabila form utama di submit, todo yang diinput user akan ditambahkan ke dalam list
todoForm.addEventListener("submit", (e) => {
    // Ketika form disubmit, default behaviornya adalah merefresh halaman
    // Dilakukan e.preventDefault() agar default behavior tidak berjalan (halaman tidak direfresh)
    e.preventDefault();                                      // Bisa coba dicomment untuk testing, lalu submit todo untuk lihat perbedaan

    // Keterangan: inputTodo merupakan array of element, karena menggunakan getElement{s}ByName("todo")
    //             Semua elemen yang memiliki atribut name "todo" akan masuk ke dalam array of element inputTodo
    //             sehingga untuk mengaksesnya, perlu digunakan indeks 
    
    // Karena elemen bagian input user berada di paling atas (secara hitungan line) dari semua elemen yang memiliki name "todo"
    // (karena hanya ada satu elemen saja yang memiliki atribut name="todo") maka bagian input pengguna diakses dengan menggunakan
    // indeks 0 (inputTodo[0]) 
    
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

        // <input type="checkbox" name="check"/>
        const checkbox = document.createElement("input");         // Elemen input checkbox
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "check");
        checkbox.classList.add("form-check-input", "me-1")        // Tambahkan class styling ke checkbox

        checkbox.onclick = checkTodo                                   // Ketika checkbox diklik, maka todo akan tercentang (cek fungsi di bawah)

       
        // <label>{inputTodo[0].value}</label>
        const label = document.createElement("label");            // Elemen label (untuk menampung const text)
        const text = document.createTextNode(inputTodo[0].value); // Text node (isinya input dari pengguna)
        label.appendChild(text);
        label.setAttribute("for", "check");                       // Set atribut for untuk referensi ke checkbox
        label.classList.add("form-check-label", "fw-semibold", "text-light", "user-select-none");  // Tambahkan class styling ke label
        
        // <div class="todo" onclick="checkTodo">
        //     <input type="checkbox" name="check" />
        //     <label>{inputTodo[0].value}</label>
        // </div>
        const div = document.createElement("div");                // Elemen div, wrapper input checkbox + label
        div.classList.add("todo", "d-inline-block")                                 // Tambahkan class todo ke div  
        div.appendChild(checkbox);                                // Append checkbox dan label menjadi child dari div
        div.appendChild(label);
        
        // Atribut onclick dari suatu elemen dapat diassign dengan fungsi 
        // Contoh dalam kasus ini, div diassign fungsi checkTodo ketika diklik
        div.onclick = checkTodo                                   // Ketika todo diklik, maka todo akan tercentang (cek fungsi di bawah)
        
        // <button onclick="removeThisTodo">X</button>
        const removeBtn = document.createElement("button");       // Elemen button (untuk menghapus todo dari list)
        removeBtn.innerHTML = "delete";
        removeBtn.classList.add("btn", "btn-outline-danger", "text-uppercase", "fw-semibold");     // Tambahkan class styling ke button
        removeBtn.onclick = removeThisTodo                        // Ketika button diklik, maka todo tersebut akan hilang (cek fungsi di bawah)

        // <li>
        //     <div>
        //         <input />
        //         <label>{Text}</label>
        //     </div>
        //     <button>X</button>
        // </li>
        const list = document.createElement("li");                // Elemen li, wrapper todo
        list.appendChild(div);                                    // Append div dan button menjadi child dari li
        list.appendChild(removeBtn)
        list.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "mb-2", "bg-dark");    // Tambahkan class styling ke li

        // Append list menjadi child dari todoList
        // <ul>                                       
        //     <li>                                  
        //         <div>                             
        //             <input type="checkbox" />     
        //             <label>{Text}</label>          
        //         </div>
        //     </li>
        // </ul>
        todoList.appendChild(list);

        // Hapus input dari pengguna
        inputTodo[0].value = "";
    }
})

// Mencentang todo ketika label maupun checkbox dari todo diklik
// Fungsi untuk event click pada div wrapper label dan checkbox
function checkTodo(e) {
    // Karena user mengklik label atau checkbox dari todo, ambil parent (div wrapper) dari todo terlebih dahulu
    // agar kita dapat mengakses sibling dari elemen yang diklik
    const todo = e.target.parentElement     // Parent dari checkbox maupun label adalah sama, yaitu div wrapper
    const checkbox = todo.childNodes[0]     // Child pertama dari div wrapper pasti merupakan checkbox
    const label = todo.childNodes[1]        // Child kedua dari div wrapper pasti merupakan label
    
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
// Fungsi akan berjalan ketika tombol silang pada salah satu todo diklik
function removeThisTodo(e) {
    // e.target akan menargetkan pada button silang yang terletak di todo yang ingin dihapus
    // Parent dari button adalah list wrapper dari keseluruhan todo
    // Dengan menggunakan method removeChild pada array of li todoList (<ul></ul>), hapus elemen e.target.parentElement (hapus
    // elemen <li></li> dari todo yang ingin dihapus secara keseluruhan
    todoList.removeChild(e.target.parentElement) 
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*                                            IMPLEMENTASI REMOVE SEMUA TODO DALAM LIST                                        */
// Implementasi onclick tombol "Remove All"
function removeAllTodos(){
    // Bila innerHTML dari suatu elemen diset sebagai empty string (""), maka semua elemen dan text di dalamnya akan terhapus
    // Dalam kasus ini, isi innerHTML dari <ul></ul> (todoList) diubah menjadi ""

    /* Contoh removeAllTodos 
        Awal:
        <ul>
            <li>
                <div>
                    <input type="checkbox" />
                    <label>Sapu rumah</label>
                </div
                <button>X</button>
            </li>
            <li>
                <div>
                    <input type="checkbox" />
                    <label>Sapu rumah</label>
                </div
                <button>X</button>
            </li>
        </ul>

        Ketika button "Remove All" diklik:
            <ul></ul>

        <ul> menjadi hanya berisi empty string ("")
    */

    todoList.innerHTML = "";
}

// add today's date to title
const todayDate = document.getElementById("title");
const date = new Date().toLocaleDateString();
todayDate.innerHTML += ` ${date}`;