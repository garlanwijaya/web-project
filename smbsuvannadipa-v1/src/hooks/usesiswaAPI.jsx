import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:6543/api/siswa";

export default function useSiswaAPI() {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data semua siswa
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal ambil data");
      const data = await res.json();
      setSiswaList(data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data siswa");
    } finally {
      setLoading(false);
    }
  };

  // Tambah siswa
  const addSiswa = async (payload) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal menambahkan");
      toast.success("Siswa berhasil ditambahkan");
      await fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan saat menambahkan");
      throw err;
    }
  };

  // Update (edit) siswa
  const updateSiswa = async (id, payload) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal memperbarui");
      toast.success("Data siswa berhasil diperbarui");
      await fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan saat update");
      throw err;
    }
  };

  // Hapus siswa
  const deleteSiswa = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal menghapus");
      toast.success("Siswa berhasil dihapus");
      await fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan saat hapus");
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { siswaList, loading, fetchData, addSiswa, updateSiswa, deleteSiswa };
}
