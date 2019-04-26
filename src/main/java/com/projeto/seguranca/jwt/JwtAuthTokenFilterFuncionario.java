package com.projeto.seguranca.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.projeto.seguranca.service.FuncionarioDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import ch.qos.logback.classic.Logger;

@Order(1)
public class JwtAuthTokenFilterFuncionario extends OncePerRequestFilter {
    @Autowired
    private JwtProvider tokenProvider;

    @Autowired
    private FuncionarioDetailsServiceImpl funcionarioDetailsService;

    private static final Logger logger = (Logger) org.slf4j.LoggerFactory.getLogger(JwtAuthTokenFilterFuncionario.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {

            String jwt = getJwt(request);
            if (jwt != null && tokenProvider.validateJwtTokenFuncionario(jwt)) {
                String username = tokenProvider.getUserNameFromJwtToken(jwt);
                UserDetails funcionarioDetails = funcionarioDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        funcionarioDetails, null, funcionarioDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Can NOT set user authentication -> Message: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwt(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.replace("Bearer ", "");
        }

        return null;
    }
}
