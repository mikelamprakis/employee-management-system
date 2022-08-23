package com.example.demo;

import com.example.demo.entities.*;
import com.example.demo.repository.ChatRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.RequestRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SpringLoginAuthorizationApplication {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MessageRepository messageRepository;

	@Autowired
	private ChatRepository chatRepository;

	@Autowired
	private RequestRepository requestRepository;


	public static void main(String[] args) {
		SpringApplication.run(SpringLoginAuthorizationApplication.class, args);
	}

	private Authority createAuthority(String roleCode, String roleDescription){
		Authority authority = new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}

	@Bean
	CommandLineRunner commandLineRunner(){
		return args -> {

			// Creating users
			List<Authority> authorityList = new ArrayList<>();
			authorityList.add(createAuthority("USER", "User role"));
			User user1 = new User ();
			user1.setUserName("johny");
			user1.setPassword(passwordEncoder.encode("12345"));
			user1.setAuthorities(authorityList);
			userRepository.save(user1);

			List<Authority> authorityList2 = new ArrayList<>();
			authorityList2.add(createAuthority("ADMIN", "Admin role"));
			User user2= new User();
			user2.setUserName("kostas123");
			user2.setPassword(passwordEncoder.encode("12345"));
			user2.setAuthorities(authorityList2);
			userRepository.save(user2);

			List<Authority> authorityList3 = new ArrayList<>();
			authorityList3.add(createAuthority("USER", "User role"));
			authorityList3.add(createAuthority("ADMIN", "Admin role"));
			User user3 = new User();
			user3.setUserName("mike123");
			user3.setPassword(passwordEncoder.encode("12345"));
			user3.setAuthorities(authorityList3);
			userRepository.save(user3);

			// Creating messages
			Message msg1 = new Message("This is msg1", "INBOUND" , "123");
			messageRepository.save(msg1);

			Message msg2 = new Message("This is msg1", "OUTBOUND" , "123");
			messageRepository.save(msg2);

			// Creating a chat
			Chat chat1 = new Chat();
			chat1.getListOfMessages().add(msg1);
			chat1.getListOfMessages().add(msg2);
			chatRepository.save(chat1);

			// Adding 3 users in 1 chat
			user1.addChat(chat1);
			user2.addChat(chat1);
			user3.addChat(chat1);
			userRepository.save(user1);
			userRepository.save(user2);
			userRepository.save(user3);

			// Create a request
			Request newRequest = new Request(LocalDate.of(2011, 04, 23), LocalDate.now());
			newRequest.setUser(user1);
			requestRepository.save(newRequest);
		};
	}

}
