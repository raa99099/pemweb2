import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/layananAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [pesanGalat, setPesanGalat] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)
  const navigasi = useNavigate()

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()
    setPesanGalat('')
    setSedangMemuat(true)
    try {
      const hasil = await login(email, kataSandi)
      sessionStorage.setItem('token', hasil.data.token)
      navigasi('/mahasiswa')
    } catch (galat) {
      if (galat.response) {
        setPesanGalat(galat.response.data.pesan || galat.response.data.message || 'Login gagal')
      } else {
        setPesanGalat('Tidak dapat menghubungi server')
      }
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '80px auto' }}>
      <h1>Masuk</h1>
      {pesanGalat && <p style={{ color: 'crimson' }}>{pesanGalat}</p>}
      <form onSubmit={tanganiKirim}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="kata-sandi">Kata Sandi</label>
          <input
            id="kata-sandi"
            type="password"
            value={kataSandi}
            onChange={(e) => setKataSandi(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <button type="submit" disabled={sedangMemuat}>
          {sedangMemuat ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  )
}