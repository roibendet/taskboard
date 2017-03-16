const listTemplate = `
    <header class="panel panel-default input-group">
      <p class="p-header panel-heading header-list"></p>
      <input maxlength="25" type="text" class="panel-heading hiddenMy input-heading">
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
      <button class="btn btn-default addlist card">Add a card...</button>
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
                  </select>
                </div>
                <div class="modal-body">
                  <label class="pull-left">Members:
                  </label>

                  <div class="form-check">
                    <div class="test form-control listofmembers"></div>
                  </div>

                </div>
                <div class="modal-body modal-bodymy">
                  <button type="button" class="btn btn-danger deletebtn deletemy">Delete Card</button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default closemy" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary savemy">Save changes</button>
                </div>
              </div>
            </div>
          `;
const member = `<h1 class="membertitle">
    Taskboard Members
  </h1>

  <ul class="list-group">
     
    
    
    
    <li class="list-group-item member addmember input-group">
      <input type="text" maxlength="25" id="addmemberinput" class="form-control" placeholder="Add new member">
      <span class="input-group-btn">
        <button class="btn btn-primary addmemberbtn" type="button">Add</button>
      </span>
    </li>
  </ul>`


const memberBtns = `
  <span></span>
  <input maxlength="25" type="text" class="membernameinput p-header panel-heading hiddenMy">
  <div class="pull-right membernameinputbtns">
  <button class="btn btn-info editmember">Edit</button>
  <button  class="btn btn-danger deletemember">Delete</button>
  <button class="btn btn-default cancelmember hiddenMy">Cancel</button>
  <button class="btn btn-success savemember hiddenMy">Save</button>
  </div>
  `

const memberInModal = `<input class="form-check-input pull-left" type="checkbox" value="">`;


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
let newName = '';

let modalMemberInput = {};
let memberInModalElm;

let memberchecked = [];
let memberunchecked = [];
// let temp = [];
let newmembers = [];
let newermembers = [];


// ----------------------------------JSONS----------------------------------------------

// board JSON
function appDataBoard(data) {
  console.log('appDataBoard', counter++);
  const dataList = data.currentTarget;

  const localDataList = dataList.responseText;
  const results = JSON.parse(localDataList);

  appData.lists = results.board;

  allJSONS.push(True);
  // console.info('appDataBoard', 'Done');
  isAllDataReady();


}
function getBoardData() {
  console.log('getBoardData', counter++);


  const dataList = new XMLHttpRequest();

  dataList.addEventListener("load", appDataBoard);
  dataList.open("GET", "assets/board-advanced.json");
  // dataList.open("GET", "assets/board.json");
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

  // console.log('appDataMember', 'Done');
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
function addCard2appDataWithID(listID, CardID) {

  appData.lists.forEach((item) => {
    if (item.id === listID) {

      const newCard = {
        id: `${CardID}`,
        members: [],
        text: "i'm new"
      };

      item.tasks.push(newCard);
      console.info(newCard.id);


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
    id: `${newID}`
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
function saveText2appData(cardID, listID, newText) {

  appData.lists.forEach((list) => {
    if (list.id === listID) {
      list.tasks.forEach((task) => {
        if (task.id === cardID) {
          task.text = newText
        }
      })
    }
  })
}
function checkedMemberInModal2appData(currentListID, currentCardID, memberChecked) {

  appData.lists.forEach((list) => {
    if (list.id === currentListID) {
      list.tasks.forEach((task) => {
        if (task.id === currentCardID) {
          task.members = {};
          task.members = memberChecked;
        }
      })
    }
  });
}
function deleteCardFromappData(currentListID, currentCardID) {
  appData.lists.forEach((list) => {
    if (list.id === currentListID) {
      list.tasks.forEach((task, i) => {
        if (task.id === currentCardID) {
          list.tasks.splice(i, 1);
        }
      })
    }
  });
}
function moveCardToOtherList2appData(indexOfCurrentList, indexOfCurrentCard, indexOfSelectedList, currentCardID) {


  appData.lists[indexOfCurrentList].tasks.forEach((task, index) => {
    if (task.id === currentCardID) {
      indexOfCurrentCard = index;
      appData.lists[indexOfSelectedList].tasks.push(appData.lists[indexOfCurrentList].tasks[indexOfCurrentCard]);
      appData.lists[indexOfCurrentList].tasks.splice(indexOfCurrentCard, 1);
    }
  });
}


addListEvents();


/**
 *
 * UI Management
 */

function ID2Name(data) {
  data.forEach((memberIndata) => {
    appData.members.forEach((member) => {
      if (memberIndata === member.id) {
        return newmembers.push(member.name);
      }
    });
  });

}


/**
 *
 * @Board Page
 */
function addList(data) {
  const listName = `list Name ${addListCounter}`;

  const addListBtn = document.getElementById('btnClm');
  const emptyList = document.createElement('div');
  emptyList.className = 'list-column list-group';
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
  const newCardSpan = document.createElement('span');
  newCard.appendChild(newCardSpan);
  newCard.setAttribute('class', 'liCard list-group-item');
  const editCardBtn = document.createElement('button');
  editCardBtn.setAttribute('class', 'editCard btn btn btn-primary btn-xs');
  editCardBtn.setAttribute('data-toggle', 'modal');
  editCardBtn.setAttribute('data-target', 'myModal');
  editCardBtn.innerHTML = 'Edit List';
  newCard.innerHTML = "<span>i'm new</span>";

  targetUl.appendChild(newCard);
  newCard.appendChild(editCardBtn);

  const modal = document.createElement('div');
  modal.innerHTML = cardTemplate;
  modal.setAttribute('class', "modal fade");
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  newCard.appendChild(modal);

  if (data) {


    newCard.setAttribute('uniqueID', data.id);
    newCard.querySelector('span').textContent = data.text;
    newCard.appendChild(editCardBtn);
    newCard.appendChild(modal);
    targetUl.querySelector('.list').appendChild(newCard);
    const members = data.members;
    ID2Name(members);
    const title = newmembers;
    if (data.members) {

      const bottom = document.createElement('div');
      bottom.setAttribute('class', 'bottomMy');

      for (const member of newmembers) {

        const spanElm = document.createElement('span');
        spanElm.setAttribute('title', newmembers.toString());

        spanElm.setAttribute('class', 'label label-primary pull-right');

        bottom.appendChild(spanElm);
        let initial = '';

        const currentName = member.split(' ');

        for (const namePart of currentName) {


          initial += namePart.charAt(0);
        }
        newmembers = [];


        spanElm.textContent += initial;
        newCard.appendChild(bottom);

      }

    }


  }

  if (!data) {


    const targetList = targetUl.closest('.list-column');
    const listID = targetList.getAttribute('uniqueID');

    let newCardID = uuid();
    newCard.setAttribute('uniqueID', newCardID);
    addCard2appDataWithID(listID, newCardID);

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
    // console.info(currentListID);
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
  const currentUl = currentBtn.closest('.input-group-btn').querySelector('ul');
  currentUl.classList.toggle('show');

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
      let currentListID = currentList.getAttribute('uniqueID');
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
  const saveBtns = targetP.querySelectorAll('.savemy');

  for (let saveBtn of saveBtns) {
    saveBtn.addEventListener('click', save);
  }

  const delBtns = targetP.querySelectorAll('.deletemy');

  for (let delBtn of delBtns) {
    delBtn.addEventListener('click', deleteCard)
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
function deleteCard() {
  let currentBtn = event.target;
  let currentCardID = currentBtn.closest('.liCard').getAttribute('uniqueID');
  let currentListID = currentBtn.closest('.list-column').getAttribute('uniqueID');
  deleteCardFromappData(currentListID, currentCardID);
  close();
  listView();
}
function save() {
  let currentBtn = event.target;
  let modalContent = currentBtn.closest('.modal-content');
  let textareaNew = modalContent.querySelector('textarea');
  let currentCardID = currentBtn.closest('.liCard').getAttribute('uniqueID');
  let currentListID = currentBtn.closest('.list-column').getAttribute('uniqueID');
  let allMemberInputs = currentBtn.closest('.liCard').querySelectorAll(`[uniqueID]`);
  let currentCardElm = currentBtn.closest('.liCard');
  // Find the current checked members in the modal
  allMemberInputs.forEach((memberInput) => {
    if (memberInput.checked === true) {
      memberchecked.push(memberInput.getAttribute('uniqueID'));

    }
  });


  // Save the current checked members in the modal in appData
  checkedMemberInModal2appData(currentListID, currentCardID, memberchecked);
  saveText2appData(currentCardID, currentListID, textareaNew.value);


// Find the index of current list
  let indexOfCurrentList = -1;
  let indexOfCurrentCard = -1;
  appData.lists.forEach((list, index) => {
    if (list.id === currentListID) {
      indexOfCurrentList = index;
    }
  });
  const movetoselectPElm = modalContent.querySelector('.movetoselect');
  // Index number of selected list destination
  let indexOfSelectedList = movetoselectPElm.selectedIndex;

  if (indexOfSelectedList !== indexOfCurrentList) {
    // delete Task from appData
    moveCardToOtherList2appData(indexOfCurrentList, indexOfCurrentCard, indexOfSelectedList, currentCardID);


  }


  close.call(event.target);


  listView();

}
function editCardDisplay(ev) {


  if (ev.type === 'click') {
    const Elm = ev.target;

    const li = Elm.closest('li');

    const modalElm = li.querySelector(".modal");


    modalElm.setAttribute('class', "modal fade in");
    modalElm.style.display = 'block';

// Find the text inside the card and present it in the modal
    const currentCardID = li.getAttribute('uniqueID');
    const currentListID = li.closest('.list-column').getAttribute('uniqueID');
    modal(currentCardID, currentListID);

  }
}
function modal(currentCardID, currentListID) {
  let currentList = {};
  let iList = -1;
  appData.lists.forEach((list, index) => {
    if (list.id === currentListID) {
      currentList = list;
      iList = index;
    }
  });
  let currentCard = {};
  let i = -1;
  const allLists = document.querySelectorAll('.list-column');
  const allCardsInList = allLists[iList].querySelectorAll('.liCard');

  // current Card Finder
  currentList.tasks.forEach((card, index) => {
    if (card.id === currentCardID) {
      currentCard = card;
      i = index;
    }

  });

  // insert data to text area from appdata
  const currentCardUI = allCardsInList[i];
  let textformodal = currentCardUI.querySelector('textarea');
  textformodal.value = currentCard.text;
  const movetoselectPElm = currentCardUI.querySelector('.movetoselect');


  // Creating Move To section from current list to other list


  appData.lists.forEach((list) => {
    const listOption = document.createElement('option');
    listOption.setAttribute('uniqueID', list.id);
    listOption.textContent = list.title;
    listOption.value = list.id;
    movetoselectPElm.appendChild(listOption);
    if (currentListID === listOption.getAttribute('uniqueID')) {
      listOption.selected = 'selected';

    }
  });


// items for member part of the modal
  const listOfMembers = currentCardUI.querySelector('.listofmembers');
  let checkedMembers = [];
// Creating members in modal
  appData.members.forEach((member) => {
    memberInModalElm = document.createElement('label');
    memberInModalElm.setAttribute('class', 'form-check-label');
    memberInModalElm.innerHTML += member.name + memberInModal;
    listOfMembers.appendChild(memberInModalElm);
    modalMemberInput = memberInModalElm.querySelector('input');
    modalMemberInput.setAttribute('uniqueID', member.id);

    // Finding and converting Members ID to name
    appData.lists.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.id === currentCardID) {
          checkedMembers = task.members;
        }
      })
    });
    ID2Name(checkedMembers);
    newmembers.forEach((member) => {
      if (memberInModalElm.textContent === member) {
        modalMemberInput.checked = true;
      }
    });
  });


}
function close() {
  newmembers = [];
  memberchecked = [];
  memberunchecked = [];

  // temp = [];
  let Elm = event.target;

  let li = Elm.closest('li');
  let modalElm = li.querySelector(".modal");
  modalElm.setAttribute('class', "modal fade");
  modalElm.style.display = 'none';
  const listOfMembers = modalElm.querySelector('.listofmembers');





  listOfMembers.innerHTML = '';
  const movetoselectPElm = li.querySelector('.movetoselect');
  movetoselectPElm.innerHTML = '';

}


/**
 *
 * @Members Page
 */
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

  if (memberName.textContent.length === 0) {
    memberName.textContent = 'No Name';
  }
  let newMemberName = memberName.textContent;


// Insert Member to DOM
  listMember.insertBefore(member, addMemberItem);


// Adding Event Listener
  let deleteBtnMember = member.querySelector('.deletemember');
  deleteBtnMember.addEventListener('click', () => deleteMember(event));
  let editBtnMember = member.querySelector('.editmember');

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
  addMemberinputElm.value = '';

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

  targetP.style.display = 'block';
  const saveBtn = targetFather.querySelector('.savemember');
  saveBtn.addEventListener('click', () => {
    let currentMemberID = targetFather.getAttribute('uniqueID');
    targetP.style.display = '';
    targetFather.querySelector('span').textContent = targetInput.value;
    targetInput.style.display = 'none';
    targetFather.querySelector('span').style.display = 'inline-block';
    let newMemberName = targetFather.querySelector('span').textContent;
    toggleBtns(event);
    saveMemberName(currentMemberID, newMemberName);
  });
  const cancelBtn = targetFather.querySelector('.cancelmember');
  cancelBtn.addEventListener('click', () => {
    targetP.style.display = '';

    targetInput.style.display = 'none';

    targetFather.querySelector('span').style.display = 'inline-block';
    toggleBtns(event);

  });
}


/**
 *
 * @Operating UI
 */
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


  if (currentHash === '#members') {

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
  if ((currentHash !== '#board' && currentHash !== '#members') || currentHash === '') {
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

  // const deleteBtns = document.querySelectorAll('.deletemember');


}
function multiJSON() {
  console.info('multiJSON', counter++);
  window.addEventListener('hashchange', () => pageByURL());
  getBoardData();
  getMemberData();

}
multiJSON();



















