export class CatService {

    // Récupère un fait sur les chats
    static async fetchCatFact() {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            if (!response.ok) {
                throw new Error('Erreur de réponse');
            }
            const data = await response.json();
            return `Cat Fact: ${data.fact}`;
        } catch (error) {
            return 'Erreur: Impossible de récupérer un fait sur les chats. Veuillez réessayer plus tard.';
        }
    }

    // Récupère la liste des races de chat
    static async fetchCatBreeds() {
        try {
            const response = await fetch('https://catfact.ninja/breeds');
            if (!response.ok) {
                throw new Error('Erreur de réponse');
            }
            const data = await response.json();
            return `Breeds: ${data.data.map(breed => breed.breed).join(', ')}`;
        } catch (error) {
            return 'Erreur: Impossible de récupérer la liste des races. Veuillez réessayer plus tard.';
        }
    }

    // Récupère des faits sur les chats
    static async fetchCatFacts() {
        try {
            const response = await fetch('https://catfact.ninja/facts');
            if (!response.ok) {
                throw new Error('Erreur de réponse');
            }
            const data = await response.json();
            return `Cat Facts: ${data.data.map(fact => fact.fact).join(', ')}`;
        } catch (error) {
            return 'Erreur: Impossible de récupérer des faits sur les chats. Veuillez réessayer plus tard.';
        }
    }
}
