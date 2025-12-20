const DEFAULT_CONTACTS = [
  {"name":"Aung Kying","phone1":"09 880563081","phone2":"","address":"YaKaTa, Yangon","photo":""},
  {"name":"Aung Myat Myo","phone1":"09 5402521","phone2":"","address":"Yangon","photo":""},
  {"name":"Aye Cho","phone1":"09 668174525","phone2":"","address":"KaKaTan, Naypyitaw","photo":""},
  {"name":"Aye Htoo","phone1":"09 762136254","phone2":"","address":"YaTaKha, Mawlamyine","photo":""},
  {"name":"Aye Than","phone1":"09 5083875","phone2":"","address":"Yangon","photo":""},
  {"name":"Hla Myint Oo","phone1":"09 663205258","phone2":"","address":"Hlegu Township, Yangon","photo":""},
  {"name":"Hla Win Kyaw","phone1":"09 420252133","phone2":"","address":"Yangon","photo":""},
  {"name":"Khin Maung Oo","phone1":"09 674920674","phone2":"","address":"Pobbathiri , Naypyitaw","photo":""},
  {"name":"Khin Maung Zaw","phone1":"09 757929141","phone2":"","address":"HtaPaYa-928, Meiktila","photo":""},
  {"name":"Kyaw Kyaw Thein","phone1":"","phone2":"","address":"YaTaKha, Mawlamyine","photo":""},
  {"name":"Kyaw Saw Tun","phone1":"09 694849499","phone2":"","address":"TaSaNa","photo":""},
  {"name":"Kyaw Thu","phone1":"09 452215631","phone2":"","address":"Pobbathiri , Naypyitaw","photo":""},
  {"name":"Kyi Khine Tun","phone1":"09 683832252","phone2":"","address":"1/300, Mingaladon Township, Yangon","photo":""},
  {"name":"Maung Than","phone1":"09 670321547","phone2":"","address":"NaPaKha, Rakhine State","photo":""},
  {"name":"Min Ko Ko","phone1":"09 253255971","phone2":"","address":"Yangon","photo":""},
  {"name":"Min Min Lat","phone1":"09 693404063","phone2":"","address":"Pobbathiri , Naypyitaw","photo":""},
  {"name":"Min Soe Han","phone1":"09 693834714","phone2":"","address":"Anti-Corruption Commission of Myanmar, Naypyitaw","photo":""},
  {"name":"Mya Aye","phone1":"09 5033780","phone2":"","address":"Anti-Corruption Commission of Myanmar, Naypyitaw","photo":""},
  {"name":"Myat Thu","phone1":"09 680074007","phone2":"","address":"TaNaTa, PyinOoLwin","photo":""},
  {"name":"Myint Aung","phone1":"09 783622485","phone2":"","address":"Yangon","photo":""},
  {"name":"Myint Ko","phone1":"09 951285930","phone2":"","address":"Pyinmana, Naypyitaw","photo":""},
  {"name":"Myint Oo","phone1":"09 676547416","phone2":"","address":"Pobbathiri , Naypyitaw","photo":""},
  {"name":"Myo Aung","phone1":"09 254624170","phone2":"","address":"Pobbathiri , Naypyitaw","photo":""},
  {"name":"Ngwe Soe","phone1":"09 265845759","phone2":"","address":"LaKaTa-3030, TaungNyo, Naypyitaw","photo":""},
  {"name":"Nyein Chan","phone1":"09 683737595","phone2":"","address":"ASaYa-10, Taunggyi Township","photo":""},
  {"name":"Nyi Nyi Tun","phone1":"09 691933941","phone2":"","address":"KaSaHta-4, Naypyitaw","photo":""},
  {"name":"Nyunt Win","phone1":"09 693805010","phone2":"","address":"Pyinmana, Naypyitaw","photo":""},
  {"name":"San Hla Kyaw","phone1":"09 683602762","phone2":"","address":"NPT-U, Napyidaw","photo":""},
  {"name":"San Ko","phone1":"09 250966602","phone2":"","address":"KaKaWun,  Naypyitaw","photo":""},
  {"name":"San Win Naing","phone1":"09 696726268","phone2":"09 780463035","address":"YaKaTha-3, Thandaunggyi","photo":""},
  {"name":"Soe Khing Oo","phone1":"09 258948561","phone2":"","address":"KaPaSa-4, Tatkon Township, Naypyitaw","photo":""},
  {"name":"Soe Lin","phone1":"09 670776062","phone2":"09 423333239","address":"KaKaPon, Naypyitaw","photo":""},
  {"name":"Soe Lwin","phone1":"09 400503312","phone2":"09 39100840","address":"AMaTa-385, Mong Pan","photo":""},
  {"name":"Soe Lwin Oo","phone1":"09 677406080","phone2":"","address":"","photo":""},
  {"name":"Soe Moe Aung","phone1":"09 693823834","phone2":"","address":"HtaPaYa-935, Naypyitaw","photo":""},
  {"name":"Soe Naing","phone1":"09 789438262","phone2":"09 694797224","address":"YaKaTha-1, Lawksawk Township, Shan State","photo":""},
  {"name":"Soe Shwe","phone1":"09 695817300","phone2":"","address":"NaPaKha, Rakhine State","photo":""},
  {"name":"Than Hla","phone1":"09 674999158","phone2":"","address":"Yangon","photo":""},
  {"name":"Than Htike U Win","phone1":"09 5025383","phone2":"","address":"Yangon","photo":""},
  {"name":"Than Htike Zaw","phone1":"09 420705910","phone2":"09 799183466","address":"MCRD, Naypyitaw","photo":""},
  {"name":"Than Zaw","phone1":"09 698597133","phone2":"","address":"YaKaTa-RODS, Yangon","photo":""},
  {"name":"Thein Lwin Oo","phone1":"09 670321597","phone2":"","address":"NaPaKha(RODS), Rakhine State","photo":""},
  {"name":"Tin Aung Win","phone1":"09 426926163","phone2":"09 663906063","address":"Yangon","photo":""},
  {"name":"Tin Maung Win","phone1":"09 663424789","phone2":"","address":"TaTaKa-2, Naypyitaw","photo":""},
  {"name":"Tin Tun Lay","phone1":"09 762844530","phone2":"","address":"LaSaYa-7, Kyaukse","photo":""},
  {"name":"Tin Win Zaw","phone1":"09 666873147","phone2":"","address":"KhaMaYa-303, Naypyitaw","photo":""},
  {"name":"Tun Than","phone1":"09 456995740","phone2":"","address":"","photo":""},
  {"name":"Toe Toe Thein","phone1":"09 43074024","phone2":"","address":"Yangon","photo":""},
  {"name":"Tun Tun Oo","phone1":"09 688427226","phone2":"","address":"","photo":""},
  {"name":"Win Htay","phone1":"09 5029268","phone2":"","address":"Yangon","photo":""},
  {"name":"Win Naing","phone1":"09 663993924","phone2":"","address":"KaKaPyi, Naypyitaw","photo":""},
  {"name":"Win Naing","phone1":"09 425225118","phone2":"","address":"KhaMaYa-412","photo":""},
  {"name":"Win Shwe","phone1":"09 421033277","phone2":"","address":"UMEHL, Naypyitaw","photo":""},
  {"name":"Ye Thu Kyaw","phone1":"09 449944094","phone2":"","address":"SaYaPha, TaPaKha","photo":""},
  {"name":"Zaw Htay","phone1":"09 899043022","phone2":"","address":"Yangon","photo":""},
  {"name":"Zaw Lin","phone1":"09 5418524","phone2":"","address":"Yangon","photo":""},
  {"name":"Zaw Win Tun","phone1":"","phone2":"","address":"KhaSaTa","photo":""}
];

const DEFAULT_AVATAR = "https://i.ibb.co/XfWr4xSD/Profile-icon.webp";
const HEADER_LOGO = "https://i.ibb.co/pvDqKLfb/hello96-logo2.png";
const CONTACTS_KEY = "hello96_contacts";
const ADMIN_PWD_KEY = "hello96_admin_pwd";

let adminPassword = localStorage.getItem(ADMIN_PWD_KEY) || "hello96admin";
let contacts = [];
let isAdmin = false;

// DOM Elements
const contactListEl = document.getElementById("contactList");
const addForm = document.getElementById("addContactForm");
const addContainer = document.getElementById("addContactFormContainer");
const addBtn = document.getElementById("addContactBtn");
const adminBtn = document.getElementById("adminBtn");
const searchInput = document.getElementById("searchInput");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editContactForm");
const cancelEditBtn = document.getElementById("cancelEdit");
const helloLogo = document.getElementById("helloLogo");

// Admin & Backup Elements
const adminControls = document.getElementById("adminControls");
const backupBtn = document.getElementById("backupBtn");
const restoreBtn = document.getElementById("restoreBtn");
const fileInput = document.getElementById("fileInput");

// Ensure Logo Loads
helloLogo.addEventListener("error", () => helloLogo.src = HEADER_LOGO);
helloLogo.src = HEADER_LOGO;

// Initialize
window.onload = () => {
  const saved = localStorage.getItem(CONTACTS_KEY);
  if (saved) {
    try { 
      contacts = JSON.parse(saved); 
    } catch { 
      contacts = []; 
    }
  }

  // If no data (first time load), use Default Data
  if (contacts.length === 0) {
    contacts = DEFAULT_CONTACTS;
    saveContacts();
  }

  sortContacts();
  renderContacts();
};

// --- Admin System ---
adminBtn.addEventListener("click", () => {
  if (isAdmin) {
    // Logout
    isAdmin = false;
    adminBtn.textContent = "Admin Login";
    document.body.classList.remove("admin-mode");
    adminControls.style.display = "none";
    renderContacts();
    return;
  }
  
  const pwd = prompt("Enter admin password:");
  if (pwd === null) return;
  if (pwd === adminPassword) {
    isAdmin = true;
    adminBtn.textContent = "Logout Admin";
    document.body.classList.add("admin-mode");
    adminControls.style.display = "flex"; // Show Backup/Restore
    alert("Admin Mode On – Edit, Delete, Backup & Restore enabled.");
    renderContacts();
  } else {
    alert("Wrong password!");
  }
});

// --- Backup (Export JSON) ---
backupBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(contacts, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  const d = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `hello96_backup_${d}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// --- Restore (Import JSON) ---
restoreBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target.result);
      if (Array.isArray(json)) {
        if (confirm(`Replace all contacts with ${json.length} entries from file?`)) {
          contacts = json;
          saveContacts();
          sortContacts();
          renderContacts();
          alert("Data restored successfully!");
        }
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error parsing file.");
    }
    fileInput.value = ""; // Reset
  };
  reader.readAsText(file);
});

// --- Add Contact ---
addBtn.addEventListener("click", () => {
  addContainer.classList.toggle("open");
  addContainer.setAttribute("aria-hidden", String(!addContainer.classList.contains("open")));
});

addForm.addEventListener("submit", e => {
  e.preventDefault();
  const newContact = {
    name: document.getElementById("name").value.trim(),
    phone1: document.getElementById("phone1").value.trim(),
    phone2: document.getElementById("phone2").value.trim(),
    address: document.getElementById("address").value.trim(),
    photo: document.getElementById("photo").value.trim()
  };
  contacts.push(newContact);
  saveContacts();
  sortContacts();
  renderContacts();
  addForm.reset();
  addContainer.classList.remove("open");
});

// --- Search ---
searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) {
    renderContacts();
    return;
  }

  const filtered = contacts.filter(c => {
    const name = (c.name || "").toLowerCase().trim();
    return name.startsWith(query);
  });

  renderContacts(filtered);
});

// --- Render List ---
function renderContacts(list = contacts) {
  contactListEl.innerHTML = "";
  if (!list.length) {
    contactListEl.innerHTML = `<p style="text-align:center; color:#888; grid-column:1/-1;">No contacts found.</p>`;
    return;
  }

  list.forEach(c => {
    const index = contacts.indexOf(c);
    contactListEl.appendChild(buildCard(c, index));
  });
}

function buildCard(contact, index) {
  const card = document.createElement("article");
  card.className = "contact-card";
  card.innerHTML = `
    <div class="admin-actions ${isAdmin ? "visible" : ""}">
      <button class="btn-edit" onclick="openEdit(${index})"><i class="fas fa-pen"></i></button>
      <button class="btn-delete" onclick="removeContact(${index})"><i class="fas fa-trash"></i></button>
    </div>
    <img class="contact-avatar" src="${contact.photo || DEFAULT_AVATAR}" alt="Photo">
    <div class="contact-info">
      <div class="name">${contact.name || "Unnamed"}</div>
      ${buildPhone(contact.phone1)}
      ${contact.phone2 ? buildPhone(contact.phone2) : ""}
      <div class="address"><i class="fas fa-location-dot"></i>${contact.address || "-"}</div>
    </div>
  `;
  const avatar = card.querySelector(".contact-avatar");
  avatar.onerror = () => { avatar.src = DEFAULT_AVATAR; };
  return card;
}

function buildPhone(number) {
  if (!number) return "";
  return `<div class="phone" onclick="callNumber('${number}')"><i class="fas fa-phone"></i>${number}</div>`;
}

function callNumber(num) {
  if (!num) return;
  window.location.href = `tel:${num}`;
}

// --- Edit & Delete ---
function openEdit(index) {
  const c = contacts[index];
  document.getElementById("editIndex").value = index;
  document.getElementById("editName").value = c.name || "";
  document.getElementById("editPhone1").value = c.phone1 || "";
  document.getElementById("editPhone2").value = c.phone2 || "";
  document.getElementById("editAddress").value = c.address || "";
  document.getElementById("editPhoto").value = c.photo || "";
  editModal.classList.add("open");
}

cancelEditBtn.addEventListener("click", () => editModal.classList.remove("open"));
editModal.addEventListener("click", e => { if (e.target === editModal) editModal.classList.remove("open"); });

editForm.addEventListener("submit", e => {
  e.preventDefault();
  const index = Number(document.getElementById("editIndex").value);
  contacts[index] = {
    name: document.getElementById("editName").value.trim(),
    phone1: document.getElementById("editPhone1").value.trim(),
    phone2: document.getElementById("editPhone2").value.trim(),
    address: document.getElementById("editAddress").value.trim(),
    photo: document.getElementById("editPhoto").value.trim()
  };
  saveContacts();
  sortContacts();
  renderContacts();
  editModal.classList.remove("open");
});

function removeContact(index) {
  const target = contacts[index];
  if (!confirm(`Delete ${target.name}?`)) return;
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

function saveContacts() {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

function sortContacts() {
  contacts.sort((a, b) => (a.name || "").localeCompare(b.name || "", "my"));
}

// Make functions global for inline onclick
window.openEdit = openEdit;
window.removeContact = removeContact;
window.callNumber = callNumber;