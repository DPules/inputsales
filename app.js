const API_URL = 'https://script.google.com/macros/s/AKfycbyBs-njA5p7SukhDamHQ3hCg4-N4BqGFiY5T5-HfSKm2Xz3sQvDL9Yg7mZUhBsQb2B_/exec';

function safeParseUser() {
  try {
    const raw = localStorage.getItem('sales_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    localStorage.removeItem('sales_user');
    return null;
  }
}

let currentUser = safeParseUser();
let kdkmpMaster = [];
let savedCloseShifts = [];
let usedCloseShiftDates = [];
let shiftBuktiPayload = { base64: '', mimeType: '' };
let setorBuktiPayload = { base64: '', mimeType: '' };

function isSuccessResponse(res) {
  return Boolean(res && (res.status === 'success' || res.ok === true));
}

function getResponseMessage(res, fallback) {
  if (!res) return fallback;
  const msg = res.message || res.error;
  if (typeof msg === 'string' && msg.trim()) return msg.trim();
  return fallback;
}

function formatRupiah(num) {
  const n = Number(num || 0);
  return 'Rp ' + (isNaN(n) ? 0 : n).toLocaleString('id-ID');
}

function showAlert(msg, type = 'error') {
  const el = document.getElementById('alertBox');
  if (!el) return;
  const safeText = (typeof msg === 'string' && msg.trim())
    ? msg.trim()
    : (type === 'error' ? 'Terjadi kesalahan. Silakan periksa kembali input atau koneksi.' : 'Proses berhasil.');
  el.textContent = safeText;
  el.className = 'alert ' + (type === 'error' ? 'alert-error' : 'alert-success');
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideAlert() {
  const el = document.getElementById('alertBox');
  if (!el) return;
  el.textContent = '';
  el.style.display = 'none';
}

function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';

  const icon = btnEl ? btnEl.querySelector('i') : null;
  if (icon) {
    icon.classList.toggle('fa-eye', !isHidden);
    icon.classList.toggle('fa-eye-slash', isHidden);
  }
}

function resetPasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = 'password';
  const wrapper = input.closest('.password-wrapper');
  const icon = wrapper ? wrapper.querySelector('.btn-toggle-pass i') : null;
  if (icon) {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function bindImageInput(inputId, previewId, fileNameId, targetPayload) {
  const inputEl = document.getElementById(inputId);
  const previewEl = document.getElementById(previewId);
  const fileNameEl = document.getElementById(fileNameId);
  if (!inputEl || !previewEl || !fileNameEl) return;

  inputEl.addEventListener('change', function () {
    const file = this.files && this.files[0];
    if (!file) {
      targetPayload.base64 = '';
      targetPayload.mimeType = '';
      previewEl.src = '';
      previewEl.classList.add('hidden');
      fileNameEl.textContent = '';
      fileNameEl.classList.add('hidden');
      return;
    }

    if (!file.type || !file.type.startsWith('image/')) {
      showAlert('Harap pilih file gambar (JPG, PNG, WEBP, dll.).', 'error');
      this.value = '';
      targetPayload.base64 = '';
      targetPayload.mimeType = '';
      previewEl.classList.add('hidden');
      fileNameEl.classList.add('hidden');
      return;
    }

    fileNameEl.textContent = `File: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
    fileNameEl.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function (evt) {
      targetPayload.base64 = evt.target.result;
      targetPayload.mimeType = file.type;
      previewEl.src = evt.target.result;
      previewEl.classList.remove('hidden');
    };
    reader.onerror = function () {
      showAlert('Gagal membaca file gambar.', 'error');
    };
    reader.readAsDataURL(file);
  });
}

function resetImagePreview(inputId, previewId, fileNameId, targetPayload) {
  const inputEl = document.getElementById(inputId);
  if (inputEl) inputEl.value = '';
  targetPayload.base64 = '';
  targetPayload.mimeType = '';
  const previewEl = document.getElementById(previewId);
  const fileNameEl = document.getElementById(fileNameId);
  if (previewEl) {
    previewEl.src = '';
    previewEl.classList.add('hidden');
  }
  if (fileNameEl) {
    fileNameEl.textContent = '';
    fileNameEl.classList.add('hidden');
  }
}

bindImageInput('shiftBukti', 'previewShiftBukti', 'shiftFileName', shiftBuktiPayload);
bindImageInput('setorBukti', 'previewSetorBukti', 'setorFileName', setorBuktiPayload);

document.getElementById('shiftOmset').addEventListener('input', function () {
  document.getElementById('shiftOmsetFormatted').textContent = `Nominal: ${formatRupiah(this.value)}`;
});

function validateSelectedShiftDate() {
  const dateInput = document.getElementById('shiftTanggal');
  const infoEl = document.getElementById('usedDatesInfo');
  const btnSubmit = document.getElementById('btnCloseShift');
  if (!dateInput || !infoEl || !btnSubmit) return true;

  const val = dateInput.value;
  const listLabel = usedCloseShiftDates.length
    ? `Tanggal sudah terisi: ${usedCloseShiftDates.join(', ')}`
    : 'Belum ada tanggal Close Shift yang terisi untuk KDKMP ini.';

  if (val && usedCloseShiftDates.includes(val)) {
    infoEl.textContent = `Tanggal ${val} sudah diinput sebelumnya! Pilih tanggal lain. (${listLabel})`;
    infoEl.className = 'hint-text warn';
    btnSubmit.disabled = true;
    return false;
  }

  infoEl.textContent = listLabel;
  infoEl.className = 'hint-text';
  btnSubmit.disabled = false;
  return true;
}

document.getElementById('shiftTanggal').addEventListener('change', validateSelectedShiftDate);

async function loadUsedCloseShiftDates() {
  if (!currentUser || !currentUser.kdkmp) {
    usedCloseShiftDates = [];
    validateSelectedShiftDate();
    return;
  }

  try {
    const res = await postToGas('getUsedCloseShiftDates', { kdkmp: currentUser.kdkmp });
    if (isSuccessResponse(res)) {
      usedCloseShiftDates = Array.isArray(res.usedDates) ? res.usedDates : [];
    } else {
      usedCloseShiftDates = [];
    }
  } catch (err) {
    usedCloseShiftDates = [];
  }
  validateSelectedShiftDate();
}

function updateSelisihInfo() {
  const omsetVal = Number(document.getElementById('setorOmsetShift').value || 0);
  const transferRaw = document.getElementById('setorNominalTransfer').value;
  const infoEl = document.getElementById('selisihInfo');
  if (!infoEl) return;

  if (!document.getElementById('selectShiftRef').value) {
    infoEl.textContent = 'Pilih data Close Shift untuk melihat ringkasan transfer.';
    infoEl.className = 'hint-text';
    return;
  }

  if (transferRaw === '') {
    infoEl.textContent = `Omset Close Shift: ${formatRupiah(omsetVal)}`;
    infoEl.className = 'hint-text';
    return;
  }

  const transferVal = Number(transferRaw || 0);
  const diff = transferVal - omsetVal;

  if (diff === 0) {
    infoEl.textContent = `Sesuai omset (${formatRupiah(omsetVal)}) — Selisih Rp 0`;
    infoEl.className = 'hint-text ok';
  } else if (diff < 0) {
    infoEl.textContent = `Kurang setor ${formatRupiah(Math.abs(diff))} dari omset (${formatRupiah(omsetVal)})`;
    infoEl.className = 'hint-text warn';
  } else {
    infoEl.textContent = `Lebih setor ${formatRupiah(diff)} dari omset (${formatRupiah(omsetVal)})`;
    infoEl.className = 'hint-text warn';
  }
}

document.getElementById('setorNominalTransfer').addEventListener('input', updateSelisihInfo);

function switchView(viewId) {
  hideAlert();
  ['viewLogin', 'viewRegister', 'viewApp', 'viewAdmin'].forEach(id => {
    const sec = document.getElementById(id);
    if (sec) sec.classList.add('hidden');
  });
  const targetSec = document.getElementById(viewId);
  if (targetSec) targetSec.classList.remove('hidden');

  if (viewId === 'viewRegister' && kdkmpMaster.length === 0) {
    loadKdkmpMasterData();
  }

  if (viewId === 'viewApp' && currentUser) {
    document.getElementById('userInfo').innerHTML =
      `<div class="user-name">${currentUser.nama || '-'} • ${currentUser.role || 'Sales'}</div>
       <div class="user-kdkmp">${currentUser.kdkmp || 'Semua KDKMP (Admin)'}</div>
       <div class="user-meta">${currentUser.email || '-'} • ${currentUser.noHp || '-'}</div>`;
    const tglEl = document.getElementById('shiftTanggal');
    if (tglEl && !tglEl.value) tglEl.valueAsDate = new Date();
    document.getElementById('shiftOmsetFormatted').textContent = 'Nominal: Rp 0';

    const btnAdmin = document.getElementById('btnToAdmin');
    if (String(currentUser.role || '').toLowerCase() === 'admin') {
      btnAdmin.classList.remove('hidden');
    } else {
      btnAdmin.classList.add('hidden');
    }

    if (kdkmpMaster.length === 0) {
      loadKdkmpMasterData();
    }
    loadUsedCloseShiftDates();
    switchActivityTab('closeShift');
  }

  if (viewId === 'viewAdmin' && currentUser) {
    loadPendingUsers();
  }
}

function switchActivityTab(tabName) {
  hideAlert();
  const isClose = tabName === 'closeShift';
  document.getElementById('tabCloseShift').classList.toggle('active', isClose);
  document.getElementById('tabSetorOmset').classList.toggle('active', !isClose);
  document.getElementById('panelCloseShift').classList.toggle('hidden', !isClose);
  document.getElementById('panelSetorOmset').classList.toggle('hidden', isClose);

  if (isClose && currentUser) {
    loadUsedCloseShiftDates();
  } else if (!isClose && currentUser) {
    loadCloseShiftOptions();
  }
}

async function postToGas(action, data = {}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, data })
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error('Respons server bukan JSON valid.');
  }
}

function bindCascadeSelects(kabId, kecId, kdkmpId) {
  const selKab = document.getElementById(kabId);
  const selKec = document.getElementById(kecId);
  const selKdkmp = document.getElementById(kdkmpId);
  if (!selKab || !selKec || !selKdkmp) return;

  selKab.addEventListener('change', function () {
    const selectedKab = this.value;
    selKdkmp.innerHTML = '<option value="">-- Pilih Kecamatan dulu --</option>';
    selKdkmp.disabled = true;

    if (!selectedKab) {
      selKec.innerHTML = '<option value="">-- Pilih Kabupaten/Kota dulu --</option>';
      selKec.disabled = true;
      return;
    }

    const uniqueKec = [
      ...new Set(
        kdkmpMaster
          .filter(item => item.kabupaten === selectedKab)
          .map(item => item.kecamatan)
          .filter(Boolean)
      )
    ].sort();

    selKec.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    uniqueKec.forEach(kec => {
      const opt = document.createElement('option');
      opt.value = kec;
      opt.textContent = kec;
      selKec.appendChild(opt);
    });
    selKec.disabled = false;
  });

  selKec.addEventListener('change', function () {
    const selectedKab = selKab.value;
    const selectedKec = this.value;

    if (!selectedKec) {
      selKdkmp.innerHTML = '<option value="">-- Pilih Kecamatan dulu --</option>';
      selKdkmp.disabled = true;
      return;
    }

    const filteredKdkmp = kdkmpMaster
      .filter(item => item.kabupaten === selectedKab && item.kecamatan === selectedKec)
      .map(item => item.kdkmp)
      .filter(Boolean)
      .sort();

    selKdkmp.innerHTML = '<option value="">-- Pilih Nama KDKMP --</option>';
    filteredKdkmp.forEach(nama => {
      const opt = document.createElement('option');
      opt.value = nama;
      opt.textContent = nama;
      selKdkmp.appendChild(opt);
    });
    selKdkmp.disabled = false;
  });
}

function populateRegKabupaten() {
  const selectEl = document.getElementById('regKabupaten');
  if (!selectEl) return;
  const uniqueKab = [...new Set(kdkmpMaster.map(item => item.kabupaten).filter(Boolean))].sort();
  selectEl.innerHTML = '<option value="">-- Pilih Kabupaten / Kota --</option>';
  uniqueKab.forEach(kab => {
    const opt = document.createElement('option');
    opt.value = kab;
    opt.textContent = kab;
    selectEl.appendChild(opt);
  });
}

async function loadKdkmpMasterData() {
  const regKab = document.getElementById('regKabupaten');
  if (regKab) regKab.innerHTML = '<option value="">-- Memuat data wilayah... --</option>';

  try {
    const res = await postToGas('getKdkmpData');
    if (!isSuccessResponse(res)) {
      if (regKab) regKab.innerHTML = '<option value="">Gagal memuat data wilayah</option>';
      return;
    }

    const rawList = Array.isArray(res.data) ? res.data : [];
    kdkmpMaster = rawList.map(item => ({
      kabupaten: item.kabupaten || item.kab || '',
      kecamatan: item.kecamatan || item.kec || '',
      kdkmp: item.kdkmp || item.nama || ''
    }));
    populateRegKabupaten();
  } catch (err) {
    if (regKab) regKab.innerHTML = '<option value="">Error koneksi server</option>';
  }
}

bindCascadeSelects('regKabupaten', 'regKecamatan', 'regKdkmp');

async function loadCloseShiftOptions() {
  const selectEl = document.getElementById('selectShiftRef');
  selectEl.innerHTML = '<option value="">-- Memuat data Close Shift... --</option>';
  clearSetorAutofill();

  try {
    const res = await postToGas('getCloseShifts', {
      email: currentUser.email,
      role: currentUser.role,
      kdkmp: currentUser.kdkmp || ''
    });

    if (!isSuccessResponse(res)) {
      selectEl.innerHTML = '<option value="">Gagal memuat data Close Shift</option>';
      return;
    }

    savedCloseShifts = Array.isArray(res.shifts) ? res.shifts : [];
    if (!savedCloseShifts.length) {
      selectEl.innerHTML = '<option value="">-- Tidak ada Close Shift belum disetor untuk KDKMP Anda --</option>';
      return;
    }

    selectEl.innerHTML = '<option value="">-- Pilih Data Close Shift --</option>';
    savedCloseShifts.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.idShift;
      opt.textContent = `${s.idShift} • ${s.tanggalTransaksi} • ${s.kdkmp} (${formatRupiah(s.omsetHarian)})`;
      selectEl.appendChild(opt);
    });
  } catch (err) {
    selectEl.innerHTML = '<option value="">Error koneksi server</option>';
  }
}

function clearSetorAutofill() {
  document.getElementById('setorTanggal').value = '';
  document.getElementById('setorKabupaten').value = '';
  document.getElementById('setorKecamatan').value = '';
  document.getElementById('setorKdkmp').value = '';
  document.getElementById('setorOmsetShift').value = '';
  document.getElementById('setorNominalTransfer').value = '';
  updateSelisihInfo();
}

document.getElementById('selectShiftRef').addEventListener('change', function () {
  const selectedId = this.value;
  if (!selectedId) {
    clearSetorAutofill();
    return;
  }

  const found = savedCloseShifts.find(item => item.idShift === selectedId);
  if (!found) return;

  document.getElementById('setorTanggal').value = found.tanggalTransaksi;
  document.getElementById('setorKabupaten').value = found.kabupaten;
  document.getElementById('setorKecamatan').value = found.kecamatan;
  document.getElementById('setorKdkmp').value = found.kdkmp;
  document.getElementById('setorOmsetShift').value = found.omsetHarian;
  document.getElementById('setorNominalTransfer').value = found.omsetHarian;
  updateSelisihInfo();
});

window.onload = () => {
  if (currentUser) switchView('viewApp');
  else {
    switchView('viewLogin');
    loadKdkmpMasterData();
  }
};

document.getElementById('formRegister').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = document.getElementById('btnRegister');
  btn.disabled = true;
  btn.textContent = 'Memproses...';

  try {
    const res = await postToGas('register', {
      nama: document.getElementById('regNama').value.trim(),
      email: document.getElementById('regEmail').value.trim(),
      noHp: document.getElementById('regHp').value.trim(),
      kabupaten: document.getElementById('regKabupaten').value,
      kecamatan: document.getElementById('regKecamatan').value,
      kdkmp: document.getElementById('regKdkmp').value,
      password: document.getElementById('regPass').value
    });

    if (isSuccessResponse(res)) {
      document.getElementById('formRegister').reset();
      resetPasswordVisibility('regPass');
      document.getElementById('regKecamatan').innerHTML = '<option value="">-- Pilih Kabupaten/Kota dulu --</option>';
      document.getElementById('regKecamatan').disabled = true;
      document.getElementById('regKdkmp').innerHTML = '<option value="">-- Pilih Kecamatan dulu --</option>';
      document.getElementById('regKdkmp').disabled = true;
      switchView('viewLogin');
      showAlert(getResponseMessage(res, 'Registrasi berhasil. Menunggu persetujuan admin.'), 'success');
    } else {
      showAlert(getResponseMessage(res, 'Registrasi gagal. Periksa kembali data Anda.'), 'error');
    }
  } catch (err) {
    showAlert('Gagal terhubung ke server: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Daftar Akun';
  }
});

document.getElementById('formLogin').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = document.getElementById('btnLogin');
  btn.disabled = true;
  btn.textContent = 'Memeriksa...';

  try {
    const res = await postToGas('login', {
      email: document.getElementById('loginEmail').value.trim(),
      password: document.getElementById('loginPass').value
    });

    if (isSuccessResponse(res) && res.user) {
      currentUser = res.user;
      localStorage.setItem('sales_user', JSON.stringify(currentUser));
      document.getElementById('formLogin').reset();
      resetPasswordVisibility('loginPass');
      switchView('viewApp');
    } else {
      showAlert(getResponseMessage(res, 'Email atau password salah / akun belum aktif.'), 'error');
    }
  } catch (err) {
    showAlert('Gagal terhubung ke server: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Masuk';
  }
});

document.getElementById('formCloseShift').addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!validateSelectedShiftDate()) {
    showAlert('Tanggal tersebut sudah pernah diinput untuk KDKMP ini dan tidak bisa diinput ulang.', 'error');
    return;
  }
  if (!shiftBuktiPayload.base64) {
    showAlert('Lampiran gambar bukti Close Shift wajib diunggah.', 'error');
    return;
  }

  const btn = document.getElementById('btnCloseShift');
  btn.disabled = true;
  btn.textContent = 'Mengunggah & Menyimpan...';

  try {
    const res = await postToGas('submitCloseShift', {
      namaSales: currentUser.nama,
      emailSales: currentUser.email,
      noHpSales: currentUser.noHp,
      kdkmp: currentUser.kdkmp || '',
      tanggalTransaksi: document.getElementById('shiftTanggal').value,
      omsetHarian: document.getElementById('shiftOmset').value,
      catatan: document.getElementById('shiftCatatan').value,
      buktiBase64: shiftBuktiPayload.base64,
      buktiMimeType: shiftBuktiPayload.mimeType
    });

    if (isSuccessResponse(res)) {
      document.getElementById('formCloseShift').reset();
      document.getElementById('shiftTanggal').valueAsDate = new Date();
      document.getElementById('shiftOmsetFormatted').textContent = 'Nominal: Rp 0';
      resetImagePreview('shiftBukti', 'previewShiftBukti', 'shiftFileName', shiftBuktiPayload);
      await loadUsedCloseShiftDates();
      showAlert(getResponseMessage(res, 'Data Close Shift berhasil disimpan.'), 'success');
    } else {
      showAlert(getResponseMessage(res, 'Gagal menyimpan data Close Shift.'), 'error');
    }
  } catch (err) {
    showAlert('Gagal terhubung ke server: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Simpan Close Shift';
  }
});

document.getElementById('formSetorOmset').addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!setorBuktiPayload.base64) {
    showAlert('Lampiran gambar bukti transfer wajib diunggah.', 'error');
    return;
  }

  const btn = document.getElementById('btnSetorOmset');
  btn.disabled = true;
  btn.textContent = 'Mengunggah & Menyimpan...';

  try {
    const res = await postToGas('submitSetorOmset', {
      idShift: document.getElementById('selectShiftRef').value,
      namaPenyetor: currentUser.nama,
      emailPenyetor: currentUser.email,
      noHpPenyetor: currentUser.noHp,
      tanggalTransaksi: document.getElementById('setorTanggal').value,
      kabupaten: document.getElementById('setorKabupaten').value,
      kecamatan: document.getElementById('setorKecamatan').value,
      kdkmp: document.getElementById('setorKdkmp').value,
      omsetCloseShift: document.getElementById('setorOmsetShift').value,
      nominalTransfer: document.getElementById('setorNominalTransfer').value,
      catatanSetor: document.getElementById('setorCatatan').value,
      buktiBase64: setorBuktiPayload.base64,
      buktiMimeType: setorBuktiPayload.mimeType
    });

    if (isSuccessResponse(res)) {
      document.getElementById('formSetorOmset').reset();
      clearSetorAutofill();
      resetImagePreview('setorBukti', 'previewSetorBukti', 'setorFileName', setorBuktiPayload);
      await loadCloseShiftOptions();
      showAlert(getResponseMessage(res, 'Data Setor Omset berhasil disimpan.'), 'success');
    } else {
      showAlert(getResponseMessage(res, 'Gagal menyimpan data Setor Omset.'), 'error');
    }
  } catch (err) {
    showAlert('Gagal terhubung ke server: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Simpan Setor Omset';
  }
});

async function loadPendingUsers() {
  const container = document.getElementById('pendingList');
  container.innerHTML = 'Memuat daftar akun pending...';

  try {
    const res = await postToGas('getPendingUsers', { adminEmail: currentUser.email });
    if (!isSuccessResponse(res)) {
      container.innerHTML = `<p>${getResponseMessage(res, 'Gagal memuat daftar akun pending.')}</p>`;
      return;
    }

    const users = Array.isArray(res.users) ? res.users : [];
    if (!users.length) {
      container.innerHTML = '<p>Tidak ada akun baru yang menunggu approval.</p>';
      return;
    }

    container.innerHTML = '';
    users.forEach(u => {
      const card = document.createElement('div');
      card.className = 'pending-card';
      card.innerHTML = `
        <div><strong>${u.nama || '-'}</strong></div>
        <div>KDKMP: ${u.kdkmp || '-'}</div>
        <div>Email: ${u.email || '-'}</div>
        <div>No HP: ${u.noHp || '-'}</div>
        <div class="pending-actions">
          <button type="button" class="btn-approve" onclick="handleDecision('${u.email}', 'approve')">Approve</button>
          <button type="button" class="btn-reject" onclick="handleDecision('${u.email}', 'reject')">Tolak</button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<p>Gagal memuat data: ${err.message}</p>`;
  }
}

async function handleDecision(targetEmail, decision) {
  try {
    const res = await postToGas('approveUser', {
      adminEmail: currentUser.email,
      targetEmail,
      decision
    });

    if (isSuccessResponse(res)) {
      showAlert(getResponseMessage(res, 'Keputusan approval berhasil disimpan.'), 'success');
      loadPendingUsers();
    } else {
      showAlert(getResponseMessage(res, 'Gagal memproses approval.'), 'error');
    }
  } catch (err) {
    showAlert('Gagal memproses approval: ' + err.message, 'error');
  }
}

function logout() {
  localStorage.removeItem('sales_user');
  currentUser = null;
  savedCloseShifts = [];
  usedCloseShiftDates = [];
  switchView('viewLogin');
}