import { useState, useEffect } from "react";
import calculateClass from "./calculateclass"; // lihat file calculateClass.js secara opsional

export default function SiswaFormModal({
  mode,
  initialData,
  onClose,
  onSubmit,
}) {
  const [formState, setFormState] = useState({
    nama: "",
    umur: "",
    kelas: "",
    alamat: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Saat mode="edit", isi form dengan data awal
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormState({
        nama: initialData.nama || "",
        umur: String(initialData.umur || ""),
        kelas: initialData.kelas || "",
        alamat: initialData.alamat || "",
      });
    }
    if (mode === "add") {
      setFormState({ nama: "", umur: "", kelas: "", alamat: "" });
    }
  }, [mode, initialData]);

  // Handler perubahan di setiap field
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "umur") {
      // Hitung kelas otomatis saat umur berubah
      const angka = parseInt(value, 10);
      const newKelas = calculateClass(angka);
      setFormState((prev) => ({ ...prev, umur: value, kelas: newKelas }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Siapkan payload untuk onSubmit:
    const payload = {
      nama: formState.nama.trim(),
      umur: parseInt(formState.umur, 10),
      kelas: formState.kelas,
      alamat: formState.alamat.trim(),
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch {
      // Error sudah di-handle oleh useSiswaAPI (toast),
      // tetapi kita tetap biarkan modal tetap terbuka agar user bisa koreksi
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={() => !isSubmitting && onClose()}
      />
      {/* Modal */}
      <div className="bg-white rounded-xl w-96 overflow-hidden shadow-2xl z-20">
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h5 className="text-lg font-semibold">
            {mode === "add" ? "Tambah Siswa" : "Edit Siswa"}
          </h5>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white hover:text-gray-200 transition-all duration-200"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={formState.nama}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Umur */}
          <div>
            <label className="block text-sm font-medium mb-1">Umur</label>
            <input
              type="number"
              name="umur"
              value={formState.umur}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Kelas (otomatis, disabled) */}
          <div>
            <label className="block text-sm font-medium mb-1">Kelas</label>
            <input
              type="text"
              name="kelas"
              value={formState.kelas}
              disabled
              className="w-full border-2 border-gray-200 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <textarea
              name="alamat"
              value={formState.alamat}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500"
              rows={2}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Tombol aksi */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 transition-all duration-300"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting
                ? mode === "add"
                  ? "Menyimpan..."
                  : "Memperbarui..."
                : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
