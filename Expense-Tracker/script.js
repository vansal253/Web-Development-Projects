document.addEventListener("DOMContentLoaded", () => {
    const conatiner = document.getElementById("container")
    const boxDiv = document.getElementById("box")
    const expenseForm = document.getElementById("expense-form")
    const inputExpense = document.getElementById("input-expense-name")
    const inputExpenseAmount = document.getElementById("input-expense-amount")
    const addExpenseBtn = document.getElementById("add-expenseBtn")
    const expenseDiv = document.getElementById("expenseDiv")
    const listingDiv = document.getElementById("listingDiv")
    const expenseListSpan = document.getElementById("expense-list")
    const deleteBtn = document.getElementById("delete-itemBtn")
    const totalDiv = document.getElementById("totalDiv")
    const totalExpenseSpan = document.getElementById("total-expenseSpan")

    let expense = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal();

    renderExpense();
    updateTotal();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();         // it will prevent the form's default action
        const name = inputExpense.value.trim();
        const amount = parseFloat(inputExpenseAmount.value);

        //after this we will check if both fields are empty or partially empty
        if (name !== "" && !isNaN(amount) && amount > 0) {
            // and now in here we will push our values in expense array
            const newExpense = {
                id: Date.now(),
                name,               // in this new js syntax it basically means name: name and amount: amount means it will conside key and value same with this new syntax
                amount,
            };
            expense.push(newExpense);
            saveExpenseToLocal();       // this function will store our details in local storage
            renderExpense();
            updateTotal();              //up till here we were only updateing expense array not totalAmount variable

            //clear the input after submitting
            inputExpense.value = "";
            inputExpenseAmount.value = "";
        };
        // renderExpense();

    });

    function updateTotal() {
        totalAmount = calculateTotal();
        totalExpenseSpan.textContent = totalAmount.toFixed(2);

    }

    function renderExpense() {
        // expenseDiv.innerHTML = ""; //emptying this div
        expenseListSpan.innerHTML = "";
        // expenseList.innerHTML = "";
        expense.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML = `
      <span class="mb-2 flex justify-between bg-gray-800 h-11 p-1.5 rounded-sm Name text-white outline-0">  ${expense.name} - $${expense.amount}
      <button data-id="${expense.id}" class="text-white bg-blue-500 h-8 w-20  rounded-sm
        cursor-pointer">Delete</button>
      </span>`;
            expenseListSpan.appendChild(li);
        });

    };

    function saveExpenseToLocal() {
        localStorage.setItem("expense", JSON.stringify(expense));
        //this will call localstorage api and save our expense array in ;ocal stoareg also
    };


    function calculateTotal() {
        // const initialValue = 0;
        // const sumWithInitial = expense.reduce(

        // )
        //accumulator going to store all the value 
        //accumulator = sum
        return expense.reduce((accumulator, expense) => accumulator + expense.amount, 0);
    };

    expenseListSpan.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const delBtnID = parseInt(e.target.getAttribute("data-id"));
            expense = expense.filter((expense) => expense.id !== delBtnID);

            saveExpenseToLocal();
            renderExpense();
            updateTotal();
        }
    });

});