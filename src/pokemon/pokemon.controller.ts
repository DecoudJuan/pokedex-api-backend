import { Body, Controller, Get, Post, Param, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonDto } from './dto/pokemon.dto';


@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemons(): Promise<PokemonDto[]> {
    return this.pokemonService.getAllPokemons();
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonDto> {
    return this.pokemonService.getPokemonById(id);
  }

  @Post()
  async createPokemon(@Body() data: CreatePokemonDto): Promise<PokemonDto> {
    return this.pokemonService.createPokemon(data);
  }

  @Delete(':id')
  async deletePokemon(@Param('id') id: string): Promise<{ message: string }> {
    await this.pokemonService.deletePokemon(id);
    return { message: 'Pokémon eliminado' };
  }

  @Put(':id')
  async updatePokemon(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdatePokemonDto,
  ): Promise<PokemonDto> {
    return this.pokemonService.updatePokemon(id, data);
  }

}
