document.addEventListener("DOMContentLoaded", function () {

    const medicineName =
        document.getElementById("medicineName");

    const batchNumber =
        document.getElementById("batchNumber");

    const expiryDate =
        document.getElementById("expiryDate");

    const checkButton =
        document.getElementById("checkButton");

    const clearButton =
        document.getElementById("clearButton");

    const resultCard =
        document.getElementById("resultCard");


    /* ================= CHECK BUTTON ================= */

    checkButton.addEventListener("click", function () {

        const name =
            medicineName.value.trim();

        const batch =
            batchNumber.value.trim();

        const date =
            expiryDate.value;


        /* Empty field check */

        if (name === "" || batch === "" || date === "") {

            showError(
                "Please fill all fields",
                "Medicine name, batch number and expiry date are required."
            );

            return;
        }


        /* Create dates safely */

        const today = new Date();

        today.setHours(0, 0, 0, 0);


        const expiry = new Date(
            date + "T00:00:00"
        );

        expiry.setHours(0, 0, 0, 0);


        /* Check invalid date */

        if (Number.isNaN(expiry.getTime())) {

            showError(
                "Invalid Date",
                "Please select a valid expiry date."
            );

            return;
        }


        /* Calculate days */

        const difference =
            expiry.getTime() -
            today.getTime();

        const days =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        /* Format date */

        const formattedDate =
            expiry.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        /* ================= EXPIRED ================= */

        if (days < 0) {

            showResult(
                "expired",
                "❌",
                "Medicine Expired",
                "The entered expiry date has already passed.",
                name,
                batch,
                formattedDate,
                "Expired"
            );

        }


        /* ================= TODAY ================= */

        else if (days === 0) {

            showResult(
                "expired",
                "⚠️",
                "Expires Today",
                "The medicine reaches its entered expiry date today.",
                name,
                batch,
                formattedDate,
                "Expires Today"
            );

        }


        /* ================= SOON ================= */

        else if (days <= 30) {

            showResult(
                "warning",
                "⚠️",
                "Expiring Soon",
                "The medicine expires within the next 30 days.",
                name,
                batch,
                formattedDate,
                days + " days remaining"
            );

        }


        /* ================= VALID ================= */

        else {

            showResult(
                "valid",
                "✓",
                "Medicine is Valid",
                "The entered expiry date has not passed.",
                name,
                batch,
                formattedDate,
                days + " days remaining"
            );

        }

    });


    /* ================= CLEAR BUTTON ================= */

    clearButton.addEventListener("click", function () {

        medicineName.value = "";

        batchNumber.value = "";

        expiryDate.value = "";


        resultCard.innerHTML = `

            <div class="empty-result">

                <div class="empty-icon">
                    💊
                </div>

                <h3>
                    Ready to Check
                </h3>

                <p>
                    Enter medicine details and click
                    "Check Expiry".
                </p>

            </div>

        `;

    });


    /* ================= SHOW RESULT ================= */

    function showResult(
        type,
        icon,
        title,
        message,
        medicine,
        batch,
        date,
        status
    ) {

        resultCard.innerHTML = `

            <div class="result-content ${type}">

                <div class="status-icon">
                    ${icon}
                </div>

                <div class="status-title">
                    ${title}
                </div>

                <div class="status-message">
                    ${message}
                </div>


                <div class="medicine-info">

                    <div class="info-row">

                        <span class="info-label">
                            Medicine
                        </span>

                        <span class="info-value">
                            ${escapeHTML(medicine)}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Batch Number
                        </span>

                        <span class="info-value">
                            ${escapeHTML(batch)}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Expiry Date
                        </span>

                        <span class="info-value">
                            ${date}
                        </span>

                    </div>


                    <div class="info-row">

                        <span class="info-label">
                            Status
                        </span>

                        <span class="info-value">
                            ${status}
                        </span>

                    </div>

                </div>

            </div>

        `;

    }


    /* ================= ERROR ================= */

    function showError(title, message) {

        resultCard.innerHTML = `

            <div class="result-content error">

                <div class="status-icon">
                    ⚠️
                </div>

                <div class="status-title">
                    ${title}
                </div>

                <div class="status-message">
                    ${message}
                </div>

            </div>

        `;

    }


    /* ================= SECURITY ================= */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }

});
