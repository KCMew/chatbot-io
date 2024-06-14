import { CatService } from '../../services/catService.js';
import { PokemonService } from '../../services/pokemonService.js';
import { JokeService } from '../../services/jokeService.js';

// Classe pour les bots
class Bot {
    constructor(name, avatar, actions) {
        this.name = name;
        this.avatar = avatar;
        this.actions = actions;
    }
}

// Classe pour le bot PokéBot et utiliser les réponses API du service
class PokéBot extends Bot {
    constructor() {
        super('PokéBot', '/images/pikachu.png', [
            {
                trigger: (message) => message.toLowerCase().includes('help'),
                response: async () => `Pika-commandes disponibles: help, pokemon [id] (1 jusqu'à 1025), berry [id] (1 jusqu'à 64), move [id] (1 jusqu'à 826) (exemple : pokemon 1)`
            },
            {
                trigger: (message) => /^pokemon\s+(\d+)$/i.test(message),
                response: async (message) => {
                    const id = message.match(/^pokemon\s+(\d+)$/i)[1];
                    return PokemonService.fetchPokemonData(id);
                }
            },
            {
                trigger: (message) => /^berry\s+(\d+)$/i.test(message),
                response: async (message) => {
                    const id = message.match(/^berry\s+(\d+)$/i)[1];
                    return PokemonService.fetchBerryData(id);
                }
            },
            {
                trigger: (message) => /^move\s+(\d+)$/i.test(message),
                response: async (message) => {
                    const id = message.match(/^move\s+(\d+)$/i)[1];
                    return PokemonService.fetchMoveData(id);
                }
            }
        ]);
    }
}

// Classe pour le bot MeowBot et utiliser les réponses API du service
class MeowBot extends Bot {
    constructor() {
        super('MeowBot', '/images/miaouss.png', [
            {
                trigger: (message) => message.toLowerCase().includes('help'),
                response: async function() {
                    return `Chalut, voici mes commandes: help, cat fact, all breeds, facts`;
                }
            },
            {
                trigger: (message) => message.toLowerCase().includes('cat fact'),
                response: async () => CatService.fetchCatFact()
            },
            {
                trigger: (message) => message.toLowerCase().includes('all breeds'),
                response: async () => CatService.fetchCatBreeds()
            },
            {
                trigger: (message) => message.toLowerCase().includes('facts'),
                response: async () => CatService.fetchCatFacts()
            }
        ]);
    }
}

// Classe pour le bot JokeBot et utiliser les réponses API du service
class JokeBot extends Bot {
    constructor() {
        super('JokeBot', '/images/clown.png', [
            {
                trigger: (message) => message.toLowerCase().includes('help'),
                response: async function() {
                    return `Commandes disponibles pour un max de rire: help, random joke, programming joke, miscellaneous joke`;
                }
            },
            {
                trigger: (message) => message.toLowerCase().includes('random joke'),
                response: async () => JokeService.fetchJoke()
            },
            {
                trigger: (message) => message.toLowerCase().includes('programming joke'),
                response: async () => JokeService.fetchProgrammingJoke()
            },
            {
                trigger: (message) => message.toLowerCase().includes('miscellaneous joke'),
                response: async () => JokeService.fetchMiscellaneousJoke()
            }
        ]);
    }
}

const bots = [new PokéBot(), new MeowBot(), new JokeBot()];

export { bots };
