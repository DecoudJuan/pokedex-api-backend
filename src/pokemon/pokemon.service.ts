import { Injectable, NotFoundException } from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async getAllPokemons(): Promise<PokemonDto[]> {
    const pokemons = await this.pokemonRepository.findAll();
    return pokemons.map((pokemon) => plainToInstance(PokemonDto, pokemon));
  }

  async createPokemon(data: CreatePokemonDto): Promise<PokemonDto> {
    const pokemon = await this.pokemonRepository.create(data);
    return plainToInstance(PokemonDto, pokemon);
  }

  async deletePokemon(id: string): Promise<void> {
    const existing = await this.pokemonRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Pokémon no encontrado');
    }
    await this.pokemonRepository.deleteById(id);
  }


  async getAllPokemonsWithTrainer(): Promise<PokemonDto[]> {
    const pokemons = await this.pokemonRepository.findAllWithTrainer();
    return pokemons.map((pokemon) => plainToInstance(PokemonDto, pokemon));
  }

  async getPokemonById(id: string): Promise<PokemonDto> {
    const pokemon = await this.pokemonRepository.findById(id);
    return plainToInstance(PokemonDto, pokemon);
  }

}
