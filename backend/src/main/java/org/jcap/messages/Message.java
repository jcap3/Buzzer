package org.jcap.messages;

import org.jcap.Client;

import javax.websocket.Session;

public interface Message {
    String processMessage(Client client, SimpleMessage simpleMessage);
    String getMsgTypeIdentifier();
}
