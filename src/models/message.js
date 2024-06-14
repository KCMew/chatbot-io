export class Message {
    constructor(tag, className, textContent = '', styles = {}) {
        this.element = document.createElement(tag);
        if (className) this.element.className = className;
        if (textContent) this.element.textContent = textContent;
        Object.assign(this.element.style, styles);
    }

    appendTo(parentElement) {
        if (parentElement instanceof Element) {
            parentElement.appendChild(this.element);
        }
    }

    static createMessageElement(tag, className, textContent = '', styles = {}) {
        const message = new Message(tag, className, textContent, styles);
        return message.element;
    }
}

export function displayMessage(
    text,
    type,
    name = 'Vous',
    avatar = '/images/neon.png',
    time = new Date().toLocaleTimeString()) {
    const messageList = document.getElementById('message-list');

    const messageElement = new Message('div', `message ${type}`);
    const avatarElement = new Message('div', 'avatar', name[0], {
        backgroundImage: avatar ? `url(${avatar})` : ''
    });
    const contentElement = new Message('div', 'content', text);
    const timeElement = new Message('div', 'time', `${name} à ${time}`);

    messageElement.appendTo(messageList);
    avatarElement.appendTo(messageElement.element);
    contentElement.appendTo(messageElement.element);
    timeElement.appendTo(messageElement.element);

    scrollToBottom(messageList);
}

export function scrollToBottom(element) {
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
}
