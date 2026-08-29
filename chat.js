// كود إدارة الشات والمرفقات والمواقع
const chatMessagesContainer = document.getElementById('chat-messages-container');

// مصفوفة لتخزين الرسائل مؤقتاً بالواجهة
let messages = [
  { id: 1, sender: "التطبيق", text: "أهلاً بك في familyapp! تقدر تبدأ المحادثة الآن.", time: "12:00 PM", isMe: false }
];

// عرض الرسائل في الشاشة
function renderMessages() {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  container.innerHTML = `
    <div class="chat-input-wrapper" style="margin-bottom: 15px; display: flex; gap: 8px; flex-wrap: wrap;">
      <input type="text" id="message-input" placeholder="اكتب رسالتك هنا..." style="flex: 1; padding: 10px 14px; border-radius: 20px; border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-primary); outline: none;">
      <button onclick="sendMessage()" style="padding: 10px 18px; border-radius: 20px; border: none; background: #d4af37; color: #fff; font-weight: bold; cursor: pointer;">إرسال</button>
    </div>
    <div class="attachments-bar" style="display: flex; gap: 10px; margin-bottom: 15px; overflow-x: auto; padding-bottom: 5px;">
      <button class="icon-btn" onclick="triggerFileUpload('image/*')">📷 صورة</button>
      <button class="icon-btn" onclick="triggerFileUpload('video/*')">🎥 فيديو</button>
      <button class="icon-btn" onclick="triggerFileUpload('*/*')">📄 مستند</button>
      <button class="icon-btn" onclick="sendLocation()">📍 موقعي</button>
    </div>
    <input type="file" id="hidden-file-input" style="display: none;" onchange="handleFileSelected(event)">
    <div id="messages-list-inner" style="display: flex; flex-direction: column; gap: 10px;"></div>
  `;

  const listInner = document.getElementById('messages-list-inner');
  messages.forEach(msg => {
    const msgCard = document.createElement('div');
    msgCard.style.cssText = `
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 0.95rem;
      align-self: ${msg.isMe ? 'flex-end' : 'flex-start'};
      background: ${msg.isMe ? 'var(--accent-gold)' : 'var(--card-bg)'};
      color: ${msg.isMe ? '#3d342b' : 'var(--text-primary)'};
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow);
    `;
    msgCard.innerHTML = `
      <div style="font-size: 0.75rem; font-weight: bold; opacity: 0.7; margin-bottom: 3px;">${msg.sender}</div>
      <div>${msg.text}</div>
      <div style="font-size: 0.65rem; opacity: 0.6; text-align: left; margin-top: 4px;">${msg.time}</div>
    `;
    listInner.appendChild(msgCard);
  });
}

// إرسال نص
function sendMessage() {
  const input = document.getElementById('message-input');
  if (!input || !input.value.trim()) return;

  const newMsg = {
    id: Date.now(),
    sender: "أنا",
    text: input.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isMe: true
  };

  messages.push(newMsg);
  input.value = '';
  renderMessages();
}

// محاكاة إرفاق ملف
function triggerFileUpload(acceptType) {
  const fileInput = document.getElementById('hidden-file-input');
  if (fileInput) {
    fileInput.accept = acceptType;
    fileInput.click();
  }
}

function handleFileSelected(event) {
  const file = event.target.files[0];
  if (file) {
    const newMsg = {
      id: Date.now(),
      sender: "أنا",
      text: `📎 تم إرفاق ملف: ${file.name}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    messages.push(newMsg);
    renderMessages();
  }
}

// إرسال الموقع الجغرافي
function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const newMsg = {
        id: Date.now(),
        sender: "أنا",
        text: `📍 موقعي الحالي: https://maps.google.com/?q=${lat},${lon}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      messages.push(newMsg);
      renderMessages();
    }, () => {
      alert("تعذر تحديد الموقع الجغرافي.");
    });
  }
}

// تشغيل العرض الأول لشاشة المحادثات
document.addEventListener('DOMContentLoaded', renderMessages);
