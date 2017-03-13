const listTemplate = `
    <header class="panel panel-default input-group">
      <p class="p-header panel-heading header-list"></p>
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
const member = `<h1 class="membertitle">
    Taskboard Members
  </h1>

  <ul class="list-group">
     
    
    
    
    <li class="list-group-item member addmember input-group">
      <input type="text" id="addmemberinput" class="form-control" placeholder="Add new member">
      <span class="input-group-btn">
        <button class="btn btn-primary addmemberbtn" type="button">Add</button>
      </span>
    </li>
  </ul>`


const memberBtns = `
  <span></span>
  <input maxlength="15" type="text" class="membernameinput p-header panel-heading hiddenMy">
  <div class="pull-right membernameinputbtns">
  <button class="btn btn-info editmember">Edit</button>
  <button  class="btn btn-danger deletemember">Delete</button>
  <button class="btn btn-default cancelmember hiddenMy">Cancel</button>
  <button class="btn btn-success savemember hiddenMy">Save</button>
  </div>
  `


const addListBtnElm = `<button id="btnClm" class="btn btn-default addlist" type="button">Add a list</button>`
const appData = {
  lists: [],
  members: []
};
let counter = 1;
const container = document.getElementById('container');
const ENTER = 13;
const evtblur = 'blur';
const evtClick = 'click';
const True = 'true';
const allJSONS = [];
const untitled = 'Untitled list';
let addListCounter = 1;


// ----------------------------------JSONS----------------------------------------------

// board JSON
function appDataBoard(data) {
  console.log('appDataBoard', counter++);
  const dataList = data.currentTarget;

  const localDataList = dataList.responseText;
  const results = JSON.parse(localDataList);
  const resultsTitle = results.board;
  appData.lists = results.board;
  // console.info(appData);
  allJSONS.push(True);
  console.info('appDataBoard', 'Done');
  isAllDataReady();

  // pageByURL();
  /*for (const result of resultsTitle) {

   addList(result);

   }*/

}
function getBoardData() {
  console.log('getBoardData', counter++);


  const dataList = new XMLHttpRequest();

  dataList.addEventListener("load", appDataBoard);
  dataList.open("GET", "assets/board.json");
  dataList.send();


}
// Members JSON
function appDataMember(data) {
  console.log('appDataMember', counter++);

  const membersList = data.currentTarget;
  const localDataList = membersList.responseText;
  const results = JSON.parse(localDataList);
  appData.members = results.members;

  allJSONS.push(True);

  console.log('appDataMember', 'Done');
  isAllDataReady();

}
// Members JSON loader
function getMemberData() {

  console.log('getMemberData', counter++);

  const membersList = new XMLHttpRequest();
  membersList.addEventListener("load", appDataMember);
  membersList.open("GET", "assets/members.json");
  membersList.send();

}

// ---------------------------------End of JSON------------------------------------------


/**
 *
 * @appData Management
 */
function isAllDataReady() {
  console.info('isAllDataReady', counter++);
  if (allJSONS[0] && allJSONS[1]) {
    pageByURL();
  }
}
function addList2appDataWithID(emptyList) {
  let newID = uuid();

  let newList = {
    id: `${newID}`,
    tasks: [],
    title: `list Name ${addListCounter++}`
  };

  emptyList.setAttribute("uniqueID", newList.id);
  appData.lists.push(newList);
  console.info('after', newList.id);
}
function addCard2appDataWithID(listID) {

  appData.lists.forEach((item) => {
    if (item.id === listID) {

      const newCard = {
        members: [],
        text: "i'm new"
      };
      item.tasks.push(newCard);

    }
  });
}
function editedTitleName2appData(currentListID, NameAfter) {

  appData.lists.forEach((item) => {
    if (item.id === currentListID) {
      item.title = NameAfter;
    }


  });

}
function removeList2appData(currentListID) {
  appData.lists.forEach((item, index) => {
    if (item.id === currentListID) {
      appData.lists.splice(index, 1);
    }
  });

}
function deleteMemberappData(memberName) {
  appData.members.forEach((member) => {
    console.info(member.name);
    if (member.name === memberName) {
      let index = appData.members.indexOf(member);
      appData.members.splice(index, 1)
    }
  });
}
function addMember2appData(newMemberName, member) {
  let newID = uuid();
  const memberobj = {
    name: '',
    id:`${newID}`
  };
  memberobj.name = newMemberName;
  member.setAttribute('uniqueID', newID);
  appData.members.push(memberobj);

}

function saveMemberName(currentMemberID, memberNewName) {
// console.info(currentMemberID);
// console.info(appData.members);
appData.members.forEach((member) => {
  if (currentMemberID === member.id) {
    member.name = memberNewName;
  // console.info('got it' , member.name);
  }

})
}


addListEvents();


/**
 *
 * UI Management
 */
function addList(data) {
  const listName = `list Name ${addListCounter}`;

  const addListBtn = document.getElementById('btnClm');
  const emptyList = document.createElement('div');
  emptyList.className = 'list-column';
  emptyList.innerHTML = listTemplate;
  emptyList.querySelector('.p-header').innerHTML = listName;

  container.insertBefore(emptyList, addListBtn);

  if (data) {
    const titleHead = emptyList.querySelector('.p-header');
    titleHead.innerHTML = data.title;

    // For each task, create card
    const tasks = data.tasks;
    for (const task of tasks) {
      addCard(emptyList, task);

    }
    if (data.id) {

      emptyList.setAttribute("uniqueID", data.id);

    }

  }
  if (!data) {


    addList2appDataWithID(emptyList);

  }


  addListEvents(emptyList);

}
function addCardClickHandler(ev) {


  const currentBtn = ev.target;
  const currentList = currentBtn.closest('.list-column');
  const targetUL = currentList.querySelector('.list');


  addCard(targetUL);

}
function addCard(targetUl, data) {

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

    if (data.members) {
console.info('first', data.members);
console.info('second', appData.members);








      const title = data.members;
      const members = data.members;
      for (const member of members) {
        const spanElm = document.createElement('span');
        spanElm.setAttribute('class', 'label label-primary pull-right');
        spanElm.setAttribute('title', data.members);
        let initial = '';

        const currentName = member.split(' ');

        for (const namePart of currentName) {

          initial += namePart.charAt(0);
        }


        spanElm.textContent += initial;
        newCard.appendChild(spanElm);

      }


    }


  }

  if (!data) {


    const targetList = targetUl.closest('.list-column');


    const listID = targetList.getAttribute('uniqueID');
    console.info(listID);

    addCard2appDataWithID(listID);

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
    currentElm.textContent = 'Untitled list';

    editedTitleName2appData(untitled, untitled);
  }
  input.value = currentElm.textContent;
  // Focus the Input Element
  input.focus();


  input.addEventListener('keydown', eventhandeler);
  input.addEventListener('blur', eventhandeler);

  function eventhandeler(event) {

    let currentListID = event.target.closest('.list-column').getAttribute('uniqueID');
    console.info(currentListID);
    currentElm.focus();


    if (event.keyCode === ENTER) {
      let currentElmBefore = currentElm.innerHTML;
      currentElm.textContent = input.value;
      let currentElmAfter = currentElm.textContent;
      currentElm.className = 'p-header panel-heading header-list';
      input.className = 'hiddenMy';

      // editedTitleName2appData(currentElmBefore, currentElmAfter);
      editedTitleName2appData(currentListID, currentElmAfter);
      if (currentElm.textContent === '') {

        currentElm.textContent = 'Untitled list';
      }
    }


    if (event.type === evtblur) {
      const currentElmBefore = currentElm.innerHTML;
      currentElm.textContent = input.value;
      let currentElmAfter = currentElm.textContent;
      currentElm.className = 'p-header panel-heading header-list';
      input.className = 'hiddenMy';

      if (currentElm.textContent === '') {

        currentElm.textContent = 'Untitled list';
        currentElmAfter = currentElm.textContent;
      }
      editedTitleName2appData(currentListID, currentElmAfter);
    }
  }
}
function dropdownEdit() {

  const currentBtn = event.target;


  const currentP = currentBtn.closest('.input-group-btn');
  const currentUl = currentP.querySelector('ul');
  // const delBtn = currentUl.querySelector('li a');


  if (currentUl.style.display = 'none') {

    currentUl.style.display = 'block';
  }

  if (currentUl.style.display = 'block' && event.type === evtblur) {

    currentUl.style.display = 'none';

  }
}
function removeList() {

  const currentBtn = event.target;
  const currentUl = event.target.closest('ul');
  //console.log(localDataList);
  if (event.type === evtClick) {

    // Catch the header
    const currentHeader = currentBtn.closest('header');
    const titleName = currentHeader.querySelector('p').innerHTML;


    const isdelete = confirm(`Deleting , ${titleName}, Are u sure ?`);
    if (isdelete) {
      const currentList = currentBtn.closest('.list-column');
      let currentListID =  currentList.getAttribute('uniqueID');
      const main = currentBtn.closest('main');
      main.removeChild(currentList);
      // remove from appData

      removeList2appData(currentListID);


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
function addListEvents(target) {
  // console.log('addList', counter++);
  const targetP = target || document;

  // Find the header of a list
  const Lists = targetP.getElementsByClassName('header-list');
  const addCardBtns = targetP.querySelectorAll('.card');


  for (let addCardBtn of addCardBtns) {

    addCardBtn.addEventListener("click", addCardClickHandler);
  }

  const closeBtns = targetP.querySelectorAll('.closemy');

  for (let closeBtn of closeBtns) {
    closeBtn.addEventListener('click', close);
  }

  for (let list of Lists) {
    list.addEventListener("click", editName);
  }

  const Btns = targetP.getElementsByClassName('editbtn');

  for (let btn of Btns) {
    btn.addEventListener("click", dropdownEdit);

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


// ---------------------------------Member Page ------------------------------------------


function addMember(data) {
  console.info('add Member', counter++);

  // Creating Member
  const listMember = document.querySelector('.list-group');
  const addMemberItem = document.querySelector('.addmember');
  const addMemberinputElm = document.getElementById('addmemberinput');
  const member = document.createElement('li');
  member.className = 'list-group-item member';
  // member.textContent = addMemberinputElm.value;
  member.innerHTML = memberBtns;
  const memberName = member.querySelector('span');
  memberName.textContent = addMemberinputElm.value;
  let newMemberName = memberName.textContent;

// Insert Member to DOM
  listMember.insertBefore(member, addMemberItem);
  /* const memberobj = {
   name: ''
   };*/

// Adding Event Listener
  let deleteBtnMember = member.querySelector('.deletemember');
  deleteBtnMember.addEventListener('click', () => deleteMember(event));
  let editBtnMember = member.querySelector('.editmember');
  // console.info(editBtnMember);
  editBtnMember.addEventListener('click', () => editMember(event));

  if (data) {
    const memberName = member.querySelector('span');
    memberName.textContent = data.name;
    member.setAttribute('uniqueID', data.id);


  }
  // Add to appData.members
  if (!data) {
    addMember2appData(newMemberName, member);

  }

}
function deleteMember(event) {
  let deleteBtnMember = event.target;
  console.info(deleteBtnMember);
  let currentMember = deleteBtnMember.closest('li');
  const memberName = currentMember.querySelector('span').textContent;


  // Delete From appData
  deleteMemberappData(memberName);


  currentMember.remove();
}
function toggleBtns() {
  let editBtnMember = event.target;
  let allBtnsofLi = editBtnMember.closest('li').querySelectorAll('.btn');
  // console.info(allBtnsofLi);
  allBtnsofLi.forEach((btn) => {

    btn.classList.toggle('hiddenMy');

    // const currentOn = btn.querySelector('.')

  });
}
function editMember(event) {
  toggleBtns(event);
  const target = event.target;
console.info(target);
  const targetP = target.closest('.membernameinputbtns');

  const targetFather = targetP.parentNode;

  const targetInput = targetFather.querySelector('.membernameinput');

  targetInput.style.display = 'inline-block';

  targetInput.focus();

  targetInput.value = targetFather.querySelector('span').textContent;

  targetFather.querySelector('span').style.display = 'none';
  // let cancelBtnMember = targetP.querySelector('.cancelmember');
  targetP.style.display = 'block';
  const saveBtn = targetFather.querySelector('.savemember');
  saveBtn.addEventListener('click', () => {
    let currentMemberID = targetFather.getAttribute('uniqueID');
    // console.info(currentMemberID);


    targetFather.querySelector('span').textContent = targetInput.value;
    targetInput.style.display = 'none';
    targetFather.querySelector('span').style.display = 'inline-block';
    let newMemberName = targetFather.querySelector('span').textContent;
    toggleBtns(event);
    saveMemberName(currentMemberID, newMemberName);
  });
  const cancelBtn = targetFather.querySelector('.cancelmember');
  cancelBtn.addEventListener('click', () => {

    //targetFather.querySelector('span').textContent = targetInput.value;
    targetInput.style.display = 'none';
    targetFather.classList.toggle('hiddenMy');
    targetFather.querySelector('span').style.display = 'inline-block';
    toggleBtns(event);

  });
}
function currentPage(data) {
  const topNav = document.querySelector('.nav-top');
// console.log('currentPage', counter++);

  const currentStr = data.slice(1);

  // Find the active Elm
  const currentActive = topNav.querySelector('.active');

  // Find the not action Elm
  const currentNotActive = topNav.querySelector(`.${currentStr}`);

  currentActive.classList.remove('active');
  // Add Active effect to current target

  currentNotActive.classList.add('active');

}
function pageByURL() {
  // window.addEventListener('hashchange', () => pageByURL());
  console.log('pageByURL', counter++);
  const currentHash = window.location.hash;


  if (currentHash === '#member') {

    memberView();
    container.classList.add('memberview');
    currentPage(currentHash);

  }
  if (currentHash === '#board') {


    // console.info('board');
    listView();
    container.classList.remove('memberview');
    // getBoardData();
    currentPage(currentHash);

  }
  if ((currentHash !== '#board' && currentHash !== '#member') || currentHash === '') {
    window.location.hash = '#board';

  }
  /*  if (!currentHash) {
   window.location.hash = '#board'
   }*/
  /* else {
   window.location.hash = '#board'
   }*/


}
function listView() {
  console.log('listView', counter++);

  container.innerHTML = addListBtnElm;
  const addListBtn = document.getElementById('btnClm');
//  addListBtn.addEventListener('click', () => addList());
  // getBoardData();
  // const addListBtn = document.getElementById('btnClm');
  addListBtn.addEventListener('click', () => addList());
  for (const result of appData.lists) {
    // console.info(result);
    addList(result);
  }

}
function memberView() {
  console.log('memberView', counter++);


  container.innerHTML = member;

  const addMemberinputElm = document.getElementById('addmemberinput');
  const addMemberBtn = document.querySelector('.addmemberbtn');

  addMemberBtn.addEventListener('click', () => addMember());
  addMemberinputElm.addEventListener('keydown', () => {
      if (event.keyCode === ENTER) {
        addMember();
        addMemberinputElm.value = '';
      }
    }
  );

  for (const result of appData.members) {
    addMember(result);
  }

  const deleteBtns = document.querySelectorAll('.deletemember');
  // console.info(deleteBtns);

}
function multiJSON() {
  console.info('multiJSON', counter++);
  window.addEventListener('hashchange', () => pageByURL());
  getBoardData();
  getMemberData();

}
multiJSON();





