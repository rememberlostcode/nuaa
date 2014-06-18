function setData2Page(){
  var list = $("ul[id='list']");
	for(var i = 0;i<data.length;i++){
		var person = data[i];
		var xm = person.name;//姓名
	
		var zm = wf.makePy(xm);//姓名首字母
		zm = (zm + "").substr(0,1);
		var zc = person.jobTitle;//职称
		var zy = person.profession;//专业  多个用,分隔
		if(zy == null){
			zy = "";
		}
		
		var zp = person.userImg;//照片
		var xw = person.educationDegree;//学位
		var zw = person.mentorCategory;//职务
		var xy = person.college;//所属学院
		var yjfx = person.researchDirection;//研究方向
		var shzy = person.socialAppointments;//社会职务
		var ry = person.honorary;//荣誉
		var ky = person.Research;//科研
		var xsjl = person.academicExperience;//学术经历
		var qt = person.other;//其它
		
		var each = $("<table><tr><td rowspan='5' style='width:110px;'></td><td valign='top'></td></tr><tr><td valign='top'></td></tr><tr><td valign='top'></td></tr><tr><td valign='top'></td></tr><tr><td valign='top'></td></tr></table>");
		each.attr({"class":"teacher_each"});
		each.attr({"zm":zm,"zc":zc,"zy":zy,"xm":escape(xm)});
		
		var zplj = "teacher/empty.png";
		if(zp != null){
			zplj = zp;
		}
		each.find("tr:eq(0) td:eq(0)").append("<img src='" + zplj + "' />");

		each.find("tr:eq(0) td:eq(1)").append("<span>姓名：</span>" + xm );
		each.find("tr:eq(1) td:eq(0)").append("<span>职称：</span>" + zc );
		each.find("tr:eq(2) td:eq(0)").append("<span>学位：</span>" + xw );
		each.find("tr:eq(3) td:eq(0)").append("<span>职务：</span>" + zw );
		each.find("tr:eq(4) td:eq(0)").append("<span>专业：</span>" + zy );

		each.bind({"click":function(){
			var xm = $(this).attr("xm");
		  window.location.href="jzyg_detail.html?name=" + xm;	
		}});
		
		list.append(each);
	}
}

/* 设置教师详细信息到页面 */
function setDetailData2Page(name){
	name = unescape(name);
	var tab = $("table[id='teacherdetail']");
	for(var i = 0;i<data.length;i++){
		var person = data[i];
		var xm = person.name;//姓名
		if(xm == name){
  		var zc = person.jobTitle;//职称
  		var zy = person.profession;//专业  多个用,分隔
  		if(zy == null){
  			zy = "";
  		}
  		var zp = person.userImg;//照片
  		var xw = person.educationDegree;//学历 学位
  		var zw = person.mentorCategory;//导师类别
  		var xy = person.college;//所属学院
  		var yjfx = person.researchDirection;//研究方向
  		var shzy = person.socialAppointments;//社会兼职
  		var ry = person.honorary;//荣誉称号
  		var ky = person.Research;//科研
  		var xsjl = person.academicExperience;//学术经历
  		var qt = person.other;//其它
			var kyqk = person.scientificResearch;//科研情况
			var zhuanye = person.profession;//专业
			
  		var zplj = "teacher/empty.png";//照片URL
  		if(zp != null){
  			zplj = zp;
  		}
  		/**/
  		tab.find("tr:eq(0) td:eq(0)").html(xm);//姓名
  		tab.find("tr:eq(0) td:eq(1)").html("<img src='" + zplj + "' />");//姓名
  		tab.find("tr:eq(1) td:eq(0)").html("");//性别
  		tab.find("tr:eq(2) td:eq(0)").html(zc);//职称
  		tab.find("tr:eq(3) td:eq(0)").html(zw);//职务
  		tab.find("tr:eq(4) td:eq(0)").html(xw);//学历 学位
  		tab.find("tr:eq(5) td:eq(0)").html(zw);//导师类别
  		tab.find("tr:eq(6) td:eq(0)").html(xy);//所在学院
  		tab.find("tr:eq(7) td:eq(0)").html(zhuanye);//专业
  		tab.find("tr:eq(8) td:eq(0)").html(yjfx);//研究方向
  		tab.find("tr:eq(9) td:eq(0)").html(shzy);//社会兼职
  		tab.find("tr:eq(10) td:eq(0)").html(ry);//荣誉称号
  		tab.find("tr:eq(11) td:eq(0)").html(kyqk);//科研情况
  		tab.find("tr:eq(12) td:eq(0)").html("");//主要科研成果
  		tab.find("tr:eq(13) td:eq(0)").html(xsjl);//学术经历 	
  		tab.find("tr:eq(14) td:eq(0)").html("");//课程链接 	
  		tab.find("tr:eq(15) td:eq(0)").html(qt);//其它
  		/**/
			return false;
		}
	}
}

var zc = "all";
var zy = "all";
var zm = "all";

function searchNavClickBind() {
	searchNavClickBindEach("div[id=searchByZC] div",1);
	searchNavClickBindEach("div[id=searchByZY] div",2);
	searchNavClickBindEach("div[id=searchByZM] div",3);
}

function searchNavClickBindEach(searchStr,num){
	var divs = $(searchStr);
	divs.each(function() {
		$(this).bind(
				{
					"click" : function() {					
						if(typeof($(this).attr("val"))!="undefined"){
							$(searchStr).each(function() {
								if(typeof($(this).attr("val"))!="undefined"){
									$(this).removeClass("selected");
								}							
							});	
							$(this).addClass("selected");
							var val = $(this).attr("val"); 
							if(num == 1){
								zc = val;
							}else if(num == 2){
								zy = val;
							}else if(num == 3){
								zm = val;
							}
							dealBind();
						}
					}
				});
	});
}

function dealBind(){
	var displaySum = 0;
	var teacher_eachs = $(".teacher_each");
	teacher_eachs.each(function() {
		var displayFlag = true;
		var zc_now = $(this).attr("zc");
		var zy_now = $(this).attr("zy");
		var zm_now = $(this).attr("zm");
		if(zc == "all" || zc == zc_now){
			displayFlag = true;
		}else{
			displayFlag = false;
			$(this).css("display","none");
			return true;
		}
		if(zy == "all" || zy_now.indexOf(zy) >= 0 ){
			displayFlag = true;
		}else{
			displayFlag = false;
			$(this).css("display","none");
			return true;
		}
		if(zm == "all" || zm == zm_now){
			displayFlag = true;
		}else{
			displayFlag = false;
			$(this).css("display","none");
			return true;
		}
		$(this).css("display","block");
		displaySum += 1;
	});
	var nodata = $("div[id=nodata]");
	if(displaySum == 0){
		nodata.css("display","block");
	}else{
		nodata.css("display","none");
	}
}

var data = 
[   
    {
        "name": "汪晓红",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "profession": "计算数学",
        "mentorCategory": "硕导",
        "college": "理学院"
    },
    {
        "name": "倪勤",
        "userImg": "teacher/niq.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "线性及非线性优化等",
        "socialAppointments": "中国运筹学会理事(2004-2012)，中国运筹学会数学规划分会理事(2005-), 全国计算数学学会理事（2003-2006），江苏省数学学会副理事长(2002-)，江苏省工科数学委员会主任委员(2002-)，《数值计算与计算机应用》与《南京航空航天大学学报》的编委，《Mathematical Review》评论员",
        "honorary": "1997-2006为江苏省“333跨世纪学术,技术带头人培养工程”(第一期和第二期)培养对象. 获省优秀教改成果一等奖两项(排名第二和第五)。",
        "scientificResearch": "研究非线性规划理论，方法，软件及应用等。研究方向为非线性规划理论，方法及应用。自90年代以来， 主要从事大规模非线性规划理论与方法， 直接最优化方法，移动渐近线和锥模型信赖域方法的研究，张量计算。",
        "academicExperience": "1999年12月 澳大利亚南威尔士大学访问 <br /> 2000年9月-2001年2月 德国Bayreuth大学 (高级访问学者) <br /> 2002年7-8月，中科院数学与系统科学研究院(访问教授) <br /> 2002年11月-2003年1月, 德国Bayreuth大学(DAAD资助,访问教授) <br /> 2004年5月-2004年9月，香港理工大学 (访问研究员) <br /> 2005年6月-2005年7月，香港理工大学 (访问研究员) <br /> 2005年8月-2005年9月，美国Wisconsin-Milwaukee大学(访问教授) <br /> 2006年7月-2006年8月，香港城市大学 (访问研究员) <br /> 2010年12月-2011年1月香港理工大学 (访问研究员)，2012年10月访问俄罗斯科学院计算中心； 2013年5-6月香港理工大学 (访问研究员)。",
        "other": "email: niqfs@nuaa.edu.cn"
    },
    {
        "name": "岳勤",
        "userImg": "teacher/yueq.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "代数数论，信息安全",
        "honorary": "1999年中国科学院院长奖学金优秀奖 <br /> 2004年江苏省“青蓝工程”优秀骨干教师 <br /> 2008年江苏省“青蓝工程”学科带头 <br /> 2008年江苏省优秀硕士论文，指导老师",
        "scientificResearch": "主要科研项目： <br /> （1）主持上海市博士后科研基金，K2群的算术性质， 2000年9月至2001年12月，1万元，负责，完成。 <br /> （2）主持江苏省教育厅自然科学基金，面上，（No：02KJB11006）， Milnor K群的算术性质， 2002.1---2004.12，2万元, 主持，结题。 <br /> （3）主持江苏青蓝工程项目骨干教师项目，4千元。 <br /> （4）主持主持国家自然科学基金“MilnorＫ群和类群”（10371054）,04年1月-06年12月。金额14万，结题。 <br /> （5）主持国家自然科学基金，国际合作交流， MilnorＫ群和类群,04年，1万元。 <br /> <br /> 在研项目： <br /> （1）主持国家自然科学基金“有关类群的问题”（No:10771100）,08年1月-10年12月，金额25万。 <br /> （2）主持2008年江苏省青蓝工程学科带头人，金额6万元。 <br /> （3）第一参与国家自然科学基金面上项目（No:10971250），金额26万。 <br /> （4）第一参与信息安全国家重点实验室的开放项目“差集的组合及密码学性质研究”，07年7月-09年6月，金额2万元。",
        "academicExperience": "学术交流： <br /> 2000年1月-2002年1月，复旦大学数学所 博士后。 <br /> 2000年4月-2000年9月，参加中国科学院晨兴数学中心的“算术代数几何”的活动。 <br /> 2001年7月-2001年12月，台湾中央研究院数学所博士后。 <br /> 2002年9月-2002年10月，参加中国科学院晨兴数学中心的“算术代数几何”的活动。 <br /> 2003年3月-2006年12月，参加南京大学秦厚荣代数数论讨论班。 <br /> 2004年7月-2004年11月，访问意大利理论物理中心。 <br /> 2005年6月-2005年8月，2006年6月-2006年7月，参加中国科学院晨兴数学中心的“算术代数几何”的活动。 <br /> 2009年5月-2009年6月。访问台湾大学数学所 <br /> 2009年7月。访问韩国高级科学技术学院。 <br /> <br /> 国内外邀请学术报告如下： <br /> （1）多次邀请参加中国科学院数学所晨兴数学中心活动，并作学术报告。 <br /> （2）04年7月至04年11月访问意大利理论物理中心，并作学术报告。 <br /> （3）06年3月，第一届天元算术代数几何会议，首都师范大学主办，1小时邀请报告。 <br /> （4）06年11月，全国第九次代数会议，厦门大学，学术报告（20分钟）。 <br /> （5）07年8月，第一届数论组合及其相关问题，南大主办，1小时邀请报告。 <br /> （7）07年11月，第二届天元算术代数几何会议，首都师范大学主办，1小时邀请报告。 <br /> （8）08年6月，第三届全国有限域及其应用会议，郑州信息工程大学主办，40分钟邀请报告。 <br /> （9）09年5月19日-22日，台湾大学主办，国际数论会议上，1小时邀请报告。 <br /> （10) 09年6月22日，华南师范大学主办，国际代数会议，邀请报告。 <br /> （11）09年8月，清华大学主办，东亚国际数论会议上，1小时邀请报告 <br />",
        "other": "欢迎有兴趣数学和立志做数学的本科生报考硕士研究生。 yueqin@nuaa.edu.cn"
    },
    {
        "name": "张鲁明",
        "userImg": "teacher/zhanglm.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "微分方程数值解法、计算物理"
    },
    {
        "name": "王春武",
        "jobTitle": "教授",
        "position": "副院长",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "偏微分方程数值解法，计算流体力学",
        "socialAppointments": "江苏省计算数学学会副理事长，江苏省计算数学学会副秘书长",
        "scientificResearch": "主要从事多介质(多相)流动问题的高精度数值模拟方法及界面处理方法研究。 <br /> <br /> 主持科研项目： <br /> 气液两相流动问题的高精度数值模拟方法及自适应网格技术研究， 国家自然科学基金，2013.1- 2016.12； <br /> 水下爆炸作用下结构响应的高分辨数值模拟方法研究,国家重点实验室开放项目，2011.1-2012.12； <br /> 多介质流动问题的界面处理方法及自适应网格技术研究，国家自然科学基金，2007.1- 2009.12； <br /> ******损伤的数值模拟研究，总装备部预研基金，2007.5－2009.4. <br /> <br />",
        "academicExperience": "? 2000.08- ，南京航空航天大学，理学院； <br /> ? 2002.04-2004.03，新加坡国家高性能计算研究所(IHPC)，博士后； <br /> ? 2009.01-2009.12，美国布朗大学应用数学系，访问学者. <br />",
        "other": "wangcw@nuaa.edu.cn"
    },
    {
        "name": "殷洪友",
        "userImg": "teacher/yinhy.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "最优化理论与算法",
        "scientificResearch": "1993年起开始从事最优化的理论和算法研究，研究专长为非光滑最优化方法、非凸规划、变分不等式和互补问题的理论和算法。在《数学学报》、《应用数学学报》、《高校应用数学学报》等国内外学术刊物上发表论文二十余篇，参与国家自然科学基金多项，主持航空自选课题一项。 <br />",
        "academicExperience": "1982年在淮北煤炭师范学院数学系本科毕业，1985年9月至1986年7月在兰州大学基础数学专业进修研究生课程，1996年6月在西安交通大学计算数学专业获理学硕士学位，1999年6月在西安交通大学计算数学专业获理学博士学位。。"
    },
    {
        "name": "安玉坤",
        "userImg": "teacher/anyk.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "profession": "应用数学",
        "mentorCategory": "硕导",
        "college": "理学院"
    },
    {
        "name": "陈芳启",
        "userImg": "teacher/chenfq.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "非线性分析、动力系统、非线性力学",
        "socialAppointments": "天津大学兼职教授 <br /> 中国力学会第九届动力学与控制专业委员会非线性振动与运动稳定性专业组副组长 <br /> <br />",
        "honorary": "获奖情况： <br /> 1.复杂非线性系统动力学的理论与方法.获天津市2002年自然科学一等奖. <br /> 2.微分方程与数值分析.获山东省教委1998年科技进步二等奖. <br /> 3.江苏省高校＂青蓝工程＂中青年学术带头人. <br /> <br />",
        "scientificResearch": "主持国家自然科学基金项目3项，教育部博士点基金（博导类）项目1项，江苏省自然科学基金项目、天津市自然科学基金项目（重点）各1项，江苏省高校“青蓝工程”中青年学术带头人基金项目1项，作为子课题负责人承担国家自然科学基金重大项目1项等各类科研项目共13项。发表学术论文80余篇，其中SCI/EI收录35/38篇次 <br />",
        "academicExperience": "1998.6于山东大学数学院获理学博士学位，研究方向：非线性分析，导师：郭大钧教授。 <br /> 1998.7-2000.5在天津大学力学博士后站从事博士后研究工作，研究方向：非线性振动系统动力学理论及应用，合作导师：陈予恕院士。 <br /> 2000.5―2004.9 在天津大学数学系任教，2002年破格晋升教授，2003年聘为一般力学与力学基础专业博士生导师。 <br /> 2004.9―南京航空航天大学数学系任教，教授、博士生导师，2006江苏省高校＂青蓝工程＂中青年学术带头人。 <br />",
        "other": "出版教材5本，著作2本（各撰写1章），讲义1本。 email:fangqichen@nuaa.edu.cn"
    },
    {
        "name": "唐月红",
        "userImg": "teacher/tangyuehong.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "计算几何、计算机图形学、应用逼近论"
    },
    {
        "name": "曹喜望",
        "userImg": "teacher/caoxiwang.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "代数组合论，代数密码学",
        "honorary": "2010年,被评为江苏省“青蓝工程”青年学术带头人",
        "scientificResearch": "主持项目： <br /> 1，国家自然科学基金：对称密码中涉及的差集与Bent函数研究，10971250。 <br /> 2，国家自然科学基金：类群的有关问题，10771100，第一参与人. <br /> 3,“数学，信息与行为”教育部重点实验室开放课题：2010年，主持人。 <br /> 4，信息安全国家重点实验室开放课题：2008年，主持人。 <br /> 5，信息安全国家重点实验室开放课题：2007年，主持人。 <br /> 6, 国家自然科学基金：编码密码中涉及的几种指数和及其应用研究，No.11371011. <br />",
        "other": "欢迎有兴趣的同学报考研究生。 xwcao@nuaa.edu.cn"
    },
    {
        "name": "耿显民",
        "jobTitle": "教授",
        "educationDegree": "硕士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "概率论与数理统计",
        "researchDirection": "金融数学、随机网络、数理经济学",
        "scientificResearch": "Awards and Group Memberships <br /> Awards <br /> <br /> Zhong JiaQing award <br /> China's operations research society, 2010 <br /> <br /> &quot;Progress&quot; the second prize <br /> China's state council development research center, 1999 <br /> <br /> Member <br /> <br /> Institute of Mathematical Statistics Membership <br /> Chinese Applied Probability and Statistics in Technology and Engineering Society <br />",
        "academicExperience": "Education <br /> September, 1982-July, 1984 <br /> Changsha Railway University <br /> The postgraduate degree majors in Probability and statistic <br /> September, 1978-March, 1982 <br /> Xinjiang Broadcast and Normal University <br /> B.S. in Mathematics <br /> Work Experience <br /> July, 2000-present <br /> College of Science <br /> Nanjing University of Aeronautics and Astronautics <br /> Nanjing, China <br /> Professor <br /> Duties: Teaching two undergraduate-level courses and five postgraduate-level courses; Doing research in the field of Stochastic Complex Networks, finance mathematics, Economic System Analysis, Stochastic analysis and Markov Processes, etc.; Graduate student advisor. <br /> September, 1998-June, 2000 <br /> Department of Computer and Department of Management Sciences <br /> Changzhou Teachers University of Technology <br /> Changzhou, China <br /> Associate Professor <br /> Duties: Teaching two undergraduate-level courses; Doing research on the stochastic processes and their applications. <br /> January, 1994-June, 1998 <br /> Department of basic courses <br /> Xinjiang University of Petroleum <br /> Urumqi, China <br /> Associate Professor <br /> Duties: Teaching three undergraduate-level course; Advisor of the undergraduate graduation design; Doing research on the Economic System Analysis and stochastic input-output economic. <br /> December, 1992 - December, 1993 <br /> Department of Mathematics, <br /> Urumqi education institute <br /> Urumqi, China <br /> Associate Professor <br /> Duties: Teaching three undergraduate-level course; Undergraduate class advisor; Advisor of the undergraduate graduation design; Doing research on the stochastic input-output economic. <br /> <br /> September, 1984 - December, 1992 <br /> Department of Mathematics, <br /> Urumqi education institute <br /> Urumqi, China <br /> Lectorate, Teaching Assistant <br /> Duties: Teaching six undergraduate-level courses; Undergraduate class advisor; Advisor of the undergraduate graduation design; Doing research on the Economic System Analysis and the method of probability and statistics. <br />"
    },
    {
        "name": "李鹏同",
        "userImg": "teacher/lipt.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "基础数学、应用数学",
        "researchDirection": "算子理论与算子代数、框架理论及应用",
        "scientificResearch": "科研项目: <br /> {3] 国家自然科学基金: 框架中若干问题的研究(11171151)，2012.01-2015.12，主持. <br /> {2] 国家自然科学基金: 自反算子代数的分类、几何结构和广义逆(10771101), 2008.01-2010.12, 主持. <br /> {1] 南京航空航天大学-科研创新基金:完全分配交换子空间格代数的若干问题, 2005.9-2007.8, 主持. <br />",
        "academicExperience": "1980.9―1984.7, 曲阜师范大学数学系，本科. <br /> 1988.9―1991.7, 曲阜师范大学数学系，硕士. <br /> 1998.9―2001.6, 浙江大学数学系，博士. <br /> 2001.6―2003.6, 南京大学数学系，博士后. <br /> 2009.2―2009.8, 美国University of Central Florida 访问学者. <br />",
        "other": "pengtongli@nuaa.edu.cn"
    },
    {
        "name": "徐江",
        "userImg": "teacher/xujiang.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "基础数学,偏微分方程",
        "researchDirection": "流体力学中的偏微分方程、调和分析",
        "socialAppointments": "(1) 数学学科著名SCI期刊《SIAM J. Math. Anal.》、《Annales de l'Institut Henri Poincare (C) Analyse Non Lineaire》,《Math. Models Methods Appl.Sci.》等的审稿； <br /> (2) 国家自然科学基金通讯评审专家； <br />",
        "honorary": "教育部“新世纪优秀人才支持计划”入选者 (the Program for New Century Excellent Talents in University)",
        "scientificResearch": "借助调和分析的工具，研究具有退化耗散结构的双曲型方程组的整体适定性与渐近稳定性问题。在国内外期刊上正式出版三十多篇论文，部分研究成果出版在《Arch. Rational Mech. Anal.》,《J. Math. Pures Anal.》, 《SIAM J. Math. Anal.》, 《J. Differential Equations》,《Math. Models Methods Appl. Sci.》,《Discrete Cont. Dyn. S-A》等国际著名数学期刊上。研究工作获得国家自然科学基金项目、新世纪优秀人才科研基金项目，中国博士后特别资助与面上资助项目以及日本科研基金项目的资助。",
        "academicExperience": "2007年6月毕业于浙江大学，获理学博士学位，然后进入南航理学院工作；2012年5月破格晋升教授；2013年5月获博士生指导教师资格；2012年8月，2013年8月分别访问香港中文大学；2013年11月至2014年10月，获得日本科研基金项目的资助访问日本七大帝国大学之一的九州大学，合作导师为S. Kawashima教授（偏微分方程衰减估计的始创人之一，创立世界著名的“Kawashima”条件）。近三年来参加的主要学术活动： <br /> (1) 2014年5月，早稻田大学作学术邀请报告； <br /> (2) 2014年3月，参加Gakushuin University举办的“MSJ Spring Meeting 2014”(日本数学会2014年度春季年会)； <br /> (3) 2014年3月，Kawashima教授组织的“Partial Differential Equations and Mathematical Analysis for Young Researchers”会议； <br /> (4) 2014年1月, 九州大学举办的国际会议“The 31st Kyushu Symposium on Partial Differential Equations”； <br /> (5) 2013年12月，九州地区偏微分方程研讨会； <br /> (6) 2013年11月，九州大学举办的国际会议“Mathematical Analysis of Nonlinear Partial Differential Equations”暨S. Kawashima教授60周岁纪念国际会议； <br /> (7) 2013年11月，九州大学举办的国际会议“Kyushu-Euskadi 2013 Workshop on Applied Mathematics”； <br /> (8) 2013年8月，香港中文大学数学系访问； <br /> (9) 2013年7月，京都大学Research Institute for Mathematical Sciences举办的国际会议“Mathematical Analysis in Fluid and Gas Dynamics”； <br /> (10) 2013年7月，京都大学Research Institute for Mathematical Sciences举办的国际会议“Harmonic Analysis and Nonlinear Partial Differential Equations”； <br /> (11) 2013年6月，浙江大学举办的的国际会议“International Conference on Analysis,Modeling and Computations of Complex Fluids”； <br /> (12) 2013年4月，上海师范大学数学系访问； <br /> (13) 2013年1月，江苏省2012年数学年会； <br /> (14) 2012年10月，浙江师范大学数学系举办的“偏微分方程研讨会”； <br /> (15) 2012年9月，香港中文大学数学系访问； <br /> (16) 2012年9月，浙江师范大学数学系访问； <br /> (17) 2012年2月，九州大学访问，参加S. Kawashima教授组织的“Partial Differential Equations and Mathematical Analysis for Young Researchers”会议； <br /> (18) 2011年11月，2011年度长江三角洲偏微分方程学术研讨会； <br /> (19) 2011年10月，国际会议“Third China-Japan Workshop on Mathematical Topics from Fluid Mechanics”； <br /> (20) 2011年9月，由复旦大学陈恕行教授主持的重点项目与南京航空航天大学理学院共同资助举办的“偏微分方程发展学术研讨会” 中承担主要组织工作； <br /> (21) 2011年6月，浙江大学举办的国际会议“Hangzhou Conference on Harmonic Analysis and PDEs”。 <br />",
        "other": "E-mail: jiangxu_79@nuaa.edu.cn, 欢迎对PDE有兴趣的优秀本科生，硕士研究生报考！"
    },
    {
        "name": "王正盛",
        "userImg": "teacher/wangzhengsheng.png",
        "jobTitle": "教授",
        "position": "副院长",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "数值代数，科学与工程计算",
        "socialAppointments": "1.江苏省计算数学学会理事； <br /> 2.美国数学会Math. Review评论员； <br /> 3.《Applied Mathematics and Computation》、《高等学校计算数学学报》、《山东大学学报》、《中国科学院大学学报》、《江苏大学学报》、《AISS》等期刊审稿人。",
        "honorary": "1. 2012年10月获南京航空航天大学“60周年校庆”天府特别奖教金一等奖； <br /> 2. 2012年南京航空航天大学“良师益友―我最喜爱的导师”； <br /> 3. 2011年全国大学生数学建模竞赛江苏赛区优秀组织工作者； <br /> 4. 2011年南京航空航天大学第一届本科留学生教学优秀奖一等奖； <br /> 5. 2011年南京航空航天大学优秀硕士学位论文指导教师； <br /> 6. 2011年南京航空航天大学2011届毕业生“记忆最深刻的老师”； <br /> 7. 2008-2009年度南京航空航天大学本科优秀毕业设计（论文）指导教师； <br /> 8. 2008年南京航空航天大学首届“优秀青年教师奖”； <br /> 9. 2007年南京航空航天大学优秀教学成果二等奖（项目负责人）； <br /> 10. 2006年南京航空航天大学奖教金二等奖； <br /> 11. 2003-2005年度南京航空航天大学教学优秀二等奖。",
        "scientificResearch": "主要从事计算数学专业数值代数方向的研究，研究兴趣包括：矩阵理论与计算、振动中的反问题、科学与工程计算及软件等。 <br /> 曾主持完成南京航空航天大学青年科研基金项目、振兴理科科研项目等3项，曾参加国家自然科学基金3项、省自然科学基金和航空基金等3项。目前主持专项科研项目1项，参加国家自然科学基金1项（项目组第一成员）。 <br /> 现指导硕士研究生3名。",
        "academicExperience": "2012年11月-2013年11月, 美国Kent State University，公派访问学者； <br /> 2009年10月-12月, 中科院计算数学与科学工程计算研究所，访问学者； <br /> 2005年10月-12月, 澳大利亚Swinburne University of Technology, 访问学者。",
        "other": "讲授主要课程： （1）Matrix Theory（国际留学硕士生，工科硕士生）； （2）Numerical analysis（国际留学生）； （3）大规模矩阵问题的数值计算； （4）应用软件（硕士生）； （5）线性代数； （6）应用软件基础； （7）计算方法； （8）现代控制理论； （9）数学建模。 担任全国大学生和研究生数学建模竞赛教练。 出版著作、教材： {1]《MATLAB与科学计算》（独立编著），国防工业出版社，2011； {2]《数值计算方法》（第二作者），高等教育出版社，2012； {3]《数值计算方法》（第二作者），科学出版社，2010； {4]《高等数学》（上册副主编，下册主编），科学出版社，2008； {5]《Numerical analysis with MATLAB》（英文），南京航空航天大学校内讲义（国际留学生教材），2006； {6]《Matrix Theory》（英文），南京航空航天大学校内讲义（国际留学生教材），2009。 已发表教学研究论文5篇： {1] 王正盛，李鹏同. 外国留学生数学基础课程教学的实践与探讨. 南京航空航天大学学报（高等教育研究），2010年12月； {2]王正盛，中外线性代数教材的比较与探讨，大学数学，25卷，第1期，2009； {3]王正盛、戴华等，工科研究生“矩阵论”课程教学的实践与探讨，理工高教研究，23卷，第4期，2004； {4]王正盛，数学软件在工科数学教学中的应用，南航学报社科版，2002。 联系方式：wangzhengsheng@nuaa.edu.cn"
    },
    {
        "name": "戴华",
        "userImg": "teacher/daih.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "数值代数，科学与工程计算",
        "socialAppointments": "1. 中国计算数学学会理事； <br /> 2. 江苏省工业与应用数学学会副理事长； <br /> 3. 《Numerical Algebra, Control and Optimization》编委； <br /> 4. 《高等学校计算数学学报》编委； <br /> 5. 《南京航空航天大学学报》（中、英文版）编委； <br /> 6. 《江苏大学学报》（自然科学版）编委。",
        "honorary": "1. 2001年被评为“全国优秀教师”； <br /> 2. 2003年被评为“江苏省教学名师”； <br /> 3. 2005年享受政府特殊津贴。",
        "scientificResearch": "1. 先后承担国家自然科学基金、江苏省自然科学基金等项目11项； <br /> 2. 发表期刊论文150余篇，出版著作2部； <br /> 3. 2000年“代数特征值反问题理论、方法及应用研究”获江苏省科技进步三等奖。",
        "academicExperience": "1994.2―1995.1 加拿大Calgary大学数学和统计系, 访问学者； <br /> 1998.3―1998.8 法国CERFACS(欧洲科学计算研究中心), 访问学者. <br /> 2007年3月-5月 中国科学院科学与工程计算国家重点实验室， 访问教授 <br /> 2008年3月-5月 中国科学院科学与工程计算国家重点实验室， 访问教授",
        "other": "hdai@nuaa.edu.cn"
    },
    {
        "name": "赵洪涌",
        "userImg": "teacher/zhaohy.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "时滞微分方程、网络动力学与控制、动力系统理论与应用",
        "socialAppointments": "1.Editor of Journal of Applied Mathematics; <br /> 2.Editor of Mathematical Problems in Engineering <br /> 3.曾担任多个国际会议程序委员会委员; <br /> 4.国家自然科学基金通讯评议专家 <br /> 5.教育部学位与研究生教育发展中心学位论文和优秀学位论文通讯评议专家 <br /> 6.合肥学院网络与智能信息处理实验室学术委员会副主任",
        "honorary": "2006年被评为江苏省高校＂青蓝工程＂优秀青年骨干教师；2012年被评为江苏省高校＂青蓝工程＂中青年学术带头人.",
        "scientificResearch": "已完成主要科研项目： <br /> 1.2002-2004年, 作为主研参加国家自然科学基金一项. 结题。 <br /> 2.2006-2008年，作为主研参加安徽省教育厅自然科学基金项目.结题。 <br /> 3.2006-2009年，主持江苏“青蓝工程”青年骨干教师项目.结题。 <br /> <br /> 在研项目： <br /> 1. 主持国家自然科学基金一项。 <br /> 2. 作为第一主研参加国家自然科学基金一项。 <br /> 3. 主持江苏省高校＂青蓝工程＂中青年学术带头人项目",
        "academicExperience": "1998-2001年6月，四川大学攻读博士学位； <br /> 2001年7月-2003年7月，南京大学博士后流动站工作",
        "other": "欢迎有兴趣的同学报考（硕、博）研究生. E-amil: zhaohy@nuaa.edu.cn"
    },
    {
        "name": "刘心声",
        "userImg": "teacher/liuxingsheng.png",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "博导",
        "college": "理学院",
        "profession": "概率论与数理统计",
        "researchDirection": "应用概率统计",
        "socialAppointments": "江苏省概率统计学会常务理事；国际一般系统论研究会中国分会概率统计系统专业理事会理事；江苏省现场统计研究会常务理事；国家自然科学基金通讯评议专家等。",
        "scientificResearch": "主要研究贝叶斯网络等统计模型和方法，及其在前沿交叉领域（如生物信息、数理金融）中的应用；随机系统（如神经系统、生态系统、社会经济系统）的演化动态分析。已在Proteins, Amino Acids, Gene, Biochemical and Biophysical Research Communications, Journal of Theoretical Biology, The Annals of the Institute of Statistical Mathematics, The Canadian Journal of Statistics, Computational Statistics and Data Analysis, Metrika, Computational Statistics等杂志上发表学术论文40余篇，单篇最高他引40多次。主持2项国家自然科学基金面上项目，参与1项国家自然科学基金重点项目和1项973子项目等的研究。",
        "academicExperience": "厦门大学数学系获理学硕士学位，方向为应用随机过程。南京大学数学系获理学博士学位，方向为数理统计。南京大学物理系博士后，研究方向为生物信息学及生物序列分析。英国Brunel大学和德国Luebeck大学访问研究员。",
        "other": "欢迎报考；欢迎在读本科生提前联系进入软件计算和课题研究。 Email: xsliu@nuaa.edu.cn"
    },
    {
        "name": "王泽军",
        "jobTitle": "教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "偏微分方程"
    },
    {
        "name": "文杰",
        "userImg": "teacher/wenjie.png",
        "jobTitle": "副教授",
        "educationDegree": "硕士",
        "mentorCategory": "其它",
        "profession": "计算数学",
        "college": "理学院",
        "researchDirection": "最优化， 非线性控制"
    },
    {
        "name": "刘文忠",
        "userImg": "teacher/liuwenzhong.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "图论及其算法 、 拓扑图论",
        "socialAppointments": "《Ars Combinatoria》、《中国科学 A》的审稿人。",
        "scientificResearch": "1.主持 中国博士后基金第52批面上资助， 2012.10-2013.3. <br /> 2.主持 南京航空航天大学青年科技创新基金， 2012.1-2013.12.",
        "academicExperience": "2007年7月毕业于北京交通大学运筹学与控制论专业，获理学博士学位。",
        "other": "联系方式：wzhliu7502@nuaa.edu.cn; 联系电话：025－52075621（办） 欢迎有兴趣的同学报考。"
    },
    {
        "name": "陈克兵",
        "userImg": "teacher/chenkebin.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "系统优化，经济与管理中的博弈分析，供应链管理",
        "socialAppointments": "International Journal of Engineering and Industries(IJEI)(Editor) <br /> Journal of Management Science and Practice(MSP)(Editor) <br /> <br /> 下列杂志的评审员： <br /> Automatica；European Journal of Operational Researches；International Journal of Production Economics；International Journal of Production Research；Transportation Research Part E: Logistics and Transportation Review；Computers &amp; Industrial Engineering；Applied Mathematical Modelling；Journal of Industrial and Management Optimization；Economic Modelling；International Journal of Management Science and Engineering Management；International Journal of Computer Applications in Technology；Journal of Service Science and Management等十余个国际期刊杂志。",
        "scientificResearch": "科研项目有： <br /> {1] （主持人）国家自然科学基金项目一项，研究时间2013.1-2015.12； <br /> {2] （主持人）江苏省自然科学基金项目一项，研究时间2012.7-2015.7； <br /> {3] （主持人）中国第48批博士后科学基金资助项目一项，研究时间2010.7-2012.7；（已结题） <br /> {4] （主持人）中国江苏省博士后科学基金资助项目一项，研究时间2010.9-2012.7；（已结题）。 <br />",
        "academicExperience": "2006年6月获武汉大学，理学博士学位。 <br /> 研究工作经历： <br /> 2006年至今，南京航空航天大学，理学院数学系，教学与科研；2010年－2012年，南京航空航天大学，经济与管理学院博士后； <br /> 2005年3月至同年6月，中国科学院数学与系统科学研究院学习； <br /> 2001年-2006年，武汉大学数学与统计学院硕博连读研究生。",
        "other": "联系方式：E-Mail: kbchen@nuaa.edu.cn"
    },
    {
        "name": "陈晓红",
        "userImg": "teacher/chenxiaohong.png",
        "jobTitle": "副教授",
        "educationDegree": "硕士",
        "mentorCategory": "其它",
        "profession": "基础数学",
        "college": "理学院",
        "researchDirection": "模式识别"
    },
    {
        "name": "王东红",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "计算数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "蒋辉",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "概率论与数理统计",
        "researchDirection": "随机过程统计，大偏差理论，随机分析",
        "socialAppointments": "Reviewer of Mathematical Reviews",
        "scientificResearch": "主持: <br /> (1)国家自然科学青年基金&quot;O-U型过程与G-随机微分方程中若干渐近性质的研究&quot;（11101210）2012.01-2014.12. <br /> (2)数学天元基金&quot;随机过程统计中参数估计的大偏差与中偏差原理&quot;（10926131）2010.01-2010.12. <br /> (3)第53批国家博士后基金(2013M531341),2013.05-2015.02. <br /> (4)南京航空航天大学基本科研业务费专项科研项目以及理工融合项目,2010-2012,2013-2014. <br /> <br />",
        "academicExperience": "2003-2008 武汉大学数学与统计学院",
        "other": "联系方式：huijiang@nuaa.edu.cn"
    },
    {
        "name": "蒋建林",
        "jobTitle": "副教授",
        "position": "系副主任、支部书记",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "设施选址模型的研究与应用、数值最优化、线性与非线性规划",
        "socialAppointments": "中国运筹学会会员 <br /> <br /> European Journal of Operational Research (SCI) 固定审稿人 <br /> Applied Mathematics and Computation (SCI)固定审稿人 <br /> Journal of Inequalities and Applications (SCI) 固定审稿人 <br /> Asia-Pacific Journal of Operational Research (SCI)固定审稿人 <br /> Advances in Operations Research 固定审稿人 <br />",
        "honorary": "1. 指导的硕士研究生程坤2013年获国家奖学金，并于2014年获南京航空航天大学“优秀毕业研究生” <br /> <br /> 2. 2013年指导全国研究生数学建模竞赛获全国一等奖1项，三等奖3项 <br /> <br /> 3. 2013年获南京航空航天大学校长通令嘉奖（指导研究生数学建模竞赛） <br /> <br />",
        "scientificResearch": "主要研究兴趣是最优化和设施选址。设施选址问题是指在一定的空间（如平面）上寻找合适的位置建造新的设施（如消防站、仓库等），使得这些设施为顾客（如居民点、零售点）提供服务时某些目标达到最优，如最小化运输费用，最大化利润，最公平的服务等。设施选址与物流和供应链有着密切联系，在现实生活中有着广泛的应用。选址问题本质上都是是最优化问题。我的研究工作是提出最优化理论和方法求解实际的选址问题，这是一个比较有意义的研究工作。",
        "academicExperience": "1996.9-2000.6 南京大学 数学系 本科 学士学位 <br /> <br /> 2000.9-2005.6 南京大学 数学系 硕博连读 博士学位 <br /> <br /> 2005.6-至今 南京航空航天大学 理学院 <br /> <br /> 2009.2-2010.2 新加坡国立大学 工业与系统工程系 Research Fellow <br /> <br /> 2012.7-2012.9 香港浸会大学 数学系 Visiting Research Scholar",
        "other": "Email: jiangjianlin_nju@yahoo.com， jiangjianlin_nju@163.com； Tel: 13913874754"
    },
    {
        "name": "杨瑞芳",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "偏微分方程，流体力学"
    },
    {
        "name": "朱学红",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "概率论与数理统计",
        "researchDirection": "随机过程，随机分析与随机控制"
    },
    {
        "name": "马儒宁",
        "userImg": "teacher/maruning.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "计算机视觉、图像处理、模式识别",
        "socialAppointments": "“自动化学报”“中国图象图形学报”“J. Contr. Theo. App”“南京航空航天大学学报（英文版）”等期刊的审稿专家",
        "scientificResearch": "南京航空航天大学理学院“视觉计算研究组”发起人和负责人。 <br /> 目前主要研究兴趣： <br /> （1）聚类算法的研究以及在图像分割、目标识别等的应用； <br /> （2）计算机视觉，自然图像特征提取，图像检索与目标检测。",
        "academicExperience": "1999年吉林大学基础数学，硕士学位 <br /> <br /> 2003年复旦大学应用数学，博士学位",
        "courseLinks": "http://science.nuaa.edu.cn/vcrg/",
        "other": "Email: mrning@nuaa.edu.cn Phone: 18952018971 欢迎有意读研究生的同学提前与我联系 研究主页：http://science.nuaa.edu.cn/vcrg/"
    },
    {
        "name": "杨秀绘",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "计算数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "朱君",
        "userImg": "teacher/zhujun.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "计算数学",
        "scientificResearch": "主持项目： <br /> 1)非结构自适应网格...... 课题代码 Y0424-081 项目代码 1008-274024。 <br /> 2)二维非结构网格多目标区域......。 <br /> 3）国家自然科学青年基金（11002071）； <br /> 参与项目： <br /> 3) 国家自然科学基金项目“多介质流体界面不稳定性......&quot;排名第二（参与人中排名第1) 2006-2008。 <br /> 4) 国防预研基金“二维与三维多介质流体力学......&quot; 排名第二(参与人中排名第1) 2005-2007。 <br /> 5) “十五”预研项目“高效、......”排名第三(参与人中排名第2) 2001-2005。 <br /> 6) 国家自然科学基金 “多介质流动问题......”。 排名第二(参与人中排名第1)。",
        "academicExperience": "1995-1999 南京信息工程大学 数学系 信息与计算科学专业 理学学士 <br /> 1999-2002南京航空航天大学 理学院数学系 理学硕士 <br /> 2002-2006南京航空航天大学 航空宇航学院空气动力学系 理学博士 <br /> 2006-2008南京大学 数学系 博士后(理学) <br /> 2009.7.中科院计算数学与科学工程计算研究所 访问学者 <br /> 2010-2011新加坡国立大学 机械工程系 博士后(工学) <br />",
        "other": "欢迎有志于从事计算数学方向研究工作的同学提前与我邮件联系，Email: zhujun@nuaa.edu.cn 。"
    },
    {
        "name": "毛徐新",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "基础数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "王丽平",
        "userImg": "teacher/wangliping.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "稀疏优化算法，优化模型与算法在模式识别与人工智能中的应用",
        "socialAppointments": "中国运筹学会理事",
        "scientificResearch": "发表论文十几篇，主持、参与科研基金六项，与国内外知名教授交流合作。",
        "academicExperience": "1.2004年7月毕业于中国科学院计算数学与科学工程计算研究所，获博士学位，导师：袁亚湘院士。 <br /> 2.2009年2月至2010年2月赴巴西巴拉纳联邦大学学术访问一年，合作导师：袁锦昀院士（巴西）。 <br /> 3.2012年8至今，南京航空航天大学计算机科学与技术在职博士后，合作导师：陈松灿教授。",
        "other": "工作与科研之外的兴趣爱好：看电影，游泳（蛙泳和自由泳）、打乒乓球；人生中最重要的事：爱家人、爱生活。Email:wlpmath@nuaa.edu.cn"
    },
    {
        "name": "张丽萍",
        "userImg": "teacher/zhangliping.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "生物数学、生物医学工程",
        "other": "E-mail: lpzhang@nuaa.edu.cn"
    },
    {
        "name": "肖光世",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "同调代数，环论,数论与密码学",
        "honorary": "江苏省线性代数精品课程建设者之一",
        "scientificResearch": "已发表教学科研论文16篇，其中核心以上刊物12篇。 <br /> 获得国家自然基金专项基金（数学天元基金）项目资助，参加国家项目三项。"
    },
    {
        "name": "孟彬",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "泛函分析，算子理论，算子代数",
        "socialAppointments": "美国数学会《math.review&gt;&gt;评论员 <br /> 德国《Zentralblatt MATH》评论员 <br /> Science world journal-math analysis(SCI期刊）编委",
        "other": "E-mail: bmengnuaa@gmail.com"
    },
    {
        "name": "张琦",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "应用数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "郭雨珍",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "生物信息的优化应用"
    },
    {
        "name": "许克祥",
        "userImg": "teacher/xukexiang.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "图论及其应用（含代数图论与化学图论），组合最优化",
        "socialAppointments": "1. Reviewer of Mathematical Reviews (No. 079359) <br /> 2. Editor of Open Journal of Discrete Mathematics <br /> 3. Editor of Current Advances in Mathematics <br /> 4. Refereeing for these international journals below and some other Chinese journals (not listed here): <br /> (1) Advances and Applications in Discrete Mathematics <br /> (2) Ars Combinatorica （SCI） <br /> (3) Applied Mathematics Letters (SCI) <br /> (4) Applied Mathematics and Computation (SCI) <br /> (5) Carpathian Journal of Mathematics (SCI) <br /> (6) Computers and Mathematics with Applications （SCI） <br /> (7) Discrete Applied Mathematics （SCI） <br /> (8) Discrete Mathematics (SCI) <br /> (9) Discrete Mathematics, Algorithms and Applications <br /> (10) Discussiones Mathematicae Graph Theory <br /> (11) Journal of Applied Mathematics and Computing (EI) <br /> (12) Journal of Applied Mathematics and Informatics <br /> (13) Journal of Combinatorial Optimization (SCI) <br /> (14) Linear Algebra and Its Applications (SCI) <br /> (15) MATCH Communications in Mathematical and in Computer Chemistry （SCI） <br /> (16) Mathematical and Computer Modelling （SCI） <br /> (17) Transactions on Combinatorics <br /> (18) Utilitas Mathematica (SCI) <br /> <br />",
        "honorary": "曾被评为2006年度南航大理学院优秀本科生导师",
        "scientificResearch": "在核心刊物上发表或接受发表论文43篇（包括SCI收录30篇，其中第一作者19篇；EI收录3篇,其中第一作者2篇）",
        "academicExperience": "曲阜师范大学 数学教育 大学本科 学士毕业于2000．06 <br /> 东南大学 运筹学与控制论 硕士研究生 硕士毕业于2003．03 <br /> 南京师范大学 基础数学 博士研究生 博士毕业于2009. 06 <br />",
        "other": "E-mail:xkx_seu@126.com"
    },
    {
        "name": "胡志斌",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "应用数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "刘皞",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "数值代数",
        "other": "hliu@nuaa.edu.cn"
    },
    {
        "name": "曹峰",
        "userImg": "teacher/caofeng.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "微分方程与动力系统",
        "scientificResearch": "研究方向为微分方程与动力系统，研究分支包括单调动力系统，反应扩散方程与无限维动力系统。研究成果发表在国际数学杂志Proc. London Math. Soc.，J. Dynam. Differential Equations，Proc. Amer. Math. Soc.等上。研究工作获得国家自然科学青年基金，教育部博士点新教师基金，中国博士后科学基金，江苏省博士后科研基金，南京航空航天大学青年科技创新基金和南航理工融合专项科研基金的资助。",
        "academicExperience": "教育经历： <br /> 2000.9-2004.7 中国科技大学 数学与应用数学 本科 <br /> 2004.9-2009.6 中国科技大学 基础数学 硕博 <br /> 访问经历： <br /> 2013年7、8月 访问德国Technische Universitaet Dresden，并做学术报告",
        "other": "email: fcao@nuaa.edu.cn cell phone: 18652062272 讲授本科生课程：《数学分析》、《高等数学I》、《高等数学II》、《数学物理方程》、《计算方法》。"
    },
    {
        "name": "龚荣芳",
        "userImg": "teacher/gongrongfang.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "微分方程数值解，医学成像，反问题的数值解法",
        "scientificResearch": "主持中国博士后科学基金(20100471334)、江苏省博士后基金(1001070C)、江苏省自然科学基金青年基金各一项。",
        "academicExperience": "学习经历： <br /> 1999.09－2003.06 南昌大学 数学与应用数学 本科 <br /> 2004.09－2006.06 武汉大学 计算数学 硕士 <br /> 2006.09－2009.06 浙江大学 计算数学 博士 <br /> <br /> 工作经历： <br /> 2003.07－2004.8 南昌工程学院数学系 助教 <br /> 2006.07－2012.4 南京航空航天大学数学系 讲师 <br /> 2012.05至今 南京航空航天大学数学系 副教授",
        "other": "grf_math@nuaa.edu.cn"
    },
    {
        "name": "崔庆",
        "userImg": "teacher/cuiqing.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "图论",
        "academicExperience": "2000.09-2004.07 山东大学数学学院 本科； <br /> 2004.09-2009.06 南开大学组合数学中心 硕博连读； <br /> 2009.06-至今 南京航空航天大学理学院数学系 工作.",
        "other": "E-mail: cui@nuaa.edu.cn."
    },
    {
        "name": "任凤丽",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "应用数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "董建平",
        "userImg": "teacher/dongjianping.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "分数阶微积分及其应用：分数阶量子力学/复杂系统",
        "scientificResearch": "主持教育部博士点基金项目一项, <br /> 主持国家自然科学基金理论物理专项基金项目一项.",
        "academicExperience": "学习经历： <br /> 2000.9-2004.7 山东大学 应用数学 本科 <br /> 2004.9-2009.6 山东大学 应用数学 硕博连读 <br /> <br /> 工作经历： <br /> 2009.7-至今，南航理学院数学系 <br /> <br />",
        "other": "E-mail: dongjianping@nuaa.edu.cn, dongjp.sdu@gmail.com"
    },
    {
        "name": "刘萍",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "profession": "基础数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "周良强",
        "userImg": "teacher/zhouliangqiang.png",
        "jobTitle": "副教授",
        "educationDegree": "博士",
        "mentorCategory": "硕导",
        "profession": "应用数学",
        "college": "理学院",
        "researchDirection": "稳定性，分岔，混沌动力学",
        "socialAppointments": "《ACTA ASTRONAUTICA》《APPLIED MATHEMATICS AND COMPUTATION》《电路与系统学报》《应用力学学报》等期刊审稿人。",
        "scientificResearch": "1.国家自然科学基金青年科学基金项目：11202095：高维非线性气动弹性系统动力学及其在高超声速巡航飞行器中的应用，经费28万，2013.1-2015.12，主持； <br /> 2.国家博士后基金特别资助项目：2013T60531：高超声速乘波体巡航飞行器模型的全局动力学研究，经费15万，2013-， 主持； <br /> 3.国家博士后基金面上项目：20090450765：飞行器机翼、尾翼在高超声速环境下颤振问题的全局分岔与混沌动力学研究，2009-2010，经费3万，主持: <br /> 4.国家博士后基金面上项目：20110491419：高超声速飞行器模型中高维气动弹性系统的全局动力学研究，2011-2013，经费3万，主持； <br /> 5.南京航空航天大学青年科创基金项目：NS2012061：高维非线性气动弹性系统动力学及其在大展弦比机翼中的应用研究，2012-2013，经费5万，主持； <br /> 6.南京航空航天大学理工融合专项基金项目：NZ2013213：高超声速乘波飞行器几何参数化建模及其动力学研究， 2013-2014， 经费6万，主持； <br /> 7.南京航空航天大学科研启动基金项目：高维非线性系统的分岔与混沌动力学及其在工程中的应用，2010-2011，经费3.5万，主持； <br /> 8.国家自然科学基金项目(11172125)：高超音速乘波飞行器若干动力学问题的研究，2012.1-2015.12，经费65万，第一参加人； <br /> 9.国家自然科学基金项目(10572057)：高维非线性系统分岔及混沌若干问题的研究，2006-2008，经费27万，(第二)参加人； <br /> 10.江苏省自然科学基金项目(BK2006186)：复杂系统多参数稳定性及模态分岔若干问题的研究，2006-2008，经费7万，(第一）参加人；",
        "academicExperience": "2008年7月毕业于南京航空航天大学一般力学与力学基础专业，获理学博士学位，导师：陈芳启教授； <br /> 2008.10-2010.9在天津力学流动站从事博士后研究，合作导师：陈予恕院士。",
        "other": "主讲课程：《数学分析》、《概率论与数理统计II》、《线性代数》、《计算方法》、《信息论基础》。"
    },
    {
        "name": "周含策",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "profession": "基础数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "方谋耶",
        "jobTitle": "讲师",
        "educationDegree": "硕士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "动力系统，复杂网络"
    },
    {
        "name": "王粉兰",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "profession": "运筹学与控制论",
        "college": "理学院"
    },
    {
        "name": "张静",
        "jobTitle": "中级",
        "educationDegree": "博士",
        "profession": "应用数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "张娟",
        "jobTitle": "讲师",
        "educationDegree": "硕士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "基础数学"
    },
    {
        "name": "李艳",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "profession": "概率论与数理统计",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "朱小萌",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "profession": "概率论与数理统计",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "蒋素荣",
        "jobTitle": "讲师",
        "educationDegree": "硕士",
        "profession": "应用数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "朱晓星",
        "jobTitle": "讲师",
        "educationDegree": "硕士",
        "profession": "基础数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "袁泉",
        "jobTitle": "讲师",
        "educationDegree": "硕士",
        "profession": "计算数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "程晓芸",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "profession": "基础数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "潘丽君",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "偏微分方程",
        "scientificResearch": "先后主持承担国家自然科学基金项目1项、江苏省自然科学基金项目1项、中国博士后基金项目1项、校自然科学基金项目4项。在国内外核心学术期刊上发表论文多篇，其中SCI收录7篇,EI收录4篇。"
    },
    {
        "name": "李秀娟",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "profession": "计算数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "沙春林",
        "jobTitle": "讲师",
        "position": "教师（中级）",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "运筹学与控制论",
        "researchDirection": "三维数字化测量技术与装备"
    },
    {
        "name": "钟玲平",
        "userImg": "teacher/zhonglingping.png",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "图论与组合最优化",
        "researchDirection": "图论与组合最优化",
        "other": "lpzhong@126.com"
    },
    {
        "name": "张旭",
        "jobTitle": "中级",
        "educationDegree": "博士",
        "profession": "计算数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "王彤",
        "jobTitle": "中级",
        "educationDegree": "博士",
        "profession": "计算数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "杨熙",
        "userImg": "teacher/yangxi.png",
        "jobTitle": "讲师",
        "position": "Lecturer",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "Dept. Math., Colg. Sci, Nanjing Univ. Aero. Astro.",
        "profession": "计算数学",
        "researchDirection": "Numerical Algebra, Numerical Partial Differential Equations",
        "scientificResearch": "Supported by The National Natural Science Foundation, No. 11101213, P.R. China. (Duration: 2012.1-2014.12)",
        "academicExperience": "2010.7-, Lecturer, Department of Mathematics, College of Science, Nanjing University of Aeronautics and Astronautics, Nanjing, P.R. China. <br /> <br /> 2005.9-2010.6, Doctor Degree in Computational Mathematics, Institute of Computational Mathematics and Scientific/Engineering Computing, Academy of Mathematics and Systems Science, Chinese Academy of Sciences, Beijing, P.R. China. <br /> <br /> 2001.1 - 2005.8, Bachelor Degree in Applied Mathematics, School of Mathematics and Statistics, Wuhan University, Wuhan, P.R. China."
    },
    {
        "name": "赵亮",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "微分几何",
        "scientificResearch": "1. 53批中国博士后基金 <br /> 2. 南京航空航天大学基本科研业务费",
        "other": "赵亮，讲师，于2010年6月在浙江大学数学科学研究中心获得基础数学专业博士学位，研究方向为微分几何，几何与拓扑。随后于2010年7月到南京航空航天大学数学系工作。Email：zhaozongliang09@163.com"
    },
    {
        "name": "黄小涛",
        "jobTitle": "中级",
        "position": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "偏微分方程理论及应用",
        "socialAppointments": "无",
        "honorary": "优秀班主任； <br /> 社会实践优秀指导老师",
        "scientificResearch": "椭圆和抛物型偏微分方程解的正则性研究，最近主要研究分数阶偏微分方程解的性质。"
    },
    {
        "name": "岳高成",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "无穷维动力系统"
    },
    {
        "name": "宋大伟",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "偏微分方程数值解，计算光学",
        "scientificResearch": "主持国家自然科学基金项目1项。",
        "academicExperience": "教育经历： <br /> 2001.9-2005.7 中国科学技术大学 计算数学 本科 <br /> 2005.9-2011.4 中国科学技术大学 计算数学 硕博连读 <br /> <br /> 工作经历： <br /> 2010.9-2012.2 香港城市大学数学系 Research Fellow <br /> 2012.3-至今 南京航空航天大学数学系 讲师"
    },
    {
        "name": "王姗姗",
        "jobTitle": "中级",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "计算数学",
        "researchDirection": "偏微分方程数值解法"
    },
    {
        "name": "姜云波",
        "jobTitle": "中级",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "profession": "应用数学",
        "college": "理学院"
    },
    {
        "name": "廖阳阳",
        "jobTitle": "助研",
        "educationDegree": "本科",
        "profession": "基础数学",
        "mentorCategory": "其它",
        "college": "理学院"
    },
    {
        "name": "吴健",
        "jobTitle": "中级",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "应用数学",
        "researchDirection": "动力系统"
    },
    {
        "name": "陈钢",
        "jobTitle": "讲师",
        "educationDegree": "博士",
        "mentorCategory": "其它",
        "college": "理学院",
        "profession": "基础数学",
        "researchDirection": "微分几何、微分方程"
    }
]
;