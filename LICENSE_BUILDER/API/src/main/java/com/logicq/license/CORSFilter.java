package com.logicq.license;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order
public class CORSFilter implements Filter {

	private static List<String> allowedOrigins = new ArrayList<>();

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub

	}

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		// Lets make sure that we are working with HTTP (that is, against
		// HttpServletRequest and HttpServletResponse objects)
		if (req instanceof HttpServletRequest && res instanceof HttpServletResponse) {
			HttpServletRequest request = (HttpServletRequest) req;
			HttpServletResponse response = (HttpServletResponse) res;

			// Access-Control-Allow-Origin
			String origin = request.getHeader("Origin");
			checkAllowOrigins(origin, allowedOrigins);
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
			chain.doFilter(req, res);
		}

	}

	private void checkAllowOrigins(String uri, List<String> allowedOrigins) {
		if (!allowedOrigins.contains(uri))
			allowedOrigins.add(uri);
	}

}
