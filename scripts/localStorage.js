
const saveToLocalStorage = (itemName, cash) => {
   
    let item = getLocalStorage();
    let money = getLocalStorageCash();


if(!item.includes(itemName)){
    item.push(itemName);
    money.push(cash)
    }

   localStorage.setItem("Item", JSON.stringify(item));
   localStorage.setItem("Money", JSON.stringify(money));

}

const getLocalStorage = () => {
 
    let localStorageData = localStorage.getItem("Item");

    if(localStorageData == null){
        return [];
    }
   
    return JSON.parse(localStorageData);
}

const getLocalStorageCash = () => {
 
    let localStorageData = localStorage.getItem("Money");

    if(localStorageData == null){
        return [];
    }
   
    return JSON.parse(localStorageData);
}

const removeLocalStorage = (budget) => {

    let money = getLocalStorage();
    let cash = getLocalStorageCash();

    let namedIndex = money.indexOf(budget);

    money.splice(namedIndex, 1);
    cash.splice(namedIndex, 1);

    localStorage.setItem("Item", JSON.stringify(money))
    localStorage.setItem("Money", JSON.stringify(cash))
}


const saveToLocalStorageBudget = (total) => {

   localStorage.setItem("Budget", JSON.stringify(total));
}

const getLocalStorageBudget = () => {
 
    let localStorageData = localStorage.getItem("Budget");

    if(localStorageData == null){
        return 0;
    }
   
    return JSON.parse(localStorageData);
}

export{saveToLocalStorage, getLocalStorage, removeLocalStorage, getLocalStorageBudget, saveToLocalStorageBudget, getLocalStorageCash};