
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
  const addListBtn = document.getElementById('btnClm');

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
  // console.log(currentBtn);
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


// ----------------------------------JSONS----------------------------------------------

// board JSON
function reqListener(data) {
  const dataList = data.currentTarget;

  const localDataList = dataList.responseText;
  const results = JSON.parse(localDataList);
  const resultsTitle = results.board;

  // const resultsTasks = resultsTitle.tasks;


  for (const result of resultsTitle) {
    //const listTitle = result.title;
    addList(result);


  }

}
function dataListinit() {
  const dataList = new XMLHttpRequest();

  dataList.addEventListener("load", reqListener);
  dataList.open("GET", "assets/board.json");
  dataList.send();

}
dataListinit();

// Members JSON


function MembersreqListener(data) {
  const membersList = data.currentTarget;
  const localDataList = membersList.responseText;

  const results = JSON.parse(localDataList);

  const resultsNames = results.members;

  for (const name of resultsNames) {
    addMember(name);
  }


}
function memberListinit() {

  const membersList = new XMLHttpRequest();
  membersList.addEventListener("load", MembersreqListener);
  membersList.open("GET", "assets/members.json");
  membersList.send();

}
memberListinit();

// ---------------------------------End of JSON------------------------------------------


const listMember = document.querySelector('.list-group');
const addMemberItem = document.querySelector('.addmember');

function addMember(data) {


  const member = document.createElement('li');
  member.className = 'list-group-item member';
  member.textContent = addMemberinput.value;
  listMember.insertBefore(member, addMemberItem);

  if (data) {
    member.textContent = data.name;
  }

}





const addMemberinput = document.getElementById('addmemberinput');

const addMemberBtn = document.querySelector('.addmemberbtn');
addMemberBtn.addEventListener('click', () => addMember());
addMemberinput.addEventListener('keydown', () => {
    if (event.keyCode === ENTER) {
      addMember();
      addMemberinput.value = '';
    }
  }
);

const temp = document.querySelector('.editmember');
// console.info(temp);
temp.addEventListener("click", () => tempp());

function tempp() {
 // console.info(event.target);

}


const page = document.querySelector('.nav-top');


function currentPage(data) {


  const currentStr = data.slice(1);

  // Find the active Elm
  const currentActive = page.querySelector('.active');

  // Find the not action Elm
  const currentNotActive = page.querySelector(`.${currentStr}`);

  currentActive.classList.remove('active');
  // Add Active effect to current target

  currentNotActive.classList.add('active');

}

window.addEventListener('hashchange', () => {
  const currentHash = window.location.hash;


  if (currentHash === '#member') {
    memberView();
    currentPage(currentHash);

  }
  if (currentHash === '#board') {
    listView();
    currentPage(currentHash);
  }


});


function listView() {

  container.innerHTML = `<button id="btnClm" class="btn btn-default addlist" type="button">Add a list</button>`;

  const addListBtn = document.getElementById('btnClm');
  addListBtn.addEventListener('click', () => addList());
  dataListinit();

}
function memberView() {
  // console.info('work member');
  container.innerHTML = `<h4>hi</h4>`;


}



