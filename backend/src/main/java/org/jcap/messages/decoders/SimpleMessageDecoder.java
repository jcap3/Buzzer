package org.jcap.messages.decoders;

import com.google.gson.Gson;
import org.jcap.messages.SimpleMessage;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class SimpleMessageDecoder implements Decoder.Text<SimpleMessage> {
    private Gson gson = new Gson();

    @Override
    public SimpleMessage decode(String s) throws DecodeException {
        return gson.fromJson(s, SimpleMessage.class);
    }

    @Override
    public boolean willDecode(String s) {
        return true;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {

    }

    @Override
    public void destroy() {

    }
}
