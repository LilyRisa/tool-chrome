var globalUtils = window.globalUtils,
    DownloadZipModule = function() {
        return {
            zipCanceledByUser: !1,
            dlBtnClassName: "ext_btn_dl_all",
            downloadAllBtnWrapperClass: "download_all_wrap",
            PAGE_TYPE_DEFAULT: 1,
            PAGE_TYPE_USERPAGE: 2,
            PAGE_TYPE_ONE_POST: 3,
            pageType: null,
            massDownloadProSettings: !1,
            isAdvancedSettings: !1,
            isMac: !1,
            addDlZipBtn: function() {
                if (!document.querySelector("." + this.dlBtnClassName)) {
                    var a = document.querySelector("section > main > nav ._qlijk");
                    if (a || (a = document.querySelector("section > main + nav > div > div > div > div:last-child div")), !a && document.querySelector(".XrOey") && (a = document.querySelector(".XrOey").parentNode), a) {
                        var b = document.createElement("div");
                        b.className = "XrOey", b.innerHTML = '<div class="' + this.downloadAllBtnWrapperClass + '"><span class="ext_tooltip download_all">' + chrome.i18n.getMessage("download_all") + '</span><a class="_8scx2 _gvoze ' + this.dlBtnClassName + '"></a></div>', a.appendChild(b), globalUtils.domStats.dlBtnAll++
                    }
                }
            },
            showPopupDlAll: function() {
                var a = document.querySelector("." + this.dlBtnClassName),
                    b = a.parentNode.parentNode,
                    c = document.createElement("div");
                c.innerHTML = '<div class="ext_all_popup_wrap"><div class="_8Mwnh" role="dialog"></div><div class="hUQsm"></div><div class="T5hFd"></div><div class="ext_dl_all_popup_loader"><span class="ext_icon"></span></div><div class="ext_dl_all_popup"><div class="ext_popup_header"></div><div class="ext_popup_links_wrap"></div><div class="ext_popup_footer"></div></div>', b.appendChild(c), c.querySelector("._8Mwnh").addEventListener("click", function(a) {
                    a.stopPropagation(), b.removeChild(c)
                });
                var d = this;
                globalUtils.sendMessage("isDownloadAllProcessNow", function(a) {
                    if (a) d.buildAllPopup({
                        denied: 1
                    });
                    else if (-1 !== window.location.href.indexOf("/p/")) d.pageType = d.PAGE_TYPE_ONE_POST, d.buildAllPopup({
                        count: 1
                    });
                    else if (document.querySelector('header a[href*="/followers/"]')) {
                        var b = -1 !== window.location.href.indexOf("/saved/"),
                            c = -1 !== window.location.href.indexOf("/tagged/"),
                            e = {
                                fromSaved: b,
                                fromTagged: c
                            };
                        d.checkPossibilityVirtualScrollPage(e, function(a) {
                            a && !a.error && a.success && a.count ? (e.count = a.count, e.user_page = !0, d.pageType = d.PAGE_TYPE_USERPAGE, d.buildAllPopup(e)) : (d.pageType = d.PAGE_TYPE_DEFAULT, d.buildAllPopup({
                                count: App.cachedMediaShortCodes.length
                            }))
                        })
                    } else d.pageType = d.PAGE_TYPE_DEFAULT, d.buildAllPopup({
                        count: App.cachedMediaShortCodes.length
                    })
                })
            },
            rebuildPopup: function(a) {
                document.querySelector(".ext_all_popup_wrap") && DownloadZipModule.pageType == DownloadZipModule.PAGE_TYPE_DEFAULT && DownloadZipModule.buildAllPopup({
                    count: App.cachedMediaShortCodes.length
                })
            },
            buildAllPopup: function(a) {
                var b = DownloadZipModule;
                if (0 === a.count) return b.buildAllPopupNoFiles();
                if (!a.fromTagged && b.massDownloadProSettings && b.pageType == b.PAGE_TYPE_USERPAGE) return b.buildAllPopupPro(a);
                b.isAdvancedSettings = !1;
                var c = document.querySelector(".ext_all_popup_wrap");
                if (c) {
                    var d = c.querySelector(".ext_dl_all_popup"),
                        e = c.querySelector(".ext_popup_header"),
                        f = c.querySelector(".ext_dl_all_popup_loader"),
                        g = c.querySelector(".ext_popup_links_wrap"),
                        h = d.querySelector(".ext_popup_footer");
                    if (g.innerHTML = "", a.denied) return e.innerText = chrome.i18n.getMessage("parallel_all_download_denied"), f.style.display = "none", void(d.style.display = "block");
                    var i = !1;
                    if (a.fromTagged) {
                        var j = $('a[href*="/tagged/"]').text();
                        j.length && (j = (" (" + j + ")").toUpperCase()), e.innerHTML = chrome.i18n.getMessage("download_all") + j
                    } else {
                        var k = a.count;
                        e.innerHTML = chrome.i18n.getMessage("files_found_on_page") + ": <br>" + k;
                        var l = k;
                        if (b.pageType == b.PAGE_TYPE_DEFAULT) i = !0, h.innerText = chrome.i18n.getMessage("scroll_page_for_download_more");
                        else if (b.pageType == b.PAGE_TYPE_ONE_POST) {
                            var m = document.querySelectorAll("article header + div td").length;
                            e.innerHTML = chrome.i18n.getMessage("files_found_on_page") + ":  <br>" + k + " (" + m + ")"
                        } else b.pageType == b.PAGE_TYPE_USERPAGE && (i = !0, h.innerHTML = '<a href="#">' + chrome.i18n.getMessage("mass_download_pro") + "</a>", h.querySelector("a").addEventListener("click", function(c) {
                            c.stopPropagation(), c.preventDefault(), b.massDownloadProSettings = !0, globalUtils.sendMessage("massDownloadProSettingOn"), DownloadZipModule.buildAllPopupPro(a)
                        }))
                    }
                    if (i) {
                        var n = document.createElement("div");
                        n.className = "choose_count_dl_all_form", n.innerHTML = '<div class="ext_form_header">' + chrome.i18n.getMessage("set_range") + "</div><span>" + chrome.i18n.getMessage("from") + '</span><input id="ext_dl_all_start" type="number" min="1" max="' + (parseInt(k) - 1) + '" value="1"><span>' + chrome.i18n.getMessage("to") + '</span><input id="ext_dl_all_end" type="number" min="2" value="' + l + '" max="' + k + '">', g.appendChild(n)
                    }
                    var o = document.createElement("div");
                    if (o.className = "ext_btn_wrap", o.innerHTML = '<div class="ext_popup_dl_btn" data-count=""><span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download") + "</span></div>", g.appendChild(o), f.style.display = "none", d.style.display = "block", a.fromTagged) o.querySelector(".ext_popup_dl_btn").dataset.from_tagged = "1";
                    else {
                        var p = document.querySelector("#ext_dl_all_start"),
                            q = document.querySelector("#ext_dl_all_end");
                        $(q).on("keydown", function() {
                            var a = this;
                            setTimeout(function() {
                                var b = parseInt(a.value);
                                isNaN(b) || b < p.value ? a.value = p.value : b > k && (a.value = k)
                            }, 200)
                        }), $(p).on("keydown", function() {
                            var a = this;
                            setTimeout(function() {
                                var b = parseInt(a.value);
                                isNaN(b) || 1 > b ? a.value = 1 : b > q.value && (a.value = q.value)
                            }, 200)
                        })
                    }
                }
            },
            buildAllPopupNoFiles: function() {
                var a = document.querySelector(".ext_all_popup_wrap");
                if (a) {
                    var b = a.querySelector(".ext_dl_all_popup"),
                        c = a.querySelector(".ext_popup_header");
                    c.innerText = chrome.i18n.getMessage("noLinksFound"), b.style.display = "block"
                }
            },
            buildAllPopupPro: function(a) {
                var b = DownloadZipModule;
                b.isAdvancedSettings = !0;
                var c = document.querySelector(".ext_all_popup_wrap"),
                    d = a.count;
                if (c) {
                    var e = c.querySelector(".ext_dl_all_popup"),
                        f = c.querySelector(".ext_popup_header"),
                        g = c.querySelector(".ext_dl_all_popup_loader"),
                        h = c.querySelector(".ext_popup_links_wrap"),
                        i = e.querySelector(".ext_popup_footer");
                    h.innerHTML = "", f.innerHTML = chrome.i18n.getMessage("files_found_on_page") + ": <br>" + d;
                    var j = document.createElement("div");
                    j.className = "choose_count_dl_all_form", j.innerHTML = '<div class="ext_form_header">' + chrome.i18n.getMessage("advanced_settings_mass_download") + '</div><div class="ext_form_al_all_block"><div class="ext_form_al_all_sub_block"><div class="ext_half_66 ext_text_left"><span class="ext_span_label" title="' + chrome.i18n.getMessage("by_default_100") + '">' + chrome.i18n.getMessage("set_percent") + '</span></div><div class="inline_block ext_label_wrap"><label class="ext_switch" title="' + chrome.i18n.getMessage("by_default_100") + '"><input type="checkbox" name="percent_toggler"><span class="ext_slider"></span></label></div><div class="ext_half_33 ext_text_right"><input name="percent_count" type="number" max="100" min="1" value="100" class="ext_disabled" disabled>%</div></div><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("most_liked") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="most_liked" disabled><span class="ext_slider ext_disabled"></span></label></div></div><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label" title="' + chrome.i18n.getMessage("only_video") + '">' + chrome.i18n.getMessage("most_viewed") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch" title="' + chrome.i18n.getMessage("only_video") + '"><input type="checkbox" name="most_viewed" disabled><span class="ext_slider ext_disabled"></span></label></div></div></div><div class="ext_form_al_all_block"><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("only_photo") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="only_photo"><span class="ext_slider"></span></label></div></div><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("only_video") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="only_video"><span class="ext_slider"></span></label></div></div></div><div class="ext_form_al_all_block"><div class="ext_half_66 ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("for_previous_days") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="for_previous_days"><span class="ext_slider"></span></label></div></div><div class="ext_half_33 ext_text_right"><input type="number" name="last_days_count" class="ext_disabled" max="365" min="1" value="365" disabled></div></div>', h.appendChild(j);
                    var k = document.createElement("div");
                    k.className = "ext_btn_wrap", k.innerHTML = '<div class="ext_popup_dl_btn" data-count=""><span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download") + "</span></div>", i.innerHTML = '<a href="#">' + chrome.i18n.getMessage("mass_download_pro_back") + "</a>", i.querySelector("a").addEventListener("click", function(c) {
                        c.stopPropagation(), c.preventDefault(), b.massDownloadProSettings = !1, globalUtils.sendMessage("massDownloadProSettingOff"), DownloadZipModule.buildAllPopup(a)
                    });
                    var l = $(j),
                        m = $('[name="percent_toggler"]', l),
                        n = $('[name="percent_count"]', l),
                        o = $('[name="only_photo"]', l),
                        p = $('[name="only_video"]', l),
                        q = $('[name="for_previous_days"]', l),
                        r = $('[name="last_days_count"]', l),
                        s = $('[name="most_liked"]', l),
                        t = $('[name="most_viewed"]', l);
                    $.fn.enableInput || ($.fn.enableInput = function() {
                            var a = this;
                            a && a.length && "input" == a.get(0).tagName.toLowerCase() && (a.removeAttr("disabled"), "checkbox" == a.attr("type") ? a.parent().find(".ext_slider").removeClass("ext_disabled") : "number" == a.attr("type") && a.removeClass("ext_disabled"))
                        }), $.fn.disableInput || ($.fn.disableInput = function() {
                            var a = this;
                            a && a.length && "input" == a.get(0).tagName.toLowerCase() && (a.attr("disabled", !0), "checkbox" == a.attr("type") ? a.parent().find(".ext_slider").addClass("ext_disabled") : "number" == a.attr("type") && a.addClass("ext_disabled"))
                        }), m.on("change", function() {
                            this.checked ? (s.enableInput(), p.prop("checked") && t.enableInput(), n.enableInput(), n.focus(), n.select()) : (s.disableInput(), s.prop("checked", !1), t.disableInput(), t.prop("checked", !1), n.disableInput())
                        }), o.on("change", function() {
                            this.checked && (p.prop("checked", !1), t.prop("checked", !1), t.disableInput())
                        }), p.on("change", function() {
                            this.checked ? (o.prop("checked", !1), m.prop("checked") && t.enableInput()) : (t.prop("checked", !1), t.disableInput())
                        }), q.on("change", function() {
                            this.checked ? (r.enableInput(), r.focus(), r.select()) : r.disableInput()
                        }), t.on("change", function() {
                            this.checked && s.prop("checked", !1)
                        }), s.on("change", function() {
                            this.checked && t.prop("checked", !1)
                        }), $(j.querySelector('[name="last_days_count"]')).on("keydown", function() {
                            var a = this;
                            setTimeout(function() {
                                var b = parseInt(a.value);
                                isNaN(b) || 1 > b ? a.value = 1 : b > 999 && (a.value = 999)
                            }, 200)
                        }), $(j.querySelector('[name="percent_count"]')).on("keydown", function() {
                            var a = this;
                            setTimeout(function() {
                                var b = parseInt(a.value);
                                isNaN(b) || 1 > b ? a.value = 1 : b > 100 && (a.value = 100), 100 > b ? s.enableInput() : (s.disableInput(), s.prop("checked", !1))
                            }, 200)
                        }),
                        function() {
                            var a = b.advancedDownloadAllSettings.get() || {};
                            a.percent && a.percent < 100 && (m.prop("checked", !0), n.enableInput(), n.val(a.percent), s.enableInput(), a.most_liked && s.prop("checked", !0), "video" == a.mediaType && (t.enableInput(), a.most_viewed && t.prop("checked", !0))), "photo" == a.mediaType ? o.prop("checked", !0) : "video" == a.mediaType && p.prop("checked", !0), a.previousDays && (q.prop("checked", !0), r.enableInput(), r.val(a.previousDays))
                        }(), h.appendChild(k), g.style.display = "none", e.style.display = "block"
                }
            },
            downloadAllByAdvanced: function() {
                var a, b, c = $(".choose_count_dl_all_form"),
                    d = {},
                    e = $('[name="percent_toggler"]', c),
                    f = $('[name="only_photo"]', c),
                    g = $('[name="only_video"]', c),
                    h = $('[name="for_previous_days"]', c);
                if (h.prop("checked")) {
                    a = parseInt($('[name="last_days_count"]', c).val());
                    var i = new Date;
                    b = new Date(i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate()).getTime(), d.timeFrom = Math.floor((b - 864e5 * a) / 1e3), d.previousDays = a
                }
                d.mediaType = f.prop("checked") ? "photo" : g.prop("checked") ? "video" : "all", e.prop("checked") && (d.percent = parseInt($('[name="percent_count"]', c).val()), d.most_liked = $('[name="most_liked"]', c).prop("checked"), g.prop("checked") && (d.most_viewed = $('[name="most_viewed"]', c).prop("checked"))), DownloadZipModule.advancedDownloadAllSettings.set(d), globalUtils.sendMessage("downloadAllProcessStart"), DownloadZipModule.downloadFromUserPage({
                    advanced: d
                }, function(a, b, c) {
                    a.length ? DownloadZipModule.downloadByShortCodes(a, b, c, d) : (globalUtils.sendMessage("downloadAllProcessFinished"), App.getModalBox().showErrorBox(chrome.i18n.getMessage("advanced_download_all_not_match")))
                }), $(".ext_dl_all_popup").parent().remove()
            },
            advancedDownloadAllSettings: {
                storageKey: "advanced_download_all_settings",
                set: function(a) {
                    localStorage[this.storageKey] = JSON.stringify({
                        percent: a.percent || null,
                        most_liked: a.most_liked || null,
                        most_viewed: a.most_viewed || null,
                        mediaType: a.mediaType || null,
                        previousDays: a.previousDays || null
                    })
                },
                get: function() {
                    return localStorage[this.storageKey] && JSON.parse(localStorage[this.storageKey])
                }
            },
            onClickDownloadAllBtn: function() {
                if (DownloadZipModule.zipCanceledByUser = !1, DownloadZipModule.isAdvancedSettings) return DownloadZipModule.downloadAllByAdvanced();
                var a, b, c;
                switch (DownloadZipModule.pageType) {
                    case DownloadZipModule.PAGE_TYPE_DEFAULT:
                        var d = $("#ext_dl_all_start").val(),
                            e = $("#ext_dl_all_end").val();
                        a = e - d, c = 1;
                        break;
                    case DownloadZipModule.PAGE_TYPE_USERPAGE:
                        d = $("#ext_dl_all_start").val(), e = $("#ext_dl_all_end").val(), a = e - d, c = 2;
                        break;
                    case DownloadZipModule.PAGE_TYPE_ONE_POST:
                        d = 1, e = 1, a = 1, c = 1;
                        var f = document.querySelector("article header a"),
                            g = f && f.getAttribute("href");
                        b = g && g.match(/\/([^\/]+)\//), b = b && b[1];
                        break;
                    default:
                        globalUtils.trackEventWithRandom("Unknown_page_type_on_click_downloadAll", {
                            url: window.location.href,
                            pageType: DownloadZipModule.pageType
                        }, .1), d = $("#ext_dl_all_start").val(), e = $("#ext_dl_all_end").val(), a = e - d, c = 1
                }
                isNaN(d) && (d = 1), isNaN(e) && (e = 1);
                var h = function() {
                    if (1 === c) {
                        var a = App.getFoundShortCodes(d, e);
                        DownloadZipModule.downloadByShortCodes(a, null, b)
                    } else {
                        if (2 !== c) return;
                        DownloadZipModule.downloadFromUserPage({
                            start: d,
                            end: e
                        }, function(a, b, c) {
                            DownloadZipModule.downloadByShortCodes(a, b, c)
                        })
                    }
                    globalUtils.sendMessage("downloadAllProcessStart")
                };
                a > 500 ? globalUtils.sendMessage("warning-request", function(a) {
                    a ? App.getModalBox().showDownloadAllWarning({
                        continueCallback: function() {
                            h()
                        }
                    }) : h()
                }) : h(), $(".ext_dl_all_popup").parent().remove()
            },
            checkPossibilityVirtualScrollPage: function(a, b) {
                var c = document.querySelector("main article header section h1"),
                    d = c && c.innerText;
                d || (d = globalUtils.getUserNameFromWindowLocation()), a.userName = d, globalUtils.getPostsDataFromUserGraphql(a, function(c) {
                    if (!c || c.error || "undefined" == typeof c.userId) return b({
                        error: 1
                    });
                    if (!a.fromTagged && ("undefined" == typeof c.end_cursor || "undefined" == typeof c.has_next_page || "undefined" == typeof c.count || "undefined" == typeof c.shortcodes)) return b({
                        error: 1
                    });
                    var e = c.count,
                        f = c.end_cursor,
                        g = c.userId;
                    return c.has_next_page === !1 ? b({
                        success: 1,
                        count: e
                    }) : void globalUtils.getPostsDataFromUserGraphqlOther({
                        end_cursor: f,
                        user_name: d,
                        user_id: g,
                        touch: !0,
                        from_saved: a.fromSaved,
                        from_tagged: a.fromTagged,
                        first: 12
                    }, function(c) {
                        return !c || c.error || "undefined" == typeof c.end_cursor || "undefined" == typeof c.has_next_page || "undefined" == typeof !c.shortcodes ? b({
                            error: 1
                        }) : (a.fromTagged && (e = c.has_next_page === !1 ? c.count : "unknown"), b({
                            success: 1,
                            count: e
                        }))
                    })
                })
            },
            downloadFromUserPage: function(a, b) {
                function c() {
                    if (!i.zipCanceledByUser) {
                        if (!k && m && d.length >= m || !g || h && !k) {
                            !k && l && m && (d = d.slice(l - 1, m));
                            var n = 100 * o;
                            return b(d, n, t)
                        }
                        if (!k && !e || !f) return globalUtils.trackEventWithRandom("error_download_zip", {
                            method: "scrollPage",
                            type: "endCursor_userId",
                            endCursor: e,
                            userId: f,
                            userName: t,
                            fromSaved: j,
                            fromTagged: k
                        }, .1), globalUtils.sendMessage("downloadAllProcessFinished"), r.showErrorBox(chrome.i18n.getMessage("errorZip"));
                        var s = !1,
                            v = setTimeout(function() {
                                q.no_progress = !0, q.dont_panic = !0, s = !0, r.updatePrepareZipProgressBarAndText(q)
                            }, 2e4);
                        globalUtils.getPostsDataFromUserGraphqlOther({
                            end_cursor: e,
                            user_name: t,
                            user_id: f,
                            from_saved: j,
                            from_tagged: k,
                            downloadZipObj: DownloadZipModule,
                            advanced: a.advanced
                        }, function(a) {
                            if (!DownloadZipModule.zipCanceledByUser) {
                                if (clearTimeout(v), !a || a.error) return globalUtils.trackEventWithRandom("error_download_zip", {
                                    method: "scrollPage",
                                    type: "getPostsDataFromUserGraphqlOther",
                                    endCursor: e,
                                    userId: f,
                                    userName: t,
                                    fromSaved: j
                                }, .1), globalUtils.sendMessage("downloadAllProcessFinished"), r.showErrorBox(chrome.i18n.getMessage("errorZip"));
                                if (s && (q.no_progress = !1, q.dont_panic = !1, s = !1), e = a.end_cursor, g = a.has_next_page, h = a.time_end, d = d.concat(a.shortcodes), q.oneValuePercent = p * (a.shortcodes.length || 1), r.updatePrepareZipProgressBarAndText(q), u++, 50 > u) var b = 500;
                                else b = 100 > u ? 1e3 : 200 > u ? 2e3 : 3e3;
                                setTimeout(function() {
                                    c()
                                }, b)
                            }
                        })
                    }
                }
                if ("function" == typeof b) {
                    var d = [],
                        e = null,
                        f = null,
                        g = !0,
                        h = !0,
                        i = this,
                        j = -1 !== window.location.href.indexOf("/saved/"),
                        k = -1 !== window.location.href.indexOf("/tagged/"),
                        l = a.start,
                        m = a.end,
                        n = m;
                    !n && a.advanced && (a.advanced.previousDays && (n = 2 * a.advanced.previousDays), n = 500);
                    var o = .6,
                        p = 100 / n * o,
                        q = {
                            from_tagged: k,
                            allCount: n,
                            maxValue: 100 * o,
                            oneValuePercent: p
                        },
                        r = App.getModalBox();
                    r.showPrepareDownloadProcess({
                        from_tagged: k,
                        header: chrome.i18n.getMessage("prepare_zip_links"),
                        bar_start: 0
                    }, {
                        cancelCallback: function() {
                            i.zipCanceledByUser = !0, globalUtils.sendMessage("downloadAllProcessFinished")
                        }
                    });
                    var s = document.querySelector("main header section h1"),
                        t = s && s.innerText;
                    if (t || (t = globalUtils.getUserNameFromWindowLocation()), !t) return globalUtils.trackEvent("no_username", {
                        method: "downloadFromUserPage",
                        url: window.location.href
                    }), globalUtils.sendMessage("downloadAllProcessFinished"), r.showErrorBox(chrome.i18n.getMessage("errorZip"));
                    globalUtils.getPostsDataFromUserGraphql({
                        userName: t,
                        fromSaved: j,
                        fromTagged: k,
                        advanced: a.advanced
                    }, function(a) {
                        return !a || a.error ? (globalUtils.trackEventWithRandom("error_download_zip", {
                            method: "getPostsDataFromUserGraphql",
                            userName: t,
                            fromSaved: j
                        }, .1), globalUtils.sendMessage("downloadAllProcessFinished"), r.showErrorBox(chrome.i18n.getMessage("errorZip"))) : (f = a.userId, k ? g = !0 : (e = a.end_cursor, g = a.has_next_page, h = a.time_end, d = d.concat(a.shortcodes), q.oneValuePercent = p * (a.shortcodes.length || 1)), r.updatePrepareZipProgressBarAndText(q), void c())
                    });
                    var u = 0;
                    globalUtils.firstParamRequestJSONgraphqlQuery = 48
                }
            },
            downloadByShortCodes: function(a, b, c, d) {
                DownloadZipModule.prepareLinksByShortCodes(a, b, d, function(a) {
                    if (a && a.length) DownloadZipModule.downloadZIP(a, c);
                    else if (DownloadZipModule.zipCanceledByUser);
                    else {
                        globalUtils.sendMessage("downloadAllProcessFinished");
                        var b = App.getModalBox();
                        if (a && a.error && "not_match" == inks.error) var d = chrome.i18n.getMessage("advanced_download_all_not_match");
                        else d = chrome.i18n.getMessage("errorZip");
                        b.showErrorBox(d)
                    }
                })
            },
            prepareLinksByShortCodes: function(a, b, c, d) {
                function e(a, b, c, d, f) {
                    if (j.zipCanceledByUser) return b();
                    if (!n) return m && !f ? void setTimeout(function() {
                        e(a, b, c, d)
                    }, 2e4) : void globalUtils.getAllMediaDataFromJsonGraphql({
                        shortCode: d
                    }, function(h) {
                        return h && h.error && 429 == h.reason ? m ? f ? ++f < 2 ? void setTimeout(function() {
                            e(a, b, c, d, f)
                        }, 20 * f * 1e3) : (n = !0, b(), void g(c)) : void setTimeout(function() {
                            e(a, b, c, d)
                        }, 1e4) : (m = !0, f = 1, o.no_progress = !0, o.dont_panic = !0, l.updatePrepareZipProgressBarAndText(o), void setTimeout(function() {
                            e(a, b, c, d, f)
                        }, 2e4)) : h && !h.error && h.length ? (m && (m = !1, o.no_progress = !1, o.dont_panic = !1), h.forEach(function(a) {
                            k.push(a)
                        }), l.updatePrepareZipProgressBarAndText(o), void a(d)) : (c.push(d), void a(d))
                    })
                }

                function f(a) {
                    if (!c) return a;
                    var b = [];
                    if ("all" !== c.mediaType) {
                        if (a.forEach(function(a) {
                                c.mediaType == a.type && b.push(a)
                            }), !b || !b.length) return {
                            error: "not_match"
                        }
                    } else b = a;
                    if (c.percent && c.percent < 100) {
                        c.most_liked ? globalUtils.objectSortByProp(b, "likes_count", !0) : "video" == c.mediaType && c.most_viewed ? globalUtils.objectSortByProp(b, "video_view_count", !0) : b = globalUtils.shuffle(b);
                        var d = Math.ceil(b.length * c.percent / 100);
                        b = b.splice(0, d)
                    }
                    return b
                }

                function g(a, b) {
                    b = b || 0, b++;
                    var c = 4;
                    if (b > c) {
                        var h = 0;
                        return a.forEach(function(a) {
                            var b = App.getCachedLinkByShortCode(a);
                            b && (k.push(b), h++)
                        }), a.length - h > 5 && a.length > i / 10 + h ? (globalUtils.trackEventWithRandom("error_download_zip", {
                            method: "prepareLinksByShortCodes",
                            type: "many tries",
                            rejectedCount: a.length,
                            allCount: i
                        }, .1), d({
                            error: 1
                        })) : void d(f(k))
                    }
                    if (n) return .9 * i > k.length ? (globalUtils.trackEventWithRandom("error_download_zip", {
                        method: "prepareLinksByShortCodes",
                        type: "429TooLong",
                        successCount: k.length,
                        allCount: i
                    }, .1), d({
                        error: 1
                    })) : void d(f(k));
                    var l = [];
                    App.customPromiseAll({
                        data: a,
                        asyncCount: 12 / b
                    }, function(a, b, c) {
                        e(b, c, l, a)
                    }).thenOne(function(a) {
                        return j.zipCanceledByUser ? d() : void(l.length ? setTimeout(function() {
                            g(l, b)
                        }, 3e3 * b) : d(f(k)))
                    }, function(a) {
                        return d()
                    })
                }
                if ("function" == typeof d) {
                    if (!Array.isArray(a) || !a.length) return d();
                    b = b || 0;
                    var h = (100 - b) / 100,
                        i = a.length,
                        j = this,
                        k = [],
                        l = App.getModalBox(),
                        m = !1,
                        n = !1,
                        o = {
                            allCount: i,
                            oneValuePercent: 100 / i * h
                        };
                    l.showPrepareDownloadProcess({
                        header: chrome.i18n.getMessage("prepare_zip_links"),
                        bar_start: b
                    }, {
                        cancelCallback: function() {
                            j.zipCanceledByUser = !0, globalUtils.sendMessage("downloadAllProcessFinished")
                        }
                    }), g(a)
                }
            },
            downloadZIP: function(a, b, c, d) {
                function e() {
                    h.zipCanceledByUser = !0, k.aborted = !0, g()
                }

                function f(a) {
                    if (h.zipCanceledByUser) return void(k.aborted = !0);
                    if ("undefined" == typeof l[a]) g();
                    else if (0 == l[a].length && l[a + 1] && l[a + 1].length) setTimeout(function() {
                        f(a + 1)
                    }, 1e3 * (a + 1));
                    else if (0 != l[a].length || l[a + 1] && l[a + 1].length)
                        if (l[a].length) {
                            var b = l[a].shift();
                            JSZipUtils.getBinaryContent(b.url, function(c, d) {
                                c ? l[a + 1] && l[a + 1].push(b) : (n.rejectedCount--, n.successCount++, n.retrySuccessCount++, n.lastSuccess = !0, j.updateDownloadZipProgressBar(n), i.file(b.filename, d, {
                                    binary: !0
                                })), setTimeout(function() {
                                    f(a)
                                }, 1e3 * a)
                            }, k, p)
                        } else g();
                    else g()
                }

                function g() {
                    d || globalUtils.sendMessage("downloadAllProcessFinished"), i.generateAsync({
                        type: "blob"
                    }).then(function(a) {
                        var d = new Date,
                            e = b + "_" + d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + ".zip";
                        saveAs(a, e), j.close(), "function" == typeof c && c({
                            success: 1
                        }), globalUtils.sendMessage({
                            action: "downloadZip",
                            count: m,
                            successCount: n.successCount
                        })
                    })
                }
                var h = this,
                    i = new JSZip;
                b = b || "Instagram";
                var j = App.getModalBox(),
                    k = {
                        aborted: !1
                    },
                    l = [null, [],
                        [],
                        []
                    ],
                    m = a.length,
                    n = {
                        allCount: m,
                        successCount: 0,
                        rejectedCount: 0,
                        retrySuccessCount: 0,
                        retryRequestsCount: void 0,
                        oneValuePercent: 100 / m,
                        lastSuccess: !1
                    },
                    o = 6e4,
                    p = 3e5,
                    q = {
                        enoughCallback: e
                    };
                d ? q.cancelCallback = function() {
                    h.zipCanceledByUser = !0, k.aborted = !0
                } : q.cancelCallback = function() {
                    h.zipCanceledByUser = !0, k.aborted = !0, globalUtils.sendMessage("downloadAllProcessFinished")
                }, j.showDownloadProcess(m, q), App.customPromiseAll({
                    data: a,
                    asyncCount: 12
                }, function(a, b, c) {
                    return h.zipCanceledByUser ? (k.aborted = !0, c()) : void JSZipUtils.getBinaryContent(a.url, function(c, d) {
                        c ? (n.rejectedCount++, l[1].push(a), b(a.filename)) : (n.successCount++, n.lastSuccess = !0, j.updateDownloadZipProgressBar(n), i.file(a.filename, d, {
                            binary: !0
                        }), b(a.filename))
                    }, k, o)
                }).thenOne(function(a) {
                    h.zipCanceledByUser || (l[1].length ? (n.retryRequestsCount = l[1].length, n.text = chrome.i18n.getMessage("retry_requests"), n.lastSuccess = !1, j.updateDownloadZipProgressBar(n), setTimeout(function() {
                        f(1)
                    }, 1e3)) : g())
                }, function(a) {
                    d || globalUtils.sendMessage("downloadAllProcessFinished"), h.zipCanceledByUser || (j.showErrorBox(chrome.i18n.getMessage("errorZip")), "function" == typeof c && c({
                        error: 1
                    }), globalUtils.trackEventWithRandom("error_download_zip", {
                        count: m,
                        successCount: n.successCount
                    }, .1))
                })
            }
        }
    }(),
    StoriesModule = function() {
        return {
            dlBtnClassName: "ext_stories_dl_btn",
            showingStoryItems: [],
            showingStoryType: null,
            allCurrentStories: [],
            gallery: null,
            lastTimeStoryUpdate: 0,
            lastTimeLiveStoriesUpdate: 0,
            lastTimeAllStoriesUpdate: 0,
            storyUpdatePeriod: 2e4,
            liveStoriesUpdatePeriod: 6e4,
            allStoriesUpdatePeriod: 6e5,
            storyTrayElTpl: null,
            storyLiveElTpl: null,
            storyNativeLiveElTpl: null,
            storiesWrapperClass: "ext_stories_wrap",
            cachedStoriesMedia: {},
            updatePageInterval: 0,
            cacheStorage: {
                topLives: {},
                friendStories: {
                    live: {},
                    post_live: {},
                    story: {}
                }
            },
            defaultNavItem: "friends",
            currentNavItem: this.defaultNavItem,
            getPrepareLiveStory: function(a) {
                try {
                    var b = [];
                    if (a.broadcasts) a.broadcasts.forEach(function(a) {
                        try {
                            var c = {
                                story_type: "post_live",
                                dash_manifest: a.dash_manifest,
                                html: '<div class="ext_video_preload"><span></span></div><div class="video_post_live_removed">' + chrome.i18n.getMessage("post_live_removed") + '</div><video class="ext_video_story_player" controls></video>',
                                user_pk: a.broadcast_owner.pk,
                                username: a.broadcast_owner.username,
                                userPic: a.broadcast_owner.profile_pic_url
                            };
                            b.push(c)
                        } catch (d) {
                            globalUtils.trackErrorParseAjaxResponse({
                                method: "getPrepareLiveStory",
                                error: d,
                                data: a,
                                random: .05
                            })
                        }
                    });
                    else {
                        var c = a.dash_abr_playback_url;
                        if (c || (c = a.dash_playback_url), !c) return globalUtils.trackEventWithRandom("NO_dash_playback_url", {
                            storyObj: a
                        }, .1), null;
                        var d = c.match(/(\d+)\.mpd/);
                        d = d ? d[1] : a.id;
                        try {
                            b.push({
                                story_type: "live",
                                media_id: d,
                                playback_url: c,
                                html: '<div class="ext_video_preload"><span></span></div><div class="video_live_finished">' + chrome.i18n.getMessage("broadcast_finished") + '</div><video src="' + c + '" class="ext_video_story_player" controls></video><div class="chatbox_header"></div><div class="live_chatbox"></div>',
                                user_pk: a.broadcast_owner.pk,
                                username: a.broadcast_owner.username,
                                userPic: a.broadcast_owner.profile_pic_url,
                                viewer_count: parseInt(a.viewer_count)
                            })
                        } catch (e) {
                            globalUtils.trackErrorParseAjaxResponse({
                                method: "getPrepareLiveStory",
                                error: e,
                                data: a,
                                random: .05
                            })
                        }
                    }
                    return b
                } catch (e) {
                    globalUtils.trackCodeError(e, "getPrepareLiveStory")
                }
            },
            getPrepareStoryItems: function(a) {
                var b = [];
                return a.forEach(function(a) {
                    try {
                        var c, d = null,
                            e = 0,
                            f = 0,
                            g = void 0,
                            h = void 0,
                            i = "undefined" != typeof a.video_versions;
                        i ? (a.video_versions.forEach(function(a) {
                            try {
                                a.width > e ? (e = a.width, f = a.height, d = a.url) : a.width < g && (g = a.width, h = a.url)
                            } catch (b) {
                                globalUtils.trackErrorParseAjaxResponse({
                                    method: "getPrepareStoryItems 1",
                                    error: b,
                                    data: a,
                                    random: .01
                                })
                            }
                        }), a.image_versions2.candidates.forEach(function(a) {
                            try {
                                g = a.width, h = a.url
                            } catch (b) {
                                globalUtils.trackErrorParseAjaxResponse({
                                    method: "getPrepareStoryItems 2",
                                    error: b,
                                    data: a,
                                    random: .01
                                })
                            }
                        }), c = "mp4", -1 !== d.indexOf(".flv") && (c = "flv")) : (a.image_versions2.candidates.forEach(function(a) {
                            try {
                                a.width > e && (e = a.width, f = a.height, d = a.url), "undefined" == typeof g ? (g = a.width, h = a.url) : a.width < g && (g = a.width, h = a.url)
                            } catch (b) {
                                globalUtils.trackErrorParseAjaxResponse({
                                    method: "getPrepareStoryItems 3",
                                    error: b,
                                    data: a,
                                    random: .01
                                })
                            }
                        }), c = "jpg", -1 !== d.indexOf(".png") && (c = "png"));
                        var j = d.match(/\/([^\/?]+)(?:$|\?)/);
                        j = j && j[1], j || (j = "noname." + c);
                        var k = {
                            w: e,
                            h: f,
                            isVideo: i,
                            type: i ? "video" : "photo",
                            url: d,
                            prev: h,
                            filename: j,
                            story_type: "tray",
                            username: a.user.username,
                            userPic: a.user.profile_pic_url,
                            locations: a.story_locations,
                            hashtags: a.story_hashtags
                        };
                        i ? k.html = '<div class="ext_video_preload"><span></span></div><video class="ext_video_story_player" poster="" controls><source src="' + d + '" type="video/mp4"> </video>' : k.src = d, b.push(k)
                    } catch (l) {
                        globalUtils.trackCodeError(l, "getPrepareStoryItems")
                    }
                }), b
            },
            createPswp: function() {
                var a = document.createElement("div");
                a.setAttribute("tabindex", "-1"), a.setAttribute("role", "dialog"), a.setAttribute("aria-hidden", "true"), a.className = "pswp insta_down";
                var b = chrome.i18n.getMessage("download"),
                    c = chrome.i18n.getMessage("download_all");
                return a.innerHTML = '<div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden pswp__ctrls-wrap"><div class="pswp__top-bar"><div class="pswp__counter"></div><div class="dl_btns_container"><a type="button" class="' + StoriesModule.dlBtnClassName + ' ext_ds_dl_btn ext_story__download" title="' + b + '"><span class="ext_icon"></span><span class="ext_text">' + b + '</span></a><a type="button" class="' + StoriesModule.dlBtnClassName + ' ext_ds_dl_all_btn ext_story__download_all" title="' + c + '"><span class="ext_icon"></span><span class="ext_text">' + c + '</span></a></div><div class="live_header"><span class="live_icon"></span><span class="viewers_count"><span class="eye_icon"></span><span class="count_text">count</span></span></div><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="story_author_wrap"><div class="story_author_wrap_2"><a target="_blank" class="author_link"><img src="" class="story_author_icon"></a><div class="story_author_name"></div></div></div><div class="story_location_hashtags_wrap"></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div>', document.querySelector("body").appendChild(a), a
            },
            getPswp: function() {
                var a = document.querySelector(".insta_down");
                return a ? a : this.createPswp()
            },
            stopAllVideos: function() {
                var a = document.querySelectorAll(".ext_video_story_player");
                a && a.forEach && a.forEach(function(a) {
                    a.pause()
                })
            },
            getLiveComments: function(a, b, c) {
                function d() {
                    i || $.ajax({
                        method: "GET",
                        url: h,
                        dataType: "json"
                    }).done(function(a) {
                        k = 0, e(a) && setTimeout(d, j)
                    }).fail(function(a) {
                        return k++, 7 > k ? void setTimeout(function() {
                            d()
                        }, 500) : void("function" == typeof c && c())
                    })
                }

                function e(a) {
                    try {
                        if (!a || "object" != typeof a || "ok" != a.status) return globalUtils.trackUnknownAjaxResponse({
                            method: "handleCommentResponse",
                            url: url,
                            data: a,
                            random: .01
                        }), 6 >= k;
                        if (a.comment_muted) return b.commentMuted(), !0;
                        var c = a.comments;
                        if (!c || !c.length) return !0;
                        globalUtils.objectSortByProp(c, "created_at"), b.is_muted && b.commentActive(), c.forEach(function(a) {
                            b.addComment(a)
                        });
                        var d = c.pop();
                        return f = parseInt(d.created_at), !f || isNaN(f) ? (globalUtils.trackEvent("unknown_comment_data", {
                            url: h,
                            type: "code_200_unknown_response",
                            data: d
                        }), !0) : (h = g + "?last_comment_ts=" + f, !0)
                    } catch (e) {
                        globalUtils.trackCodeError(e, "handleCommentResponse")
                    }
                }
                var f, g = "https://i.instagram.com/api/v1/live/" + a + "/get_comment/",
                    h = g,
                    i = !1,
                    j = 4e3,
                    k = 0;
                return d(), {
                    stop: function() {
                        i = !0
                    }
                }
            },
            getLiveInfo: function(a, b, c) {
                function d() {
                    i || $.ajax({
                        method: "GET",
                        url: f,
                        dataType: "json"
                    }).done(function(a) {
                        try {
                            g = 0, e(a) && setTimeout(d, h)
                        } catch (b) {
                            globalUtils.trackCodeError(b, "getLiveInfo2")
                        }
                    }).fail(function(a) {
                        try {
                            var b = a.responseJSON;
                            g++, 7 > g ? setTimeout(function() {
                                d()
                            }, 500) : 400 == a.status && b && "login_required" != b.message && "function" == typeof c ? c() : b ? "string" == typeof b.message && "broadcast is unavailable" !== b.message.toLowerCase() && globalUtils.trackEventWithRandom("error_info_live_url", {
                                url: f,
                                type: "unknown_response",
                                response: b
                            }, .01) : globalUtils.trackEventWithRandom("error_info_live_url", {
                                url: f,
                                type: "no_response",
                                resCode: a.status
                            }, .01)
                        } catch (e) {
                            globalUtils.trackCodeError(e, "getLiveInfo3")
                        }
                    })
                }

                function e(a) {
                    return a && "object" == typeof a && "ok" == a.status ? (b.setViewersCount(a.viewer_count), !0) : (globalUtils.trackEventWithRandom("error_comment_url", {
                        url: f,
                        type: "code_200_unknown_response",
                        response: a
                    }, .01), 6 >= g)
                }
                var f = "https://i.instagram.com/api/v1/live/" + a + "/info/",
                    g = 0,
                    h = 1e4,
                    i = !1;
                return d(), {
                    stop: function() {
                        i = !0
                    }
                }
            },
            chatBoxInit: function(a) {
                try {
                    var b, c, d, e, f, g, h, i, j = function() {
                            return document.querySelector(".live_chatbox")
                        },
                        k = function() {
                            return document.querySelector(".chatbox_header")
                        };
                    if (b = j(), c = k(), !b) return null;
                    if (!c) return null;
                    if (!a) return null;
                    if ("object" != typeof Ps || null == Ps) return null;
                    Ps.initialize(b, {
                        wheelSpeed: 2,
                        minScrollbarLength: 20,
                        maxScrollbarLength: 60
                    });
                    var l = function() {
                            return b ? (b.style.display = "block", b.style.opacity = 1, g = !0, h = !1, !0) : !1
                        },
                        m = function() {
                            return b ? (b.style.display = "none", g = !1, h = !0, !0) : !1
                        },
                        n = function() {
                            h ? (c.innerText = e, l()) : (c.innerText = d, m())
                        },
                        o = function() {
                            return c ? (c.display = "block", !0) : !1
                        },
                        p = function() {
                            try {
                                var d = a.getBoundingClientRect();
                                if ("undefined" == typeof d) return void globalUtils.trackEvent("error_getBoundingClientRect");
                                c.style.left = d.left + d.width + "px", c.style.top = d.top + 50 + "px", c.style.display = "block", b.style.left = d.left + d.width + "px", b.style.top = d.top + 80 + "px", b.style.height = d.height - 100 + "px"
                            } catch (e) {
                                globalUtils.trackCodeError(e, "updatePositionAndSize")
                            }
                        },
                        q = function() {
                            try {
                                i = document.createElement("div"),
                                    i.className = "one_comment_wrap";
                                var a = document.createElement("a");
                                a.className = "author_link", a.setAttribute("target", "_blank");
                                var b = document.createElement("img");
                                b.className = "comment_author_icon", a.appendChild(b);
                                var c = document.createElement("div");
                                c.className = "comment_author_name";
                                var d = document.createElement("p");
                                d.className = "live_comment_text", i.appendChild(a), i.appendChild(c), i.appendChild(d)
                            } catch (e) {
                                globalUtils.trackCodeError(e, "createCommentElTpl")
                            }
                        },
                        r = function() {
                            return i || q(), i.cloneNode(!0)
                        };
                    return d = chrome.i18n.getMessage("show_live_comments"), e = chrome.i18n.getMessage("hide_live_comments"), f = chrome.i18n.getMessage("comments_is_muted"), c.innerText = e, p(), c.addEventListener("click", n), a.addEventListener("resize", p), window.addEventListener("resize", p), {
                        is_muted: !1,
                        commentMuted: function() {
                            this.is_muted || (this.is_muted = !0, c && c.removeEventListener("click", n), c.innerText = f)
                        },
                        commentActive: function() {
                            this.is_muted && (this.is_muted = !1, c.innerText = e, c.addEventListener("click", n))
                        },
                        shown: function() {
                            return g
                        },
                        hidden: function() {
                            return h
                        },
                        show: l,
                        hide: m,
                        addComment: function(a) {
                            try {
                                var c = b.scrollHeight,
                                    d = r(),
                                    e = d.querySelector("a.author_link");
                                e.href = "https://www.instagram.com/" + a.user.username;
                                var f = d.querySelector("img.comment_author_icon");
                                f.src = a.user.profile_pic_url;
                                var g = d.querySelector("div.comment_author_name");
                                g.innerText = a.user.username;
                                var h = d.querySelector("p.live_comment_text");
                                h.innerText = a.text, b.appendChild(d), c < b.scrollTop + b.clientHeight + 50 && $(b).animate({
                                    scrollTop: b.scrollHeight
                                }, 800)
                            } catch (i) {
                                globalUtils.trackCodeError(i, "addComment")
                            }
                        },
                        destroy: function() {
                            c && c.removeEventListener("click", n), a && a.removeEventListener("resize", p), window.removeEventListener("resize", p), m(), o()
                        }
                    }
                } catch (s) {
                    globalUtils.trackCodeError(s, "chatBoxInit")
                }
            },
            showInPswp: function(a) {
                try {
                    var b = this;
                    if (!a || !a.length) return;
                    var c, d, e, f, g, h, i, j, k, l, m = function(a, b) {
                            var c = document.querySelector(".ext_ds_dl_btn"),
                                d = document.querySelector(".ext_ds_dl_all_btn");
                            c && d && ("tray" == a ? (c.style.display = "block", b > 1 ? d.style.display = "block" : d.style.display = "none") : (c.style.display = "none", d.style.display = "none"))
                        },
                        n = function() {
                            try {
                                var a = document.querySelector(".video_live_finished");
                                if (!(i && a && h && d && l)) return;
                                i.style.display = "none", a.style.display = "block", h.pause(), d.pause(), l.hide()
                            } catch (b) {
                                globalUtils.trackCodeError(b, "stopEndedBroadcast")
                            }
                        },
                        o = function() {
                            j || (j = !0, n())
                        },
                        p = function() {
                            b.stopAllVideos(), e && e.stop(), f && f.stop(), g && g.destroy(), l && l.hide(), x(), "tray" !== c.currItem.story_type && d && (d.pause(), d.reset())
                        },
                        q = function() {
                            k = !0, i && (i.style.display = "none")
                        },
                        r = function() {
                            k = !0, i && (i.style.display = "none")
                        },
                        s = function() {
                            k = !1, setTimeout(function() {
                                !k && i && (i.style.display = "flex")
                            }, 200)
                        },
                        t = function() {
                            var a, b, c = function() {
                                    return document.querySelector(".live_header")
                                },
                                d = function() {
                                    return a ? a.querySelector(".viewers_count .count_text") : void 0
                                };
                            return a = c(), b = d(), {
                                element: a,
                                viewersCountEl: b,
                                show: function() {
                                    return a || (a = c()), a ? (a.style.display = "block", !0) : !1
                                },
                                hide: function() {
                                    return a || (a = c()), a ? (a.style.display = "none", !0) : !1
                                },
                                setViewersCount: function(e) {
                                    return b || (a || (a = c()), b = d()), b ? (e = parseInt(e), "number" != typeof e || isNaN(e) ? (this.hide(), !1) : (b.innerText = e, this.show(), !0)) : (this.hide(), !1)
                                }
                            }
                        },
                        u = function(a) {
                            var b = 0,
                                c = 0;
                            return a.each(function(a, d) {
                                d.getAttribute("height") > b && (b = d.getAttribute("height"), c = a)
                            }), $(a.get(c)).text()
                        },
                        v = function(a) {
                            if (d = dashjs.MediaPlayer().create(), "post_live" == a.currItem.story_type) {
                                var c = a.currItem.dash_manifest;
                                try {
                                    var i = $.parseXML(c)
                                } catch (k) {}
                                if (!i) return a.currItem.video_removed = !0, void(a.currItem.container.querySelector(".video_post_live_removed").style.display = "block");
                                var m = $(i),
                                    n = m.find('Representation[mimeType="video/mp4"] BaseURL');
                                if (!n.length) return a.currItem.video_removed = !0, void(a.currItem.container.querySelector(".video_post_live_removed").style.display = "block");
                                var p = u(n);
                                if (!p) return a.currItem.video_removed = !0, void(a.currItem.container.querySelector(".video_post_live_removed").style.display = "block");
                                $.ajax({
                                    method: "HEAD",
                                    url: p
                                }).done(function() {
                                    d.initialize(h);
                                    var a = dashjs.FactoryMaker.getClassFactoryByName("XlinkController"),
                                        b = dashjs.FactoryMaker.getClassFactoryByName("DashParser"),
                                        e = a().create({}),
                                        f = b().create({}),
                                        g = f.parse(c, e);
                                    g.loadedTime = new Date, e.resolveManifestOnLoad(g), d.attachSource(g)
                                }).fail(function() {
                                    a.currItem.video_removed = !0, a.currItem.container.querySelector(".video_post_live_removed").style.display = "block"
                                })
                            } else {
                                j = !1, g = b.chatBoxInit(h), g.show(), l = t(), l.setViewersCount(a.currItem.viewer_count);
                                var q = a.currItem.playback_url;
                                d.initialize(h, q, !0), e = b.getLiveComments(a.currItem.media_id, g, o), f = b.getLiveInfo(a.currItem.media_id, l, o)
                            }
                            d.getDebug().setLogToBrowserConsole(!1), d.setStableBufferTime(2), d.setFragmentLoaderRetryAttempts(20), d.play()
                        },
                        w = function() {
                            h && (h.addEventListener("playing", q), h.addEventListener("canplay", r), h.addEventListener("waiting", s))
                        },
                        x = function() {
                            h && (h.removeEventListener("playing", q), h.removeEventListener("canplay", r), h.removeEventListener("waiting", s))
                        },
                        y = function(a) {
                            return a ? (document.querySelector(".story_author_wrap .author_link").href = "https://www.instagram.com/" + a.username, document.querySelector(".story_author_wrap .story_author_icon").src = a.userPic, document.querySelector(".story_author_wrap .story_author_name").innerText = a.username, void(document.querySelector(".story_author_wrap").style.display = "block")) : void(document.querySelector(".story_author_wrap").style.display = "none")
                        },
                        z = function(a) {
                            var b = $(".story_location_hashtags_wrap");
                            b.html(""), a.locations && a.locations.length && a.locations.forEach(function(a) {
                                $('<div class="story_location_item" data-id="' + a.location.pk + '"><div class="icon"></div><div class="name">' + a.location.name + "</div></div>").appendTo(b)
                            }), a.hashtags && a.hashtags.length && a.hashtags.forEach(function(a) {
                                $('<div class="story_hashtag_item" data-tag="' + a.hashtag.name + '"><div class="icon"></div><div class="name">' + a.hashtag.name + "</div></div>").appendTo(b)
                            })
                        };
                    b.showingStoryItems = a, b.showingStoryType = a[0].story_type;
                    var A = b.getPswp(),
                        B = {
                            index: 0,
                            closeOnScroll: !1,
                            history: !1,
                            focus: !0,
                            bgOpacity: .9,
                            escKey: !0
                        };
                    c = new PhotoSwipe(A, PhotoSwipeUI_Default, a, B), b.gallery = c, m(a[0].story_type, b.showingStoryItems.length), c.listen("afterChange", function() {
                        try {
                            if (!this.currItem.container) return;
                            y(this.currItem), z(this.currItem);
                            var a = this.currItem.isVideo || "tray" !== this.currItem.story_type;
                            if (a) {
                                if (k = !1, h = this.currItem.container.querySelector("video.ext_video_story_player"), i = this.currItem.container.querySelector(".ext_video_preload"), !h || !i) return;
                                i.style.display = "flex", h.currentTime = 0, w()
                            }
                            "tray" == this.currItem.story_type ? this.currItem.isVideo && (h.play(), 4 == h.readyState && (i.style.display = "none")) : v(this)
                        } catch (b) {
                            globalUtils.trackCodeError(b, "showInPswp")
                        }
                    }), c.listen("beforeChange", function() {
                        p()
                    }), c.listen("close", function() {
                        p(), b.showingStoryItems = [], b.showingStoryType = null, A && A.remove && A.remove()
                    }), c.listen("destroy", function() {
                        b.gallery = null
                    }), c.init()
                } catch (C) {
                    globalUtils.trackCodeError(C, "showInPswp")
                }
            },
            onClickDlBtnOurStoryOne: function(a) {
                var b = StoriesModule.gallery.currItem;
                if ("post_live" != b.story_type) {
                    var c = b.filename;
                    StoriesModule.gallery.currItem.username && (c = StoriesModule.gallery.currItem.username + "_" + c), StoriesModule.storiesPause.on(), globalUtils.downloadFile({
                        url: b.url,
                        filename: c,
                        isStory: !0
                    }, function() {})
                }
            },
            storiesPause: {
                isPausedByAs: !1,
                isNativeStories: function() {
                    return window.location.href.indexOf("/stories/") > -1
                },
                isOurStories: function() {
                    return !(!StoriesModule.gallery || !StoriesModule.gallery.currItem)
                },
                pauseNativeStories: function() {
                    var a = $(".KuJpX").get(0);
                    if (a) {
                        this.isPausedByAs = !0;
                        var b = setInterval(function() {
                            $('[role="presentation"] div:not(".ext_modal")').css({
                                opacity: 0
                            })
                        }, 10);
                        a.click(), setTimeout(function() {
                            clearInterval(b)
                        }, 300)
                    }
                },
                playNativeStories: function() {
                    var a = $('[role="presentation"]').get(0);
                    a && a.click(), this.isPausedByAs = !1
                },
                pauseOurStories: function() {
                    if (!StoriesModule.gallery || !StoriesModule.gallery.currItem || !StoriesModule.gallery.currItem.container) return !1;
                    var a = StoriesModule.gallery.currItem.container,
                        b = a.querySelector("video.ext_video_story_player");
                    return b ? void(b.paused || (b.pause(), this.isPausedByAs = !0)) : !1
                },
                playOurStories: function() {
                    if (this.isPausedByAs = !1, StoriesModule.gallery && StoriesModule.gallery.currItem && StoriesModule.gallery.currItem.container) {
                        var a = StoriesModule.gallery.currItem.container,
                            b = a.querySelector("video.ext_video_story_player");
                        b && b.paused && b.play()
                    }
                },
                on: function() {
                    this.isNativeStories() ? this.pauseNativeStories() : this.isOurStories() && this.pauseOurStories()
                },
                off: function() {
                    this.isPausedByAs && (this.isNativeStories() ? this.playNativeStories() : this.isOurStories() && this.playOurStories())
                }
            },
            onClickDlBtnOurStoryAll: function(a) {
                DownloadZipModule.zipCanceledByUser = !1, StoriesModule.storiesPause.on(), DownloadZipModule.downloadZIP(StoriesModule.showingStoryItems.slice(0), StoriesModule.gallery.currItem.username, function(a) {
                    a && a.error && StoriesModule.storiesPause.off()
                }, !0)
            },
            requestOneUserStories2: function(a, b) {
                globalUtils.sendMessage({
                    action: "requestOneUserStories2",
                    user_id: a
                }, function(a) {
                    b(a)
                })
            },
            showAdjustedBroadcast: function(a, b) {
                var c;
                globalUtils.sendMessage("requestStories", function(d) {
                    for (var e in d)
                        if (d[e].id && d[e].id == a || d[e].pk && d[e].pk == a) {
                            c = d[e];
                            break
                        } if (!c) return void $(".error_story_not_found").text(chrome.i18n.getMessage("stories_page_live_not_found") + " (((");
                    var f = StoriesModule.getPrepareLiveStory(c);
                    StoriesModule.showInPswp(f), b && b()
                })
            },
            buildStoriesPage: function() {
                globalUtils.sendMessage("getPopupRate", this.showPopupRate), this.showMenuItems(), this.arrowUpObj.init(), this.isMac = App.isMacOs();
                var a = window.location.hash.replace(/#/, "") || this.defaultNavItem; - 1 == ["top_lives", "friends", "locations", "search"].indexOf(a) && (a = this.defaultNavItem), this.updateNavItem(a), this.addUserListeners()
            },
            showMenuItems: function() {
                $("#nav .nav_item").each(function() {
                    $(this).find("span.text").text(chrome.i18n.getMessage("stories_page_" + this.dataset.nav_name))
                })
            },
            showPopupRate: function(a) {
                function b(a) {
                    j = !0;
                    var b = this.dataset.pos;
                    h.forEach(function(a) {
                        a.dataset.pos <= b ? (a.querySelector(".empty").style.display = "none", a.querySelector(".filled").style.display = "inline") : (a.querySelector(".empty").style.display = "inline", a.querySelector(".filled").style.display = "none")
                    })
                }

                function c(a) {
                    e || (j = !1, setTimeout(function() {
                        j || h.forEach(function(a) {
                            a.querySelector(".empty").style.display = "inline", a.querySelector(".filled").style.display = "none"
                        })
                    }, 100))
                }

                function d(a) {
                    e = !0;
                    var g = this.dataset.pos;
                    h.forEach(function(a) {
                        a.dataset.pos <= g && (a.querySelector(".empty").style.display = "none", a.querySelector(".filled").style.display = "inline")
                    }), h.forEach(function(a) {
                        a.removeEventListener("mouseover", b), a.removeEventListener("mouseout", c), a.removeEventListener("click", d)
                    }), i.innerText = chrome.i18n.getMessage("your_rate"), globalUtils.sendMessage({
                        action: "setPopupRate",
                        value: g
                    }), g > 3 && !f && (f = !0, chrome.tabs.create({
                        url: "https://chrome.google.com/webstore/detail/instagram-downloader/" + chrome.runtime.id + "/reviews"
                    })), StoriesModule.trackEvent("user_popup_rate", {
                        value: g
                    })
                }
                if (!a) {
                    var e = !1,
                        f = !1,
                        g = document.querySelector("#rating-ask");
                    g.style.display = "inline-block";
                    var h = g.querySelectorAll("#rating-ask .stars a"),
                        i = g.querySelector(".ext_text"),
                        j = !1;
                    h && h.forEach && (h.forEach(function(a) {
                        a.querySelector(".empty").style.display = "inline", a.querySelector(".filled").style.display = "none"
                    }), i.innerText = chrome.i18n.getMessage("rate_us_popup"), h.forEach(function(a) {
                        a.addEventListener("mouseover", b), a.addEventListener("mouseout", c), a.addEventListener("click", d)
                    }), $(".rate_wrapper").show())
                }
            },
            trackEvent: function(a, b) {
                var c = {
                    action: "trackEvent",
                    event: a
                };
                "undefined" != typeof b && (c.details = JSON.stringify(b)), globalUtils.sendMessage(c)
            },
            addUserListeners: function() {
                var a = this,
                    b = 0,
                    c = function(a) {
                        var c = Date.now();
                        return a.stopPropagation(), a.preventDefault(), b + 500 > c ? !0 : (b = c, !1)
                    },
                    d = $("body");
                window.addEventListener("scroll", function(b) {
                    window.scrollY > 1e3 ? a.arrowUpObj.show() : a.arrowUpObj.hide()
                }), d.on("click", "#nav .nav_item", function(a) {
                    c(a) || StoriesModule.updateNavItem(this.dataset.nav_name)
                });
                var e = null;
                d.on("keydown", 'input[name="name_filter_input"]', function(b) {
                    var c = this;
                    setTimeout(function() {
                        var b = Math.random();
                        e = b, setTimeout(function() {
                            if (b == e) {
                                var d = c.value.toLowerCase(),
                                    f = "#" + a.currentNavItem,
                                    g = $(".story_item", f);
                                if ("friends" == a.currentNavItem) var h, i = {
                                    friends_lives: 0,
                                    friends_post_lives: 0,
                                    friends_stories: 0
                                };
                                if (g.each(function(b, c) {
                                        var e = $(c);
                                        c.dataset.filter && c.dataset.filter.toLowerCase().indexOf(d) > -1 ? ("friends" == a.currentNavItem && (h = c.parentNode.parentNode.className, "undefined" != typeof i[h] && i[h]++), e.show()) : e.hide()
                                    }), "friends" == a.currentNavItem)
                                    for (var j in i) i[j] > 0 ? $("." + j, f).show() : $("." + j, f).hide()
                            }
                        }, 200)
                    }, 100)
                }), d.on("click", "#search_users, #search_tags, #search_places", function(b) {
                    if (!c(b)) {
                        var d = this.id.replace(/search_/, "");
                        a.searchPage.searchStart(d)
                    }
                }), d.on("click", ".up_to_top_button", function(b) {
                    c(b) || a.arrowUpObj.scrollUp()
                }), d.on("click", ".tile_story_item_header", function(a) {
                    if (!c(a)) {
                        var b = $(this).closest(".story_item").data().item;
                        ["friends_post_live", "friends_live", "top_live"].indexOf(b.type) > -1 && App.openTab("https://instagram.com/" + b.username + "/")
                    }
                }), d.on("click", ".line_story_item_image_wrap", function(a) {
                    if (!c(a)) {
                        var b = $(this).closest(".story_item").data().item;
                        "user" == b.type ? App.openTab("https://instagram.com/" + b.username + "/") : "location" == b.type && App.openTab("https://www.instagram.com/explore/locations/" + b.location_id + "/")
                    }
                }), d.on("click", ".line_story_item_title", function(a) {
                    if (!c(a)) {
                        var b = $(this).closest(".story_item").data().item;
                        "user" == b.type ? App.openTab("https://instagram.com/" + b.username + "/") : "location" == b.type || "place" == b.type ? App.openTab("https://www.instagram.com/explore/locations/" + b.location_id + "/") : "tag" == b.type && App.openTab("https://www.instagram.com/explore/tags/" + b.tag + "/")
                    }
                }), d.on("click", ".tile_story_item_cover_image", function(b) {
                    c(b) || a.onStoryItemClick.call(this)
                }), d.on("click", ".line_story_item_show", function(b) {
                    c(b) || a.onStoryItemClick.call(this)
                }), d.on("click", ".story_location_item", function(a) {
                    c(a) || App.openTab("https://www.instagram.com/explore/locations/" + this.dataset.id + "/")
                }), d.on("click", ".story_hashtag_item", function(a) {
                    c(a) || App.openTab("https://www.instagram.com/explore/tags/" + this.dataset.tag + "/")
                }), d.on("click", ".ext_ds_dl_btn", function(a) {
                    c(a) || StoriesModule.onClickDlBtnOurStoryOne()
                }), d.on("click", ".ext_ds_dl_all_btn", function(a) {
                    c(a) || StoriesModule.onClickDlBtnOurStoryAll()
                })
            },
            onStoryItemClick: function(a) {
                this.classList.add("loader");
                var b = $(this).closest(".story_item").data().item,
                    c = this,
                    d = function(a) {
                        if (["friends_live", "friends_post_live", "top_live"].indexOf(b.type) > -1) var d = StoriesModule.getPrepareLiveStory(a);
                        else d = StoriesModule.getPrepareStoryItems(a);
                        c.classList.remove("loader"), d.length && StoriesModule.showInPswp(d)
                    },
                    e = null;
                e = StoriesModule.checkMediaInCache(b), e ? d(e) : StoriesModule.requestStoryMedia(b, function(a) {
                    return a.error ? (c.innerText = chrome.i18n.getMessage("stories_page_no_stories_something_went_wrong_msg"), c.classList.add("no_stories"), void c.classList.add("error")) : a.empty ? (c.innerText = chrome.i18n.getMessage("stories_page_no_stories_msg"), c.classList.remove("loader"), void c.classList.add("no_stories")) : a.items ? void d(a.items) : (c.innerText = chrome.i18n.getMessage("stories_page_no_stories_something_went_wrong_msg"), c.classList.add("no_stories"), void c.classList.add("error"))
                })
            },
            checkMediaInCache: function(a) {
                if ("top_live" == a.type) var b = this.cacheStorage.topLives;
                else if ("friends_live" == a.type) b = this.cacheStorage.friendStories.live;
                else if ("friends_post_live" == a.type) b = this.cacheStorage.friendStories.post_live;
                else {
                    if ("user" != a.type) return null;
                    try {
                        b = this.cacheStorage.friendStories.story;
                        var c = b[a.media_id] && b[a.media_id].items;
                        return c && Array.isArray(c) && b[a.media_id].user && c.forEach(function(c) {
                            c.user = b[a.media_id].user
                        }), c
                    } catch (d) {
                        return null
                    }
                }
                return "undefined" == typeof b[a.media_id] ? null : b[a.media_id]
            },
            requestStoryMedia: function(a, b) {
                "user" == a.type ? globalUtils.requestUserStories(a.user_id, b) : "location" == a.type || "place" == a.type ? globalUtils.requestLocationStories(a.location_id, b) : "tag" == a.type && globalUtils.requestTagStories(a.tag, b)
            },
            arrowUpObj: {
                $el: null,
                shown: !1,
                show: function() {
                    this.shown || (this.$el.show(), this.$el.css({
                        opacity: "0.7"
                    }), this.shown = !0)
                },
                hide: function() {
                    this.shown && (this.$el.css({
                        opacity: "0"
                    }), this.$el.hide(), this.shown = !1)
                },
                init: function() {
                    this.$el = $(".up_to_top_button"), Math.easeInOutQuad = function(a, b, c, d) {
                        return a /= d / 2, 1 > a ? c / 2 * a * a + b : (a--, -c / 2 * (a * (a - 2) - 1) + b)
                    }
                },
                scrollUp: function() {
                    var a = 300,
                        b = window.scrollY,
                        c = 0 - b,
                        d = 0,
                        e = 20,
                        f = function() {
                            d += e;
                            var g = Math.easeInOutQuad(d, b, c, a);
                            window.scrollTo(0, g), a > d && setTimeout(f, e)
                        };
                    f()
                }
            },
            updateNavItem: function(a) {
                if (this.currentNavItem != a) {
                    var b = $(".content_container > div");
                    b.hide(), clearInterval(this.updatePageInterval), $(".nav_update_loader").show(), b.find(".content_list").html("");
                    var c;
                    switch (a) {
                        case "friends":
                            c = StoriesModule.friendsPage.renderFriendsStories.bind(StoriesModule.friendsPage);
                            break;
                        case "locations":
                            c = StoriesModule.locationPage.renderLocationsList.bind(StoriesModule.locationPage);
                            break;
                        case "search":
                            c = StoriesModule.searchPage.renderSearch.bind(StoriesModule.searchPage);
                            break;
                        default:
                            a = this.defaultNavItem, c = StoriesModule.friendsPage.renderFriendsStories.bind(StoriesModule.friendsPage)
                    }
                    this.currentNavItem = a, window.location.hash = a, c(function() {
                        $(".nav_update_loader").hide(), $(".content_container #" + a).show()
                    })
                }
            },
            appendLineStoryItem: function(a, b) {
                var c, d, e = JSON.stringify({
                    username: b.user && b.user.username,
                    user_id: b.user && b.user.id,
                    location_id: b.location && b.location.location_id,
                    tag: b.tag,
                    type: b.type,
                    media_id: b.media_id
                });
                "location" == b.type ? (c = this.isMac ? '<span class="flag_icon"><span>' + b.location.emoji + "</span></span>" : '<span class="location_code">' + b.location.code + "</span>", d = b.location.name, b.location.address && b.location.address.length && (d += ", " + b.location.address), b.location.city && b.location.city.length && (d += ", " + b.location.city)) : "place" == b.type ? (c = '<span class="place_default_icon"></span>', d = b.location.name) : "tag" == b.type ? (c = '<span class="tag_default_icon"></span>', d = b.tag) : "user" == b.type && (c = '<span class="user_icon"><img src="' + b.user.profile_pic_url + '"></span>', d = b.user.username), $('<div class="story_item line_story_item" data-item=\'' + e + "' data-filter=\"" + d + '"><div class="line_story_item_image_wrap">' + c + '</div><div class="line_story_item_title">' + d + '</div><div class="line_story_item_show"></div></div></div>').appendTo(a)
            },
            appendTileStoryItem: function(a, b) {
                var c = JSON.stringify({
                        username: b.user.username,
                        user_id: b.user.id,
                        type: b.type,
                        media_id: b.media_id
                    }),
                    d = b.user.profile_pic_url,
                    e = b.user.username,
                    f = b.message,
                    g = b.cover_frame_url,
                    h = b.user.username;
                $('<div class="story_item tile_story_item" data-item=\'' + c + "' data-filter=\"" + h + '"><div class="tile_story_item_header"><span class="image_wrap"><img src="' + d + '"></span><span class="text_wrap">' + e + '</span></div><div class="tile_story_item_message">' + f + '</div><div class="tile_story_item_cover_image"><img src="' + g + '"></div></div>').appendTo(a)
            },
            friendsPage: {
                renderFriendsStories: function(a) {
                    var b = this;
                    globalUtils.sendMessage("requestStories", function(b) {
                        var c = $(".content_list", "#friends");
                        if (c.html(""), !b) return $('input[name="name_filter_input"]', "#friends").hide(), c.append('<div class="no_stories_global sww">' + chrome.i18n.getMessage("stories_page_no_stories_something_went_wrong_msg") + "</div>"), a();
                        if (0 == b.length) return $('input[name="name_filter_input"]', "#friends").hide(), c.append('<div class="no_stories">' + chrome.i18n.getMessage("stories_page_no_stories_msg") + "</div>"), a();
                        $('input[name="name_filter_input"]', "#friends").val("").attr("placeholder", chrome.i18n.getMessage("stories_page_filter_input")).show(), $('<div class="friends_lives"><div class="content_list_sub_header"><span class="icon"></span></div><div class="content_sub_list"></div></div><div class="friends_post_lives"><div class="content_list_sub_header"><span class="icon"></span></div><div class="content_sub_list"></div></div><div class="friends_stories"><div class="content_list_sub_header"><span class="text">' + chrome.i18n.getMessage("stories_page_friends_stories_header") + '</span></div><div class="content_sub_list"></div></div>').appendTo(c);
                        var d = c.find(".friends_lives .content_sub_list"),
                            e = c.find(".friends_post_lives .content_sub_list"),
                            f = c.find(".friends_stories .content_sub_list");
                        StoriesModule.cacheStorage.friendStories = {
                            live: {},
                            post_live: {},
                            story: {}
                        }, b.forEach(function(a, b) {
                            var c = "undefined" != typeof a.broadcast_owner,
                                g = !c && "undefined" != typeof a.broadcasts;
                            c ? (StoriesModule.cacheStorage.friendStories.live[a.id] = a, d.parent().show(), StoriesModule.appendTileStoryItem(d, {
                                user: {
                                    username: a.broadcast_owner.username,
                                    id: a.broadcast_owner.pk,
                                    profile_pic_url: a.broadcast_owner.profile_pic_url
                                },
                                type: "friends_live",
                                media_id: a.id,
                                message: a.broadcast_message,
                                cover_frame_url: a.cover_frame_url
                            })) : g ? (StoriesModule.cacheStorage.friendStories.post_live[a.pk] = a, e.parent().show(), StoriesModule.appendTileStoryItem(e, {
                                user: {
                                    username: a.user.username,
                                    id: a.user.pk,
                                    profile_pic_url: a.user.profile_pic_url
                                },
                                type: "friends_post_live",
                                media_id: a.pk,
                                message: "",
                                cover_frame_url: a.broadcasts[0].cover_frame_url
                            })) : (a.items && a.items.forEach(function(b) {
                                b.user.username = a.user.username, b.profile_pic_url = a.user.profile_pic_url
                            }), StoriesModule.cacheStorage.friendStories.story[a.id] = a, f.parent().show(), StoriesModule.appendLineStoryItem(f, {
                                user: {
                                    username: a.user.username,
                                    id: a.user.pk,
                                    profile_pic_url: a.user.profile_pic_url
                                },
                                type: "user",
                                media_id: a.id
                            }))
                        }), a()
                    }), StoriesModule.updatePageInterval = setInterval(function() {
                        b.renderFriendsStories(a)
                    }, 18e4)
                }
            },
            topLivesPage: {
                renderTopLives: function(a) {
                    var b = this;
                    globalUtils.requestTopLives(null, function(b) {
                        var c = $(".content_list", "#top_lives");
                        c.html(""), !b || b.error ? $('<div class="sww">' + chrome.i18n.getMessage("stories_page_no_stories_something_went_wrong_msg") + "</div>").appendTo(c) : 0 == b.broadcasts.length ? $('<div class="no_stories_global">' + chrome.i18n.getMessage("stories_page_no_stories_msg") + "</div>").appendTo(c) : (StoriesModule.cacheStorage.topLives = {}, b.broadcasts.forEach(function(a) {
                            StoriesModule.cacheStorage.topLives[a.id] = a, StoriesModule.appendTileStoryItem(c, {
                                user: {
                                    username: a.broadcast_owner.username,
                                    id: a.broadcast_owner.pk,
                                    profile_pic_url: a.broadcast_owner.profile_pic_url
                                },
                                type: "top_live",
                                media_id: a.id,
                                message: a.broadcast_message,
                                cover_frame_url: a.cover_frame_url
                            })
                        })), a()
                    }), StoriesModule.updatePageInterval = setInterval(function() {
                        b.renderTopLives(a)
                    }, 18e4)
                }
            },
            locationPage: {
                renderLocationsList: function(a) {
                    var b = $(".content_list", "#locations");
                    $('input[name="name_filter_input"]', "#locations").val("").attr("placeholder", chrome.i18n.getMessage("stories_page_filter_input")), countriesList.forEach(function(a) {
                        StoriesModule.appendLineStoryItem(b, {
                            location: {
                                emoji: a.emoji,
                                code: a.code,
                                location_id: a.locationId,
                                name: a.name
                            },
                            type: "location"
                        })
                    }), a()
                }
            },
            searchPage: {
                renderSearch: function(a) {
                    $('[name="search_input"]').attr("placeholder", chrome.i18n.getMessage("stories_page_search_input_placeholder")).val(""), $("#search_users").text(chrome.i18n.getMessage("stories_page_search_btn_people")), $("#search_tags").text(chrome.i18n.getMessage("stories_page_search_btn_tags")), $("#search_places").text(chrome.i18n.getMessage("stories_page_search_btn_places")), a()
                },
                searchStart: function(a) {
                    var b = this,
                        c = $('input[name="search_input"]').val();
                    if (c.length) {
                        var d;
                        switch (a) {
                            case "users":
                                d = globalUtils.requestSearchInUsers;
                                break;
                            case "tags":
                                d = globalUtils.requestSearchInTags;
                                break;
                            case "places":
                                d = globalUtils.requestSearchInPlaces;
                                break;
                            default:
                                return
                        }
                        d(c, function(c) {
                            b.renderSearchResultsList(a, c.items)
                        })
                    }
                },
                renderSearchResultsList: function(a, b) {
                    var c = $(".content_list", "#search");
                    switch (c.html(""), a) {
                        case "users":
                            b.forEach(function(a) {
                                StoriesModule.appendLineStoryItem(c, {
                                    user: {
                                        username: a.username,
                                        id: a.pk,
                                        profile_pic_url: a.profile_pic_url
                                    },
                                    type: "user"
                                })
                            });
                            break;
                        case "tags":
                            b.forEach(function(a) {
                                StoriesModule.appendLineStoryItem(c, {
                                    type: "tag",
                                    tag: a.name
                                })
                            });
                            break;
                        case "places":
                            b.forEach(function(a) {
                                StoriesModule.appendLineStoryItem(c, {
                                    location: {
                                        addres: a.location.addres,
                                        city: a.location.city,
                                        location_id: a.location.pk,
                                        name: a.location.name
                                    },
                                    type: "place"
                                })
                            });
                            break;
                        default:
                            return
                    }
                }
            },
            showLocationItemStories: function(a) {
                globalUtils.requestLocationStories(a, function(a) {
                    var b = StoriesModule.getPrepareStoryItems(a.story.items);
                    b.length && StoriesModule.showInPswp(b)
                })
            },
            showUserStories: function(a, b) {
                var c = this;
                if (c.cacheStorage.friendStories.story[a] && c.cacheStorage.friendStories.story[a].items && c.cacheStorage.friendStories.story[a].items.length) {
                    var d = c.getPrepareStoryItems(c.cacheStorage.friendStories.story[a].items);
                    c.showInPswp(d)
                } else globalUtils.requestUserStories(a, function(d) {
                    if (d.error) return b.innerText = chrome.i18n.getMessage("stories_page_no_stories_something_went_wrong_msg"), b.classList.remove("loader"), b.classList.add("no_stories"), void b.classList.add("error");
                    if (d.empty) return b.innerText = chrome.i18n.getMessage("stories_page_no_stories_msg"), b.classList.remove("loader"), void b.classList.add("no_stories");
                    c.cacheStorage.friendStories.story[a] = d;
                    var e = c.getPrepareStoryItems(d.items);
                    e.length && c.showInPswp(e)
                })
            },
            authorizePls: function() {
                $(".page_wrap").hide();
                var a = $(".unauthorized_msg");
                $(".text", a).text(chrome.i18n.getMessage("notAuthorizedMsg")), $(".link a", a).text(chrome.i18n.getMessage("go_to_instagram")), a.show()
            },
            disconnectPortObserver: {
                port: null,
                disconnected: !1,
                testConnect: function() {
                    this.port = chrome.runtime.connect(), this.port.onDisconnect.addListener(this.disconnectListener)
                },
                disconnectListener: function() {
                    this.disconnected = !0, window.insta_dl_disabled = !0, App.disconnectPortObserver.showDisconnectNotification()
                },
                showDisconnectNotification: function() {
                    var a = document.createElement("div");
                    a.className = "disconnect_notification", a.innerHTML = '<div class="notify_wrap"><div class="ext_close_btn">&times;</div><div class="ext_text">' + chrome.i18n.getMessage("disconnect_notification") + "</div></div>";
                    var b = a.querySelector(".ext_close_btn");
                    b.addEventListener("click", function() {
                        a.remove()
                    }), document.querySelector("body").appendChild(a), $(a).animate({
                        opacity: 1,
                        right: "20px"
                    }, 1e3)
                }
            },
            run: function() {
                var a = this;
                globalUtils.sendMessage("getUserSelfInfo", function(b) {
                    if (!b) return void a.authorizePls();
                    a.disconnectPortObserver.testConnect();
                    var c = window.location.hash.match(/#post_live_user_id_([\w_]+)/);
                    if (c = c && c[1]) return void a.requestOneUserStories2(c, function(b) {
                        if (b && b.post_live_item) {
                            var c = StoriesModule.getPrepareLiveStory(b && b.post_live_item);
                            StoriesModule.showInPswp(c)
                        }
                        a.buildStoriesPage()
                    });
                    var d = window.location.hash.match(/#live_([\w_]+)/);
                    d = d && d[1], d ? a.showAdjustedBroadcast(d, function() {
                        a.buildStoriesPage()
                    }) : a.buildStoriesPage()
                })
            }
        }
    }(),
    App = function() {
        return {
            getModalBox: function() {
                function a() {
                    u = n.querySelector("#ext_modal_checkbox"), u && u.checked && globalUtils.sendMessage("warning-off"), l(), n.style.display = "none", C.innerHTML = "", n.opened = 0, n.remove()
                }

                function b(b) {
                    return function() {
                        a(), b()
                    }
                }

                function c(b) {
                    return function() {
                        a(), b()
                    }
                }

                function d(b) {
                    return function() {
                        a(), b()
                    }
                }

                function e(a) {
                    return function() {
                        a(n)
                    }
                }

                function f(b) {
                    return function() {
                        a(), b()
                    }
                }

                function g(b) {
                    return function() {
                        a(), StoriesModule.storiesPause.off(), "function" == typeof b && b()
                    }
                }

                function h(b) {
                    b.target == n && a()
                }

                function i() {
                    document.querySelector("#ext_review_link").click(), a()
                }

                function j() {
                    a(), globalUtils.sendMessage("estimateLater")
                }

                function k(a, b, c) {
                    a && b && c && a.addEventListener(b, c), D.push({
                        el: a,
                        event: b,
                        listener: c
                    })
                }

                function l() {
                    D.forEach(function(a) {
                        a.el && a.event && a.listener && a.el.removeEventListener(a.event, a.listener)
                    }), window.removeEventListener("click", h)
                }

                function m(a) {
                    o = n.querySelector(".ext_btn_continue"), p = n.querySelector(".ext_btn_cancel"), v = C.querySelector(".ext_modal_close"), q = C.querySelector(".ext_btn_estimate"), r = C.querySelector("#estimate_later"), s = C.querySelector("#estimate_no"), t = C.querySelector(".ext_btn_enough"), A = C.querySelector(".upload_to_profile_btn"), B = C.querySelector(".upload_to_stories_btn"), a && ("function" == typeof a.continueCallback && o && k(o, "click", b(a.continueCallback)), "function" == typeof a.continueDelCallback && o && k(o, "click", e(a.continueDelCallback)), "function" == typeof a.enoughCallback && t && k(t, "click", f(a.enoughCallback)), "function" == typeof a.toProfileCallback && A && k(A, "click", c(a.toProfileCallback)), "function" == typeof a.toStoriesCallback && B && k(B, "click", d(a.toStoriesCallback))), k(p, "click", g(a && a.cancelCallback)), k(v, "click", g(a && a.cancelCallback)), k(q, "click", i), k(r, "click", j), k(r, "click", j)
                }
                var n = document.querySelector(".ext_modal");
                n || (n = document.createElement("div"), n.className = "ext_modal", n.innerHTML = '<div class="ext_modal_content"></div>', document.querySelector("body").appendChild(n));
                var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C = n.querySelector(".ext_modal_content"),
                    D = [];
                return n.close = function() {
                    a()
                }, n.showDownloadAllWarning = function(a) {
                    C.innerHTML = '<div class="ext_modal_header">' + chrome.i18n.getMessage("download_more_100_warning") + '</div><div class="ext_modal_buttons_wrap"><button class="ext_btn_continue">' + chrome.i18n.getMessage("btn_continue").toUpperCase() + '</button><button class="ext_btn_cancel">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + '</button></div><div class="ext_modal_footer"><input type="checkbox" id="ext_modal_checkbox"><span>' + chrome.i18n.getMessage("do_not_show_again") + "</span></div>", m(a), window.addEventListener("click", h), n.style.display = "block", n.opened = 1
                }, n.showDeleteWarning = function(a) {
                    C.innerHTML = '<div class="ext_modal_header">' + chrome.i18n.getMessage("are_you_sure_delete") + '</div><div class="ext_modal_buttons_wrap"><button class="ext_btn_continue">' + chrome.i18n.getMessage("delete").toUpperCase() + '</button><button class="ext_btn_cancel">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + "</button></div>", m(a), window.addEventListener("click", h), n.style.display = "block", n.opened = 1
                }, n.showUploadChoice = function(a) {
                    C.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_modal_buttons_wrap"><button class="upload_to_profile_btn">' + chrome.i18n.getMessage("upload_to_profile") + '</button><button class="upload_to_stories_btn">' + chrome.i18n.getMessage("upload_to_stories") + '</button></div><div class="upload_by_mobile_mode"><a href="">' + chrome.i18n.getMessage("upload_by_mobile_mode") + '<span class="icon"></span></a></div>', m(a), window.addEventListener("click", h), n.style.display = "block", n.opened = 1
                }, n.showDownloadProcess = function(a, b) {
                    window.removeEventListener("click", h), C.innerHTML = '<div class="ext_download_all_process"><div class="download_all_process_state">' + chrome.i18n.getMessage("download_zip") + '</div><div class="download_all_retry">' + chrome.i18n.getMessage("retry_requests") + '<span></span></div><div id="ext_progress"><div id="ext_bar"></div></div><div class="download_all_success_count"></div><div class="ext_modal_buttons_wrap"><button class="ext_btn_cancel cancel_download">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + '</button><button class="ext_btn_enough">' + chrome.i18n.getMessage("btn_enough").toUpperCase() + '</button></div><div class="footer"><div><a class="open_new_tab_insta" href="' + window.location.href + '" target="_blank">' + chrome.i18n.getMessage("open_new_tab_for_surfing") + "</a></div></div></div>", x = C.querySelector(".download_all_success_count"), y = C.querySelector(".download_all_retry"), z = C.querySelector(".download_all_retry span"), w = n.querySelector("#ext_bar"), x.innerText = "(0/" + a + ")", m(b);
                    $('[role="presentation"]');
                    n.style.display = "block", n.opened = 1
                }, n.showPrepareDownloadProcess = function(a, b) {
                    var c = a.header,
                        d = (a.footer, a.bar_start || 0);
                    window.removeEventListener("click", h), C.innerHTML = '<div class="ext_download_all_process"><div class="download_all_process_state">' + c + '</div><div id="ext_progress" class="' + (a.from_tagged ? "ext_circle_progress" : "") + '"><div id="ext_bar"></div></div><div class="ext_modal_buttons_wrap"><button class="ext_btn_cancel">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + '</button></div><div class="footer"><div class="ext_dont_panic" style="display: none"><span>' + chrome.i18n.getMessage("waiting_response_for_virtual_scroll") + '</span><span class="ext_loader"></span></div><div><a class="open_new_tab_insta" href="' + window.location.href + '" target="_blank">' + chrome.i18n.getMessage("open_new_tab_for_surfing") + "</a></div></div></div>",
                        m(b), w = n.querySelector("#ext_bar"), w.style.width = d + "%", n.style.display = "block", n.opened = 1
                }, n.updateDownloadZipProgressBar = function(a) {
                    if (!a.from_tagged && n.querySelector(".ext_download_all_process") && (x.innerText = "(" + a.successCount + "/" + a.allCount + ")", a.retryRequestsCount && (y.style.display = "block", z.innerText = " (" + a.retrySuccessCount + "/" + a.retryRequestsCount + ")"), a.lastSuccess)) {
                        var b = a.oneValuePercent;
                        w.style.width || (w.style.width = "0%");
                        var c = parseFloat(w.style.width),
                            d = c + b;
                        (100 == d || d > 100) && (d = 100), w.style.width = d + "%"
                    }
                }, n.updatePrepareZipProgressBarAndText = function(a) {
                    if (!a.from_tagged) {
                        var b = $(w).closest(".ext_download_all_process"),
                            c = b.find(".ext_dont_panic");
                        if (a.dont_panic ? c.show() : c.hide(), !a.no_progress) {
                            var d = a.oneValuePercent,
                                e = a.maxValue || 100;
                            w.style.width || (w.style.width = "0%");
                            var f = parseFloat(w.style.width),
                                g = f + d;
                            g > e && (g = e), w.style.width = g + "%"
                        }
                    }
                }, n.showSuccessText = function(a) {
                    C.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_modal_just_text_wrap"><span>' + a + "</span></div>", m(), window.addEventListener("click", h), n.style.display = "block", n.opened = 1
                }, n.showErrorBox = function(a) {
                    C.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_error_modal_wrap"><div class="ext_error_modal_text">' + a + "</div></div>", m(), window.addEventListener("click", h), n.opened = 1, n.style.display = "block"
                }, n.opened = 0, C.innerHTML = "", n
            },
            customPromiseAll: function(a, b) {
                function c() {
                    f || (f = setInterval(function() {
                        g !== i && (clearInterval(f), f = void 0, g === j ? q() : r())
                    }, 10))
                }
                var d, e, f, g, h, i = 0,
                    j = 1,
                    k = 2,
                    l = a.data,
                    m = (a.timeout || 6e5, a.asyncCount || 48),
                    n = !1,
                    o = this,
                    p = [],
                    q = function() {
                        "function" == typeof h.resolve && (l = p, setTimeout(function() {
                            try {
                                h.resolve(l)
                            } catch (a) {
                                p = a, r()
                            }
                        }, 0))
                    },
                    r = function() {
                        n || (n = !0, "function" == typeof h.reject && (b = h.reject)(p))
                    },
                    s = function() {
                        e = 0, d = l.length;
                        var a = 0,
                            f = function(b) {
                                return function(c) {
                                    Array.isArray(p) && g != k && (a--, e++, p[b] = c, e === d && (g = j))
                                }
                            },
                            h = function(a) {
                                g = k, p = a
                            };
                        g = i, c();
                        var n = setInterval(function() {
                            if (!l.length || g != i) return void clearInterval(n);
                            var c = m - a;
                            1 > c || l.splice(0, c).forEach(function(c, d) {
                                setTimeout(function() {
                                    try {
                                        a++, b(c, f(d), h)
                                    } catch (e) {
                                        p = e, g = k
                                    }
                                }, 0)
                            })
                        }, 500)
                    };
                return this.thenOne = function(a, b) {
                    return h = {
                        resolve: a,
                        reject: b
                    }, c(), o
                }, s(), this
            },
            openTab: function(a) {
                globalUtils.sendMessage({
                    action: "open_new_tab",
                    url: a
                })
            },
            isMacOs: function() {
                return !!window.navigator.userAgent.toLowerCase().match(/mac\s*os/)
            }
        }
    }();
StoriesModule.run();