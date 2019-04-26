package com.projeto.seguranca.jwt;

import java.sql.Date;

import com.projeto.seguranca.service.FuncionarioPrinciple;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.projeto.seguranca.service.GerentePrinciple;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtProvider {
	
	private static final org.jboss.logging.Logger logger = LoggerFactory.logger(JwtProvider.class);
	 
    @Value("${projeto.app.jwtSecret}")
    private String jwtSecret;
 
    @Value("${projeto.app.jwtExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {
 
       GerentePrinciple gerentePrincipal = (GerentePrinciple) authentication.getPrincipal();
 
        return Jwts.builder()
                    .setSubject((gerentePrincipal.getUsername()))
                    .setIssuedAt(new Date(jwtExpiration))
                    .setExpiration(new Date((new Date(jwtExpiration)).getTime() + jwtExpiration*1000))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();
    }

    public String generateJwtTokenFuncionario(Authentication authentication) {

        FuncionarioPrinciple funcionarioPrinciple = (FuncionarioPrinciple) authentication.getPrincipal();

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
