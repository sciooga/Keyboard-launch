
chrome.commands.onCommand.addListener(function(command) {
        chrome.tabs.create({ url: chrome.extension.getURL("launch.html") });
});

checkMsg();
chrome.alarms.create('checkMsg', {periodInMinutes: 10});
chrome.alarms.onAlarm.addListener(checkMsg);


//匹配知乎 “新私信”字段 http://www.zhihu.com/inbox
//var a = new RegExp("有(.*?)条新私信");
//a.exec(data)[1];

//http://www.zhihu.com/noti7/new知乎消息：回答关注问题、感谢、关注

//匹配知乎新关注用户名 http://www.zhihu.com/noti7/calendar
//var a = new RegExp("title=\"(.*?)\"");
//a.exec(data)[1];

//匹配V2EX未读消息数 https://www.v2ex.com/settings
//var a = new RegExp("([0-9]*?) 条未读提醒");
//var sign = a.exec(data)[1];


//获取微博总提醒数 http://rm.api.weibo.com/2/remind/push_count.json?source=3818214747
//data['messages'];


function checkMsg(){
    getCookie('newMsg') || bread;
    //check weibo
    if (getCookie('msg_weibo')){
        $.get("http://rm.api.weibo.com/2/remind/push_count.json?source=3818214747",function(data,status){
            if(status == 'success'){
                if(data['messages'] != 0){
                    setCookie('msg_weibo', 'n');
                }else{
                    setCookie('msg_weibo', 't');
                }
            }else{
                alert('微博消息获取失败：' + status);
            }
        });
    }
    //check zhihu new msg
    if (getCookie('msg_zhihu')){
        setCookie('msg_zhihu', 't');
        $.get("http://www.zhihu.com/noti7/new",function(data,status){
            if(status == 'success'){
                var a = new RegExp("0,0,0");
                if(!a.test(data)){
                    setCookie('msg_zhihu', 'n');
                }else{
                    //check zhihu personal letter
                    $.get("http://www.zhihu.com/inbox",function(data,status){
                        if(status == 'success'){
                            var a = new RegExp("有 (.*?) 条新私信");
                            if(a.test(data)){
                                setCookie('msg_zhihu', 'n');
                            }
                        }else{
                            alert('知乎新关注获取失败：' + status);
                        }
                    });
                }
            }else{
                alert('知乎新私信获取失败：' + status);
            }
        });
    }
    //check v2ex
    if (getCookie('msg_v2ex')){
        $.get("https://www.v2ex.com/settings",function(data,status){
            if(status == 'success'){
                var a = new RegExp("([0-9]*?) 条未读提醒");
                var sign = a.exec(data)[1];
                if(sign!='0'){
                    setCookie('msg_v2ex', 'n');
                }else{
                    setCookie('msg_v2ex', 't');
                }
            }else{
                alert('V2EX消息获取失败：' + status);
            }
        });
    }
}