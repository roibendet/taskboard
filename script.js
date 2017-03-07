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
      <button class="btn btn-default addlist card">add card</button>
    </footer>
  `;


const cardTemplate = `
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn btn-default closemy pull-right" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">×</span></button>
                  <h4 class="modal-title pull-left">Edit card</h4>
                </div>
                <div class="modal-body">
                  <label class="pull-left">Card Text
                  </label>
                  <textarea name="CardText" class="input form-control"></textarea>

                </div>
                <div class="modal-body">
                  <label class="moveto pull-left">Move To:</label>
                  <select class="form-control movetoselect">
                    <option>member</option>
                  </select>
                </div>
                <div class="modal-body">
                  <label class="pull-left">Members:
                  </label>

                  <div class="form-check">
                    <div class="test form-control">
                      <label class="form-check-label">Member1
                        <input class="form-check-input pull-left" type="checkbox" value="member"></label>
                      <label class="form-check-label">Member2
                        <input class="form-check-input pull-left" type="checkbox" value="member"> </label>
                      <label class="form-check-label">Member3 <input class="form-check-input pull-left" type="checkbox"
                                                                              value="member">
                    </label>
                      <label class="form-check-label">Member3 <input class="form-check-input pull-left" type="checkbox"
                                                                     value="member">
                      </label>
                    </div>
                  </div>

                </div>
                <div class="modal-body modal-bodymy">
                  <button type="button" class="btn btn-danger deletebtn">Delete Card</button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default closemy" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          `;


const container = document.getElementById('container');
const addListBtn = document.getElementById('btnClm');
addListBtn.addEventListener('click', () => addList());

addListEvents();


function addList(data) {
  // console.log('first', data);


  const emptyList = document.createElement('div');
  emptyList.className = 'list-column';
  emptyList.innerHTML = listTemplate;
  container.insertBefore(emptyList, addListBtn);

  if (data) {
    const titleHead = emptyList.querySelector('.p-header');
    titleHead.innerHTML = data.title;

    // For each task, create card
    const tasks = data.tasks;
    for (const task of tasks) {
      addCard(emptyList, task);
      //   console.log(task);
    }
  }


  addListEvents(emptyList);
}

function addCardClickHandler(ev) {


  const currentBtn = ev.target;
  console.log(currentBtn);
  const currentList = currentBtn.closest('.list-column');
  const targetUL = currentList.querySelector('.list');


  addCard(targetUL);

}


function addCard(targetUl, data) {
//  console.log('first', targetUl);

  const newCard = document.createElement('li');
  newCard.setAttribute('class', 'liCard');
  const editCardBtn = document.createElement('button');
  editCardBtn.setAttribute('class', 'editCard');
  editCardBtn.setAttribute('data-toggle', 'modal');
  editCardBtn.setAttribute('data-target', 'myModal');
  editCardBtn.innerHTML = 'Edit List';
  newCard.innerHTML = "i'm new";
  targetUl.appendChild(newCard);
  newCard.appendChild(editCardBtn);
//  addCardEvents(newCard);

  const modal = document.createElement('div');
  modal.innerHTML = cardTemplate;
  modal.setAttribute('class', "modal fade");
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  newCard.appendChild(modal);

  if (data) {

    newCard.textContent = data.text;
    newCard.appendChild(editCardBtn);
    newCard.appendChild(modal);
    targetUl.querySelector('.list').appendChild(newCard);
    // console.log(data.members);

    if (data.members) {

      const title = data.members;
      const members = data.members;
      for (const member of members) {
        const spanElm = document.createElement('span');
        spanElm.setAttribute('class', 'label label-primary pull-right');

        spanElm.setAttribute('title', data.members);
        let initial = '';

        const currentName = member.split(' ');
        //console.log('first', member.charAt(0));
        //console.log('second', currentNames);
        for (const namePart of currentName) {

          initial += namePart.charAt(0);
        }

      //  console.log(initial);

        spanElm.textContent += initial;
        newCard.appendChild(spanElm);

      }


    }

  }
  addCardEvents(newCard);
  addListEvents(newCard);


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

    currentUl.style.display = 'none';

  }
}
function removeList(target) {

  const currentBtn = event.target;
//  const currentP = currentBtn.parentNode;
  const currentUl = currentBtn.closest('ul');
  //console.log(localDataList);
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

function addCardEvents(target) {


  const editCards = document.querySelectorAll('.editCard');
  for (const editCard of editCards) {
    editCard.addEventListener("click", editCardDisplay);
  }


}

// Helpers
function addListEvents(target) {
  const targetP = target || document;
  const Lists = targetP.getElementsByClassName('header-list');


  const addCardBtns = targetP.querySelectorAll('.card');
  // console.log(addCardBtns);

  for (let addCardBtn of addCardBtns) {

    addCardBtn.addEventListener("click", addCardClickHandler);
  }

  const closeBtns = targetP.querySelectorAll('.closemy');
  // console.log(closeBtn);
  // closeBtn.addEventListener('click', close);
  for (let closeBtn of closeBtns) {
    closeBtn.addEventListener('click', close);
  }

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


}

function editCardDisplay(ev) {


  if (ev.type === 'click') {
    const Elm = ev.target;
//    console.log('1', Elm);
    const li = Elm.closest('li');
//    console.log('2', li);
    const modalElm = li.querySelector(".modal");
//    console.log(modalElm);

    modalElm.setAttribute('class', "modal fade in");
    modalElm.style.display = 'block';


    //  const closeBtn = document.querySelector('.close');
    //  closeBtn.addEventListener('click', close);


  }
}


function close() {
  const Elm = event.target;

  const li = Elm.closest('li');
  // console.log(li);
  const modalElm = li.querySelector(".modal");
  // console.log(modalElm);

  modalElm.setAttribute('class', "modal fade");
  modalElm.style.display = 'none';

}


const ENTER = 13; // Enter Keycode
const evtblur = 'blur';
const evtClick = 'click';


function reqListener() {

  const localDataList = dataList.responseText;
  const results = JSON.parse(localDataList);
  const resultsTitle = results.board;

  const resultsTasks = resultsTitle.tasks;



  for (const result of resultsTitle) {
    //const listTitle = result.title;
    addList(result);




  }



}

const dataList = new XMLHttpRequest();


dataList.addEventListener("load", reqListener);
dataList.open("GET", "assets/board.json");
dataList.send();


function none() {
  const columns = document.querySelectorAll('.list-column');
  for (let column of columns) {
    column.style.display = 'none';

  }
  const bbtt = document.getElementById('hidee');
  bbtt.style.display = 'none';


}







