import { getLocalStorage, saveToLocalStorage, removeLocalStorage, saveToLocalStorageBudget, getLocalStorageBudget, getLocalStorageCash } from "./localStorage.js";

let moneyCount = document.getElementById("moneyCount");
let settingBalance = document.getElementById("settingBalance");
let comfirmingBalance = document.getElementById("comfirmingBalance");
let nameOfTheItemId = document.getElementById("nameOfTheItemId");
let settingCostOfItemId = document.getElementById("settingCostOfItemId");
let comfirmBuyingIt = document.getElementById("comfirmBuyingIt");
let displayItems = document.getElementById("displayItems");

let itemNameArray = getLocalStorage();
let itemCostArray = getLocalStorageCash();


comfirmingBalance.addEventListener("click", () => {
    let budget = parseInt(settingBalance.value);
    if (isNaN(budget)) {
        alert("Please enter a valid number.");
        return;
    }
    moneyCount.innerText = budget;
    saveToLocalStorageBudget(budget);
});


comfirmBuyingIt.addEventListener("click", () => {
    let itemNameValue = nameOfTheItemId.value;
    let itemCostValue = parseInt(settingCostOfItemId.value);

    if (isNaN(itemCostValue)) {
        alert("Please enter a valid number.");
        return;
    }
    if (itemNameArray.includes(itemNameValue)) {
        alert("An item with the name already exists.");
        return;
    }

    saveToLocalStorage(itemNameValue, itemCostValue);
    itemNameArray.push(itemNameValue);
    itemCostArray.push(itemCostValue);
    createElement(itemNameValue, itemCostValue);
});



const createElement = (itemName, itemCost) => {
    let div = document.createElement("div");
    div.style.border = "1px solid black";
    div.classList.add("mt-2");

    let p1 = document.createElement("p");
    p1.innerText = "Purchased: ";
    let span1 = document.createElement("span");
    span1.innerText = itemName;

    let p2 = document.createElement("p");
    p2.innerText = "Cost: $";
    let span2 = document.createElement("span");
    span2.innerText = itemCost;

    let button = document.createElement("button");
    button.innerText = "Remove";
    button.style.backgroundColor = "red";
    button.style.border = "none";
    button.style.borderRadius = "10px";
    button.style.padding = "5px";
    button.style.marginBottom = "5px";
    button.addEventListener("click", () => {
        div.remove();
        let index = itemNameArray.indexOf(itemName);
        removeLocalStorage(itemName, itemCost);
        itemNameArray.splice(index, 1);
        itemCostArray.splice(index, 1);
        UpdateBudget();
    });


    displayItems.appendChild(div);
    div.appendChild(p1);
    p1.appendChild(span1);
    div.appendChild(p2);
    p2.appendChild(span2);
    div.appendChild(button);

    UpdateBudget();
};

itemNameArray.map((itemName, index) => {
    createElement(itemName, itemCostArray[index]);
});

function UpdateBudget() {
    let total = getLocalStorageBudget()
    let cost = getLocalStorageCash()

    for (let i = 0; i < cost.length; i++) {
        total -= cost[i]
    }
    moneyCount.innerText = total
}

window.onload = () => {
    UpdateBudget()
    console.log(itemNameArray);
    console.log(itemCostArray);

}