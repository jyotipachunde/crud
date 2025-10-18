const todoform=document.getElementById("todoform");
const todolist=document.getElementById("todolist");
const todoitem=document.getElementById("todoitem");
const updatetodobtn=document.getElementById("updatetodobtn");
const addtodobtn=document.getElementById('addtodobtn');

    console.log(todoform);
    
let todoarr=[];//[{todoitem:'js',todoid:'cdbb502c-b050-431d-be48-057cd6c68bb1';

const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}
console.log(uuid());
/*const onEdit=e=>{
   
    let edit-id=e.closest('li').id;
}*/
const create=(arr)=>{
let r=' ';
    arr.forEach(todo=>{
        r+=` <li class="list-group-item d-flex justify-content-between" id="${todo.todoid}">
                    <strong> ${todo.todoitem1}</strong>
                    <div>  <i class="fas fa-trash-alt text-success" onclick="oremove(this)"></i>
                  <i class="fas fa-edit text-danger" onclick="edit(this)"></i></div>
                </li>`;
    });
    todolist.innerHTML=r;
}
create(todoarr);

let editid;
const edit=(e)=>{
    editid=e.closest('li').id;
    let eobj=todoarr.find(todo=>{
        return todo.todoid===editid;
    })
    console.log(editid);
    todoitem.value=eobj.todoitem1;
    updatetodobtn.classList.remove('d-none');
    addtodobtn.classList.add('d-none');
}
const oremove=e=>{
     let getcon=confirm(`are o sre`);
     console.log(getcon);
    if(getcon===true){
      let remove=e.closest('li').id;  

    let geti=todoarr.findIndex(todo=>
    {
        return todo.todoid===remove;
    });
    console.log(geti);

    todoarr.splice(geti,1);
    e.closest('li').remove();;
}
}

const ontodosbmit=(eve)=>{
        //console.log('ssbbbb');

    eve.preventDefault();
    let todoobj={
        todoitem1:todoitem.value,
        todoid:uuid()
    };
    todoform.reset();
        //console.log(todoobj);

    todoarr.push(todoobj);
    create(todoarr)
    console.log(todoarr);

}

const onupdatetodobtn=()=>{
    console.log('sssss')
    let upid=editid;
    let upobj={
        todoitem1:todoitem.value,
        todoid:upid
    }
    console.log(upobj);
    todoform.reset();
    let getii=todoarr.findIndex(todo=>{
        return todo.todoid=upid
    })
        console.log(getii);

    todoarr[getii]=upobj;

    let li=document.getElementById(editid);
    console.log(li);
    li.firstElementChild.textContent=upobj.todoitem1;
    updatetodobtn.classList.add('d-none');
    addtodobtn.classList.remove('d-none');

}


todoform.addEventListener("submit" ,ontodosbmit);
updatetodobtn.addEventListener("click" ,onupdatetodobtn);

