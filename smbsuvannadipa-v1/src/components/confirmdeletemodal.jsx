import { useState } from "react";

export default function ConfirmDeleteModal({ siswa, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      // Error toast sudah di-handle oleh useSiswaAPI
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={() => !isDeleting && onClose()}
      />
      {/* Modal */}
      <div className="bg-white rounded-xl w-96 overflow-hidden shadow-2xl z-20 p-6">
        <h5 className="text-lg font-semibold mb-4">Hapus Siswa</h5>
        <p className="mb-6">
          Apakah Anda yakin ingin menghapus siswa <b>{siswa.nama}</b>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-300 transition-all duration-300"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 text-white rounded-lg transition-all duration-300 ${
              isDeleting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
