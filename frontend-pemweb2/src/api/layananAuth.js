import klien, { MODE_BACKEND } from './klien'

export async function login(email, kataSandi) {
  const payload =
    MODE_BACKEND === 'fiber'
      ? { email, kata_sandi: kataSandi }
      : { email, password: kataSandi }

  const respons = await klien.post('/auth/login', payload)
  return respons.data
}

export async function ambilProfil() {
  const respons = await klien.get('/auth/profil')
  return respons.data
}

export async function logout() {
  const respons = await klien.post('/auth/logout')
  return respons.data
}