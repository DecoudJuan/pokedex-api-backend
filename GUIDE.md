# 🚀 Guía Completa de Tecnologías - Pokemon API

## 📚 Índice
1. [NestJS Framework](#nestjs-framework)
2. [Prisma ORM](#prisma-orm)
3. [PostgreSQL Database](#postgresql-database)
4. [Docker & Docker Compose](#docker--docker-compose)
5. [TypeScript](#typescript)
6. [API REST](#api-rest)
7. [Testing](#testing)
8. [Desarrollo y Debugging](#desarrollo-y-debugging)

---

## 🏗️ NestJS Framework

### ¿Qué es NestJS?
NestJS es un framework de Node.js para construir aplicaciones escalables y eficientes del lado del servidor. Utiliza TypeScript y está inspirado en Angular.

### Conceptos Clave

#### 1. **Decorators (Decoradores)**
```typescript
@Controller('pokemons')           // Define una ruta base
@Get()                            // Método HTTP GET
@Post()                           // Método HTTP POST
@Body()                           // Extrae datos del body
@Param('id')                      // Extrae parámetros de URL
```

#### 2. **Modules (Módulos)**
```typescript
@Module({
  imports: [PrismaModule],        // Importa otros módulos
  controllers: [PokemonController], // Controladores del módulo
  providers: [PokemonService],     // Servicios del módulo
})
export class PokemonModule {}
```

#### 3. **Controllers (Controladores)**
```typescript
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemons(): Promise<PokemonDto[]> {
    return this.pokemonService.getAllPokemons();
  }
}
```

#### 4. **Services (Servicios)**
```typescript
@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getAllPokemons(): Promise<PokemonDto[]> {
    return this.pokemonRepository.findAll();
  }
}
```

### Estructura de Archivos NestJS
```
src/
├── app.controller.ts      # Controlador principal
├── app.service.ts         # Servicio principal
├── app.module.ts          # Módulo raíz
├── main.ts               # Punto de entrada
└── pokemon/              # Módulo Pokemon
    ├── pokemon.controller.ts
    ├── pokemon.service.ts
    ├── pokemon.module.ts
    └── dto/              # Data Transfer Objects
```

---

## 🗄️ Prisma ORM

### ¿Qué es Prisma?
Prisma es un ORM (Object-Relational Mapping) moderno para Node.js y TypeScript que simplifica el acceso a bases de datos.

### Conceptos Clave

#### 1. **Schema (Esquema)**
```prisma
// prisma/schema.prisma
model Pokemon {
  id        String   @id @default(uuid())
  name      String
  type      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  trainerId String?
  
  trainer   PokemonTrainer? @relation(fields: [trainerId], references: [id])
}
```

#### 2. **Comandos Principales**
```bash
# Generar cliente Prisma
npx prisma generate

# Crear y aplicar migraciones
npx prisma migrate dev

# Ver base de datos en navegador
npx prisma studio

# Resetear base de datos
npx prisma migrate reset
```

#### 3. **Uso en Código**
```typescript
// En un servicio
async getAllPokemons() {
  return this.prisma.pokemon.findMany({
    include: {
      trainer: true
    }
  });
}

async createPokemon(data: CreatePokemonDto) {
  return this.prisma.pokemon.create({
    data: {
      name: data.name,
      type: data.type,
      trainerId: data.trainerId
    }
  });
}
```

---

## 🐘 PostgreSQL Database

### ¿Qué es PostgreSQL?
PostgreSQL es una base de datos relacional de código abierto, robusta y escalable.

### Conceptos Clave

#### 1. **Tipos de Datos**
```sql
-- Texto
VARCHAR(255)    -- Texto de longitud variable
TEXT           -- Texto sin límite

-- Números
INTEGER        -- Número entero
DECIMAL(10,2)  -- Número decimal

-- Fechas
TIMESTAMP      -- Fecha y hora
DATE           -- Solo fecha

-- Otros
UUID           -- Identificador único universal
BOOLEAN        -- Verdadero/Falso
```

#### 2. **Comandos Básicos**
```sql
-- Crear tabla
CREATE TABLE pokemon (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar datos
INSERT INTO pokemon (name, type) VALUES ('Pikachu', 'Electric');

-- Consultar datos
SELECT * FROM pokemon WHERE type = 'Electric';

-- Actualizar datos
UPDATE pokemon SET type = 'Fire' WHERE name = 'Charmander';

-- Eliminar datos
DELETE FROM pokemon WHERE id = 'uuid-here';
```

#### 3. **Relaciones**
```sql
-- Clave foránea
ALTER TABLE pokemon 
ADD COLUMN trainer_id UUID REFERENCES pokemon_trainer(id);

-- JOIN
SELECT p.name, t.name as trainer_name 
FROM pokemon p 
JOIN pokemon_trainer t ON p.trainer_id = t.id;
```

---

## 🐳 Docker & Docker Compose

### ¿Qué es Docker?
Docker es una plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.

### Conceptos Clave

#### 1. **Contenedores**
```bash
# Ver contenedores ejecutándose
docker ps

# Ver todos los contenedores
docker ps -a

# Ver logs de un contenedor
docker logs <container-name>

# Ejecutar comando en contenedor
docker exec -it <container-name> bash
```

#### 2. **Docker Compose**
```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: pokemon
    ports:
      - 5433:5432  # host:container
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### 3. **Comandos Docker Compose**
```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs db

# Reconstruir servicios
docker-compose up --build
```

---

## 📝 TypeScript

### ¿Qué es TypeScript?
TypeScript es un superset de JavaScript que añade tipado estático y características orientadas a objetos.

### Conceptos Clave

#### 1. **Tipos Básicos**
```typescript
// Tipos primitivos
let name: string = "Pikachu";
let level: number = 25;
let isActive: boolean = true;

// Arrays
let types: string[] = ["Electric", "Flying"];
let levels: Array<number> = [1, 2, 3, 4];

// Objetos
interface Pokemon {
  id: string;
  name: string;
  type: string;
  level?: number; // Opcional
}

// Tipos de unión
type PokemonType = "Fire" | "Water" | "Electric" | "Grass";
```

#### 2. **Interfaces y Types**
```typescript
// Interface
interface CreatePokemonDto {
  name: string;
  type: string;
  trainerId?: string;
}

// Type
type PokemonResponse = {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
};

// Generic types
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

#### 3. **Funciones**
```typescript
// Función con tipos
function createPokemon(data: CreatePokemonDto): Promise<Pokemon> {
  return pokemonService.create(data);
}

// Arrow function
const getPokemonById = async (id: string): Promise<Pokemon | null> => {
  return pokemonService.findById(id);
};

// Función genérica
function findById<T>(id: string, repository: Repository<T>): Promise<T | null> {
  return repository.findById(id);
}
```

---

## 🌐 API REST

### ¿Qué es REST?
REST (Representational State Transfer) es un estilo de arquitectura para sistemas distribuidos.

### Conceptos Clave

#### 1. **Métodos HTTP**
```typescript
// GET - Obtener datos
@Get('/pokemons')
async getAllPokemons() { }

@Get('/pokemons/:id')
async getPokemonById(@Param('id') id: string) { }

// POST - Crear datos
@Post('/pokemons')
async createPokemon(@Body() data: CreatePokemonDto) { }

// PUT - Actualizar datos completos
@Put('/pokemons/:id')
async updatePokemon(@Param('id') id: string, @Body() data: UpdatePokemonDto) { }

// PATCH - Actualizar datos parciales
@Patch('/pokemons/:id')
async partialUpdatePokemon(@Param('id') id: string, @Body() data: Partial<UpdatePokemonDto>) { }

// DELETE - Eliminar datos
@Delete('/pokemons/:id')
async deletePokemon(@Param('id') id: string) { }
```

#### 2. **Códigos de Estado HTTP**
```typescript
// 2xx - Éxito
200 OK              // Solicitud exitosa
201 Created         // Recurso creado
204 No Content      // Sin contenido

// 4xx - Error del cliente
400 Bad Request     // Solicitud malformada
401 Unauthorized    // No autenticado
403 Forbidden       // No autorizado
404 Not Found       // Recurso no encontrado
422 Unprocessable Entity // Datos inválidos

// 5xx - Error del servidor
500 Internal Server Error // Error interno
```

#### 3. **Validación de Datos**
```typescript
import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  trainerId?: string;
}
```

---

## 🧪 Testing

### Tipos de Testing

#### 1. **Unit Tests**
```typescript
// pokemon.service.spec.ts
describe('PokemonService', () => {
  let service: PokemonService;
  let repository: PokemonRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: PokemonRepository,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<PokemonRepository>(PokemonRepository);
  });

  it('should return all pokemons', async () => {
    const mockPokemons = [{ id: '1', name: 'Pikachu', type: 'Electric' }];
    jest.spyOn(repository, 'findAll').mockResolvedValue(mockPokemons);

    const result = await service.getAllPokemons();
    expect(result).toEqual(mockPokemons);
  });
});
```

#### 2. **E2E Tests**
```typescript
// app.e2e-spec.ts
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```

#### 3. **Comandos de Testing**
```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:cov

# Ejecutar tests e2e
npm run test:e2e
```

---

## 🔧 Desarrollo y Debugging

### Comandos de Desarrollo
```bash
# Desarrollo con hot reload
npm run start:dev

# Producción
npm run start:prod

# Debug
npm run start:debug

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

### Debugging
```typescript
// Logs
console.log('Debug info:', data);

// NestJS Logger
import { Logger } from '@nestjs/common';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);

  async getAllPokemons() {
    this.logger.log('Getting all pokemons');
    // ...
  }
}
```

### Variables de Entorno
```bash
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/pokemon"
PORT=3000
NODE_ENV=development
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Cursos y Tutoriales
- [NestJS Crash Course](https://www.youtube.com/watch?v=3JminDpCJNE)
- [Prisma Tutorial](https://www.prisma.io/docs/getting-started)
- [Docker Tutorial](https://docs.docker.com/get-started/)

### Herramientas Útiles
- **Postman/Insomnia**: Para probar APIs
- **Prisma Studio**: GUI para la base de datos
- **Docker Desktop**: Para gestionar contenedores
- **VS Code Extensions**: NestJS, Prisma, Docker

---

## 🎯 Próximos Pasos

1. **Explora el código existente** en `src/pokemon/`
2. **Prueba los endpoints** con Postman o curl
3. **Añade nuevas funcionalidades** como autenticación
4. **Implementa tests** para tu código
5. **Optimiza la base de datos** con índices
6. **Añade documentación** con Swagger
7. **Configura CI/CD** para deployment

¡Ahora tienes una base sólida para desarrollar aplicaciones con estas tecnologías! 🚀
