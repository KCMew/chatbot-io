// Fonction pour sauvegarder une conversation dans le localstorage
export function saveConversation(botName, conversation) {
    localStorage.setItem(`conversation_${botName}`, JSON.stringify(conversation));
}

// Fonction pour charger une conversation dans le localstorage
export function loadConversation(botName) {
    const data = localStorage.getItem(`conversation_${botName}`);
    return data ? JSON.parse(data) : [];
}

// Fonction pour effacer une conversation du localstorage
export function clearConversation(botName) {
    localStorage.removeItem(`conversation_${botName}`);
}
