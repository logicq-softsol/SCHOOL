package com.logicq.school;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.User;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.JwtTokenProvider;
import com.logicq.school.security.UserPrincipal;
import com.logicq.school.service.LoginService;

@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class AuthenticationFilter extends OncePerRequestFilter {

	private final List<String> allowedOrigins = Arrays.asList("http://127.0.0.1:4200", "http://localhost:4200","http://localhost:8080","http://127.0.0.1:8080");

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private LoginService loginDetailService;

	@Autowired
	private UserDetailsRepo userDetailsRepo;

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);

	@Override
	protected void doFilterInternal(javax.servlet.http.HttpServletRequest request, HttpServletResponse response,
			FilterChain filterChain) throws ServletException, IOException {
		try {
			// Access-Control-Allow-Origin
			String origin = request.getHeader("Origin");
			response.setHeader("Access-Control-Allow-Origin", allowedOrigins.contains(origin) ? origin : "");
			response.setHeader("Vary", "Origin");
			// Access-Control-Max-Age
			response.setHeader("Access-Control-Max-Age", "3600");
			// Access-Control-Allow-Credentials
			response.setHeader("Access-Control-Allow-Credentials", "true");
			// Access-Control-Allow-Methods
			response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");

			// Access-Control-Allow-Headers
			response.setHeader("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept, " + "Authorization");

			if ("OPTIONS".equals(request.getMethod())) {
				filterChain.doFilter(request, response);
			} else {
				String jwt = getJwtFromRequest(request);

				if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
					String userName = tokenProvider.getUserIdFromJWT(jwt);
					LoginDetails loginDetails = loginDetailService.fetchUserLoginDetails(userName);
					User userDetails = userDetailsRepo.findByUserName(userName);
					UserPrincipal usrPrincipal = UserPrincipal.create(userDetails, loginDetails);
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							usrPrincipal, null, usrPrincipal.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
				filterChain.doFilter(request, response);
			}
		} catch (Exception ex) {
			logger.error("Could not set user authentication in security context", ex);
		}
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}
