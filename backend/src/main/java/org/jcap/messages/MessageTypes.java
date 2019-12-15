package org.jcap.messages;

public enum MessageTypes {
    HOSTGAME (new HostGameMessage()), JOINGAME(new JoinGameMessage()), HOST_JOINGAME(null),
    HOST_START_GAME(new HostGameStartGameMessage()), BUZZ(new BuzzMessage()), HOST_RESET(new HostResetMessage()),
    HOST_START_BUZZER(new HostStartBuzzer());

    private Message msgTypeEquivalent;
    public Message getMsgTypeEquivalent() {
        return this.msgTypeEquivalent;
    }

    MessageTypes (Message msgTypeEquivalent) {
        this.msgTypeEquivalent = msgTypeEquivalent;
    }
}
