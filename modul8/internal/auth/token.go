package auth

import (
	"errors"
	"strconv"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var (
	daftarHitam = make(map[string]time.Time)
	mu          sync.RWMutex
)

type Klaim struct {
	Peran string `json:"peran"`
	jwt.RegisteredClaims
}

func TerbitkanToken(idPengguna uint, peran string, rahasia string, ttlMenit int) (string, error) {
	sekarang := time.Now()
	klaim := Klaim{
		Peran: peran,
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   strconv.FormatUint(uint64(idPengguna), 10),
			IssuedAt:  jwt.NewNumericDate(sekarang),
			ExpiresAt: jwt.NewNumericDate(sekarang.Add(time.Duration(ttlMenit) * time.Minute)),
			Issuer:    "pemweb2-fiber-api",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, klaim)
	return token.SignedString([]byte(rahasia))
}

func CabutToken(nilaiToken string, kedaluwarsa time.Time) {
	mu.Lock()
	defer mu.Unlock()
	daftarHitam[nilaiToken] = kedaluwarsa
}

func ApakahDicabut(nilaiToken string) bool {
	mu.RLock()
	defer mu.RUnlock()
	_, ada := daftarHitam[nilaiToken]
	return ada
}

func PeriksaToken(nilaiToken string, rahasia string) (*Klaim, error) {
	if ApakahDicabut(nilaiToken) {
		return nil, errors.New("token telah dicabut")
	}

	token, err := jwt.ParseWithClaims(nilaiToken, &Klaim{}, func(t *jwt.Token) (any, error) {
		if _, cocok := t.Method.(*jwt.SigningMethodHMAC); !cocok {
			return nil, errors.New("metode penandatanganan tidak didukung")
		}
		return []byte(rahasia), nil
	})
	if err != nil {
		return nil, err
	}

	klaim, cocok := token.Claims.(*Klaim)
	if !cocok || !token.Valid {
		return nil, errors.New("token tidak valid")
	}

	return klaim, nil
}