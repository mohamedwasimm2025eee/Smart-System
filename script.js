/*
SMARTMEDITech
Medicine Management System
*/

/* =========================================
GET HTML ELEMENTS
========================================= */

const medicineForm =
document.getElementById("medicineForm");

const medicineName =
document.getElementById("medicineName");

const batchNumber =
document.getElementById("batchNumber");

const quantity =
document.getElementById("quantity");

const manufacturingDate =
document.getElementById("manufacturingDate");

const shelfLife =
document.getElementById("shelfLife");

const shelfUnit =
document.getElementById("shelfUnit");

const expiryResult =
document.getElementById("expiryResult");

const medicineList =
document.getElementById("medicineList");

const search =
document.getElementById("search");

const cityFilter =
document.getElementById("cityFilter");

const doctorList =
document.getElementById("doctorList");

/* =========================================
MEDICINE DATA
========================================= */

let medicines = [];

/* =========================================
LOAD SAVED MEDICINES
========================================= */

function loadMedicines() {

```
const saved =
    localStorage.getItem(
        "smartMediTechMedicines"
    );

if (saved) {

    try {

        medicines = JSON.parse(saved);

    } catch (error) {

        medicines = [];

    }

}
```

}

/* =========================================
SAVE MEDICINES
========================================= */

function saveMedicines() {

```
localStorage.setItem(
    "smartMediTechMedicines",
    JSON.stringify(medicines)
);
```

}

/* =========================================
CALCULATE EXPIRY
========================================= */

function calculateExpiry() {

```
const dateValue =
    manufacturingDate.value;

const life =
    Number(shelfLife.value);

const unit =
    shelfUnit.value;


/*
    If the user has not entered
    both values, don't calculate.
*/

if (!dateValue || !life || life <= 0) {

    expiryResult.textContent =
        "Enter manufacturing date and shelf life";

    return null;

}


/*
    IMPORTANT:
    Use date parts instead of
    new Date("YYYY-MM-DD")
    to avoid timezone problems.
*/

const parts =
    dateValue.split("-");

const year =
    Number(parts[0]);

const month =
    Number(parts[1]) - 1;

const day =
    Number(parts[2]);


const expiry =
    new Date(
        year,
        month,
        day
    );


/* Add shelf life */

if (unit === "months") {

    expiry.setMonth(
        expiry.getMonth() + life
    );

}

else if (unit === "years") {

    expiry.setFullYear(
        expiry.getFullYear() + life
    );

}

else if (unit === "days") {

    expiry.setDate(
        expiry.getDate() + life
    );

}


const formatted =
    formatDate(expiry);


expiryResult.textContent =
    formatted;


return expiry;
```

}

/* =========================================
FORMAT DATE
========================================= */

function formatDate(date) {

```
const day =
    String(
        date.getDate()
    ).padStart(2, "0");


const month =
    String(
        date.getMonth() + 1
    ).padStart(2, "0");


const year =
    date.getFullYear();


return `${day}/${month}/${year}`;
```

}

/* =========================================
GET MEDICINE STATUS
========================================= */

function getStatus(expiryDate) {

```
const today =
    new Date();


today.setHours(
    0, 0, 0, 0
);


const expiry =
    new Date(
        expiryDate
    );


expiry.setHours(
    0, 0, 0, 0
);


/*
    EXPIRED
*/

if (expiry < today) {

    return {
        name: "Expired",
        className: "status-expired"
    };

}


/*
    Calculate remaining days
*/

const difference =
    expiry.getTime() -
    today.getTime();


const days =
    Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
    );


/*
    EXPIRING WITHIN 30 DAYS
*/

if (days <= 30) {

    return {
        name: "Expiring Soon",
        className: "status-warning"
    };

}


/*
    SAFE
*/

return {
    name: "Safe",
    className: "status-safe"
};
```

}

/* =========================================
ADD MEDICINE
========================================= */

medicineForm.addEventListener(
"submit",
function(event) {

```
    event.preventDefault();


    const name =
        medicineName.value.trim();


    const batch =
        batchNumber.value.trim();


    const qty =
        Number(quantity.value);


    /*
        Calculate expiry
    */

    const expiry =
        calculateExpiry();


    if (!expiry) {

        alert(
            "Please enter manufacturing date and shelf life."
        );

        return;

    }


    if (!name) {

        alert(
            "Please enter medicine name."
        );

        return;

    }


    if (!qty || qty <= 0) {

        alert(
            "Please enter a valid quantity."
        );

        return;

    }


    /*
        Create medicine object
    */

    const medicine = {

        id: Date.now(),

        name: name,

        batch: batch,

        quantity: qty,

        manufacturingDate:
            manufacturingDate.value,

        expiryDate:
            expiry.toISOString()

    };


    /*
        Add to array
    */

    medicines.push(
        medicine
    );


    /*
        Save
    */

    saveMedicines();


    /*
        Display
    */

    displayMedicines();


    updateDashboard();


    /*
        Clear form
    */

    medicineForm.reset();


    expiryResult.textContent =
        "Enter manufacturing date and shelf life";


    alert(
        "Medicine added successfully!"
    );

}
```

);

/* =========================================
DISPLAY MEDICINES
========================================= */

function displayMedicines() {

```
const keyword =
    search.value
    .trim()
    .toLowerCase();


const filtered =
    medicines.filter(
        function(medicine) {

            return medicine.name
                .toLowerCase()
                .includes(keyword);

        }
    );


/*
    No medicine
*/

if (filtered.length === 0) {

    medicineList.innerHTML = `

        <div class="empty">

            <div>📦</div>

            <h3>No medicines found</h3>

            <p>
                Add a medicine or search for another name.
            </p>

        </div>

    `;

    return;

}


let html = `

    <div class="table-wrapper">

        <table>

            <thead>

                <tr>

                    <th>Medicine</th>

                    <th>Batch</th>

                    <th>Quantity</th>

                    <th>Manufacturing</th>

                    <th>Expiry</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

`;


filtered.forEach(
    function(medicine) {

        const status =
            getStatus(
                medicine.expiryDate
            );


        html += `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(
                            medicine.name
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        medicine.batch || "-"
                    )}
                </td>

                <td>
                    ${medicine.quantity}
                </td>

                <td>
                    ${formatDate(
                        parseLocalDate(
                            medicine.manufacturingDate
                        )
                    )}
                </td>

                <td>
                    ${formatDate(
                        new Date(
                            medicine.expiryDate
                        )
                    )}
                </td>

                <td>

                    <span
                        class="status
                        ${status.className}"
                    >
                        ${status.name}
                    </span>

                </td>

                <td>

                    <button
                        class="delete"
                        onclick="deleteMedicine(${medicine.id})"
                    >
                        🗑
                    </button>

                </td>

            </tr>

        `;

    }
);


html += `

            </tbody>

        </table>

    </div>

`;


medicineList.innerHTML =
    html;
```

}

/* =========================================
DELETE MEDICINE
========================================= */

function deleteMedicine(id) {

```
const answer =
    confirm(
        "Delete this medicine?"
    );


if (!answer) {

    return;

}


medicines =
    medicines.filter(
        function(medicine) {

            return medicine.id !== id;

        }
    );


saveMedicines();

displayMedicines();

updateDashboard();
```

}

/* =========================================
DASHBOARD
========================================= */

function updateDashboard() {

```
let safeCount = 0;

let warningCount = 0;

let expiredCount = 0;


medicines.forEach(
    function(medicine) {

        const status =
            getStatus(
                medicine.expiryDate
            );


        if (
            status.name === "Safe"
        ) {

            safeCount++;

        }

        else if (
            status.name === "Expiring Soon"
        ) {

            warningCount++;

        }

        else {

            expiredCount++;

        }

    }
);


document.getElementById(
    "total"
).textContent =
    medicines.length;


document.getElementById(
    "safe"
).textContent =
    safeCount;


document.getElementById(
    "soon"
).textContent =
    warningCount;


document.getElementById(
    "expired"
).textContent =
    expiredCount;
```

}

/* =========================================
SEARCH
========================================= */

search.addEventListener(
"input",
function() {

```
    displayMedicines();

}
```

);

/* =========================================
LIVE EXPIRY CALCULATION
========================================= */

manufacturingDate.addEventListener(
"change",
calculateExpiry
);

shelfLife.addEventListener(
"input",
calculateExpiry
);

shelfUnit.addEventListener(
"change",
calculateExpiry
);

/* =========================================
LOCAL DATE PARSER
========================================= */

function parseLocalDate(value) {

```
const parts =
    value.split("-");


return new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2])
);
```

}

/* =========================================
DOCTOR DATA
========================================= */

const doctors = [

```
{
    name: "Dr. Arun Kumar",
    city: "Chennai",
    specialty: "General Medicine",
    hospital: "Chennai"
},

{
    name: "Dr. Priya",
    city: "Coimbatore",
    specialty: "Cardiology",
    hospital: "Coimbatore"
},

{
    name: "Dr. Karthik",
    city: "Madurai",
    specialty: "Pediatrics",
    hospital: "Madurai"
},

{
    name: "Dr. Divya",
    city: "Salem",
    specialty: "Dermatology",
    hospital: "Salem"
},

{
    name: "Dr. Suresh",
    city: "Tiruchirappalli",
    specialty: "General Medicine",
    hospital: "Tiruchirappalli"
}
```

];

/* =========================================
DISPLAY DOCTORS
========================================= */

function displayDoctors() {

```
const city =
    cityFilter.value;


let filteredDoctors;


if (city === "all") {

    filteredDoctors =
        doctors;

}

else {

    filteredDoctors =
        doctors.filter(
            function(doctor) {

                return doctor.city === city;

            }
        );

}


doctorList.innerHTML = "";


if (
    filteredDoctors.length === 0
) {

    doctorList.innerHTML = `

        <div class="empty">

            <div>👨‍⚕️</div>

            <h3>
                No doctors found
            </h3>

        </div>

    `;

    return;

}


filteredDoctors.forEach(
    function(doctor) {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "doctor-card";


        card.innerHTML = `

            <div class="doctor-icon">
                👨‍⚕️
            </div>

            <h3>
                ${escapeHTML(
                    doctor.name
                )}
            </h3>

            <div class="doctor-specialty">
                ${escapeHTML(
                    doctor.specialty
                )}
            </div>

            <p>
                📍 ${escapeHTML(
                    doctor.city
                )}
            </p>

            <p>
                🏥 ${escapeHTML(
                    doctor.hospital
                )}
            </p>

        `;


        doctorList.appendChild(
            card
        );

    }
);
```

}

/* =========================================
CITY FILTER
========================================= */

cityFilter.addEventListener(
"change",
displayDoctors
);

/* =========================================
BASIC HTML SECURITY
========================================= */

function escapeHTML(value) {

```
return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
```

}

/* =========================================
START WEBSITE
========================================= */

loadMedicines();

displayMedicines();

updateDashboard();

displayDoctors();
