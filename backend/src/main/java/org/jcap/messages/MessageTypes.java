package org.jcap.messages;

public enum MessageTypes {
    HOSTGAME (new HostGameMessage()), JOINGAME(new JoinGameMessage());

    private Message msgTypeEquivalent;
    public Message getMsgTypeEquivalent() {
        return this.msgTypeEquivalent;
    }

    MessageTypes (Message msgTypeEquivalent) {
        this.msgTypeEquivalent = msgTypeEquivalent;
    }
}
