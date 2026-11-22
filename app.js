/**
 * FRONTEND LOGIC - REKAP SALES & SETOR OMSET KDKMP
 * Menggunakan GAS_WEB_APP_URL dan payload action yang kompatibel dengan Code.gs yang sudah ada
 */
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyBs-njA5p7SukhDamHQ3hCg4-N4BqGFiY5T5-HfSKm2Xz3sQvDL9Yg7mZUhBsQb2B_/exec";

const FALLBACK_MASTER_KDKMP = [
  { kabupaten: "Bandung", kecamatan: "Arjasari", namaKdkmp: "Koperasi Desa Arjasari" },
  { kabupaten: "Bandung", kecamatan: "Arjasari", namaKdkmp: "Koperasi Desa Lebakwangi" },
  { kabupaten: "Bandung", kecamatan: "Arjasari", namaKdkmp: "Koperasi Desa Mangunjaya" },
  { kabupaten: "Bandung", kecamatan: "Arjasari", namaKdkmp: "Koperasi Desa Mekarjaya" },
  { kabupaten: "Bandung", kecamatan: "Arjasari", namaKdkmp: "Koperasi Desa Patrolsari" },
  { kabupaten: "Bandung", kecamatan: "Baleendah", namaKdkmp: "Koperasi Desa Jelekong" },
  { kabupaten: "Bandung", kecamatan: "Baleendah", namaKdkmp: "Koperasi Desa Manggahang" },
  { kabupaten: "Bandung", kecamatan: "Banjaran", namaKdkmp: "Koperasi Desa Kamasan" },
  { kabupaten: "Bandung", kecamatan: "Banjaran", namaKdkmp: "Koperasi Desa Mekarjaya" },
  { kabupaten: "Bandung", kecamatan: "Bojongsoang", namaKdkmp: "Koperasi Desa Bojongsari" },
  { kabupaten: "Bandung", kecamatan: "Cicalengka", namaKdkmp: "Koperasi Desa Nagrog" },
  { kabupaten: "Bandung", kecamatan: "Cicalengka", namaKdkmp: "Koperasi Desa Panenjoan" },
  { kabupaten: "Bandung", kecamatan: "Cicalengka", namaKdkmp: "Koperasi Desa Waluya" },
  { kabupaten: "Bandung", kecamatan: "Cikancung", namaKdkmp: "Koperasi Desa Cihanyir" },
  { kabupaten: "Bandung", kecamatan: "Cilengkrang", namaKdkmp: "Koperasi Desa Cilengkrang" },
  { kabupaten: "Bandung", kecamatan: "Cilengkrang", namaKdkmp: "Koperasi Desa Cipanjalu" },
  { kabupaten: "Bandung", kecamatan: "Cilengkrang", namaKdkmp: "Koperasi Desa Jatiendah" },
  { kabupaten: "Bandung", kecamatan: "Ciparay", namaKdkmp: "Koperasi Desa Mangunharja (Manggungharja)" },
  { kabupaten: "Bandung", kecamatan: "Ciparay", namaKdkmp: "Koperasi Desa Sagaracipta (Sigaracipta)" },
  { kabupaten: "Bandung", kecamatan: "Ciparay", namaKdkmp: "Koperasi Desa Sarimahi" },
  { kabupaten: "Bandung", kecamatan: "Dayeuhkolot", namaKdkmp: "Koperasi Desa Cangkuang Wetan" },
  { kabupaten: "Bandung", kecamatan: "Dayeuhkolot", namaKdkmp: "Koperasi Desa Citeureup" },
  { kabupaten: "Bandung", kecamatan: "Kertasari", namaKdkmp: "Koperasi Desa Cibeureum" },
  { kabupaten: "Bandung", kecamatan: "Kertasari", namaKdkmp: "Koperasi Desa Neglawangi" },
  { kabupaten: "Bandung", kecamatan: "Kertasari", namaKdkmp: "Koperasi Desa Resmi Tingal" },
  { kabupaten: "Bandung", kecamatan: "Kutawaringin", namaKdkmp: "Koperasi Desa Jatisari" },
  { kabupaten: "Bandung", kecamatan: "Majalaya", namaKdkmp: "Koperasi Desa Sukamaju" },
  { kabupaten: "Bandung", kecamatan: "Margaasih", namaKdkmp: "Koperasi Desa Lagadar" },
  { kabupaten: "Bandung", kecamatan: "Margaasih", namaKdkmp: "Koperasi Desa Rahayu" },
  { kabupaten: "Bandung", kecamatan: "Margahayu", namaKdkmp: "Koperasi Desa Sukamenak" },
  { kabupaten: "Bandung", kecamatan: "Nagreg", namaKdkmp: "Koperasi Desa Citaman" },
  { kabupaten: "Bandung", kecamatan: "Nagreg", namaKdkmp: "Koperasi Desa Mandalawangi" },
  { kabupaten: "Bandung", kecamatan: "Nagreg", namaKdkmp: "Koperasi Desa Nagreg Kendan" },
  { kabupaten: "Bandung", kecamatan: "Pacet", namaKdkmp: "Koperasi Desa Cipeujeuh" },
  { kabupaten: "Bandung", kecamatan: "Pameungpeuk", namaKdkmp: "Koperasi Desa Rancatungku" },
  { kabupaten: "Bandung", kecamatan: "Pangalengan", namaKdkmp: "Koperasi Desa Pulosari" },
  { kabupaten: "Bandung", kecamatan: "Paseh", namaKdkmp: "Koperasi Desa Tangsimekar" },
  { kabupaten: "Bandung", kecamatan: "Pasirjambu", namaKdkmp: "Koperasi Desa Cikoneng" },
  { kabupaten: "Bandung", kecamatan: "Pasirjambu", namaKdkmp: "Koperasi Desa Margamulya" },
  { kabupaten: "Bandung", kecamatan: "Pasirjambu", namaKdkmp: "Koperasi Desa Sugihmukti" },
  { kabupaten: "Bandung", kecamatan: "Rancabali", namaKdkmp: "Koperasi Desa Alamendah" },
  { kabupaten: "Bandung", kecamatan: "Rancaekek", namaKdkmp: "Koperasi Desa Bojongloa" },
  { kabupaten: "Bandung", kecamatan: "Solokanjeruk", namaKdkmp: "Koperasi Desa Bojongemas" },
  { kabupaten: "Bandung", kecamatan: "Solokanjeruk", namaKdkmp: "Koperasi Desa Solokanjeruk (Solokan Jeruk)" },
  { kabupaten: "Bandung", kecamatan: "Soreang", namaKdkmp: "Koperasi Desa Sadu" },
  { kabupaten: "Bandung Barat", kecamatan: "Batujajar", namaKdkmp: "Koperasi Desa Batujajar Barat" },
  { kabupaten: "Bandung Barat", kecamatan: "Batujajar", namaKdkmp: "Koperasi Desa Batujajar Timur" },
  { kabupaten: "Bandung Barat", kecamatan: "Cihampelas", namaKdkmp: "Koperasi Desa Singajaya" },
  { kabupaten: "Bandung Barat", kecamatan: "Cihampelas", namaKdkmp: "Koperasi Desa Situwangi" },
  { kabupaten: "Bandung Barat", kecamatan: "Cikalongwetan", namaKdkmp: "Koperasi Desa Cikalongwetan" },
  { kabupaten: "Bandung Barat", kecamatan: "Cikalongwetan", namaKdkmp: "Koperasi Desa Rende" },
  { kabupaten: "Bandung Barat", kecamatan: "Cikalongwetan", namaKdkmp: "Koperasi Desa Wangunjaya" },
  { kabupaten: "Bandung Barat", kecamatan: "Cililin", namaKdkmp: "Koperasi Desa Bongas" },
  { kabupaten: "Bandung Barat", kecamatan: "Cililin", namaKdkmp: "Koperasi Desa Karanganyar" },
  { kabupaten: "Bandung Barat", kecamatan: "Cililin", namaKdkmp: "Koperasi Desa Nanggerang" },
  { kabupaten: "Bandung Barat", kecamatan: "Cililin", namaKdkmp: "Koperasi Desa Rancapanggung" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipatat", namaKdkmp: "Koperasi Desa Ciptaharja" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipatat", namaKdkmp: "Koperasi Desa Cirawamekar" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipatat", namaKdkmp: "Koperasi Desa Citatah" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipatat", namaKdkmp: "Koperasi Desa Gunungmasigit" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipatat", namaKdkmp: "Koperasi Desa Mandalawangi" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipatat", namaKdkmp: "Koperasi Desa Nyalindung" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Ciharashas" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Cipeundeuy" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Ciroyom" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Jatimekar" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Nanggeleng" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Nyenang" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Sirnagalih" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipeundeuy", namaKdkmp: "Koperasi Desa Sirnaraja" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Baranangsiang" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Cijenuk" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Cintaasih" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Citalem" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Girimukti" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Karangsari" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Mekarsari" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Neglasari" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Sirnagalih" },
  { kabupaten: "Bandung Barat", kecamatan: "Cipongkor", namaKdkmp: "Koperasi Desa Sukamulya" },
  { kabupaten: "Bandung Barat", kecamatan: "Cisarua", namaKdkmp: "Koperasi Desa Pasirhalang" },
  { kabupaten: "Bandung Barat", kecamatan: "Gununghalu", namaKdkmp: "Koperasi Desa Gununghalu" },
  { kabupaten: "Bandung Barat", kecamatan: "Gununghalu", namaKdkmp: "Koperasi Desa Sirnajaya" },
  { kabupaten: "Bandung Barat", kecamatan: "Gununghalu", namaKdkmp: "Koperasi Desa Sukasari" },
  { kabupaten: "Bandung Barat", kecamatan: "Gununghalu", namaKdkmp: "Koperasi Desa Tamanjaya" },
  { kabupaten: "Bandung Barat", kecamatan: "Lembang", namaKdkmp: "Koperasi Desa Cikahuripan" },
  { kabupaten: "Bandung Barat", kecamatan: "Ngamprah", namaKdkmp: "Koperasi Desa Bojongkoneng" },
  { kabupaten: "Bandung Barat", kecamatan: "Ngamprah", namaKdkmp: "Koperasi Desa Cilame" },
  { kabupaten: "Bandung Barat", kecamatan: "Ngamprah", namaKdkmp: "Koperasi Desa Sukatani" },
  { kabupaten: "Bandung Barat", kecamatan: "Ngamprah", namaKdkmp: "Koperasi Desa Tanimulya" },
  { kabupaten: "Bandung Barat", kecamatan: "Padalarang", namaKdkmp: "Koperasi Desa Jayamekar" },
  { kabupaten: "Bandung Barat", kecamatan: "Padalarang", namaKdkmp: "Koperasi Desa Padalarang" },
  { kabupaten: "Bandung Barat", kecamatan: "Padalarang", namaKdkmp: "Koperasi Desa Tagogapu" },
  { kabupaten: "Bandung Barat", kecamatan: "Parongpong", namaKdkmp: "Koperasi Desa Karyawangi" },
  { kabupaten: "Bandung Barat", kecamatan: "Rongga", namaKdkmp: "Koperasi Desa Bojong" },
  { kabupaten: "Bandung Barat", kecamatan: "Rongga", namaKdkmp: "Koperasi Desa Cinengah" },
  { kabupaten: "Bandung Barat", kecamatan: "Saguling", namaKdkmp: "Koperasi Desa Cipangeran" },
  { kabupaten: "Bandung Barat", kecamatan: "Saguling", namaKdkmp: "Koperasi Desa Girimukti" },
  { kabupaten: "Bandung Barat", kecamatan: "Saguling", namaKdkmp: "Koperasi Desa Saguling" },
  { kabupaten: "Bandung Barat", kecamatan: "Sindangkerta", namaKdkmp: "Koperasi Desa Buninagara" },
  { kabupaten: "Bandung Barat", kecamatan: "Sindangkerta", namaKdkmp: "Koperasi Desa Cicangkanggirang (Cicangkang Girang)" },
  { kabupaten: "Bandung Barat", kecamatan: "Sindangkerta", namaKdkmp: "Koperasi Desa Pasirpogor" },
  { kabupaten: "Bandung Barat", kecamatan: "Sindangkerta", namaKdkmp: "Koperasi Desa Puncaksari" },
  { kabupaten: "Kota Bandung", kecamatan: "Andir", namaKdkmp: "Koperasi Desa Kebon Jeruk" },
  { kabupaten: "Kota Bandung", kecamatan: "Babakan Ciparay", namaKdkmp: "Koperasi Desa Babakan Ciparay" }
];

let currentUser = null;
let appData = {
  masterKdkmp: [],
  closeShift: [],
  setorOmset: [],
  users: []
};

// ==========================================
// INISIALISASI HALAMAN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  document.getElementById("filterMonth").value = `${yyyy}-${mm}`;
  document.getElementById("csTanggal").value = `${yyyy}-${mm}-${dd}`;

  const savedUser = localStorage.getItem("kdkmp_user");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    initAppSession();
  } else {
    loadMasterForRegister();
  }

  document.getElementById("loginForm").addEventListener("submit", handleLoginSubmit);
  document.getElementById("registerForm").addEventListener("submit", handleRegisterSubmit);
  document.getElementById("formCloseShift").addEventListener("submit", handleCloseShiftSubmit);
  document.getElementById("formSetorOmset").addEventListener("submit", handleSetorOmsetSubmit);
});

// ==========================================
// FUNGSI API & HELPER
// ==========================================
async function callGasApi(payload) {
  const response = await fetch(GAS_WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return await response.json();
}

function showLoading(text = "Memuat data...") {
  document.getElementById("loadingText").textContent = text;
  document.getElementById("loadingOverlay").classList.remove("d-none");
}

function hideLoading() {
  document.getElementById("loadingOverlay").classList.add("d-none");
}

function formatRupiah(num) {
  return "Rp " + Number(num || 0).toLocaleString("id-ID");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

function normalizeDateForInput(dateVal) {
  if (!dateVal) return "";
  const str = String(dateVal).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, "0");
    const month = dmyMatch[2].padStart(2, "0");
    const year = dmyMatch[3];
    return `${year}-${month}-${day}`;
  }

  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return "";
}

function normalizeKdkmpKey(name) {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function normalizeMasterList(rawList) {
  const source = Array.isArray(rawList) && rawList.length > 0 ? rawList : FALLBACK_MASTER_KDKMP;
  return source
    .map(item => ({
      kabupaten: String(
        item.kabupaten ?? item.kabupatenKota ?? item["Kabupaten/Kota"] ?? ""
      ).trim(),
      kecamatan: String(
        item.kecamatan ?? item.Kecamatan ?? ""
      ).trim(),
      namaKdkmp: String(
        item.namaKdkmp ?? item.NamaKDKMP ?? item["Nama KDKMP"] ?? ""
      ).trim()
    }))
    .filter(item => item.kabupaten && item.kecamatan && item.namaKdkmp);
}

// ==========================================
// TOGGLE LIHAT / SEMBUNYIKAN PASSWORD
// ==========================================
function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";

  const button = btnEl || document.querySelector(`[onclick*="${inputId}"]`);
  const icon = button ? button.querySelector("i") : null;

  if (icon) {
    icon.classList.toggle("bi-eye", !isHidden);
    icon.classList.toggle("bi-eye-slash", isHidden);
  }
}

function resetPasswordFields() {
  ["loginPassword", "regPassword"].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.type = "password";

    const btn = document.querySelector(`[onclick*="${id}"]`);
    const icon = btn ? btn.querySelector("i") : null;
    if (icon) {
      icon.classList.remove("bi-eye-slash");
      icon.classList.add("bi-eye");
    }
  });
}

// ==========================================
// AUTENTIKASI (LOGIN & REGISTER)
// ==========================================
function switchAuthTab(tab) {
  resetPasswordFields();
  if (tab === "login") {
    document.getElementById("tabLogin").classList.add("active");
    document.getElementById("tabRegister").classList.remove("active");
    document.getElementById("loginForm").classList.remove("d-none");
    document.getElementById("registerForm").classList.add("d-none");
  } else {
    document.getElementById("tabRegister").classList.add("active");
    document.getElementById("tabLogin").classList.remove("active");
    document.getElementById("registerForm").classList.remove("d-none");
    document.getElementById("loginForm").classList.add("d-none");
    if (!appData.masterKdkmp || appData.masterKdkmp.length === 0) {
      loadMasterForRegister();
    } else {
      populateRegisterWilayah();
    }
  }
}

function populateRegisterWilayah() {
  const kabSelect = document.getElementById("regKabupaten");
  const kecSelect = document.getElementById("regKecamatan");
  const kdkmpSelect = document.getElementById("regKdkmp");
  const infoEl = document.getElementById("regKdkmpCountInfo");

  const list = normalizeMasterList(appData.masterKdkmp);
  appData.masterKdkmp = list;

  const uniqueKab = [...new Set(list.map(i => i.kabupaten))].sort((a, b) => a.localeCompare(b, "id"));

  kabSelect.innerHTML = '<option value="">-- Pilih Kabupaten/Kota --</option>';
  uniqueKab.forEach(kab => {
    kabSelect.innerHTML += `<option value="${kab}">${kab}</option>`;
  });

  kecSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
  kecSelect.disabled = true;

  kdkmpSelect.innerHTML = '<option value="">-- Pilih KDKMP --</option>';
  kdkmpSelect.disabled = true;

  if (infoEl) {
    infoEl.textContent = `Tersedia ${list.length} KDKMP di ${uniqueKab.length} Kabupaten/Kota.`;
  }
}

function onRegKabupatenChange() {
  const kabVal = document.getElementById("regKabupaten").value;
  const kecSelect = document.getElementById("regKecamatan");
  const kdkmpSelect = document.getElementById("regKdkmp");
  const infoEl = document.getElementById("regKdkmpCountInfo");

  kecSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
  kdkmpSelect.innerHTML = '<option value="">-- Pilih KDKMP --</option>';
  kdkmpSelect.disabled = true;

  if (!kabVal) {
    kecSelect.disabled = true;
    if (infoEl) infoEl.textContent = "Pilih Kabupaten/Kota terlebih dahulu.";
    return;
  }

  const filteredByKab = normalizeMasterList(appData.masterKdkmp).filter(i => i.kabupaten === kabVal);
  const uniqueKec = [...new Set(filteredByKab.map(i => i.kecamatan))].sort((a, b) => a.localeCompare(b, "id"));

  uniqueKec.forEach(kec => {
    kecSelect.innerHTML += `<option value="${kec}">${kec}</option>`;
  });
  kecSelect.disabled = false;

  if (infoEl) {
    infoEl.textContent = `${uniqueKec.length} kecamatan (${filteredByKab.length} KDKMP) di ${kabVal}.`;
  }
}

function onRegKecamatanChange() {
  const kabVal = document.getElementById("regKabupaten").value;
  const kecVal = document.getElementById("regKecamatan").value;
  const kdkmpSelect = document.getElementById("regKdkmp");
  const infoEl = document.getElementById("regKdkmpCountInfo");

  kdkmpSelect.innerHTML = '<option value="">-- Pilih KDKMP --</option>';

  if (!kabVal || !kecVal) {
    kdkmpSelect.disabled = true;
    if (infoEl) infoEl.textContent = "Pilih Kecamatan terlebih dahulu.";
    return;
  }

  const filteredKdkmp = normalizeMasterList(appData.masterKdkmp)
    .filter(i => i.kabupaten === kabVal && i.kecamatan === kecVal)
    .sort((a, b) => a.namaKdkmp.localeCompare(b.namaKdkmp, "id"));

  filteredKdkmp.forEach(item => {
    kdkmpSelect.innerHTML += `<option value="${item.namaKdkmp}">${item.namaKdkmp}</option>`;
  });
  kdkmpSelect.disabled = filteredKdkmp.length === 0;

  if (infoEl) {
    infoEl.textContent = `Menampilkan ${filteredKdkmp.length} KDKMP di Kec. ${kecVal}.`;
  }
}

async function loadMasterForRegister() {
  try {
    const res = await callGasApi({ action: "getInitData", user: null });
    appData.masterKdkmp = normalizeMasterList(res && res.status === "success" ? res.masterKdkmp : null);
  } catch (e) {
    console.warn("Gagal memuat master KDKMP dari API, menggunakan data lokal:", e);
    appData.masterKdkmp = normalizeMasterList(null);
  }
  populateRegisterWilayah();
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  showLoading("Memverifikasi akun...");
  try {
    const res = await callGasApi({
      action: "login",
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    });
    hideLoading();
    if (res.status === "success" && res.user) {
      currentUser = res.user;
      localStorage.setItem("kdkmp_user", JSON.stringify(currentUser));
      initAppSession();
    } else {
      alert(res.message || "Email atau password tidak valid.");
    }
  } catch (err) {
    hideLoading();
    alert("Terjadi kesalahan koneksi: " + err.message);
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const namaKdkmp = document.getElementById("regKdkmp").value;
  if (!namaKdkmp) {
    return alert("Silakan pilih Kabupaten/Kota, Kecamatan, dan Penempatan KDKMP terlebih dahulu.");
  }

  showLoading("Mendaftarkan akun...");
  try {
    const res = await callGasApi({
      action: "register",
      nama: document.getElementById("regNama").value,
      email: document.getElementById("regEmail").value,
      noHp: document.getElementById("regNoHp").value,
      namaKdkmp: namaKdkmp,
      password: document.getElementById("regPassword").value
    });
    hideLoading();
    alert(res.message);
    if (res.status === "success") {
      document.getElementById("registerForm").reset();
      resetPasswordFields();
      populateRegisterWilayah();
      switchAuthTab("login");
    }
  } catch (err) {
    hideLoading();
    alert("Gagal mendaftar: " + err.message);
  }
}

function logout() {
  localStorage.removeItem("kdkmp_user");
  currentUser = null;
  location.reload();
}

// ==========================================
// INISIALISASI SESI APLIKASI & DATA
// ==========================================
async function initAppSession() {
  document.getElementById("authSection").classList.add("d-none");
  document.getElementById("appSection").classList.remove("d-none");

  document.getElementById("navUserName").textContent = currentUser.nama;
  document.getElementById("navUserRole").textContent = currentUser.role;

  const isAdmin = currentUser.role === "Admin";
  if (isAdmin) {
    document.getElementById("bannerKdkmp").textContent = "Semua Outlet KDKMP (Mode Administrator)";
    document.getElementById("navItemUsers").classList.remove("d-none");
    document.getElementById("filterKdkmpWrapper").classList.remove("d-none");
  } else {
    document.getElementById("bannerKdkmp").textContent = `Outlet: ${currentUser.namaKdkmp}`;
    document.getElementById("navItemUsers").classList.add("d-none");
    document.getElementById("filterKdkmpWrapper").classList.add("d-none");
  }

  await refreshData();
}

async function refreshData(highlightShiftId = null) {
  showLoading("Menyinkronkan data dengan Google Sheets...");
  try {
    const res = await callGasApi({ action: "getInitData", user: currentUser });
    hideLoading();
    if (res.status === "success") {
      appData = {
        ...res,
        masterKdkmp: normalizeMasterList(res.masterKdkmp)
      };
      document.getElementById("lastUpdatedText").textContent =
        "Terakhir diperbarui: " + new Date().toLocaleTimeString("id-ID");

      populateKdkmpDropdowns();
      populateUnsettledShifts(highlightShiftId);
      renderDashboard();
      if (currentUser.role === "Admin") {
        renderUsersTable();
      }
    }
  } catch (err) {
    hideLoading();
    alert("Gagal memuat data: " + err.message);
  }
}

function switchMainTab(btn) {
  document.querySelectorAll("#mainTabs .nav-link").forEach(el => el.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".main-tab-pane").forEach(pane => pane.classList.add("d-none"));
  document.getElementById(btn.getAttribute("data-target")).classList.remove("d-none");
}

// ==========================================
// DROPDOWN & KALKULASI FORM
// ==========================================
function populateKdkmpDropdowns() {
  const isAdmin = currentUser.role === "Admin";
  const csSelect = document.getElementById("csKdkmp");
  const filterSelect = document.getElementById("filterKdkmp");

  csSelect.innerHTML = '<option value="">-- Pilih Outlet KDKMP --</option>';
  filterSelect.innerHTML = '<option value="ALL">Semua Outlet</option>';

  appData.masterKdkmp.forEach(item => {
    filterSelect.innerHTML += `<option value="${item.namaKdkmp}">${item.namaKdkmp}</option>`;
    if (isAdmin || item.namaKdkmp === currentUser.namaKdkmp) {
      csSelect.innerHTML += `<option value="${item.namaKdkmp}">${item.namaKdkmp}</option>`;
    }
  });

  if (!isAdmin && currentUser.namaKdkmp) {
    csSelect.value = currentUser.namaKdkmp;
    autoFillWilayah("cs");
  }
}

function autoFillWilayah(prefix) {
  const selectedName = document.getElementById(`${prefix}Kdkmp`).value;
  const found = appData.masterKdkmp.find(m => m.namaKdkmp === selectedName);
  document.getElementById(`${prefix}Kabupaten`).value = found ? found.kabupaten : "";
  document.getElementById(`${prefix}Kecamatan`).value = found ? found.kecamatan : "";
}

function hitungEstimasiTunaiCS() {
  const omsetCloseShift = Number(document.getElementById("csOmset").value || 0);
  const nonTunai = Number(document.getElementById("csNonTunai").value || 0);
  const omsetHarianBersih = Math.max(0, omsetCloseShift - nonTunai);

  document.getElementById("csEstimasiTunai").value = formatRupiah(omsetHarianBersih);
}

function populateUnsettledShifts(autoSelectIdShift = null) {
  const select = document.getElementById("soSelectShift");
  const settledShiftIds = new Set(appData.setorOmset.map(s => String(s.idShift).trim()));

  select.innerHTML = '<option value="">-- Pilih Laporan Close Shift Belum Disetor --</option>';

  const unsettled = appData.closeShift.filter(cs => !settledShiftIds.has(String(cs.idShift).trim()));

  unsettled.forEach(cs => {
    const tglNorm = normalizeDateForInput(cs.tanggalTransaksi);
    select.innerHTML += `<option value="${cs.idShift}">[${tglNorm || cs.tanggalTransaksi}] ${cs.namaKdkmp} - Omset Harian: ${formatRupiah(cs.omsetHarian)} (Non Tunai: ${formatRupiah(cs.nonTunai)})</option>`;
  });

  if (autoSelectIdShift && unsettled.some(item => item.idShift === autoSelectIdShift)) {
    select.value = autoSelectIdShift;
    onSelectShiftForSetor();
  } else if (unsettled.length > 0 && !select.value) {
    select.value = unsettled[0].idShift;
    onSelectShiftForSetor();
  }
}

function onSelectShiftForSetor() {
  const idShift = document.getElementById("soSelectShift").value;
  const cs = appData.closeShift.find(item => String(item.idShift).trim() === String(idShift).trim());

  if (!cs) {
    document.getElementById("soTanggal").value = "";
    document.getElementById("soKdkmp").value = "";
    document.getElementById("soKabupaten").value = "";
    document.getElementById("soKecamatan").value = "";
    document.getElementById("soOmsetCs").value = "";
    document.getElementById("soNonTunai").value = 0;
    document.getElementById("soNominalTransfer").value = "";
    hitungSelisihSetor();
    return;
  }

  document.getElementById("soTanggal").value = normalizeDateForInput(cs.tanggalTransaksi);
  document.getElementById("soKdkmp").value = cs.namaKdkmp;
  document.getElementById("soKabupaten").value = cs.kabupaten;
  document.getElementById("soKecamatan").value = cs.kecamatan;

  const omsetHarianTersimpan = Number(cs.omsetHarian || 0);
  const nonTunaiCs = Number(cs.nonTunai || 0);

  document.getElementById("soOmsetCs").value = omsetHarianTersimpan;
  document.getElementById("soNonTunai").value = nonTunaiCs;
  document.getElementById("soNominalTransfer").value = omsetHarianTersimpan;
  hitungSelisihSetor();
}

function hitungSelisihSetor() {
  const omsetCs = Number(document.getElementById("soOmsetCs").value || 0);
  const transfer = Number(document.getElementById("soNominalTransfer").value || 0);

  const selisih = transfer - omsetCs;
  const el = document.getElementById("soSelisihInfo");
  el.value = formatRupiah(selisih);
  el.classList.remove("text-danger", "text-success");
  el.classList.add(selisih < 0 ? "text-danger" : "text-success");
}

// ==========================================
// SUBMIT CLOSE SHIFT & SETOR OMSET
// ==========================================
async function handleCloseShiftSubmit(e) {
  e.preventDefault();
  const fileInput = document.getElementById("csBukti");
  if (!fileInput.files.length) return alert("Harap unggah foto bukti Close Shift.");

  const tanggalTransaksi = normalizeDateForInput(document.getElementById("csTanggal").value);
  const namaKdkmp = String(document.getElementById("csKdkmp").value || "").trim();

  if (!tanggalTransaksi || !namaKdkmp) {
    return alert("Tanggal Transaksi dan Outlet KDKMP wajib diisi.");
  }

  const targetKdkmpKey = normalizeKdkmpKey(namaKdkmp);
  const isDuplicate = appData.closeShift.some(item => {
    const itemKdkmpKey = normalizeKdkmpKey(item.namaKdkmp);
    const itemTgl = normalizeDateForInput(item.tanggalTransaksi);
    return itemKdkmpKey === targetKdkmpKey && itemTgl === tanggalTransaksi;
  });

  if (isDuplicate) {
    return alert(
      `Gagal disimpan! Laporan Close Shift untuk "${namaKdkmp}" pada tanggal ${tanggalTransaksi} sudah tercatat (tidak boleh double input di tanggal yang sama).`
    );
  }

  const omsetCloseShift = Number(document.getElementById("csOmset").value || 0);
  const nonTunai = Number(document.getElementById("csNonTunai").value || 0);
  const omsetHarianDikurangiNonTunai = Math.max(0, omsetCloseShift - nonTunai);

  showLoading("Mengunggah bukti & menyimpan Close Shift...");
  try {
    const base64Img = await fileToBase64(fileInput.files[0]);
    const payload = {
      action: "submitCloseShift",
      namaSales: currentUser.nama,
      emailSales: currentUser.email,
      noHpSales: currentUser.noHp,
      tanggalTransaksi: tanggalTransaksi,
      kabupaten: document.getElementById("csKabupaten").value,
      kecamatan: document.getElementById("csKecamatan").value,
      namaKdkmp: namaKdkmp,
      omsetHarian: omsetHarianDikurangiNonTunai,
      omsetCloseShiftAsli: omsetCloseShift,
      nonTunai: nonTunai,
      catatan: document.getElementById("csCatatan").value,
      buktiBase64: base64Img
    };

    const res = await callGasApi(payload);
    hideLoading();
    alert(res.message);

    if (res.status === "success") {
      const createdShiftId = res.idShift;
      document.getElementById("formCloseShift").reset();
      document.getElementById("csEstimasiTunai").value = "Rp 0";

      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      document.getElementById("csTanggal").value = `${yyyy}-${mm}-${dd}`;
      if (currentUser.role !== "Admin" && currentUser.namaKdkmp) {
        document.getElementById("csKdkmp").value = currentUser.namaKdkmp;
        autoFillWilayah("cs");
      }

      await refreshData(createdShiftId);

      const setorTabBtn = document.querySelector('#mainTabs .nav-link[data-target="tabSetorOmset"]');
      if (setorTabBtn && createdShiftId) {
        switchMainTab(setorTabBtn);
      }
    }
  } catch (err) {
    hideLoading();
    alert("Gagal menyimpan Close Shift: " + err.message);
  }
}

async function handleSetorOmsetSubmit(e) {
  e.preventDefault();
  const fileInput = document.getElementById("soBukti");
  if (!fileInput.files.length) return alert("Harap unggah foto bukti transfer.");

  showLoading("Mengunggah bukti & menyimpan Setor Omset...");
  try {
    const base64Img = await fileToBase64(fileInput.files[0]);
    const payload = {
      action: "submitSetorOmset",
      idShift: document.getElementById("soSelectShift").value,
      namaPenyetor: currentUser.nama,
      emailPenyetor: currentUser.email,
      noHpPenyetor: currentUser.noHp,
      tanggalTransaksi: document.getElementById("soTanggal").value,
      kabupaten: document.getElementById("soKabupaten").value,
      kecamatan: document.getElementById("soKecamatan").value,
      namaKdkmp: document.getElementById("soKdkmp").value,
      omsetCloseShift: Number(document.getElementById("soOmsetCs").value || 0),
      nonTunai: Number(document.getElementById("soNonTunai").value || 0),
      nominalTransfer: Number(document.getElementById("soNominalTransfer").value || 0),
      catatanSetor: document.getElementById("soCatatan").value,
      buktiBase64: base64Img
    };

    const res = await callGasApi(payload);
    hideLoading();
    alert(res.message);
    if (res.status === "success") {
      document.getElementById("formSetorOmset").reset();
      document.getElementById("soSelisihInfo").value = "Rp 0";
      await refreshData();
    }
  } catch (err) {
    hideLoading();
    alert("Gagal menyimpan Setor Omset: " + err.message);
  }
}

// ==========================================
// RENDER DASHBOARD & TABEL
// ==========================================
function renderDashboard() {
  const monthFilter = document.getElementById("filterMonth").value;
  const kdkmpFilter = document.getElementById("filterKdkmp").value;

  const filteredCs = appData.closeShift.filter(item => {
    const matchMonth = !monthFilter || item.tanggalTransaksi.startsWith(monthFilter);
    const matchKdkmp = kdkmpFilter === "ALL" || item.namaKdkmp === kdkmpFilter;
    return matchMonth && matchKdkmp;
  });

  const filteredSo = appData.setorOmset.filter(item => {
    const matchMonth = !monthFilter || item.tanggalTransaksi.startsWith(monthFilter);
    const matchKdkmp = kdkmpFilter === "ALL" || item.namaKdkmp === kdkmpFilter;
    return matchMonth && matchKdkmp;
  });

  const totalOmsetCs = filteredCs.reduce((acc, cur) => acc + cur.omsetHarian, 0);
  const totalNonTunaiCs = filteredCs.reduce((acc, cur) => acc + cur.nonTunai, 0);
  const totalNonTunaiSo = filteredSo.reduce((acc, cur) => acc + cur.nonTunai, 0);
  const totalTransfer = filteredSo.reduce((acc, cur) => acc + cur.nominalTransfer, 0);
  const totalSelisih = totalTransfer - totalOmsetCs;

  document.getElementById("sumOmsetCs").textContent = formatRupiah(totalOmsetCs);
  document.getElementById("sumNonTunai").textContent = `${formatRupiah(totalNonTunaiCs)} / ${formatRupiah(totalNonTunaiSo)}`;
  document.getElementById("sumTransfer").textContent = formatRupiah(totalTransfer);
  document.getElementById("sumSelisih").textContent = formatRupiah(totalSelisih);

  const tbodyCs = document.getElementById("tbodyCloseShift");
  tbodyCs.innerHTML = filteredCs.length ? "" : '<tr><td colspan="9" class="text-center text-muted py-3">Belum ada data Close Shift pada periode ini.</td></tr>';
  filteredCs.forEach(item => {
    const bruto = item.omsetHarian + item.nonTunai;
    const linkBukti = item.buktiUrl ? `<a href="${item.buktiUrl}" target="_blank" class="btn btn-sm btn-outline-success"><i class="bi bi-image"></i></a>` : "-";
    tbodyCs.innerHTML += `
      <tr>
        <td>${item.tanggalTransaksi}</td>
        <td><span class="badge bg-light text-dark border">${item.idShift}</span></td>
        <td class="fw-semibold">${item.namaKdkmp}</td>
        <td>${item.namaSales}</td>
        <td class="text-end fw-bold text-success">${formatRupiah(item.omsetHarian)}</td>
        <td class="text-end text-primary fw-semibold">${formatRupiah(item.nonTunai)}</td>
        <td class="text-end text-muted">${formatRupiah(bruto)}</td>
        <td>${item.catatan || "-"}</td>
        <td>${linkBukti}</td>
      </tr>
    `;
  });

  const tbodySo = document.getElementById("tbodySetorOmset");
  tbodySo.innerHTML = filteredSo.length ? "" : '<tr><td colspan="9" class="text-center text-muted py-3">Belum ada data Setor Omset pada periode ini.</td></tr>';
  filteredSo.forEach(item => {
    const selisih = item.nominalTransfer - item.omsetCloseShift;
    const selisihClass = selisih < 0 ? "text-danger fw-bold" : "text-success fw-semibold";
    const linkBukti = item.buktiUrl ? `<a href="${item.buktiUrl}" target="_blank" class="btn btn-sm btn-outline-primary"><i class="bi bi-image"></i></a>` : "-";
    tbodySo.innerHTML += `
      <tr>
        <td>${item.tanggalTransaksi}</td>
        <td>
          <div class="fw-semibold">${item.idSetor}</div>
          <div class="text-muted" style="font-size:11px;">Ref: ${item.idShift}</div>
        </td>
        <td class="fw-semibold">${item.namaKdkmp}</td>
        <td>${item.namaPenyetor}</td>
        <td class="text-end">${formatRupiah(item.omsetCloseShift)}</td>
        <td class="text-end text-primary fw-semibold">${formatRupiah(item.nonTunai)}</td>
        <td class="text-end fw-bold">${formatRupiah(item.nominalTransfer)}</td>
        <td class="text-end ${selisihClass}">${formatRupiah(selisih)}</td>
        <td>${linkBukti}</td>
      </tr>
    `;
  });
}

// ==========================================
// MANAJEMEN AKUN (ADMIN)
// ==========================================
function renderUsersTable() {
  const tbody = document.getElementById("tbodyUsers");
  tbody.innerHTML = "";
  appData.users.forEach(u => {
    const isActive = u.roleStatus.toLowerCase().includes("active");
    const badge = isActive
      ? `<span class="badge bg-success">${u.roleStatus}</span>`
      : `<span class="badge bg-warning text-dark">${u.roleStatus}</span>`;
    const actionBtn = isActive
      ? `<button class="btn btn-sm btn-outline-danger" onclick="changeUserStatus(${u.rowIndex}, 'Sales | Suspended')">Nonaktifkan</button>`
      : `<button class="btn btn-sm btn-success" onclick="changeUserStatus(${u.rowIndex}, 'Sales | Active')">Setujui (Aktifkan)</button>`;

    tbody.innerHTML += `
      <tr>
        <td class="fw-semibold">${u.nama}</td>
        <td>${u.email}</td>
        <td>${u.noHp}</td>
        <td>${u.namaKdkmp}</td>
        <td>${badge}</td>
        <td>${u.email === currentUser.email ? "-" : actionBtn}</td>
      </tr>
    `;
  });
}

async function changeUserStatus(rowIndex, newStatus) {
  showLoading("Memperbarui status akun...");
  try {
    const res = await callGasApi({
      action: "approveUser",
      rowIndex: rowIndex,
      newStatus: newStatus
    });
    hideLoading();
    alert(res.message);
    if (res.status === "success") {
      await refreshData();
    }
  } catch (err) {
    hideLoading();
    alert("Gagal memperbarui akun: " + err.message);
  }
}