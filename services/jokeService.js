export class JokeService {
    // Récupère une blague au hasard
    static async fetchJoke() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
            const data = await response.json();
            return data.joke || 'Pas de blague trouvée.';
        } catch (error) {
            return 'Erreur lors de la récupération de la blague.';
        }
    }

    // Récupère une blague de programmation
    static async fetchProgrammingJoke() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
            const data = await response.json();
            return data.joke || 'Pas de blague de programmation trouvée.';
        } catch (error) {
            return 'Erreur lors de la récupération de la blague de programmation.';
        }
    }

    // Récupère une blague diverse
    static async fetchMiscellaneousJoke() {
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Miscellaneous?type=single');
            const data = await response.json();
            return data.joke || 'Pas de blague diverse trouvée.';
        } catch (error) {
            return 'Erreur lors de la récupération de la blague divers.';
        }
    }
}
