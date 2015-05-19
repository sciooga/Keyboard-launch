/*------Cookie save------*/
function setCookie(cookieName,value,expiresTime,path){
    expiresTime = expiresTime || "Thu, 01-Jan-2030 00:00:01 GMT";
    path = path || "/";
    document.cookie=cookieName+ "=" +encodeURIComponent(value)+ "; expires="+ expiresTime+ "; path="+path;
}
/*------Cookie save------*/


/*------Cookie read------*/
function getCookie(cookieName){
    if (document.cookie.length>0)
    {
        var n_start=document.cookie.indexOf(cookieName + "=");
        if (n_start!=-1){
            n_start=n_start + cookieName.length+1;
            var n_end=document.cookie.indexOf(";",n_start);
            if (n_end==-1) {
                n_end=document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(n_start,n_end));
        }else{
            return "";
        }
    }else{
        return "";
    }
}
/*------Cookie read------*/

/*-----------GETICO START-----------*/
function getico(a) {
    var s = a.indexOf("//");
    temp = a.substring(s + 2);
    var b = temp.indexOf("/");
    if (b == -1) {
        b = temp.length;
    }
    return a.substring(0, b + s + 2) + "/favicon.ico";
}
/*-----------GETICO END-----------*/

/*-----------OPENURL START-----------*/
var newWindow = getCookie('newWindow');
function openURL(u){
    u && (newWindow && window.open(u) || (window.location.href = u));
}
/*-----------OPENURL END-----------*/

/*-----------USESETTING START-----------*/
var now_searchEngineURL;// = 'https://www.baidu.com/baidu';
var now_searchEnginePOST;// = 'word';
var now_backgroundURL;
function useSetting(){
    newWindow = getCookie('newWindow');
    var now_searchEngine = getCookie('searchEngine');
    now_searchEngine == 'Google' && (now_searchEngineURL = 'https://www.google.com.hk/search') && (now_searchEnginePOST = 'q');
    now_searchEngine == 'Bing' && (now_searchEngineURL = 'https://www.bing.com/search') && (now_searchEnginePOST = 'q');
    now_searchEngine == 'Baidu' && (now_searchEngineURL = 'https://www.baidu.com/baidu') && (now_searchEnginePOST = 'word');
    now_searchEngine == 'Other' && (now_searchEngineURL = getCookie('searchEngineURL')) && (now_searchEnginePOST = getCookie('searchEnginePOST'));
    now_backgroundURL = getCookie('backgroundURL');
    var _keyboardBg = $('#keyboardBg');
    now_backgroundURL && _keyboardBg.attr('src',getCookie('backgroundURL')) && _keyboardBg.fadeTo(2000,1) || _keyboardBg.fadeTo(2000,0);
}
/*-----------USESETTING END-----------*/

/*-----------BUILDURL START-----------*/
function buildURL(u){
return u && (RegExp("^((https|http|ftp|rtsp|mms)?://)").test(u) && u || "http://"+u);
}
/*-----------BUILDURL END-----------*/

/*-----------REFRESHICO START-----------*/
function refreshIco(){
for (var i = 48; i < 91; i++) {
                        var u = getCookie(""+i);
                        if (u){
                        $("#"+i).parent().append("<img class='fav' src='"+ getico(u) +"' />");
                        }
                    }
}
/*-----------REFRESHICO END-----------*/

$(document).ready(function(){


                    if ("FLASE" != getCookie("FIRSTTIME")) {
                    setCookie("84", "http://www.taobao.com");
                    setCookie("86", "http://www.v2ex.com");
                    setCookie("87", "http://www.weibo.com");
                    setCookie("89", "http://www.youku.com");
                    setCookie("90", "http://www.zhunpai.com.cn");
                    setCookie('backgroundURL', 'http://t.cn/R2ZvEBX');
                    setCookie('searchEngine', 'Baidu');
                    setCookie("FIRSTTIME", "FLASE");
                    }

                    useSetting();

                    refreshIco();

                    /*this is for plugin
                    function attention(){
                    $('.attention').addClass('attentionBlink');
                    setTimeout("$('.attention').removeClass('attentionBlink')",1600);
                    }
                    attention();
                    var attentionAnimate = setInterval(function(){
                    attention();
                    },3100);*/

                    var _search = $("#search");
                    $(document).keydown(function(event){
                        var keyCode = event.which;
                        if (_search.is(":focus")){
                            if (keyCode == 9){
                                _search.attr('tabindex', '3');//for Firefox
                                _search.blur();
                                window.event.returnValue = false;
                            }
                            if (keyCode == 13){
                                _search.val() && openURL(now_searchEngineURL+'?'+now_searchEnginePOST+'='+_search.val());
                            }
                            //keyCode == 229 when use IME
                            if (keyCode == 229){
                                $(document).keyup(function(event){
                                keyCode = event.which;
                                var button = $("#"+keyCode);
                                button.addClass('keyDownLi');
                                button.parent().addClass('keyDownSpan');
                                setTimeout("$('#"+keyCode+"').removeClass('keyDownLi')",80);
                                setTimeout("$('#"+keyCode+"').parent().removeClass('keyDownSpan')",80);
                                });
                            }
                        //This else for Firefox
                        }else{
                        if (keyCode == 9) {
                        window.event.returnValue = false;
                        _search.focus();
                        }
                        }
                        $("#"+keyCode).addClass('keyDownLi');
                        $("#"+keyCode).parent().addClass('keyDownSpan');
                    });

                    $(document).keyup(function(event){
                        var keyCode = event.which;
                        var button = $("#"+keyCode);
                        button.removeClass('keyDownLi');
                        button.parent().removeClass('keyDownSpan');
                        if (keyCode == 9 || event.ctrlKey || _search.is(":focus") || $("#setting").is(":visible")){
                        window.event.returnValue = false;
                        return false;
                        }else{
                        openURL(getCookie(''+keyCode));
                        }
                    });

                    $("#keyboard ul span").mouseenter(function(){
                    $(this).append("<div class='keySetting'><img id='deleteImg' class='deleteImg' src='delete.png'><img id='settingImg' class='settingImg' src='setting.png'></div><div class='keySettingFix'></div>");//keySettingFix is for Firefox
                    $("#settingImg").click(function(){
                        var _this = $(this);
                        var _parent = _this.parent();
                        var key = _parent.siblings('li').attr("id");
                        //through the prompt() _parent == none in Firefox, and this way(#2) compatible Chrome and Firefox, if just use Chrome you should code like #1
                        //------#2 start------
                        _parent.siblings('.fav').remove();
                        var u = prompt("请输入按键 ['"+_parent.siblings('li').text()+"'] 对应的网址：\n(不以http://、ftp://等开头的网址将自动填充http://)", getCookie(key) || "www.example.com");
                        // '!!u' is check if u == null
                        if (!!u) {
                        u = buildURL(u);
                        setCookie(key, u);
                        }
                        refreshIco();
                        //------#2 end------

                        /*------#1 start------
                        var u = prompt("请输入按键 ['"+_parent.siblings('li').text()+"'] 对应的网址：\n(不以http://、ftp://等开头的网址将自动填充http://)", getCookie(key) || "www.example.com");
                        // '!!u' is check if u == null
                        if (!!u) {
                        u = buildURL(u);
                        setCookie(key, u);
                        _parent.siblings('.fav').remove();
                        _parent.before("<img class='fav' src='"+ getico(u) +"' />");
                        }
                        ------#1 end------*/
                    });

                    $("#deleteImg").click(function(){
                    var _this = $(this);
                    var key = _this.parent().siblings('li').attr("id");
                    setCookie(key, '');
                    _this.parent().siblings('.fav').remove();
                    });
                    $(".keySetting").fadeTo(500, 0.9);
                    });

                    $("#keyboard ul span").mouseleave(function(){
                    $(this).children('[class^=keySetting]').remove();
                    });

                    $("#keyboard ul span li").click(function(){
                    var key = $(this).attr("id");
                    openURL(getCookie(key));
                    });


                    //setting function
                    //bind oninput and onpropertychange(for IE), maybe onpropertychange is unnecessary
                    var _setting = $("#setting");
                    _search.bind('input propertychange', function() {
                    if (_search.val() == 'setting' || _search.val() == '设置'){
                        _setting.fadeTo(500, 0.96);
                        $("#setting img").click(function(){
                        _setting.empty();
                        _setting.animate({
                        width:'760px',
                        height:'330px',
                        top:'5%',
                        marginLeft:'-380px'},500);
                        _setting.html("<form id='settingDetail' style='display:none;margin:26px 60px;'><input type='checkbox' name='newWindow' value='t'/><p>新窗口打开网页（部分浏览器可能会阻止此行为）</p></br><p>选择搜索引擎：&emsp;&emsp;&emsp;</p><input type='radio' name='searchEngine' value='Google' /><p>Google&emsp;&emsp;&emsp;</p><input type='radio' name='searchEngine' value='Bing' /><p>Bing&emsp;&emsp;&emsp;</p><input type='radio' name='searchEngine' value='Baidu' /><p>Buidu</p></br><p>其他搜索引擎：</p><input type='text' name='searchEngineURL' placeholder='eg:g.openibm.com（不使用则留空）' style='width:220px;'/><p>&emsp;post&ensp;key：</p><input type='text' name='searchEnginePOST' placeholder='eg:q' style='width:36px;' /><p>&emsp;https等请自带</p></br><p>背景图片连接：</p><input type='text' name='backgroundURL' placeholder='&emsp;支持所有您能正常访问的图库，不使用则留空' style='width:280px;' /><p>&emsp;同步 bing 背景：t.cn/R2ZvEBX</p></br><p style='color:#c2c2c2'>Lovingly made by sciooga</p></br><p style='margin-top:20px;'><span id='CANCEL' style='cursor: pointer;margin:144px;'>取消</span><span id='OK' style='cursor: pointer;margin:144px;'>保存</span></p></form>");
                        setTimeout("$('#settingDetail').fadeIn(500)",300);
                        //read setting
                        newWindow && ($('input[name=newWindow]')[0].checked = true);
                        var now_searchEngine = getCookie('searchEngine');
                        now_searchEngine == 'Google' && ($('input[name=searchEngine]')[0].checked = true);
                        now_searchEngine == 'Bing' && ($('input[name=searchEngine]')[1].checked = true);
                        now_searchEngine == 'Baidu' && ($('input[name=searchEngine]')[2].checked = true);
                        now_searchEngine == 'Other' && ($('input[name=searchEngineURL]')[0].value = getCookie('searchEngineURL')) && ($('input[name=searchEnginePOST]')[0].value = getCookie('searchEnginePOST'));
                        $('input[name=backgroundURL]')[0].value = getCookie('backgroundURL');
                        //////////////
                        $('input[name=searchEngine]').click(function(){
                        $('input[name=searchEngineURL]')[0].value = '';
                        $('input[name=searchEnginePOST]')[0].value = '';
                        });
                        var _searchEngine = $('input[name=searchEngine]');
                        $('input[name^=searchEngine]').bind('input propertychange', function() {
                        for (var i=0;i<3;i++){_searchEngine[i].checked = false;}
                        });

                            //function for cancel and ok
                            function settingFateOut(){
                            $('#settingDetail').fadeOut(500);
                            setTimeout(function(){

                                _setting.animate({
                                    width:'400px',
                                    height:'50px',
                                    top:'10%',
                                    marginLeft:'-200px',
                                    opacity:'0'
                                },500,function(){$('#setting').html("<p>&emsp;&emsp;&emsp;如果您无意修改设置请将此忽视：</p><img src='setting.png'>")
                                _setting.fadeOut(1);// it will work if somebody quickly input setting twice
                                });

                            },100);
                            }
                            $("#CANCEL").click(function(){
                            settingFateOut();
                            });

                            $("#OK").click(function(){
                            setCookie('newWindow','');
                            $('input[name=newWindow]')[0].checked && setCookie('newWindow','t');
                            for (var i=0;i<3;i++){_searchEngine[i].checked && setCookie('searchEngine',_searchEngine[i].value);}
                            var _searchEngineURL = $('input[name=searchEngineURL]')[0].value;
                            var _searchEnginePOST = $('input[name=searchEnginePOST]')[0].value;
                            _searchEngineURL = buildURL(_searchEngineURL);
                            _searchEngineURL && _searchEnginePOST && setCookie('searchEngine','Other') || setCookie('searchEngineURL',''+_searchEngineURL) || setCookie('searchEnginePOST',''+_searchEnginePOST);
                            setCookie('backgroundURL',buildURL($('input[name=backgroundURL]')[0].value));
                            useSetting();
                            settingFateOut();
                            });

                        });
                    }else{
                        _setting.fadeOut(500);
                    }
                    });
});
