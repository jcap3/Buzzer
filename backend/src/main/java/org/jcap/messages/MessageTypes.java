package org.jcap.messages;

public enum MessageTypes {
    HOSTGAME (new HostGameMessage()), JOINGAME(new JoinGameMessage()), HOST_JOINGAME(null);

    private Message msgTypeEquivalent;
    public Message getMsgTypeEquivalent() {
        return this.msgTypeEquivalent;
    }

    MessageTypes (Message msgTypeEquivalent) {
        this.msgTypeEquivalent = msgTypeEquivalent;
    }
}
