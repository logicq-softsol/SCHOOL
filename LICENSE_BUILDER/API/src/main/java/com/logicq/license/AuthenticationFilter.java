package com.logicq.license;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.logicq.license.model.LoginDetails;
import com.logicq.license.model.User;
import com.logicq.license.repository.UserDetailsRepo;
import com.logicq.license.security.JwtTokenProvider;
import com.logicq.license.security.UserPrincipal;
import com.logicq.license.service.LoginService;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

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

		} catch (

		Exception ex) {
			logger.error("Could not set user authentication in security context", ex);
		}
		filterChain.doFilter(request, response);
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
}
