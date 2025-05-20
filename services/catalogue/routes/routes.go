package routes

import (
	"catalogue/controllers"
	"catalogue/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/products")

	// Routes publiques
	api.Get("/", controllers.GetProducts)
	api.Get("/:id", controllers.GetProduct)

	// Routes protégées par JWT et contrôle admin sur /admin
	api.Post("/", middlewares.JwtProtected(), controllers.CreateProduct)
	api.Put("/:id", middlewares.JwtProtected(), controllers.UpdateProduct)
	api.Delete("/:id", middlewares.JwtProtected(), controllers.DeleteProduct)

	// Exemple route admin (si tu en crées)
	// admin := app.Group("/admin", middlewares.JwtProtected())
	// admin.Get("/dashboard", controllers.AdminDashboard)
}
