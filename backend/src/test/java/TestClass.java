import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import org.jcap.messages.MessageTypes;
import org.jcap.messages.SimpleMessage;
import org.junit.Test;

import java.util.HashMap;

public class TestClass {
    @Test
    public void wew() {
        Gson gson = new Gson();
        String wew = "{\"messageType\":\"JOINGAME\",\"content\":{\"guestName\":\"Joshua\",\"gameCode\":\"VLV859\"}}";
        SimpleMessage simpleMessage = gson.fromJson(wew, SimpleMessage.class);
        System.out.println(((LinkedTreeMap)simpleMessage.getContent()).get("guestName"));
        System.out.println(simpleMessage.getContent().getClass().getName());

    }
}
