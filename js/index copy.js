// new.html
function getData(num) {
    // 获取时间戳
    let timestamp = Date.parse(new Date());
    const url = "json/data.json?time=" + timestamp;
    $.get(url, function(res) {
        $("#pages").html(' ');
        let i = (num - 1) * 3;
        let j = i + 3;
        // 获取时间戳
        let timestamp = Date.parse(new Date());
        const resData = res.data;
        for (i; i < j; i++) {

            const dom = `<div class="lis clearfix">
                            <div class="time_li">
                                <p class="ti_li_p"><i class="time_bg"></i><span>
                                    ` + resData[i].time + `</span></p>
                            </div>
                            <div class="new_im">
                                <img src="` + resData[i].img + `" alt="">
                            </div>
                            <div class="det_new">
                                <p class="p_tit">` + resData[i].title + `</p>
                                <p class="p_cont">` + resData[i].content + `</p>
                                <a href="newsInfo.html?id=` + i + `&time=` + timestamp + `">查看更多 ></a>
                            </div>
                        </div>`;
            $("#pages").append(dom);
        };
    })

}
// newsInfo.html
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function recommendRead(res, val) {
    let newVal = parseInt(val);
    if (newVal !== 0) {
        newVal -= 1;
    } else {
        newVal = 0;
        $("#last").css("display", "none");
    }
    const four = newVal + 5;
    const thr = newVal + 2;
    // 从每周推文里面选
    for (let i = newVal; i < four; i++) {
        let objData = res.data[i].title;
        // 获取时间戳
        let timestamp = Date.parse(new Date());
        let importNew = `<li><a href="./newsInfo.html?id=` + i + `&time=` + timestamp + `"><p>
                       ` + objData + `</p></a></li>`;
        $(".tj_list").append(importNew);
    }

};

function go(action, val) {
    let newVal = parseInt(val);
    if (action == "last") {
        if (newVal !== 0) {
            newVal -= 1;
        } else {
            newVal = 0;
        }
        // 获取时间戳
        let timestamp = Date.parse(new Date());
        const urlLast = `./newsInfo.html?id=` + parseInt(newVal) + `&time=` + timestamp;

        $("#last").attr("href", urlLast);
    } else {
        newVal += 1;
        // 获取时间戳
        let timestamp = Date.parse(new Date());
        const urlNext = `./newsInfo.html?id=` + parseInt(newVal) + `&time=` + timestamp;
        $("#next").attr("href", urlNext);
    }
}

function insertNews(res) {
    const val = getQueryVariable("id");
    // 新闻内容和图片模块
    const obj = res.data[val].data_new;

    for (let key in obj) {
        let rexp = /^p/;
        let rexi = /^img/;
        if (rexp.test(key)) {
            const dom_p = `<p>` + obj[key] + `</p>`;
            $(".t-tool").before(dom_p);
        } else if (rexi.test(key)) {
            const dom_img = `<img src="` + obj[key] + `" alt="大眼猫科技">`;
            $(".t-tool").before(dom_img);
        } else {
            const dom_h = `<h2><span>` + obj[key] + `</span></h2>`;
            $(".t-tool").before(dom_h);
        }
    }
    // 时间模块
    const newsTime = `发布时间： ` + res.data[val].time;
    $("#dom_h").append(newsTime);
    // 标题模块
    const newsTitle = res.data[val].title;
    $("#dom_h1").text(newsTitle);
    // 上一篇
    go("last", val);
    // 下一篇
    go("next", val);
    // 推荐阅读
    recommendRead(res, val);
}