class Expense {
    constructor(item, cost, category, type, date) {
        this.item = item;
        this.cost = cost;
        this.category = category;
        this.type = type;
        this.date = date;
    }
}

let expenses = [];

init = function(){
    expenses = JSON.parse(localStorage.getItem("expenses"));
    if(expenses == null || expenses == "") {
        expenses =[];
    } 
}

document.getElementById('btnSave').addEventListener('click', function(){
    let item = document.getElementById('item').value;
    let cost = document.getElementById('cost').value;
    let category = document.getElementById('category').value;
    let type = document.getElementById('paymentMethod').value;
    let date = Date.now();

    let myExpense = new Expense(item, cost, category, type, date);
    expenses.push(myExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearInterface();
});

clearInterface = function(){
    document.getElementById('item').value = "";
    document.getElementById('cost').value = "";
}



init();

