package org.jcap.messages.encoders;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class StringMessageEncoder implements Encoder.Text<String> {
    @Override
    public String encode(String s) throws EncodeException {
        return s;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
