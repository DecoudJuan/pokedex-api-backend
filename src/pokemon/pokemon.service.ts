import { Injectable } from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { AbilityDto } from './dto/ability.dto';
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

  async getAllPokemonsWithTrainer(): Promise<PokemonDto[]> {
    const pokemons = await this.pokemonRepository.findAllWithTrainer();
    return pokemons.map((pokemon) => plainToInstance(PokemonDto, pokemon));
  }

  async getPokemonById(id: string): Promise<PokemonDto> {
    const pokemon = await this.pokemonRepository.findById(id);
    return plainToInstance(PokemonDto, pokemon);
  }

  async updatePokemon(id: string, data: UpdatePokemonDto): Promise<PokemonDto> {
    const pokemon = await this.pokemonRepository.update(id, data);
    return plainToInstance(PokemonDto, pokemon);
  }

  async getPokemonAbilities(id: string): Promise<AbilityDto[]> {
    // Mock implementation 
    return [
      { id: '1', name: 'Thunderbolt', description: 'Electric attack', power: 90 },
      { id: '2', name: 'Quick Attack', description: 'Fast attack', power: 40 }
    ];
  }

  async getAllAbilities(): Promise<AbilityDto[]> {
    // Mock implementation 
    return [
      { id: '1', name: 'Thunderbolt', description: 'Electric attack', power: 90 },
      { id: '2', name: 'Quick Attack', description: 'Fast attack', power: 40 },
      { id: '3', name: 'Fire Blast', description: 'Fire attack', power: 110 }
    ];
  }
}
