//

const container = document.getElementById('container');
const addListBtn = document.getElementById('btnClm');

refreshEvents();


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
  currentElm.className = 'hiddenMy';
  // Locate Input
  const input = currentP.querySelector('input');
// Unhide Input Element
  input.className = 'panel-heading input-heading';
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
      input.className = 'hiddenMy';
      if (currentElm.textContent === '') {
        currentElm.textContent = 'Untitled list'
      }
      //   eventhandeler();

    }


    if (event.type === evtblur) {
      currentElm.textContent = input.value;
      currentElm.className = 'p-header panel-heading header-list';
      input.className = 'hiddenMy';
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

  const delBtn = currentUl.querySelector('li a');


  if (currentUl.style.display = 'none') {

    currentUl.style.display = 'block';
  }

  if (currentUl.style.display = 'block' && event.type === evtblur) {

    currentUl.style.display = 'none'
    // refreshEvents(currentBtn);

  }
}
function removeList(target) {

  const currentBtn = event.target;
//  const currentP = currentBtn.parentNode;
  const currentUl = currentBtn.closest('ul');
  //console.log(temp);
  if (event.type === evtClick) {

    // Catch the header
    const currentHeader = currentBtn.closest('header');
    const titleName = currentHeader.querySelector('p').innerHTML;

    const isdelete = confirm(`Deleting , ${titleName}, Are u sure ?`);
    if (isdelete) {
      const currentList = currentBtn.closest('.list-column');
      const main = currentBtn.closest('main');
      main.removeChild(currentList);
    }
    // Else
    currentUl.style.display = 'none';
  }
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
    btn.addEventListener("click", dropdownEdit);
    /*       btn.addEventListener('blur', () => {
     console.log('blurrr');
     const ulP = btn.parentNode;
     const ul = ulP.querySelector('ul');
     ul.style.display = 'none';
     const li = ul.children;
     const a = li.children;
     console.log(a);
     // del.addEventListener("click", removeList())


     })*/
  }

  const delAs = targetP.getElementsByClassName('delA');

  for (let delA of delAs) {
    delA.addEventListener("click", removeList);

  }


  const liCards = document.querySelectorAll('.liCard');

  console.log('1', liCards);


  for (const liCard of liCards) {
    console.log('3', liCard);
    liCard.addEventListener("mouseover", editCardDisplay);
    liCard.addEventListener("mouseout", editCardDisplay);



  }
  const editCards = document.querySelectorAll('.editCard');

  for (const editCard of editCards) {
    editCard.addEventListener("mouseover", editCardDisplay);
    editCard.addEventListener("mouseout", editCardDisplay);
  }



  console.log('2', editCards);

}
function editCardDisplay(ev) {
  const liCard = ev.target;
  const editCard = liCard.querySelector('.editCard');


  if (ev.type === 'mouseover') {

    editCard.style.display = 'inline-block';


  }
  if (ev.type === 'mouseout') {


    editCard.style.display = 'none';
  }






}


const listTemplate = `
    <header class="panel panel-default input-group">
      <p class="p-header panel-heading header-list">list name</p>
      <input maxlength="15" type="text" class="panel-heading hiddenMy input-heading">
      <div class="input-group-btn">
        <button type="button"  class="btn btn-default editbtn dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false"><span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li class="deletebtn"><a class="delA" href="#">Delete list</a></li>

        </ul>
      </div>

    </header>
    <div>
      <ul class="list"></ul>
    </div>
    <footer>
      <button onclick="addCard()" class="btn btn-default addlist card">add card</button>
    </footer>
  `;
const ENTER = 13; // Enter Keycode
const evtblur = 'blur';
const evtClick = 'click';


const datalist = {
  "board": [
    {
      "title": "Backlog",
      "tasks": [
        {
          "text": "Wash the dishes"
        },
        {
          "text": "Do the laundry"
        }
      ]
    },
    {
      "title": "Todo",
      "tasks": [
        {
          "text": "Practice!"
        }
      ]
    },
    {
      "title": "In Progress",
      "tasks": [
        {
          "text": "Code Review"
        }
      ]
    },
    {
      "title": "Done",
      "tasks": []
    }
  ]
}







