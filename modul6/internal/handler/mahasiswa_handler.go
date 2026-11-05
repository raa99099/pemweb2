package handler

import (
	"latihan-fiber-api/internal/config"
	"latihan-fiber-api/internal/model"

	"github.com/gofiber/fiber/v3"
)

// GET /api/mahasiswa - Ambil Semua Data
func AmbilSemuaMahasiswa(c fiber.Ctx) error {
	var mahasiswas []model.Mahasiswa
	config.DB.Preload("ProgramStudi").Find(&mahasiswas)
	return c.JSON(fiber.Map{
		"status": "sukses",
		"data":   mahasiswas,
	})
}

// GET /api/mahasiswa/:id - Ambil Detail Berdasarkan ID
func AmbilMahasiswaByID(c fiber.Ctx) error {
	id := c.Params("id")
	var mhs model.Mahasiswa

	if err := config.DB.Preload("ProgramStudi").First(&mhs, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status": "gagal",
			"pesan":  "Data mahasiswa tidak ditemukan",
		})
	}

	return c.JSON(fiber.Map{
		"status": "sukses",
		"data":   mhs,
	})
}

// POST /api/mahasiswa - Tambah Data Baru
func TambahMahasiswa(c fiber.Ctx) error {
	var mhs model.Mahasiswa
	if err := c.Bind().Body(&mhs); err != nil {
		return c.Status(400).JSON(fiber.Map{"pesan": "Format data tidak valid"})
	}

	if err := config.DB.Create(&mhs).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"pesan": "Gagal menambah mahasiswa", "error": err.Error()})
	}

	return c.Status(201).JSON(fiber.Map{
		"status": "sukses",
		"pesan":  "Mahasiswa berhasil ditambahkan",
		"data":   mhs,
	})
}

// PUT /api/mahasiswa/:id - Update Data Berdasarkan ID
func UpdateMahasiswa(c fiber.Ctx) error {
	id := c.Params("id")
	var mhs model.Mahasiswa

	if err := config.DB.First(&mhs, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status": "gagal",
			"pesan":  "Data mahasiswa tidak ditemukan",
		})
	}

	var dataBaru model.Mahasiswa
	if err := c.Bind().Body(&dataBaru); err != nil {
		return c.Status(400).JSON(fiber.Map{"pesan": "Format data tidak valid"})
	}

	config.DB.Model(&mhs).Updates(dataBaru)

	return c.JSON(fiber.Map{
		"status": "sukses",
		"pesan":  "Data mahasiswa berhasil diperbarui",
		"data":   mhs,
	})
}

// DELETE /api/mahasiswa/:id - Hapus Data Berdasarkan ID
func HapusMahasiswa(c fiber.Ctx) error {
	id := c.Params("id")
	var mhs model.Mahasiswa

	if err := config.DB.First(&mhs, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"status": "gagal",
			"pesan":  "Data mahasiswa tidak ditemukan",
		})
	}

	config.DB.Delete(&mhs)

	return c.JSON(fiber.Map{
		"status": "sukses",
		"pesan":  "Data mahasiswa berhasil dihapus",
	})
}
