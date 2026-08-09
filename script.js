/* =================================
   SMART MEDITEC
   MEDICINE MANAGEMENT SYSTEM
================================= */


/* =================================
   DATA
================================= */

let medicines =
    JSON.parse(localStorage.getItem("smartMediTechMedicines")) || [];


/* =================================
   DOCTOR DATA
   DEMO DATA ONLY
================================= */

const doctors = [

    {
        name: "Dr. Arun Kumar",
        specialty: "General Medicine",
        city: "Chennai",
        hospital: "Chennai",
        phone: "0000000000"
    },

    {
        name: "Dr. Priya",
        specialty: "Cardiology",
        city: "Coimbatore",
        hospital: "Coimbatore",
        phone: "0000000000"
    },

    {
        name: "Dr. Karthik",
        specialty: "Pediatrics",
        city: "Madurai",
        hospital: "Madurai",
        phone: "0000000000"
    },

    {
        name: "Dr. Divya",
        specialty: "Dermatology",
        city: "Salem",
        hospital: "Salem",
        phone: "0000000000"
    },

    {
        name: "Dr. Suresh",
        specialty: "General Medicine",
        city: "Tiruchirappalli",
        hospital: "Tiruchirappalli",
        phone: "0000000000"
    },

    {
        name: "Dr. Meena",
        specialty: "Cardiology",
        city: "Tirunelveli",
        hospital: "Tirunelveli",
        phone: "0000000000"
    }

];


/* =================================
   CALCULATE EXPIRY DATE
================================= */

function calculateExpiry() {

    const manufacturingDate =
        document.getElementById("manufacturingDate").value;

    const shelfLife =
        Number(document.getElementById("shelfLife").value);

    const shelfUnit =
        document.getElementById("shelfUnit").value;

    const preview =
        document.getElementById("expiryPreview");


    if (!manufacturingDate || !shelfLife) {

        preview.textContent =
            "Enter manufacturing date & shelf life";

        return null;
    }


    const date = new Date(manufacturingDate);


    if (shelfUnit === "months") {

        date.setMonth(
            date.getMonth() + shelfLife
        );

    }


    else if (shelfUnit === "years") {

        date.setFullYear(
            date.getFullYear() + shelfLife
        );

    }


    else if (shelfUnit === "days") {

        date.setDate(
            date.getDate() + shelfLife
        );

    }


    const expiryDate =
        formatDate(date);


    preview.textContent =
        expiryDate;


    return date;
}


/* =================================
   FORMAT DATE
================================= */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =================================
   GET STATUS
================================= */

function getMedicineStatus(expiryDate) {

    const today = new Date();

    const expiry = new Date(expiryDate);


    today.setHours(0,0,0,0);

    expiry.setHours(0,0,0,0);


    if (expiry < today) {

        return {
            text: "Expired",
            className: "expired"
        };

    }


    const difference =
        expiry - today;

    const daysLeft =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (daysLeft <= 30) {

        return {
            text: "Expiring Soon",
            className: "warning"
        };

    }


    return {
        text: "Safe",
        className: "safe"
    };

}


/* =================================
   FORM SUBMIT
================================= */

document
    .getElementById("medicineForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document
            .getElementById("medicineName")
            .value
            .trim();


        const batch =
            document
            .getElementById("batchNumber")
            .value
            .trim();


        const quantity =
            Number(
                document
                .getElementById("quantity")
                .value
            );


        const manufacturingDate =
            document
            .getElementById("manufacturingDate")
            .value;


        const shelfLife =
            Number(
                document
                .getElementById("shelfLife")
                .value
            );


        const shelfUnit =
            document
            .getElementById("shelfUnit")
            .value;


        const expiryDate =
            calculateExpiry();


        if (!expiryDate) {

            showToast(
                "Please enter valid medicine details."
            );

            return;
        }


        const medicine = {

            id: Date.now(),

            name: name,

            batch: batch,

            quantity: quantity,

            manufacturingDate:
                manufacturingDate,

            shelfLife:
                shelfLife,

            shelfUnit:
                shelfUnit,

            expiryDate:
                expiryDate.toISOString()

        };


        medicines.push(medicine);


        saveMedicines();


        displayMedicines();


        updateDashboard();


        this.reset();


        document
            .getElementById("expiryPreview")
            .textContent =
            "Enter manufacturing date & shelf life";


        showToast(
            "Medicine added successfully!"
        );

    });


/* =================================
   SAVE MEDICINES
================================= */

function saveMedicines() {

    localStorage.setItem(
        "smartMediTechMedicines",
        JSON.stringify(medicines)
    );

}


/* =================================
   DISPLAY MEDICINES
================================= */

function displayMedicines() {

    const container =
        document.getElementById(
            "medicineTableContainer"
        );


    const search =
        document
        .getElementById("searchMedicine")
        .value
        .toLowerCase();


    const filtered =
        medicines.filter(
            medicine =>
                medicine.name
                .toLowerCase()
                .includes(search)
        );


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-box-open"></i>

                <h3>
                    No medicines found
                </h3>

                <p>
                    Add a medicine or try another search.
                </p>

            </div>

        `;

        return;
    }


    let table = `

        <table class="medicine-table">

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


    filtered.forEach(medicine => {

        const status =
            getMedicineStatus(
                medicine.expiryDate
            );


        table += `

            <tr>

                <td>
                    <strong>
                        ${escapeHTML(medicine.name)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(medicine.batch || "-")}
                </td>

                <td>
                    ${medicine.quantity}
                </td>

                <td>
                    ${formatDate(
                        new Date(
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

                    <span class="status ${status.className}">
                        ${status.text}
                    </span>

                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteMedicine(${medicine.id})"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });


    table += `

            </tbody>

        </table>

    `;


    container.innerHTML = table;

}


/* =================================
   DELETE MEDICINE
================================= */

function deleteMedicine(id) {

    medicines =
        medicines.filter(
            medicine =>
                medicine.id !== id
        );


    saveMedicines();

    displayMedicines();

    updateDashboard();

    showToast(
        "Medicine removed."
    );

}


/* =================================
   DASHBOARD
================================= */

function updateDashboard() {

    let safe = 0;

    let warning = 0;

    let expired = 0;


    medicines.forEach(medicine => {

        const status =
            getMedicineStatus(
                medicine.expiryDate
            );


        if (status.className === "safe") {

            safe++;

        }

        else if (
            status.className === "warning"
        ) {

            warning++;

        }

        else {

            expired++;

        }

    });


    document
        .getElementById("totalMedicines")
        .textContent =
        medicines.length;


    document
        .getElementById("safeMedicines")
        .textContent =
        safe;


    document
        .getElementById("expiringMedicines")
        .textContent =
        warning;


    document
        .getElementById("expiredMedicines")
        .textContent =
        expired;

}


/* =================================
   DOCTOR DIRECTORY
================================= */

function displayDoctors(list = doctors) {

    const grid =
        document.getElementById(
            "doctorGrid"
        );


    if (list.length === 0) {

        grid.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-user-doctor"></i>

                <h3>
                    No doctors found
                </h3>

                <p>
                    Try another city or specialty.
                </p>

            </div>

        `;

        return;
    }


    grid.innerHTML = "";


    list.forEach(doctor => {

        const card =
            document.createElement("div");


        card.className =
            "doctor-card";


        card.innerHTML = `

            <div class="doctor-avatar">

                <i class="fa-solid fa-user-doctor"></i>

            </div>


            <h3>
                ${escapeHTML(doctor.name)}
            </h3>


            <div class="specialty">

                ${escapeHTML(doctor.specialty)}

            </div>


            <div class="doctor-info">

                <i class="fa-solid fa-location-dot"></i>

                ${escapeHTML(doctor.city)}

            </div>


            <div class="doctor-info">

                <i class="fa-solid fa-hospital"></i>

                ${escapeHTML(doctor.hospital)}

            </div>


            <a
                class="call-btn"
                href="tel:${doctor.phone}"
            >

                <i class="fa-solid fa-phone"></i>

                Contact Doctor

            </a>

        `;


        grid.appendChild(card);

    });

}


/* =================================
   FILTER DOCTORS
================================= */

function filterDoctors() {

    const city =
        document
        .getElementById("doctorCity")
        .value;


    const specialty =
        document
        .getElementById("doctorSpecialty")
        .value;


    const filtered =
        doctors.filter(doctor => {

            const cityMatch =
                city === "all" ||
                doctor.city === city;


            const specialtyMatch =
                specialty === "all" ||
                doctor.specialty === specialty;


            return cityMatch &&
                   specialtyMatch;

        });


    displayDoctors(filtered);

}


/* =================================
   TOAST
================================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    document
        .getElementById("toastMessage")
        .textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =================================
   MOBILE MENU
================================= */

function toggleMenu() {

    const nav =
        document.querySelector(
            ".navbar nav"
        );


    if (nav.style.display === "flex") {

        nav.style.display = "none";

    }

    else {

        nav.style.display = "flex";

        nav.style.flexDirection =
            "column";

        nav.style.position =
            "absolute";

        nav.style.top = "75px";

        nav.style.left = "0";

        nav.style.width = "100%";

        nav.style.padding = "20px";

        nav.style.background =
            "white";

    }

}


/* =================================
   HTML SECURITY
================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =================================
   LIVE EXPIRY PREVIEW
================================= */

document
    .getElementById("manufacturingDate")
    .addEventListener(
        "change",
        calculateExpiry
    );


document
    .getElementById("shelfLife")
    .addEventListener(
        "input",
        calculateExpiry
    );


document
    .getElementById("shelfUnit")
    .addEventListener(
        "change",
        calculateExpiry
    );


/* =================================
   INITIALIZE
================================= */

displayMedicines();

updateDashboard();

displayDoctors();
