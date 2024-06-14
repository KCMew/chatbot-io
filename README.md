**Bot Application**

Cette application de bots utilise une architecture modulaire pour gérer différents types de bots en JavaScript. Chaque bot peut répondre à divers messages en fonction de commandes spécifiques. Le projet utilise les classes pour définir des bots et les services API pour interagir avec des sources de données externes.

**Prérequis**
Node.js 
npm

**Installation**

Clonez le dépôt :
git clone https://github.com/KCMew/chatbot-io.git

cd chatbot-io

Installez les dépendances :
npm install

Lancement de l'application : 
npm run dev

**Commandes Disponibles**

Les bots répondent aux messages en fonction des actions définies dans leur fichier respectif. Chaque bot a des commandes spécifiques.

PokéBot
help: Liste les commandes disponibles
pokemon [id]: Fournit des informations sur un Pokémon spécifique
berry [id]: Fournit des informations sur une baie spécifique
move [id]: Fournit des informations sur un mouvement spécifique

MeowBot
help: Liste les commandes disponibles
one fact: Donne un fait sur les chats
all breeds: Liste les races de chats
facts: Donne plusieurs faits sur les chats

JokeBot
help: Liste les commandes disponibles
random joke: Donne une blague aléatoire
programming joke: Donne une blague sur la programmation
miscellaneous joke: Donne une blague diverse

**API utilisées**

PokeAPI : https://pokeapi.co/
CatFact : https://catfact.ninja/
JokeBot : https://v2.jokeapi.dev/