// كود إدارة واجهة وميزات المكالمات الصوتية والفيديو

let isMuted = false;
let isVideoOff = false;

// إطلاق واجهة المكالمة
function startCall(isVideo = true) {
  let callModal = document.getElementById('call-modal');
  
  if (!callModal) {
    callModal = document.createElement('div');
    callModal.id = 'call-modal';
    callModal.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(15px);
      display: flex; flex-direction: column;
      justify-content: space-between; align-items: center;
      padding: 40px 20px; color: #fff;
    `;
    document.body.appendChild(callModal);
  }

  callModal.style.display = 'flex';
  callModal.innerHTML = `
    <div style="text-align: center; margin-top: 40px;">
      <div style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #d4af37, #8e8e93); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 15px auto;">👤</div>
      <h2 style="font-size: 1.5rem; font-weight: 700;">مكالمة عائلية</h2>
      <p style="opacity: 0.7; font-size: 0.9rem; margin-top: 5px;" id="call-status">جاري الاتصال...</p>
    </div>

    <!-- شبكة الفيديو (عند تفعيل الفيديو) -->
    <div id="video-grid" style="width: 100%; max-width: 400px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 20px; display: ${isVideo ? 'flex' : 'none'}; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2);">
      <span style="opacity: 0.6;">📹 معاينة الفيديو</span>
    </div>

    <!-- أزرار التحكم بالمكالمة -->
    <div style="display: flex; gap: 20px; margin-bottom: 30px;">
      <button onclick="toggleMute()" id="mute-btn" style="width: 55px; height: 55px; border-radius: 50%; border: none; background: rgba(255,255,255,0.2); color: #fff; font-size: 1.3rem; cursor: pointer;">🎤</button>
      <button onclick="toggleVideo()" id="video-btn" style="width: 55px; height: 55px; border-radius: 50%; border: none; background: rgba(255,255,255,0.2); color: #fff; font-size: 1.3rem; cursor: pointer;">📹</button>
      <button onclick="endCall()" style="width: 55px; height: 55px; border-radius: 50%; border: none; background: #ff3b30; color: #fff; font-size: 1.3rem; cursor: pointer;">📞</button>
    </div>
  `;

  setTimeout(() => {
    const status = document.getElementById('call-status');
    if (status) status.innerText = "00:01 - متصل";
  }, 2000);
}

// كتم المايك
function toggleMute() {
  isMuted = !isMuted;
  const btn = document.getElementById('mute-btn');
  if (btn) {
    btn.style.background = isMuted ? '#ff9500' : 'rgba(255,255,255,0.2)';
    btn.innerText = isMuted ? '🔇' : '🎤';
  }
}

// إيقاف الفيديو
function toggleVideo() {
  isVideoOff = !isVideoOff;
  const btn = document.getElementById('video-btn');
  const grid = document.getElementById('video-grid');
  if (btn) {
    btn.style.background = isVideoOff ? '#ff9500' : 'rgba(255,255,255,0.2)';
  }
  if (grid) {
    grid.style.display = isVideoOff ? 'none' : 'flex';
  }
}

// إنهاء المكالمة
function endCall() {
  const callModal = document.getElementById('call-modal');
  if (callModal) {
    callModal.style.display = 'none';
  }
}
