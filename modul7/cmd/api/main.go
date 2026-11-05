package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"modul7/internal/config"
	"modul7/internal/router"
)

func main() {
	konf := config.Muat()

	config.HubungkanBasisData(konf)
	config.Migrasi()
	config.DataAwal()

	app := fiber.New(fiber.Config{
		AppName: konf.NamaAplikasi,
	})

	router.Setup(app)

	log.Printf("Server berjalan di port %s", konf.Port)
	log.Fatal(app.Listen(":" + konf.Port))
}