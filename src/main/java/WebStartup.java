

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

public class WebStartup 
	implements WebApplicationInitializer 
{

	private final Logger log = LoggerFactory.getLogger(WebStartup.class);
	
	public ConfigurableWebApplicationContext context;
	public void setContext(AnnotationConfigWebApplicationContext context) {
		this.context = context;
	}

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		log.info("Starting WebInitialization in {}", servletContext.getContextPath());
	
	}
}
