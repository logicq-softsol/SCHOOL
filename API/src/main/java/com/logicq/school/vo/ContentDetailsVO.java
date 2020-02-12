package com.logicq.school.vo;

public class ContentDetailsVO {

	private String link;
	private String name;
	private String id;
	private String filetyp;
	private String category;
	private boolean isdownloadable = false;

	/**
	 * @return the link
	 */
	public String getLink() {
		return link;
	}

	/**
	 * @param link the link to set
	 */
	public void setLink(String link) {
		this.link = link;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the filetyp
	 */
	public String getFiletyp() {
		return filetyp;
	}

	/**
	 * @param filetyp the filetyp to set
	 */
	public void setFiletyp(String filetyp) {
		this.filetyp = filetyp;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @param category the category to set
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return the isdownloadable
	 */
	public boolean isIsdownloadable() {
		return isdownloadable;
	}

	/**
	 * @param isdownloadable the isdownloadable to set
	 */
	public void setIsdownloadable(boolean isdownloadable) {
		this.isdownloadable = isdownloadable;
	}
	
	

}
