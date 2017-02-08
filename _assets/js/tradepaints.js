

define("branding-responsive-nav", [], function() {
    var e = function(e) {
        this.setOptions(e)
    };
    return e.prototype = {
        options: {},
        setOptions: function(e) {
            var t = {
                more_link_text: e && e.more_link_text ? e.more_link_text : "More"
            };
            this.options = t
        },
        getOptions: function() {
            return this.options
        },
        init: function() {
            function e() {
                var e = t.getWindowWidth(),
                    n = t.getWindowHeight();
                (e != i || n != o) && null !== t.local_nav_bar && (t.processingNavigation = !1, t.processNavigation()), i = e, o = n
            }
            var t = this,
                n = null,
                i = this.getWindowWidth(),
                o = this.getWindowHeight();
            t.setupNavigation(), this.addListener(window, "resize", function() {
                clearTimeout(n), n = setTimeout(e, 300)
            })
        },
        getWindowWidth: function() {
            var e = 0;
            return "number" == typeof window.innerWidth ? e = window.innerWidth : document.documentElement && document.documentElement.clientWidth ? e = document.documentElement.clientWidth : document.body && document.body.clientWidth && (e = document.body.clientWidth), e
        },
        getWindowHeight: function() {
            var e = 0;
            return "number" == typeof window.innerHeight ? e = window.innerHeight : document.documentElement && document.documentElement.clientHeight ? e = document.documentElement.clientHeight : document.body && document.body.clientHeight && (e = document.body.clientHeight), e
        },
        addListener: function(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
        },
        setupNavigation: function() {
            if (this.local_nav_bar = document.getElementById("br-nav-programme"), null !== this.local_nav_bar) {
                var e = document.createElement("button");
                e.className = "br-nav__morelink br-box-highlight", e.setAttribute("data-linktrack", "nav_more");
                var t = document.createTextNode(this.getOptions().more_link_text);
                e.appendChild(t), e.id = "more-link", this.local_nav_bar.insertBefore(e, this.local_nav_bar.firstChild);
                var n = document.createElement("ul");
                n.id = "more-list", n.className = "br-nav__more br-nav__list", this.local_nav_bar.appendChild(n), this.addListener(e, "click", function() {
                    -1 !== e.className.indexOf("open") ? (e.className = e.className.replace("open", ""), n.className = n.className.replace("open", "")) : (e.className += " open", n.className += " open")
                }), t = null, this.processNavigation()
            }
        },
        processingNavigation: !1,
        processNavigation: function() {
            if (null !== this.local_nav_bar) {
                var e = document.getElementById("more-link"),
                    t = this.local_nav_bar.getElementsByTagName("ul");
                t = t[0];
                var n = t.getElementsByTagName("li"),
                    i = n[0];
                this.processingNavigation = !0;
                var o = document.getElementById("more-list");
                if (null !== o)
                    for (; o.hasChildNodes();) t.appendChild(o.firstChild);
                if (!this._navIsTooLong(t, i)) return e.className = e.className.replace("visible", ""), void(e = t = n = i = o = null);
                for (e.className = e.className.replace("visible", ""), e.className += " visible"; this._navIsTooLong(t, i) && this.processingNavigation;) this._moveLastNavItem();
                e = t = n = i = o = null
            }
        },
        _moveLastNavItem: function() {
            var e = this.local_nav_bar.getElementsByTagName("ul")[0],
                t = document.getElementById("more-list");
            t.insertBefore(e.lastChild, t.firstChild), e = nav_items = last_item = t = null
        },
        _navIsTooLong: function(e, t) {
            var n = e.getElementsByTagName("li"),
                i = n.length > 1 && e.offsetHeight > t.scrollHeight;
            return n = null, i
        }
    }, e
});
/*<![CDATA[*/
require(['branding-responsive-nav'], function(responsiveNav) {
    var nav = new responsiveNav({
        'more_link_text': 'More'
    });
    nav.init();
});
/*]]>*/
