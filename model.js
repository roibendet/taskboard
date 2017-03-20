/**
 * Created by Roi Bendet on 3/19/2017.
 */


let appData = {
  lists: [],
  members: []
};
/**
 *
 * @appData Management
 */

function isAllDataReady() {
  // console.info('isAllDataReady', counter++);
  if (allJSONS[0] && allJSONS[1]) {
    localStorage.setItem('appData', JSON.stringify(appData));
    pageByURL();
  }
}
function addList2appDataWithID(emptyList) {
  let lists = getLists();

  let newID = uuid();


  let newList = {
    id: `${newID}`,
    tasks: [],
    title: `list Name ${addListCounter++}`
  };

  emptyList.setAttribute("uniqueID", newList.id);

  lists.push(newList);
  saveToStorage();
}
function addCard2appDataWithID(listID, CardID) {
  let newCard = {
    id: `${CardID}`,
    members: [],
    text: "i'm new"
  };

  let lists = getLists();

  lists.forEach((list) => {
    if (list.id === listID) {
      list.tasks.push(newCard);
    }

  });
  saveToStorage();

}
function editedTitleName2appData(currentListID, NameAfter) {

  let lists = getLists();



  lists.forEach((item) => {
    if (item.id === currentListID) {
      item.title = NameAfter;
    }


  });
  saveToStorage();


}


function removeList2appData(currentListID) {
  let lists = getLists();

  lists.forEach((item, index) => {
    if (item.id === currentListID) {
      appData.lists.splice(index, 1);
    }
  });
  saveToStorage();

}
function deleteMemberappData(memberName) {
let members = getMembers();

  members.forEach((member) => {
    if (member.name === memberName) {
      let index = members.indexOf(member);
      members.splice(index, 1)
    }
  });
  saveToStorage();


}
function addMember2appData(newMemberName, member) {
let members = getMembers();
  let newID = uuid();
  const memberobj = {
    name: '',
    id: `${newID}`
  };
  memberobj.name = newMemberName;
  member.setAttribute('uniqueID', newID);


  members.push(memberobj);
  saveToStorage();



}

function saveMemberName(currentMemberID, memberNewName) {
let members = getMembers();
  members.forEach((member) => {
    if (currentMemberID === member.id) {
      member.name = memberNewName;
    }

  });
  saveToStorage();


}
function saveText2appData(cardID, listID, newText) {
let lists = getLists();
  lists.forEach((list) => {
    if (list.id === listID) {
      list.tasks.forEach((task) => {
        if (task.id === cardID) {
          task.text = newText
        }
      })
    }
  });
  // localStorage.setItem('appData', JSON.stringify(appData));
  saveToStorage();


}
function checkedMemberInModal2appData(currentListID, currentCardID, memberChecked) {
let lists = getLists();


  lists.forEach((list) => {
    if (list.id === currentListID) {
      list.tasks.forEach((task) => {
        if (task.id === currentCardID) {
          task.members = {};
          task.members = memberChecked;
        }
      })
    }
  });
  saveToStorage();


}
function deleteCardFromappData(currentListID, currentCardID) {
let lists = getLists();
  lists.forEach((list) => {
    if (list.id === currentListID) {
      list.tasks.forEach((task, i) => {
        if (task.id === currentCardID) {
          list.tasks.splice(i, 1);
        }
      })
    }
  });
  saveToStorage();


}
function moveCardToOtherList2appData(indexOfCurrentList, indexOfCurrentCard, indexOfSelectedList, currentCardID) {

let lists = getLists();
  lists[indexOfCurrentList].tasks.forEach((task, index) => {
    if (task.id === currentCardID) {
      indexOfCurrentCard = index;
      lists[indexOfSelectedList].tasks.push(lists[indexOfCurrentList].tasks[indexOfCurrentCard]);
      lists[indexOfCurrentList].tasks.splice(indexOfCurrentCard, 1);
    }
  });
  saveToStorage();


}
