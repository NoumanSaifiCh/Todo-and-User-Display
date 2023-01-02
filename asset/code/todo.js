//let baseUrl="https://jsonplaceholder.typicode.com/todos/1";

let todoArray = [];
var userDetails;
let userToEdit;
// Function to Fetch Todo list //
async function getTodo() {
  try {
    const todoData = await fetch(
      `https://jsonplaceholder.typicode.com/todos/`,
      {
        method: "GET",
      }
    );

    let dataList = await todoData.json();
    userDetails = dataList;

    let dataRows;
    dataList?.forEach((element) => {
      if (todoArray.includes(element.id)) return;

      console.log("sm called 1");

      if (userToEdit && userToEdit.id == element.id) {
        element = userToEdit;
        console.log("sm called 2:", userToEdit);
      }

      let data = `<tr>
           <td scope="row"> ${element.id}</td>
           <td>${
             element.completed == true
               ? `<del>${element.title}<del/>`
               : element.title
           }</td>
            <td>${
              element.completed == true
                ? `<p>${element.completed}<i class="fa-solid fa-check text-success ms-2"></i></p>`
                : `<p>${element.completed}<i class="fa-solid fa-xmark text-danger ms-2"></i></p>`
            }</td>
           <td><i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#exampleModal"
            onclick="handleEdit(${element.id})"></i></td>
           <td><i class="fa-solid fa-trash" onclick="handleDelete(${
             element.id
           })"></i></td>
          </tr>`;
      dataRows = dataRows ? dataRows + data : data;
    });

    dataRows && (document.getElementById("table-body").innerHTML = dataRows);
  } catch (error) {
    console.log("User fetch Error:", error.message);
  }
}
getTodo();

//   Todo Delete method//

async function handleDelete(todoId) {
  console.log("todoId", todoId);
  todoArray.push(todoId);
  console.log(todoArray);
  try {
    const deleteData = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        method: "DELETE",
      }
    );
    let deleteResult = await deleteData.json();
    console.log(deleteData, "delete successfull");
  } catch (error) {
    console.log("Delete API error", error);
  }

  getTodo();
}

function handleEdit(id) {
  let currentObject = userDetails.find((itm) => itm.id === id);
  if (!currentObject) return;
  document.getElementById("task-title").value = currentObject.title;
  document.getElementById("taskstatus").value = currentObject.completed
    ? "true"
    : "false";
  document.getElementById("user-id").value = currentObject.id;
}

function handleUpdateUserDetail() {
  let title = document.getElementById("task-title").value;
  let completed = document.getElementById("taskstatus").value;
  let id = document.getElementById("user-id").value;

  userToEdit = { id, title, completed };
  getTodo();
}

// async function deleteTodo(){
//     try {

//         const deleteTodo= await fetch(`https://jsonplaceholder.typicode.com/todos/1`, {
//             method: "DELETE"
//         });
//         let deleteResult= await deleteTodo.json();
//         console.log(deleteResult, "detele");

//     }
//     catch (error){
//     console.log("delete error", error)
//     };
// }

// deleteTodo()
