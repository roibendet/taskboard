/**
 * Created by Roi Bendet on 3/19/2017.
 */

const MODEL = (function () {
  /**
   * private
   */
  let appData = {
    lists: [],
    members: []
  };

  let counter = 0;
  /**
   *
   * @Public
   */


  /**
   * First storage from JSON to Local Storage
   */
  function setAppDataFromLocalStorage(data) {
    appData = data
  }

  function firstLoadBoard(data) {
    appData.lists = data;
  }

  function firstLoadMembers(data) {
    appData.members = data;
  }

  function isAllDataReady() {
    // console.info('isAllDataReady', counter++);
    if (allJSONS[0] && allJSONS[1]) {
      return true;
    }
    else {
      return false;
    }
  }


  /**
   * updates appData and LocalStorage
   */
  function addList2appDataWithID(emptyList) {

    let lists = getLists();
    let newID = uuid();
    let newList = {
      id: `${newID}`,
      tasks: [],
      title: `list Name`
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

  function saveToStorage() {
    return localStorage.setItem('appData', JSON.stringify(appData));
  }

  /**
   * Get data From appData Functions
   */

  function getLists() {
    return appData.lists;
  }

  function getMembers() {
    return appData.members;
  }

  function getListById(listId) {
    const lists = getLists();
    let currentList = {};
    lists.forEach((list) => {
      if (list.id === listId) {
        currentList = list;
      }
    });
    return currentList;
  }

  function getMemberByID(memberId) {
    const members = getMembers();
    members.forEach((member) => {
      if (member.id === memberId) {
        return member;
      }
    });
  }

  function getTaskById(taskId) {
    let taskText = {};
    const lists = getLists();
    lists.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.id === taskId) {
          taskText = task;
        }
      })
    });
    return taskText;
  }

  function getListTasksByID(listID) {
    const list = getListById(listID);
    return list.tasks;
  }

/*  function addListCounter() {
    if (localStorage.getItem('counter')) {
      counter = parseInt(localStorage.getItem('counter'));
      return ++counter;
    }
    else {
      localStorage.setItem('counter', counter++);
      return ++counter;

    }


  }*/

  return {
    /**
     * First storage from JSON to Local Storage
     */
    firstLoadBoard,
    firstLoadMembers,
    setAppDataFromLocalStorage,

    /**
     * updates appData and LocalStorage
     */
    isAllDataReady,
    addList2appDataWithID,
    addCard2appDataWithID,
    editedTitleName2appData,
    removeList2appData,
    deleteMemberappData,
    addMember2appData,
    saveMemberName,
    saveText2appData,
    checkedMemberInModal2appData,
    deleteCardFromappData,
    moveCardToOtherList2appData,
    saveToStorage,

    /**
     * Get data From appData
     */
    getLists,
    getMembers,
    getListById,
    getMemberByID,
    getTaskById,
    getListTasksByID


  }
})();





