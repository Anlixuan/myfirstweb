document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('qqModal');
  const btn = document.getElementById('showQqBtn');
  const span = document.getElementsByClassName('close-btn')[0];
  const qqQrcode = document.querySelector('.qq-qrcode');
  const audio = document.querySelector('audio');

  // 点击旋转过渡切换图片
  const myImage = document.querySelector(".profile-img"); 
  if (myImage) { 
    myImage.onclick = () => {
      const mySrc = myImage.getAttribute("src");
      myImage.style.transition = "all 0.5s ease";
      myImage.style.transform = "rotate(180deg)"; 
      setTimeout(() => {
        if (mySrc === "/myfirstweb/images/my-image.jpg"){
          myImage.setAttribute("src", "/myfirstweb/images/me.jpg");
        } else {
          myImage.setAttribute("src", "/myfirstweb/images/my-image.jpg");
        }
        setTimeout(() => {
          myImage.style.transform = "rotate(0)";
        }, 50);
      }, 300);
    };
  }


  // 二维码弹窗
  if (modal && btn && span && qqQrcode) {
    btn.onclick = function () {
      if (qqQrcode.complete) {
        openModal();
      } 
      else {
        qqQrcode.onload = openModal;
        qqQrcode.onerror = function () {
          alert('二维码图片加载失败，请检查路径');
        };
      }
    };
    function openModal() {
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
    }
    span.onclick = function () {
      closeModal();
    };
    window.onclick = function (event) {
      if (event.target === modal) {
        closeModal();
      }
    };
    function closeModal() {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  }

  // 音频播放器
  if (audio) {
    const audioContainer = document.querySelector('.audio-player');
    if (audioContainer) {
      audio.addEventListener('play', function () {
        audioContainer.style.boxShadow = '0 0 15px rgba(216, 94, 131, 0.5)';
        audioContainer.style.transition = 'box-shadow 0.3s ease';
      });
      audio.addEventListener('pause', function () {
        audioContainer.style.boxShadow = 'none';
      });
      audio.onerror = function () {
        alert('音频加载失败，请检查文件路径或格式');
      };
    }
  }
});
