import com.google.gson.JsonObject;
import org.junit.Test;

import java.util.HashMap;

public class TestClass {
    @Test
    public void wew() {
        JsonObject test = new JsonObject();
        test.addProperty("data", "ABC123");
        System.out.println(test.toString());

    }
}
