package org.jcap.messages.encoders;

import com.google.gson.Gson;
import org.jcap.messages.SimpleMessage;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class SimpleMessageEncoder implements Encoder.Text<SimpleMessage>  {
    private Gson gson = new Gson();

    @Override
    public String encode(SimpleMessage simpleMessage) throws EncodeException {
        return gson.toJson(simpleMessage);
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
