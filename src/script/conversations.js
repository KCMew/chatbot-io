import { saveConversation, loadConversation, clearConversation } from './localstorage.js';
import { home } from '../component/chat.js';
import { bots } from '../models/bots.js';
import { displayMessage, scrollToBottom } from '../models/message.js';
import '../style.css';
import { PokemonService } from '../../services/pokemonService.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = home();

    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messageList = document.getElementById('message-list');
    const botList = document.getElementById('bot-list');
    const clearBotConversation = document.getElementById('clear-conversation-icon');

    let selectedBot = null;
    const conversations = {
        PokéBot: loadConversation('PokéBot'),
        JokeBot: loadConversation('JokeBot'),
        MeowBot: loadConversation('MeowBot'),
    };

    // Charge et affiche l'UI de la conversation pour le bot sélectionné
    function loadConversationUI(bot) {
        messageList.innerHTML = '';
        conversations[bot].forEach(msg => {
            displayMessage(msg.text, msg.type, msg.name, msg.avatar, msg.time);
        });
        scrollToBottom(messageList);
    }

    // Gère l'envoi de messages par l'utilisateur
    function handleSendMessage() {
        const message = messageInput.value.trim();
        if (!message || !selectedBot) return;
    
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sentMessage = { text: message, type: 'sent', name: 'Vous', avatar: '/images/neon.png', time };
        conversations[selectedBot].push(sentMessage);
        displayMessage(message, 'sent', 'Vous', '/images/neon.png', time);
        messageInput.value = '';
        scrollToBottom(messageList);
        saveConversation(selectedBot, conversations[selectedBot]);
        handleBotResponses(message);
    }    

    // Gère les réponses des bots en fonction du message utilisateur
    function handleBotResponses(message) {
        const bot = bots.find(b => b.name === selectedBot);
        if (!bot) return;
    
        bot.actions.forEach(action => {
            if (action.trigger(message)) {
                const matchPokemon = message.match(/^pokemon\s+(\d+)$/i);
                const matchBerry = message.match(/^berry\s+(\d+)$/i);
                const matchMove = message.match(/^move\s+(\d+)$/i);
    
                if (matchPokemon) {
                    const id = matchPokemon[1];
                    PokemonService.fetchPokemonData(id).then(responseMessage => {
                        handleBotResponse(action, responseMessage);
                    });
                } else if (matchBerry) {
                    const id = matchBerry[1];
                    PokemonService.fetchBerryData(id).then(responseMessage => {
                        handleBotResponse(action, responseMessage);
                    });
                } else if (matchMove) {
                    const id = matchMove[1];
                    PokemonService.fetchMoveData(id).then(responseMessage => {
                        handleBotResponse(action, responseMessage);
                    });
                } else {
                    action.response().then(responseMessage => {
                        handleBotResponse(action, responseMessage);
                    });
                }
            }
        });
    }
    
    // Affiche la réponse du bot et met à jour la conversation
    function handleBotResponse(action, responseMessage) {
        const bot = bots.find(b => b.name === selectedBot);
        if (!bot) return;
    
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const receivedMessage = { text: responseMessage, type: 'received', name: bot.name, avatar: bot.avatar, time };
        conversations[selectedBot].push(receivedMessage);
        displayMessage(responseMessage, 'received', bot.name, bot.avatar, time);
        scrollToBottom(messageList);
    
        saveConversation(selectedBot, conversations[selectedBot]);
    }

    // Envoie le message d'aide au bot sélectionné
    function sendHelpMessage(bot) {
        const helpAction = bot.actions.find(action => action.trigger('help'));
        if (helpAction) {
            helpAction.response().then(responseMessage => {
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const receivedMessage = { text: responseMessage, type: 'received', name: bot.name, avatar: bot.avatar, time };
                conversations[bot.name].push(receivedMessage);
                displayMessage(responseMessage, 'received', bot.name, bot.avatar, time);
                scrollToBottom(messageList);
                
                saveConversation(bot.name, conversations[bot.name]);
            });
        }
    }

    sendButton.addEventListener('click', () => {
        handleSendMessage();
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Change de bot et charge la conversation associée
    botList.addEventListener('click', (e) => {
        const botItem = e.target.closest('.bot-item');
        if (botItem) {
            if (selectedBot) {
                document.querySelector(`[data-bot="${selectedBot}"]`).classList.remove('selected');
            }
            selectedBot = botItem.dataset.bot;
            botItem.classList.add('selected');
            loadConversationUI(selectedBot);
            const bot = bots.find(b => b.name === selectedBot);
            if (bot) {
                sendHelpMessage(bot);
            }
        }
    });

    // Efface la conversation actuelle du bot
    clearBotConversation.addEventListener('click', () => {
        if (selectedBot) {
            conversations[selectedBot] = [];
            clearConversation(selectedBot);
            loadConversationUI(selectedBot);
        }
    });

    selectedBot = Object.keys(conversations)[0];
    document.querySelector(`[data-bot="${selectedBot}"]`).classList.add('selected');
    loadConversationUI(selectedBot);
    const initialBot = bots.find(b => b.name === selectedBot);
    if (initialBot) {
        sendHelpMessage(initialBot);
    }
});

// Gère l'affichage de la liste des bots
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-bot-list');
    const botList = document.getElementById('bot-list');
    const chatContainer = document.querySelector('.chat-container');
    
    if (toggleButton && botList && chatContainer) {
        toggleButton.addEventListener('click', () => {
            const isHidden = botList.style.display === 'none';
            
            botList.style.display = isHidden ? 'flex' : 'none';
            chatContainer.style.flexGrow = isHidden ? '1' : '2';
            
            toggleButton.classList.toggle('rotate', !isHidden);
        });
    }
});
