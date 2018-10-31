package test.jpa;

import java.util.Properties;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.cityray.data.SysProperties;

@Configuration
@EnableTransactionManagement 
public class TestJpa {
	
	private static AnnotationConfigApplicationContext context = null;
	
	private EntityManager em = null;
	
	@BeforeClass
	public static void beforeClass() {

		context = new AnnotationConfigApplicationContext();
		context.register(TestJpa.class);
		context.refresh();
		
	}
	
	
	/*
	 * Error when using TestUnit with Spring Configuration
	 */
	@Bean(name="dataSource")
	public DataSource getDataSource() {
		DriverManagerDataSource ds = new DriverManagerDataSource();
		ds.setDriverClassName(SysProperties.JDBC_DRIVER_SQLSERVER.toString());
		ds.setUrl("jdbc:sqlserver://192.168.1.11;databaseName=crws_temp");
		ds.setUsername("citysa");
		ds.setPassword("hrplus");
		return ds;
	}
	
//	private LocalContainerEntityManagerFactoryBean getLEMF() {
//		ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
//		LocalContainerEntityManagerFactoryBean lemf = 
//				beanFactory.createBean(LocalContainerEntityManagerFactoryBean.class);
//
//		lemf.setDataSource(this.getDataSource());
//		lemf.setPersistenceUnitName("test");
//		lemf.setPackagesToScan("test.jpa");
//		lemf.setJpaDialect(new HibernateJpaDialect());
//		lemf.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
//
//		Properties prop = new Properties();
//		prop.put("hibernate.dialect", SysConstants.DIALECT_SQLSERVER.toString());
//		prop.put("hibernate.synonyms", "true");
//		prop.put("hibernate.show_sql", "false");
//		prop.put("hibernate.format_sql", "true");
//		
//		prop.put(SysConstants.PROP_HIBERNATE_HBM2DDL.toString(), "AUTO"); 
//		
//		lemf.setJpaProperties(prop);
//		beanFactory.registerSingleton("entityManagerFactory", lemf);
//		return lemf;
//	}
	
	@Before
	public void startup() {
		
//		EntityManagerFactory emf = context.getBean("\"entityManagerFactory", javax.persistence.EntityManagerFactory.class);
//		Assert.assertNotNull(emf);
//		em = emf.createEntityManager();
//		Assert.assertNotNull(em);
	}
	
	@Test
	public void testStartup() {
		
	}

}
