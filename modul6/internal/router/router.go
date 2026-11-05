package router

import (
	"latihan-fiber-api/internal/handler"

	"github.com/gofiber/fiber/v3"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Endpoint CRUD Mahasiswa
	api.Get("/mahasiswa", handler.AmbilSemuaMahasiswa)
	api.Get("/mahasiswa/:id", handler.AmbilMahasiswaByID)
	api.Post("/mahasiswa", handler.TambahMahasiswa)
	api.Put("/mahasiswa/:id", handler.UpdateMahasiswa)
	api.Delete("/mahasiswa/:id", handler.HapusMahasiswa)
}
