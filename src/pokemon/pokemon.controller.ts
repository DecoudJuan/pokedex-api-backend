import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { PokemonDto } from './dto/pokemon.dto';
import { AbilityDto } from './dto/ability.dto';


@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemons(): Promise<PokemonDto[]> {
    return this.pokemonService.getAllPokemons();
  }

  @Post()
  async createPokemon(@Body() data: CreatePokemonDto): Promise<PokemonDto> {
    return this.pokemonService.createPokemon(data);
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: string): Promise<PokemonDto> {
    return this.pokemonService.getPokemonById(id);
  }

  @Get(':id/abilities')
  async getPokemonAbilities(@Param('id') id: string): Promise<AbilityDto[]> {
    return this.pokemonService.getPokemonAbilities(id);
  }

  @Get('abilities')
  async getAllAbilities(): Promise<AbilityDto[]> {
    return this.pokemonService.getAllAbilities();
  }
}
