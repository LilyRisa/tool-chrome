! function() {
    function a(a) {
        function b(a) {
            k = !0;
            var b = this.dataset.pos;
            i.forEach(function(a) {
                a.dataset.pos <= b ? (a.querySelector(".empty").style.display = "none", a.querySelector(".filled").style.display = "inline") : (a.querySelector(".empty").style.display = "inline", a.querySelector(".filled").style.display = "none")
            })
        }

        function d(a) {
            f || (k = !1, setTimeout(function() {
                k || i.forEach(function(a) {
                    a.querySelector(".empty").style.display = "inline", a.querySelector(".filled").style.display = "none"
                })
            }, 100))
        }

        function e(a) {
            f = !0;
            var h = this.dataset.pos;
            i.forEach(function(a) {
                a.dataset.pos <= h && (a.querySelector(".empty").style.display = "none", a.querySelector(".filled").style.display = "inline")
            }), i.forEach(function(a) {
                a.removeEventListener("mouseover", b), a.removeEventListener("mouseout", d), a.removeEventListener("click", e)
            }), j.innerText = chrome.i18n.getMessage("your_rate"), chrome.runtime.sendMessage({
                action: "setPopupRate",
                value: h
            }), h > 3 && !g ? (g = !0, A.trackEvent("user_popup_rate", {
                value: h
            }), chrome.tabs.create({
                url: "https://chrome.google.com/webstore/detail/instagram-downloader/" + chrome.runtime.id + "/reviews"
            })) : c("rate", h)
        }
        try {
            if (a) return;
            var f = !1,
                g = !1,
                h = C.querySelector("#rating-ask");
            h.style.display = "inline-block";
            var i = h.querySelectorAll("#rating-ask .stars a"),
                j = h.querySelector(".ext_text"),
                k = !1;
            if (!i || !i.forEach) return;
            i.forEach(function(a) {
                a.querySelector(".empty").style.display = "inline", a.querySelector(".filled").style.display = "none"
            }), j.innerText = chrome.i18n.getMessage("rate_us_popup"), i.forEach(function(a) {
                a.addEventListener("mouseover", b), a.addEventListener("mouseout", d), a.addEventListener("click", e)
            })
        } catch (l) {
            A.trackCodeError(l, "showPopupRate")
        }
    }

    function b(a, b) {
        var c = a.url,
            d = a.filename;
        chrome.downloads.download({
            url: c,
            filename: d
        }, function(e) {
            if ("undefined" == typeof e) {
                var f = a.filename.match(/([\w_]+)(\.\w{3,4})$/);
                f = f && f[0], f ? (d = f.substr(f.length - 32), chrome.downloads.download({
                    url: c,
                    filename: d
                }, function(a) {
                    "undefined" == typeof a && (A.trackEventWithRandom("reject_download", {
                        filename: d
                    }, .05), "function" == typeof b && b())
                })) : (A.trackEventWithRandom("not_valid_filename_for_download", {
                    filename: d
                }, .05), "function" == typeof b && b())
            } else "function" == typeof b && b(e)
        })
    }

    function c(b, c) {
        function d(a) {
            var b = this.value.length;
            b >= 800 && a.preventDefault(), b > 600 ? (q.style.display = "inline-block", s.innerText = 800 - b) : q.style.display = "none"
        }

        function e(a) {
            return a.preventDefault(), !1
        }

        function f() {
            p.style.display = "none", o.classList.remove("error")
        }

        function g(a) {
            var b = n.value,
                d = o.value;
            if (d && !d.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return p.style.display = "inline-block", void o.classList.add("error");
            if (V = "", W = !1, k.style.visibility = "hidden", k.style.opacity = "0", k.style.display = "none", i(), j) var e = {
                    msg: b,
                    email: d
                },
                f = "user_report_problem";
            else e = {
                value: c,
                msg: b,
                email: d
            }, f = "user_popup_rate";
            A.trackEvent(f, e)
        }

        function h() {
            V = "", W = !1, k.style.visibility = "hidden", k.style.opacity = "0", k.style.display = "none", i(), a(), chrome.runtime.sendMessage({
                action: "setPopupRate",
                value: 0
            })
        }

        function i() {
            l.removeEventListener("click", g), m.removeEventListener("click", h), n.removeEventListener("input", d), o.removeEventListener("input", f)
        }
        try {
            var j = "report" == b;
            W = j;
            var k = document.querySelector(".comment-wrapper");
            k.style.display = "block", k.style.visibility = "visible", k.style.opacity = "1";
            var l = k.querySelector(".send_btn"),
                m = k.querySelector(".cancel_btn"),
                n = k.querySelector("textarea"),
                o = k.querySelector("#email_input"),
                p = k.querySelector(".not_valid_email"),
                q = k.querySelector(".symbols_left"),
                r = q.querySelector(".text"),
                s = q.querySelector(".count");
            l.innerText = chrome.i18n.getMessage("send").toUpperCase(), m.innerText = chrome.i18n.getMessage("btn_cancel").toUpperCase(), n.placeholder = chrome.i18n.getMessage("write_us") + "...", r.innerText = chrome.i18n.getMessage("symbols_left") + ":", p.innerText = chrome.i18n.getMessage("not_valid_email"), o.setAttribute("placeholder", chrome.i18n.getMessage("enter_your_email")), n.value = "", l.addEventListener("click", g), m.addEventListener("click", h), n.addEventListener("input", d), n.addEventListener("paste", e), o.addEventListener("input", f)
        } catch (t) {
            A.trackCodeError(t, "showReportTextArea")
        }
    }

    function d() {
        var a = document.createElement("div");
        a.classList.add("download_item");
        var b = document.createElement("div");
        b.classList.add("download_item_icon");
        var c = document.createElement("div");
        c.classList.add("download_item_overlay"), a.appendChild(c), a.appendChild(b), H = a
    }

    function e() {
        return H || d(), H.cloneNode(!0)
    }

    function f(a) {
        return a.shortcode ? J.indexOf(a.shortcode) > -1 ? !1 : (J.push(a.shortcode), !0) : J.indexOf(a.url) > -1 ? !1 : (J.push(a.url), !0)
    }

    function g() {
        return I ? !1 : void chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, function(a) {
            a[0].url;
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function(a) {
                K = a[0];
                var b = K.id;
                chrome.tabs.sendMessage(b, "checkLinks")
            });
            var b = document.querySelector(".links-no-found");
            b.innerText = chrome.i18n.getMessage("noLinksFound"), Z.hide(), b.style.display = "block"
        })
    }

    function h(a) {
        l(), q(a.length), a.forEach(function(a) {
            i(a) && f(a) && j(a)
        })
    }

    function i(a) {
        return a ? "string" == typeof a.shortcode && a.shortcode.length ? !0 : A.isValidUrl(a.url) ? !0 : !1 : !1
    }

    function j(a) {
        if (a.isMultiple) {
            var b = s(a),
                c = 0;
            A.getAllMediaDataFromJsonGraphql({
                shortCode: a.shortcode
            }, function(a) {
                a.forEach(function(a) {
                    c++, 2 > c || s(a, b)
                })
            })
        } else s(a)
    }

    function k(a) {
        f(a) && (I || l(), j(a))
    }

    function l() {
        try {
            I = !0, document.querySelector(".links-no-found").style.display = "none", D.style.display = "none", E.style.display = "none", F.style.display = "none", document.body.style.width = "610px", chrome.runtime.sendMessage("getPopupRate", a);
            var b = G.querySelector(".icon");
            G.querySelector(".ext_text").innerText = chrome.i18n.getMessage("report_a_problem"), b.addEventListener("click", function() {
                W || c("report")
            }), Z.hide(), C.style.display = "block", B.style.display = "block", m(), n(), $("body").on("click", ".download_item", t)
        } catch (d) {
            A.trackCodeError(d, "linksSuccessFoundState")
        }
    }

    function m() {
        var a = document.querySelector(".phone_wrap"),
            b = a.querySelector(".phone_icon");
        b.setAttribute("title", chrome.i18n.getMessage("mobile_instagram")), a.style.display = "block", b.addEventListener("click", function() {
            chrome.runtime.sendMessage("openMobileMode")
        })
    }

    function n() {
        var a = document.querySelector(".settings_btn_wrap"),
            b = a.querySelector(".settings_btn_icon");
        b.src = "chrome-extension://" + chrome.runtime.id + "/images/img/settings.png", b.setAttribute("title", chrome.i18n.getMessage("settings_btn")), a.style.display = "block", b.addEventListener("click", o)
    }

    function o() {
        function a() {
            var a = b.find(".push-toggle");
            a.on("click", function() {
                d.hasClass("active") ? (d.removeClass("active"), chrome.storage.sync.set({
                    upload_external: !1
                })) : (d.addClass("active"), chrome.storage.sync.set({
                    upload_external: !0
                }))
            });
            var c, e = $(".img-icon");
            e.on("mouseover", function() {
                c = document.createElement("div");
                var a = document.createElement("img");
                a.src = "/images/img/help_screen.jpg", c.className = "help_image_wrap", c.appendChild(a), b.append(c)
            }), e.on("mouseleave", function() {
                c.innerHTML = "", c.remove()
            }), b.data({
                event: "on"
            })
        }
        $("#header").hide(), $(".comment-wrapper").hide(), $("#download_item_container").hide();
        var b = $(".settings_page_wrap"),
            c = b.find(".settings_title"),
            d = b.find(".upload_from_anywhere");
        c.text(chrome.i18n.getMessage("settings_title")), d.find(".title").text(chrome.i18n.getMessage("upload_from_external_link")), b.show(), b.find(".btn_back").on("click", p), chrome.storage.sync.get("upload_external", function(a) {
            a.upload_external && d.addClass("active")
        }), b.data().event || a()
    }

    function p() {
        $(".settings_page_wrap").hide(), $("#header").show(), $("#download_item_container").show()
    }

    function q(a) {
        3 > a ? (L = O, Q = "big_size", R = "/s300x300/") : 3 == a ? (L = N, Q = "medium_size", R = "/s200x200/") : (P = !1, L = M, Q = "mini_size", R = "/s150x150/")
    }

    function r() {
        if (L == N) {
            var a = document.querySelectorAll(".download_item");
            a && a.forEach && a.forEach(function(a) {
                a.classList.remove("big_size"), a.classList.add("medium_size")
            })
        } else L == M && (a = document.querySelectorAll(".download_item"), a && a.forEach && a.forEach(function(a) {
            a.classList.remove("big_size", "medium_size"), a.classList.add("mini_size")
        }))
    }

    function s(a, b) {
        Y++;
        var c = J.length > Y ? J.length : Y;
        P && (q(c), r());
        var d = v(a),
            f = e();
        return f.style.backgroundImage = "url(" + d + ")", f.classList.add(a.type, Q), a.isStory && (f.dataset.isStory = 1), a.shortcode && (f.dataset.shortcode = a.shortcode), a.url && (f.dataset.url = a.url), a.filename && (f.dataset.filename = a.filename), "igtv" == a.type && (f.dataset.igtv = "1"), b ? $(b).after(f) : B.appendChild(f), f
    }

    function t(a) {
        var c = Date.now();
        if (!(T + U > c || S)) {
            T = c, S = !0;
            var d = this;
            if (this.querySelector(".download_item_icon").classList.add("clicked_now_item"), d.dataset.isStory || !d.dataset.shortcode) b({
                url: d.dataset.url,
                filename: d.dataset.filename
            });
            else {
                var e = d.dataset.shortcode;
                if (!e) return void(Math.random() < .01 && A.trackEvent("not_story_and_no_shortcode_in_popup"));
                var f = !!d.dataset.igtv;
                A.getMediaItemFromJsonGraphql({
                    shortCode: e,
                    isIgtv: f
                }, function(a) {
                    return (!a || a.error) && (a = u(d)), a.url && a.filename ? void b({
                        url: a.url,
                        filename: a.filename
                    }) : void(Math.random() < .01 && A.trackEvent("not_receive_getReserveMediaDataFromEl"))
                })
            }
        }
    }

    function u(a) {
        return a.dataset.url && a.dataset.filename ? {
            url: a.dataset.url,
            filename: a.dataset.filename
        } : null
    }

    function v(a) {
        var b = a.prev;
        return b = b || a.url
    }

    function w() {
        E.querySelector(".message").innerText = chrome.i18n.getMessage("reloadPage"), E.querySelector(".ext_text").innerText = chrome.i18n.getMessage("reloadPageShort"), F.style.display = "none", Z.hide(), E.style.display = "block", document.body.addEventListener("click", function() {
            chrome.tabs.reload(function() {
                window.close()
            })
        })
    }

    function x(a) {
        F.style.display = "none", D.querySelector(".instagram_no_msg").innerText = chrome.i18n.getMessage(a);
        var b = D.querySelector(".instagram_link_wrap a");
        b.innerText = chrome.i18n.getMessage("go_to_instagram"), setInterval(function() {
            b.blur()
        }, 50), Z.hide(), D.style.display = "block"
    }

    function y() {
        I || (Z.hide(), F.querySelector(".text").innerText = chrome.i18n.getMessage("tab_is_not_complete"), F.querySelector(".loader2").style.display = "block", F.style.display = "block")
    }

    function z() {
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, function(a) {
            try {
                K = a[0];
                var b = K.id,
                    c = ["chrome://", "chrome-search://", "https://chrome.google", "chrome-extension://"],
                    d = !1;
                if (c.forEach(function(a) {
                        -1 != K.url.indexOf(a) && (d = !0)
                    }), /^http/.test(K.url) || (d = !0), d) return void x("it_is_not_instagram");
                chrome.tabs.sendMessage(b, "checkConnect", function(a) {
                    a ? (chrome.tabs.sendMessage(b, "getFoundLinks", _), X = -1 !== K.url.indexOf("/saved/")) : "complete" != K.status ? (y(), setTimeout(function() {
                        I || z()
                    }, 500)) : -1 != K.url.indexOf("instagram.com") ? w() : chrome.runtime.sendMessage({
                        action: "pageHasIframe",
                        tabId: b
                    }, function(a) {
                        a = parseInt(a), "number" == typeof a && !isNaN(a) && a > 0 ? w() : x("it_is_not_instagram")
                    })
                })
            } catch (e) {
                A.trackCodeError(e, "requestActiveTab")
            }
        })
    }
    var A = window.globalUtils;
    document.head.setAttribute("lang", chrome.i18n.getMessage("lang"));
    var B = document.querySelector("#download_item_container"),
        C = document.querySelector("header#header"),
        D = (C.querySelector("#logo"), document.querySelector(".it_is_not_instagram")),
        E = document.querySelector(".install_now"),
        F = document.querySelector(".tab_is_not_complete"),
        G = document.querySelector(".report_ask"),
        H = null,
        I = !1,
        J = [],
        K = null,
        L = null,
        M = 1,
        N = 2,
        O = 3,
        P = !0,
        Q = null,
        R = null,
        S = !1,
        T = 0,
        U = 1e3,
        V = "",
        W = !1,
        X = !1,
        Y = 0,
        Z = function() {
            var a = document.querySelector(".loader");
            return a.show = function() {
                this.style.display = "block"
            }, a.hide = function() {
                this.style.display = "none"
            }, a
        }();
    chrome.runtime.onMessage.addListener(function(a, b, c) {
        a && ("checkPopupOpened" == a && c(!0), "object" == typeof a && a.action && "linkFound" == a.action && a.mediaInfo && b.tab.id == K.id && k(a.mediaInfo))
    }), chrome.downloads.onCreated.addListener(function(a) {
        S = !1;
        var b = document.querySelector(".clicked_now_item");
        b && b.classList.remove("clicked_now_item")
    });
    var _ = function(a) {
            return setTimeout(g, 2e3), a && Array.isArray(a) && a.length ? (I = !0, void h(a)) : !1
        },
        aa = function() {
            Z.show(), A.fixForeach(), z()
        };
    aa(),
        function() {
            document.body.style.opacity = 0, document.body.style.transition = "opacity ease-out .4s", requestAnimationFrame(function() {
                document.body.style.opacity = 1
            });
            var a = function() {
                    document.body.style.border = "none", setTimeout(function() {
                        document.body.style.border = "1px solid transparent"
                    }, 100), setTimeout(function() {
                        document.body.style.border = "none"
                    }, 300)
                },
                b = function(b) {
                    setTimeout(function() {
                        var b = document.outerWidth || window.outerWidth;
                        100 > b && a()
                    }, b)
                };
            a(), b(600), b(1500), b(3e3), b(1e4)
        }()
}();