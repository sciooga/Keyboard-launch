
$(document).ready(function(){

                    if ("FLASE" != getCookie("FIRSTTIME")) {
                    setCookie("84", "http://www.taobao.com");
                    setCookie("86", "http://www.v2ex.com");
                    setCookie("87", "http://www.weibo.com");
                    setCookie("89", "http://www.youku.com");
                    setCookie("90", "http://www.zhihu.com");
                    setCookie('newMsg', 't');
                    setCookie('msg_weibo', 't');
                    setCookie('msg_zhihu', 't');
                    setCookie('msg_v2ex', 't');
                    setCookie('searchEngine', 'Baidu');
                    setCookie("FIRSTTIME", "FLASE");
                    }

                    useSetting();

                    chrome.alarms.create('checkMsg', {delayInMinutes: 1});

                    refreshIcoMsg();
                    var refreshIcoMsg5min = setInterval(function(){
                        refreshIcoMsg();
                    },60000);

                    /*-----------attentionAnimate START-----------*/
                    function attention(){
                        $('.attention').toggleClass('attentionBlink');
                    }
                    /*-----------attentionAnimate END-----------*/

                    attention();
                    var attentionAnimate = setInterval(function(){
                        attention();
                    },1500);

                    var _search = $("#search");
                    //append this
                    _search.focus(function(){
                        _search.attr('placeholder','                 输入关键字或网址，Tab 键切换至快捷键盘');//I don`t konw why space work on here not &emsp; ...
                    });
                    _search.blur(function(){
                        _search.attr('placeholder','                                    Tab 键切换至搜索框');//I don`t konw why space work on here not &emsp; ...
                    });
                    /////////////
                    $(document).keydown(function(event){
                        var keyCode = event.which;
                        if (_search.is(":focus")){
                            if (keyCode == 9){
                                _search.blur();
                                window.event.returnValue = false;
                            }
                            if (keyCode == 13){
                                var searchTXT = _search.val();
                                chrome.alarms.create('checkMsg', {delayInMinutes: 1});
                                IsURL(searchTXT.toLowerCase()) && !openURL(buildURL(searchTXT)) || searchTXT && openURL(now_searchEngineURL+'?'+now_searchEnginePOST+'='+_search.val());
                            }
                            //keyCode == 229 when use IME
                            if (keyCode == 229){
                                $(document).keyup(function(event){
                                keyCode = event.which;
                                var button = $("#"+keyCode);
                                button.addClass('keyDownLi');
                                button.parent().addClass('keyDownSpan');
                                setTimeout(function(){button.removeClass('keyDownLi')},80);
                                setTimeout(function(){button.parent().removeClass('keyDownSpan')},80);
                                });
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
                            chrome.alarms.create('checkMsg', {delayInMinutes: 1});
                            openURL(getCookie(''+keyCode));
                        }
                    });

                    $("#keyboard ul span").mouseenter(function(){
                        $(this).append("<div class='keySetting'><img id='deleteImg' class='deleteImg' src='delete.png'/><img id='settingImg' class='settingImg' src='setting.png'/></div>");
                        $("#settingImg").click(function(){
                            var _this = $(this);
                            var _parent = _this.parent();
                            var key = _parent.siblings('li').attr("id");
                            var u = prompt("请输入按键 ['"+_parent.siblings('li').text()+"'] 对应的网址：\n(不以http://、ftp://等开头的网址将自动填充http://)", getCookie(key) || "www.example.com");
                            // '!!u' is check if u == null
                            if (!!u) {
                                u = buildURL(u);
                                setCookie(key, u);
                                _parent.siblings('.fav').remove();
                                _parent.before("<img class='fav' src='"+ getico(u) +"' />");
                            }
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
                        chrome.alarms.create('checkMsg', {delayInMinutes: 1});
                        openURL(getCookie(key));
                    });

});