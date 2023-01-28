function toast(txt) {
  var div = document.createElement('div');
  div.innerHTML = txt;

  div.className = 'toast';

  div.style.position = 'fixed';
  div.style.left = '50%';
  div.style.bottom = '10vh';
  div.style['-webkit-transform'] = 'translateX(-50%)';
  div.style.zIndex = 999999;
  div.style.display = 'inline-block';
  div.style.height = '35px';
  div.style.lineHeight = '35px';
  div.style.background = 'rgba(0,0,0,0.5)';
  div.style.color = '#FFFFFF';
  div.style.textAlign = 'center';
  div.style.fontSize = '15px';
  div.style.borderRadius = '10px';
  div.style.padding = '0px 15px';

  document.body.appendChild(div);
  // 两秒后消失				
  setTimeout(function() {
    div.remove();
  }, 2000);
}
