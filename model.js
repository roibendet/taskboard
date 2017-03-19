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
    pageByURL();
  }
}
function addList2appDataWithID(emptyList) {
  let appData = JSON.parse(localStorage.getItem('appData'));
  let newID = uuid();

  let newList = {
    id: `${newID}`,
    tasks: [],
    title: `list Name ${addListCounter++}`
  };

  emptyList.setAttribute("uniqueID", newList.id);

  appData.lists.push(newList);
  localStorage.setItem('appData' ,JSON.stringify(appData));
  // saveToStorage();
}
function addCard2appDataWithID(listID, CardID) {
  let newCard = {
    id: `${CardID}`,
    members: [],
    text: "i'm new"
  };

  let appData = JSON.parse(localStorage.getItem('appData'));
  let lists = appData.lists;

  lists.forEach((list) => {
    if (list.id === listID) {
      list.tasks.push(newCard);
    }

  });
  localStorage.setItem('appData', JSON.stringify(appData));
}
function editedTitleName2appData(currentListID, NameAfter) {

  let appData = JSON.parse(localStorage.getItem('appData'));

  appData.lists.forEach((item) => {
    if (item.id === currentListID) {
      item.title = NameAfter;
    }


  });
  localStorage.setItem('appData', JSON.stringify(appData));

}


function removeList2appData(currentListID) {
  let appData = JSON.parse(localStorage.getItem('appData'));

  appData.lists.forEach((item, index) => {
    if (item.id === currentListID) {
      appData.lists.splice(index, 1);
    }
  });
  localStorage.setItem('appData', JSON.stringify(appData));
}
function deleteMemberappData(memberName) {
  let appData = JSON.parse(localStorage.getItem('appData'));


  appData.members.forEach((member) => {
    if (member.name === memberName) {
      let index = appData.members.indexOf(member);
      appData.members.splice(index, 1)
    }
  });
  localStorage.setItem('appData', JSON.stringify(appData));

}
function addMember2appData(newMemberName, member) {
  let appData = JSON.parse(localStorage.getItem('appData'));

  let newID = uuid();
  const memberobj = {
    name: '',
    id: `${newID}`
  };
  memberobj.name = newMemberName;
  member.setAttribute('uniqueID', newID);


  appData.members.push(memberobj);
  localStorage.setItem('appData', JSON.stringify(appData));


}

function saveMemberName(currentMemberID, memberNewName) {
  let appData = JSON.parse(localStorage.getItem('appData'));

  appData.members.forEach((member) => {
    if (currentMemberID === member.id) {
      member.name = memberNewName;
    }

  });
  localStorage.setItem('appData', JSON.stringify(appData));

}
function saveText2appData(cardID, listID, newText) {
  let appData = JSON.parse(localStorage.getItem('appData'));

  appData.lists.forEach((list) => {
    if (list.id === listID) {
      list.tasks.forEach((task) => {
        if (task.id === cardID) {
          task.text = newText
        }
      })
    }
  })
  localStorage.setItem('appData', JSON.stringify(appData));

}
function checkedMemberInModal2appData(currentListID, currentCardID, memberChecked) {
  let appData = JSON.parse(localStorage.getItem('appData'));

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
  localStorage.setItem('appData', JSON.stringify(appData));

}
function deleteCardFromappData(currentListID, currentCardID) {
  let appData = JSON.parse(localStorage.getItem('appData'));

  appData.lists.forEach((list) => {
    if (list.id === currentListID) {
      list.tasks.forEach((task, i) => {
        if (task.id === currentCardID) {
          list.tasks.splice(i, 1);
        }
      })
    }
  });
  localStorage.setItem('appData', JSON.stringify(appData));

}
function moveCardToOtherList2appData(indexOfCurrentList, indexOfCurrentCard, indexOfSelectedList, currentCardID) {
  let appData = JSON.parse(localStorage.getItem('appData'));


  appData.lists[indexOfCurrentList].tasks.forEach((task, index) => {
    if (task.id === currentCardID) {
      indexOfCurrentCard = index;
      appData.lists[indexOfSelectedList].tasks.push(appData.lists[indexOfCurrentList].tasks[indexOfCurrentCard]);
      appData.lists[indexOfCurrentList].tasks.splice(indexOfCurrentCard, 1);
    }
  });
  localStorage.setItem('appData', JSON.stringify(appData));

}
