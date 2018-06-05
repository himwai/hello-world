

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.eclipsesource.v8.JavaCallback;
import com.eclipsesource.v8.NodeJS;
import com.eclipsesource.v8.V8;
import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Function;
import com.eclipsesource.v8.V8Object;

public class TestJ2V8 {
	
	private NodeJS nodeJS;
	private V8 runtime;
	
	@Before
	public void setup() {
		nodeJS = NodeJS.createNodeJS();
		runtime = V8.createV8Runtime();
	}
	
	
    @After
    public void tearDown() {
        nodeJS.release();
        runtime.release();
    }
    
    @Test
    public void testEngine() {
    	assertNotNull(runtime);
        assertNotNull(nodeJS);
    }
    
    @Test
    public void testV8Js() {
    	assertNotNull(runtime);
    	
    	V8Object person = new V8Object(runtime).add("name", "John");
    	V8Object player = runtime.getObject("player");
    	assertNotNull(player);
    	assertTrue(player.isUndefined());
    	
       	runtime.executeScript("var player = {};");
    	assertTrue(player.isUndefined());

       	player = runtime.getObject("player");
    	assertFalse(player.isUndefined());

       	System.out.println(person.get("name"));
    	System.out.println(player.isUndefined());
    	
       	runtime.add("player2", person);
       	
     	for (String key : runtime.getKeys()) {
    		System.out.println(key);
    	}
     	
     	V8Object player2 = runtime.getObject("player2");
       	System.out.println(player2.get("name"));
     	
    	
    	person.release();
    	player.release();
    	player2.release();
    	
   }

    
    @Test
    public void testV8NodeJs() {
    	assertNotNull(nodeJS.getRuntime());
    	V8 engine = nodeJS.getRuntime();
    	for (String key : engine.getKeys()) {
    		System.out.println(key);
    	}
    	
    	engine.executeScript("console.log(`javascript running and console log output is ok`);");
    	
    	V8Object process = engine.getObject("process");
    	V8Object versions = process.getObject("versions");

    	String nodeVersion = versions.getString("node");
    	
		assertNotNull(process);
		assertNotNull(versions);
		assertNotNull(nodeVersion);
		
		System.out.println("Node Version: "+nodeVersion);
		System.out.println("V8 Version: "+engine.getV8Version());

		versions.release();
		process.release();
    }
    
    @Test
    public void testNodeHttp() throws IOException {
    	assertNotNull(nodeJS.getRuntime());
    	
    	String NODE_SCRIPT = ""
    			+ "var http = require('http');\n"
    			+ ""
    			+ "var server = http.createServer(function (request, response) {\n"
    			+ " response.writeHead(200, {'Content-Type': 'text/plain'});\n"
    			+ " response.end(someJavaMethod());\n"
    			+ "});\n"
    			+ ""
    			+ "server.listen(3000);\n"
    			+ "console.log('Server running at http://127.0.0.1:3000/');";
   	
    	V8 engine = nodeJS.getRuntime();
    	
    	JavaCallback callback = new JavaCallback() {
    		public Object invoke(V8Object receiver, V8Array parameters) {
    			for (String key : receiver.getKeys()) System.out.println(key);
    			return "Hello, JavaWorld!";
    	    }
    		
    	};
    	
    	engine.registerJavaMethod(callback, "someJavaMethod");
    	File nodeScript = createTemporaryScriptFile("example", NODE_SCRIPT);
    	nodeJS.exec(nodeScript);
    	
    	while(nodeJS.isRunning()) {
    		nodeJS.handleMessage();
    	}
    }
    
    @Test
    public void testNodeHttpByRequire() throws IOException {
    	String NODE_SCRIPT = "var http = require('http'); module.exports = http;";
    	
    	V8 engine = nodeJS.getRuntime();
    	V8Object http = nodeJS.require(createTemporaryScriptFile("httpStartup", NODE_SCRIPT));
    	V8Function fnCallback = new V8Function(nodeJS.getRuntime(), (V8Object receiver, V8Array parameters) -> {
			V8Object request = parameters.getObject(0);
			V8Object response = parameters.getObject(1);

			V8Object params = new V8Object(engine).add("Content-Type", "text/plain");
			response.executeJSFunction("writeHead",  200, params);
			response.executeJSFunction("end", "Hello, from the JavaWorld to JS!");
						
			params.release();
	    	request.release();
	    	response.release();
			return null;
		});
    	
    	V8Object server = (V8Object) http.executeJSFunction("createServer", fnCallback);
    	
    	V8Object listener = (V8Object) server.executeJSFunction("listen", 3000);
    	System.out.println("Node HTTP server listening on port 3000.");
    	
    	fnCallback.release();
    	server.release();
    	http.release();

    	while (nodeJS.isRunning()) {
			nodeJS.handleMessage();
		}
 
    	listener.release();
//    	engine.release();
    }
    
    @Test
    public void testNodeByFile() throws IOException {
    	String filename = "/test-node.js";
    	assertNotNull(this.getClass().getResource(filename));
    	
    	File nodejsFile = new File(this.getClass().getResource(filename).getFile());
    	
    	JavaCallback callback = new JavaCallback() {
    		public Object invoke(V8Object receiver, V8Array parameters) {
    			for (String key : receiver.getKeys()) System.out.println(key);
    			return "Hello, JavaWorld!";
    	    }
    		
    	};
    	
    	V8 engine = nodeJS.getRuntime();
    	engine.registerJavaMethod(callback, "someJavaMethod");
    	
    	nodeJS.exec(nodejsFile);
    	while(nodeJS.isRunning()) {
    		nodeJS.handleMessage();
    	}
    }
    
    
    
    private V8Function fnCallback(JavaCallback func) {
    	return new V8Function(nodeJS.getRuntime(), func);
    }
    
	private static File createTemporaryScriptFile(final String name, final String script) throws IOException {
		File tempFile = File.createTempFile(name, ".js");
		PrintWriter writer = new PrintWriter(tempFile, "UTF-8");
		try {
			writer.print(script);
		} finally {
			writer.close();
		}
		return tempFile;
	}
}
