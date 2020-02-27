! function() {
    var a = window.globalUtils,
        b = function() {
            return {
                buttonTemplate: null,
                dlBtnClassName: "ext_mobile_dl_btn",
                dlProfileBtnClassName: "profile_mobile_dl_btn",
                dlStoryBtnClassName: "story_mobile_dl_btn",
                run: function() {
                    var b = this;
                    b.modeGlobalWindow(), $(function() {
                        function c() {
                            b.imageAcceptAll(), b.removeAppPromote(), b.observeDom(), b.addScreeModeBtn()
                        }
                        b.removeAppPromote(), b.checkAuth(), b.stylingScroll(), b.createBtnTpl(), a.fixForeach(), b.userActionsListenerInit(), b.messagesListenerInit(), c(), setInterval(c, 1e3)
                    }), window.ext_blob_story_data = {}
                },
                removeAppPromote: function() {
                    var a = $('a:contains("×")'),
                        b = $('a[href^="https://itunes.apple.com/app/instagram"]'),
                        c = $('a[href^="https://play.google.com/store/apps/details?id=com.instagram.android"]');
                    a.length && a.parent().remove(), b.length && b.remove(), c.length && c.remove(), $('a[href$="/download/"]').length && $('a[href$="/download/"]').parent().parent().remove()
                },
                checkAuth: function() {
                    $.ajax({
                        method: "GET",
                        url: "https://www.instagram.com/"
                    }).done(function(b) {
                        /activity_counts.{0,4}null/.test(b) ? a.sendMessage("iWillLogIn") : a.sendMessage("amIJustLogIn", function(b) {
                            b && a.sendMessage("needReloadPage")
                        })
                    })
                },
                stylingScroll: function() {
                    $("body").length && $("body").append('<style media="screen">::-webkit-scrollbar {width: 8px;height: 6px;background-color: #e1e1e1;}::-webkit-scrollbar-thumb {background-color: #000000;}::-webkit-scrollbar-track {background: transparent;}</style>')
                },
                imageAcceptAll: function() {
                    $('input[type="file"][accept="image/jpeg"]').attr("accept", "image/*")
                },
                modeGlobalWindow: function() {
                    var a = {
                        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25",
                        vendor: "Apple, Inc.",
                        platform: "iPhone"
                    };
                    window.addEventListener("beforeload", function(b) {
                        Object.keys(a).forEach(function(b) {
                            Object.defineProperty(window.navigator, b, {
                                get: function() {
                                    return a[b]
                                }
                            })
                        }), Object.defineProperty(window.screen.orientation, "type", {
                            value: "portrait-primary"
                        })
                    }, !0);
                    const b = document.createElement("script");
                    b.type = "text/javascript", b.innerText = Object.keys(a).map(function(b) {
                        return 'Object.defineProperty(window.navigator, "' + b + '", { get: function(){ return "' + a[b] + '"; } });'
                    }).join("") + "Object.defineProperty(window.screen.orientation, 'type', {value: 'portrait-primary'});", document.documentElement.insertBefore(b, document.documentElement.firstChild)
                },
                addMobileDlBtn: function(a, c) {
                    a && (a.querySelector("." + b.dlBtnClassName) || a.appendChild(b.getDlBtnEl(c)))
                },
                addScreeModeBtn: function() {
                    if (!document.querySelector(".ext_width_screen_toggler")) {
                        var b, c = this,
                            d = document.querySelector("nav header button");
                        if (b = d && d.parentNode) {
                            var e = document.createElement("div");
                            e.className = "ext_width_screen_toggler", e.innerHTML = '<span class=""></span>';
                            var f = this.isWideScreen(e) ? "ext_from_wide_screen" : "ext_to_wide_screen";
                            e.classList.add(f), b.appendChild(e), e.addEventListener("click", function() {
                                var b = this;
                                c.isWideScreen(this) ? a.sendMessage("mobileNormalMode", function() {
                                    b.classList.remove("ext_from_wide_screen"), b.classList.add("ext_to_wide_screen"), b.dataset.is_full_screen = "0"
                                }) : a.sendMessage("mobileWideScreenMode", function() {
                                    b.classList.remove("ext_to_wide_screen"), b.classList.add("ext_from_wide_screen"), b.dataset.is_full_screen = "1"
                                })
                            })
                        }
                    }
                },
                isWideScreen: function(a) {
                    return "1" === a.dataset.is_full_screen
                },
                observeDom: function() {
                    var a = this,
                        b = document.querySelectorAll("div > div > article > header + div > div > div");
                    b && b.forEach && b.forEach(function(b) {
                        b.parentNode.dataset.extSkip > 0 || (b.parentNode.dataset.extSkip = "1", a.addMobileDlBtn(b.parentNode, 1))
                    });
                    var c = document.querySelectorAll('section > main div > div > div a[href^="/p/"]');
                    c && c.forEach && c.forEach(function(b) {
                        b.querySelector("img") && (b.href.indexOf("liked_by") > -1 || b.dataset.extSkip > 0 || (b.dataset.extSkip = "1", a.addMobileDlBtn(b.parentNode, 2)))
                    });
                    var d = document.querySelector("section > ._0ZGP4");
                    d && (a.addMobileDlBtn(d, 3), a.addFictitiousArrows2NativeStories(d))
                },
                showDownloadError: function() {
                    $("#react-root").append('<div class="error_dl_msg_mobile">' + chrome.i18n.getMessage("error_dl_msg") + "</div>"), setTimeout(function() {
                        $(".error_dl_msg_mobile").remove()
                    }, 2e3)
                },
                userActionsListenerInit: function() {
                    var b = $("body"),
                        d = this,
                        e = 0;
                    b.on("click", "." + d.dlBtnClassName, function(a) {
                        var b = this;
                        a.stopPropagation(), a.preventDefault();
                        var f = Date.now();
                        if (!(e + 500 > f))
                            if (e = f, d.loaderBtnState.on(b), 1 == b.dataset.page_type) {
                                var h = $(b).closest("article").get(0);
                                d.getMediaInfoOnInternalPage(h, function(a) {
                                    g.onGetMediaInfo.call(d, a, b)
                                })
                            } else if (2 == b.dataset.page_type) h = b.parentNode, d.getMediaInfoOnInternalPage(h, function(a) {
                            g.onGetMediaInfo.call(d, a, b)
                        });
                        else if (3 == b.dataset.page_type) {
                            var i = b.parentNode;
                            c.storiesPause.on(), d.getMediaInfoOnStoriesPage(i, function(a) {
                                g.onGetMediaInfo.call(d, a, b)
                            })
                        }
                    }), b.on("click", ".ckWGn", function() {
                        var a = document.body.style.top,
                            b = document.querySelector('[role="dialog"] article header div + div a:first-child'),
                            c = b && b.getAttribute("href");
                        c && c.match(/^\/[^\/]+\/$/) && (b && b.click && b.click(), setTimeout(function() {
                            document.body.style.top = a
                        }, 200))
                    }), b.on("click", ".coreSpriteCloseLight", function() {
                        setTimeout(function() {
                            document.querySelector(".coreSpriteFeedCreation") || window.location.reload()
                        }, 300)
                    });
                    var f = !0;
                    b.on("click", ".coreSpriteStoryCreation", function(b) {
                        if (f) {
                            var c = this;
                            a.sendMessage("tryUploadStory", function(a) {
                                if (a) {
                                    var b = setInterval(function() {
                                        $("._162ov ._3bdnt").css({
                                            opacity: 0
                                        })
                                    }, 20);
                                    setTimeout(function() {
                                        f = !1, c.click(), setTimeout(function() {
                                            clearInterval(b), f = !0
                                        }, 200)
                                    }, 300)
                                }
                            })
                        }
                    }), b.on("click", 'a.MpBh3[role="button"], a.SWk3c[role="button"]', function(a) {
                        g.multiplePostSwitchListener.call(this, d, a)
                    })
                },
                messagesListenerInit: function() {
                    chrome.runtime.onMessage.addListener(function(a, b, d) {
                        "storyPauseOffByDownloadId" == a ? c.storiesPause.off() : "storyPauseOffByBlobUrl" == a.action && window.ext_blob_story_data.object_url == a.url && c.storiesPause.off()
                    })
                },
                loaderBtnState: {
                    on: function(a) {
                        $(".ext_icon", a).addClass("preloader2")
                    },
                    off: function() {
                        $(".preloader2").removeClass("preloader2")
                    }
                },
                createBtnTpl: function() {
                    var a = document.createElement("a");
                    a.innerHTML = '<span class="ext_icon"></span>', this.buttonTemplate = a
                },
                getDlBtnEl: function(a) {
                    var b = this.buttonTemplate.cloneNode(!0);
                    return b.setAttribute("type", "button"), b.dataset.page_type = a, b.classList.add(this.dlBtnClassName), 1 == a || 2 == a ? b.classList.add(this.dlProfileBtnClassName) : 3 == a && b.classList.add(this.dlStoryBtnClassName), b
                },
                getMediaInfoOnMainPage: function(b, c) {
                    if (b instanceof HTMLElement && "function" == typeof c) {
                        var d = b.querySelector("header");
                        if (!d) return c({
                            error: 1
                        });
                        var e, f, h, i = b.querySelector("header + div"),
                            j = d.querySelector("div + div a:first-child"),
                            k = j.getAttribute("href");
                        (m = k.match(/^\/([^\/]+)\/$/)) && (e = m[1]);
                        var l = i.querySelector("video[src]");
                        if (l) {
                            if (f = g.getLinkFromVideoElement(l), "string" != typeof f || f.indexOf("blob:") > -1) return this.getMediaInfoOnInternalPage(b, c);
                            h = a.getFileNameFromVideoLink(f, e)
                        } else {
                            var n = g.findImageElement(i);
                            n && (f = g.getLinkFromImgElement(n), h = a.getFileNameFromImageLink(f, e))
                        }
                        return c(f && h ? {
                            url: f,
                            filename: h
                        } : {
                            error: 1
                        })
                    }
                },
                getMediaInfoOnInternalPage: function(b, c) {
                    if (b instanceof HTMLElement && "function" == typeof c) {
                        var d = this,
                            e = g.getShortCode(b);
                        if (!e) return c({
                            error: 1
                        });
                        var f = b.querySelector("." + d.dlBtnClassName);
                        return f ? void a.getMediaItemFromJsonGraphql({
                            shortCode: e,
                            posInMultiple: f.dataset.multiplePos
                        }, c) : c({
                            error: 1
                        })
                    }
                },
                getMediaInfoOnStoriesPage: function(b, c) {
                    var d, e, f;
                    d = window.location.pathname.match(/stories\/([^\/]+)/), d = d && d[1];
                    var h = b.querySelector("video");
                    if (h) e = g.getLinkFromVideoElement(h), f = a.getFileNameFromVideoLink(e, d);
                    else {
                        var i = b.querySelector("img");
                        e = g.getLinkFromImgElement(i), f = a.getFileNameFromImageLink(e, d)
                    }
                    return c(e && f ? {
                        url: e,
                        filename: f,
                        isStory: 1
                    } : {
                        error: 1
                    })
                },
                addFictitiousArrows2NativeStories: function(a) {
                    if (a instanceof HTMLElement && !a.querySelector(".storiesToLeft") && !a.querySelector(".storiesToRight")) {
                        var b = a.querySelector("section > div:first-child > div > div");
                        if (b) {
                            var c = b.querySelector("button:nth-child(2n+1)"),
                                d = b.querySelector("button:nth-child(2n)");
                            if (c && d) {
                                var e = document.createElement("span"),
                                    f = document.createElement("span");
                                e.className = "storiesToLeft", f.className = "storiesToRight", c.appendChild(e), d.appendChild(f)
                            }
                        }
                    }
                }
            }
        }(),
        c = function() {
            return {
                dlBtnClassName: "ext_stories_dl_btn",
                showingStoryItems: [],
                showingStoryType: null,
                allCurrentStories: [],
                gallery: null,
                lastTimeStoryUpdate: 0,
                lastTimeLiveStoriesUpdate: 0,
                lastTimeAllStoriesUpdate: 0,
                storyUpdatePeriod: 6e4,
                liveStoriesUpdatePeriod: 6e4,
                allStoriesUpdatePeriod: 6e5,
                storyTrayElTpl: null,
                storyLiveElTpl: null,
                storyNativeLiveElTpl: null,
                storiesWrapperClass: "ext_stories_wrap",
                cachedStoriesMedia: {},
                livesDataCurrentUser: {},
                storiesInserted: !1,
                not_found_stories_container_reported: !1,
                insertStoriesBlock: function(a) {
                    if (e.isMainPage() && a) {
                        var b = document.querySelector("." + c.storiesWrapperClass);
                        b || (b = document.createElement("div"), b.className = c.storiesWrapperClass, b.style.display = "none", a.firstElementChild ? a.insertBefore(b, a.firstElementChild) : a.appendChild(b), this.insertStories(b), e.isWindows() || Ps.initialize(b, {
                            minScrollbarLength: 50,
                            maxScrollbarLength: 50
                        }))
                    }
                },
                insertStories: function(b, c) {
                    var d = this;
                    a.sendMessage("requestStories", function(a) {
                        if (!a || !a.length || !Array.isArray(a)) return void(b.style.display = "none");
                        if (d.storiesInserted = !0, b.style.display = "block", e.objectSortByProp(a, "ranked_position"), d.allCurrentStories = a, d.lastTimeAllStoriesUpdate = d.lastTimeLiveStoriesUpdate = Date.now(), e.isWindows()) try {
                            $(b).smoothDivScroll(), $(b).smoothDivScroll("destroy")
                        } catch (f) {}
                        b.innerHTML = "", a.forEach(function(a, c) {
                            var e = "undefined" != typeof a.broadcast_owner,
                                f = !e && "undefined" != typeof a.broadcasts;
                            e || f ? d.insertStoryLiveItem(a, c, b, e) : d.insertStoryTrayItem(a, c, b)
                        }), e.isWindows() && $(b).smoothDivScroll(), "function" == typeof c && c()
                    })
                },
                updateStories: function() {
                    var a = document.querySelector("." + c.storiesWrapperClass);
                    if (a) return this.storiesInserted ? void(Date.now() > this.lastTimeLiveStoriesUpdate + this.liveStoriesUpdatePeriod && this.updateLiveStories(a)) : this.insertStories(a)
                },
                updateLiveStories: function(b, c) {
                    var d = this;
                    a.sendMessage("requestStories", function(a) {
                        if (!a || !a.length || !Array.isArray(a)) return void(b.style.display = "none");
                        b.style.display = "block", e.objectSortByProp(a, "ranked_position"), d.lastTimeLiveStoriesUpdate = Date.now();
                        var f = [],
                            g = [];
                        d.allCurrentStories.forEach(function(a, b) {
                            a.dash_playback_url || a.dash_abr_playback_url ? f[b] = a.id : a.broadcasts && (f[b] = a.pk)
                        }), a.forEach(function(a, b) {
                            a.dash_playback_url || a.dash_abr_playback_url ? g[b] = a.id : a.broadcasts && (g[b] = a.pk)
                        });
                        var h = !1;
                        if (f.forEach(function(b, c) {
                                var e = g.indexOf(b);
                                if (0 > e) {
                                    var f = document.querySelector('.ext_story_item_wrap[data-story-id="' + b + '"]');
                                    f && f.parentNode.removeChild(f), d.allCurrentStories.splice(c, 1), h = !0
                                } else d.allCurrentStories[c] = a[e]
                            }), g.forEach(function(c, e) {
                                if (f.indexOf(c) < 0) {
                                    var g = d.allCurrentStories.length;
                                    d.allCurrentStories[g] = a[e];
                                    var i = "undefined" != typeof a[e].dash_playback_url || "undefined" != typeof a[e].dash_abr_playback_url;
                                    d.insertStoryLiveItem(a[e], g, b, i, i), h = !0
                                }
                            }), h && e.isWindows()) try {
                            $(b).smoothDivScroll("recalculateScrollableArea")
                        } catch (i) {}
                        "function" == typeof c && c()
                    })
                },
                insertStoryLiveItem: function(a, b, c, d, f) {
                    var g = a.broadcast_owner || a.user,
                        h = this.getStoryLiveElTpl();
                    h.dataset.storyId = a.id || a.pk, h.dataset.storyType = d ? "live" : "postlive";
                    var i = h.querySelector("img.user_icon_live");
                    i.src = g.profile_pic_url;
                    var j = h.querySelector("img.ext_story_type_icon");
                    j.src = "chrome-extension://" + chrome.runtime.id + "/images/img/" + (d ? "icon_live.png" : "icon_post_live.png"), j.className = "ext_live_icon center_div";
                    var k = h.querySelector("span.ext_story_item_author");
                    if (k.innerText = g.username.length > 11 ? g.username.substr(0, 10) + "..." : g.username, e.isWindows()) {
                        var l = c.querySelector(".scrollableArea");
                        l || (l = c)
                    } else l = c;
                    if (f) var m = l.firstElementChild;
                    else m = document.querySelector(".ext_story_item_image"), m = m && m.parentNode;
                    m ? l.insertBefore(h, m) : l.appendChild(h)
                },
                insertStoryTrayItem: function(a, b, c) {
                    var d = a.user,
                        e = this.getStoryTrayElTpl();
                    e.dataset.storyId = a.id || a.pk;
                    var f = e.querySelector("img.ext_story_item_image");
                    f.src = d.profile_pic_url;
                    var g = e.querySelector("span.ext_story_item_author");
                    g.innerText = d.username.length > 11 ? d.username.substr(0, 10) + "..." : d.username, c.appendChild(e)
                },
                getStoryTrayElTpl: function() {
                    if (!this.storyTrayElTpl) {
                        var a = document.createElement("div");
                        a.className = "ext_story_item_wrap", a.dataset.storyType = "tray";
                        var b = document.createElement("img");
                        b.className = "ext_story_item_image";
                        var c = document.createElement("span");
                        c.className = "ext_story_item_author", a.appendChild(b), a.appendChild(c), this.storyTrayElTpl = a
                    }
                    return this.storyTrayElTpl.cloneNode(!0)
                },
                getStoryLiveElTpl: function() {
                    if (!this.storyLiveElTpl) {
                        var a = document.createElement("div");
                        a.className = "ext_story_item_wrap";
                        var b = document.createElement("div");
                        b.className = "ext_live_tray_item ext_unseen_story_item";
                        var c = document.createElement("img");
                        c.className = "user_icon_live center_div";
                        var d = document.createElement("div");
                        d.className = " center_div user_icon_black_background";
                        var e = document.createElement("span");
                        e.className = "pulse center_div";
                        var f = document.createElement("img");
                        f.className = "ext_story_type_icon";
                        var g = document.createElement("span");
                        g.className = "ext_story_item_author";
                        var h = document.createElement("div");
                        h.className = "streak", b.appendChild(c), b.appendChild(d), b.appendChild(e), b.appendChild(f), a.appendChild(b), a.appendChild(h), a.appendChild(g), this.storyLiveElTpl = a
                    }
                    return this.storyLiveElTpl.cloneNode(!0)
                },
                checkStoryOneUser: function(b, c) {
                    var d = this;
                    return b ? void a.requestJSONgraphqlUser(b, function(b) {
                        if (!b || b.error || !b.graphql) return void("function" == typeof c && c({
                            error: 1
                        }));
                        var e = b.graphql.user,
                            f = e && e.id;
                        if (!f) return a.trackEventWithRandom("no_user_id", {
                            method: "checkStoryOneUser",
                            graphql: b.graphql
                        }, .1), void("function" == typeof c && c({
                            error: 1
                        }));
                        var g = [];
                        d.requestOneUserStories(f, function(a) {
                            return a && a.items && a.items.length ? (g = d.getPrepareStoryItems(a.items, a.user), g.length ? void("function" == typeof c && c(g)) : void("function" == typeof c && c({
                                error: 1
                            }))) : void("function" == typeof c && c({
                                error: 1
                            }))
                        })
                    }) : void("function" == typeof c && c())
                },
                requestOneUserStories: function(b, c, d) {
                    var e = this,
                        f = 2;
                    d = d || 0, d++, a.sendMessage("getCookies", function(g) {
                        if (!g) return c();
                        var h = "https://i.instagram.com/api/v1/feed/user/" + b + "/reel_media/";
                        $.ajax({
                            method: "GET",
                            url: h,
                            dataType: "json"
                        }).done(function(g) {
                            g && "object" == typeof g ? c(g) : f > d ? e.requestOneUserStories(b, c, d) : a.sendMessage({
                                action: "requestOneUserStories",
                                user_id: b
                            }, function(a) {
                                c(a)
                            })
                        }).fail(function(g) {
                            f > d ? setTimeout(function() {
                                e.requestOneUserStories(b, c, d)
                            }, 100) : a.sendMessage({
                                action: "requestOneUserStories",
                                user_id: b
                            }, function(a) {
                                c(a)
                            })
                        })
                    })
                },
                requestOneUserStories2: function(b, c) {
                    a.sendMessage({
                        action: "requestOneUserStories2",
                        user_id: b
                    }, function(a) {
                        c(a)
                    })
                },
                checkPostLiveOneUser: function(b) {
                    var c = this;
                    c.livesDataCurrentUser = {};
                    var d = a.getUserNameFromWindowLocation();
                    return d ? void a.requestJSONgraphqlUser(d, function(d) {
                        if (!d || d.error || !d.graphql) return b(!1);
                        var e = d.graphql.user,
                            f = e && e.id;
                        return f ? void c.requestOneUserStories2(f, function(a) {
                            if (!a) return c.livesDataCurrentUser = {}, b(!1);
                            if (a.broadcast && a.broadcast.dash_playback_url) {
                                c.livesDataCurrentUser = a.broadcast;
                                var d = "live"
                            } else {
                                if (!a.post_live_item || !a.post_live_item.broadcasts) return b(!1);
                                c.livesDataCurrentUser = a.post_live_item, d = "post_live"
                            }
                            var e = a.reel && "undefined" != typeof a.reel.items;
                            b(!0, d, e)
                        }) : (a.trackEventWithRandom("no_user_id", {
                            method: "checkPostLiveOneUser",
                            graphql: d.graphql
                        }, .1), void("function" == typeof b && b({
                            error: 1
                        })))
                    }) : void("function" == typeof b && b())
                },
                addPostLiveIcon2UserPage: function(a, b, c) {
                    var d, e, f = this,
                        g = document.createElement("img");
                    "live" == b ? (d = chrome.runtime.getURL("/images/img/icon_live.png"), e = "ext-live") : "post_live" == b && (d = chrome.runtime.getURL("/images/img/icon_post_live.png"), e = "ext-postlive"), g.setAttribute("src", d);
                    var h = document.createElement("div");
                    h.className = "ext_post_live_icon_wrap", h.appendChild(g), a.appendChild(h);
                    var i = document.createElement("div");
                    i.className = "ext_post_live_placeholder", a.appendChild(i), i.dataset.type = e, i.addEventListener("click", function(b) {
                        b.stopPropagation(), f.onUserStoryWithPostLiveClick(a, this, c)
                    })
                },
                onUserStoryWithPostLiveClick: function(b, d, e) {
                    var f = function() {
                        if ("ext-postlive" == d.dataset.type) {
                            var b = c.livesDataCurrentUser.user.pk;
                            a.sendMessage({
                                action: "open_stories_tab",
                                user_id: b
                            })
                        } else if ("ext-live" == d.dataset.type) {
                            var e = c.livesDataCurrentUser.id;
                            a.sendMessage({
                                action: "open_stories_tab",
                                story_id: e
                            })
                        }
                    };
                    e ? g.getModalBox().showStoryTypeUserChoice({
                        showPostLiveCallback: function() {
                            f()
                        },
                        showStoriesCallback: function() {
                            b.click()
                        }
                    }) : (f(), document.body.click())
                },
                getPrepareLiveStory: function(b) {
                    try {
                        var c = [];
                        if (b.broadcasts) b.broadcasts.forEach(function(b) {
                            try {
                                var d = {
                                    story_type: "post_live",
                                    dash_manifest: b.dash_manifest,
                                    html: '<div class="ext_video_preload"><span></span></div><video class="ext_video_story_player" controls></video>',
                                    user_pk: b.broadcast_owner.pk,
                                    username: b.broadcast_owner.username,
                                    userPic: b.broadcast_owner.profile_pic_url
                                };
                                c.push(d)
                            } catch (e) {
                                a.trackErrorParseAjaxResponse({
                                    method: "getPrepareLiveStory",
                                    error: e,
                                    data: b,
                                    random: .05
                                })
                            }
                        });
                        else {
                            var d = b.dash_playback_url;
                            if (d || (d = b.dash_abr_playback_url), !d) return a.trackEventWithRandom("NO_dash_playback_url", {
                                storyObj: b
                            }, .1), null;
                            var e = d.match(/(\d+)\.mpd/);
                            e = e ? e[1] : b.id;
                            try {
                                c.push({
                                    story_type: "live",
                                    media_id: e,
                                    playback_url: d,
                                    html: '<div class="ext_video_preload"><span></span></div><div class="video_live_finished">' + chrome.i18n.getMessage("broadcast_finished") + '</div><video src="' + d + '" class="ext_video_story_player" controls></video><div class="chatbox_header"></div><div class="live_chatbox"></div>',
                                    user_pk: b.broadcast_owner.pk,
                                    username: b.broadcast_owner.username,
                                    userPic: b.broadcast_owner.profile_pic_url,
                                    viewer_count: parseInt(b.viewer_count)
                                })
                            } catch (f) {
                                a.trackErrorParseAjaxResponse({
                                    method: "getPrepareLiveStory",
                                    error: f,
                                    data: b,
                                    random: .05
                                })
                            }
                        }
                        return c
                    } catch (f) {
                        a.trackCodeError(f, "getPrepareLiveStory")
                    }
                },
                getPrepareStoryItems: function(b, c) {
                    var d = [];
                    return b.forEach(function(b) {
                        try {
                            var e, f = null,
                                g = 0,
                                h = 0,
                                i = void 0,
                                j = void 0,
                                k = "undefined" != typeof b.video_versions;
                            k ? (b.video_versions.forEach(function(b) {
                                try {
                                    b.width > g ? (g = b.width, h = b.height, f = b.url) : b.width < i && (i = b.width, j = b.url)
                                } catch (c) {
                                    a.trackErrorParseAjaxResponse({
                                        method: "getPrepareStoryItems 1",
                                        error: c,
                                        data: b,
                                        random: .01
                                    })
                                }
                            }), b.image_versions2.candidates.forEach(function(b) {
                                try {
                                    i = b.width, j = b.url
                                } catch (c) {
                                    a.trackErrorParseAjaxResponse({
                                        method: "getPrepareStoryItems 2",
                                        error: c,
                                        data: b,
                                        random: .01
                                    })
                                }
                            }), e = "mp4", -1 !== f.indexOf(".flv") && (e = "flv")) : (b.image_versions2.candidates.forEach(function(b) {
                                try {
                                    b.width > g && (g = b.width, h = b.height, f = b.url), "undefined" == typeof i ? (i = b.width, j = b.url) : b.width < i && (i = b.width, j = b.url)
                                } catch (c) {
                                    a.trackErrorParseAjaxResponse({
                                        method: "getPrepareStoryItems 3",
                                        error: c,
                                        data: b,
                                        random: .01
                                    })
                                }
                            }), e = "jpg", -1 !== f.indexOf(".png") && (e = "png"));
                            var l = f.match(/\/([^\/?]+)(?:$|\?)/);
                            l = l && l[1], l || (l = "noname." + e);
                            var m = {
                                w: g,
                                h: h,
                                isVideo: k,
                                type: k ? "video" : "photo",
                                url: f,
                                prev: j,
                                filename: l,
                                story_type: "tray",
                                username: b.user.username || c && c.username || "",
                                userPic: b.user.profile_pic_url || c && c.profile_pic_url || ""
                            };
                            k ? m.html = '<div class="ext_video_preload"><span></span></div><video class="ext_video_story_player" poster="" controls><source src="' + f + '" type="video/mp4"> </video>' : m.src = f, d.push(m)
                        } catch (n) {
                            a.trackCodeError(n, "getPrepareStoryItems")
                        }
                    }), d
                },
                createPswp: function() {
                    var a = document.createElement("div");
                    a.setAttribute("tabindex", "-1"), a.setAttribute("role", "dialog"), a.setAttribute("aria-hidden", "true"), a.className = "pswp insta_down";
                    var b = chrome.i18n.getMessage("download"),
                        d = chrome.i18n.getMessage("download_all");
                    return a.innerHTML = '<div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden pswp__ctrls-wrap"><div class="pswp__top-bar"><div class="pswp__counter"></div><div class="dl_btns_container"><a type="button" class="' + c.dlBtnClassName + ' ext_ds_dl_btn ext_story__download" title="' + b + '"><span class="ext_icon"></span><span class="ext_text">' + b + '</span></a><a type="button" class="' + c.dlBtnClassName + ' ext_ds_dl_all_btn ext_story__download_all" title="' + d + '"><span class="ext_icon"></span><span class="ext_text">' + d + '</span></a></div><div class="live_header"><span class="live_icon"></span><span class="viewers_count"><span class="eye_icon"></span><span class="count_text">count</span></span></div><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="story_author_wrap"><div class="story_author_wrap_2"><a target="_blank" class="author_link"><img src="" class="story_author_icon"></a><div class="story_author_name"></div></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div>', document.querySelector("body").appendChild(a), a
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
                getLiveComments: function(b, c, d) {
                    function f() {
                        k || $.ajax({
                            method: "GET",
                            url: j,
                            dataType: "json"
                        }).done(function(a) {
                            m = 0, g(a) && setTimeout(f, l)
                        }).fail(function(a) {
                            return m++, 7 > m ? void setTimeout(function() {
                                f()
                            }, 500) : void("function" == typeof d && d())
                        })
                    }

                    function g(b) {
                        try {
                            if (!b || "object" != typeof b || "ok" != b.status) return a.trackUnknownAjaxResponse({
                                method: "handleCommentResponse",
                                url: url,
                                data: b,
                                random: .01
                            }), 6 >= m;
                            if (b.comment_muted) return c.commentMuted(), !0;
                            var d = b.comments;
                            if (!d || !d.length) return !0;
                            e.objectSortByProp(d, "created_at"), c.is_muted && c.commentActive(), d.forEach(function(a) {
                                c.addComment(a)
                            });
                            var f = d.pop();
                            return h = parseInt(f.created_at), !h || isNaN(h) ? (a.trackEvent("unknown_comment_data", {
                                url: j,
                                type: "code_200_unknown_response",
                                data: f
                            }), !0) : (j = i + "?last_comment_ts=" + h, !0)
                        } catch (g) {
                            a.trackCodeError(g, "handleCommentResponse")
                        }
                    }
                    var h, i = "https://i.instagram.com/api/v1/live/" + b + "/get_comment/",
                        j = i,
                        k = !1,
                        l = 4e3,
                        m = 0;
                    return f(), {
                        stop: function() {
                            k = !0
                        }
                    }
                },
                getLiveInfo: function(b, c, d) {
                    function e() {
                        j || $.ajax({
                            method: "GET",
                            url: g,
                            dataType: "json"
                        }).done(function(b) {
                            try {
                                h = 0, f(b) && setTimeout(e, i)
                            } catch (c) {
                                a.trackCodeError(c, "getLiveInfo2")
                            }
                        }).fail(function(b) {
                            try {
                                var c = b.responseJSON;
                                h++, 7 > h ? setTimeout(function() {
                                    e()
                                }, 500) : 400 == b.status && c && "login_required" != c.message && "function" == typeof d ? d() : c ? "string" == typeof c.message && "broadcast is unavailable" !== c.message.toLowerCase() && a.trackEventWithRandom("error_info_live_url", {
                                    url: g,
                                    type: "unknown_response",
                                    response: c
                                }, .01) : a.trackEventWithRandom("error_info_live_url", {
                                    url: g,
                                    type: "no_response",
                                    resCode: b.status
                                }, .01)
                            } catch (f) {
                                a.trackCodeError(f, "getLiveInfo3")
                            }
                        })
                    }

                    function f(b) {
                        return b && "object" == typeof b && "ok" == b.status ? (c.setViewersCount(b.viewer_count), !0) : (a.trackEventWithRandom("error_comment_url", {
                            url: g,
                            type: "code_200_unknown_response",
                            response: b
                        }, .01), 6 >= h)
                    }
                    var g = "https://i.instagram.com/api/v1/live/" + b + "/info/",
                        h = 0,
                        i = 1e4,
                        j = !1;
                    return e(), {
                        stop: function() {
                            j = !0
                        }
                    }
                },
                chatBoxInit: function(b) {
                    try {
                        var c, d, e, f, g, h, i, j, k = function() {
                                return document.querySelector(".live_chatbox")
                            },
                            l = function() {
                                return document.querySelector(".chatbox_header")
                            };
                        if (c = k(), d = l(), !c) return null;
                        if (!d) return null;
                        if (!b) return null;
                        if ("object" != typeof Ps || null == Ps) return null;
                        Ps.initialize(c, {
                            wheelSpeed: 2,
                            minScrollbarLength: 20,
                            maxScrollbarLength: 60
                        });
                        var m = function() {
                                return c ? (c.style.display = "block", c.style.opacity = 1, h = !0, i = !1, !0) : !1
                            },
                            n = function() {
                                return c ? (c.style.display = "none", h = !1, i = !0, !0) : !1
                            },
                            o = function() {
                                i ? (d.innerText = f, m()) : (d.innerText = e, n())
                            },
                            p = function() {
                                return d ? (d.display = "block", !0) : !1
                            },
                            q = function() {
                                try {
                                    var e = b.getBoundingClientRect();
                                    if ("undefined" == typeof e) return void a.trackEvent("error_getBoundingClientRect");
                                    d.style.left = e.left + e.width + "px", d.style.top = e.top + 50 + "px", d.style.display = "block", c.style.left = e.left + e.width + "px", c.style.top = e.top + 80 + "px", c.style.height = e.height - 100 + "px"
                                } catch (f) {
                                    a.trackCodeError(f, "updatePositionAndSize")
                                }
                            },
                            r = function() {
                                try {
                                    j = document.createElement("div"), j.className = "one_comment_wrap";
                                    var b = document.createElement("a");
                                    b.className = "author_link", b.setAttribute("target", "_blank");
                                    var c = document.createElement("img");
                                    c.className = "comment_author_icon", b.appendChild(c);
                                    var d = document.createElement("div");
                                    d.className = "comment_author_name";
                                    var e = document.createElement("p");
                                    e.className = "live_comment_text", j.appendChild(b), j.appendChild(d), j.appendChild(e)
                                } catch (f) {
                                    a.trackCodeError(f, "createCommentElTpl")
                                }
                            },
                            s = function() {
                                return j || r(), j.cloneNode(!0)
                            };
                        return e = chrome.i18n.getMessage("show_live_comments"), f = chrome.i18n.getMessage("hide_live_comments"), g = chrome.i18n.getMessage("comments_is_muted"), d.innerText = f, q(), d.addEventListener("click", o), b.addEventListener("resize", q), window.addEventListener("resize", q), {
                            is_muted: !1,
                            commentMuted: function() {
                                this.is_muted || (this.is_muted = !0, d && d.removeEventListener("click", o), d.innerText = g)
                            },
                            commentActive: function() {
                                this.is_muted && (this.is_muted = !1, d.innerText = f, d.addEventListener("click", o))
                            },
                            shown: function() {
                                return h
                            },
                            hidden: function() {
                                return i
                            },
                            show: m,
                            hide: n,
                            addComment: function(b) {
                                try {
                                    var d = c.scrollHeight,
                                        e = s(),
                                        f = e.querySelector("a.author_link");
                                    f.href = "https://www.instagram.com/" + b.user.username;
                                    var g = e.querySelector("img.comment_author_icon");
                                    g.src = b.user.profile_pic_url;
                                    var h = e.querySelector("div.comment_author_name");
                                    h.innerText = b.user.username;
                                    var i = e.querySelector("p.live_comment_text");
                                    i.innerText = b.text, c.appendChild(e), d < c.scrollTop + c.clientHeight + 50 && $(c).animate({
                                        scrollTop: c.scrollHeight
                                    }, 800)
                                } catch (j) {
                                    a.trackCodeError(j, "addComment")
                                }
                            },
                            destroy: function() {
                                d && d.removeEventListener("click", o), b && b.removeEventListener("resize", q), window.removeEventListener("resize", q), n(), p()
                            }
                        }
                    } catch (t) {
                        a.trackCodeError(t, "chatBoxInit")
                    }
                },
                showInPswp: function(b) {
                    try {
                        var c = this;
                        if (!b || !b.length) return;
                        var d, e, f, g, h, i, j, k, l, m = function(a, b) {
                                var c = document.querySelector(".ext_ds_dl_btn"),
                                    d = document.querySelector(".ext_ds_dl_all_btn");
                                c && d && ("tray" == a ? (c.style.display = "block", b > 1 ? d.style.display = "block" : d.style.display = "none") : (c.style.display = "none", d.style.display = "none"))
                            },
                            n = function() {
                                c.stopAllVideos(), f && f.stop(), g && g.stop(), h && h.destroy(), l && l.hide(), s(), "tray" !== d.currItem.story_type && e && (e.pause(), e.reset())
                            },
                            o = function() {
                                k = !0, j && (j.style.display = "none")
                            },
                            p = function() {
                                k = !0, j && (j.style.display = "none")
                            },
                            q = function() {
                                k = !1, setTimeout(function() {
                                    !k && j && (j.style.display = "flex")
                                }, 200)
                            },
                            r = function() {
                                i && (i.addEventListener("playing", o), i.addEventListener("canplay", p), i.addEventListener("waiting", q))
                            },
                            s = function() {
                                i && (i.removeEventListener("playing", o), i.removeEventListener("canplay", p), i.removeEventListener("waiting", q))
                            },
                            t = function(a) {
                                return a ? (document.querySelector(".story_author_wrap .author_link").href = "https://www.instagram.com/" + a.username, document.querySelector(".story_author_wrap .story_author_icon").src = a.userPic, document.querySelector(".story_author_wrap .story_author_name").innerText = a.username, void(document.querySelector(".story_author_wrap").style.display = "block")) : void(document.querySelector(".story_author_wrap").style.display = "none")
                            };
                        c.showingStoryItems = b, c.showingStoryType = b[0].story_type;
                        var u = c.getPswp(),
                            v = {
                                index: 0,
                                closeOnScroll: !1,
                                history: !1,
                                focus: !0,
                                bgOpacity: .9
                            };
                        d = new PhotoSwipe(u, PhotoSwipeUI_Default, b, v), c.gallery = d, m(b[0].story_type, c.showingStoryItems.length), d.listen("afterChange", function() {
                            try {
                                if (!this.currItem.container) return;
                                var b = this.currItem.isVideo || "tray" !== this.currItem.story_type;
                                if (b) {
                                    if (k = !1, i = this.currItem.container.querySelector("video.ext_video_story_player"), j = this.currItem.container.querySelector(".ext_video_preload"), !i || !j) return;
                                    j.style.display = "flex", i.currentTime = 0, r()
                                }
                                "tray" == this.currItem.story_type && this.currItem.isVideo && (i.play(), 4 == i.readyState && (j.style.display = "none"))
                            } catch (c) {
                                a.trackCodeError(c, "showInPswp")
                            }
                        }), d.listen("beforeChange", function() {
                            n()
                        }), d.listen("close", function() {
                            n(), c.showingStoryItems = [], c.showingStoryType = null, u && u.remove && u.remove()
                        }), d.listen("destroy", function() {
                            c.gallery = null
                        }), t(b[0]), d.init()
                    } catch (w) {
                        a.trackCodeError(w, "showInPswp")
                    }
                },
                checkStateDownloadAllBtn: function(a) {
                    var b = document.querySelector(".ext_ns_dl_all_btn");
                    if (b) {
                        var c = 1,
                            d = a.querySelector("._mviq1");
                        d || (d = a.querySelector("section > header + div")), d && (c = d.childElementCount), c > 1 ? (b.querySelector(".stories_count").innerText = "(" + c + ")", b.style.display = "flex") : b.style.display = "none"
                    }
                },
                appendDlBtn2NativeStories: function(a) {
                    var b = this,
                        d = document.createElement("div");
                    d.className = "native_stories_dl_wrap";
                    var e = document.createElement("a");
                    e.className = c.dlBtnClassName + " ext_ns_dl_btn ext_story__download", e.innerHTML = '<span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download") + "</span>";
                    var f = document.createElement("a");
                    f.className = c.dlBtnClassName + " ext_ns_dl_all_btn ext_story__download_all", f.innerHTML = '<span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download_all") + '</span><span class="stories_count"></span>', d.appendChild(e), d.appendChild(f), a.appendChild(d), b.checkStateDownloadAllBtn(a)
                },
                onClickDlBtnNativeStoryOne: function(b) {
                    a.clickStats.dlBtnSt++;
                    var d = this;
                    c.storiesPause.on(), g.loaderBtnState.on(d);
                    var e = window.location.pathname.match(/stories\/([^\/]+)/);
                    e = e && e[1];
                    var f, h, i = d.parentNode.parentNode.querySelector("section header + div + div");
                    if (i) {
                        var j = g.findVideoElement(i);
                        if (j) f = g.getLinkFromVideoElement(j), h = a.getFileNameFromVideoLink(f, e);
                        else {
                            var k = g.findImageElement(i);
                            f = g.getLinkFromImgElement(k), h = a.getFileNameFromImageLink(f, e)
                        }
                        f && h && g.onGetMediaInfo.call(g, {
                            url: f,
                            filename: h,
                            isStory: !0
                        }, d)
                    }
                },
                onClickDlBtnNativeStoryAll: function(a) {
                    d.zipCanceledByUser = !1, g.loaderBtnState.on(this), c.storiesPause.on(), c.getAllLinksCurrentNativeStories(function(a) {
                        if (g.loaderBtnState.off(), !a || a.error) return void c.storiesPause.off();
                        var b = a;
                        if (b && b.length) {
                            var e = b[0] && b[0].username;
                            d.downloadZIP(b, e, function(a) {
                                a && a.error && c.storiesPause.off()
                            }, !0)
                        }
                    })
                },
                onClickDlBtnOurStoryOne: function(b) {
                    var d = c.gallery.currItem;
                    if ("post_live" != d.story_type) {
                        var e = this,
                            f = d.filename;
                        c.gallery.currItem.username && (f = c.gallery.currItem.username + "_" + f), c.storiesPause.on(), a.downloadFile({
                            url: d.url,
                            filename: f,
                            isStory: !0
                        }, function(a) {
                            g.loaderBtnState.off(), a || g.showDownloadError(e)
                        })
                    }
                },
                onClickDlBtnOurStoryAll: function(a) {
                    d.zipCanceledByUser = !1, c.storiesPause.on(), d.downloadZIP(c.showingStoryItems.slice(0), c.gallery.currItem.username, function(a) {
                        a && a.error && c.storiesPause.off()
                    }, !0)
                },
                storiesPause: {
                    isPausedByAs: !1,
                    isNativeStories: function() {
                        return window.location.href.indexOf("/stories/") > -1
                    },
                    isOurStories: function() {
                        return !(!c.gallery || !c.gallery.currItem)
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
                        if (!c.gallery || !c.gallery.currItem || !c.gallery.currItem.container) return !1;
                        var a = c.gallery.currItem.container,
                            b = a.querySelector("video.ext_video_story_player");
                        return b ? void(b.paused || (b.pause(), this.isPausedByAs = !0)) : !1
                    },
                    playOurStories: function() {
                        if (this.isPausedByAs = !1, c.gallery && c.gallery.currItem && c.gallery.currItem.container) {
                            var a = c.gallery.currItem.container,
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
                getAllLinksCurrentNativeStories: function(b) {
                    var c = window.location.pathname.match(/stories\/highlights\/([\d]+)/);
                    if (c = c && c[1]) a.getPostsDataFromUserGraphqlOther({
                        highlight_reel_id: c
                    }, b);
                    else {
                        var d = window.location.pathname.match(/stories\/([^\/]+)/);
                        if (d = d && d[1], !d) return void b();
                        this.checkStoryOneUser(d, b)
                    }
                },
                addDlBtn2NativeStories: function(a) {
                    var b = a.parentNode;
                    b.querySelector(".native_stories_dl_wrap") ? this.checkStateDownloadAllBtn(b) : this.appendDlBtn2NativeStories(b)
                },
                getStoryVideoMediaInfo: function(b, c) {
                    var d = b.querySelectorAll("source");
                    if (!d.length) return !1;
                    var e = ["avc1.64001E", "avc1.4D401E", "avc1.58A01E", "avc1.42E01E"],
                        f = [];
                    d.forEach(function(a) {
                        var b = a.getAttribute("type");
                        if (b) {
                            var c = b.match(/codecs="([^,]+)/);
                            if (c = c && c[1]) {
                                var d = e.indexOf(c); - 1 != d && (f[d] = a.src)
                            }
                        }
                    });
                    var g;
                    for (var h in f)
                        if ("string" == typeof f[h] && f[h].length) {
                            g = f[h];
                            break
                        } g || (g = d[0].getAttribute("src"));
                    var i = "mp4"; - 1 !== g.indexOf(".flv") && (i = "flv");
                    var j = g.match(/\/([^\/?]+)(?:$|\?)/);
                    j = j && j[1], j || (j = "noname." + i), c && (j = c + "_" + j), j = a.filename.modify(j);
                    var k = b.getAttribute("poster");
                    return k || (k = ""), {
                        filename: j,
                        url: g,
                        prev: k,
                        type: "video",
                        referer: window.location.href
                    }
                }
            }
        }(),
        d = function() {
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
                addDlZipBtn: function() {
                    if (!document.querySelector("." + this.dlBtnClassName)) {
                        var b = document.querySelector("section > main > nav ._qlijk");
                        if (b || (b = document.querySelector("section > main + nav > div > div > div > div:last-child div")), !b && document.querySelector(".XrOey") && (b = document.querySelector(".XrOey").parentNode), b) {
                            var c = document.createElement("div");
                            c.className = "XrOey", c.innerHTML = '<div class="' + this.downloadAllBtnWrapperClass + '"><span class="ext_tooltip download_all">' + chrome.i18n.getMessage("download_all") + '</span><a class="_8scx2 _gvoze ' + this.dlBtnClassName + '"></a></div>', b.appendChild(c), a.domStats.dlBtnAll++
                        }
                    }
                },
                showPopupDlAll: function() {
                    var b = document.querySelector("." + this.dlBtnClassName),
                        c = b.parentNode.parentNode,
                        d = document.createElement("div");
                    d.innerHTML = '<div class="ext_all_popup_wrap"><div class="ext_dl_all_dialog" role="dialog"></div><div class="hUQsm"></div><div class="T5hFd"></div><div class="ext_dl_all_popup_loader"><span class="ext_icon"></span></div><div class="ext_dl_all_popup"><div class="ext_popup_header"></div><div class="ext_popup_links_wrap"></div><div class="ext_popup_footer"></div></div>', c.appendChild(d), d.querySelector(".ext_dl_all_dialog").addEventListener("click", function(a) {
                        a.stopPropagation(), c.removeChild(d)
                    });
                    var e = this;
                    a.sendMessage("isDownloadAllProcessNow", function(a) {
                        if (a) e.buildAllPopup({
                            denied: 1
                        });
                        else if (e.isOnePostPage()) e.pageType = e.PAGE_TYPE_ONE_POST, e.buildAllPopup({
                            count: 1
                        });
                        else if (document.querySelector('header a[href*="/followers/"]')) {
                            var b = -1 !== window.location.href.indexOf("/saved/"),
                                c = -1 !== window.location.href.indexOf("/tagged/"),
                                d = {
                                    fromSaved: b,
                                    fromTagged: c
                                };
                            e.checkPossibilityVirtualScrollPage(d, function(a) {
                                a && !a.error && a.success && a.count ? (d.count = a.count, d.user_page = !0, e.pageType = e.PAGE_TYPE_USERPAGE, e.buildAllPopup(d)) : (e.pageType = e.PAGE_TYPE_DEFAULT, e.buildAllPopup({
                                    count: g.cachedMediaShortCodes.length
                                }))
                            })
                        } else e.pageType = e.PAGE_TYPE_DEFAULT, e.buildAllPopup({
                            count: g.cachedMediaShortCodes.length
                        })
                    })
                },
                rebuildPopup: function(a) {
                    document.querySelector(".ext_all_popup_wrap") && d.pageType == d.PAGE_TYPE_DEFAULT && d.buildAllPopup({
                        count: g.cachedMediaShortCodes.length
                    })
                },
                isOnePostPage: function() {
                    return -1 === window.location.href.indexOf("/p/") ? !1 : 1 == document.querySelectorAll('article > header + div > div[role="button"]').length ? !0 : !1
                },
                buildAllPopup: function(b) {
                    var c = d;
                    if (0 === b.count) return c.buildAllPopupNoFiles();
                    if (!b.fromTagged && c.massDownloadProSettings && c.pageType == c.PAGE_TYPE_USERPAGE) return c.buildAllPopupPro(b);
                    c.isAdvancedSettings = !1;
                    var e = document.querySelector(".ext_all_popup_wrap");
                    if (e) {
                        var f = e.querySelector(".ext_dl_all_popup"),
                            g = e.querySelector(".ext_popup_header"),
                            h = e.querySelector(".ext_dl_all_popup_loader"),
                            i = e.querySelector(".ext_popup_links_wrap"),
                            j = f.querySelector(".ext_popup_footer");
                        if (i.innerHTML = "", b.denied) return g.innerText = chrome.i18n.getMessage("parallel_all_download_denied"), h.style.display = "none", void(f.style.display = "block");
                        var k = !1;
                        if (b.fromTagged) {
                            var l = $('a[href*="/tagged/"]').text();
                            l.length && (l = (" (" + l + ")").toUpperCase()), g.innerHTML = chrome.i18n.getMessage("download_all") + l
                        } else {
                            var m = b.count;
                            g.innerHTML = chrome.i18n.getMessage("files_found_on_page") + ": <br>" + m;
                            var n = m;
                            c.pageType == c.PAGE_TYPE_DEFAULT ? (k = !0, j.innerText = chrome.i18n.getMessage("scroll_page_for_download_more")) : c.pageType == c.PAGE_TYPE_ONE_POST ? g.innerHTML = chrome.i18n.getMessage("files_found_on_page") + ":  <br>" + m : c.pageType == c.PAGE_TYPE_USERPAGE && (k = !0, j.innerHTML = '<a href="#">' + chrome.i18n.getMessage("mass_download_pro") + "</a>", j.querySelector("a").addEventListener("click", function(e) {
                                e.stopPropagation(), e.preventDefault(), c.massDownloadProSettings = !0, a.sendMessage("massDownloadProSettingOn"), d.buildAllPopupPro(b)
                            }))
                        }
                        if (k) {
                            var o = document.createElement("div");
                            o.className = "choose_count_dl_all_form", o.innerHTML = '<div class="ext_form_header">' + chrome.i18n.getMessage("set_range") + "</div><span>" + chrome.i18n.getMessage("from") + '</span><input id="ext_dl_all_start" type="number" min="1" max="' + (parseInt(m) - 1) + '" value="1"><span>' + chrome.i18n.getMessage("to") + '</span><input id="ext_dl_all_end" type="number" min="2" value="' + n + '" max="' + m + '">', i.appendChild(o)
                        }
                        var p = document.createElement("div");
                        if (p.className = "ext_btn_wrap", p.innerHTML = '<div class="ext_popup_dl_btn" data-count=""><span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download") + "</span></div>", i.appendChild(p), h.style.display = "none", f.style.display = "block", b.fromTagged) p.querySelector(".ext_popup_dl_btn").dataset.from_tagged = "1";
                        else {
                            var q = document.querySelector("#ext_dl_all_start"),
                                r = document.querySelector("#ext_dl_all_end"),
                                s = $(r),
                                t = $(q);
                            s.on("keydown", function() {
                                var a = this;
                                setTimeout(function() {
                                    var b = parseInt(a.value);
                                    isNaN(b) || b < q.value ? a.value = q.value : b > m && (a.value = m)
                                }, 1e3)
                            }), t.on("keydown", function() {
                                var a = this;
                                setTimeout(function() {
                                    var b = parseInt(a.value);
                                    isNaN(b) || 1 > b ? a.value = 1 : b > r.value && (a.value = r.value)
                                }, 1e3)
                            }), s.on("focus", function() {
                                this.select()
                            }), t.on("focus", function() {
                                this.select()
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
                buildAllPopupPro: function(b) {
                    var c = d;
                    c.isAdvancedSettings = !0;
                    var e = document.querySelector(".ext_all_popup_wrap"),
                        f = b.count;
                    if (e) {
                        var g = e.querySelector(".ext_dl_all_popup"),
                            h = e.querySelector(".ext_popup_header"),
                            i = e.querySelector(".ext_dl_all_popup_loader"),
                            j = e.querySelector(".ext_popup_links_wrap"),
                            k = g.querySelector(".ext_popup_footer");
                        j.innerHTML = "", h.innerHTML = chrome.i18n.getMessage("files_found_on_page") + ": <br>" + f;
                        var l = document.createElement("div");
                        l.className = "choose_count_dl_all_form", l.innerHTML = '<div class="ext_form_header">' + chrome.i18n.getMessage("advanced_settings_mass_download") + '</div><div class="ext_form_al_all_block"><div class="ext_form_al_all_sub_block"><div class="ext_half_66 ext_text_left"><span class="ext_span_label" title="' + chrome.i18n.getMessage("by_default_100") + '">' + chrome.i18n.getMessage("set_percent") + '</span></div><div class="inline_block ext_label_wrap"><label class="ext_switch" title="' + chrome.i18n.getMessage("by_default_100") + '"><input type="checkbox" name="percent_toggler"><span class="ext_slider"></span></label></div><div class="ext_half_33 ext_text_right"><input name="percent_count" type="number" max="100" min="1" value="100" class="ext_disabled" disabled>%</div></div><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("most_liked") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="most_liked" disabled><span class="ext_slider ext_disabled"></span></label></div></div><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label" title="' + chrome.i18n.getMessage("only_video") + '">' + chrome.i18n.getMessage("most_viewed") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch" title="' + chrome.i18n.getMessage("only_video") + '"><input type="checkbox" name="most_viewed" disabled><span class="ext_slider ext_disabled"></span></label></div></div></div><div class="ext_form_al_all_block"><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("only_photo") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="only_photo"><span class="ext_slider"></span></label></div></div><div class="ext_form_al_all_sub_block ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("only_video") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="only_video"><span class="ext_slider"></span></label></div></div></div><div class="ext_form_al_all_block"><div class="ext_half_66 ext_text_left"><span class="ext_span_label">' + chrome.i18n.getMessage("for_previous_days") + '</span><div class="inline_block ext_label_wrap"><label class="ext_switch"><input type="checkbox" name="for_previous_days"><span class="ext_slider"></span></label></div></div><div class="ext_half_33 ext_text_right"><input type="number" name="last_days_count" class="ext_disabled" max="365" min="1" value="365" disabled></div></div>', j.appendChild(l);
                        var m = document.createElement("div");
                        m.className = "ext_btn_wrap", m.innerHTML = '<div class="ext_popup_dl_btn" data-count=""><span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download") + "</span></div>", k.innerHTML = '<a href="#">' + chrome.i18n.getMessage("mass_download_pro_back") + "</a>", k.querySelector("a").addEventListener("click", function(e) {
                            e.stopPropagation(), e.preventDefault(), c.massDownloadProSettings = !1, a.sendMessage("massDownloadProSettingOff"), d.buildAllPopup(b)
                        });
                        var n = $(l),
                            o = $('[name="percent_toggler"]', n),
                            p = $('[name="percent_count"]', n),
                            q = $('[name="only_photo"]', n),
                            r = $('[name="only_video"]', n),
                            s = $('[name="for_previous_days"]', n),
                            t = $('[name="last_days_count"]', n),
                            u = $('[name="most_liked"]', n),
                            v = $('[name="most_viewed"]', n);
                        $.fn.enableInput || ($.fn.enableInput = function() {
                                var a = this;
                                a && a.length && "input" == a.get(0).tagName.toLowerCase() && (a.removeAttr("disabled"), "checkbox" == a.attr("type") ? a.parent().find(".ext_slider").removeClass("ext_disabled") : "number" == a.attr("type") && a.removeClass("ext_disabled"))
                            }), $.fn.disableInput || ($.fn.disableInput = function() {
                                var a = this;
                                a && a.length && "input" == a.get(0).tagName.toLowerCase() && (a.attr("disabled", !0), "checkbox" == a.attr("type") ? a.parent().find(".ext_slider").addClass("ext_disabled") : "number" == a.attr("type") && a.addClass("ext_disabled"))
                            }), o.on("change", function() {
                                this.checked ? (u.enableInput(), r.prop("checked") && v.enableInput(), p.enableInput(), p.focus(), p.select()) : (u.disableInput(), u.prop("checked", !1), v.disableInput(), v.prop("checked", !1), p.disableInput())
                            }), q.on("change", function() {
                                this.checked && (r.prop("checked", !1), v.prop("checked", !1), v.disableInput())
                            }), r.on("change", function() {
                                this.checked ? (q.prop("checked", !1), o.prop("checked") && v.enableInput()) : (v.prop("checked", !1), v.disableInput())
                            }), s.on("change", function() {
                                this.checked ? (t.enableInput(), t.focus(), t.select()) : t.disableInput()
                            }), v.on("change", function() {
                                this.checked && u.prop("checked", !1)
                            }), u.on("change", function() {
                                this.checked && v.prop("checked", !1)
                            }), $(l.querySelector('[name="last_days_count"]')).on("keydown", function() {
                                var a = this;
                                setTimeout(function() {
                                    var b = parseInt(a.value);
                                    isNaN(b) || 1 > b ? a.value = 1 : b > 999 && (a.value = 999)
                                }, 200)
                            }), $(l.querySelector('[name="percent_count"]')).on("keydown", function() {
                                var a = this;
                                setTimeout(function() {
                                    var b = parseInt(a.value);
                                    isNaN(b) || 1 > b ? a.value = 1 : b > 100 && (a.value = 100), 100 > b ? u.enableInput() : (u.disableInput(), u.prop("checked", !1))
                                }, 200)
                            }),
                            function() {
                                var a = c.advancedDownloadAllSettings.get() || {};
                                a.percent && a.percent < 100 && (o.prop("checked", !0), p.enableInput(), p.val(a.percent), u.enableInput(), a.most_liked && u.prop("checked", !0), "video" == a.mediaType && (v.enableInput(), a.most_viewed && v.prop("checked", !0))), "photo" == a.mediaType ? q.prop("checked", !0) : "video" == a.mediaType && r.prop("checked", !0), a.previousDays && (s.prop("checked", !0), t.enableInput(), t.val(a.previousDays))
                            }(), j.appendChild(m), i.style.display = "none", g.style.display = "block"
                    }
                },
                downloadAllByAdvanced: function() {
                    var b, c, e = $(".choose_count_dl_all_form"),
                        f = {},
                        h = $('[name="percent_toggler"]', e),
                        i = $('[name="only_photo"]', e),
                        j = $('[name="only_video"]', e),
                        k = $('[name="for_previous_days"]', e);
                    if (k.prop("checked")) {
                        b = parseInt($('[name="last_days_count"]', e).val());
                        var l = new Date;
                        c = new Date(l.getFullYear() + "-" + (l.getMonth() + 1) + "-" + l.getDate()).getTime(), f.timeFrom = Math.floor((c - 864e5 * b) / 1e3), f.previousDays = b
                    }
                    f.mediaType = i.prop("checked") ? "photo" : j.prop("checked") ? "video" : "all", h.prop("checked") && (f.percent = parseInt($('[name="percent_count"]', e).val()), f.most_liked = $('[name="most_liked"]', e).prop("checked"), j.prop("checked") && (f.most_viewed = $('[name="most_viewed"]', e).prop("checked"))), d.advancedDownloadAllSettings.set(f), a.sendMessage("downloadAllProcessStart"), d.downloadFromUserPage({
                        advanced: f
                    }, function(b, c, e) {
                        b.length ? d.downloadByShortCodes(b, c, e, f) : (a.sendMessage("downloadAllProcessFinished"), g.getModalBox().showErrorBox(chrome.i18n.getMessage("advanced_download_all_not_match")))
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
                    if (d.zipCanceledByUser = !1, d.isAdvancedSettings) return d.downloadAllByAdvanced();
                    var b, c, e;
                    switch (d.pageType) {
                        case d.PAGE_TYPE_DEFAULT:
                            var f = $("#ext_dl_all_start").val(),
                                h = $("#ext_dl_all_end").val();
                            b = h - f, e = 1;
                            break;
                        case d.PAGE_TYPE_USERPAGE:
                            f = $("#ext_dl_all_start").val(), h = $("#ext_dl_all_end").val(), b = h - f, e = 2;
                            break;
                        case d.PAGE_TYPE_ONE_POST:
                            f = 1, h = 1, b = 1, e = 1;
                            var i = document.querySelector("article header a"),
                                j = i && i.getAttribute("href");
                            c = j && j.match(/\/([^\/]+)\//), c = c && c[1];
                            break;
                        default:
                            a.trackEventWithRandom("Unknown_page_type_on_click_downloadAll", {
                                url: window.location.href,
                                pageType: d.pageType
                            }, .1), f = $("#ext_dl_all_start").val(), h = $("#ext_dl_all_end").val(), b = h - f, e = 1
                    }
                    isNaN(f) && (f = 1), isNaN(h) && (h = 1);
                    var k = function() {
                        if (1 === e) {
                            var b = g.getFoundShortCodes(f, h);
                            d.downloadByShortCodes(b, null, c)
                        } else {
                            if (2 !== e) return;
                            d.downloadFromUserPage({
                                start: f,
                                end: h
                            }, function(a, b, c) {
                                d.downloadByShortCodes(a, b, c)
                            })
                        }
                        a.sendMessage("downloadAllProcessStart")
                    };
                    b > 500 ? a.sendMessage("warning-request", function(a) {
                        a ? g.getModalBox().showDownloadAllWarning({
                            continueCallback: function() {
                                k()
                            }
                        }) : k()
                    }) : k(), $(".ext_dl_all_popup").parent().remove()
                },
                checkPossibilityVirtualScrollPage: function(b, c) {
                    var d = document.querySelector("main header section h1"),
                        e = d && d.innerText;
                    e || (e = a.getUserNameFromWindowLocation()), b.userName = e, a.getPostsDataFromUserGraphql(b, function(d) {
                        if (!d || d.error || "undefined" == typeof d.userId) return c({
                            error: 1
                        });
                        if (!b.fromTagged && ("undefined" == typeof d.end_cursor || "undefined" == typeof d.has_next_page || "undefined" == typeof d.count || "undefined" == typeof d.shortcodes)) return c({
                            error: 1
                        });
                        var f = d.count,
                            g = d.end_cursor,
                            h = d.userId;
                        return d.has_next_page === !1 ? c({
                            success: 1,
                            count: f
                        }) : void a.getPostsDataFromUserGraphqlOther({
                            end_cursor: g,
                            user_name: e,
                            user_id: h,
                            touch: !0,
                            from_saved: b.fromSaved,
                            from_tagged: b.fromTagged,
                            first: 12
                        }, function(a) {
                            return !a || a.error || "undefined" == typeof a.end_cursor || "undefined" == typeof a.has_next_page || "undefined" == typeof !a.shortcodes ? c({
                                error: 1
                            }) : (b.fromTagged && (f = a.has_next_page === !1 ? a.count : "unknown"), c({
                                success: 1,
                                count: f
                            }))
                        })
                    })
                },
                downloadFromUserPage: function(b, c) {
                    function e() {
                        if (!l.zipCanceledByUser) {
                            if (!n && p && f.length >= p || !j || k && !n) {
                                !n && o && p && (f = f.slice(o - 1, p));
                                var g = 100 * r;
                                return c(f, g, w)
                            }
                            if (!n && !h || !i) return a.trackEventWithRandom("error_download_zip", {
                                method: "scrollPage",
                                type: "endCursor_userId",
                                endCursor: h,
                                userId: i,
                                userName: w,
                                fromSaved: m,
                                fromTagged: n
                            }, .1), a.sendMessage("downloadAllProcessFinished"), u.showErrorBox(chrome.i18n.getMessage("errorZip"));
                            var q = !1,
                                v = setTimeout(function() {
                                    t.no_progress = !0, t.dont_panic = !0, q = !0, u.updatePrepareZipProgressBarAndText(t)
                                }, 2e4);
                            a.getPostsDataFromUserGraphqlOther({
                                end_cursor: h,
                                user_name: w,
                                user_id: i,
                                from_saved: m,
                                from_tagged: n,
                                downloadZipObj: d,
                                advanced: b.advanced
                            }, function(b) {
                                if (!d.zipCanceledByUser) {
                                    if (clearTimeout(v), !b || b.error) return a.trackEventWithRandom("error_download_zip", {
                                        method: "scrollPage",
                                        type: "getPostsDataFromUserGraphqlOther",
                                        endCursor: h,
                                        userId: i,
                                        userName: w,
                                        fromSaved: m
                                    }, .1), a.sendMessage("downloadAllProcessFinished"), u.showErrorBox(chrome.i18n.getMessage("errorZip"));
                                    if (q && (t.no_progress = !1, t.dont_panic = !1, q = !1), h = b.end_cursor, j = b.has_next_page, k = b.time_end, f = f.concat(b.shortcodes), t.oneValuePercent = s * (b.shortcodes.length || 1), u.updatePrepareZipProgressBarAndText(t), x++, 50 > x) var c = 1500;
                                    else c = 100 > x ? 2e3 : 200 > x ? 3e3 : 4e3;
                                    setTimeout(function() {
                                        e()
                                    }, c)
                                }
                            })
                        }
                    }
                    if ("function" == typeof c) {
                        var f = [],
                            h = null,
                            i = null,
                            j = !0,
                            k = !0,
                            l = this,
                            m = -1 !== window.location.href.indexOf("/saved/"),
                            n = -1 !== window.location.href.indexOf("/tagged/"),
                            o = b.start,
                            p = b.end,
                            q = p;
                        !q && b.advanced && (b.advanced.previousDays && (q = 2 * b.advanced.previousDays), q = 500);
                        var r = .6,
                            s = 100 / q * r,
                            t = {
                                from_tagged: n,
                                allCount: q,
                                maxValue: 100 * r,
                                oneValuePercent: s
                            },
                            u = g.getModalBox();
                        u.showPrepareDownloadProcess({
                            from_tagged: n,
                            header: chrome.i18n.getMessage("prepare_zip_links"),
                            bar_start: 0
                        }, {
                            cancelCallback: function() {
                                l.zipCanceledByUser = !0, a.sendMessage("downloadAllProcessFinished")
                            }
                        });
                        var v = document.querySelector("main header section h1"),
                            w = v && v.innerText;
                        if (w || (w = a.getUserNameFromWindowLocation()), !w) return a.trackEvent("no_username", {
                            method: "downloadFromUserPage",
                            url: window.location.href
                        }), a.sendMessage("downloadAllProcessFinished"), u.showErrorBox(chrome.i18n.getMessage("errorZip"));
                        a.getPostsDataFromUserGraphql({
                            userName: w,
                            fromSaved: m,
                            fromTagged: n,
                            advanced: b.advanced
                        }, function(b) {
                            return !b || b.error ? (a.trackEventWithRandom("error_download_zip", {
                                method: "getPostsDataFromUserGraphql",
                                userName: w,
                                fromSaved: m
                            }, .1), a.sendMessage("downloadAllProcessFinished"), u.showErrorBox(chrome.i18n.getMessage("errorZip"))) : (i = b.userId, n ? j = !0 : (h = b.end_cursor, j = b.has_next_page, k = b.time_end, f = f.concat(b.shortcodes), t.oneValuePercent = s * (b.shortcodes.length || 1)), u.updatePrepareZipProgressBarAndText(t), void e())
                        });
                        var x = 0;
                        a.firstParamRequestJSONgraphqlQuery = 48
                    }
                },
                downloadByShortCodes: function(b, c, e, f) {
                    d.prepareLinksByShortCodes(b, c, f, function(b) {
                        if (b && b.length) d.downloadZIP(b, e);
                        else if (d.zipCanceledByUser);
                        else {
                            a.sendMessage("downloadAllProcessFinished");
                            var c = g.getModalBox();
                            if (b && b.error && "not_match" == inks.error) var f = chrome.i18n.getMessage("advanced_download_all_not_match");
                            else f = chrome.i18n.getMessage("errorZip");
                            c.showErrorBox(f)
                        }
                    })
                },
                prepareLinksByShortCodes: function(b, c, d, f) {
                    function h(b, c, d, e, f) {
                        if (m.zipCanceledByUser) return c();
                        if (!q) return p && !f ? void setTimeout(function() {
                            h(b, c, d, e)
                        }, 2e4) : void a.getAllMediaDataFromJsonGraphql({
                            shortCode: e
                        }, function(a) {
                            return a && a.error && 429 == a.reason ? p ? f ? ++f < 2 ? void setTimeout(function() {
                                h(b, c, d, e, f)
                            }, 20 * f * 1e3) : (q = !0, c(), void j(d)) : void setTimeout(function() {
                                h(b, c, d, e)
                            }, 1e4) : (p = !0, f = 1, r.no_progress = !0, r.dont_panic = !0, o.updatePrepareZipProgressBarAndText(r), void setTimeout(function() {
                                h(b, c, d, e, f)
                            }, 2e4)) : a && !a.error && a.length ? (p && (p = !1, r.no_progress = !1, r.dont_panic = !1), a.forEach(function(a) {
                                n.push(a)
                            }), o.updatePrepareZipProgressBarAndText(r), void b(e)) : (d.push(e), void b(e))
                        })
                    }

                    function i(a) {
                        if (!d) return a;
                        var b = [];
                        if ("all" !== d.mediaType) {
                            if (a.forEach(function(a) {
                                    d.mediaType == a.type && b.push(a)
                                }), !b || !b.length) return {
                                error: "not_match"
                            }
                        } else b = a;
                        if (d.percent && d.percent < 100) {
                            d.most_liked ? e.objectSortByProp(b, "likes_count", !0) : "video" == d.mediaType && d.most_viewed ? e.objectSortByProp(b, "video_view_count", !0) : b = e.shuffle(b);
                            var c = Math.ceil(b.length * d.percent / 100);
                            b = b.splice(0, c)
                        }
                        return b
                    }

                    function j(b, c) {
                        c = c || 0, c++;
                        var d = 3;
                        if (c > d) {
                            var k = 0;
                            return b.forEach(function(a) {
                                var b = g.getCachedLinkByShortCode(a);
                                b && (n.push(b), k++)
                            }), b.length - k > 5 && b.length > l / 10 + k ? (a.trackEventWithRandom("error_download_zip", {
                                method: "prepareLinksByShortCodes",
                                type: "many tries",
                                rejectedCount: b.length,
                                allCount: l
                            }, .1), f({
                                error: 1
                            })) : void f(i(n))
                        }
                        if (q) return .9 * l > n.length ? (a.trackEventWithRandom("error_download_zip", {
                            method: "prepareLinksByShortCodes",
                            type: "429TooLong",
                            successCount: n.length,
                            allCount: l
                        }, .1), f({
                            error: 1
                        })) : void f(i(n));
                        var o = [];
                        e.customPromiseAll({
                            data: b,
                            asyncCount: 12 / c
                        }, function(a, b, c) {
                            h(b, c, o, a)
                        }).thenOne(function(a) {
                            return m.zipCanceledByUser ? f() : void(o.length ? setTimeout(function() {
                                j(o, c)
                            }, 3e3 * c) : f(i(n)))
                        }, function(a) {
                            return f()
                        })
                    }
                    if ("function" == typeof f) {
                        if (!Array.isArray(b) || !b.length) return f();
                        c = c || 0;
                        var k = (100 - c) / 100,
                            l = b.length,
                            m = this,
                            n = [],
                            o = g.getModalBox(),
                            p = !1,
                            q = !1,
                            r = {
                                allCount: l,
                                oneValuePercent: 100 / l * k
                            };
                        o.showPrepareDownloadProcess({
                            header: chrome.i18n.getMessage("prepare_zip_links"),
                            bar_start: c
                        }, {
                            cancelCallback: function() {
                                m.zipCanceledByUser = !0, a.sendMessage("downloadAllProcessFinished")
                            }
                        }), j(b)
                    }
                },
                downloadZIP: function(b, c, d, f) {
                    function h() {
                        k.zipCanceledByUser = !0, n.aborted = !0, j()
                    }

                    function i(a) {
                        if (k.zipCanceledByUser) return void(n.aborted = !0);
                        if ("undefined" == typeof o[a]) j();
                        else if (0 == o[a].length && o[a + 1] && o[a + 1].length) setTimeout(function() {
                            i(a + 1)
                        }, 1e3 * (a + 1));
                        else if (0 != o[a].length || o[a + 1] && o[a + 1].length)
                            if (o[a].length) {
                                var b = o[a].shift();
                                JSZipUtils.getBinaryContent(b.url, function(c, d) {
                                    c ? o[a + 1] && o[a + 1].push(b) : (q.rejectedCount--, q.successCount++, q.retrySuccessCount++, q.lastSuccess = !0, m.updateDownloadZipProgressBar(q), l.file(b.filename, d, {
                                        binary: !0
                                    })), setTimeout(function() {
                                        i(a)
                                    }, 1e3 * a)
                                }, n, s)
                            } else j();
                        else j()
                    }

                    function j() {
                        f || a.sendMessage("downloadAllProcessFinished"), l.generateAsync({
                            type: "blob"
                        }).then(function(b) {
                            var e = new Date,
                                f = c + "_" + e.getFullYear() + "_" + (e.getMonth() + 1) + "_" + e.getDate() + "_" + e.getHours() + "_" + e.getMinutes() + "_" + e.getSeconds() + ".zip";
                            saveAs(b, f), m.close(), "function" == typeof d && d({
                                success: 1
                            }), a.sendMessage({
                                action: "downloadZip",
                                count: p,
                                successCount: q.successCount
                            })
                        })
                    }
                    var k = this,
                        l = new JSZip;
                    c = c || "Instagram";
                    var m = g.getModalBox(),
                        n = {
                            aborted: !1
                        },
                        o = [null, [],
                            [],
                            []
                        ],
                        p = b.length,
                        q = {
                            allCount: p,
                            successCount: 0,
                            rejectedCount: 0,
                            retrySuccessCount: 0,
                            retryRequestsCount: void 0,
                            oneValuePercent: 100 / p,
                            lastSuccess: !1
                        },
                        r = 6e4,
                        s = 3e5,
                        t = {
                            enoughCallback: h
                        };
                    f ? t.cancelCallback = function() {
                        k.zipCanceledByUser = !0, n.aborted = !0
                    } : t.cancelCallback = function() {
                        k.zipCanceledByUser = !0, n.aborted = !0, a.sendMessage("downloadAllProcessFinished")
                    }, m.showDownloadProcess(p, t), e.customPromiseAll({
                        data: b,
                        asyncCount: 12
                    }, function(a, b, c) {
                        return k.zipCanceledByUser ? (n.aborted = !0, c()) : void JSZipUtils.getBinaryContent(a.url, function(c, d) {
                            c ? (q.rejectedCount++, o[1].push(a), b(a.filename)) : (q.successCount++, q.lastSuccess = !0, m.updateDownloadZipProgressBar(q), l.file(a.filename, d, {
                                binary: !0
                            }), b(a.filename))
                        }, n, r)
                    }).thenOne(function(a) {
                        k.zipCanceledByUser || (o[1].length ? (q.retryRequestsCount = o[1].length, q.text = chrome.i18n.getMessage("retry_requests"), q.lastSuccess = !1, m.updateDownloadZipProgressBar(q), setTimeout(function() {
                            i(1)
                        }, 1e3)) : j())
                    }, function(b) {
                        f || a.sendMessage("downloadAllProcessFinished"), k.zipCanceledByUser || (m.showErrorBox(chrome.i18n.getMessage("errorZip")), "function" == typeof d && d({
                            error: 1
                        }), a.trackEventWithRandom("error_download_zip", {
                            count: p,
                            successCount: q.successCount
                        }, .1))
                    })
                }
            }
        }(),
        e = function() {
            return {
                bridge: function(a) {
                    "use strict";
                    a.args = a.args || [], void 0 === a.timeout && (a.timeout = 300);
                    var b = "ext-bridge-" + parseInt(1e3 * Math.random()) + "-" + Date.now(),
                        c = function(d) {
                            window.removeEventListener("ext-bridge-" + b, c);
                            var e;
                            e = d.detail ? JSON.parse(d.detail) : void 0, a.cb(e)
                        };
                    window.addEventListener("ext-bridge-" + b, c);
                    var d = "(" + function(a, b, c, d) {
                            var e = document.getElementById(c);
                            e && e.parentNode.removeChild(e);
                            var f = !1,
                                g = function(a) {
                                    if (!f) {
                                        f = !0;
                                        var b = new CustomEvent("ext-bridge-" + c, {
                                            detail: JSON.stringify(a)
                                        });
                                        window.dispatchEvent(b)
                                    }
                                };
                            d && setTimeout(function() {
                                g()
                            }, d), b.push(g), a.apply(null, b)
                        }.toString() + ")(" + [a.func.toString(), JSON.stringify(a.args), JSON.stringify(b), parseInt(a.timeout)].join(",") + ");",
                        e = document.createElement("script");
                    e.id = b, e.innerText = d, document.querySelector("body").appendChild(e)
                },
                objectSortByProp: function(a, b, c) {
                    function d(a, d) {
                        var e = parseInt(a[b]),
                            f = parseInt(d[b]);
                        return c ? f > e ? 1 : e > f ? -1 : 0 : e > f ? 1 : f > e ? -1 : 0
                    }
                    a.sort(d)
                },
                shuffle: function(a) {
                    var b, c, d;
                    for (d = a.length - 1; d > 0; d--) b = Math.floor(Math.random() * (d + 1)), c = a[d], a[d] = a[b], a[b] = c;
                    return a
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
                isMainPage: function() {
                    return "/" == window.location.pathname && "instagram.com" == window.location.host.replace(/^w{3}\./, "") && null == document.querySelector('input[type="password"]')
                },
                getHostName: function() {
                    return window.location.host.toLowerCase().replace(/^www\./, "").replace(/:.*$/, "")
                },
                isNativeStories: function() {
                    return /instagram.com\/stories\/\w+/.test(window.location.href)
                },
                isLoginPage: function() {
                    return null != document.querySelector('input[type="password"]')
                },
                isAccountSettingPage: function() {
                    return window.location.pathname.indexOf("instagram.com/emails/") > -1 || window.location.pathname.indexOf("instagram.com/accounts/") > -1
                },
                isMultiplePost: function(a) {
                    return null != a.querySelector(".coreSpriteRightChevron") || null != a.querySelector(".coreSpriteLeftChevron") || null != a.querySelector(".coreSpriteSidecarIconLarge") || null != a.querySelector('a.MpBh3[role="button"]') || null != a.querySelector('a.SWk3c[role="button"]') || null != a.querySelector("span.Z4Ol1.Szr5J.o0qq2") || null != a.querySelector(".mediatypesSpriteCarousel__filled__32")
                },
                isSavedMedia: function() {
                    return -1 !== window.location.pathname.indexOf("/saved/")
                },
                isWindows: function() {
                    return window.navigator.userAgent.toLowerCase().indexOf("windows") > -1
                },
                isUsualDesktopInstagram: function() {
                    return (document.querySelector(".coreSpriteMobileNavSearchInactive") || document.querySelector(".coreSpriteMobileNavSearchActive")) && (document.querySelector(".coreSpriteFeedCreation") || document.querySelector(".coreSpriteMobileNavSearchActive")) ? !1 : !0
                },
                isFrame: function() {
                    return window.top != window.self
                }
            }
        }(),
        f = function() {
            function b(a, b) {
                if (a.files && a.files[0]) {
                    var c = new FileReader;
                    c.onload = b, c.readAsDataURL(a.files[0])
                }
            }

            function c(a) {
                if (!a) return !1;
                if (a.querySelector(".ext_upload_icon")) return !1;
                var b = document.querySelector("section main section");
                return !(!b || !b.querySelector('a[href="/accounts/edit/"]'))
            }
            return {
                stepNow: null,
                delButtonTemplate: null,
                delBtnClassName: "ext_del_btn",
                uploadType: void 0,
                uploadId: void 0,
                size: null,
                confirmedUsertags: [],
                uploadStateInit: function(a) {
                    c(a) && (this.uploadBtn.create(a), this.form.create())
                },
                stateReset: function() {
                    this.uploadType = void 0, this.uploadId = void 0, this.stepNow = null, this.size = null, this.form.reset(), this.uploadPreviewBlock.destroySelf(), this.uploadBtn.enable(), this.uploadPreviewBlock.tagPeople.usertags = [], this.uploadPreviewBlock.tagPeople.listenersAdded = !1, this.uploadPreviewBlock.tagPeople.usersList.suggestedUsers = null, this.confirmedUsertags = []
                },
                uploadBtn: {
                    arrowEl: null,
                    uploadBtnEl: null,
                    disabled: !1,
                    create: function(a) {
                        if (a) {
                            var b = this,
                                c = document.createElement("div");
                            c.className = "upload_btn_wrap";
                            var d = document.createElement("button");
                            d.className = "ext_upload_icon";
                            var e = document.createElement("span");
                            if (e.className = "ext_tooltip upload", e.innerText = chrome.i18n.getMessage("upload_file"), c.appendChild(e), c.appendChild(d), a.appendChild(c), b.uploadBtnEl = d, window.location.href.indexOf("#upload") > -1) {
                                var f = document.createElement("span");
                                f.className = "upload_help_arrow", c.appendChild(f), b.arrowEl = f, b.arrowAnimate()
                            }
                            d.addEventListener("click", b.uploadBtnOnClick.bind(b)), b.enable()
                        }
                    },
                    uploadBtnOnClick: function() {
                        var a = this;
                        if (!this.disabled) {
                            a.arrowEl && (a.arrowEl.style.display = "none");
                            var b = g.getModalBox();
                            b.showUploadChoice({
                                toProfileCallback: function() {
                                    f.uploadType = "profile", f.form.inputDispatchClick()
                                },
                                toStoriesCallback: function() {
                                    f.uploadType = "story", f.form.inputDispatchClick()
                                }
                            })
                        }
                    },
                    arrowAnimate: function() {
                        if (this.arrowEl) {
                            var a = this;
                            setTimeout(function() {
                                a.arrowEl.style.transition = "none";
                                var b = 700;
                                $(a.arrowEl).animate({
                                    opacity: 1
                                }, 200).animate({
                                    right: "-80px"
                                }, b).animate({
                                    right: "-120px"
                                }, b).animate({
                                    right: "-80px"
                                }, b).animate({
                                    right: "-120px"
                                }, b).animate({
                                    right: "-80px"
                                }, b).animate({
                                    right: "-120px"
                                }, b).animate({
                                    right: "-80px",
                                    opacity: 0
                                }, b, function() {
                                    a.arrowEl.style.display = "none"
                                })
                            }, 200)
                        }
                    },
                    enable: function() {
                        this.uploadBtnEl.classList.remove("disabled"), this.disabled = !1
                    },
                    disable: function() {
                        this.uploadBtnEl.classList.add("disabled"), this.disabled = !0
                    }
                },
                form: {
                    formEl: null,
                    inputEl: null,
                    create: function() {
                        var a = document.createElement("form"),
                            b = document.createElement("input");
                        a.id = "ext_upload_form", a.setAttribute("enctype", "multipart/form-data"), b.id = "ext_upload_input", b.setAttribute("type", "file"), b.setAttribute("name", "photo"), b.setAttribute("accept", "image/jpeg"), a.appendChild(b), document.querySelector("body").appendChild(a), b.addEventListener("change", this.onInputChange), this.formEl = a, this.inputEl = b
                    },
                    reset: function() {
                        this.formEl && this.formEl.reset()
                    },
                    inputDispatchClick: function() {
                        this.inputEl && this.inputEl && this.inputEl.click()
                    },
                    onInputChange: function() {
                        b(this, function(a) {
                            var b = a.target.result;
                            f.uploadPreviewBlock.create(b)
                        })
                    }
                },
                uploadRequest: {
                    factory: function(a, b, c) {
                        var d = this;
                        "photo" == a ? d.sendPhoto(b, function(a) {
                            a.error ? (d.handleBadResponse(a), f.stateReset()) : (f.uploadId = a.upload_id, "profile" == f.uploadType ? "function" == typeof c && c() : d.configurePhoto({
                                caption: "",
                                uploadId: f.uploadId,
                                uploadType: f.uploadType
                            }, function(a) {
                                if (a.error) d.handleBadResponse(a), f.stateReset();
                                else {
                                    var b = g.getModalBox();
                                    b.showUploadedStorySuccessText({
                                        successUploadedStoryCallback: function() {
                                            window.location = window.location.origin + window.location.pathname
                                        }
                                    }), f.stateReset()
                                }
                            }))
                        }) : "caption" == a && d.configurePhoto({
                            caption: b,
                            uploadId: f.uploadId,
                            uploadType: f.uploadType,
                            usertags: f.confirmedUsertags
                        }, function(a) {
                            a.error ? (d.handleBadResponse(a), f.stateReset()) : window.location = window.location.origin + window.location.pathname
                        })
                    },
                    sendPhoto: function(b, c) {
                        a.sendMessage("getCookies", function(a) {
                            if (a) {
                                var d = f.size && f.size.width || 1080,
                                    e = f.size && f.size.height || 1080,
                                    g = (new Date).getTime(),
                                    h = "https://www.instagram.com/rupload_igphoto/fb_uploader_" + g,
                                    i = new XMLHttpRequest;
                                i.open("POST", h, !0), i.setRequestHeader("x-csrftoken", a.csrftoken), i.setRequestHeader("x-entity-length", b.size), i.setRequestHeader("x-entity-name", "fb_uploader_" + g), i.setRequestHeader("x-ig-app-id", "1217981644879628"), i.setRequestHeader("x-instagram-rupload-params", JSON.stringify({
                                    media_type: 1,
                                    upload_id: g,
                                    upload_media_height: e,
                                    upload_media_width: d
                                })), i.setRequestHeader("offset", 0), i.onload = function() {
                                    try {
                                        var a = JSON.parse(this.responseText)
                                    } catch (b) {
                                        return c({
                                            error: 1,
                                            status: 200
                                        })
                                    }
                                    c(a)
                                }, i.send(b)
                            }
                        })
                    },
                    configurePhoto: function(b, c) {
                        var d = b.caption,
                            e = b.uploadId,
                            f = b.uploadType,
                            g = b.usertags;
                        a.sendMessage("getCookies", function(b) {
                            if (!b || !b.sessionid) return c({
                                error: 1
                            });
                            var h = {
                                upload_id: e,
                                caption: d
                            };
                            g && (h.usertags = JSON.stringify({
                                "in": g
                            }));
                            var i = "https://www.instagram.com/create/" + ("profile" == f ? "configure/" : "configure_to_story/");
                            $.ajax({
                                url: i,
                                method: "POST",
                                data: h,
                                headers: {
                                    "x-csrftoken": b.csrftoken,
                                    "x-ig-app-id": "1217981644879628"
                                }
                            }).done(function(b) {
                                if (!b || "object" != typeof b || "ok" != b.status) {
                                    c({
                                        error: 1,
                                        res: b,
                                        status: 200
                                    });
                                    var d = JSON.stringify(b);
                                    return d = d && d.substr(0, 500), void a.sendMessage("getInstalledExtensions", function(b) {
                                        a.trackEventWithRandom("unknown_response_configure", {
                                            res: d,
                                            extIds: b
                                        }, .05)
                                    })
                                }
                                c({
                                    success: 1
                                })
                            }).fail(function(b) {
                                c({
                                    error: 1,
                                    res: b.responseJSON,
                                    status: b.status
                                });
                                var f = JSON.stringify(b.responseJSON);
                                f = f || b.responseText, f = f && f.substr(0, 500), a.sendMessage("getInstalledExtensions", function(c) {
                                    a.trackEventWithRandom("fail_configure_photo", {
                                        codeResponse: b.status,
                                        url: i,
                                        postData: {
                                            upload_id: e,
                                            caption: d.substr(0, 800)
                                        },
                                        res: f,
                                        extIds: c.substr(0, 330)
                                    }, .05)
                                })
                            })
                        })
                    },
                    handleBadResponse: function(a) {
                        var b, c = chrome.i18n.getMessage("upload_error"),
                            d = chrome.i18n.getMessage("error403_possible_reasons"),
                            e = chrome.i18n.getMessage("error403_reason_1"),
                            f = chrome.i18n.getMessage("error403_reason_2"),
                            h = chrome.i18n.getMessage("error_network"),
                            i = chrome.i18n.getMessage("check_network"),
                            j = chrome.i18n.getMessage("error_reason_xz");
                        b = "403" == a.status ? '<h3 style="margin-bottom:15px;font-weight:600;">' + c + '</h3><p style="margin-bottom:10px;">' + d + ':</p><ol style="text-align: justify; list-style: decimal;padding: 10px;margin-left: 10px;font-size: 0.8em;"><li style="margin-bottom:15px">' + e + '</li><li style="margin-bottom:15px">' + f + "</li></ol>" : "0" == a.status && "undefined" == typeof a.res ? '<h3 style="margin-bottom: 15px;font-weight: 600;">' + h + "</h3><p>" + i + "</p>" : '<h3 style="margin-bottom: 15px;font-weight: 600;">' + c + "</h3><p>" + j + "</p>";
                        var k = g.getModalBox();
                        k.showErrorBox(b)
                    }
                },
                uploadPreviewBlock: {
                    btnNextLastClickTime: 0,
                    croppieObj: null,
                    imgSrc: null,
                    width: null,
                    height: null,
                    currentTransformation: null,
                    currentSize: {},
                    currentRotate: 0,
                    container: null,
                    create: function(b) {
                        try {
                            var c = this,
                                d = document.querySelector("section > main > div");
                            if (!d) {
                                if (!document.querySelector(".coreSpriteFeedCreation") && Math.random() < .001) {
                                    var e = document.querySelector("#react-root");
                                    e ? a.trackEventPost("no_container_for_upload_preview", location.href, e.innerHTML) : a.trackEventPost("no_container_for_upload_preview_no_react_root", location.href, document.body && document.body.innerHTML)
                                }
                                return
                            }
                            var g = f.uploadType,
                                h = document.createElement("div");
                            h.className = "upload_preview_wrap", c.container = h;
                            var i = chrome.i18n.getMessage("write_caption"),
                                j = chrome.i18n.getMessage("next"),
                                k = chrome.i18n.getMessage("new_post"),
                                l = chrome.i18n.getMessage("new_story"),
                                m = chrome.i18n.getMessage("btn_cancel"),
                                n = '<div class="upload_preview_header"><button class="cancel">' + m + '</button><span class="text">' + k + '</span><button class="next">' + j + '</button></div><div class="upload_content"><textarea id="ext_post_textarea" maxlength="2000" placeholder="' + i + '"></textarea><div class="tag_people_btn_wrap"><button class="tag_people_btn"><span class="tag_people_btn_text"></span><span class="coreSpriteNotificationRightChevron"></span></button></div><div class="tag_people_header"><button class="ext_tag_people_close"><span class="coreSpriteClose"></span></button><span class="tag_people_header_text"></span><button class="tag_people_confirm_btn"></button></div><div class="upload_preview_img"><div class="rotate_btn"></div><div class="expand_btn"></div></div><div class="uploaded_image_preview"></div><div class="tag_people_msg"><div></div></div><img id="img_hidden"></div>',
                                o = '<div class="upload_preview_header"><button class="cancel">' + m + '</button><span class="text">' + l + '</span><button class="next">' + j + '</button></div><div class="upload_content"><div class="upload_preview_img"><div class="rotate_btn"></div></div><div class="uploaded_image_preview"></div><img id="img_hidden"></div>';
                            h.innerHTML = "profile" == g ? n : o;
                            var p = d.querySelector("header + div");
                            if (p || (p = d.querySelector("header + article")), p) d.insertBefore(h, p);
                            else {
                                var q = [];
                                d.children.forEach(function(a) {
                                    q.push(a.tagName + "_" + a.className)
                                }), a.trackEventWithRandom("no_after_header_el_at_user_page", {
                                    url: window.location.href,
                                    children: q
                                }, .05), d.appendChild(h)
                            }
                            var r = h.querySelector(".cancel"),
                                s = h.querySelector(".next"),
                                t = h.querySelector(".expand_btn"),
                                u = h.querySelector(".rotate_btn"),
                                v = h.querySelector(".upload_preview_img"),
                                w = h.querySelector("#img_hidden");
                            c.imgDiv = v, r.addEventListener("click", c.onCancelBtnClick), s.addEventListener("click", c.onFirstNextClick.bind(c)), this.imgSrc = b, w.onload = function() {
                                v.style.display = "block", c.width = w.naturalWidth, c.height = w.naturalHeight, "profile" == g ? (c.width != c.height ? t.style.display = "block" : t.style.display = "none", t.addEventListener("click", c.resizeImage.bind(c)), u.addEventListener("click", c.rotateImage.bind(c)), c.squareTransformation()) : (u.addEventListener("click", c.rotateImage.bind(c)), c.rectangleStoryTransformation()), h.style.display = "flex"
                            }, w.src = b
                        } catch (x) {
                            a.trackCodeError(x, "uploadPreviewBlock_create")
                        }
                    },
                    onCancelBtnClick: function() {
                        f.stateReset()
                    },
                    destroySelf: function() {
                        var a = document.querySelector(".upload_preview_wrap");
                        a && a.remove()
                    },
                    createCroppieObj: function(a, b, c) {
                        var d = document.querySelector(".upload_preview_img"),
                            e = this;
                        e.croppieObj = new Croppie(d, {
                            viewport: a,
                            boundary: {
                                width: 400,
                                height: 400
                            },
                            enableZoom: !0,
                            enableOrientation: !0,
                            showZoomer: !1,
                            update: function(a) {
                                e.currentSize.width = a.points[2] - a.points[0], e.currentSize.height = a.points[3] - a.points[1]
                            }
                        });
                        var f = {
                            url: e.imgSrc,
                            points: b
                        };
                        c && (f.orientation = 6), e.croppieObj.bind(f)
                    },
                    destroyCroppieObj: function() {
                        this.croppieObj && (this.croppieObj.destroy(), this.croppieObj = null)
                    },
                    squareTransformation: function() {
                        try {
                            var b = this;
                            this.destroyCroppieObj();
                            var c = b.width,
                                d = b.height;
                            b.currentTransformation = "square";
                            var e, f, g, h;
                            c == d ? (e = 0, f = 0, g = c, h = d) : c > d ? (f = 0, h = d, e = c / 2 - d / 2, g = e + d) : (e = 0, g = c, f = d / 2 - c / 2, h = f + c);
                            var i = [e, f, g, h];
                            b.createCroppieObj({
                                width: 350,
                                height: 350
                            }, i)
                        } catch (j) {
                            a.trackCodeError(j, "squareTransformation")
                        }
                    },
                    rectangleTransformation: function() {
                        try {
                            var b = this;
                            b.destroyCroppieObj(), b.currentTransformation = "rectangle";
                            var c, d, e, f, g, h, i, j = b.width,
                                k = b.height,
                                l = .8,
                                m = 1.911,
                                n = j / k,
                                o = {};
                            j > k ? m >= n ? (d = 0, f = k, c = 0, e = j, o.width = 350, o.height = 350 / n) : (d = 0, f = k, h = k * m, g = j / 2, c = g - h / 2, e = c + h, o.width = 350, o.height = 350 / m) : n >= l ? (d = 0, f = k, c = 0, e = j, o.height = 350, o.width = 350 * n) : (i = j / l, g = k / 2, d = g - i / 2, f = d + i, c = 0, e = j, o.width = 350 * l, o.height = 350);
                            var p = [c, d, e, f];
                            b.createCroppieObj(o, p)
                        } catch (q) {
                            a.trackCodeError(q, "rectangleTransformation")
                        }
                    },
                    rectangleStoryTransformation: function() {
                        try {
                            var b = this;
                            b.destroyCroppieObj(), b.currentTransformation = "rectangle_vertical";
                            var c = b.width,
                                d = b.height,
                                e = !1;
                            c > d && (e = !0, b.width = d, b.height = c, c = b.width, d = b.height);
                            var f, g, h, i, j, k, l, m = d / c,
                                n = 1.77,
                                o = 1.78,
                                p = {
                                    height: 350,
                                    width: 350 / m
                                };
                            g = 0, f = 0, i = d, h = c, m >= o && (l = c * o, j = d / 2, g = j - l / 2, i = g + l, p.width = 350 / o), n >= m && (k = d / n, j = c / 2, f = j - k / 2, h = f + k, p.width = 350 / n);
                            var q = [f, g, h, i];
                            b.createCroppieObj(p, q, e)
                        } catch (r) {
                            a.trackCodeError(r, "rectangleStoryTransformation")
                        }
                    },
                    resizeImage: function() {
                        "square" == this.currentTransformation ? this.rectangleTransformation() : this.squareTransformation()
                    },
                    rotateImage: function() {
                        this.croppieObj ? this.croppieObj.rotate(90) : a.trackEvent("no_croppieObj_in_rotateImage_func")
                    },
                    getOptimalSize: function() {
                        try {
                            var b = this.currentSize;
                            if (!b.width || !b.height) return null;
                            var c;
                            if ("profile" == f.uploadType) {
                                var d = 1080,
                                    e = 1080,
                                    g = +(b.height > b.width);
                                return g ? (c = b.height / d, {
                                    height: d,
                                    width: Math.floor(b.width / c)
                                }) : (c = b.width / e, {
                                    width: e,
                                    height: Math.floor(b.height / c)
                                })
                            }
                            var h = 1080;
                            return c = b.width / h, {
                                width: h,
                                height: Math.floor(b.height / c)
                            }
                        } catch (i) {
                            a.trackCodeError(i, "getOptimalSize")
                        }
                    },
                    getBlobPreview: function(a) {
                        this.croppieObj || a();
                        var b = this.getOptimalSize(),
                            c = {
                                type: "blob",
                                format: "jpeg",
                                size: "original"
                            };
                        b && (c.size = b), this.croppieObj.result(c).then(a)
                    },
                    showLoader: function(b) {
                        return b ? (b.innerText = "", void b.classList.add("loader")) : void a.trackEvent("no_btnNext_in_showLoader")
                    },
                    hideLoader: function(b) {
                        return b ? (b.innerText = chrome.i18n.getMessage("next"), void b.classList.remove("loader")) : void a.trackEvent("no_btnNext_in_showLoader")
                    },
                    showUploadedImage: function(a) {
                        var b = document.querySelector(".uploaded_image_preview"),
                            c = document.querySelector(".upload_preview_img");
                        if (b && c) {
                            c.style.display = "none";
                            var d = new FileReader;
                            d.readAsDataURL(a), d.onload = function() {
                                var a = d.result;
                                b.style.backgroundImage = "url(" + a + ")", b.style.display = "block"
                            }
                        }
                    },
                    showTextarea: function() {
                        var a = this.container && this.container.querySelector("textarea");
                        a && (a.removeAttribute("disabled"), a.innerText = "", a.style.display = "block")
                    },
                    showTagPeopleBtn: function() {
                        var a = document.querySelector(".tag_people_btn_wrap"),
                            b = a.querySelector(".tag_people_btn");
                        b.querySelector(".tag_people_btn_text").innerText = chrome.i18n.getMessage("tag_people"), b.addEventListener("click", this.tagPeople.init.bind(this.tagPeople)), a.style.display = "flex"
                    },
                    tagPeople: {
                        usertags: [],
                        listenersAdded: !1,
                        opened: !1,
                        init: function() {
                            this.showTagPeoplePanel(), this.listenersAdded || this.addListeners(), this.opened = !0
                        },
                        addListeners: function() {
                            var a = this,
                                b = $(".uploaded_image_preview");
                            b.on("click", function(b) {
                                a.previewImageClick(b, this)
                            }), b.on("click", ".ext_user_tag_wrap", this.tagLabelClick), b.on("click", "#ext_deleteButton", this.removeTagClick), document.querySelector(".ext_tag_people_close").addEventListener("click", function() {
                                a.usertags.forEach(function(a) {
                                    $('[data-user_pk="' + a.user_id + '"]').remove()
                                }), a.close()
                            }), document.querySelector(".tag_people_confirm_btn").addEventListener("click", this.tagPeopleConfirm.bind(this)), this.listenersAdded = !0
                        },
                        previewImageClick: function(a, b) {
                            if (this.opened) {
                                var c = [a.offsetX / b.offsetWidth, a.offsetY / b.offsetHeight];
                                this.usersList.showBox(c)
                            }
                        },
                        tagLabelClick: function(a) {
                            var b = f.uploadPreviewBlock.tagPeople;
                            if (b.opened) {
                                a.stopPropagation(), a.preventDefault();
                                var c = this.querySelector("#ext_deleteButton");
                                c ? c.remove() : $(this.querySelector("button")).append(b.getDeleteBtn())
                            }
                        },
                        removeTagClick: function(a) {
                            a.stopPropagation(), a.preventDefault();
                            for (var b = f.uploadPreviewBlock.tagPeople, c = $(this).closest(".ext_user_tag_wrap"), d = c.data().user_pk, e = 0; e < b.usertags.length; e++)
                                if (b.usertags[e].user_id == d) {
                                    b.usertags.splice(e, 1);
                                    break
                                } c.remove()
                        },
                        showTagPeoplePanel: function() {
                            document.querySelector(".tag_people_btn_wrap").style.display = "none", document.querySelector(".upload_preview_header").style.display = "none", document.querySelector(".upload_content textarea").style.display = "none";
                            var a = document.querySelector(".tag_people_header");
                            a.querySelector(".tag_people_header_text").innerText = chrome.i18n.getMessage("tag_people"), a.style.display = "flex";
                            var b = a.querySelector(".tag_people_confirm_btn");
                            b.innerText = chrome.i18n.getMessage("tag_people_confirm");
                            var c = document.querySelector(".tag_people_msg");
                            c.querySelector("div").innerText = chrome.i18n.getMessage("tag_people_msg"), c.style.display = "flex"
                        },
                        close: function() {
                            $(".tag_people_header").hide(), $(".upload_preview_header").show(), $(".tag_people_btn_wrap").show(), $(".upload_content textarea").show(), this.usertags = [], this.opened = !1
                        },
                        tagPeopleConfirm: function(a) {
                            f.confirmedUsertags = f.confirmedUsertags.concat(this.usertags), this.close()
                        },
                        createUserTag: function(a) {
                            return $('<div class="ext_user_tag_wrap" data-user_pk="' + a.user_pk + '" style="left:' + a.left + "%;top: " + a.top + '%"><button><div class="ext_tag_tip"></div><span class="ext_tag_name">' + a.username + "</span></button></div>")
                        },
                        getDeleteBtn: function() {
                            return $('<span id="ext_deleteButton" class="coreSpriteSearchClear"></span>')
                        },
                        usersList: {
                            suggestedUsers: null,
                            showBox: function(a) {
                                var b = this,
                                    c = f.uploadPreviewBlock.tagPeople,
                                    d = g.getModalBox();
                                d.showUsersListSearch();
                                var e = $(".ext_users_search_list");
                                e.addClass("ext_loader"), e.on("click", ".ext_users_search_item", function(b) {
                                    d.close();
                                    for (var e = 0; e < c.usertags.length; e++)
                                        if (c.usertags[e].user_id == this.dataset.user_pk) {
                                            c.usertags.splice(e, 1), $('[data-user_pk="' + this.dataset.user_pk + '"]').remove();
                                            break
                                        } c.usertags.push({
                                        user_id: this.dataset.user_pk,
                                        position: a
                                    }), $(".uploaded_image_preview").append(c.createUserTag({
                                        left: 100 * a[0],
                                        top: 100 * a[1],
                                        username: this.dataset.username,
                                        user_pk: this.dataset.user_pk
                                    }))
                                }), this.createSearchInputBlock(), this.requestSuggested({}, function(a) {
                                    a.error || !a.edges, b.renderUsersList(a.edges, e)
                                })
                            },
                            requestSuggested: function(a, b) {
                                var c = this;
                                if (c.suggestedUsers) return b({
                                    edges: c.suggestedUsers
                                });
                                var d = "7616ef507122e253e5c7806f7976f05c",
                                    e = "https://www.instagram.com/graphql/query/?query_hash=" + d + "&variables=" + encodeURIComponent("{}");
                                $.ajax({
                                    url: e,
                                    method: "GET"
                                }).done(function(a) {
                                    if (!a || !a.data) return b({
                                        error: 1
                                    });
                                    var d = [];
                                    try {
                                        d = a.data.user.null_state.edge_suggested.edges, c.suggestedUsers = d
                                    } catch (e) {
                                        return b({
                                            error: 1
                                        })
                                    }
                                    b({
                                        edges: d
                                    })
                                }).fail(function() {
                                    b({
                                        error: 1
                                    })
                                })
                            },
                            requestTopSearch: function(a, b) {
                                var c = encodeURIComponent(a.query),
                                    d = "https://www.instagram.com/web/search/topsearch/?context=user&query=" + c + "&rank_token=" + Math.random() + "&include_reel=true";
                                $.get(d).done(function(a) {
                                    return a && a.users && a.users.length ? void b({
                                        users: a.users
                                    }) : b({
                                        error: 1
                                    })
                                }).fail(function() {
                                    b({
                                        error: 1
                                    })
                                })
                            },
                            renderUsersList: function(a, b) {
                                if (b.removeClass("ext_loader"), a && a.length && b.length) try {
                                    for (var c = 0; c < a.length; c++) {
                                        if (a[c].node && a[c].node.user) var d = this.createSearchDOMitem(a[c].node.user);
                                        else {
                                            if (!a[c].user) return;
                                            d = this.createSearchDOMitem(a[c].user)
                                        }
                                        b.append(d)
                                    }
                                } catch (e) {}
                            },
                            createSearchInputBlock: function() {
                                var a = this,
                                    b = document.querySelector(".ext_users_search_wrap"),
                                    c = chrome.i18n.getMessage("enter_search_query");
                                b.innerHTML = '<label class="ext_users_search_label"><input autocapitalize="none" autocomplete="off" class="ext_users_search_input" placeholder="" type="search" value=""><div class="ext_users_search_input_placeholder"><div class="ext_users_search_input_placeholder_icon_wrap"><span class="glyphsSpriteSearch" aria-label="' + c + '"></span></div><span class="ext_users_search_input_placeholder_text">' + c + '</span></div><div class="ext_users_search_input_placeholder_lock"></div></label>';
                                var d = null,
                                    e = $(".ext_users_search_list");
                                b.querySelector(".ext_users_search_input").addEventListener("input", function(c) {
                                    var f = this;
                                    f.value.length > 0 ? b.querySelector(".ext_users_search_input_placeholder").style.opacity = "0" : b.querySelector(".ext_users_search_input_placeholder").style.opacity = "1", d && clearTimeout(d), d = setTimeout(function() {
                                        d = null, e.html("").addClass("ext_loader"), f.value.length > 0 ? a.onSearchEnter(f.value, e) : a.renderUsersList(a.suggestedUsers, e)
                                    }, 300)
                                })
                            },
                            createSearchDOMitem: function(a) {
                                var b = document.createElement("div");
                                return b.dataset.user_pk = a.pk, b.dataset.username = a.username, b.className = "ext_users_search_item", b.innerHTML = '<span class="ext_user_icon"><img src="' + a.profile_pic_url + '"></span><div class="ext_user_data"><div class="ext_username"><span>' + a.username + "</span>" + (a.is_verified ? '<div class="coreSpriteVerifiedBadgeSmall"></div>' : "") + '</div><div class="ext_userfullname">' + a.full_name + "</div></div>", b
                            },
                            onSearchEnter: function(a, b) {
                                var c = this;
                                c.requestTopSearch({
                                    query: a
                                }, function(a) {
                                    a && a.users && c.renderUsersList(a.users, b)
                                })
                            }
                        }
                    },
                    addNewNextBtn: function() {
                        try {
                            var b = this.container && this.container.querySelector(".upload_preview_header");
                            if (!b) return;
                            var c = b.querySelector(".next");
                            c.remove();
                            var d = document.createElement("button");
                            d.className = "next", d.innerText = chrome.i18n.getMessage("next"), b.appendChild(d), d.addEventListener("click", this.onSecondNextClick.bind(this))
                        } catch (e) {
                            a.trackCodeError(e, "addNewNextBtn")
                        }
                    },
                    onFirstNextClick: function() {
                        try {
                            var b = Date.now();
                            if (b < this.btnNextLastClickTime + 500) return;
                            var c = document.querySelector(".next");
                            this.btnNextLastClickTime = b, this.showLoader(c);
                            var d = this;
                            this.getBlobPreview(function(b) {
                                f.uploadRequest.factory("photo", b, function(c) {
                                    try {
                                        d.addNewNextBtn(), d.showUploadedImage(b), d.showTextarea(), d.showTagPeopleBtn()
                                    } catch (e) {
                                        e.additional_info = "uploadType=" + f.uploadType, a.trackCodeError(e, "onFirstNextClick_2")
                                    }
                                })
                            })
                        } catch (e) {
                            a.trackCodeError(e, "onFirstNextClick")
                        }
                    },
                    onSecondNextClick: function() {
                        try {
                            var b = Date.now();
                            if (b < this.btnNextLastClickTime + 500) return;
                            var c = document.querySelector(".next"),
                                d = document.querySelector("#ext_post_textarea");
                            this.btnNextLastClickTime = b, this.showLoader(c), d.setAttribute("disabled", "disabled");
                            var e = d.value;
                            f.uploadRequest.factory("caption", e)
                        } catch (g) {
                            a.trackCodeError(g, "onSecondNextClick")
                        }
                    }
                },
                addDeleteBtnToThumbnail: function(a) {
                    if (!a.querySelector(".coreSpriteSidecarIconLarge") && !a.querySelector(".coreSpriteVideoIconLarge")) {
                        var b = g.getShortCode(a);
                        if (b) {
                            var c = this.getDelBtnEl(b);
                            a.appendChild(c), a.dataset.dlBtnSkip = "1"
                        }
                    }
                },
                deleteMedia: function(b) {
                    return function(c) {
                        function d() {
                            c || (c = g.getModalBox()), e || (e = c.querySelector(".ext_modal_buttons_wrap")), e.style.display = "none", f || (f = document.createElement("span"), f.className = "ext_delete_loader", e.parentNode.appendChild(f)), f.style.display = "block"
                        }
                        var e, f, h = chrome.i18n.getMessage("delete_error"),
                            i = chrome.i18n.getMessage("error403_possible_reasons"),
                            j = chrome.i18n.getMessage("error403_reason_1"),
                            k = chrome.i18n.getMessage("error403_reason_2"),
                            l = chrome.i18n.getMessage("error_network"),
                            m = chrome.i18n.getMessage("check_network"),
                            n = chrome.i18n.getMessage("error_reason_xz"),
                            o = '<h3 style="margin-bottom: 15px;font-weight: 600;">' + h + "</h3><p>" + n + "</p>";
                        d(), a.requestJSONgraphqlByShortCode({
                            shortCode: b
                        }, function(d) {
                            if (!d || d.error) {
                                var e = o;
                                return e += '<div class="delete_by_mobile_mode"><a href="">' + chrome.i18n.getMessage("delete_by_mobile_mode") + '<span class="icon"></span></a></div>', void c.showErrorBox(e)
                            }
                            try {
                                var f = d.graphql.shortcode_media.id,
                                    n = "https://www.instagram.com/create/" + f + "/delete/"
                            } catch (p) {
                                return e = o, e += '<div class="delete_by_mobile_mode"><a href="">' + chrome.i18n.getMessage("delete_by_mobile_mode") + '<span class="icon"></span></a></div>', void c.showErrorBox(e)
                            }
                            a.sendMessage("getCookies", function(d) {
                                return d && d.csrftoken ? void $.ajax({
                                    url: n,
                                    method: "POST",
                                    headers: {
                                        "x-csrftoken": d.csrftoken,
                                        "x-instagram-ajax": "1"
                                    }
                                }).done(function(b) {
                                    return b && "object" == typeof b && "ok" == b.status && "undefined" != typeof b.did_delete ? 0 == b.did_delete ? (a.trackEvent("no_delete", {
                                        url: n,
                                        res: JSON.stringify(b).substr(0, 1500)
                                    }), void c.showErrorBox(o)) : void(window.location.href = "https://www.instagram.com/" + (g.authorizedUserName || "")) : (a.trackEvent("delete_unknown_response", {
                                        url: n,
                                        res: JSON.stringify(b).substr(0, 1500)
                                    }), void c.showErrorBox(o))
                                }).fail(function(d) {
                                    a.trackEventWithRandom("delete_reject", {
                                        url: n,
                                        shortcode: b,
                                        userId: userId || "",
                                        resCode: d.status,
                                        resText: d.responseText.substr(0, 500)
                                    }, .05);
                                    var e = "";
                                    e = 403 == d.status ? '<h3 style="margin-bottom:15px;font-weight:600;">' + h + '</h3><p style="margin-bottom:10px;">' + i + ':</p><ol style="text-align: justify; list-style: decimal;padding: 10px;margin-left: 10px;font-size: 0.8em;"><li style="margin-bottom:15px">' + j + '</li><li style="margin-bottom:15px">' + k + "</li></ol>" : 0 == d.status ? '<h3 style="margin-bottom: 15px;font-weight: 600;">' + l + "</h3><p>" + m + "</p>" : o, e += '<div class="delete_by_mobile_mode"><a href="">' + chrome.i18n.getMessage("delete_by_mobile_mode") + '<span class="icon"></span></a></div>', c.showErrorBox(e)
                                }) : void c.showErrorBox(o)
                            })
                        })
                    }
                },
                getDelBtnEl: function(a) {
                    this.delButtonTemplate || (this.delButtonTemplate = this.createDelBtnTemplate());
                    var b = this.delButtonTemplate.cloneNode(!0);
                    return b.setAttribute("type", "button"), b.dataset.shortcode = a, b.classList.add(this.delBtnClassName), b
                },
                createDelBtnTemplate: function() {
                    var a = document.createElement("a");
                    return a.innerHTML = '<span class="delete_icon"></span>', a
                }
            }
        }(),
        g = function() {
            return {
                dlBtnClassName: "ext_desktop_dl_btn",
                mobileModeBtnClassName: "ext_mobile_mode_icon",
                storiesPageBtnClassName: "ext_stories_page_icon",
                buttonTemplate: null,
                authorizedUserName: null,
                isFrame: !1,
                updatesStoryInterval: 0,
                observerDomInterval: 0,
                disabledApp: !1,
                cachedMedia: [],
                cachedMediaShortCodes: [],
                lastUri: null,
                run: function() {
                    var b = this;
                    "undefined" == typeof window.localStorage.ext_igtv_on && (window.localStorage.ext_igtv_on = "1"), this.disconnectPortObserver.testConnect(), a.fixForeach(), this.createDownloadButtonTpl(), this.observerDOMInit(), this.messagesListenerInit(), this.userActionsListenerInit(), a.getWorkingQueryHashes(), this.checkExternalUpload(), a.getAuthorizedUserName(function(a) {
                        return a ? (chrome.runtime.sendMessage({
                            action: "last_authorized_user",
                            username: a
                        }), void(b.authorizedUserName = a)) : void b.getUserSelfInfo()
                    }), a.sendMessage("askMassDownloadPro", function(a) {
                        a && (d.massDownloadProSettings = !0)
                    }), window.ext_blob_story_data = {}
                },
                observerDOMInit: function() {
                    function b() {
                        try {
                            var b = document.querySelector("#react-root");
                            if (!b) return void("instagram.com" == e.getHostName() && Math.random() < .001 && a.trackEventPost("no_react-root", window.location.href, document.body && document.body.innerHTML));
                            var c = {
                                    attributes: !1,
                                    childList: !0,
                                    characterData: !1,
                                    subtree: !1
                                },
                                d = e.isNativeStories(),
                                f = new MutationObserver(function(a) {
                                    a.forEach(function(a) {
                                        if (a.addedNodes.length)
                                            for (var b = 0; a.addedNodes[b]; b++)
                                                if ("section" == a.addedNodes[b].tagName.toLowerCase()) {
                                                    window.location.href.indexOf("/stories/") > -1 ? (d = !0, j()) : (d ? d = !1 : g.resetFoundLinks(), setTimeout(function() {
                                                        m()
                                                    }, 0));
                                                    break
                                                }
                                    })
                                });
                            f.observe(b, c)
                        } catch (h) {
                            a.trackCodeError(h, "reactRootObserver")
                        }
                    }

                    function h() {
                        g.lastUri && g.authorizedUserName && (-1 !== g.lastUri.indexOf("/saved/") && -1 === window.location.pathname.indexOf("/saved/") && -1 !== window.location.pathname.indexOf("/" + g.authorizedUserName + "/") || -1 === g.lastUri.indexOf("/saved/") && -1 !== g.lastUri.indexOf("/" + g.authorizedUserName + "/") && -1 !== window.location.pathname.indexOf("/saved/")) && g.resetFoundLinks(), g.lastUri = window.location.pathname
                    }

                    function i() {
                        if (!e.isNativeStories()) return !1;
                        var a = document.querySelector("._sq4bv ._psbeo ._ni05h section");
                        a || (a = document.querySelector("section > div div section")), a && c.checkStateDownloadAllBtn(a)
                    }

                    function j(b) {
                        if (!e.isNativeStories()) return !1;
                        var d = document.querySelector("._sq4bv ._psbeo ._ni05h section");
                        return d || (d = document.querySelector("section > div div section")), d ? d && "1" != d.dataset.extSkip && (d.dataset.extSkip = 1, setTimeout(function() {
                            c.addDlBtn2NativeStories(d)
                        }, 0)) : b ? setTimeout(j, 200) : !document.querySelector(".coreSpriteFeedCreation") && Math.random() < .001 && a.sendMessage("noNativeStoriesContTrack", function() {
                            var b = document.querySelector("#react-root");
                            b ? a.trackEventPost("no_native_stories_cont", location.href, b.innerHTML) : a.trackEventPost("no_native_stories_cont_no_react_root", location.href, document.body && document.body.innerHTML)
                        }), !0
                    }

                    function k() {
                        if (e.isMainPage()) {
                            var b = document.querySelector("section > main > section > div:first-child");
                            b.querySelector("article") || (b = document.querySelector("section > main > section > div:first-child+div")), !b.querySelector("article") && querySelectorAll("article").length && !a.not_found_stories_container_reported && Math.random() < .01 && (a.not_found_stories_container_reported = !0, a.trackEventPost("not_found_stories_container", window.location.href, document.body.innerHTML)), b ? b && "1" != b.dataset.extSkip && (b.dataset.extSkip = 1, setTimeout(function() {
                                c.insertStoriesBlock(b)
                            }, 0)) : !document.querySelector(".coreSpriteFeedCreation") && Math.random() < 1e-5 && a.sendMessage("noMainContTrack", function() {
                                var b = document.querySelector("#react-root");
                                b ? a.trackEventPost("no_main_cont", location.href, b.innerHTML) : a.trackEventPost("no_main_cont_no_react_root", location.href, document.body && document.body.innerHTML)
                            })
                        }
                    }

                    function l() {
                        if (!document.querySelector("." + g.mobileModeBtnClassName) || !document.querySelector("." + g.storiesPageBtnClassName)) {
                            var a = document.querySelector("section > main + nav ._qlijk");
                            if (a || (a = document.querySelector("section > main + nav > div > div > div > div:last-child div")), !a && document.querySelector(".XrOey") && (a = document.querySelector(".XrOey").parentNode), a) {
                                if (!document.querySelector("." + g.mobileModeBtnClassName)) {
                                    var b = document.createElement("div");
                                    b.className = "XrOey", b.innerHTML = '<a class="_8scx2 _gvoze ' + g.mobileModeBtnClassName + '" href=""></a>', a.appendChild(b)
                                }
                                if (!document.querySelector("." + g.storiesPageBtnClassName)) {
                                    var c = document.createElement("div");
                                    if (c.className = "XrOey", c.innerHTML = '<a class="_8scx2 _gvoze ' + g.storiesPageBtnClassName + '" href=""></a>', a.appendChild(c), "undefined" == typeof localStorage.ext_manager_stories_click && Date.now() < 154332e7) {
                                        c.style.position = "relative";
                                        var d = document.createElement("div");
                                        d.className = "ext_badge_new", d.innerText = "NEW", c.appendChild(d)
                                    }
                                }
                            }
                        }
                    }

                    function m() {
                        setTimeout(function() {
                            l()
                        }, 0), setTimeout(function() {
                            k()
                        }, 0), setTimeout(function() {
                            j()
                        }, 0), h(), i();
                        var a = document.querySelector('main header section a[href^="/accounts/edit"]');
                        a && setTimeout(function() {
                            f.uploadStateInit(a.parentNode)
                        }, 0);
                        var b = !1;
                        !/[\/\?]saved/.test(window.location.href) && a && a.previousSibling && g.authorizedUserName && a.previousSibling.innerText && g.authorizedUserName === a.previousSibling.innerText && (b = !0);
                        var e = 0,
                            m = document.querySelectorAll('section > main article > div > div > div a[href^="/p/"]');
                        0 == m.length && document.querySelector('article > div > div > div a[href^="/p/"] img') && (m = document.querySelectorAll('article > div > div > div a[href^="/p/"]')), 0 == m.length && document.querySelector('section div > div > div a[href^="/p/"] img') && (m = document.querySelectorAll('section div > div > div a[href^="/p/"]')), m && m.forEach && m.forEach(function(a) {
                            !a.parentNode.dataset.extSkip && a.querySelector("img") && (e++, g.addDlBtn(a.parentNode, 2)), b && !a.parentNode.dataset.dlBtnSkip && f.addDeleteBtnToThumbnail(a.parentNode)
                        });
                        var n = location.href.indexOf("/channel/") > -1 && document.querySelectorAll('section div > div > div a[href^="/tv/"]');
                        n && n.forEach && n.forEach(function(a) {
                            a.parentNode.dataset.extSkip || g.addDlBtn(a, 5)
                        });
                        var o = document.querySelector("header > div > div > canvas + span > img");
                        o && (o.parentNode.parentNode.dataset.extSkip || (o.parentNode.parentNode.dataset.extSkip = "1", c.checkPostLiveOneUser(function(a, b, d) {
                            a && c.addPostLiveIcon2UserPage(o.parentNode.parentNode, b, d)
                        })));
                        var p = document.querySelectorAll("div > div > article > header + div > div > div");
                        p && p.forEach && p.forEach(function(a) {
                            a.querySelector("ul > li > div > div > div") || a.parentNode.dataset.extSkip > 0 || (e++, g.addDlBtn(a.parentNode, 1))
                        });
                        var q = document.querySelectorAll("div > div > article > header + div > div > div ul > li > div > div > div");
                        q && q.length && q.forEach(function(a) {
                            a.parentNode.dataset.extSkip > 0 || g.addDlBtn(a.parentNode, 4)
                        }), e > 0 && d.rebuildPopup(), c.updateStories()
                    }

                    function n() {
                        var a = document.querySelectorAll(".Embed > .Header + div");
                        a && a.forEach && a.forEach(function(a) {
                            return a.dataset.extSkip > 0 ? !1 : void g.addDlBtn(a, 3)
                        })
                    }
                    return e.isFrame() ? (g.isFrame = !0, void n()) : (setTimeout(function() {
                        l()
                    }, 0), setTimeout(function() {
                        k()
                    }, 0), setTimeout(function() {
                        m()
                    }, 0), b(), void(g.observerDomInterval = setInterval(function() {
                        m()
                    }, 1500)))
                },
                messagesListenerInit: function() {
                    chrome.runtime.onMessage.addListener(g.chromeMessagesListener)
                },
                userActionsListenerInit: function() {
                    var b = $("body"),
                        e = Date.now(),
                        h = this,
                        i = function() {
                            var a = Date.now();
                            return e + 500 > a ? !0 : (e = a, !1)
                        };
                    b.on("click", "." + g.dlBtnClassName, function(a) {
                        g.disabledApp || i() || g.onClickDownloadBtn.call(this, a)
                    }), b.on("click", 'a.MpBh3[role="button"], a.SWk3c[role="button"]', function(a) {
                        h.multiplePostSwitchListener.call(this, h, a)
                    }), g.isFrame || (b.on("click", ".ext_popup_dl_btn", d.onClickDownloadAllBtn), b.on("click", ".ext_del_btn", function(a) {
                        if (!g.disabledApp && !i()) {
                            var b = this.dataset.shortcode,
                                c = g.getModalBox();
                            c.showDeleteWarning({
                                continueDelCallback: f.deleteMedia(b)
                            })
                        }
                    }), b.on("click", "." + d.dlBtnClassName, function(a) {
                        g.disabledApp || i() || d.showPopupDlAll()
                    }), b.on("click", ".ext_story_item_wrap", function(b) {
                        if (!g.disabledApp && !i()) {
                            var d, e = this,
                                f = c.allCurrentStories,
                                h = e.dataset.storyId,
                                j = e.dataset.storyType,
                                k = null;
                            for (var l in f)
                                if (f[l].id && f[l].id == h || f[l].pk && f[l].pk == h) {
                                    k = f[l], d = l;
                                    break
                                } if (!k) {
                                if ("live" == j) var m = chrome.i18n.getMessage("broadcast_finished");
                                else m = chrome.i18n.getMessage("story_is_not_available");
                                var n = g.getModalBox();
                                return n.showErrorBox(m)
                            }
                            var o = [];
                            if ("tray" == j)
                                if ("undefined" != typeof k.items) {
                                    if (o = c.getPrepareStoryItems(k.items, k.user), !o.length) return;
                                    c.showInPswp(o)
                                } else {
                                    var p = k.user && k.user.pk;
                                    if (!p) return void a.trackEventWithRandom("no_user_id", {
                                        user_object: k.user
                                    }, .01);
                                    c.requestOneUserStories(p, function(a) {
                                        a && (f[d] = a, o = c.getPrepareStoryItems(a.items, a.user), o.length && c.showInPswp(o))
                                    })
                                }
                            else a.sendMessage({
                                action: "open_stories_tab",
                                story_id: h
                            })
                        }
                    }), b.on("click", ".ext_ds_dl_btn", function(a) {
                        g.disabledApp || (a.stopPropagation(), a.preventDefault(), i() || c.onClickDlBtnOurStoryOne())
                    }), b.on("click", ".ext_ds_dl_all_btn", function(a) {
                        g.disabledApp || (a.stopPropagation(), a.preventDefault(), i() || c.onClickDlBtnOurStoryAll())
                    }), b.on("click", ".ext_ns_dl_btn", function(a) {
                        i() || c.onClickDlBtnNativeStoryOne.call(this, a)
                    }), b.on("click", ".ext_ns_dl_all_btn", function(a) {
                        i() || c.onClickDlBtnNativeStoryAll.call(this, a)
                    }), b.on("click", ".upload_by_mobile_mode, .delete_by_mobile_mode, ." + g.mobileModeBtnClassName, function(b) {
                        b.preventDefault(), i() || a.sendMessage("openMobileMode")
                    }), b.on("click", "." + g.storiesPageBtnClassName, function(b) {
                        b.preventDefault(), i() || (localStorage.ext_manager_stories_click = 1, a.sendMessage({
                            action: "open_stories_tab"
                        }))
                    }), b.on("click", ".ext_video_story_player", function(a) {
                        i() || (this.paused ? this.play() : this.pause())
                    }), b.on("click", ".ext_igtv_item_wrap", function(a) {
                        i() || this.dataset.src && (window.location = this.dataset.src)
                    }))
                },
                sendReportGlobal: function() {
                    setTimeout(function() {
                        a.sendMessage("needReportRequests", function(b) {
                            b && (a.trackEvent("FirstHourStats", {
                                domStats: a.domStats,
                                clicks: a.clickStats,
                                res: a.resStats,
                                requestsStats: a.requestsStats
                            }), a.sendMessage("reportRequestsSent"))
                        })
                    }, 36e5)
                },
                prepareDomReport: function() {
                    function b(a, c, d) {
                        1 === c.nodeType && "article" != c.nodeName.toLowerCase() && (c.classList.contains(g.mobileModeBtnClassName) || c.classList.contains("download_all_wrap") || (c.childElementCount ? (d++, c.children && c.children.forEach(function(c) {
                            b(a, c, d)
                        })) : a.push({
                            tag: c.nodeName,
                            className: c.className,
                            depth: d
                        })))
                    }
                    var c = 0,
                        d = !1,
                        f = !1,
                        h = setInterval(function() {
                            var i, j = e.isMainPage(),
                                k = [],
                                l = document.querySelectorAll("." + g.dlBtnClassName).length,
                                m = document.querySelectorAll("div > div > article > header + div > div > div"),
                                n = document.querySelectorAll('section > main article > div > div > div a[href^="/p/"]');
                            try {
                                if (j && 0 == a.domStats.stB && !f && a.domState.length && !document.querySelector(".coreSpriteFeedCreation") && (i = a.domState[a.domState.length - 1], i.isMainPage)) {
                                    f = !0;
                                    var o = document.querySelector("#react-root > section > main > section > div:first-child"),
                                        p = document.querySelector("#react-root > section"),
                                        q = document.querySelector("#react-root > section > main"),
                                        r = document.querySelector("#react-root > section > main > section"),
                                        s = [],
                                        t = [],
                                        u = 0,
                                        v = 0;
                                    r ? (u = r.childElementCount, r.childNodes && r.childNodes.forEach(function(a) {
                                        t.push({
                                            el: a.nodeName + "_" + a.className,
                                            firstChild: a.firstElementChild && a.firstElementChild.nodeName + "_" + a.firstElementChild.className,
                                            lastChild: a.lastElementChild && a.lastElementChild.nodeName + "_" + a.lastElementChild.className
                                        })
                                    })) : q && (v = q.childElementCount, q.childNodes && q.childNodes.forEach(function(a) {
                                        s.push({
                                            el: a.nodeName + "_" + a.className,
                                            firstChild: a.firstElementChild && a.firstElementChild.nodeName + "_" + a.firstElementChild.className,
                                            lastChild: a.lastElementChild && a.lastElementChild.nodeName + "_" + a.lastElementChild.className
                                        })
                                    }));
                                    var w = {
                                        container: +!!o,
                                        userAgent: window.navigator.userAgent,
                                        articlesCount: document.querySelectorAll("article").length,
                                        section1El: +!!p,
                                        mainEl: +!!q,
                                        section2El: +!!r,
                                        section2ChildrenCount: u,
                                        section2Children: t,
                                        mainElChildrenCount: v,
                                        mainElChildren: s
                                    };
                                    a.trackEvent("stories_block2_report", w)
                                }
                            } catch (x) {
                                a.trackEventWithRandom("error_in_stories_block_report", {
                                    error: x
                                }, .01)
                            }
                            if (!d && l > 1 && !document.querySelector(".coreSpriteFeedCreation") && !document.querySelector(".download_all_wrap")) {
                                d = !0;
                                var y = document.querySelector("#react-root > section > main + nav"),
                                    z = document.querySelector("section > main + nav > div > div > div > div:last-child");
                                !z && y && b(k, y, 0), a.trackEvent("nav2_report", {
                                    url: window.location.href,
                                    userAgent: window.navigator.userAgent,
                                    navExists: !!y,
                                    navDeepChild: z && z.innerHTML,
                                    navNodes: k
                                })
                            }
                            var A = {
                                isMainPage: j,
                                url: window.location.href,
                                aP: document.querySelectorAll('a[href^="/p/"]').length,
                                pNew: n.length,
                                pMain: m.length,
                                dlBtn: l,
                                cache: g.cachedMedia.length
                            };
                            a.domState.push(A), c++, c > 10 && (clearInterval(h), a.domState = {})
                        }, 2e4)
                },
                checkExternalUpload: function() {
                    var b = this,
                        c = window.location.search.match(/insta_upload_ext_link=1/);
                    if (c) {
                        var d = a.getUserNameFromWindowLocation();
                        d && a.requestHTMLgraphqlMain(function(c) {
                            if (c && c.length) {
                                var e = a.get_sharedDataFromHTML(c, "https://www.instagram.com"),
                                    h = e && e.config && e.config.viewer && e.config.viewer.username;
                                h && h == d && b.getExternalUploadLink(function(a) {
                                    a && b.isValidLink(a) && b.requestExternalFile(a, function(a) {
                                        var b = a.target.result,
                                            c = g.getModalBox();
                                        c.showUploadChoice({
                                            toProfileCallback: function() {
                                                f.uploadType = "profile", f.uploadPreviewBlock.create(b)
                                            },
                                            toStoriesCallback: function() {
                                                f.uploadType = "story", f.uploadPreviewBlock.create(b)
                                            }
                                        })
                                    })
                                })
                            }
                        })
                    }
                },
                requestExternalFile: function(a, b) {
                    var c = new XMLHttpRequest;
                    c.open("GET", a, !0), c.responseType = "arraybuffer", c.onreadystatechange = function() {
                        if (4 === this.readyState && 200 === this.status) try {
                            var a = this.response || this.responseText,
                                c = new Blob([a], {
                                    type: "application/octet-stream"
                                }),
                                d = new FileReader;
                            d.onload = b, d.readAsDataURL(c)
                        } catch (e) {}
                    }, c.send()
                },
                getExternalUploadLink: function(a) {
                    chrome.runtime.sendMessage("get_external_link", a)
                },
                isValidLink: function(a) {
                    return !!a.match(/^https?:\/\/(www\.)?[^\.]+\.[^\.]+/)
                },
                addIgtvPanel: function(b) {
                    if (b) {
                        var c = document.querySelector("main header section h1"),
                            d = c && c.innerText;
                        d || (d = a.getUserNameFromWindowLocation()), d && (b.dataset.ext_igtv = "1", a.getIgtvDataFromUserGraphql({
                            userName: d
                        }, function(a) {
                            if (a.media && a.media.length && !document.querySelector(".ext_igtv_list_panel")) {
                                var c = b.lastElementChild;
                                if (c && "div" == c.tagName.toLowerCase()) {
                                    var d = document.createElement("div");
                                    d.className = "ext_igtv_on_off_toggle_wrap";
                                    var e = document.createElement("div");
                                    e.className = "ext_igtv_on_off_toggle", d.appendChild(e);
                                    var f = g.getIgtvListPanel(a.media);
                                    b.insertBefore(d, c), b.insertBefore(f, c);
                                    var h = function() {
                                            return "1" == localStorage.ext_igtv_on
                                        },
                                        i = function() {
                                            d.classList.remove("ext_disabled"), f.style.display = "block", localStorage.ext_igtv_on = "1", $(f).smoothDivScroll()
                                        },
                                        j = function() {
                                            d.classList.add("ext_disabled"), localStorage.ext_igtv_on = "0";
                                            try {
                                                $(f).smoothDivScroll("destroy")
                                            } catch (a) {}
                                            f.style.display = "none"
                                        };
                                    h() ? f.style.display = "block" : (d.classList.add("ext_disabled"), f.ap.style.display = "none"), $(f).smoothDivScroll(), e.addEventListener("click", function() {
                                        h() ? j() : i()
                                    })
                                }
                            }
                        }))
                    }
                },
                getIgtvListPanel: function(a) {
                    var b = document.createElement("div");
                    return b.className = "ext_igtv_list_panel", a.forEach(function(a) {
                        var c = g.getIgtvItem(a);
                        b.appendChild(c)
                    }), b
                },
                getIgtvItem: function(a) {
                    var b = document.createElement("div");
                    b.className = "ext_igtv_item";
                    var c = Math.floor(parseInt(a.duration) / 60) + ":" + parseInt(a.duration) % 60;
                    return b.innerHTML = '<div class="ext_igtv_item_wrap" data-src="/tv/' + a.shortcode + '" style="background-image: url(' + a.display_url + ')"><div class="ext_igtv_item_duration">' + c + '</div><div class="ext_igtv_item_title">' + a.title + "</div></div>", b
                },
                onClickDownloadBtn: function(b) {
                    b.stopPropagation(), b.preventDefault(), a.clickStats.dlBtn++;
                    var c = this;
                    if (!(c instanceof HTMLElement && c.classList.contains(g.dlBtnClassName))) return void g.showDownloadError();
                    if (g.loaderBtnState.on(c), c.dataset.msurl) {
                        var d = g.getUserName(c, !0);
                        if (g.isVideoPost(c.parentNode)) {
                            var e = g.findVideoElement(c.parentNode);
                            if (e) var f = g.getLinkFromVideoElement(e),
                                h = a.getFileNameFromVideoLink(f, d)
                        } else if (g.isImagePost(c.parentNode)) {
                            var i = g.findImageElement(c.parentNode);
                            i && (f = g.getLinkFromImgElement(i), h = a.getFileNameFromImageLink(f, d))
                        }
                        if (f && a.isValidUrl(f) && h) var j = {
                            url: f,
                            filename: h
                        };
                        return void g.onGetMediaInfo.call(g, j, c)
                    }
                    var k = c.dataset.shortcode,
                        l = !!c.dataset.igtv;
                    a.getMediaItemFromJsonGraphql({
                        shortCode: k,
                        posInMultiple: c.dataset.multiplePos,
                        isIgtv: l
                    }, function(b) {
                        if (!b || b.error) try {
                            if (g.isVideoPost(c.parentNode)) {
                                var d = g.findVideoElement(c.parentNode);
                                if (d) var e = g.getLinkFromVideoElement(d),
                                    f = a.getFileNameFromVideoLink(e)
                            } else if (g.isImagePost(c.parentNode)) {
                                var h = g.findImageElement(c.parentNode);
                                h && (e = g.getLinkFromImgElement(h), f = a.getFileNameFromImageLink(e))
                            }
                            e && a.isValidUrl(e) && f && (b = {
                                url: e,
                                filename: f
                            })
                        } catch (i) {
                            a.trackEventWithRandom("error_in_try_found_reserve_url", {
                                container: c.parentNode.outerHTML
                            }, .001)
                        }
                        g.onGetMediaInfo.call(g, b, c)
                    })
                },
                onGetMediaInfo: function(b, c) {
                    var d = this;
                    return b && !b.error && b.url && b.filename ? void a.downloadFile(b, function(a) {
                        d.loaderBtnState.off(), a || d.showDownloadError(c)
                    }) : (d.loaderBtnState.off(), d.showDownloadError(c))
                },
                resetFoundLinks: function() {
                    this.cachedMedia = [], this.cachedMediaShortCodes = []
                },
                loaderBtnState: {
                    on: function(a) {
                        $(".ext_icon", a).addClass("preloader2")
                    },
                    off: function() {
                        $("." + g.dlBtnClassName + " .ext_icon.preloader2").removeClass("preloader2"), $("." + c.dlBtnClassName + " .ext_icon.preloader2").removeClass("preloader2")
                    }
                },
                multiplePostSwitchListener: function(b, c) {
                    var d = $(this).closest("article").get(0);
                    if (d) {
                        var e = d.querySelector("." + b.dlBtnClassName);
                        if (e) {
                            if ("undefined" == typeof e.dataset.multiplePos && (e.dataset.multiplePos = 0), this.classList.contains("Zk-Zb")) var f = 1;
                            else {
                                if (!this.classList.contains("_2Igxi")) return void a.trackEventWithRandom("change_multiple_switcher_class", {
                                    el: this.innerHTML
                                }, .01);
                                f = -1
                            }
                            e.dataset.multiplePos = parseInt(e.dataset.multiplePos) + f, parseInt(e.dataset.multiplePos) < 0 && (e.dataset.multiplePos = 0)
                        }
                    }
                },
                showDownloadError: function(a) {
                    if (a) {
                        var b = a.parentNode;
                        $(b).append('<div class="error_dl_msg_desktop">' + chrome.i18n.getMessage("error_dl_msg") + "</div>"), setTimeout(function() {
                            $(".error_dl_msg_desktop").remove()
                        }, 2e3)
                    }
                },
                disableApp: function() {
                    clearInterval(this.updatesStoryInterval), clearInterval(this.observerDomInterval), this.disabledApp = !0, this.disconnectPortObserver.port && this.disconnectPortObserver.port.onDisconnect.removeListener(this.disconnectPortObserver.disconnectListener), chrome.runtime.onMessage.removeListener(g.chromeMessagesListener), $("." + g.dlBtnClassName).remove(), $("." + c.storiesWrapperClass).remove(), $("." + d.downloadAllBtnWrapperClass).remove(), $("." + g.mobileModeBtnClassName).remove()
                },
                chromeMessagesListener: function(b, d, e) {
                    if (!b) return !1;
                    if ("checkConnect" == b) e(!0);
                    else {
                        if ("getFoundLinks" == b) return g.getFoundLinks(e), !0;
                        "checkLinks" == b ? g.checkLinks() : "getAuthorizedUserName" == b ? e(g.authorizedUserName) : "storyPauseOffByDownloadId" == b ? c.storiesPause.off() : "storyPauseOffByBlobUrl" == b.action ? window.ext_blob_story_data.object_url == b.url && c.storiesPause.off() : "downloadFileFinished" == b.action && ("interrupted" == b.status ? a.resStats.dI++ : "complete" == b.status && a.resStats.dC++)
                    }
                },
                disconnectPortObserver: {
                    port: null,
                    disconnected: !1,
                    testConnect: function() {
                        this.port = chrome.runtime.connect(), this.port.onDisconnect.addListener(this.disconnectListener)
                    },
                    disconnectListener: function() {
                        this.disconnected = !0, window.insta_dl_disabled = !0, g.disconnectPortObserver.showDisconnectNotification()
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
                getFoundLinks: function(b) {
                    try {
                        var d = this,
                            f = [];
                        if (null != c.gallery && 0 != c.showingStoryItems.length && "tray" == c.showingStoryType) c.showingStoryItems.forEach(function(a) {
                            f.push({
                                isStory: !0,
                                type: a.type,
                                prev: a.prev,
                                url: a.url,
                                filename: a.filename
                            })
                        });
                        else {
                            if (e.isNativeStories()) return void c.getAllLinksCurrentNativeStories(function(a) {
                                a.forEach(function(a) {
                                    f.push({
                                        isStory: !0,
                                        type: a.type,
                                        prev: a.prev,
                                        url: a.url,
                                        filename: a.filename
                                    })
                                }), b(f)
                            });
                            f = d.cachedMedia
                        }
                        "function" == typeof b && b(f)
                    } catch (g) {
                        a.trackCodeError(g, "getFoundLinks")
                    }
                },
                getCachedLinkByShortCode: function(a) {
                    for (var b = 0; g.cachedMedia[b]; b++)
                        if (g.cachedMedia[b].shortcode == a) return "string" == typeof g.cachedMedia[b].url && g.cachedMedia[b].url.length ? {
                            url: g.cachedMedia[b].url,
                            filename: g.cachedMedia[b].filename
                        } : null;
                    return null
                },
                getFoundShortCodes: function(a, b) {
                    return a = "undefined" == typeof a || isNaN(parseInt(a)) ? 0 : parseInt(a) - 1, b = isNaN(parseInt(b)) ? void 0 : parseInt(b), this.cachedMediaShortCodes.slice(a, b)
                },
                findVideoElement: function(a) {
                    return a.querySelector("video")
                },
                findImageElement: function(b) {
                    var c = null,
                        d = b.querySelectorAll("img[src], img[srcset]");
                    if ("undefined" == typeof d.length) a.trackEventWithRandom("NodeList_not_has_length_property", "", .001), c = b.querySelector("img[src], img[srcset]");
                    else if (1 === d.length) c = d[0];
                    else if (d.length > 1) {
                        for (var e = 0; d[e]; e++) {
                            var f = d[e].getAttribute("src"),
                                g = d[e].getAttribute("srcset");
                            if (f || g) {
                                if (!("string" == typeof f && f.indexOf("chrome-extension") > -1)) {
                                    if ("string" == typeof f && f.indexOf("instagram") > -1 || "string" == typeof g && g.indexOf("instagram") > -1) {
                                        c = d[e];
                                        break
                                    }
                                    a.trackEventWithRandom("unusual_url_img", {
                                        src: f,
                                        srcset: g
                                    }, .01)
                                }
                            } else a.trackEventWithRandom("no_src_and_scrset_in_img", {
                                imgEl: d[e].outerHTML
                            }, .01)
                        }
                        c || (c = d[0])
                    }
                    return c ? c : null
                },
                getLinkFromImgElement: function(a) {
                    if (!(a instanceof HTMLElement)) return null;
                    var b = a.getAttribute("srcset");
                    if (b) {
                        var c = {},
                            d = b.split(",");
                        d.forEach(function(a) {
                            var b = a.split(" ");
                            c[b[1].replace(/[^\d]/, "")] = b[0]
                        });
                        var e = 0;
                        for (var f in c) + f > +e && (e = f);
                        var g = c[e]
                    }
                    return "string" == typeof g && g.match(/\.(jpg|png)/) || (g = a.getAttribute("src")), "string" != typeof g ? null : g
                },
                getLinkFromVideoElement: function(a) {
                    if (!(a instanceof HTMLElement)) return !1;
                    var b = a.getAttribute("src");
                    if ("string" == typeof b) return b;
                    var c = a.querySelectorAll("source");
                    if (!c.length) return !1;
                    var d = ["avc1.64001E", "avc1.4D401E", "avc1.58A01E", "avc1.42E01E"],
                        e = [];
                    c.forEach(function(a) {
                        var b = a.getAttribute("type");
                        if (b) {
                            var c = b.match(/codecs="([^,]+)/);
                            if (c = c && c[1]) {
                                var f = d.indexOf(c); - 1 != f && (e[f] = a.src)
                            }
                        }
                    });
                    for (var f in e)
                        if ("string" == typeof e[f] && e[f].length) {
                            b = e[f];
                            break
                        } return b || (b = c[0].getAttribute("src")), "string" != typeof b ? !1 : b
                },
                isVideoPost: function(a) {
                    return !!(a.querySelector("video") || a.querySelector(".videoSpritePlayButton") || a.querySelector(".coreSpriteVideoIconLarge") || a.querySelector(".glyphsSpriteVideo_large"))
                },
                isImagePost: function(a) {
                    return !!a.querySelector("img[src], img[srcset]")
                },
                isIgtvPost: function(a) {
                    return !(!a.href || !a.href.match(/\/tv\/([^\/]+)/))
                },
                getVideoPoster: function(a) {
                    var b, c = a.querySelector("video");
                    if (c && (b = c.getAttribute("poster")), a.href && a.href.match(/\/tv\/([^\/]+)/)) {
                        var d = a.querySelector('div > div[style*="background-image"]');
                        if (!d) return null;
                        b = d.style.backgroundImage, b = b.match(/url\("([^"]+)/), b = b && b[1]
                    }
                    if (b && b.length && b.match(/\.(jpg|png)/)) return b;
                    var e = a.querySelector("img");
                    return e ? e.getAttribute("src") : null
                },
                getPreviewFromImageElement: function(a) {
                    if (!a) return null;
                    var b, c = a.getAttribute("srcset");
                    if (c) {
                        var d = {},
                            e = c.split(",");
                        e.forEach(function(a) {
                            var b = a.split(" ");
                            d[b[1].replace(/[^\d]/, "")] = b[0]
                        });
                        var f = null;
                        for (var g in d) null !== f ? +f > +g && (f = g) : f = g;
                        b = d[f]
                    }
                    return "string" == typeof b && b.match(/\.(jpg|png)/) ? b : (b = a.getAttribute("src"), "string" == typeof b && b.match(/\.(jpg|png)/) ? b : null)
                },
                addDlBtn: function(b, c) {
                    "use strict";
                    try {
                        var d = this;
                        if (b.querySelector("." + g.dlBtnClassName)) return;
                        var f, h, i, j, k, l, m, n, o, p;
                        if (1 == c) {
                            if (f = $(b).closest("article").get(0), !f) return
                        } else if (2 == c) f = b;
                        else if (3 == c) f = b.querySelector(".EmbeddedMedia");
                        else if (4 == c) {
                            if (p = !0, f = $(b).closest("article").get(0), !f) return
                        } else {
                            if (5 != c) return;
                            f = b
                        }
                        if (n = g.getShortCode(f), !n) return void a.trackEventWithRandom("no_shortcode_in_container", {
                            pageType: c,
                            container: b.innerHTML
                        }, .001);
                        if (d.isVideoPost(b)) o = "video", h = d.findVideoElement(b), h && (l = d.getLinkFromVideoElement(h), k = a.getFileNameFromVideoLink(l), l && k || a.trackEventWithRandom("no_data_in_video_el", {
                            el: h.outerHTML,
                            pageType: c
                        }, .01)), m = d.getVideoPoster(b);
                        else if (d.isImagePost(b)) {
                            if (o = "photo", i = d.findImageElement(b), !i) return void a.trackEventWithRandom("no_img_el_in_image_post", {
                                container: b.innerHTML,
                                pageType: c
                            }, .01);
                            l = d.getLinkFromImgElement(i), k = a.getFileNameFromImageLink(l), m = d.getPreviewFromImageElement(i), m || (a.trackEventWithRandom("no_new_preview_media", {
                                pageType: c,
                                imageEl: i,
                                url: l,
                                container: b.innerHTML
                            }, .01), m = l)
                        } else {
                            if (!d.isIgtvPost(b)) return;
                            o = "igtv", m = d.getVideoPoster(b)
                        }
                        if (!m) return;
                        var q = {
                            shortcode: n,
                            type: o,
                            prev: m,
                            page_type: c,
                            isStory: !1,
                            isMultiple: e.isMultiplePost(b) || p,
                            isMultipleWithSlider: p
                        };
                        if ("string" == typeof l && -1 == l.indexOf("blob:") && l.match(/\.(png|jpg|mp4|flv)/) && (q.url = l, q.filename = k), p && !q.url) return;
                        d.addPost2Cache(q), d.sendNewPostInfoToPopup(q), j = this.getDlBtnEl(q), b.appendChild(j), 5 == c && (b.style.position = "relative"), a.domStats.dlBtn++, b.dataset.extSkip = "1"
                    } catch (r) {
                        Math.random() < .01 && a.trackCodeError(r, "addNewDlBtn")
                    }
                },
                addPost2Cache: function(a) {
                    "object" == typeof a && a.shortcode && (-1 == g.cachedMediaShortCodes.indexOf(a.shortcode) && (g.cachedMedia.push(a), g.cachedMediaShortCodes.push(a.shortcode)), (g.cachedMedia.length > 1 || a.isMultiple) && d.addDlZipBtn())
                },
                sendNewPostInfoToPopup: function(b) {
                    a.sendMessage({
                        action: "linkFound",
                        mediaInfo: b
                    })
                },
                getDlBtnEl: function(a) {
                    var b = this.buttonTemplate.cloneNode(!0);
                    return b.dataset.shortcode = a.shortcode, a.isMultipleWithSlider ? b.dataset.msurl = "1" : a.isMultiple && (b.dataset.multiplePos = "0"), "igtv" == a.type && (b.dataset.igtv = 1), b
                },
                createDownloadButtonTpl: function() {
                    var a = document.createElement("a");
                    a.className = this.dlBtnClassName, a.setAttribute("type", "button"), a.innerHTML = '<span class="ext_icon"></span><span class="ext_text">' + chrome.i18n.getMessage("download").toUpperCase() + "</span>", e.isWindows() && a.classList.add("ext_windows_font"), this.buttonTemplate = a
                },
                getModalBox: function() {
                    function b() {
                        z = s.querySelector("#ext_modal_checkbox"), z && z.checked && a.sendMessage("warning-off"), q(), s.style.display = "none", K.innerHTML = "", s.opened = 0, s.remove()
                    }

                    function d(a) {
                        return function() {
                            b(), a()
                        }
                    }

                    function f(a) {
                        return function() {
                            b(), a()
                        }
                    }

                    function g(a) {
                        return function() {
                            b(), a()
                        }
                    }

                    function h(a) {
                        return function() {
                            b(), a()
                        }
                    }

                    function i(a) {
                        return function() {
                            b(), a()
                        }
                    }

                    function j(a) {
                        return function() {
                            a(s)
                        }
                    }

                    function k(a) {
                        return function() {
                            b(), a()
                        }
                    }

                    function l(a) {
                        return function() {
                            b(), c.storiesPause.off(), "function" == typeof a && a()
                        }
                    }

                    function m(a) {
                        a.target == s && b()
                    }

                    function n() {
                        document.querySelector("#ext_review_link").click(), b()
                    }

                    function o() {
                        b(), a.sendMessage("estimateLater")
                    }

                    function p(a, b, c) {
                        a && b && c && a.addEventListener(b, c), L.push({
                            el: a,
                            event: b,
                            listener: c
                        })
                    }

                    function q() {
                        L.forEach(function(a) {
                            a.el && a.event && a.listener && a.el.removeEventListener(a.event, a.listener)
                        }), window.removeEventListener("click", m)
                    }

                    function r(a) {
                        t = s.querySelector(".ext_btn_continue"), u = s.querySelector(".ext_btn_cancel"), A = K.querySelector(".ext_modal_close"), B = K.querySelector(".ext_btn_ok"), v = K.querySelector(".ext_btn_estimate"), w = K.querySelector("#estimate_later"), x = K.querySelector("#estimate_no"), y = K.querySelector(".ext_btn_enough"), G = K.querySelector(".upload_to_profile_btn"), H = K.querySelector(".upload_to_stories_btn"), I = K.querySelector(".show_post_live_user_btn"), J = K.querySelector(".show_stories_user_btn"), a && ("function" == typeof a.continueCallback && t && p(t, "click", d(a.continueCallback)), "function" == typeof a.continueDelCallback && t && p(t, "click", j(a.continueDelCallback)), "function" == typeof a.enoughCallback && y && p(y, "click", k(a.enoughCallback)), "function" == typeof a.toProfileCallback && G && p(G, "click", f(a.toProfileCallback)), "function" == typeof a.toStoriesCallback && H && p(H, "click", g(a.toStoriesCallback)), "function" == typeof a.showPostLiveCallback && I && p(I, "click", h(a.showPostLiveCallback)), "function" == typeof a.showStoriesCallback && J && p(J, "click", i(a.showStoriesCallback)), "function" == typeof a.successUploadedStoryCallback && B && p(B, "click", i(a.successUploadedStoryCallback))), p(u, "click", l(a && a.cancelCallback)), p(A, "click", l(a && a.cancelCallback)), p(v, "click", n), p(w, "click", o), p(w, "click", o)
                    }
                    var s = document.querySelector(".ext_modal");
                    s || (s = document.createElement("div"), s.className = "ext_modal", s.innerHTML = '<div class="ext_modal_content"></div>', document.querySelector("body").appendChild(s));
                    var t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K = s.querySelector(".ext_modal_content"),
                        L = [];
                    return s.close = function() {
                        b()
                    }, s.showDownloadAllWarning = function(a) {
                        K.innerHTML = '<div class="ext_modal_header">' + chrome.i18n.getMessage("download_more_100_warning") + '</div><div class="ext_modal_buttons_wrap"><button class="ext_btn_continue">' + chrome.i18n.getMessage("btn_continue").toUpperCase() + '</button><button class="ext_btn_cancel">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + '</button></div><div class="ext_modal_footer"><input type="checkbox" id="ext_modal_checkbox"><span>' + chrome.i18n.getMessage("do_not_show_again") + "</span></div>", r(a), window.addEventListener("click", m), s.style.display = "block", s.opened = 1
                    }, s.showDeleteWarning = function(a) {
                        K.innerHTML = '<div class="ext_modal_header">' + chrome.i18n.getMessage("are_you_sure_delete") + '</div><div class="ext_modal_buttons_wrap"><button class="ext_btn_continue">' + chrome.i18n.getMessage("delete").toUpperCase() + '</button><button class="ext_btn_cancel">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + "</button></div>", r(a), window.addEventListener("click", m), s.style.display = "block", s.opened = 1
                    }, s.showUploadChoice = function(a) {
                        K.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_modal_buttons_wrap"><button class="upload_to_profile_btn">' + chrome.i18n.getMessage("upload_to_profile") + '</button><button class="upload_to_stories_btn">' + chrome.i18n.getMessage("upload_to_stories") + '</button></div><div class="upload_by_mobile_mode"><a href="">' + chrome.i18n.getMessage("upload_by_mobile_mode") + '<span class="icon"></span></a></div>', r(a), window.addEventListener("click", m), s.style.display = "block", s.opened = 1
                    }, s.showStoryTypeUserChoice = function(a) {
                        K.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_modal_buttons_wrap"><button class="show_post_live_user_btn">' + chrome.i18n.getMessage("show_post_live") + '</button><button class="show_stories_user_btn">' + chrome.i18n.getMessage("show_stories") + "</button></div>", r(a), window.addEventListener("click", m), s.style.display = "block", s.opened = 1
                    }, s.showDownloadProcess = function(a, b) {
                        window.removeEventListener("click", m), K.innerHTML = '<div class="ext_download_all_process"><div class="download_all_process_state">' + chrome.i18n.getMessage("download_zip") + '</div><div class="download_all_retry">' + chrome.i18n.getMessage("retry_requests") + '<span></span></div><div id="ext_progress"><div id="ext_bar"></div></div><div class="download_all_success_count"></div><div class="ext_modal_buttons_wrap"><button class="ext_btn_cancel cancel_download">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + '</button><button class="ext_btn_enough">' + chrome.i18n.getMessage("btn_enough").toUpperCase() + '</button></div><div class="footer"><div><a class="open_new_tab_insta" href="https://www.instagram.com/" target="_blank">' + chrome.i18n.getMessage("open_new_tab_for_surfing") + "</a></div></div></div>", D = K.querySelector(".download_all_success_count"), E = K.querySelector(".download_all_retry"), F = K.querySelector(".download_all_retry span"), C = s.querySelector("#ext_bar"), D.innerText = "(0/" + a + ")", r(b);
                        var c = $('[role="presentation"]');
                        e.isNativeStories() && c.length && c.append(s), s.style.display = "block", s.opened = 1
                    }, s.showPrepareDownloadProcess = function(a, b) {
                        var c = a.header,
                            d = (a.footer, a.bar_start || 0);
                        window.removeEventListener("click", m), K.innerHTML = '<div class="ext_download_all_process"><div class="download_all_process_state">' + c + '</div><div id="ext_progress" class="' + (a.from_tagged ? "ext_circle_progress" : "") + '"><div id="ext_bar"></div></div><div class="ext_modal_buttons_wrap"><button class="ext_btn_cancel">' + chrome.i18n.getMessage("btn_cancel").toUpperCase() + '</button></div><div class="footer"><div class="ext_dont_panic" style="display: none"><span>' + chrome.i18n.getMessage("waiting_response_for_virtual_scroll") + '</span><span class="ext_loader"></span></div><div><a class="open_new_tab_insta" href="https://www.instagram.com/" target="_blank">' + chrome.i18n.getMessage("open_new_tab_for_surfing") + "</a></div></div></div>", r(b), C = s.querySelector("#ext_bar"), C.style.width = d + "%", s.style.display = "block", s.opened = 1
                    }, s.updateDownloadZipProgressBar = function(a) {
                        if (!a.from_tagged && s.querySelector(".ext_download_all_process") && (D.innerText = "(" + a.successCount + "/" + a.allCount + ")", a.retryRequestsCount && (E.style.display = "block", F.innerText = " (" + a.retrySuccessCount + "/" + a.retryRequestsCount + ")"), a.lastSuccess)) {
                            var b = a.oneValuePercent;
                            C.style.width || (C.style.width = "0%");
                            var c = parseFloat(C.style.width),
                                d = c + b;
                            (100 == d || d > 100) && (d = 100), C.style.width = d + "%"
                        }
                    }, s.updatePrepareZipProgressBarAndText = function(a) {
                        if (!a.from_tagged) {
                            var b = $(C).closest(".ext_download_all_process"),
                                c = b.find(".ext_dont_panic");
                            if (a.dont_panic ? c.show() : c.hide(), !a.no_progress) {
                                var d = a.oneValuePercent,
                                    e = a.maxValue || 100;
                                C.style.width || (C.style.width = "0%");
                                var f = parseFloat(C.style.width),
                                    g = f + d;
                                g > e && (g = e), C.style.width = g + "%"
                            }
                        }
                    }, s.showUploadedStorySuccessText = function(a) {
                        K.innerHTML = '<div class="ext_modal_just_text_wrap"><span>' + chrome.i18n.getMessage("story_is_added") + '</span></div><div class="ext_modal_buttons_wrap"><button class="ext_btn_ok">' + chrome.i18n.getMessage("btn_ok").toUpperCase() + "</button></div>", r(a), s.style.display = "block", s.opened = 1
                    }, s.showErrorBox = function(a) {
                        K.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_error_modal_wrap"><div class="ext_error_modal_text">' + a + "</div></div>", r(), window.addEventListener("click", m), s.opened = 1, s.style.display = "block"
                    }, s.showUsersListSearch = function(a) {
                        K.innerHTML = '<span class="ext_modal_close">&times;</span><div class="ext_users_search_wrap"></div><div class="ext_users_search_list"></div>', r(a), window.addEventListener("click", m), s.style.display = "block", s.opened = 1
                    }, s.opened = 0, K.innerHTML = "", s
                },
                getShortCode: function(a) {
                    if (!(a instanceof HTMLElement)) return null;
                    if ("a" == a.tagName.toLowerCase()) var b = a;
                    else b = a.querySelector('a[href^="/p/"], a[href^="/tv/"]');
                    if (!b) return null;
                    var c = b.href.match(/\/p\/([^\/]+)/);
                    return c || (c = b.href.match(/\/tv\/([^\/]+)/)), c ? c = c && c[1] : null
                },
                getUserSelfInfo: function() {
                    var b = this;
                    a.sendMessage("getUserSelfInfo", function(a) {
                        a && c.requestOneUserStories(a, function(a) {
                            "object" == typeof a && a.user && a.user.username && (b.authorizedUserName = a.user.username)
                        })
                    })
                },
                checkLinks: function() {
                    var b = document.querySelectorAll('div a[href^="/p/"]').length;
                    0 != b && a.trackEventWithRandom("links_no_found_in_popup", {
                        url: window.location.href,
                        ua: window.navigator.userAgent,
                        aLinksCount: b,
                        mediaContainersInternal: document.querySelectorAll('section > main article > div > div > div a[href^="/p/"]').length,
                        mediaContainersMain: document.querySelectorAll("div > div > article > header + div > div > div").length
                    }, .1)
                },
                switchMultipleMediaPostListener: function(b) {
                    function c(b, c) {
                        var d = b.match(/\/([^\/\.]+)[^\/]+$/);
                        d = d && d[1] && d[1].replace(/[^\d]/g, "");
                        var e = c.match(/\/([^\/\.]+)[^\/]+$/);
                        return e = e && e[1] && e[1].replace(/[^\d]/g, ""), d && e ? d == e : (a.trackEvent("unusual_url_patterns", [b, c]), !1)
                    }

                    function d() {
                        k++, setTimeout(function() {
                            var a = f.querySelector(["video[src]"]),
                                b = f.querySelectorAll("img[src]");
                            if (a) var l = g.getVideoInfo(a, !0);
                            else {
                                if (!b[0]) return void(j > k && d());
                                b.forEach(function(a) {
                                    var b = a.getAttribute("src"); - 1 == b.indexOf("chrome-extension://") && (l = g.getImageInfo(a, 0, !0))
                                })
                            }
                            if (l) {
                                var m = l.url;
                                if (m) {
                                    if (c(i, m)) return void(j > k && d());
                                    h = f.querySelector("." + e.dlBtnClassName), h && h.parentNode && h.parentNode.removeChild(h), e.onGetMediaInfo(f, l)
                                }
                            }
                        }, 200)
                    }
                    var e = this,
                        f = $(b).closest("article > header + div > div").get(0);
                    if (f && !f.querySelector("ul > li")) {
                        var h = f.querySelector("." + e.dlBtnClassName);
                        if (h) {
                            var i = h.dataset.url;
                            if (i) {
                                var j = 20,
                                    k = 0;
                                d()
                            }
                        }
                    }
                },
                getUserName: function(b, c) {
                    var d = null;
                    if (c) {
                        var f = $(b).closest("article").get(0);
                        if (f) {
                            var g = f.querySelector("header > div + div a");
                            d = g && g.getAttribute("href"), d = d && d.replace(/\//g, "")
                        }
                    } else if (e.isSavedMedia() && b) {
                        var h = b.getAttribute("alt");
                        h && (h = h.substr(0, 50), h = a.filename.modify(h), d = h)
                    } else {
                        var i = document.querySelector("._mesn5 ._mainc ._o6mpc ._rf3jb");
                        d = i && i.innerText
                    }
                    return d
                }
            }
        }();
    a.sendMessage("amIMobile", function(a) {
        1 === a ? b.run() : 2 === a || $(document).ready(function() {
            if (location.href.indexOf("instagram.com") > -1) {
                if (!document.body) return;
                g.run()
            }
        })
    })
}();