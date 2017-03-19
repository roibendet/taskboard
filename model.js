/**
 * Created by Roi Bendet on 3/19/2017.
 */



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
  let newID = uuid();

  let newList = {
    id: `${newID}`,
    tasks: [],
    title: `list Name ${addListCounter++}`
  };

  emptyList.setAttribute("uniqueID", newList.id);
  appData.lists.push(newList);
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
  appData.members.forEach((member) => {
    if (currentMemberID === member.id) {
      member.name = memberNewName;
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
