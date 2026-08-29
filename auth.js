// إدارة الحسابات، التوثيق، وصلاحيات الأدمن

// بيانات المستخدم الحالي
let currentUser = JSON.parse(localStorage.getItem('family_user')) || {
  id: "user_" + Date.now(),
  name: "مستخدم عائلي",
  avatar: "",
  isAdmin: true, // حسابك الأساسي كـ Admin
  isVerified: true
};

// حفظ الحساب
function saveUserProfile(name, avatarUrl) {
  currentUser.name = name || currentUser.name;
  currentUser.avatar = avatarUrl || currentUser.avatar;
  localStorage.setItem('family_user', JSON.stringify(currentUser));
  alert("تم تحديث بيانات الملف الشخصي بنجاح!");
}

// إضافة علامة التوثيق (حسَب صلاحيات الأدمن فقط)
function toggleVerification(targetUserId) {
  if (!currentUser.isAdmin) {
    alert("عذراً، عملية التوثيق تتم فقط من حساب الأدمن الرئيسي!");
    return;
  }
  
  // تنفيذ التوثيق للحساب المستهدف
  alert(`تم تغيير حالة التوثيق للمستخدم: ${targetUserId}`);
}

// عرض شارة التوثيق بجانب الاسم
function getVerifiedBadgeHTML(user) {
  if (user.isVerified) {
    return `<span title="حساب موثق" style="color: #d4af37; margin-left: 4px; font-size: 0.9rem;">✔</span>`;
  }
  return '';
}

// تجهيز البيئة عند الفتح
document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('family_user', JSON.stringify(currentUser));
});
