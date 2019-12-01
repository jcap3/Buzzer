package org.jcap;

import org.jcap.endpoints.FrontEndBuzzerQueueEndpoint;

import javax.websocket.Session;

public class Client {
    private Session session;
    private ClientTypes clientType;

    public Client(Session session, ClientTypes clientType) {
        this.session = session;
        this.clientType = clientType;
    }

    public Client(Session session) {
        this.session = session;
        this.clientType = null;
    }

    public Session getSession() {
        return session;
    }

    public ClientTypes getClientType() {
        return clientType;
    }

    public void setClientType(ClientTypes clientType) {
        this.clientType = clientType;
    }

    public Integer getSessionId () {
        return FrontEndBuzzerQueueEndpoint.HexToInt(this.session.getId());
    }

}
