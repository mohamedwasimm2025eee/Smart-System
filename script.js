* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f5f9fc;
    color: #183b56;
}


/* =========================
   NAVBAR
========================= */

.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;

    height: 75px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 7%;

    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);

    border-bottom: 1px solid #e4edf3;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;

    font-size: 22px;
    font-weight: 800;
}

.logo i {
    font-size: 28px;
    color: #0a9b8f;
}

.logo span span {
    color: #0a9b8f;
}

.navbar nav {
    display: flex;
    gap: 30px;
}

.navbar nav a {
    text-decoration: none;
    color: #526777;
    font-weight: 600;
    transition: 0.3s;
}

.navbar nav a:hover {
    color: #0a9b8f;
}

.menu-btn {
    display: none;

    border: none;
    background: none;

    font-size: 24px;
}


/* =========================
   HERO
========================= */

.hero {
    min-height: 620px;

    display: flex;
    align-items: center;

    background:
        radial-gradient(circle at 80% 20%, #dff8f5, transparent 35%),
        linear-gradient(135deg, #f5fffe, #eef8ff);

    padding: 70px 7%;
}

.hero-content {
    width: 100%;

    display: grid;
    grid-template-columns: 1.2fr 0.8fr;

    align-items: center;

    gap: 80px;
}

.tag {
    display: inline-block;

    background: #e1f8f5;
    color: #087f76;

    padding: 10px 18px;

    border-radius: 50px;

    font-size: 14px;
    font-weight: 700;
}

.hero h1 {
    font-size: clamp(42px, 6vw, 70px);

    line-height: 1.05;

    margin: 25px 0;
}

.hero h1 span {
    display: block;
    color: #0a9b8f;
}

.hero-text p {
    max-width: 650px;

    font-size: 18px;

    line-height: 1.7;

    color: #627888;
}

.hero-buttons {
    display: flex;
    gap: 15px;

    margin-top: 35px;
}

.primary-btn,
.secondary-btn {
    display: inline-flex;

    align-items: center;
    gap: 10px;

    padding: 15px 25px;

    border-radius: 12px;

    text-decoration: none;

    font-weight: 700;

    transition: 0.3s;
}

.primary-btn {
    background: #0a9b8f;
    color: white;
}

.primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(10,155,143,0.25);
}

.secondary-btn {
    background: white;
    color: #087f76;

    border: 1px solid #d7e9e7;
}

.secondary-btn:hover {
    transform: translateY(-3px);
}


/* HERO CARD */

.hero-card {
    background: white;

    padding: 45px;

    border-radius: 30px;

    box-shadow:
        0 25px 70px rgba(34,79,102,0.12);

    text-align: center;
}

.medicine-icon {
    width: 100px;
    height: 100px;

    margin: auto auto 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #e2f8f5;

    border-radius: 30px;

    color: #0a9b8f;

    font-size: 45px;
}

.hero-card h3 {
    font-size: 25px;
    margin-bottom: 15px;
}

.hero-card p {
    color: #718392;
    line-height: 1.7;
}

.safe-status {
    margin-top: 25px;

    padding: 13px;

    background: #edfaf4;

    color: #188653;

    border-radius: 10px;

    font-weight: 700;
}


/* =========================
   SECTION
========================= */

.section {
    padding: 90px 7%;
}

.section-title {
    text-align: center;

    margin-bottom: 45px;
}

.section-title span {
    color: #0a9b8f;

    font-size: 14px;

    font-weight: 800;

    text-transform: uppercase;

    letter-spacing: 1px;
}

.section-title h2 {
    font-size: 38px;

    margin: 10px 0;
}

.section-title p {
    color: #718392;
}


/* =========================
   DASHBOARD
========================= */

.dashboard-grid {
    display: grid;

    grid-template-columns: repeat(4,1fr);

    gap: 20px;
}

.stat-card {
    background: white;

    padding: 25px;

    border-radius: 18px;

    display: flex;

    align-items: center;

    gap: 18px;

    box-shadow: 0 10px 35px rgba(30,70,90,0.07);

    transition: 0.3s;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-icon {
    width: 55px;
    height: 55px;

    border-radius: 15px;

    display: flex;

    align-items: center;
    justify-content: center;

    font-size: 23px;
}

.blue {
    background: #e8f2ff;
    color: #377bd6;
}

.green {
    background: #e7f8ef;
    color: #1c9c61;
}

.orange {
    background: #fff3dd;
    color: #e49b21;
}

.red {
    background: #ffe9e9;
    color: #df5151;
}

.stat-card h3 {
    font-size: 27px;
}

.stat-card p {
    color: #7b8c98;

    margin-top: 4px;
}


/* =========================
   MEDICINE SECTION
========================= */

.medicine-section {
    background: #eef8f7;
}

.medicine-container {
    display: grid;

    grid-template-columns: 1fr 0.75fr;

    gap: 30px;

    max-width: 1200px;

    margin: auto;
}

.form-card,
.info-card,
.medicine-list {
    background: white;

    border-radius: 25px;

    padding: 35px;

    box-shadow: 0 15px 45px rgba(30,70,90,0.07);
}

.form-card h3 {
    font-size: 23px;

    margin-bottom: 30px;

    display: flex;

    gap: 10px;

    align-items: center;
}

.form-card h3 i {
    color: #0a9b8f;
}

.input-group {
    margin-bottom: 20px;

    flex: 1;
}

.input-group label {
    display: block;

    margin-bottom: 8px;

    font-size: 14px;

    font-weight: 700;

    color: #405b6c;
}

.input-group input,
.input-group select,
.doctor-filter select {
    width: 100%;

    padding: 14px 15px;

    border: 1px solid #dce8ee;

    border-radius: 10px;

    outline: none;

    font-size: 15px;

    background: white;
}

.input-group input:focus,
.input-group select:focus {
    border-color: #0a9b8f;

    box-shadow: 0 0 0 3px rgba(10,155,143,0.08);
}

.input-row {
    display: flex;

    gap: 15px;
}

.shelf-input {
    display: flex;
    gap: 8px;
}

.shelf-input input {
    width: 55%;
}

.shelf-input select {
    width: 45%;
}


/* EXPIRY */

.expiry-preview {
    display: flex;

    align-items: center;

    gap: 15px;

    padding: 18px;

    background: #edfafa;

    border: 1px solid #cfeeea;

    border-radius: 14px;

    margin: 10px 0 20px;
}

.expiry-preview > div:first-child {
    width: 45px;
    height: 45px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #0a9b8f;

    color: white;

    border-radius: 12px;
}

.expiry-preview small {
    display: block;

    color: #66808c;

    margin-bottom: 4px;
}

.expiry-preview strong {
    color: #087f76;
}


/* BUTTON */

.add-btn {
    width: 100%;

    padding: 15px;

    border: none;

    border-radius: 12px;

    background: #0a9b8f;

    color: white;

    font-size: 16px;

    font-weight: 700;

    cursor: pointer;

    transition: 0.3s;
}

.add-btn:hover {
    background: #087f76;

    transform: translateY(-2px);
}


/* =========================
   INFO CARD
========================= */

.info-icon {
    width: 60px;
    height: 60px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #fff3dc;

    color: #df991f;

    border-radius: 17px;

    font-size: 25px;

    margin-bottom: 20px;
}

.info-card h3 {
    font-size: 25px;

    margin-bottom: 25px;
}

.step {
    display: flex;

    gap: 15px;

    margin: 22px 0;
}

.step span {
    min-width: 40px;
    height: 40px;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #e8f8f6;

    color: #0a9b8f;

    border-radius: 50%;

    font-weight: 800;

    font-size: 12px;
}

.step strong {
    display: block;

    margin-bottom: 4px;
}

.step p {
    color: #718392;

    font-size: 14px;

    line-height: 1.5;
}

.warning-box {
    display: flex;

    gap: 10px;

    padding: 15px;

    background: #fff8e9;

    border-radius: 12px;

    color: #9a6a1b;

    font-size: 13px;

    line-height: 1.5;
}


/* =========================
   MEDICINE LIST
========================= */

.medicine-list {
    margin-top: 30px;
}

.list-header {
    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-bottom: 25px;
}

.list-header h3 {
    font-size: 24px;
}

.list-header p {
    color: #7b8c98;

    margin-top: 5px;
}

.search-box {
    display: flex;

    align-items: center;

    gap: 10px;

    border: 1px solid #dce8ee;

    border-radius: 10px;

    padding: 0 15px;

    width: 280px;
}

.search-box i {
    color: #7c919d;
}

.search-box input {
    width: 100%;

    border: none;

    outline: none;

    padding: 13px 0;

    font-size: 14px;
}


/* TABLE */

.medicine-table {
    width: 100%;

    border-collapse: collapse;
}

.medicine-table th {
    text-align: left;

    padding: 15px;

    background: #f4f8fa;

    color: #5d7380;

    font-size: 13px;
}

.medicine-table td {
    padding: 17px 15px;

    border-bottom: 1px solid #edf1f3;

    font-size: 14px;
}

.status {
    display: inline-block;

    padding: 7px 12px;

    border-radius: 20px;

    font-size: 12px;

    font-weight: 700;
}

.status.safe {
    background: #e7f8ef;
    color: #198754;
}

.status.warning {
    background: #fff3dc;
    color: #c58315;
}

.status.expired {
    background: #ffe7e7;
    color: #d84b4b;
}

.delete-btn {
    border: none;

    background: #ffecec;

    color: #d64d4d;

    padding: 8px 10px;

    border-radius: 8px;

    cursor: pointer;
}


/* EMPTY */

.empty-state {
    text-align: center;

    padding: 50px 20px;

    color: #7c8e99;
}

.empty-state i {
    font-size: 50px;

    margin-bottom: 15px;

    color: #b5c7d0;
}

.empty-state h3 {
    color: #4e6675;

    margin-bottom: 8px;
}


/* =========================
   DOCTORS
========================= */

.doctors-section {
    background: #ffffff;
}

.doctor-filter {
    max-width: 700px;

    margin: 0 auto 40px;

    display: flex;

    gap: 15px;
}

.doctor-grid {
    display: grid;

    grid-template-columns: repeat(3,1fr);

    gap: 20px;
}

.doctor-card {
    background: white;

    border: 1px solid #e5edf1;

    border-radius: 20px;

    padding: 25px;

    transition: 0.3s;
}

.doctor-card:hover {
    transform: translateY(-5px);

    box-shadow: 0 15px 40px rgba(30,70,90,0.1);
}

.doctor-avatar {
    width: 65px;
    height: 65px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 50%;

    background: #e2f7f5;

    color: #0a9b8f;

    font-size: 25px;

    margin-bottom: 18px;
}

.doctor-card h3 {
    margin-bottom: 7px;
}

.specialty {
    color: #0a9b8f;

    font-weight: 700;

    font-size: 14px;

    margin-bottom: 15px;
}

.doctor-info {
    display: flex;

    gap: 10px;

    margin: 9px 0;

    color: #667b87;

    font-size: 14px;
}

.call-btn {
    display: block;

    text-align: center;

    margin-top: 20px;

    padding: 12px;

    background: #eaf8f6;

    color: #087f76;

    text-decoration: none;

    border-radius: 10px;

    font-weight: 700;
}


/* =========================
   SAFETY
========================= */

.safety-section {
    padding: 60px 7%;

    background: #0a9b8f;

    color: white;
}

.safety-content {
    max-width: 1100px;

    margin: auto;

    display: flex;

    align-items: center;

    gap: 25px;
}

.safety-icon {
    width: 75px;
    height: 75px;

    flex-shrink: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    background: rgba(255,255,255,0.15);

    border-radius: 20px;

    font-size: 32px;
}

.safety-content p {
    margin-top: 8px;

    opacity: 0.9;

    line-height: 1.6;
}


/* =========================
   FOOTER
========================= */

footer {
    background: #102f42;

    color: white;

    padding: 50px 7% 20px;
}

.footer-content p {
    color: #a7bbc6;

    margin-top: 10px;
}

.footer-bottom {
    border-top: 1px solid #315062;

    margin-top: 35px;

    padding-top: 20px;

    display: flex;

    justify-content: space-between;

    color: #9cb0bb;

    font-size: 13px;
}


/* =========================
   TOAST
========================= */

.toast {
    position: fixed;

    right: 25px;
    bottom: 25px;

    background: #183b56;

    color: white;

    padding: 15px 20px;

    border-radius: 12px;

    display: flex;

    gap: 10px;

    align-items: center;

    transform: translateY(120px);

    opacity: 0;

    transition: 0.4s;

    z-index: 5000;
}

.toast.show {
    transform: translateY(0);

    opacity: 1;
}

.toast i {
    color: #52d4b9;
}


/* =========================
   MOBILE
========================= */

@media(max-width: 900px) {

    .navbar nav {
        display: none;
    }

    .menu-btn {
        display: block;
    }

    .hero-content {
        grid-template-columns: 1fr;

        gap: 40px;
    }

    .dashboard-grid {
        grid-template-columns: repeat(2,1fr);
    }

    .medicine-container {
        grid-template-columns: 1fr;
    }

    .doctor-grid {
        grid-template-columns: repeat(2,1fr);
    }

}


@media(max-width: 600px) {

    .navbar {
        padding: 0 5%;
    }

    .hero {
        padding: 60px 5%;
    }

    .section {
        padding: 65px 5%;
    }

    .hero h1 {
        font-size: 42px;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .primary-btn,
    .secondary-btn {
        justify-content: center;
    }

    .dashboard-grid {
        grid-template-columns: 1fr;
    }

    .input-row {
        flex-direction: column;

        gap: 0;
    }

    .shelf-input {
        flex-direction: column;
    }

    .shelf-input input,
    .shelf-input select {
        width: 100%;
    }

    .list-header {
        flex-direction: column;

        align-items: stretch;

        gap: 15px;
    }

    .search-box {
        width: 100%;
    }

    .medicine-table {
        min-width: 750px;
    }

    .medicine-list {
        overflow-x: auto;
    }

    .doctor-grid {
        grid-template-columns: 1fr;
    }

    .doctor-filter {
        flex-direction: column;
    }

    .safety-content {
        align-items: flex-start;
    }

    .footer-bottom {
        flex-direction: column;

        gap: 10px;
    }

}
