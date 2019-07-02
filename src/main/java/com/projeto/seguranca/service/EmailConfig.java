package com.projeto.seguranca.service;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {

	@Bean
	public JavaMailSender getJavaMailSender() {
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

		Properties props = mailSender.getJavaMailProperties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.debug", "true");
		props.put("mail.smtp.connectiontimeout", 10000);
		props.put("mail.smtp.port", "25");
	    props.put("mail.smtp.host", "smtp.gmail.com");
	    props.put("mail.smtp.ssl.enable", "true");
		mailSender.setUsername("dyopeassistant@gmail.com");
		mailSender.setPassword("tcczaotop");
		return mailSender;
	}

}
