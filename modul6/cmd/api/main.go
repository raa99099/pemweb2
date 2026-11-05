package main

import (
	"log"

	"latihan-fiber-api/internal/config"
	"latihan-fiber-api/internal/router"

	"github.com/gofiber/fiber/v3"
)

func main() {
	cfg := config.Muat()
	config.HubungkanDatabase(cfg)
	config.Migrasi()
	config.DataAwal()

	app := fiber.New()

	app.Get("/", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"pesan": "Selamat datang di " + cfg.NamaAplikasi,
		})
	})

	// Daftarkan route API
	router.SetupRoutes(app)

	log.Fatal(app.Listen(":" + cfg.Port))
}
