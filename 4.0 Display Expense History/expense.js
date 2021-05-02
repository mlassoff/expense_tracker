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
    } else {
        displayExpenseHistory();
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
    displayExpenseHistory();
});

clearInterface = function(){
    document.getElementById('item').value = "";
    document.getElementById('cost').value = "";
}

displayExpenseHistory = function(){
    document.getElementById('historyTable').getElementsByTagName("table")[0].innerHTML = "<tr class='notFirst'><th>Date</th><th>Item</th><th>Amount</th></tr>";
    expenses.forEach(displayItem);
}

displayItem = function(item, index){

    let out = "<tr><td>" + convertDate(item.date) + "</td>";
    out += "<td>" + item.item + "</td>";
    out += "<td>$" + item.cost + "</td></tr>"; 
    document.getElementById('historyTable').getElementsByTagName("table")[0].innerHTML += out;

}

convertDate = function(timeStamp){
    const dateObject = new Date(timeStamp);
    humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
}

init();

