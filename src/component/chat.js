import { bots } from '../models/bots.js';

const renderBotList = () => {
  return `
    <div class="bot-list" id="bot-list">
      ${bots.map(bot => `
        <div class="bot-item" data-bot="${bot.name}">
          <img src="${bot.avatar}" alt="${bot.name}" class="bot-avatar"/>
          <span class="bot-name">${bot.name}</span>
        </div>
      `).join('')}
    </div>
  `;
};

const renderChatContainer = () => {
  return `
    <div class="chat-container">
      <div class="chat-header">
        <img src="/images/menu.png" id="toggle-bot-list" class="toggle-icon" alt="Toggle Bots" title="Afficher/Cacher les bots"/>
        Chatbot JS
        <img src="/images/trash.png" id="clear-conversation-icon" class="trash-icon" alt="Clear Conversation" title="Effacer la conversation actuelle"/>
      </div>
      ${renderBotList()}
      <div id="message-list" class="message-list"></div>
      <div class="message-input-container">
        <input type="text" id="message-input" placeholder="Tapez votre message...">
        <button id="send-button">Envoyer</button>
      </div>
    </div>
  `;
};

export const home = () => {
  return `
    <div class="app-container">
      <div class="border-element"></div>
      ${renderChatContainer()}
      <div class="border-element"></div>
    </div>
  `;
};
