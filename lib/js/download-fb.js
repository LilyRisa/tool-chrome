var dl_link = "https://mangxahoi.club/facebook/server/download/download.php?url=";
var icon_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAq0lEQVRIx2NgIAD+EwCE9BMEoxaMWjBqwVCz4N+/f72EDCQEQGbgtODnz59MQAVLKTB8KcgMvL748+cPG1DhbjIM3w3SS1RQ/f37lw+o4SwJhp8F6SEpPoAaJIAa7xJh+F2QWrJSEFCjCtCAl3gMfwlSQ5bhSCnLBIg/YzH8M0iOIsORLHED4p9Ihv8EiVHFcCRLYoD4LxTHUNVwJEtKQJgmhtMEEJsPBtQCAObvSlQB+LV+AAAAAElFTkSuQmCC";
function _getVideoData() {
    return {}
}

function bottomBtn(e, t, n) {
    _getVideoData(e), $.isNumeric(e) ? (t.find("#getfvid-" + e).length || (n.after("<div id='getfvid-" + e + "' class='getfvid'><div class='buttonBtnDownloader'><div class='clearfix'><div class='poweredBy'><a target='_blank' href='https://www.facebook.com/bo.cuaban.7169' title='Facebook Video Downloader'>Create by <b>VANMIN</b></a></div><div class='linksBtn download-buttons'> <b><span class='img _55ym _55yq _55yo _3-8h' aria-busy='true' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuetext='Loading...'></span></b></div></div></div></div></div>"), t.addClass("has-getfvid")), $.get("https://www.facebook.com/video/embed?video_id=" + e, function(n) {
        var thumb = 'https://graph.facebook.com/'+e+'/picture/';
        var con = "&i=" + encodeURIComponent(thumb)
        var o = null,
            a = null,
            i = n.split('sd_src:"');
        void 0 === i[1] && (i = n.split('sd_src":"')), void 0 !== i[1] && (o = (o = (o = (i = i[1].split('"'))[0]).replace(/\\/g, "")).replace(/u0025/g, "%")), void 0 === (i = n.split('hd_src:"'))[1] && (i = n.split('hd_src":"')), void 0 !== i[1] && (a = (a = (a = (i = i[1].split('"'))[0]).replace(/\\/g, "")).replace(/u0025/g, "%")), null !== o || null !== a ? (n = null === o ? "SD isn't available " : "<a class='btn btn-default download-sd' target='_blank' href='"+dl_link + btoa(o)+con+"' title='Download SD video'" + e + ">Download SD</a>", a = null === a ? " HD isn't available" : "<a class='btn btn-primary text-bold download-hd' target='_blank' href='"+dl_link + btoa(a)+con+"' title='Download HD video'" + e + ">Download HD</a> ", $("#getfvid-" + e + " .download-buttons", t).html(n + a)) : $.get("https://www.facebook.com/" + e, function(n) {
            var o = null,
                a = null,
                i = n.split('sd_src:"');
            void 0 === i[1] && (i = n.split('sd_src":"')), void 0 !== i[1] && (o = (o = (o = (i = i[1].split('"'))[0]).replace(/\\/g, "")).replace(/u0025/g, "%")), void 0 === (i = n.split('hd_src:"'))[1] && (i = n.split('hd_src":"')), void 0 !== i[1] && (a = (a = (a = (i = i[1].split('"'))[0]).replace(/\\/g, "")).replace(/u0025/g, "%")), null === o && null === a ? $("#getfvid-" + e + " .download-buttons", t).html("<p class='txt-no-links'>This video doesn't have any download links</p>") : (n = null === o ? "SD isn't available " : "<a class='btn btn-default download-sd' target='_blank' href='"+dl_link + btoa(o)+con +"' title='Download SD video'" + e + ">Download SD</a>", a = null === a ? " HD isn't available" : "<a class='btn btn-primary text-bold download-hd' target='_blank' href='"+dl_link + btoa(a)+con + "' title='Download HD video'" + e + ">Download HD</a> ", $("#getfvid-" + e + " .download-buttons", t).html(n + a))
        }), t.addClass("has-getfvid")
    })) : (n.after("<div id='getfvid-" + e + "' class='getfvid'><div class='buttonBtnDownloader'>.userContent:lastwidthPlease right click on video -> Show video URL -> Copy Url -> Paste Url to new tab. Download buttons will be shown under video. <br /></div></div>"), t.addClass("has-getfvid"))
}

function bottomBtnDownload() {
    if ($(".fbUserPost:not(.has-downloader), .fbUserStory:not(.has-downloader), .userContentWrapper:not(.has-downloader)").each(function(e) {
            var t = (e = $(this)).find(".userContent:last").parent(),
                n = !1;
            if (e.find("video").each(function() {
                    100 < $(this).attr("width") && (n = !0)
                }), n) {
                var o = null,
                    a = e.find("a[rel=theater]").attr("href");
                void 0 !== a && (o = a.replace(/.+\/(\d+)\/?.*/i, "$1")), $.isNumeric(o) || $("a", e).each(function(e) {
                    e = $(this).attr("ajaxify");
                    var t = $(this).attr("href");
                    if (void 0 !== e && (o = e.replace(/.+;id=(\d+).*/i, "$1")), $.isNumeric(o) || void 0 === t || (o = t.replace(/.+videos\/(\d+)\/?.*/i, "$1")), $.isNumeric(o)) return !1
                }), $.isNumeric(o) || (o = e.find("input[name=ft_ent_identifier]").val()), bottomBtn(o, e, t)
            }
        }), $("#permalink_video_pagelet").length) {
        var e = $("#permalink_video_pagelet").parent().parent();
        if (e.hasClass("has-getfvid")) return !1;
        var t = $("#permalink_video_pagelet").parent(),
            n = $(location).attr("href");
        bottomBtn((e = /.+videos\/(\d+)\/?/gi.exec(n))[1], e, t)
    }
}

setInterval(function() {
    bottomBtnDownload()
}, 2e3);