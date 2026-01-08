package com.project.kkiaprj.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    // password Encoder
    @Bean
    public
    PasswordEncoder encoder(){
        System.out.println("PasswordEncoder bean is created");
        return new BCryptPasswordEncoder();
    }

    // security setting
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                // cors 오류 방지
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173")); // 프론트 주소
                    config.setAllowedMethods(List.of("GET","POST","OPTIONS"));
                    config.setAllowCredentials(true); // 쿠키 허용
                    return config;
                }))

                .csrf(csrf -> csrf.disable()) // CSRF 비활성화

                // authority setting
                .authorizeHttpRequests(auth -> auth
//                         로그인만 하면 들어갈 수 있도록 !
                        .requestMatchers("/market/talk-list").authenticated()
                        .requestMatchers("/market/talk/*").authenticated()
                        .requestMatchers("/market/detail/*").authenticated()
                        .requestMatchers("/market/update/*").authenticated()
                        .requestMatchers("/market/write").authenticated()
                        .requestMatchers("/community/post/detail/*").authenticated()
                        .requestMatchers("/community/post/update/*").authenticated()
                        .requestMatchers("/community/post/write").authenticated()
                        .requestMatchers("/community/favorite/detail/*").authenticated()
                        .requestMatchers("/community/favorite/update/*").authenticated()
                        .requestMatchers("/community/favorite/write").authenticated()
                        .requestMatchers("/community/food/detail/*").authenticated()
                        .requestMatchers("/community/food/update/*").authenticated()
                        .requestMatchers("/community/food/write").authenticated()
                        .requestMatchers("/user/mypage").authenticated()
                        .anyRequest().permitAll()
                )

                .formLogin(form -> form
                        .usernameParameter("loginId")
                        .passwordParameter("password")
                        .loginPage("/user/login") // 페이지 이름 (프론트)
                        .loginProcessingUrl("/api/user/login") // 실제 인증 (백엔드)
//                        .successHandler(new LoginSuccess("/home"))
                        .failureHandler(new LoginFailure())
                )

                .logout(httpSecurityLogoutConfigurer -> httpSecurityLogoutConfigurer
                        .logoutUrl("/api/user/logout")
                        .logoutSuccessUrl("/home")
                        .logoutSuccessHandler(new LogoutSuccess())
                        .invalidateHttpSession(false)
                )

                .exceptionHandling(httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer
                        .accessDeniedHandler(new AccessDeniedHandler1())
                )

                .build();
    }
}
