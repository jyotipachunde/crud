const studentform=document.getElementById("studentform");
const fname=document.getElementById("fname");
const lname=document.getElementById("lname");
const email=document.getElementById("email");
const contact=document.getElementById('contact');
const stdcontainer=document.getElementById('stdcontainer');
const addstdbtn=document.getElementById('addstdbtn');
const updatestdbtn=document.getElementById('updatestdbtn');

let cl=console.log;

let starr;
if(localStorage.getItem("starr")){
   starr = JSON.parse(localStorage.getItem("starr")); 
}else{
  starr = [];
}
cl(starr);

/*starr=[
    {fname:'john',
        lname:'doe',
        email:'j@gmail.com',
        contact:'1234567890',
        stdid:'e8c3eb94-85dd-4388-af3e-76bd39180b89'
        }
*/ 


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

const createstdtr=(arr)=>{
let r=' ';
    arr.forEach((std,i)=>{
        r+=`<tr id=${std.stdid}>
                  <td>${i+1}</td>
                  <td>${std.fname} ${std.lname}</td>
                <td>${std.email}</td>
                  <td>${std.contact}</td>
                  <td><i onclick="onstdedit(this)" class="fas fa-edit text-success"></i></td>
                  <td>
                  <i onclick="onstdremove(this)" class="fas fa-trash-alt text-danger"></i></td>
    </tr> `;
    });
    stdcontainer.innerHTML=r;
}
createstdtr(starr);

let editid;
const onstdedit=(ele)=>{
    editid=ele.closest('tr').id;
    let eobj=starr.find(std=>{
        return std.stdid===editid;
    })
    console.log(editid);
    fname.value=eobj.fname;
    lname.value=eobj.lname;
    email.value=eobj.email;
    contact.value=eobj.contact;

    addstdbtn.classList.add('d-none');
    updatestdbtn.classList.remove('d-none');
}
const onstdremove=ele=>{
     let getcon=confirm(`are you sure`);
     console.log(getcon);
    if(getcon){ 
     let removeid=ele.closest('tr').id;
    let geti=starr.findIndex(std=>
    {
        return std.stdid===removeid;
    });
    console.log(geti);

    starr.splice(geti,1);
     localStorage.setItem("starr", JSON.stringify(starr));
    ele.closest('tr').remove();

let timerInterval;
Swal.fire({
        title:'removed!',
        text:'Student details removed successfully',
        icon:'success',
        timer:2000,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      //timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.isconfirmed) {
    console.log(result);
  }
});

    let alltrs=[...document.querySelectorAll('#stdcontainer tr')];
    alltrs.forEach((tr,i) => {
        tr.firstElementChild.innerHTML=i+1 
    });
    
}
}

const onaddstudent=(eve)=>{
        //console.log('ssbbbb');

    eve.preventDefault();
    let stdobj={
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        contact:contact.value,
        stdid:uuid(),
    };
    studentform.reset();

    starr.push(stdobj);
     localStorage.setItem("starr", JSON.stringify(starr));
    createstdtr(starr);
    swal.fire({
        title:'added',
        text:'Student details added successfully',
        icon:'success',
        timer:3000
    })
    console.log(starr);
}

const onupdatestdbtn=()=>{
    console.log('sssss')
    let updateid=editid;
    let upobj={
        fname:fname.value,
        lname:lname.value,
        email:email.value,
        contact:contact.value,
        stdid:editid
    };
    studentform.reset();
    let getindex=starr.findIndex(std=>std.stdid===updateid);
    console.log(getindex);

    starr[getindex]=upobj;
        localStorage.setItem("starr", JSON.stringify(starr));


    let tr=document.getElementById(editid);
    console.log(tr);
    let trchild=[...tr.children];
    trchild[1].innerText=`${upobj.fname} ${upobj.lname}`
    trchild[2].innerText=`${upobj.email}`
    trchild[3].innerText=`${upobj.contact}`
    console.log(trchild);
    updatestdbtn.classList.add('d-none');
    addstdbtn.classList.remove('d-none');
    swal.fire({
        title:'Updated!',
        text:'Student details updated successfully',
        icon:'success',
        timer:3000
    })

}


studentform.addEventListener("submit" ,onaddstudent);
updatestdbtn.addEventListener("click" ,onupdatestdbtn);


