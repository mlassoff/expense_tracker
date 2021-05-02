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
let currentRecordSelected;

init = function(){
    document.getElementById('editArea').style.display = "none";
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
    saveAndClear();
});

saveAndClear = function(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearInterface();
    displayExpenseHistory();
    document.getElementById('editArea').style.display = "none";
}

clearInterface = function(){
    document.getElementById('item').value = "";
    document.getElementById('cost').value = "";
}

displayExpenseHistory = function(){
    document.getElementById('historyTable').getElementsByTagName("table")[0].innerHTML = "<tr class='notFirst'><th>Date</th><th>Item</th><th>Amount</th></tr>";
    expenses.forEach(displayItem);

}

displayItem = function(item, index){

    let out = "<tr onclick='rowClicked(this)'><td>" + convertDate(item.date) + "</td>";
    out += "<td>" + item.item + "</td>";
    out += "<td>$" + item.cost + "</td></tr>"; 
    document.getElementById('historyTable').getElementsByTagName("table")[0].innerHTML += out;

}

convertDate = function(timeStamp){
    const dateObject = new Date(timeStamp);
    humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
}

rowClicked = function(row){
    const recordSelected = row.rowIndex -1;
    currentRecordSelected = recordSelected;
    let record = expenses[recordSelected];
    let out = "<h2>Record Selected</h2>";
    out += "Date: " + convertDate(record.date);
    out += "<br/>Item: " + record.item;
    out += "<br/>Cost: $" + record.cost;
    out += "<br/>Category: " + record.category;
    out += "<br/>Method: " + record.type;
    out += "<br/><button onclick='editRecord()'>Edit</button>";
    out += "<button onclick='deleteRecord()'>Delete</button>";
    out += "<button onclick='cancelEdit()'>Cancel</button>";
    document.getElementById('editArea').innerHTML = out;
    document.getElementById('editArea').style.display = "block";
}

cancelEdit = function(){
    document.getElementById('editArea').innerHTML = '';
    document.getElementById('editArea').style.display = "none";
}

deleteRecord  = function() {
    expenses.splice(currentRecordSelected, 1);
   // localStorage.setItem("expenses", JSON.stringify(expenses));
    saveAndClear();
    clearInterface();
    document.getElementById('editArea').innerHTML = "";
    displayExpenseHistory();
}

editRecord  = function() {
    let item = expenses[currentRecordSelected].item;
    let cost = expenses[currentRecordSelected].cost;
    let category = expenses[currentRecordSelected].category;
    let type = expenses[currentRecordSelected].type;
    let date = expenses[currentRecordSelected].date;
    let out = "<h2>Edit Record</h2>";
    out += "Date: " + convertDate(date);
    out += "<br/>Item: <input id='editItem' type='text' value='" + item + "'>";
    out += "<br/>Cost: <input id='editCost' type='text' value='" + cost + "'>";
    out += "<br/>Category: ";
    switch(category){
        case "entertainment":
            out += "<select id='editCategory'><option selected value='entertainment'>Entertainment</option><option value='food'>Food</option><option value='office'>Office Expense</option><option value='travel'>Travel</option><option value='other'>Other</option></select>";
            break;
        case "food":
            out += "<select id='editCategory'><option value='entertainment'>Entertainment</option><option selected value='food'>Food</option><option value='office'>Office Expense</option><option value='travel'>Travel</option><option value='other'>Other</option></select>";
            break;
        case "office":
            out += "<select id='editCategory'><option value='entertainment'>Entertainment</option><option value='food'>Food</option><option selected value='office'>Office Expense</option><option value='travel'>Travel</option><option value='other'>Other</option></select>";
            break;
        case "travel":
            out += "<select id='editCategory'><option value='entertainment'>Entertainment</option><option value='food'>Food</option><option value='office'>Office Expense</option><option selected value='travel'>Travel</option><option value='other'>Other</option></select>";
            break;
        case "other":
            out += "<select id='editCategory'><option value='entertainment'>Entertainment</option><option value='food'>Food</option><option value='office'>Office Expense</option><option value='travel'>Travel</option><option selected value='other'>Other</option></select>";
            break;
    }
    out += "<br/>Method: ";
    switch (type){
        case "cash":
            out += "<select id='editType'><option selected value='cash'>Cash</option><option value='credit'>Credit</option><option value='check'>Check</option></select>";
            break;
        case "credit":
            out += "<select id='editType'><option value='cash'>Cash</option><option selected value='credit'>Credit</option><option value='check'>Check</option></select>";
            break;
        case "check":
            out += "<select id='editType'><option value='cash'>Cash</option><option value='credit'>Credit</option><option selected value='check'>Check</option></select>";
            break;
    }
    out += "<br/><button onclick='saveRecord()'>Save</button>";
    out += "<button onclick='cancelEdit()'>Cancel</button>";
    document.getElementById('editArea').innerHTML = out;

}

saveRecord = function(){
    expenses[currentRecordSelected].item = document.getElementById('editItem').value;
    expenses[currentRecordSelected].cost = document.getElementById('editCost').value;
    expenses[currentRecordSelected].category = document.getElementById('editCategory').value;
    expenses[currentRecordSelected].type = document.getElementById('editType').value;
    saveAndClear();
}


init();

