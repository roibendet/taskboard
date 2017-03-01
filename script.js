//

const container = document.getElementById('container');
const addListBtn = document.getElementById('btnClm');

refreshEvents();


function removeList(event) {

  console.log('was removed');

}

function addList() {
  const emptyList = document.createElement('div');
  emptyList.className = 'list-column';
  emptyList.innerHTML = listTemplate;
  container.insertBefore(emptyList, addListBtn);
  refreshEvents(emptyList);
}

function addCard() {

  const div = event.target.parentNode.previousSibling.previousSibling;
  const ul = div.querySelector('.list');
  const newCard = document.createElement('li');
  newCard.innerHTML = "i'm new";
  ul.appendChild(newCard);

}


function editName() {

  const currentElm = event.target;
  const currentP = currentElm.parentNode;
  // Hide p Element
  currentElm.className = 'hidden';
  // Locate Input
  const input = currentP.querySelector('input');
// Unhide Input Element
  input.className = 'panel-heading';
  if (currentElm.textContent === '') {
    currentElm.textContent = 'Untitled list'
  }
  input.value = currentElm.textContent;
  // Focus the Input Element
  input.focus();


  input.addEventListener('keydown', eventhandeler);
  input.addEventListener('blur', eventhandeler);

  function eventhandeler(event) {
    currentElm.focus();
    if (event.keyCode === ENTER) {
           currentElm.textContent = input.value;
       currentElm.className = 'p-header panel-heading header-list';
       input.className = 'hidden';
      if (currentElm.textContent === '') {
        currentElm.textContent = 'Untitled list'
      }
   //   eventhandeler();

    }


    if (event.type === evtblur ) {
    currentElm.textContent = input.value;
    currentElm.className = 'p-header panel-heading header-list';
    input.className = 'hidden';
      if (currentElm.textContent === '') {
        currentElm.textContent = 'Untitled list'
      }
    }
  }
}

function dropdownEdit() {

  const currentBtn = event.target;
  const currentP = currentBtn.parentNode;
  const currentUl = currentP.querySelector('ul');
  currentUl.style.display = 'block';
  const delBtn = currentUl.querySelector('li a');
console.log(delBtn);
  // refreshEvents(currentBtn);
  delBtn.addEventListener('click', () => {

    console.log(delBtn);
    const subtitle = currentP.parentNode;
    const title = subtitle.querySelector('p').innerHTML;
    const isdelete = confirm(`Deleting , ${title}, Are u sure ?`);
    if (isdelete) {
      const currentList = subtitle.parentNode;
      const main = currentList.parentNode;
      main.removeChild(currentList);
      console.log(main);
    }
    if (isdelete === false) {
      currentUl.style.display = 'none';
    }


    /*  currentBtn.addEventListener('blur', () => {
     console.log('blurrr');
     currentUl.style.display = 'none';

     });*/

    // console.log(delBtn);

    /*  currentBtn.addEventListener('blur', (ev) => {
     currentUl.style.display = 'none';
     });*/

//  console.log(currentBtn);
    //  const currentP = currentBtn.parentNode;

  });
}








// Helpers
function refreshEvents(target) {
  const targetP = target || document;
  const Lists = targetP.getElementsByClassName('header-list');

  for (let list of Lists) {
    list.addEventListener("click", editName);
  }

  const Btns = targetP.getElementsByClassName('editbtn');

  for (let btn of Btns) {
    btn.addEventListener('blur', () => {
      console.log('blurrr');
      const ulP = btn.parentNode;
      const ul = ulP.querySelector('ul');
      ul.style.display = 'none';
      const li = ul.children;
      const a = li.children;
      console.log(a);
    // del.addEventListener("click", removeList())


    })
  }
}
const listTemplate = `
    <header class="panel panel-default input-group">
      <p class="p-header panel-heading header-list">list name</p>
      <input type="text" class="panel-heading hidden">
      <div class="input-group-btn">
        <button type="button" onclick="dropdownEdit()" class="btn btn-default editbtn dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">edit
        </button>
        <ul class="dropdown-menu">
          <li class="deletebtn"><a href="#">Delete list</a></li>

        </ul>
      </div>

    </header>
    <div>
      <ul class="list">
    

      </ul>
    </div>
    <footer>
      <button onclick="addCard()" class="btn btn-default addlist card">add card</button>
    </footer>
  `;
const ENTER = 13; // Enter Keycode
const evtblur = 'blur';







