import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ambilDaftarMahasiswa, hapusMahasiswa } from '../api/layananMahasiswa'
import { logout } from '../api/layananAuth'

export default function DaftarMahasiswa() {
  const [daftar, setDaftar] = useState([])
  const [meta, setMeta] = useState(null)
  const [halaman, setHalaman] = useState(1)
  const [cari, setCari] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const [pesanGalat, setPesanGalat] = useState('')
  const navigasi = useNavigate()

  async function muatData(dibatalkan = false) {
    setSedangMemuat(true)
    setPesanGalat('')
    try {
      const hasil = await ambilDaftarMahasiswa({
        page: halaman,
        cari: cari,
        per_halaman: 10,
      })
      if (!dibatalkan) {
        setDaftar(hasil.data || [])
        setMeta(hasil.meta || null)
      }
    } catch {
      if (!dibatalkan) {
        setPesanGalat('Gagal memuat data mahasiswa')
      }
    } finally {
      if (!dibatalkan) {
        setSedangMemuat(false)
      }
    }
  }

  useEffect(() => {
    let dibatalkan = false
    const penunda = setTimeout(() => muatData(dibatalkan), 400)
    return () => {
      dibatalkan = true
      clearTimeout(penunda)
    }
  }, [halaman, cari])

  async function tanganiHapus(id, nama) {
    if (!window.confirm(`Yakin ingin menghapus data mahasiswa ${nama}?`)) return
    try {
      await hapusMahasiswa(id)
      muatData()
    } catch (galat) {
      alert(galat.response?.data?.pesan || 'Gagal menghapus data')
    }
  }

  async function tanganiLogout() {
    try {
      await logout()
    } finally {
      sessionStorage.removeItem('token')
      navigasi('/login')
    }
  }

  const halamanSekarang = meta?.current_page || meta?.halaman || 1
  const totalHalaman = meta?.last_page || meta?.total_halaman || 1

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Daftar Mahasiswa</h1>
        <div>
          <Link to="/mahasiswa/tambah" style={{ marginRight: 12 }}>
            + Tambah Mahasiswa
          </Link>
          <button onClick={tanganiLogout}>Keluar</button>
        </div>
      </div>

      <input
        type="search"
        placeholder="Cari nama atau NIM"
        value={cari}
        onChange={(e) => {
          setHalaman(1)
          setCari(e.target.value)
        }}
        style={{ padding: 8, width: 300 }}
      />

      {sedangMemuat && <p>Memuat data...</p>}
      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}
      {!sedangMemuat && daftar.length === 0 && <p>Data tidak ditemukan</p>}

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Angkatan</th>
            <th>IPK</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((mhs) => (
            <tr key={mhs.id}>
              <td>{mhs.nim}</td>
              <td>{mhs.nama}</td>
              <td>{mhs.angkatan}</td>
              <td>{mhs.ipk}</td>
              <td>
                <button onClick={() => tanganiHapus(mhs.id, mhs.nama)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {meta && (
        <div style={{ marginTop: 16 }}>
          <button onClick={() => setHalaman(halaman - 1)} disabled={halamanSekarang <= 1}>
            Sebelumnya
          </button>
          <span style={{ margin: '0 12px' }}>
            Halaman {halamanSekarang} dari {totalHalaman}
          </span>
          <button
            onClick={() => setHalaman(halaman + 1)}
            disabled={halamanSekarang >= totalHalaman}
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  )
}