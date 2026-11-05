package config

import (
	"log"

	"latihan-fiber-api/internal/model"
)

func Migrasi() {
	err := DB.AutoMigrate(&model.ProgramStudi{}, &model.Mahasiswa{})
	if err != nil {
		log.Fatal("Gagal menjalankan migrasi: ", err)
	}
	log.Println("Migrasi selesai")
}

func DataAwal() {
	var jumlah int64
	DB.Model(&model.ProgramStudi{}).Count(&jumlah)
	if jumlah == 0 {
		prodi := []model.ProgramStudi{
			{Nama: "Teknik Informatika", Kode: "IF"},
			{Nama: "Sistem Informasi", Kode: "SI"},
			{Nama: "Teknologi Informasi", Kode: "TI"},
		}
		DB.Create(&prodi)
		log.Println("Data awal program studi dibuat")
	}
}
