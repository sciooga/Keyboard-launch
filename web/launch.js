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

/*-----------ISURL START-----------*/
function IsURL(a) {
    //URL have to has '.' or '。'
    if (!RegExp('[.。]').test(a)){ return false; }
    //URL can`t have any space
    if (RegExp(' ').test(a)){ return false; }
    //URL have to start with letter,digital or chinese simplified character
    if (!RegExp('^[A-Za-z0-9\u4e00-\u9fa5]').test(a)){
        return false;
        }
    //common domain name
    if (RegExp('.+[.。](com|cn|org|net|info|club|edu|gov|io)/?(/.+)?$').test(a)){ return true; }
    //IP address
    if (RegExp('^((http|https)://)?((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[.。]){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)/?([:/].+)?$').test(a)){ return true; }
    //have chinese simplified character but not domain name
    if (RegExp('[\u4e00-\u9fa5]').test(a)){
        if (RegExp('.+[.。](测试|佛山|慈善|集团|在线|八卦|公益|公司|移动|我爱你|时尚|淡马锡|商标|商店|商城|工行|中文网|中信|中国|中國|娱乐|谷歌|測試|网店|网络|香港|飞利浦|台湾|台灣|手机|澳門|政府|机构|组织机构|健康|世界|网址|游戏|企业|信息|广东|新加坡|政务)/?(/.+)?$').test(a)){
                return true;
            }else{
                return false;
            }
        }

//all of domain name
//this also work quickly...
switch(RegExp('.+[.。](.)').exec(a)[1]){
/*A*/case 'a':    if (RegExp('.+[.。](abb|abbott|abogado|ac|academy|accenture|accountant|accountants|active|actor|ad|ads|adult|ae|aero|af|afl|ag|agency|ai|aig|airforce|al|allfinanz|alsace|am|amsterdam|an|android|ao|apartments|aq|aquarelle|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|auto|autos|aw|ax|axa|az)/?(/.+)?$').test(a)){ return true; }; break;
/*B*/case 'b':    if (RegExp('.+[.。](ba|band|bank|bar|barclaycard|barclays|bargains|bauhaus|bayern|bb|bbc|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bingo|bio|biz|bj|bl|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boats|bond|boo|boutique|bq|br|bridgestone|broker|brother|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh)/?(/.+)?$').test(a)){ return true; }; break;
/*C*/case 'c':    if (RegExp('.+[.。](ca|cab|cafe|cal|camera|camp|cancerresearch|canon|capetown|capital|caravan|cards|care|career|careers|cars|cartier|casa|cash|casino|cat|catering|cbn|cc|cd|center|ceo|cern|cf|cfa|cfd|cg|ch|channel|chat|cheap|chloe|christmas|chrome|church|ci|cisco|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|corsica|country|coupons|courses|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz)/?(/.+)?$').test(a)){ return true; }; break;
/*D*/case 'd':    if (RegExp('.+[.。](dabur|dad|dance|date|dating|datsun|day|dclk|de|deals|degree|delivery|democrat|dental|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs|dog|doha|domains|doosan|download|durban|dvag|dz)/?(/.+)?$').test(a)){ return true; }; break;
/*E*/case 'e':    if (RegExp('.+[.。](earth|eat|ec|edu|education|ee|eg|eh|email|emerck|energy|engineer|engineering|enterprises|epson|equipment|er|erni|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express)/?(/.+)?$').test(a)){ return true; }; break;
/*F*/case 'f':    if (RegExp('.+[.。](fail|faith|fan|fans|farm|fashion|feedback|fi|film|finance|financial|firmdale|fish|fishing|fit|fitness|fj|fk|flights|florist|flowers|flsmidth|fly|fm|fo|foo|football|forex|forsale|foundation|fr|frl|frogans|fund|furniture|futbol|fyi)/?(/.+)?$').test(a)){ return true; }; break;
/*G*/case 'g':    if (RegExp('.+[.。](ga|gal|gallery|garden|gb|gbiz|gd|gdn|ge|gent|gf|gg|ggee|gh|gi|gift|gifts|gives|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|gold|goldpoint|golf|goo|goog|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guge|guide|guitars|guru|gw|gy)/?(/.+)?$').test(a)){ return true; }; break;
/*H*/case 'h':    if (RegExp('.+[.。](hamburg|hangout|haus|healthcare|help|here|hermes|hiphop|hitachi|hiv|hk|hm|hn|hockey|holdings|holiday|homes|honda|horse|host|hosting|house|how|hr|ht|hu)/?(/.+)?$').test(a)){ return true; }; break;
/*I*/case 'i':    if (RegExp('.+[.。](ibm|icbc|icu|id|ie|ifm|il|im|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insure|int|international|investments|io|iq|ir|irish|is|it|iwc)/?(/.+)?$').test(a)){ return true; }; break;
/*J*/case 'j':    if (RegExp('.+[.。](java|jcb|je|jetzt|jewelry|jll|jm|jo|jobs|joburg|jp|juegos)/?(/.+)?$').test(a)){ return true; }; break;
/*K*/case 'k':    if (RegExp('.+[.。](kaufen|kddi|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|komatsu|kp|kr|krd|kred|kw|ky|kyoto|kz)/?(/.+)?$').test(a)){ return true; }; break;
/*L*/case 'l':    if (RegExp('.+[.。](la|lacaixa|land|lat|latrobe|lawyer|lb|lc|lds|lease|leclerc|legal|lgbt|li|liaison|lidl|life|lighting|limited|limo|link|lk|loan|loans|lol|london|lotte|lotto|love|lr|ls|lt|ltda|lu|lupin|luxe|luxury|lv|ly)/?(/.+)?$').test(a)){ return true; }; break;
/*M*/case 'm':    if (RegExp('.+[.。](ma|madrid|maif|maison|management|mango|market|marketing|markets|marriott|mba|mc|md|me|media|meet|melbourne|meme|memorial|men|menu|mf|mg|mh|miami|mil|mini|mk|ml|mm|mma|mn|mo|mobi|moda|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|movie|mp|mq|mr|ms|mt|mtn|mtpc|mu|museum|mv|mw|mx|my|mz)/?(/.+)?$').test(a)){ return true; }; break;
/*N*/case 'n':    if (RegExp('.+[.。](na|nadex|nagoya|name|navy|nc|ne|nec|net|network|neustar|new|news|nexus|nf|ng|ngo|nhk|ni|nico|ninja|nissan|nl|no|np|nr|nra|nrw|ntt|nu|nyc|nz)/?(/.+)?$').test(a)){ return true; }; break;
/*O*/case 'o':    if (RegExp('.+[.。](okinawa|om|one|ong|onl|online|ooo|org|organic|osaka|otsuka|ovh)/?(/.+)?$').test(a)){ return true; }; break;
/*P*/case 'p':    if (RegExp('.+[.。](pa|page|panerai|paris|partners|parts|party|pe|pf|pg|ph|pharmacy|philips|photo|photography|photos|physio|piaget|pics|pictet|pictures|pink|pizza|pk|pl|place|plumbing|plus|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|ps|pt|pub|pw|py)/?(/.+)?$').test(a)){ return true; }; break;
/*Q*/case 'q':    if (RegExp('.+[.。](qa|qpon|quebec)/?(/.+)?$').test(a)){ return true; }; break;
/*R*/case 'r':    if (RegExp('.+[.。](racing|re|realtor|recipes|red|redstone|rehab|reise|reisen|reit|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|run|rw|ryukyu)/?(/.+)?$').test(a)){ return true; }; break;
/*S*/case 's':    if (RegExp('.+[.。](sa|saarland|sale|samsung|sap|sarl|saxo|sb|sc|sca|scb|schmidt|scholarships|school|schule|schwarz|science|scot|sd|se|seat|sener|services|sew|sex|sexy|sg|sh|shiksha|shoes|show|shriram|si|singles|site|sj|sk|sky|sl|sm|sn|so|soccer|social|software|sohu|solar|solutions|sony|soy|space|spiegel|spreadbetting|sr|ss|st|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swiss|sx|sy|sydney|systems|sz)/?(/.+)?$').test(a)){ return true; }; break;
/*T*/case 't':    if (RegExp('.+[.。](taipei|tatar|tattoo|tax|taxi|tc|td|team|tech|technology|tel|temasek|tennis|tf|tg|th|thd|theater|tickets|tienda|tips|tires|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|toray|toshiba|tours|town|toys|tp|tr|trade|trading|training|travel|trust|tt|tui|tv|tw|tz)/?(/.+)?$').test(a)){ return true; }; break;
/*U*/case 'u':    if (RegExp('.+[.。](ua|ug|uk|um|university|uno|uol|us|uy|uz)/?(/.+)?$').test(a)){ return true; }; break;
/*V*/case 'v':    if (RegExp('.+[.。](va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|video|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu)/?(/.+)?$').test(a)){ return true; }; break;
/*W*/case 'w':    if (RegExp('.+[.。](wales|wang|watch|webcam|website|wed|wedding|weir|wf|whoswho|wien|wiki|williamhill|win|wme|work|works|world|ws|wtc|wtf)/?(/.+)?$').test(a)){ return true; }; break;
/*X*/case 'x':    if (RegExp('.+[.。](xerox|xin|xxx|xyz)/?(/.+)?$').test(a)){ return true; }; break;
/*Y*/case 'y':    if (RegExp('.+[.。](yachts|yandex|ye|yodobashi|yoga|yokohama|youtube|yt)/?(/.+)?$').test(a)){ return true; }; break;
/*Z*/case 'z':    if (RegExp('.+[.。](za|zip|zm|zone|zuerich|zw)/?(/.+)?$').test(a)){ return true; }; break;
}

    return false;
}
/*-----------ISURL END-----------*/

$(document).ready(function(){


                    if ("FLASE" != getCookie("FIRSTTIME")) {
                    setCookie("84", "http://www.taobao.com");
                    setCookie("86", "http://www.v2ex.com");
                    setCookie("87", "http://www.weibo.com");
                    setCookie("89", "http://www.youku.com");
                    setCookie("90", "http://www.zhunpai.com.cn");
                    setCookie('searchEngine', 'Baidu');
                    setCookie("FIRSTTIME", "FLASE");
                    }

                    useSetting();

                    refreshIco();

                    /*this is for extensions
                    function attention(){
                    $('.attention').addClass('attentionBlink');
                    setTimeout("$('.attention').removeClass('attentionBlink')",1600);
                    }
                    attention();
                    var attentionAnimate = setInterval(function(){
                    attention();
                    },3100);*/

                    var _search = $("#search");
                    _search.focus(function(){
                        _search.attr('placeholder','                 输入关键字或网址，Tab 键切换至快捷键盘');//I don`t konw why space work on here not &emsp; ...
                    });
                    _search.blur(function(){
                        _search.attr('placeholder','                     Tab 键切换至搜索框   输入设置打开设置');//I don`t konw why space work on here not &emsp; ...
                    });
                    $(document).keydown(function(event){
                        var keyCode = event.which;
                        if (_search.is(":focus")){
                            if (keyCode == 9){
                                _search.attr('tabindex', '3');//for Firefox
                                _search.blur();
                                window.event.returnValue = false;
                            }
                            if (keyCode == 13){
                                var searchTXT = _search.val();
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
                    $(this).append("<div class='keySetting'><img id='deleteImg' class='deleteImg' src='delete.png'/><img id='settingImg' class='settingImg' src='setting.png'/></div><div class='keySettingFix'></div>");//keySettingFix is for Firefox
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
                        _setting.html("<form id='settingDetail' style='display:none;margin:26px 60px;'><input type='checkbox' name='newWindow' value='t'/><p>新窗口打开网页（部分浏览器可能会阻止此行为）</p><br/><p>选择搜索引擎：&emsp;&emsp;&emsp;</p><input type='radio' name='searchEngine' value='Google' /><p>Google&emsp;&emsp;&emsp;</p><input type='radio' name='searchEngine' value='Bing' /><p>Bing&emsp;&emsp;&emsp;</p><input type='radio' name='searchEngine' value='Baidu' /><p>Buidu</p><br/><p>其他搜索引擎：</p><input type='text' name='searchEngineURL' placeholder='eg:g.openibm.com（不使用则留空）' style='width:220px;'/><p>&emsp;post&ensp;key：</p><input type='text' name='searchEnginePOST' placeholder='eg:q' style='width:36px;' /><p>&emsp;https等请自带</p><br/><p>背景图片连接：</p><input type='text' name='backgroundURL' placeholder='&emsp;支持所有您能正常访问的图库，不使用则留空' style='width:280px;' /><p>&emsp;同步 bing 背景：t.cn/R2ZvEBX</p><br/><p style='color:#c2c2c2'>Lovingly made by sciooga （<a href='https://github.com/sciooga/Keyboard-launch' target='_blank' style='color:#c2c2c2'>♥ Github</a>）</p><br/><p style='margin-top:20px;'><span id='CANCEL'>取消</span><span id='OK'>保存</span></p></form>");
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
                                },500,function(){$('#setting').html("<p>&emsp;&emsp;&emsp;如果您无意修改设置请将此忽视：</p><img src='setting.png'/>")
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
