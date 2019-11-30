package org.jcap.messages;

import javax.websocket.Session;

public class JoinGameMessage implements Message {
    private  String identifier = "joingame";

    @Override
    public String processMessage(Session session) {
        return null;
    }

    @Override
    public String getMsgTypeIdentifier() {
        return this.identifier;
    }
}
