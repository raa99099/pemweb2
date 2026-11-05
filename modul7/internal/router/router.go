package router

import (
	"github.com/gofiber/fiber/v3"
	"modul7/internal/handler"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")

	mahasiswa := api.Group("/mahasiswa")
	mahasiswa.Get("/", handler.DaftarMahasiswa)
	mahasiswa.Post("/", handler.BuatMahasiswa)
	mahasiswa.Get("/:id", handler.DetailMahasiswa)
	mahasiswa.Put("/:id", handler.PerbaruiMahasiswa)
	mahasiswa.Delete("/:id", handler.HapusMahasiswa)
}