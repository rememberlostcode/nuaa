//var exec = require("child_process").exec;211.149.175.138
var solr_server_host = "211.149.175.138";
var solr_server_port = 8983;
var applicationJson = "application/json; charset=utf-8";
var UserAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36";
var http = require("http");
var redis = require("redis");
var client = redis.createClient(6379,'211.149.175.138');
//var client = redis.createClient(6379,'10.22.23.63');
client.on('error', function (err) {
    console.log('Error ' + err);
});

var pageSize = 10;

function detail(query,response) {
    var req = null;
    var param = '';
    var id = query.key;
    if(id!=null && id!=''){
        var key = 'news@' + id;
        var type = 0;
        client.get(key, function(err, res) {
            // console.log(res);
            var newsdetail = JSON.parse(res);
            if(newsdetail){
                var id = newsdetail.id;
                var result = '{\"headline\":';
                result += JSON.stringify(newsdetail.title);
                result += ',\"keywords\":[{\"name\":\"时间\",\"value\":';
                result += JSON.stringify(newsdetail.modify_time) ;
                result += '},{\"name\":\"发布人\",\"value\":';
                result += JSON.stringify(newsdetail.creater_name);
                result += '}],\"detail\":';
                result += JSON.stringify(newsdetail.content);
                result += ',\"last\":';

                if(newsdetail.type){
                    type = newsdetail.type.toString();
                    param = "&q=type%3A"+type;
                } else {
                    param = "&q=type%3A0";
                }

                var time_s = newsdetail.modify_time.toString();
                param += '&fq=time%3A%5B'+time_s.replace(' ','T').replace(':','%3A')+'Z+*%5D&fq=-id%3A'+id;

                var options = {
                    host: solr_server_host,
                    port: solr_server_port,
                    path: "/solr/nuaa_news/select?wt=json&sort=time+asc&rows=1" + param,
                    headers:{
                        "Content-Type": applicationJson,
                        "User-Agent": UserAgent
                    }
                };
                var req = http.request(options, function(res) {
                    try{
                        res.setEncoding('utf8');
                        res.on('data', function (chunk) {
                            var resss = JSON.parse(chunk);
                            var docs = resss.response.docs;
                            if(docs.length>0 && docs[0]!=null){
                                result +=  '{\"id\":';
                                result +=  JSON.stringify(docs[0].id);
                                result += ',\"content\":';
                                result += JSON.stringify(docs[0].news_title);
                                result += ',\"action\":\"\"}';
                            } else {
                                result += 'null';
                            }
                            result +=',\"next\":';
                            if(newsdetail.type){
                                type = newsdetail.type.toString();
                                param = "&q=type%3A"+type;
                            } else {
                                param = "&q=type%3A0";
                            }
                            param += '&fq=time%3A%5B*+'+time_s.replace(' ','T').replace(':','%3A')+'Z%5D&fq=-id%3A'+id;
                            var options2 = {
                                host: solr_server_host,
                                port: solr_server_port,
                                path: "/solr/nuaa_news/select?q=type%3A"+type+"&wt=json&sort=time+desc&rows=1" + param,
                                headers:{
                                    "Content-Type": applicationJson,
                                    "User-Agent": UserAgent
                                }
                            };
                            var req2 = http.request(options2, function(res) {
                                try{
                                    res.setEncoding('utf8');
                                    res.on('data', function (chunk) {
                                        var resss = JSON.parse(chunk);
                                        var docs = resss.response.docs;
                                        if(docs.length>0 && docs[0]!=null){
                                            result +=  '{\"id\":';
                                            result +=  JSON.stringify(docs[0].id);
                                            result += ',\"content\":';
                                            result += JSON.stringify(docs[0].news_title);
                                            result += ',\"action\":\"\"}';
                                        } else {
                                            result += 'null';
                                        }
                                        result += '}';
                                        //console.log('result:'+result);
                                        response.writeHead(200, {
                                            "Content-Type": applicationJson,
                                            "Access-Control-Allow-Origin":"*",
                                            'Access-Control-Allow-Methods': 'GET',
                                            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                                        response.write(result);
                                        response.end();
                                    });
                                } catch (ee){
                                    console.log(ee.message);
                                }
                            }).on('error', function(e) {
                                    console.log("Got error: " + e.message);
                                    response.writeHead(404, {
                                        "Content-Type": applicationJson,
                                        "Access-Control-Allow-Origin":"*",
                                        'Access-Control-Allow-Methods': 'GET',
                                        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                                    response.write(e.message);
                                    response.end();
                                });
                            req2.end();
                        });
                    } catch (ee){
                        console.log(ee.message);
                    }
                });
                req.on('error', function(e) {
                        console.log("Got error: " + e.message);
                        response.writeHead(404, {
                            "Content-Type": applicationJson,
                            "Access-Control-Allow-Origin":"*",
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                        response.write(e.message);
                        response.end();
                    });
                req.end();
            }
        });
    }

}

function newslist(query,response) {
    var param = '';
    var page = query.page;
    if(page==null || page==''){
        page = 1;
    } else {
        var startnum = (page-1) * pageSize;
        param += '&start='+startnum;
    }
    var rowsnum = query.rows;
    if(rowsnum!=null && rowsnum!=''){
        param += '&rows='+rowsnum;
    }

    var options = {
        host: solr_server_host,
        port: solr_server_port,
        path: "/solr/nuaa_news/select?q=type%3A0&wt=json&sort=time+desc" + param,
        headers:{
            "Content-Type": applicationJson,
            "User-Agent": UserAgent
        }
    };
    var req = http.request(options, function(res) {
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        try{
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                //console.log("chunk: ", chunk);
                var result =  '{\"notices\":[';
                var resss = JSON.parse(chunk);
                var numFound = resss.response.numFound;
                var totalPages =  Math.floor(numFound/pageSize);
                console.log("totalPages: ", totalPages);
                if(numFound%pageSize !=0){
                    totalPages ++;
                }
                var docs = resss.response.docs;
                for(var i=0;i<docs.length;i++){
                    result += '{\"id\":';
                    result += JSON.stringify(docs[i].id);
                    result += ',\"content\":';
                    result += JSON.stringify(docs[i].news_title);
                    result += ',\"time\":';
                    result += JSON.stringify(docs[i].time).substring(0,17).replace('T',' ')+'\"';
                    result += ',\"action\":\"\"}';
                    if(i!=docs.length-1){
                        result += ',';
                    }
                }
                result += ']';
                result += ',\"currentPage\":\"';
                result += page;
                result += '\"';
                result += ',\"totalPages\":\"';
                result += totalPages;
                result += '\"}';
                response.writeHead(200, {
                    "Content-Type": applicationJson,
                    "Access-Control-Allow-Origin":"*",
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                response.write(result);
                response.end();
            });
        } catch (ee){
            console.log(ee.message);
        }
    });
    req.on('error', function(e) {
            console.log("Got error: " + e.message);
            response.writeHead(404, {
                "Content-Type": applicationJson,
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
            response.write(e.message);
            response.end();
        });
    req.end();
}

function noticelist(query,response) {
    var param = '';
    var page = query.page;
    if(page==null || page==''){
        page = 1;
    } else {
        var startnum = (page-1) * pageSize;
        param += '&start='+startnum;
    }
    var rowsnum = query.rows;
    if(rowsnum!=null && rowsnum!=''){
        param += '&rows='+rowsnum;
    }

    var options = {
        host: solr_server_host,
        port: solr_server_port,
        path: "/solr/nuaa_news/select?q=type%3A1&wt=json&sort=time+desc" + param,
        headers:{
            "Content-Type": applicationJson,
            "User-Agent": UserAgent
        }
    };
    var req = http.request(options, function(res) {
        try{
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var result =  '{\"notices\":[';
                var resss = JSON.parse(chunk);
                var numFound = resss.response.numFound;
                var totalPages =  Math.floor(numFound/pageSize);
                console.log("totalPages: ", totalPages);
                if(numFound%pageSize !=0){
                    totalPages ++;
                }
                var docs = resss.response.docs;
                for(var i=0;i<docs.length;i++){
                    result += '{\"id\":';
                    result += JSON.stringify(docs[i].id);
                    result += ',\"content\":';
                    result += JSON.stringify(docs[i].news_title);
                    result += ',\"time\":';
                    result += JSON.stringify(docs[i].time).substring(0,17).replace('T',' ')+'\"';
                    result += ',\"action\":\"\"}';
                    if(i!=docs.length-1){
                        result += ',';
                    }
                }
                result += ']';
                result += ',\"currentPage\":\"';
                result += page;
                result += '\"';
                result += ',\"totalPages\":\"';
                result += totalPages;
                result += '\"}';
                response.writeHead(200, {
                    "Content-Type": applicationJson,
                    "Access-Control-Allow-Origin":"*",
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                response.write(result);
                response.end();
            });
        } catch (ee){
            console.log(ee.message);
        }
    });
    req.on('error', function(e) {
            console.log("Got error: " + e.message);
            response.writeHead(404, {
                "Content-Type": "application/json; charset=utf-8",
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
            response.write(e.message);
            response.end();
        });
    req.end();
}

function searchlist(query,response) {
    var param = '';
    var page = query.page;
    if(page==null || page==''){
        page = 1;
    } else {
        var startnum = (page-1) * pageSize;
        param += '&start='+startnum;
    }
    var rowsnum = query.rows;
    if(rowsnum!=null && rowsnum!=''){
        param += '&rows='+rowsnum;
    }

    var keywords = query.keywords;
    if(keywords==null || keywords==''){
        keywords = '*';
    }

    var options = {
        host: solr_server_host,
        port: solr_server_port,
        path: "/solr/nuaa_news/select?wt=json&hl=true&hl.fl=news_title&sort=time+desc&q=news_title%3A"+encodeURIComponent(keywords)+param,
        headers:{
            "Content-Type": applicationJson,
            "User-Agent": UserAgent
        }
    };
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        try{
            res.on('data', function (chunk) {
                var result =  '{\"searchs\":[';
                var resss = JSON.parse(chunk);
                var numFound = resss.response.numFound;
                var totalPages =  Math.floor(numFound/pageSize);
                console.log("totalPages: ", totalPages);
                if(numFound%pageSize !=0){
                    totalPages ++;
                }
                var docs = resss.response.docs;
                var highlighting = resss.highlighting;
                for(var i=0;i<docs.length;i++){
                    result += '{\"id\":';
                    result += JSON.stringify(docs[i].id);
                    result += ',\"title\":';
                    //console.log(highlighting);
                    result += JSON.stringify(highlighting[docs[i].id].news_title);
                    // result += JSON.stringify(docs[i].news_title);
                    result += ',\"date\":';
                    result += JSON.stringify(docs[i].time).substring(0,17).replace('T',' ')+'\"';
                    result += ',\"autor\":';
                    result += JSON.stringify(docs[i].creater_name);
                    result += ',\"module\":';
                    if(JSON.stringify(docs[i].type)=='0'){
                        result += '\"新闻\"';
                    } else {
                        result += '\"通知\"';
                    }
                    result += ',\"action\":\"\"}';
                    if(i!=docs.length-1){
                        result += ',';
                    }
                }

                result += ']';
                result += ',\"currentPage\":\"';
                result += page;
                result += '\"';
                result += ',\"totalPages\":\"';
                result += totalPages;
                result += '\"}';
                //console.log("result: " + result);
                response.writeHead(200, {
                    "Content-Type": applicationJson,
                    "Access-Control-Allow-Origin":"*",
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                response.write(result);
                response.end();
            });
        } catch (ee){
            console.log(ee.message);
        }
    });
    req.on('error', function(e) {
            console.log("Got error: " + e.message);
            response.writeHead(404, {
                "Content-Type": applicationJson,
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
            response.write(e.message);
            response.end();
        });
    req.end();
}

function reportlist(query,response) {
    var param = '';
    var page = query.page;
    if(page==null || page==''){
        page = 1;
    } else {
        var startnum = (page-1) * pageSize;
        param += '&start='+startnum;
    }
    var rowsnum = query.rows;
    if(rowsnum!=null && rowsnum!=''){
        param += '&rows='+rowsnum;
    }

	var options = {
        host: solr_server_host,
        port: solr_server_port,
        path: "/solr/nuaa_report/select?q=*%3A*&wt=json&sort=time+desc" + param,
        headers:{
            "Content-Type": applicationJson,
            "User-Agent": UserAgent
        }
    };
    var req = http.request(options, function(res) {
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        try{
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                //console.log("chunk: ", chunk);
                var result =  '{\"notices\":[';
                var resss = JSON.parse(chunk);
                var numFound = resss.response.numFound;
                var totalPages =  Math.floor(numFound/pageSize);
                console.log("totalPages: ", totalPages);
                if(numFound%pageSize !=0){
                    totalPages ++;
                }
                var docs = resss.response.docs;
                for(var i=0;i<docs.length;i++){
                    result += '{\"id\":';
                    result += JSON.stringify(docs[i].id);
                    result += ',\"title\":';
                    result += JSON.stringify(docs[i].news_title);
					result += ',\"user\":';
                    result += JSON.stringify(docs[i].creater_name);
					result += ',\"loca\":';
                    result += JSON.stringify(docs[i].address);
                    result += ',\"time\":';
                    result += JSON.stringify(docs[i].time).substring(0,17).replace('T',' ')+'\"';
                    result += ',\"action\":\"\"}';
                    if(i!=docs.length-1){
                        result += ',';
                    }
                }
                result += ']';
                result += ',\"currentPage\":\"';
                result += page;
                result += '\"';
                result += ',\"totalPages\":\"';
                result += totalPages;
                result += '\"}';
                response.writeHead(200, {
                    "Content-Type": applicationJson,
                    "Access-Control-Allow-Origin":"*",
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                response.write(result);
                response.end();
            });
        } catch (ee){
            console.log(ee.message);
        }
    });
    req.on('error', function(e) {
            console.log("Got error: " + e.message);
            response.writeHead(404, {
                "Content-Type": applicationJson,
                "Access-Control-Allow-Origin":"*",
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
            response.write(e.message);
            response.end();
        });
    req.end();
}

function reportdetail(query,response) {
    var req = null;
    var param = '';
    var id = query.key;
    if(id!=null && id!=''){
        var key = 'report@' + id;
        client.get(key, function(err, res) {
            // console.log(res);
            var newsdetail = JSON.parse(res);
            if(newsdetail){
                var id = newsdetail.id;
                var result = '{\"keywords\":[{\"name\":\"报告标题\",\"value\":';
                result += JSON.stringify(newsdetail.title) ;
                result += '},{\"name\":\"报告人\",\"value\":';
                result += JSON.stringify(newsdetail.author) ;
                result += '},{\"name\":\"报告人所在单位\",\"value\":';
                result += JSON.stringify(newsdetail.institution);
				result += '},{\"name\":\"报告日期\",\"value\":';
                result += JSON.stringify(newsdetail.time.substring(0,10));
				result += '},{\"name\":\"报告时间\",\"value\":';
                result += JSON.stringify(newsdetail.time.substring(12,16));
				result += '},{\"name\":\"报告地点\",\"value\":';
                result += JSON.stringify(newsdetail.address);
				result += '},{\"name\":\"报告摘要\",\"value\":';
                result += JSON.stringify(newsdetail.introduction);
				result += '},{\"name\":\"本年度学院报告总序号\",\"value\":';
                result += JSON.stringify(newsdetail.serial_number);
                result += '}],\"last\":';

                var time_s = newsdetail.time.toString();
                param += '&fq=time%3A%5B'+time_s.replace(' ','T').replace(':','%3A')+'Z+*%5D&fq=-id%3A'+id;

				var solrurl = "/solr/nuaa_report/select?q=*%3A*&wt=json&sort=time+asc&rows=1" + param;
                
				var options = {
                    host: solr_server_host,
                    port: solr_server_port,
                    path: solrurl,
                    headers:{
                        "Content-Type": applicationJson,
                        "User-Agent": UserAgent
                    }
                };
                var req = http.request(options, function(res) {
                    try{
                        res.setEncoding('utf8');
                        res.on('data', function (chunk) {
                            var resss = JSON.parse(chunk);
                            var docs = resss.response.docs;
                            if(docs.length>0 && docs[0]!=null){
                                result +=  '{\"id\":';
                                result +=  JSON.stringify(docs[0].id);
                                result += ',\"title\":';
                                result += JSON.stringify(docs[0].news_title);
                                result += ',\"action\":\"\"}';
                            } else {
                                result += 'null';
                            }
                            result +=',\"next\":';
                            param = '&fq=time%3A%5B*+'+time_s.replace(' ','T').replace(':','%3A')+'Z%5D&fq=-id%3A'+id;
                            var solrurl2 = "/solr/nuaa_report/select?q=*%3A*&wt=json&sort=time+desc&rows=1" + param;
							
							var options2 = {
                                host: solr_server_host,
                                port: solr_server_port,
                                path: solrurl2,
                                headers:{
                                    "Content-Type": applicationJson,
                                    "User-Agent": UserAgent
                                }
                            };
                            var req2 = http.request(options2, function(res) {
                                try{
                                    res.setEncoding('utf8');
                                    res.on('data', function (chunk) {
                                        var resss = JSON.parse(chunk);
                                        var docs = resss.response.docs;
                                        if(docs.length>0 && docs[0]!=null){
                                            result +=  '{\"id\":';
                                            result +=  JSON.stringify(docs[0].id);
                                            result += ',\"title\":';
                                            result += JSON.stringify(docs[0].news_title);
                                            result += ',\"action\":\"\"}';
                                        } else {
                                            result += 'null';
                                        }
                                        result += '}';
                                        //console.log('result:'+result);
                                        response.writeHead(200, {
                                            "Content-Type": applicationJson,
                                            "Access-Control-Allow-Origin":"*",
                                            'Access-Control-Allow-Methods': 'GET',
                                            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                                        response.write(result);
                                        response.end();
                                    });
                                } catch (ee){
                                    console.log(ee.message);
                                }
                            }).on('error', function(e) {
                                    console.log("Got error: " + e.message);
                                    response.writeHead(404, {
                                        "Content-Type": applicationJson,
                                        "Access-Control-Allow-Origin":"*",
                                        'Access-Control-Allow-Methods': 'GET',
                                        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                                    response.write(e.message);
                                    response.end();
                                });
                            req2.end();
                        });
                    } catch (ee){
                        console.log(ee.message);
                    }
                });
                req.on('error', function(e) {
                        console.log("Got error: " + e.message);
                        response.writeHead(404, {
                            "Content-Type": applicationJson,
                            "Access-Control-Allow-Origin":"*",
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Allow-Headers': 'X-Requested-With,content-type'});
                        response.write(e.message);
                        response.end();
                    });
                req.end();
            }
        });
    }

}

exports.newslist = newslist;
exports.noticelist = noticelist;
exports.searchlist = searchlist;
exports.detail = detail;
exports.reportlist = reportlist;
exports.reportdetail = reportdetail;