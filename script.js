function checkExpiry() {

```
const medicineName =
    document.getElementById("medicineName").value.trim();

const expiryDate =
    document.getElementById("expiryDate").value;

const result =
    document.getElementById("result");


// Check empty fields

if (medicineName === "" || expiryDate === "") {

    result.className = "warning";

    result.innerHTML =
        "⚠️ Please enter medicine name and expiry date.";

    return;
}


// Current date

const today = new Date();

today.setHours(0, 0, 0, 0);


// Expiry date

const expiry = new Date(expiryDate + "T00:00:00");

expiry.setHours(0, 0, 0, 0);


// Difference between dates

const difference =
    expiry.getTime() - today.getTime();

const days =
    Math.ceil(difference / (1000 * 60 * 60 * 24));


// Expired

if (days < 0) {

    result.className = "expired";

    result.innerHTML =
        "❌ " + medicineName +
        "<br><br>" +
        "Medicine is EXPIRED." +
        "<br>" +
        "Expiry Date: " +
        formatDate(expiryDate);

}


// Expires today

else if (days === 0) {

    result.className = "expired";

    result.innerHTML =
        "⚠️ " + medicineName +
        "<br><br>" +
        "Medicine expires TODAY." +
        "<br>" +
        "Expiry Date: " +
        formatDate(expiryDate);

}


// Expires within 30 days

else if (days <= 30) {

    result.className = "warning";

    result.innerHTML =
        "⚠️ " + medicineName +
        "<br><br>" +
        "Medicine is EXPIRING SOON." +
        "<br>" +
        days + " days remaining." +
        "<br>" +
        "Expiry Date: " +
        formatDate(expiryDate);

}


// Valid

else {

    result.className = "valid";

    result.innerHTML =
        "✅ " + medicineName +
        "<br><br>" +
        "Medicine is VALID." +
        "<br>" +
        days + " days remaining." +
        "<br>" +
        "Expiry Date: " +
        formatDate(expiryDate);

}
```

}

// Convert YYYY-MM-DD to DD-MM-YYYY

function formatDate(dateString) {

```
const parts = dateString.split("-");

return parts[2] + "-" +
       parts[1] + "-" +
       parts[0];
```

}
