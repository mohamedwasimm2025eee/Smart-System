const medicineForm = document.getElementById("medicineForm");

const medicineName = document.getElementById("medicineName");
const batchNumber = document.getElementById("batchNumber");
const quantity = document.getElementById("quantity");
const expiryDate = document.getElementById("expiryDate");

const medicineTableBody =
document.getElementById("medicineTableBody");

const searchMedicine =
document.getElementById("searchMedicine");

const emptyMessage =
document.getElementById("emptyMessage");

// Load medicines from browser storage

let medicines =
JSON.parse(localStorage.getItem("smartMeditechMedicines")) || [];

// Add Medicine

medicineForm.addEventListener("submit", function (event) {

```
event.preventDefault();

const medicine = {

    id: Date.now(),

    name: medicineName.value.trim(),

    batch: batchNumber.value.trim(),

    quantity: Number(quantity.value),

    expiry: expiryDate.value

};


medicines.push(medicine);

saveMedicines();

medicineForm.reset();

displayMedicines();
```

});

// Save data

function saveMedicines() {

```
localStorage.setItem(
    "smartMeditechMedicines",
    JSON.stringify(medicines)
);
```

}

// Calculate medicine status

function getMedicineStatus(expiry) {

```
const today = new Date();

today.setHours(0, 0, 0, 0);


const expiryDateObject = new Date(expiry);

expiryDateObject.setHours(0, 0, 0, 0);


const difference =
    expiryDateObject - today;

const daysLeft =
    Math.ceil(difference / (1000 * 60 * 60 * 24));


if (daysLeft < 0) {

    return {
        text: "Expired",
        className: "status-expired",
        days: daysLeft
    };

}


if (daysLeft <= 30) {

    return {
        text: "Expiring Soon",
        className: "status-soon",
        days: daysLeft
    };

}


return {
    text: "Safe",
    className: "status-safe",
    days: daysLeft
};
```

}

// Display medicines

function displayMedicines(filter = "") {

```
medicineTableBody.innerHTML = "";

let filteredMedicines =
    medicines.filter(function (medicine) {

        return medicine.name
            .toLowerCase()
            .includes(filter.toLowerCase());

    });


if (filteredMedicines.length === 0) {

    emptyMessage.style.display = "block";

} else {

    emptyMessage.style.display = "none";

}


filteredMedicines.forEach(function (medicine) {

    const status =
        getMedicineStatus(medicine.expiry);


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            <strong>${escapeHTML(medicine.name)}</strong>
        </td>

        <td>
            ${escapeHTML(medicine.batch)}
        </td>

        <td>
            ${medicine.quantity}
        </td>

        <td>
            ${formatDate(medicine.expiry)}
        </td>

        <td>
            <span class="status ${status.className}">
                ${status.text}
            </span>
        </td>

        <td>
            <button
                class="delete-btn"
                onclick="deleteMedicine(${medicine.id})">
                Delete
            </button>
        </td>

    `;


    medicineTableBody.appendChild(row);

});


updateDashboard();
```

}

// Delete medicine

function deleteMedicine(id) {

```
medicines =
    medicines.filter(function (medicine) {

        return medicine.id !== id;

    });


saveMedicines();

displayMedicines(searchMedicine.value);
```

}

// Search medicine

searchMedicine.addEventListener("input", function () {

```
displayMedicines(this.value);
```

});

// Update Dashboard

function updateDashboard() {

```
let safe = 0;

let soon = 0;

let expired = 0;


medicines.forEach(function (medicine) {

    const status =
        getMedicineStatus(medicine.expiry);


    if (status.text === "Safe") {

        safe++;

    }

    else if (status.text === "Expiring Soon") {

        soon++;

    }

    else {

        expired++;

    }

});


document.getElementById("totalMedicines")
    .textContent = medicines.length;

document.getElementById("safeMedicines")
    .textContent = safe;

document.getElementById("soonMedicines")
    .textContent = soon;

document.getElementById("expiredMedicines")
    .textContent = expired;
```

}

// Format Date

function formatDate(dateString) {

```
const date = new Date(dateString);

return date.toLocaleDateString("en-IN", {

    day: "2-digit",

    month: "2-digit",

    year: "numeric"

});
```

}

// Basic HTML escaping

function escapeHTML(text) {

```
const div = document.createElement("div");

div.textContent = text;

return div.innerHTML;
```

}

// Initial display

displayMedicines();
