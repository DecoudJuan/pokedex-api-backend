# Pokemon API

A RESTful API for managing Pokemon and Pokemon Trainers built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

## 🚀 Features

- **Pokemon Management**: Create, read, update, and delete Pokemon records
- **Trainer Management**: Manage Pokemon trainers with their associated Pokemon
- **Database Integration**: PostgreSQL database with Prisma ORM
- **Validation**: Request validation using class-validator and class-transformer
- **TypeScript**: Full TypeScript support with strict typing

## 🏗️ Tech Stack

- **Framework**: NestJS 11
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd pokemon-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the database
```bash
# Start PostgreSQL database using Docker
docker-compose up -d

# Run database migrations
npm run db:migrate:dev

# Generate Prisma client
npm run db:generate
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pokemon"
```

## 🚀 Development Commands

### Starting the Application
```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

### Database Commands
```bash
# Create and apply new migration
npm run db:migrate:dev

# Deploy migrations to production
npm run db:migrate:prod

# Generate Prisma client
npm run db:generate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Code Quality
```bash
# Lint and fix code
npm run lint

# Format code with Prettier
npm run format
```

### Testing
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

### Building
```bash
# Build the application
npm run build
```

## 🏗️ Project Structure

```
pokemon-api/
├── src/
│   ├── pokemon/                 # Pokemon module
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── pokemon.controller.ts
│   │   ├── pokemon.service.ts
│   │   ├── pokemon.repository.ts
│   │   └── pokemon.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   ├── main.ts
│   └── prisma.service.ts
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── test/                       # Test files
├── docker-compose.yml          # Database container
└── package.json
```

## 📊 Database Schema

### Pokemon Model
- `id`: Unique identifier (UUID)
- `name`: Pokemon name
- `type`: Pokemon type
- `trainerId`: Reference to trainer (optional)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### PokemonTrainer Model
- `id`: Unique identifier (UUID)
- `name`: Trainer name
- `email`: Unique email address
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `pokemons`: One-to-many relationship with Pokemon

## 🔧 Development Workflow

### Creating New Modules
```bash
# Generate a new module
nest generate module <module-name>

# Generate a new controller
nest generate controller <controller-name>

# Generate a new service
nest generate service <service-name>

# Generate a complete CRUD resource
nest generate resource <resource-name>
```

### Database Schema Changes
1. Modify `prisma/schema.prisma`
2. Create migration: `npm run db:migrate:dev`
3. Generate client: `npm run db:generate`

### Adding DTOs
Use class-validator decorators for validation:
```typescript
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  trainerId?: string;
}
```

## 🌐 API Endpoints

### Pokemon Endpoints
- `GET /pokemon` - Get all Pokemon
- `GET /pokemon/:id` - Get Pokemon by ID
- `POST /pokemon` - Create new Pokemon
- `PUT /pokemon/:id` - Update Pokemon
- `DELETE /pokemon/:id` - Delete Pokemon

### Trainer Endpoints
- `GET /trainer` - Get all trainers
- `GET /trainer/:id` - Get trainer by ID
- `POST /trainer` - Create new trainer
- `PUT /trainer/:id` - Update trainer
- `DELETE /trainer/:id` - Delete trainer

## 🐳 Docker

### Start the database
```bash
docker-compose up -d
```

### Stop the database
```bash
docker-compose down
```

### View database logs
```bash
docker-compose logs db
```

## 📝 Useful Commands Summary

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server |
| `npm run db:migrate:dev` | Create and apply migrations |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:studio` | Open database GUI |
| `npm run lint` | Lint and fix code |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `nest generate resource <name>` | Generate CRUD resource |


## 🆘 Troubleshooting

### Database Connection Issues
- Ensure Docker is running
- Check if PostgreSQL container is up: `docker-compose ps`
- Verify DATABASE_URL in `.env` file

### Prisma Issues
- Regenerate client: `npm run db:generate`
- Reset database: `npm run db:migrate:reset`
- Check schema: `npx prisma validate`

### NestJS Issues
- Clear dist folder: `rm -rf dist`
- Rebuild: `npm run build`
- Check logs: `npm run start:debug`
