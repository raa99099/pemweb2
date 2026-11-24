import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { simpanMahasiswa } from '../api/layananMahasiswa'

export default function TambahMahasiswa() {
  const [form, setForm] = useState({
    program_studi_id: 1,
    nim: '',
    nama: '',
    email: '',
    angkatan: 2025,
    ipk: 0,
  })
  const [pesanUmum, setPesanUmum] = useState('')
  const [daftarGalat, setDaftarGalat] = useState([])
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const navigasi = useNavigate()

  async function tanganiSimpan(e) {
    e.preventDefault()
    setPesanUmum('')
    setDaftarGalat([])
    setSedangMemuat(true)

    try {
      await simpanMahasiswa({
        ...form,
        program_studi_id: Number(form.program_studi_id),
        angkatan: Number(form.angkatan),
        ipk: Number(form.ipk),
      })
      navigasi('/mahasiswa')
    } catch (galat) {
      const resp = galat.response?.data
      setPesanUmum(resp?.pesan || resp?.message || 'Gagal menyimpan data')
      if (Array.isArray(resp?.galat)) {
        setDaftarGalat(resp.galat)
      } else if (resp?.errors) {
        const list = Object.entries(resp.errors).map(([field, pesan]) => ({
          field,
          pesan: Array.isArray(pesan) ? pesan[0] : pesan,
        }))
        setDaftarGalat(list)
      }
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <div style={{ maxWidth: 450, margin: '40px auto' }}>
      <h1>Tambah Mahasiswa</h1>
      {pesanUmum && <p style={{ color: 'crimson' }}>{pesanUmum}</p>}
      {daftarGalat.length > 0 && (
        <ul style={{ color: 'crimson' }}>
          {daftarGalat.map((g, idx) => (
            <li key={idx}>
              <strong>{g.field}:</strong> {g.pesan}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={tanganiSimpan}>
        <div style={{ marginBottom: 10 }}>
          <label>Program Studi ID (1=TK, 2=IF, 3=TE)</label>
          <input
            type="number"
            value={form.program_studi_id}
            onChange={(e) => setForm({ ...form, program_studi_id: e.target.value })}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>NIM (diawali huruf H)</label>
          <input
            type="text"
            value={form.nim}
            onChange={(e) => setForm({ ...form, nim: e.target.value })}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Nama</label>
          <input
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Angkatan</label>
          <input
            type="number"
            value={form.angkatan}
            onChange={(e) => setForm({ ...form, angkatan: e.target.value })}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>IPK</label>
          <input
            type="number"
            step="0.01"
            value={form.ipk}
            onChange={(e) => setForm({ ...form, ipk: e.target.value })}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
        <button type="submit" disabled={sedangMemuat} style={{ marginRight: 10 }}>
          {sedangMemuat ? 'Menyimpan...' : 'Simpan'}
        </button>
        <Link to="/mahasiswa">Batal</Link>
      </form>
    </div>
  )
}