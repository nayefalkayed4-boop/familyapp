// قائمة الأكلات المتنوعة (أكثر من 100 أكلة)
const mealsList = [
  "منسف", "مقلوبة", "شاورما", "بيتزا", "كبسة", "ملوخية", "كباب", "شيخ المحشي", "مسخن", "شيش طاووق",
  "صينية بطاطا بالدجاج", "كوسا محشي", "ورق دوالي", "مجدرة", "فاصوليا بيضاء باللحمة", "بامية باللحمة", "برغر", "فاهيتا", "زنجر", "سمك مشوي",
  "صينية كفتة بالبندورة", "صينية كفتة بالطحينية", "باستا ألفريدو", "سباغيتي بولوكنيز", "كبسة سمك", "مفتول", "قدرة خليلية", "منسف لحم بلدي", "دجاج محشي بالارز", "شوربة عدس ومعجنات", "فول وفلافل", "فتة حمص", "فتة دجاج", "أوزي", "شيش برك", "كبة مقلية", "كبة باللبن", "شوربة كوارع", "عرايس لحمة", "صينية خضار بالفرن",
  "دجاج بروستد", "شاورما عربي", "مك think", "ستيك لحم", "نودلز صيني", "سوشي", "فتوشيني", "لازانيا", "كانيلوني", "بيتزا ببروني",
  "بيتزا خضار", "بيتزا مارجريتا", "كسكسي بالخضار", "طاجن مغربي", "شوربة بحريات", "جمبري مشوي", "سمك فيليه", "سمك دينيس بالفرن", "مقلوبة زهرة", "مقلوبة باذنجان",
  "كوسا وبندورة حفر", "محشي ملفوف", "سلق محشي", "شوربة فريكة", "دجاج شواية", "مظبي دجاج", "مدفون لحم", "من his", "مندي دجاج", "بخاري دجاج",
  "برياني دجاج", "برياني لحم", "كرشات وفوارغ", "لسانات", "كبدة دجاج", "قوانص ودجاج", "شقف لحم مشوي", "ريش غنم", "كباب حلبي", "كباب بالباذنجان",
  "طاجن بامبة باللحمة", "طاجن عكاوي", "مسقعة باذنجان", "شاورما دجاج صاج", "كريب حادق", "كلوب ساندويش", "ساندويش اسكالوب", "فيليه تشيز ستيك", "وجبة زنجر حار", "وجبة زنجر عادي",
  "شاورما لحمة", "كباب خشب", "دجاج تكا", "دجاج تاندوري", "باستا بالجمبري", "شوربة شوفان بالدجاج", "محشي بطاطا", "محشي باذنجان", "قوزي لحم", "مقالي مشكلة"
];

// اختيار 5 أكلات بناءً على تاريخ اليوم
function getDailyMeals() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const selected = [];
  const listCopy = [...mealsList];
  
  for (let i = 0; i < 5; i++) {
    const index = Math.abs((hash + i * 13)) % listCopy.length;
    selected.push(listCopy[index]);
    listCopy.splice(index, 1);
  }
  return selected;
}

// عرض خيارات التصويت في الصفحة
function renderVotingOptions() {
  const container = document.getElementById('voting-options-container');
  if(!container) return;
  
  const dailyMeals = getDailyMeals();
  const savedVotes = JSON.parse(localStorage.getItem('family_votes') || '{}');
  const userVoted = localStorage.getItem('user_voted_meal');

  container.innerHTML = '';

  dailyMeals.forEach((meal, index) => {
    const voteCount = savedVotes[meal] || 0;
    const isSelected = userVoted === meal;

    const optionEl = document.createElement('div');
    optionEl.style.cssText = `
      background: var(--card-bg);
      border: 1px solid ${isSelected ? '#d4af37' : 'var(--border-color)'};
      padding: 12px 16px;
      margin-bottom: 10px;
      border-radius: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    optionEl.innerHTML = `
      <span style="font-weight: 600;">${meal} ${isSelected ? '✅' : ''}</span>
      <span style="font-size: 0.85rem; opacity: 0.8;">${voteCount} أصوات</span>
    `;

    optionEl.onclick = () => castVote(meal);
    container.appendChild(optionEl);
  });
}

// تسجيل الصوت
function castVote(meal) {
  let savedVotes = JSON.parse(localStorage.getItem('family_votes') || '{}');
  const previousVote = localStorage.getItem('user_voted_meal');

  if (previousVote && savedVotes[previousVote]) {
    savedVotes[previousVote] = Math.max(0, savedVotes[previousVote] - 1);
  }

  savedVotes[meal] = (savedVotes[meal] || 0) + 1;
  localStorage.setItem('family_votes', JSON.stringify(savedVotes));
  localStorage.setItem('user_voted_meal', meal);

  renderVotingOptions();
}

// تشغيل العرض عند فتح الصفحة
document.addEventListener('DOMContentLoaded', renderVotingOptions);
