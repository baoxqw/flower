window.onload = function () {
    var oEnlargeBox= document.getElementById('enlarge-box');
    var oSmallBox  = document.getElementById('small-box');
    var aSmallImg  = Array.from(oSmallBox.children);
    var oMiddleImg = document.getElementById('middle-img');
    var oLargeBox  = document.getElementById('large-box');
    var oLargeImg  = document.getElementById('large-img');
    var oMiddleBox = document.getElementById('middle-box');
    var oShadow    = document.getElementById('shadow');

    // 选项开效果
    aSmallImg.forEach((v) => {
        v.addEventListener('mouseenter', (() => {
            aSmallImg.forEach((m) => {
                m.className = '';
            });
            v.className = 'active';
            oMiddleImg.src = v.src;
            oLargeImg.src  = v.src;
        }).bind(v));
    });

    // 放大镜效果
    var iMaxL = oMiddleBox.offsetWidth  - oShadow.offsetWidth;
    var iMaxT = oMiddleBox.offsetHeight - oShadow.offsetHeight;
    oMiddleBox.addEventListener('mousemove', (ev) => {
        var e = ev || window.event;

        var
            iL = e.clientX - oEnlargeBox.offsetLeft - oShadow.offsetWidth / 2;
            iT = e.clientY - oEnlargeBox.offsetTop  - oShadow.offsetHeight / 2;


        iL = Math.max(iL , 0);
        iT = Math.max(iT , 0);
        iL = Math.min(iL , iMaxL);
        iT = Math.min(iT, iMaxT);


        // 大图移动的距离和遮罩层移动的距离的比例关系
        // iShadowCurL / iShadowMaxL = iImgCurL / iImgMaxL

        var iBigImgL = iL * (oLargeImg.offsetWidth - oLargeBox.offsetWidth) / iMaxL;
        var iBigImgT = iT * (oLargeImg.offsetHeight - oLargeBox.offsetHeight) / iMaxT;


        oShadow.style.left = iL + 'px';
        oShadow.style.top  = iT + 'px';

        oLargeImg.style.left = -iBigImgL + 'px';
        oLargeImg.style.top  = -iBigImgT + 'px';
    });
    oMiddleBox.addEventListener('mouseenter', () => {
        oLargeBox.style.display = 'block';
    });
    oMiddleBox.addEventListener('mouseleave', () => {
        oShadow.style.left = '-1000px';
        oLargeBox.style.display = 'none';
    });
};