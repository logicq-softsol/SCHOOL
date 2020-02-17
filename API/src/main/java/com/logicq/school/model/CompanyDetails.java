package com.logicq.school.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SCHOOL_DETAILS")
public class CompanyDetails {

	@Id
	@Column(name = "ID")
	private String companyId;

	@Column(name = "NAME")
	private String compname;

	@Column(name = "TAG_LINE")
	private String tagline;

	@Column(name = "ABOUT", columnDefinition = "TEXT")
	private String aboutcomp;

	@Column(name = "LOGO_URL")
	private String logoURL;

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getCompname() {
		return compname;
	}

	public void setCompname(String compname) {
		this.compname = compname;
	}

	public String getTagline() {
		return tagline;
	}

	public void setTagline(String tagline) {
		this.tagline = tagline;
	}

	public String getAboutcomp() {
		return aboutcomp;
	}

	public void setAboutcomp(String aboutcomp) {
		this.aboutcomp = aboutcomp;
	}

	public String getLogoURL() {
		return logoURL;
	}

	public void setLogoURL(String logoURL) {
		this.logoURL = logoURL;
	}

}
