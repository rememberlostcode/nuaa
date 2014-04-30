
package com.school.xnew.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

public class StringUtil extends StringUtils {
	private static final int[]	allChineseScope		= { 1601, 1637, 1833, 2078, 2274, 2302, 2433,
			2594, 2787, 3106, 3212, 3472, 3635, 3722, 3730, 3858, 4027, 4086, 4390, 4558, 4684,
			4925, 5249, 5600, Integer.MAX_VALUE	};
	public static final char	unknowChar			= '*';
	private static final char[]	allEnglishLetter	= { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
			'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z', unknowChar };

	private StringUtil() {

	}

	/**
	 * 字串是否为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		if (str == null) {
			return true;
		} else if (str.length() == 0) {
			return true;
		} else if ("NULL".equals(str.toUpperCase())) {
			return true;
		}
		return false;
	}

	/**
	 * 生成查询字串Map
	 * 
	 * @param str
	 * @return
	 */
	public static Map<String, String> getMapFromQueryParamString(String str) {
		Map<String, String> param = new HashMap<String, String>();
		String keyValues[] = str.split("`");
		for (int i = 0; i < keyValues.length; i++) {

		}
		return param;
	}

	/**
	 * 全替换
	 * 
	 * @param src
	 *            替换字串
	 * @param tar
	 *            替换目标
	 * @param str
	 *            主字串
	 * @return
	 */
	public static String replaceAll(String src, String tar, String str) {
		StringBuilder sb = new StringBuilder();
		byte bytesSrc[] = src.getBytes();

		byte bytes[] = str.getBytes();
		int point = 0;
		for (int i = 0; i < bytes.length; i++) {

			if (isStartWith(bytes, i, bytesSrc, 0)) {

				sb.append(new String(bytes, point, i));
				sb.append(tar);
				i += bytesSrc.length;
				point = i;
			}

		}
		sb.append(new String(bytes, point, bytes.length));
		return sb.toString();
	}

	/**
	 * 
	 * @param bytesSrc
	 * @param bytesTar
	 * @return
	 */
	private static boolean isStartWith(byte bytesSrc[], int startSrc, byte bytesTar[], int startTar) {
		for (int j = startTar; j < bytesTar.length; j++) {
			if (bytesSrc[startSrc + j] != bytesTar[j]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 取中文拼音首字符
	 * 
	 * @param str
	 * @return
	 */
	public static char getFirstLetterFromChinessWord(String str) {
		char result = '*';
		String temp = str.toUpperCase();
		try {
			byte[] bytes = temp.getBytes("gbk");
			if (bytes[0] < 128 && bytes[0] > 0) {
				return (char) bytes[0];
			}

			int gbkIndex = 0;

			for (int i = 0; i < bytes.length; i++) {
				bytes[i] -= 160;
			}
			gbkIndex = bytes[0] * 100 + bytes[1];
			for (int i = 0; i < allEnglishLetter.length; i++) {
				if (i == 22) {
					// System.out.println(allEnglishLetter.length
					// +" "+allChineseScope.length);
				}
				if (gbkIndex >= allChineseScope[i] && gbkIndex < allChineseScope[i + 1]) {
					result = allEnglishLetter[i];
					break;
				}
			}

		} catch (Exception e) {

		}
		return result;
	}

	/**
	 * 字串分割
	 * 
	 * @param src
	 * @param letter
	 * @return
	 */
	public static String[] split(String src, char letter) {
		if (src == null) {
			return new String[0];
		}
		List<String> ret = new ArrayList<String>();
		byte bytes[] = src.getBytes();
		int curPoint = 0;
		for (int i = 0; i < bytes.length; i++) {
			if (bytes[i] == letter) {
				String s = new String(bytes, curPoint, i - curPoint);
				ret.add(s);
				curPoint = i + 1;
			}
		}
		if (ret.size() == 0) {
			return new String[] { src };
		}
		// ret.add(new String(bytes, curPoint, src.length() - curPoint));
		String[] retStr = new String[ret.size()];
		for (int i = 0; i < ret.size(); i++) {
			retStr[i] = ret.get(i);
		}
		return retStr;
	}

	public static String[] split(String src, String letter) {
		String retStr[] = new String[0];
		try {
			retStr = StringUtils.split(src, letter);
		} catch (Exception e) {
			return retStr;
		}
		return retStr;
	}

	/**
	 * 去除最后一个字符
	 * 
	 * @param str
	 * @return
	 */
	public static String removeLast(String str) {
		if (str == null) {
			return null;
		}
		return str.substring(0, str.length() - 1);

	}

	/**
	 * 获取字符串的长度，中文占两个字符,英文数字占一个字符
	 * 
	 * @param value
	 *            指定的字符串
	 * @return 字符串的长度
	 */
	public static double stringLength(String value) {
		if (value == null)
			return 0;

		double valueLength = 0;
		String chinese = "[\u4e00-\u9fa5]";
		// 获取字段值的长度，如果含中文字符，则每个中文字符长度为2，否则为1
		for (int i = 0; i < value.length(); i++) {
			// 获取一个字符
			String temp = value.substring(i, i + 1);
			// 判断是否为中文字符
			if (temp.matches(chinese)) {
				// 中文字符长度为2
				valueLength += 2;
			} else {
				// 其他字符长度为1
				valueLength += 1;
			}
		}
		// 进位取整
		return Math.ceil(valueLength);
	}

	/**
	 * 
	 * 
	 * @param str
	 * @return
	 */

	public static String replace(String str) {
		StringBuffer out = new StringBuffer();
		str = str.replaceAll("\t", "");
		str = str.replaceAll("\n", "");
		for (int i = 0; str != null && i < str.length(); i++) {
			char c = str.charAt(i);
			if (c == '>')
				out.append("&gt");
			else if (c == '<') {
				out.append("&lt");
			} else if (c == '"') {
				out.append("&quot");
			} else if (c == '\'') {
				out.append("&acute");
			} else if (c == ':') {
				out.append("&#58");
			} else if (c == ';') {
				out.append("&#59");
			} else if (c == ',') {
				out.append("&#44");
			} else if (c == '[') {
				out.append("&#91");
			} else if (c == ']') {
				out.append("&#93");
			} else if (c == '{') {
				out.append("&#123");
			} else if (c == '}') {
				out.append("&#125");
			} else if (c == '}') {
				out.append("&#125");
			} else if (c == '&') {
				out.append("&#38");
			} else if (c == '#') {
				out.append("&#35");
			} else if (c == '?') {
				out.append("&#63");
			} else if (c == '=') {
				out.append("&#61");
			} else {
				out.append(c);
			}
		}
		return out.toString();
	}

	/**
	 * 编码
	 * 
	 * @param str
	 * @param charset
	 * @return
	 */
	public static String encoder(String str, String charset) {
		try {
			charset = charset == null ? "UTF-8" : charset;
			String s = URLEncoder.encode(str, charset);
			return s;
		} catch (Exception e) {

		}
		return null;
	}

	/**
	 * 解码
	 * 
	 * @param str
	 * @param charset
	 * @return
	 */
	public static String decoder(String str, String charset) {
		try {
			charset = charset == null ? "UTF-8" : charset;
			String s = URLDecoder.decode(str, charset);
			return s;
		} catch (Exception e) {

		}
		return null;
	}

	public static void main(String argv[]) throws UnsupportedEncodingException {

		// System.out.println(split("aa&dd_dd&dd","&"));
		String[] split = StringUtils.split("aa&dd_dd&dd", "323");
		// for(String a:split){
		System.out.println(split[0]);
		// }

		// String bmdm_id = "102120";String bmdm_bjdm_id = "102120_1";
		// System.out.println(bmdm_id.matches(bmdm_bjdm_id));

		// System.out.println(StringUtil.getFirstLetterFromChinessWord("裘"));
		// int b = 0;
		// for (int i = 0; i < 50; i++) {
		// for (int j = 0; j < 50; j++) {
		// byte bytes[] = new byte[] { (byte) (56 + 160 + i),
		// (byte) (00 + 160 + j) };
		// String aa = new String(bytes, "gbk");
		// if (!isEmpty(aa)) {
		// b++;
		// System.out.println(aa + " " + i + " " + j + " "
		// + (i * 50 + j));
		// }
		// }
		// }
		// bytes="竺".getBytes("gbk");
		// System.out.println(new String(bytes,"gbk"));
		// System.out.println(StringUtil.getFirstLetterFromChinessWord("竺"));
		// String[] ret = split("S||||a&r", 's');
		// System.out.println(ret.length);
		// for (int i = 0; i < ret.length; i++) {
		// System.out.println(ret[i]);
		// }

		// String filterField = "bmdm_id,zydm_id,njdm_id";
		// List<String> list = new ArrayList<String>();
		// list.add("bmdm_id=100001,njdm_id=1");
		// list.add("bmdm_id=102120,njdm_id=1");
		// list.add("bmdm_id=2");
		// list.add("bmdm_id=3,njdm_id=1");
		// list.add("zydm_id=1,zydm_id=1");
		// list.add("zydm_id=2,zydm_id=1");
		// list.add("zydm_id=3");
		//
		//
		// StringBuilder builder = new StringBuilder();
		// String f1 = "", f2 = "", reSql = "";
		// String filterFields[] = StringUtil.split(filterField, ',');
		// for (int i = 0; i < filterFields.length; i++) {
		// for (int j = i + 1; j < filterFields.length; j++) {
		// f1 = filterFields[i];
		// f2 = filterFields[j];
		// for (String temp : list) {
		// if (temp.contains(",")) {
		// temp = temp.replace(",", " and ");
		// if (temp.contains(f1) && temp.contains(f2)) {
		//
		// builder.append("(" + temp + ")" + " or ") ;
		//
		// }
		//
		// }
		// }
		// }
		// for (String temp : list) {
		// if(!temp.contains(",")){
		// if(temp.contains(filterFields[i])){
		//
		// builder.append(temp + " or ");
		//
		// }
		// }
		// }
		// }
		//
		// reSql = builder.toString();
		// reSql = reSql.substring(0,reSql.lastIndexOf(" or "));
		// System.out.println(reSql.substring(0,reSql.lastIndexOf(" or ")));

	}
}