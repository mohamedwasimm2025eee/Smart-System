
/* =====================================================
   SMARTMEDITECH
   Medicine Management JavaScript
===================================================== */

let medicines =
    JSON.parse(localStorage.getItem("smartMediTechMedicines")) || [];


/* =====================================================
   MEDICINE EXPIRY CALCULATION
===================================================== */

function calculateExpiry(manufacturingDate, shelfLifeMonths) {

    const date = new Date(manufacturingDate);

    date.setMonth(
        date.getMonth() + Number(shelfLifeMonths)
    );

    return date;
}


/* =====================================================
   DATE FORMAT
===================================================== */

function formatDate(date) {

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


/* =====================================================
   MEDICINE STATUS
===================================================== */

function getMedicineStatus(expiryDate) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const expiry = new Date(expiryDate);

    expiry.setHours(0, 0, 0, 0);


    const difference =
        expiry.getTime() - today.getTime();


    const days =
        Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );


    if (days < 0) {

        return {
            type: "expired",
            text: "Expired"
        };

    }


    if (days <= 90) {

        return {
            type: "expiring",
            text: "Expiring Soon"
        };

    }


    return {
        type: "safe",
        text: "Safe"
    };

}


/* =====================================================
   OPEN MEDICINE FORM
===================================================== */

function openMedicineForm() {

    document
        .getElementById("medicineModal")
        .classList.add("active");

}


/* =====================================================
   CLOSE MEDICINE FORM
===================================================== */

function closeMedicineForm() {

    document
        .getElementById("medicineModal")
        .classList.remove("active");

}


/* =====================================================
   ADD MEDICINE
===================================================== */

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


        const manufacturingDate =
            document
                .getElementById("manufacturingDate")
                .value;


        const shelfLife =
            document
                .getElementById("shelfLife")
                .value;


        const quantity =
            document
                .getElementById("quantity")
                .value;


        const expiryDate =
            calculateExpiry(
                manufacturingDate,
                shelfLife
            );


        const medicine = {

            id: Date.now(),

            name: name,

            batch: batch,

            manufacturingDate:
                manufacturingDate,

            shelfLife:
                Number(shelfLife),

            expiryDate:
                expiryDate.toISOString(),

            quantity:
                Number(quantity)

        };


        medicines.push(medicine);


        saveMedicines();


        displayMedicines();


        updateDashboard();


        this.reset();


        closeMedicineForm();


        alert(
            "Medicine added successfully!\n\nExpiry Date: " +
            formatDate(expiryDate)
        );

    });


/* =====================================================
   SAVE MEDICINES
===================================================== */

function saveMedicine() {

    // Get values
    const name = document.getElementById("medicineName").value.trim();
    const batch = document.getElementById("batchNumber").value.trim();
    const manufacturingDate =
        document.getElementById("manufacturingDate").value;

    const shelfLife =
        document.getElementById("shelfLife").value;

    const quantity =
        document.getElementById("quantity").value;


    // Check empty fields
    if (
        name === "" ||
        batch === "" ||
        manufacturingDate === "" ||
        shelfLife === "" ||
        quantity === ""
    ) {
        alert("Please fill all medicine details.");
        return;
    }


    // Convert shelf life to number
    const months = parseInt(shelfLife);


    // Calculate expiry date
    const expiry = new Date(manufacturingDate);

    expiry.setMonth(
        expiry.getMonth() + months
    );


    // Format expiry date
    const expiryDate =
        expiry.getFullYear() +
        "-" +
        String(expiry.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(expiry.getDate()).padStart(2, "0");


    // Create medicine object
    const medicine = {

        id: Date.now(),

        name: name,

        batch: batch,

        manufacturingDate: manufacturingDate,

        shelfLife: months,

        expiryDate: expiryDate,

        quantity: parseInt(quantity)

    };


    // Add medicine
    medicines.push(medicine);


    // Save in browser
    localStorage.setItem(
        "smartMediTechMedicines",
        JSON.stringify(medicines)
    );


    // Clear form
    document.getElementById("medicineForm").reset();


    // Close popup
    closeMedicineForm();


    // Refresh medicine list
    displayMedicines();


    // Refresh dashboard
    updateDashboard();


    alert("✅ Medicine saved successfully!");
}



/* =====================================================
   DISPLAY MEDICINES
===================================================== */

function displayMedicines() {

    const container =
        document.getElementById("medicineList");


    const search =
        document
            .getElementById("searchMedicine")
            .value
            .toLowerCase()
            .trim();


    const filter =
        document
            .getElementById("filterMedicine")
            .value;


    container.innerHTML = "";


    const filteredMedicines =
        medicines.filter(medicine => {

            const status =
                getMedicineStatus(
                    medicine.expiryDate
                );


            const matchesSearch =
                medicine.name
                    .toLowerCase()
                    .includes(search) ||
                medicine.batch
                    .toLowerCase()
                    .includes(search);


            const matchesFilter =
                filter === "all" ||
                status.type === filter;


            return matchesSearch && matchesFilter;

        });


    if (filteredMedicines.length === 0) {

        container.innerHTML = 
            <div class="empty-state"
                 style="grid-column:1/-1;
                        text-align:center;
                        padding:50px;
                        color:#7b8794;">

                <div style="font-size:45px;">💊</div>

                <h3>No medicines found</h3>

                <p>
                    Add a medicine to start managing
                    your medicine inventory.
                </p>

            </div>
        ;

        return;

    }


    filteredMedicines.forEach(medicine => {

        const status =
            getMedicineStatus(
                medicine.expiryDate
            );


        const card =
            document.createElement("div");


        card.className =
            "medicine-card";


        card.innerHTML = 

            <div class="medicine-header">

                <h3>${escapeHTML(medicine.name)}</h3>

                <div class="medicine-icon-small">
                    💊
                </div>

            </div>


            <div class="medicine-info">

                <p>
                    <span>Batch</span>
                    <strong>
                        ${escapeHTML(medicine.batch)}
                    </strong>
                </p>


                <p>
                    <span>Quantity</span>
                    <strong>
                        ${medicine.quantity}
                    </strong>
                </p>


                <p>
                    <span>Manufactured</span>
                    <strong>
                        ${formatDate(
                            medicine.manufacturingDate
                        )}
                    </strong>
                </p>


                <p>
                    <span>Expiry</span>
                    <strong>
                        ${formatDate(
                            medicine.expiryDate
                        )}
                    </strong>
                </p>

            </div>


            <span class="status status-${status.type}">
                ${status.type === "safe" ? "✓" : "⚠"}
                ${status.text}
            </span>


            <button
                class="delete-btn"
                onclick="deleteMedicine(${medicine.id})">

                🗑 Delete Medicine

            </button>

        ;


        container.appendChild(card);

    });

}


/* =====================================================
   DELETE MEDICINE
===================================================== */

function deleteMedicine(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this medicine?"
        );


    if (!confirmed) {
        return;
    }


    medicines =
        medicines.filter(
            medicine =>
                medicine.id !== id
        );


    saveMedicines();

    displayMedicines();

    updateDashboard();

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    let safe = 0;

    let expiring = 0;

    let expired = 0;


    medicines.forEach(medicine => {

        const status =
            getMedicineStatus(
                medicine.expiryDate
            );


        if (status.type === "safe") {
            safe++;
        }

        else if (status.type === "expiring") {
            expiring++;
        }

        else if (status.type === "expired") {
            expired++;
        }

    });


    document
        .getElementById("totalMedicines")
        .textContent = medicines.length;


    document
        .getElementById("safeMedicines")
        .textContent = safe;


    document
        .getElementById("expiringMedicines")
        .textContent = expiring;


    document
        .getElementById("expiredMedicines")
        .textContent = expired;

}


/* =====================================================
   TAMIL NADU DOCTOR DIRECTORY
===================================================== */

/*
   IMPORTANT:
   These are DEMONSTRATION records.
   Replace them with verified doctor/hospital
   information before publishing the website.
*/

const doctors = [

    {
        name: "Dr. Arun Kumar",
        speciality: "General Physician",
        city: "Chennai",
        hospital: "Chennai Healthcare Centre",
        phone: "+91 90000 00001"
    },

    {
        name: "Dr. Priya Devi",
        speciality: "Pediatrician",
        city: "Coimbatore",
        hospital: "Coimbatore Medical Centre",
        phone: "+91 90000 00002"
    },

    {
        name: "Dr. Rajesh Kumar",
        speciality: "Cardiologist",
        city: "Madurai",
        hospital: "Madurai Heart Centre",
        phone: "+91 90000 00003"
    },

    {
        name: "Dr. Meena Lakshmi",
        speciality: "Dermatologist",
        city: "Salem",
        hospital: "Salem Skin Care Centre",
        phone: "+91 90000 00004"
    },

    {
        name: "Dr. Karthik Raj",
        speciality: "Orthopedic Specialist",
        city: "Tiruchirappalli",
        hospital: "Trichy Ortho Care",
        phone: "+91 90000 00005"
    },

    {
        name: "Dr. Divya Anand",
        speciality: "General Physician",
        city: "Tiruppur",
        hospital: "Tiruppur Health Centre",
        phone: "+91 90000 00006"
    },

    {
        name: "Dr. Suresh Babu",
        speciality: "ENT Specialist",
        city: "Erode",
        hospital: "Erode ENT Centre",
        phone: "+91 90000 00007"
    },

    {
        name: "Dr. Nandhini",
        speciality: "Gynecologist",
        city: "Tirunelveli",
        hospital: "Tirunelveli Women's Centre",
        phone: "+91 90000 00008"
    },

    {
        name: "Dr. Mohammed Ali",
        speciality: "General Physician",
        city: "Vellore",
        hospital: "Vellore Health Centre",
        phone: "+91 90000 00009"
    }

];


/* =====================================================
   DISPLAY DOCTORS
===================================================== */

function displayDoctors() {

    const container =
        document.getElementById("doctorList");


    const search =
        document
            .getElementById("doctorSearch")
            .value
            .toLowerCase()
            .trim();


    container.innerHTML = "";


    const filteredDoctors =
        doctors.filter(doctor => {

            return (

                doctor.name
                    .toLowerCase()
                    .includes(search) ||

                doctor.speciality
                    .toLowerCase()
                    .includes(search) ||

                doctor.city
                    .toLowerCase()
                    .includes(search)

            );

        });


    if (filteredDoctors.length === 0) {

        container.innerHTML = `
            <div style="grid-column:1/-1;
                        text-align:center;
                        padding:40px;">

                <h3>No doctor found</h3>

                <p>
                    Try another name, speciality or city.
                </p>

            </div>
        `;

        return;

    }


    filteredDoctors.forEach(doctor => {

        const card =
            document.createElement("div");


        card.className =
            "doctor-card";


        const phone =
            doctor.phone
                .replace(/\s/g, "");


        card.innerHTML = `

            <div class="doctor-avatar">
                👨‍⚕️
            </div>


            <h3>
                ${escapeHTML(doctor.name)}
            </h3>


            <div class="speciality">
                ${escapeHTML(doctor.speciality)}
            </div>


            <p>
                📍 ${escapeHTML(doctor.city)}
            </p>


            <p>
                🏥 ${escapeHTML(doctor.hospital)}
            </p>


            <a
                class="call-btn"
                href="tel:${phone}">

                📞 Contact

            </a>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
   SECURITY HELPER
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   MODAL CLICK OUTSIDE
===================================================== */

document
    .getElementById("medicineModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeMedicineForm();

        }

    });


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

displayMedicines();

updateDashboard();

displayDoctors();

