import pygame
import sys
import random

pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
GRID_SIZE = 20
SNAKE_SIZE = 20
FPS = 10

# Colors
BROWN = (189, 154, 122)
DARK_PINK = (231, 84, 128)
DARK_GOLD = (238, 188, 29)
MOSS_GREEN = (74, 93, 35)

# Snake class
class Snake:
    def __init__(self):
        self.length = 1
        self.positions = [((WIDTH // 2), (HEIGHT // 2))]
        self.direction = random.choice([UP, DOWN, LEFT, RIGHT])
        self.color = MOSS_GREEN

    def get_head_position(self):
        return self.positions[0]

    def update(self):
        cur = self.get_head_position()
        x, y = self.direction
        new = (((cur[0] + (x * GRID_SIZE)) % WIDTH), (cur[1] + (y * GRID_SIZE)) % HEIGHT)
        if len(self.positions) > 2 and new in self.positions[2:]:
            self.reset()
        else:
            self.positions.insert(0, new)
            if len(self.positions) > self.length:
                self.positions.pop()

    def reset(self):
        self.length = 1
        self.positions = [((WIDTH // 2), (HEIGHT // 2))]
        self.direction = random.choice([UP, DOWN, LEFT, RIGHT])

    def render(self, surface):
        for p in self.positions:
            pygame.draw.rect(surface, self.color, (p[0], p[1], SNAKE_SIZE, SNAKE_SIZE))

# Food class
class Food:
    def __init__(self):
        self.position = (0, 0)
        self.color = DARK_GOLD
        self.randomize_position()

    def randomize_position(self):
        self.position = (random.randint(0, (WIDTH // GRID_SIZE) - 1) * GRID_SIZE,
                         random.randint(0, (HEIGHT // GRID_SIZE) - 1) * GRID_SIZE)

    def render(self, surface):
        pygame.draw.rect(surface, self.color, (self.position[0], self.position[1], SNAKE_SIZE, SNAKE_SIZE))

# Direction vectors
UP = (0, -1)
DOWN = (0, 1)
LEFT = (-1, 0)
RIGHT = (1, 0)

def draw_grid(surface):
    for x in range(0, WIDTH, GRID_SIZE):
        pygame.draw.line(surface, DARK_PINK, (x, 0), (x, HEIGHT))
    for y in range(0, HEIGHT, GRID_SIZE):
        pygame.draw.line(surface, DARK_PINK, (0, y), (WIDTH, y))

# Main function
def main():
    pygame.init()
    clock = pygame.time.Clock()
    screen = pygame.display.set_mode((WIDTH, HEIGHT), 0, 32)
    surface = pygame.Surface(screen.get_size())
    surface = surface.convert()

    # Load and resize the intro image
    intro_image = pygame.image.load('intro_image.jpeg')
    intro_image = pygame.transform.scale(intro_image, (WIDTH, HEIGHT))

    # Slide the intro image
    for i in range(WIDTH, -WIDTH, -1):
        screen.blit(intro_image, (i, 0))
        pygame.display.flip()
        pygame.time.wait(5)  # Adjust speed as needed

    # Wait for a few seconds
    pygame.time.wait(3000)

    snake = Snake()
    food = Food()

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    snake.direction = UP
                elif event.key == pygame.K_DOWN:
                    snake.direction = DOWN
                elif event.key == pygame.K_LEFT:
                    snake.direction = LEFT
                elif event.key == pygame.K_RIGHT:
                    snake.direction = RIGHT

        snake.update()

        # Check if snake has eaten the food
        if snake.get_head_position() == food.position:
            snake.length += 1
            food.randomize_position()

        # Draw everything
        surface.fill(BROWN)
        draw_grid(surface)
        snake.render(surface)
        food.render(surface)
        screen.blit(surface, (0, 0))
        pygame.display.update()

        clock.tick(FPS)

if __name__ == "__main__":
    main()
