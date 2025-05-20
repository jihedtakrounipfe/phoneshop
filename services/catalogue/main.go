package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"catalogue/routes"
	"catalogue/database"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.Connect()

	app := fiber.New()

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	log.Fatal(app.Listen(":" + port))
}
