/* ================= FIREBASE CONFIG ================= */
const firebaseConfig = {
  apiKey: "AIzaSyCNQN8_KBaUgmaNmBdQ09HvrjpyiFh5lt8",
  authDomain: "hello96-35c0c.firebaseapp.com",
  projectId: "hello96-35c0c",
  storageBucket: "hello96-35c0c.firebasestorage.app",
  messagingSenderId: "763043295632",
  appId: "1:763043295632:web:2e6e39c6f62e893daf0315",
  measurementId: "G-93JLDNE0G3"
};

// ================= ASSETS =================
const AUDIO_BDAY = new Audio('sounds/birthday.mp3'); 
const AUDIO_ANNOUNCE = new Audio('sounds/announce.mp3');
const VIBER_ICON = "https://cdn-icons-png.flaticon.com/512/3670/3670059.png";
const EDIT_ICON = "https://cdn-icons-png.flaticon.com/512/1159/1159633.png";
const DELETE_ICON = "https://cdn-icons-png.flaticon.com/512/1214/1214428.png";
const DEFAULT_AVATAR = "https://i.ibb.co/XfWr4xSD/Profile-icon.webp";

// ================= APP STATE =================
let contacts = []; 
let isAdmin = false;
let currentFilter = 'all';
let auth, db;
let bdayCount = 0;
let announceCount = 0;
let pendingSounds = [];

// ================= INIT =================
window.onload = () => {
    try {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        
        db.enablePersistence().catch(err => console.log("Persistence:", err.code));

        auth.onAuthStateChanged(user => {
            isAdmin = !!user;
            const btnText = isAdmin ? '<i class="fas fa-sign-out-alt"></i> Logout' : '<i class="fas fa-user-lock"></i> Admin Login';
            document.getElementById("menuAdminBtn").innerHTML = btnText;
            toggleUI(isAdmin);
            if(contacts.length > 0) renderContacts();
        });

        db.collection('contacts').onSnapshot(snapshot => {
            let rawData = [];
            snapshot.forEach(doc => rawData.push({ id: doc.id, ...doc.data() }));
            contacts = sortContactsMaster(rawData); 
            checkBirthdays(); 
            renderContacts(); 
            const loadingText = document.getElementById("contactList");
            if(contacts.length>0 && loadingText.innerText.includes("Loading")) loadingText.innerHTML="";
        });

        db.collection('settings').doc('announcement').onSnapshot(doc => {
            if (doc.exists) {
                const data = doc.data();
                const adText = document.getElementById("announceText");
                const adCheck = document.getElementById("announceActive");
                if(adText) adText.value = data.text || "";
                if(adCheck) adCheck.checked = data.active || false;

                if (data.active && data.text) {
                    const lastId = localStorage.getItem('lastAnnounceID');
                    const currentId = data.id ? String(data.id) : data.text; 
                    if (lastId !== currentId) {
                        document.getElementById("userAnnounceText").innerText = data.text;
                        openModal('userAnnounceModal');
                        announceCount = 1;
                        updateUnifiedBadge();
                        queueSound(AUDIO_ANNOUNCE);
                        localStorage.setItem('lastAnnounceID', currentId);
                    }
                }
            }
        });

        const unlockAudio = () => {
            if(pendingSounds.length > 0) {
                pendingSounds.forEach(audio => audio.play().catch(()=>{}));
                pendingSounds = []; 
            }
            AUDIO_ANNOUNCE.play().then(()=>{AUDIO_ANNOUNCE.pause(); AUDIO_ANNOUNCE.currentTime=0;}).catch(()=>{});
        };
        document.body.addEventListener('click', unlockAudio, { once: true });
        document.body.addEventListener('touchstart', unlockAudio, { once: true });

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            document.querySelector('#themeToggle i').className = 'fas fa-sun';
        }
        setupImg("addPhotoFile", "photo", "addPreview");
        setupImg("editPhotoFile", "editPhoto", "editPreview");

    } catch (e) { console.error(e); }
};

// ================= LOGIC =================

function queueSound(audio) {
    const playPromise = audio.play();
    if (playPromise !== undefined) playPromise.catch(() => {
         if(!pendingSounds.includes(audio)) pendingSounds.push(audio);
    });
}

function sortContactsMaster(data) {
    const t = new Date();
    const todayStr = `-${String(todayStrHelper(t))}`;
    return data.sort((a, b) => {
        let scoreA = 0, scoreB = 0;
        if (a.dob && a.dob.includes(todayStr)) scoreA += 100;
        if (b.dob && b.dob.includes(todayStr)) scoreB += 100;
        if (a.isFav) scoreA += 50;
        if (b.isFav) scoreB += 50;
        if (scoreA !== scoreB) return scoreB - scoreA;
        return (a.name || "").localeCompare(b.name || "");
    });
}

function checkBirthdays() {
    const t = new Date();
    const m = `-${String(todayStrHelper(t))}`;
    const list = contacts.filter(c => c.dob && c.dob.includes(m));
    bdayCount = list.length;
    if (list.length > 0) {
        document.getElementById("notifBtn").onclick = () => {
             AUDIO_BDAY.currentTime = 0; 
             AUDIO_BDAY.play().catch(()=>{});
             document.getElementById("birthdayBox").style.display = "flex";
             document.getElementById("birthdayNames").innerHTML = list.map(p => `
                <div style="padding:5px 0;"><i class="fas fa-gift" style="color:#f43f5e"></i> <b>${p.name}</b> (${p.dob})</div>`).join('');
        };
        document.getElementById("closeBday").onclick = () => {
            document.getElementById("birthdayBox").style.display = "none";
            AUDIO_BDAY.pause(); AUDIO_BDAY.currentTime = 0;
        };
    } else {
        document.getElementById("notifBtn").onclick = () => alert("No birthdays today");
    }
    updateUnifiedBadge();
}

function todayStrHelper(date) { return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function updateUnifiedBadge() {
    const total = bdayCount + announceCount;
    const badge = document.getElementById("notifBadge");
    badge.style.display = total > 0 ? "flex" : "none";
    badge.innerText = total;
}

// ================= RENDER =================
function renderContacts() {
    const list = document.getElementById("contactList");
    const favList = document.getElementById("favList");
    const favCont = document.getElementById("favContainer");
    list.innerHTML = ""; favList.innerHTML = "";

    let npt = 0, ygn = 0, other = 0, fav = 0;
    contacts.forEach(c => {
        const ad = (c.address || "").toLowerCase();
        if (c.isFav) fav++;
        if (ad.includes("naypyitaw") || ad.includes("napyidaw")) npt++;
        else if (ad.includes("yangon")) ygn++;
        else other++;
    });
    document.getElementById("countNPT").innerText = npt;
    document.getElementById("countYGN").innerText = ygn;
    document.getElementById("countOther").innerText = other;
    document.getElementById("favCountDisplay").innerText = fav;
    document.getElementById("totalCountDisplay").innerText = contacts.length;

    let data = contacts; 
    const q = document.getElementById("searchInput").value.toLowerCase().trim();
    if (q) data = data.filter(c => (c.name || "").toLowerCase().startsWith(q) || formatShow(c.phone1).includes(q));
    
    if (currentFilter !== 'all') {
        if (currentFilter === 'fav') data = data.filter(c => c.isFav);
        else if (currentFilter === 'naypyitaw') data = data.filter(c => (c.address||"").toLowerCase().includes("naypyitaw"));
        else if (currentFilter === 'yangon') data = data.filter(c => (c.address||"").toLowerCase().includes("yangon"));
        else if (currentFilter === 'other') data = data.filter(c => !(c.address||"").toLowerCase().includes("yangon") && !(c.address||"").toLowerCase().includes("naypyitaw"));
    }

    favCont.style.display = "none";
    if (currentFilter !== 'all' || q !== "") {
        data.forEach(c => list.appendChild(createCard(c)));
    } else {
        const favs = data.filter(c => c.isFav);
        const norms = data.filter(c => !c.isFav);
        if (favs.length > 0) {
            favCont.style.display = "block";
            favs.forEach(c => favList.appendChild(createCard(c)));
        }
        norms.forEach(c => list.appendChild(createCard(c)));
    }
}

// === FINAL FIX FOR WebIntoApp + Default Browser Setting ===
function createCard(c) {
    const div = document.createElement("div");
    const t = new Date();
    const m = `-${String(todayStrHelper(t))}`;
    const isBirthday = c.dob && c.dob.includes(m);
    div.className = `contact-card ${isBirthday ? 'birthday-highlight' : ''}`;
    if (isBirthday) div.style.border = "2px solid #f43f5e";
    
    // Viber Setup
    let phone1Html = "";
    if (c.phone1) {
        const showNum = formatShow(c.phone1);
        
        // Use CLEAN Standard Viber URL
        // We rely on WebIntoApp's "Default Browser" setting to handle this.
        const viberCleanNum = String(c.phone1).replace(/\D/g, '');
        let finalViberNum = viberCleanNum;
        
        // Standardize to 959...
        if (finalViberNum.startsWith("09")) finalViberNum = "95" + finalViberNum.substring(1);
        else if (finalViberNum.startsWith("9") && finalViberNum.length >= 8 && !finalViberNum.startsWith("95")) finalViberNum = "95" + finalViberNum;

        // Use viber:// scheme directly with target="_blank"
        // Encoded '+' is usually required: %2B
        // Example: viber://chat?number=%2B959...
        const viberUrl = `viber://chat?number=%2B${finalViberNum}`;

        phone1Html = `
        <div class="info-row">
            <i class="fas fa-phone-alt" style="color:var(--success);"></i>
            <a href="tel:${showNum}" class="phone-link">${showNum}</a>
            <!-- target="_blank" is KEY here -->
            <a href="${viberUrl}" target="_blank">
                <img src="${VIBER_ICON}" class="viber-icon-img" alt="Viber">
            </a>
        </div>`;
    }

    let phone2Html = "";
    if (c.phone2) {
        const showNum2 = formatShow(c.phone2);
        phone2Html = `<div class="info-row"><i class="fas fa-phone-alt" style="color:var(--success);"></i><a href="tel:${showNum2}" class="phone-link">${showNum2}</a></div>`;
    }
    const addressHtml = c.address ? `<div class="address-row"><i class="fas fa-map-marker-alt"></i> <span>${c.address}</span></div>` : "";

    div.innerHTML = `
        <button class="btn-fav ${c.isFav ? 'active' : ''}" onclick="toggleFav('${c.id}', ${c.isFav})"><i class="${c.isFav ? 'fas' : 'far'} fa-star"></i></button>
        <div class="card-left-col">
            <img src="${c.photo || DEFAULT_AVATAR}" class="contact-avatar">
            ${isBirthday ? '<span style="font-size:10px; color:red; font-weight:bold;">BDAY</span>' : ''}
            <div class="admin-actions-row" style="display:${isAdmin ? 'flex' : 'none'}">
                <img src="${EDIT_ICON}" class="icon-admin-btn" onclick="openEdit('${c.id}')">
                <img src="${DELETE_ICON}" class="icon-admin-btn" onclick="delContact('${c.id}')">
            </div>
        </div>
        <div class="contact-info">
            <div class="name">${c.name || "No Name"} ${isBirthday ? '🎂' : ''}</div>
            ${phone1Html} ${phone2Html} ${addressHtml}
        </div>
    `;
    return div;
}

// ================= HELPERS =================

function formatShow(n) { 
    if (!n) return ""; 
    let s = String(n); 
    if (s.startsWith("959")) s = "09" + s.substring(3); 
    return s; 
}

function formatViber(n) {
    if (!n) return "";
    let str = String(n).replace(/\D/g, ''); 
    if (str.startsWith("09")) str = "95" + str.substring(1);
    else if (str.startsWith("9") && str.length >= 8 && !str.startsWith("95")) str = "95" + str;
    return str; 
}

function setupImg(inId, outId, prevId) {
    const input = document.getElementById(inId);
    if(!input) return;
    input.onchange = (e) => {
        const r = new FileReader();
        r.onload = (ev) => {
            const i = new Image();
            i.onload = () => {
                const c = document.createElement("canvas");
                const s = 150 / i.width;
                c.width = 150; c.height = i.height * s;
                c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
                document.getElementById(outId).value = c.toDataURL("image/jpeg", 0.7);
                document.getElementById(prevId).src = c.toDataURL("image/jpeg", 0.7);
                document.getElementById(prevId).style.display = "block";
            };
            i.src = ev.target.result;
        };
        if (e.target.files[0]) r.readAsDataURL(e.target.files[0]);
    };
}

// Admin
window.saveAnnouncement = () => {
    if (!isAdmin) return;
    const txt = document.getElementById("announceText").value;
    const active = document.getElementById("announceActive").checked;
    db.collection('settings').doc('announcement').set({ text: txt, active: active, id: Date.now() })
      .then(() => { alert("Published!"); closeModal('announcementModal'); }).catch(err => alert("Error"));
};
document.getElementById("addContactBtn").onclick = () => { document.getElementById("addContactForm").reset(); document.getElementById("addPreview").style.display = "none"; openModal('addModal'); };
document.getElementById("addContactForm").onsubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Admin Only");
    db.collection('contacts').add({
        name: document.getElementById("name").value.trim(),
        phone1: document.getElementById("phone1").value.trim(),
        phone2: document.getElementById("phone2").value.trim(),
        dob: document.getElementById("dob").value,
        address: document.getElementById("address").value.trim(),
        photo: document.getElementById("photo").value,
        isFav: false
    }).then(() => closeModal('addModal'));
};
window.openEdit = (id) => {
    const c = contacts.find(x => x.id === id);
    if (!c) return;
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = c.name || "";
    document.getElementById("editPhone1").value = c.phone1 || "";
    document.getElementById("editPhone2").value = c.phone2 || "";
    document.getElementById("editDob").value = c.dob || "";
    document.getElementById("editAddress").value = c.address || "";
    document.getElementById("editPhoto").value = c.photo || "";
    const p = document.getElementById("editPreview");
    if (c.photo) { p.src = c.photo; p.style.display = "block"; } else { p.style.display = "none"; }
    openModal('editModal');
};
document.getElementById("editContactForm").onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    db.collection('contacts').doc(id).update({
        name: document.getElementById("editName").value.trim(),
        phone1: document.getElementById("editPhone1").value.trim(),
        phone2: document.getElementById("editPhone2").value.trim(),
        dob: document.getElementById("editDob").value,
        address: document.getElementById("editAddress").value.trim(),
        photo: document.getElementById("editPhoto").value
    }).then(() => closeModal('editModal'));
};
window.delContact = (id) => { if (confirm("Delete?")) db.collection('contacts').doc(id).delete(); };
window.toggleFav = (id, s) => db.collection('contacts').doc(id).update({ isFav: !s });
document.getElementById("menuAdminBtn").onclick = () => {
    closeMenu();
    if (isAdmin) auth.signOut();
    else { const e = prompt("Email:"); const p = prompt("Password:"); if (e && p) auth.signInWithEmailAndPassword(e, p).catch(err => alert(err.message)); }
};
function toggleUI(show) {
    const b = document.getElementById("adminBadge"); const a = document.getElementById("addContactBtn"); const c = document.getElementById("adminControls");
    if(b) b.style.display = show ? "flex" : "none";
    if(a) a.style.display = show ? "flex" : "none";
    if(c) c.style.display = show ? "block" : "none";
}
document.getElementById("searchInput").addEventListener("input", renderContacts);
window.filterBy = (f) => {
    currentFilter = f;
    const st = document.getElementById("filterStatusContainer");
    if (f === 'all') st.style.display = 'none';
    else { st.style.display = 'block'; document.getElementById("currentFilterName").innerText = f.toUpperCase(); }
    renderContacts();
};
const nav = document.getElementById("sideMenu"); const ol = document.getElementById("menuOverlay");
document.getElementById("menuBtn").onclick = () => { nav.classList.add("open"); ol.classList.add("open"); };
document.getElementById("closeMenuBtn").onclick = closeMenu; ol.onclick = closeMenu;
function closeMenu() { nav.classList.remove("open"); ol.classList.remove("open"); }
window.openModal = (id) => { document.getElementById(id).classList.add("open"); closeMenu(); };
window.closeModal = (id) => { document.getElementById(id).classList.remove("open"); if(id === 'userAnnounceModal') { announceCount = 0; updateUnifiedBadge(); } };
document.getElementById('themeToggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    document.querySelector('#themeToggle i').className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
};
window.backupData = () => { const a = document.createElement("a"); a.href=URL.createObjectURL(new Blob([JSON.stringify(contacts,null,2)],{type:"application/json"})); a.download="backup.json"; a.click(); };
window.uploadJsonToFirestore = (i) => {
    const r = new FileReader();
    r.onload=async(e)=>{if(confirm("Upload?")){try{const d=JSON.parse(e.target.result);const l=Array.isArray(d)?d:(d.contacts||[]);for(let c of l){const{id,...x}=c;await db.collection('contacts').add(x);}alert("Done");}catch(x){alert("Error");}}};
    if(i.files[0])r.readAsText(i.files[0]);
};