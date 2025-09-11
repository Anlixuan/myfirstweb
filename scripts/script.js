document.addEventListener('DOMContentLoaded', function () {
  // 1. 获取页面关键元素（增加存在性判断，避免报错）
  const modal = document.getElementById('qqModal');
  const btn = document.getElementById('showQqBtn');
  const span = document.getElementsByClassName('close-btn')[0];
  const qqQrcode = document.querySelector('.qq-qrcode');
  const audio = document.querySelector('audio');

  //点击切换图片
  const myImage = document.querySelector("img");
  myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "/myfirstweb/images/my-image.jpg") {
    myImage.setAttribute("src", "/myfirstweb/images/me.jpg");
  } else {
    myImage.setAttribute("src", "/myfirstweb/images/my-image.jpg");
  }
};


  // 2. 二维码弹窗核心功能（修复重复事件，增加图片加载判断）
  if (modal && btn && span && qqQrcode) {
    // 打开弹窗：确保二维码图片加载完成后再显示，避免空白
    btn.onclick = function () {
      // 图片已加载完成，直接打开弹窗
      if (qqQrcode.complete) {
        openModal();
      } 
      // 图片未加载完成，等待加载后再打开
      else {
        qqQrcode.onload = openModal;
        // 兼容图片加载失败的情况
        qqQrcode.onerror = function () {
          alert('二维码图片加载失败，请检查路径');
        };
      }
    };

    // 打开弹窗的统一函数（减少冗余代码）
    function openModal() {
      modal.style.display = 'block';
      // 延迟添加show类，触发过渡动画（避免动画失效）
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
    }

    // 关闭弹窗：点击关闭按钮
    span.onclick = function () {
      closeModal();
    };

    // 关闭弹窗：点击弹窗外部空白区域
    window.onclick = function (event) {
      if (event.target === modal) {
        closeModal();
      }
    };

    // 关闭弹窗的统一函数（确保动画完整执行）
    function closeModal() {
      modal.classList.remove('show');
      // 等待透明度/缩放动画结束后，再隐藏弹窗
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  }

  // 3. 音频播放器交互：播放时加粉色阴影，暂停时取消
  if (audio) {
    const audioContainer = document.querySelector('.audio-player');
    if (audioContainer) {
      // 播放状态：添加阴影
      audio.addEventListener('play', function () {
        audioContainer.style.boxShadow = '0 0 15px rgba(216, 94, 131, 0.5)';
        audioContainer.style.transition = 'box-shadow 0.3s ease';
      });

      // 暂停状态：移除阴影
      audio.addEventListener('pause', function () {
        audioContainer.style.boxShadow = 'none';
      });

      // 兼容音频播放失败的情况
      audio.onerror = function () {
        alert('音频加载失败，请检查文件路径或格式');
      };
    }
  }
});