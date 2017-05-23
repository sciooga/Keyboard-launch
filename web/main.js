;(function() {
    var version = '1.0.0',
        keys = {},
        $search = document.querySelector('#search'),
        $keyboard = document.querySelector('#keyboard'),
        $keys = document.querySelectorAll('#keyboard span'),
        $setting = document.querySelector('#setting'),
        $close = document.querySelector('.close'),
        $newWindow = document.querySelector('#newWindow'),
        $searchEngine = document.querySelector('#searchEngine')

    // init
    if (localStorage.version != version) {
        localStorage.version = version
        localStorage.newWindow = 0
        localStorage.searchEngine = 'https://www.baidu.com/s?wd='
        localStorage[67] = 'https://www.coding.net'
        localStorage[72] = 'https://huguotao.com'
        localStorage[84] = 'https://www.taobao.com'
        localStorage[86] = 'https://www.v2ex.com'
        localStorage[87] = 'https://www.weibo.com'
    }

    for (var i in $keys) {
        if (!$keys.hasOwnProperty(i)) continue

        keys[$keys[i].dataset.key] = {
            'span': $keys[i],
            'li': $keys[i].firstElementChild
        }
    }

    // set favicon
    for (var i = 48; i < 91; i++) {
        var url = localStorage[i]
        if (url) addFavicon(keys[i]['span'], getFavicon(url))
    }

    // read settings
    if (~~localStorage.newWindow) {
        $newWindow.classList.add('active')
    } else {
        $newWindow.classList.remove('active')
    }
    $searchEngine.value = localStorage.searchEngine

    function getFavicon(url) {
        return url.split('/').slice(0,3).join('/') + "/favicon.ico"
    }

    function addFavicon($span, src) {
        var img = document.createElement('img')
        img.src = src
        img.className = 'fav'
        $span.appendChild(img)
    }

    function keyDown(key) {
        if (!key) return
        keys[key]['span'].classList.add('keyDownSpan')
        keys[key]['li'].classList.add('keyDownLi')
    }

    function keyUp(key) {
        if (!key) return
        keys[key]['span'].classList.remove('keyDownSpan')
        keys[key]['li'].classList.remove('keyDownLi')
    }

    function openUrl(url) {
        if (~~localStorage.newWindow) {
            window.open(url)
        } else {
            location.href = url
        }
    }

    $search.onkeyup = function(e) {
        if (e.target.value == '设置') return $setting.style.bottom = 0
        var key = e.which || e.keyCode || 0;
        if (key == 13) openUrl(localStorage.searchEngine + e.target.value)
    }

    $close.onclick = function() {
        $setting.style.bottom = '-320px'
    }

    var keyCache = 0
    document.onkeydown = function(e) {
        var key = e.which || e.keyCode || 0
        keyCache = key
        if (key == 9) {
            window.event ? window.event.returnValue = false : e.preventDefault()
            if (document.activeElement == $search) {
                $search.blur()
            } else {
                $search.focus()
            }
        }
        keyDown(key)
    }

    document.onkeyup = function(e) {
        var key = e.which || e.keyCode || 0,
            url = localStorage[key]
        keyUp(key)

        if (url && key == keyCache && document.activeElement != $search) openUrl(url)
        keyCache = 0
    }

    $keyboard.onclick = function(e) {
        if (e.target.tagName != 'LI') return
        var name = e.target.innerText,
            key = e.target.parentElement.dataset.key || 0,
            url = prompt("请输入按键 " + name + " 对应的网址", localStorage[key] || '')
        if (url === null) return
        if (url && url.indexOf('http') != 0) url = 'http://' + url
        localStorage[key] = url
        location.reload()        
    }

    $newWindow.onclick = function() {
        this.classList.toggle('active')
        localStorage.newWindow = +!!!~~localStorage.newWindow
    }

    $searchEngine.onchange = function(e) {
        localStorage.searchEngine = e.target.value
    }
})()

