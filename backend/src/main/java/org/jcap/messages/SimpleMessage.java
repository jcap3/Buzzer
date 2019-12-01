package org.jcap.messages;

public class SimpleMessage {
    private MessageTypes messageType;
    private Object content;

    public SimpleMessage(MessageTypes messageType, Object content) {
        this.messageType = messageType;
        this.content = content;
    }

    public SimpleMessage() {
    }

    public MessageTypes getMessageType() {
        return messageType;
    }

    public Object getContent() {
        return content;
    }
}
