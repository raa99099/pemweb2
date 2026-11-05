package model

type ProgramStudi struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Nama string `gorm:"type:varchar(100);not null" json:"nama"`
	Kode string `gorm:"type:varchar(10);not null" json:"kode"`
}

type Mahasiswa struct {
	ID             uint         `gorm:"primaryKey" json:"id"`
	NIM            string       `gorm:"type:varchar(20);unique;not null" json:"nim"`
	Nama           string       `gorm:"type:varchar(100);not null" json:"nama"`
	ProgramStudiID uint         `json:"program_studi_id"`
	ProgramStudi   ProgramStudi `gorm:"foreignKey:ProgramStudiID" json:"program_studi,omitempty"`
}
