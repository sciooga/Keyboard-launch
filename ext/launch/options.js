
$(document).ready(function(){
                        //read setting
                        newWindow && ($('input[name=newWindow]')[0].checked = true);

                        getCookie('newMsg') && ($('input[name=newMsg]')[0].checked = true);
                        getCookie('msg_weibo')  && ($('input[name^=msg]')[0].checked = true);
                        getCookie('msg_zhihu') && ($('input[name^=msg]')[1].checked = true);
                        getCookie('msg_v2ex') && ($('input[name^=msg]')[2].checked = true);

                        var now_searchEngine = getCookie('searchEngine');
                        now_searchEngine == 'Google' && ($('input[name=searchEngine]')[0].checked = true);
                        now_searchEngine == 'Bing' && ($('input[name=searchEngine]')[1].checked = true);
                        now_searchEngine == 'Baidu' && ($('input[name=searchEngine]')[2].checked = true);
                        now_searchEngine == 'Other' && ($('input[name=searchEngineURL]')[0].value = getCookie('searchEngineURL')) && ($('input[name=searchEnginePOST]')[0].value = getCookie('searchEnginePOST'));

                        $('input[name=backgroundURL]')[0].value = getCookie('backgroundURL');

                        chrome.commands.getAll(function(array){
                            $('#shortcutKey').text(array[1].shortcut);
                        });
                        //////////////

                        checkboxLinkage();
                        $('input[name=newMsg]').change(function() {
                            checkboxLinkage();
                        });

                        $('input[name=searchEngine]').click(function(){
                            $('input[name=searchEngineURL]')[0].value = '';
                            $('input[name=searchEnginePOST]')[0].value = '';
                        });

                        var _searchEngine = $('input[name=searchEngine]');
                            $('input[name^=searchEngine]').bind('input', function() {
                            for (var i=0;i<3;i++){_searchEngine[i].checked = false;}
                        });

                            $("#CANCEL").click(function(){
                            window.close();
                            });

                            $("#OK").click(function(){

                                //save setting
                                setCookie('newWindow','');
                                $('input[name=newWindow]')[0].checked && setCookie('newWindow','t');

                                if ($('input[name=newMsg]')[0].checked){
                                    setCookie('newMsg', 't');
                                    for (var i=0;i<3;i++){
                                            if ($('input[name^=msg]')[i].checked){
                                                setCookie($('input[name^=msg]')[i].name, 't');
                                            }else{
                                                setCookie($('input[name^=msg]')[i].name, '');
                                            }
                                        };
                                }else{
                                    setCookie('newMsg', '');
                                }

                                for (var i=0;i<3;i++){_searchEngine[i].checked && setCookie('searchEngine',_searchEngine[i].value);}
                                var _searchEngineURL = $('input[name=searchEngineURL]')[0].value;
                                var _searchEnginePOST = $('input[name=searchEnginePOST]')[0].value;
                                _searchEngineURL = buildURL(_searchEngineURL);
                                _searchEngineURL && _searchEnginePOST && setCookie('searchEngine','Other') || setCookie('searchEngineURL',''+_searchEngineURL) || setCookie('searchEnginePOST',''+_searchEnginePOST);

                                setCookie('backgroundURL',buildURL($('input[name=backgroundURL]')[0].value));
                                //////////////

                                useSetting();
                                window.close();
                            });
});