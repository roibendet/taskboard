


(function () {
  let counter = 1;
  const container = document.getElementById('container');
  const allJSONS = [];
  let memberchecked = [];
  let newmembers = [];
  // let addListCounter = 1;




// board JSON
  function appDataBoard(data) {
    // console.log('appDataBoard', counter++);
    const dataList = data.currentTarget;
    const localDataList = dataList.responseText;
    const results = JSON.parse(localDataList);
    MODEL.firstLoadBoard(results.board);
    allJSONS.push('true');
    if (MODEL.isAllDataReady) {
      MODEL.saveToStorage();
      pageByURL();
    }
  }

  function getBoardData() {
    // console.log('getBoardData', counter++);
    const dataList = new XMLHttpRequest();
    dataList.addEventListener("load", appDataBoard);
    dataList.open("GET", "assets/board-advanced.json");
    dataList.send();
  }

// Members JSON
  function appDataMember(data) {
    // console.log('appDataMember', counter++);
    const membersList = data.currentTarget;
    const localDataList = membersList.responseText;
    const results = JSON.parse(localDataList);
    MODEL.firstLoadMembers(results.members);
    allJSONS.push('true');
    if (MODEL.isAllDataReady) {
      MODEL.saveToStorage();
      pageByURL();
    }
  }

// Members JSON loader
  function getMemberData() {
    // console.log('getMemberData', counter++);
    const membersList = new XMLHttpRequest();
    membersList.addEventListener("load", appDataMember);
    membersList.open("GET", "assets/members.json");
    membersList.send();
  }

  addListEvents();
  /**
   *
   * UI Management
   */
  function ID2Name(data) {
    data.forEach((memberIndata) => {
      const members = MODEL.getMembers();
      members.forEach((member) => {
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
    const listTemplate = `<header class="panel panel-default input-group">
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

    </header><div>
      <ul class="list"></ul>
    </div><footer>
      <button class="btn btn-default addlist card">Add a card...</button>
    </footer>
  `;

    let listName = `list Name`;

    const addListBtn = document.getElementById('btnClm');
    const emptyList = document.createElement('div');
    emptyList.className = 'list-column list-group';
    emptyList.innerHTML = listTemplate;
    container.insertBefore(emptyList, addListBtn);
    if (data) {
      const titleHead = emptyList.querySelector('.p-header');
      titleHead.innerHTML = data.title;
      // For each task, create card
      let tasks = MODEL.getListTasksByID(data.id);
      tasks.forEach((task) => {
        addCard(emptyList, task);
      });

      if (data.id) {
        emptyList.setAttribute("uniqueID", data.id);
      }
    }
    if (!data) {
      // listName = `list Name ${MODEL.addListCounter()}`;
      emptyList.querySelector('.p-header').innerHTML = listName;

      MODEL.addList2appDataWithID(emptyList);
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
    const cardTemplate = `<div class="modal-dialog" role="document">
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
    const newCard = document.createElement('li');
    const newCardSpan = document.createElement('span');
    newCard.appendChild(newCardSpan);
    newCard.setAttribute('class', 'liCard list-group-item');
    // newCard.setAttribute('draggable', true);
    const editCardBtn = document.createElement('button');
    editCardBtn.setAttribute('class', 'editCard btn btn-info btn-xs');
    editCardBtn.setAttribute('data-toggle', 'modal');
    editCardBtn.setAttribute('data-target', 'myModal');
    editCardBtn.innerHTML = 'Edit Card';
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
      MODEL.addCard2appDataWithID(listID, newCardID);
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
      MODEL.editedTitleName2appData('Untitled list', 'Untitled list');
    }
    input.value = currentElm.textContent;
    // Focus the Input Element
    input.focus();
    input.addEventListener('keydown', eventhandeler);
    input.addEventListener('blur', eventhandeler);

    function eventhandeler(event) {
      let currentListID = event.target.closest('.list-column').getAttribute('uniqueID');
      currentElm.focus();
      if (event.keyCode === 13) {
        currentElm.textContent = input.value;
        let currentElmAfter = currentElm.textContent;
        currentElm.className = 'p-header panel-heading header-list';
        input.className = 'hiddenMy';
        MODEL.editedTitleName2appData(currentListID, currentElmAfter);
        if (currentElm.textContent === '') {

          currentElm.textContent = 'Untitled list';
        }
      }
      if (event.type === 'blur') {
        currentElm.textContent = input.value;
        let currentElmAfter = currentElm.textContent;
        currentElm.className = 'p-header panel-heading header-list';
        input.className = 'hiddenMy';
        if (currentElm.textContent === '') {
          currentElm.textContent = 'Untitled list';
          currentElmAfter = currentElm.textContent;
        }
        MODEL.editedTitleName2appData(currentListID, currentElmAfter);
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
    if (event.type === 'click') {
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
        MODEL.removeList2appData(currentListID);
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
    let dragged;
    let targett;

   /* target.addEventListener("dragstart", function (event) {
      // store a ref. on the dragged elem
      dragged = event.target;
      // make it half transparent
      // event.target.style.opacity = .5;
      console.info('start', dragged);
    }, false);

    document.addEventListener("dragenter", function (event) {
      // highlight potential drop target when the draggable element enters it
      // console.info(event.target);
      if (event.target.className == "liCard list-group-item") {
        event.target.style.background = "purple";
        // console.info('target', event.target);
      }

    }, false);


    target.addEventListener("dragleave", function (event) {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.className == "liCard list-group-item") {
        event.target.style.background = "";
      }

    }, false);


    document.addEventListener("dragend", function (event) {
      // reset background of potential drop target when the draggable element leaves it
      // console.info(event.currentTarget);
      if (event.target.className == "liCard list-group-item") {
        event.target.style.background = "";
        console.info('this is the target', event.target);
      }

    }, false);

    target.closest('div').addEventListener("drop", function (event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if (event.target.className == "liCard list-group-item") {
        event.target.style.background = "";
        console.info('dragged', dragged);
        targett = event.target;
        console.info('target', targett);
        // dragged.parentNode.removeChild(dragged);
        // event.target.appendChild(dragged);
      }

    }, false);*/
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
    MODEL.deleteCardFromappData(currentListID, currentCardID);
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
    // Find the current checked members in the modal
    allMemberInputs.forEach((memberInput) => {
      if (memberInput.checked === true) {
        memberchecked.push(memberInput.getAttribute('uniqueID'));
      }
    });
    // Save the current checked members in the modal in appData
    MODEL.checkedMemberInModal2appData(currentListID, currentCardID, memberchecked);
    MODEL.saveText2appData(currentCardID, currentListID, textareaNew.value);
// Find the index of current list
    let indexOfCurrentList = -1;
    let indexOfCurrentCard = -1;
    const lists = MODEL.getLists();
    lists.forEach((list, index) => {
      if (list.id === currentListID) {
        indexOfCurrentList = index;
      }
    });
    const movetoselectPElm = modalContent.querySelector('.movetoselect');
    // Index number of selected list destination
    let indexOfSelectedList = movetoselectPElm.selectedIndex;
    if (indexOfSelectedList !== indexOfCurrentList) {
      // delete Task from appData
      MODEL.moveCardToOtherList2appData(indexOfCurrentList, indexOfCurrentCard, indexOfSelectedList, currentCardID);
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
    const memberInModal = `<input class="form-check-input pull-left inputMy" type="checkbox" value="">`;
    // All Lists
    const lists = MODEL.getLists();
    // current Card Finder

    // insert data to text area from appData
    const currentCardUI = document.querySelector(`[uniqueID = "${currentCardID}"]`);
    let textForModal = currentCardUI.querySelector('textarea');
    textForModal.value = MODEL.getTaskById(currentCardID).text;
    const movetoselectPElm = currentCardUI.querySelector('.movetoselect');
    // Creating Move To section from current list to other list
    // const lists = MODEL.getLists();
    lists.forEach((list) => {
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
    const members = MODEL.getMembers();
// Creating members in modal
    members.forEach((member) => {
      let modalMemberInput = {};
      let memberInModalElm;
      memberInModalElm = document.createElement('label');
      memberInModalElm.setAttribute('class', 'form-check-label');
      memberInModalElm.innerHTML += member.name + memberInModal;
      listOfMembers.appendChild(memberInModalElm);
      modalMemberInput = memberInModalElm.querySelector('input');
      modalMemberInput.setAttribute('uniqueID', member.id);
      // Finding and converting Members ID to name
      checkedMembers = MODEL.getTaskById(currentCardID).members;
      // }
      ID2Name(checkedMembers);
      newmembers.forEach((member) => {
        if (memberInModalElm.textContent === member) {
          modalMemberInput.checked = true;
        }     });    });  }
  function close() {
    newmembers = [];
    memberchecked = [];
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
    const memberBtns = `<span></span><input maxlength="25" type="text" class="membernameinput p-header panel-heading hiddenMy"><div class="pull-right membernameinputbtns">
  <button class="btn btn-info editmember">Edit</button>
  <button  class="btn btn-danger deletemember">Delete</button>
  <button class="btn btn-default cancelmember hiddenMy">Cancel</button>
  <button class="btn btn-success savemember hiddenMy">Save</button>
  </div>
  `;
    // console.info('add Member', counter++);
    // Creating Member
    const listMember = document.querySelector('.list-group');
    const addMemberItem = document.querySelector('.addmember');
    const addMemberinputElm = document.getElementById('addmemberinput');
    const member = document.createElement('li');
    member.className = 'list-group-item member';
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
      MODEL.addMember2appData(newMemberName, member);
    }
    addMemberinputElm.value = '';
  }

  function deleteMember(event) {
    let deleteBtnMember = event.target;
    let currentMember = deleteBtnMember.closest('li');
    const memberName = currentMember.querySelector('span').textContent;
    // Delete From appData
    MODEL.deleteMemberappData(memberName);
    currentMember.remove();
  }
  function toggleBtns() {
    let editBtnMember = event.target;
    let allBtnsofLi = editBtnMember.closest('li').querySelectorAll('.btn');
    allBtnsofLi.forEach((btn) => {
      console.info(btn);
      btn.classList.toggle('hiddenMy');
    });
  }

  function editMember(event) {
    const target = event.target;
    const targetP = target.closest('.membernameinputbtns');
    const targetFather = targetP.parentNode;
    const targetInput = targetFather.querySelector('.membernameinput');
    targetInput.style.display = 'inline-block';
    targetInput.focus();
    targetInput.value = targetFather.querySelector('span').textContent;
    const Btns = targetP.querySelectorAll('button');
    targetFather.querySelector('span').style.display = 'none';
    toggleBtns(event);
    targetP.style.display = 'block';
    const saveBtn = targetFather.querySelector('.savemember');
    saveBtn.addEventListener('click', () => {
      let currentMemberID = targetFather.getAttribute('uniqueID');
      targetP.style.display = '';
      targetFather.querySelector('span').textContent = targetInput.value;
      targetInput.style.display = 'none';
      targetFather.querySelector('span').style.display = 'inline-block';
      let newMemberName = targetFather.querySelector('span').textContent;
      Btns[0].classList.remove('hiddenMy');
      Btns[1].classList.remove('hiddenMy');
      Btns[2].classList.add('hiddenMy');
      Btns[3].classList.add('hiddenMy');
      MODEL.saveMemberName(currentMemberID, newMemberName);
    });
    const cancelBtn = targetFather.querySelector('.cancelmember');
    cancelBtn.addEventListener('click', () => {

      // targetP.classList.toggle('hiddenMy');
      targetP.style.display = '';
      Btns[0].classList.remove('hiddenMy');
      Btns[1].classList.remove('hiddenMy');
      Btns[2].classList.add('hiddenMy');
      Btns[3].classList.add('hiddenMy');


      targetInput.style.display = 'none';
      // targetP.removeAttribute('style.display');
      targetFather.querySelector('span').style.display = 'initial';

      // console.info(targetP);


      // toggleBtns(event);

    });
  }

  /**
   *
   * @Operating UI
   */
  function currentPage(data) {
    const topNav = document.querySelector('.nav-top');
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
    // console.log('pageByURL', counter++);
    const currentHash = window.location.hash;
    if (currentHash === '#members') {
      memberView();
      container.classList.add('memberview');
      currentPage(currentHash);
    }
    if (currentHash === '#board') {
      listView();
      container.classList.remove('memberview');
      currentPage(currentHash);
    }
    if ((currentHash !== '#board' && currentHash !== '#members') || currentHash === '') {
      window.location.hash = '#board';
    }
  }

  function listView() {
    const addListBtnElm = `<button id="btnClm" class="btn btn-info addlist" type="button"><span>Add a list</span></button>`;
    const lists = MODEL.getLists();
    // console.log('listView', counter++);
    container.innerHTML = addListBtnElm;
    const addListBtn = document.getElementById('btnClm');
    addListBtn.addEventListener('click', () => addList());
    lists.forEach((list) => {
      addList(list);
    });
  }
  function memberView() {
    const member = `<h1 class="membertitle">
    Taskboard Members
  </h1><ul class="list-group">
     
    
    
    
    <li class="list-group-item member addmember input-group">
      <input type="text" maxlength="25" id="addmemberinput" class="form-control" placeholder="Add new member">
      <span class="input-group-btn">
        <button class="btn btn-primary addmemberbtn" type="button">Add</button>
      </span>
    </li>
  </ul>`;
    // console.log('memberView', counter++);
    container.innerHTML = member;
    const addMemberinputElm = document.getElementById('addmemberinput');
    const addMemberBtn = document.querySelector('.addmemberbtn');
    addMemberBtn.addEventListener('click', () => addMember());
    addMemberinputElm.addEventListener('keydown', () => {
        if (event.keyCode === 13) {
          addMember();
          addMemberinputElm.value = '';
        }
      }
    );
    const members = MODEL.getMembers();
    members.forEach((member) => {
      addMember(member);
    });
  }

  function multiJSON() {
    // console.info('multiJSON', counter++);
    window.addEventListener('hashchange', () => pageByURL());
    if (localStorage.getItem('appData')) {
      let cacheData = JSON.parse(localStorage.getItem('appData'));
      MODEL.setAppDataFromLocalStorage(cacheData);
      pageByURL();
    }
    else {
      getBoardData();
      getMemberData();
    }
  }
  multiJSON();
})();

