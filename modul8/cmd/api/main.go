package main

import (
	"log"

	"modul7/internal/config"
	"modul7/internal/router"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {
	konf := config.Muat()

	config.HubungkanBasisData(konf)
	config.Migrasi()
	config.DataAwal()

	app := fiber.New(fiber.Config{
		AppName: konf.NamaAplikasi,
	})

	// Pasang CORS sebelum router.Setup(app)
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	router.Setup(app)

	log.Printf("Server berjalan di port %s", konf.Port)
	log.Fatal(app.Listen(":" + konf.Port))
}
