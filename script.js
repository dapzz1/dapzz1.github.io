const form = document.getElementById('daftarForm');
const fakultasSelect = document.getElementById('fakultasSelect');
const prodiSelect = document.getElementById('prodiSelect');
const hasilData = document.getElementById('hasilData');
const hasilContainer = document.getElementById('hasilContainer');
const kembaliBtn = document.getElementById('kembaliBtn');

// Data Program Studi per Fakultas
const prodiData = {
  "Fakultas Teknologi Informasi (FTI)": [
    "Informatika", "Sistem Informasi", "Teknologi Informasi",
    "Rekayasa Perangkat Lunak", "Sains Data", "Keamanan Siber"
  ],
  "Fakultas Ekonomi dan Bisnis (FEB)": [
    "Manajemen", "Akuntansi", "Ekonomi Pembangunan",
    "Keuangan dan Perbankan", "Bisnis Digital", "Kewirausahaan"
  ],
  "Fakultas Teknik (FT)": [
    "Teknik Elektro", "Teknik Mesin", "Teknik Industri",
    "Teknik Sipil", "Teknik Arsitektur", "Teknik Lingkungan"
  ],
  "Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)": [
    "Ilmu Komunikasi", "Hubungan Internasional", "Administrasi Publik", "Sosiologi"
  ],
  "Fakultas Hukum (FH)": ["Ilmu Hukum"],
  "Fakultas Kesehatan (FKes)": [
    "Kesehatan Masyarakat", "Keperawatan", "Gizi", "Farmasi", "Kebidanan"
  ],
  "Fakultas Sains dan Teknologi (FST)": [
    "Bioteknologi", "Kimia", "Fisika", "Matematika", "Statistika"
  ],
  "Fakultas Psikologi (FPsi)": ["Psikologi"],
  "Fakultas Keguruan dan Ilmu Pendidikan (FKIP)": [
    "Pendidikan Bahasa Inggris", "Pendidikan Matematika",
    "Pendidikan Biologi", "Pendidikan Ekonomi", "Pendidikan Informatika"
  ],
  "Fakultas Seni dan Desain (FSD)": [
    "Desain Komunikasi Visual", "Desain Interior",
    "Seni Rupa", "Film dan Televisi", "Animasi"
  ]
};

// Update prodi berdasarkan fakultas
fakultasSelect.addEventListener('change', () => {
  const fakultas = fakultasSelect.value;
  prodiSelect.innerHTML = '<option value="">-- Pilih Program Studi --</option>';

  if (prodiData[fakultas]) {
    prodiData[fakultas].forEach(prodi => {
      const option = document.createElement('option');
      option.value = prodi;
      option.textContent = prodi;
      prodiSelect.appendChild(option);
    });
  }
});

// Submit form & tampilkan hasil
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let hasilHTML = '';
  const filePromises = [];

  formData.forEach((value, key) => {
    // ⛔ Abaikan field checkbox pernyataan
    if (key === 'pernyataan') return;

    if (value instanceof File && value.name !== '') {
      const file = value;
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
        const p = new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => {
            hasilHTML += `<p><strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong><br>
              <img src="${e.target.result}" style="max-width:200px; margin-top:5px; border:1px solid #ccc; border-radius:5px;">
            </p>`;
            resolve();
          };
          reader.readAsDataURL(file);
        });
        filePromises.push(p);
      } else {
        hasilHTML += `<p><strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong> ${file.name}</p>`;
      }
    } else if (!(value instanceof File)) {
      hasilHTML += `<p><strong>${key.replace(/_/g, ' ').toUpperCase()}:</strong> ${value}</p>`;
    }
  });

  Promise.all(filePromises).then(() => {
    hasilContainer.innerHTML = hasilHTML;
    hasilData.style.display = 'block';
    form.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


// Tombol kembali
kembaliBtn.addEventListener('click', () => {
  hasilData.style.display = 'none';
  form.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
