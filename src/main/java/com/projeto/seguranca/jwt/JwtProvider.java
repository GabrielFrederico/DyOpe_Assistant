package com.projeto.seguranca.jwt;

import io.jsonwebtoken.*;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.sql.Date;

@Component
public class JwtProvider {
	
	private static final org.jboss.logging.Logger logger = LoggerFactory.logger(JwtProvider.class);
	 
    @Value("${projeto.app.jwtSecret}")
    private String jwtSecret;
 
    @Value("${projeto.app.jwtExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {
 
       UserDetails gerentePrincipal = (UserDetails) authentication.getPrincipal();
 
        return Jwts.builder()
                    .setSubject((gerentePrincipal.getUsername()))
                    .setIssuedAt(new Date(jwtExpiration))
                    .setExpiration(new Date((new Date(jwtExpiration)).getTime() +  729999999999990000L))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();
    }

    public String generateJwtTokenFuncionario(Authentication authentication) {

        UserDetails funcionarioPrinciple = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((funcionarioPrinciple.getUsername()))
                .setIssuedAt(new Date(jwtExpiration))
                .setExpiration(new Date((new Date(jwtExpiration)).getTime() + jwtExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
    
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }
        
        return false;
    }

    public boolean validateJwtTokenFuncionario(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }

        return false;
    }
    
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                      .setSigningKey(jwtSecret)
                      .parseClaimsJws(token)
                      .getBody().getSubject();
    }
}
