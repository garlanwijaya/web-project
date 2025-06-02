import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { ToastContainer } from "react-toastify";
import useSiswaAPI from "../../hooks/usesiswaAPI";
import SiswaFormModal from "../../components/siswaformmodal";
import ConfirmDeleteModal from "../../components/confirmdeletemodal";

export default function Daftarsiswa() {
  const {
    siswaList,
    loading: isLoading,
    addSiswa,
    updateSiswa,
    deleteSiswa,
  } = useSiswaAPI();

  // modalState: { type: null | "add" | "edit" | "delete", payload: siswaObj }
  const [modalState, setModalState] = useState({ type: null, payload: null });

  // Buka modal Tambah
  const openAddModal = () => {
    setModalState({ type: "add", payload: null });
  };

  // Buka modal Edit (kirim satu objek siswa sebagai payload)
  const openEditModal = (siswa) => {
    setModalState({ type: "edit", payload: siswa });
  };

  // Buka modal Delete
  const openDeleteModal = (siswa) => {
    setModalState({ type: "delete", payload: siswa });
  };

  // Tutup semua modal
  const closeModal = () => {
    setModalState({ type: null, payload: null });
  };

  // Handler saat submit Tambah
  const handleAdd = async (newData) => {
    await addSiswa(newData);
  };

  // Handler saat submit Edit
  const handleEdit = async (updatedData) => {
    const id = modalState.payload.id;
    await updateSiswa(id, updatedData);
  };

  // Handler saat konfirmasi Delete
  const handleDelete = async () => {
    const id = modalState.payload.id;
    await deleteSiswa(id);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} />

        <main className="flex-grow p-8 overflow-auto">
          <div className="mx-auto p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
                <h5 className="text-lg font-semibold">Daftar Siswa</h5>
                <button
                  onClick={openAddModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
                >
                  Tambah Siswa
                </button>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="text-center text-blue-600">
                    Sedang mengambil data...
                  </div>
                ) : (
                  <table className="w-full table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        {["No", "Nama", "Umur", "Kelas", "Alamat", "Aksi"].map(
                          (h) => (
                            <th
                              key={h}
                              className="px-4 py-2 text-center text-blue-600 font-medium"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {siswaList.map((siswa, idx) => (
                        <tr
                          key={siswa.id}
                          className="hover:bg-gray-100 transition transform hover:translate-x-1"
                        >
                          <td className="px-4 py-2 text-center">{idx + 1}</td>
                          <td className="px-4 py-2 text-center">
                            {siswa.nama}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {siswa.umur}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {siswa.kelas}
                          </td>
                          <td className="px-4 py-2">{siswa.alamat}</td>
                          <td className="flex items-center justify-center px-4 py-2 space-x-2 text-center">
                            <button
                              onClick={() => openEditModal(siswa)}
                              className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-all duration-300"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(siswa)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-all duration-300"
                            >
                              <Trash size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {siswaList.length === 0 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-4 text-center text-gray-500"
                          >
                            Belum ada data siswa.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Render modal sesuai modalState.type */}
          {modalState.type === "add" && (
            <SiswaFormModal
              mode="add"
              initialData={null}
              onClose={closeModal}
              onSubmit={handleAdd}
            />
          )}

          {modalState.type === "edit" && (
            <SiswaFormModal
              mode="edit"
              initialData={modalState.payload}
              onClose={closeModal}
              onSubmit={handleEdit}
            />
          )}

          {modalState.type === "delete" && (
            <ConfirmDeleteModal
              siswa={modalState.payload}
              onClose={closeModal}
              onConfirm={handleDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
}
