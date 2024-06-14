export class PokemonService {
    // Récupère le nom d'un pokemon par son ID
    static async fetchPokemonData(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
                throw new Error('Erreur de réponse');
            }
            const data = await response.json();
            return `Pokemon ${id}: ${data.name}`;
        } catch (error) {
            console.error('Erreur lors de la récupération des données du Pokémon:', error);
            return 'Erreur: Impossible de récupérer les données du Pokémon dans mon pokédex. Ce pokémon n\'existe pas.';
        }
    }

    // Récupère le nom d'une baie par son ID
    static async fetchBerryData(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/berry/${id}`);
            if (!response.ok) {
                throw new Error('Erreur de réponse');
            }
            const data = await response.json();
            return `Berry ${id}: ${data.name}`;
        } catch (error) {
            return 'Erreur: Impossible de récupérer les données de la baie. Cette baie n\'existe pas.';
        }
    }

    // Récupère le nom d'un mouvement par son ID
    static async fetchMoveData(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`);
            if (!response.ok) {
                throw new Error('Erreur de réponse');
            }
            const data = await response.json();
            return `Move ${id}: ${data.name}`;
        } catch (error) {
            return 'Erreur: Impossible de récupérer les données du mouvement. Cette capacité n\'existe pas.';
        }
    }
}
