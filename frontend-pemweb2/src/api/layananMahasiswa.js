import klien, { MODE_BACKEND } from './klien'

export async function ambilDaftarMahasiswa(parameter) {
  const params =
    MODE_BACKEND === 'fiber'
      ? {
          halaman: parameter.page,
          cari: parameter.cari,
          per_halaman: parameter.per_halaman,
        }
      : parameter

  const respons = await klien.get('/mahasiswa', { params })
  return respons.data
}

export async function ambilDetailMahasiswa(id) {
  const respons = await klien.get(`/mahasiswa/${id}`)
  return respons.data
}

export async function simpanMahasiswa(data) {
  const respons = await klien.post('/mahasiswa', data)
  return respons.data
}

export async function hapusMahasiswa(id) {
  const respons = await klien.delete(`/mahasiswa/${id}`)
  return respons.data
}