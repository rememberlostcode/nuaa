
package com.school.xnew.core.lang;

public class COMException extends RuntimeException {

	/**
	 * 
	 */
	private static final long	serialVersionUID	= -2644004467869374399L;

	public COMException() {
		super();
	}

	public COMException(String message, Throwable cause) {
		super(message, cause);
	}

	public COMException(String message) {
		super(message);
	}

	public COMException(Throwable cause) {
		super(cause);
	}

}
