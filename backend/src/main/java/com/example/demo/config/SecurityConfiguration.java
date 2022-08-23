package com.example.demo.config;

import com.example.demo.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserService userService;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
      //In-Memore Auth
      auth.inMemoryAuthentication().withUser("Mike")
                                   .password(passwordEncoder().encode("ml123"))
                                   .authorities("USER", "ADMIN");
      //Database Auth
      auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
          .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
          .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint).and()
          .authorizeRequests(
                  (request) -> request
                               .antMatchers("/h2-console/**", "/api/v1/auth/login").permitAll()
                               .antMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().authenticated())
                .addFilterBefore(new JWTAuthenticationFilter(userService, jwtTokenHelper), UsernamePasswordAuthenticationFilter.class);

        http.csrf().disable().headers().frameOptions().disable();
    }
}
