package middlewares

import (
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func JwtProtected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Token is missing"})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Malformed token"})
		}

		tokenString := parts[1]
		secret := os.Getenv("JWT_SECRET")

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"message": "Invalid or expired token"})
		}

		// Récupérer claims et les caster en MapClaims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"message": "Invalid token claims"})
		}

		// Injecter l'utilisateur dans le contexte Fiber
		c.Locals("user", claims)

		// Contrôle role admin si URL contient /admin
		if strings.Contains(c.OriginalURL(), "/admin") {
			role, ok := claims["role"].(string)
			if !ok || role != "admin" {
				return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"message": "Forbidden: You do not have admin rights"})
			}
		}

		return c.Next()
	}
}
