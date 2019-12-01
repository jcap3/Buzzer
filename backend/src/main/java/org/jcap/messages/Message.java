package org.jcap.messages;

import javax.websocket.Session;

public interface Message {
    String processMessage(Session session, SimpleMessage simpleMessage);
    String getMsgTypeIdentifier();
}
