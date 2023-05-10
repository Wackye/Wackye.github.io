var hexCode = "FFFFFF";

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const RGBToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [Math.round(60 * (h < 0 ? h + 6 : h)), Math.round(v && (n / v) * 100), Math.round(v * 100)];
};

function readColorCode() {
  // 使用 querystring 模块获取查询参数
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const colorCode = params.get('color');

  // 设置页面背景颜色
  if (colorCode) {
    hexCode = colorCode;
    document.getElementById("capture").style.backgroundColor = "#" + hexCode;
    document.body.style.backgroundColor = '#' + hexCode;

    var rgbString = 'RGB (' + hexToRgb('#' + hexCode).r + ', '
                        + hexToRgb('#' + hexCode).g + ', '
                        + +hexToRgb('#' + hexCode).b + ')';
    
    var hsbString = 'HSB (' + RGBToHSB(hexToRgb('#' + hexCode).r, 
                                       hexToRgb('#' + hexCode).g, 
                                       hexToRgb('#' + hexCode).b).toString() + ')';

    document.getElementById("hex").innerHTML = "#" + hexCode + '<br>' + rgbString + '<br>' + hsbString;
                    
    // document.getElementById("hex").textContent = "#" + hexCode;
    // var rgbString = 'RGB (' + hexToRgb('#' + hexCode).r + ', '
    //                     + hexToRgb('#' + hexCode).g + ', '
    //                     + +hexToRgb('#' + hexCode).b + ')';                        
    // document.getElementById("rgb").innerHTML = rgbString;
    // document.getElementById("hsb").textContent = 'HSB (' + RGBToHSB(hexToRgb('#' + hexCode).r, hexToRgb('#' + hexCode).g, hexToRgb('#' + hexCode).b).toString() + ')';
  }

}

 
function block_capture() {
    html2canvas(document.querySelector("#capture")).then(function (canvas) {
        a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg", 0.92).replace("image/jpeg", "image/octet-stream");
        a.download = hexCode + '.jpg';
        a.click();
    });
}
