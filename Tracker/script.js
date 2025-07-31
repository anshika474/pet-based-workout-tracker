const petImage = document.getElementById('pet-image');
const motivationText = document.getElementById('motivation-text');

// Use local date in YYYY-MM-DD
function getTodayKey() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight
  return today.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
}

function getWorkoutData() {
  return JSON.parse(localStorage.getItem('workoutLog') || '{}');
}

function saveWorkoutData(data) {
  localStorage.setItem('workoutLog', JSON.stringify(data));
}

function logWorkout() {
  const data = getWorkoutData();
  data[getTodayKey()] = 'done';  // Use string
  saveWorkoutData(data);
  updateUI();
}

function missedWorkout() {
  const data = getWorkoutData();
  data[getTodayKey()] = 'not_done';  // Use string
  saveWorkoutData(data);
  updateUI();
}


function updateUI() {
  const data = getWorkoutData();
  const todayKey = getTodayKey();
  const status = data[todayKey];

  const todayBox = document.getElementById('today-box');
  const petImage = document.getElementById('pet-image');
  const motivationText = document.getElementById('motivation-text');

  todayBox.classList.remove('done', 'not-done');

  if (status === 'done') {
    petImage.src = 'happy.gif';
    motivationText.innerText = "Yay! You did your workout today!";
    todayBox.classList.add('done');
  } else if (status === 'not_done') {
    petImage.src = 'sad.gif';
    motivationText.innerText = "Oh no! Let's get moving tomorrow!";
    todayBox.classList.add('not-done');
  } else {
    petImage.src = 'neutral.gif';
    motivationText.innerText = "Hello! Hope you feed me a workout today 🥕";
  }

  renderWeek(data);
  renderMonth(data);
}





function renderWeek(data) {
  const weeklyView = document.getElementById('weekly-view');
  weeklyView.innerHTML = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    date.setHours(0, 0, 0, 0);
    const key = date.toLocaleDateString('en-CA');

    const box = document.createElement('div');
    box.className = 'day-box';

    if (data[key] === 'done') {
      box.classList.add('active'); // Green
    } 
    else if (data[key] === 'not_done') {
      box.classList.add('missed'); // Red
    } 
    else if (date < today) {
      box.classList.add('missed'); // Red for past days not marked
    } 
    else {
      box.classList.add('inactive'); // Gray
    }

    box.innerText = date.getDate();
    weeklyView.appendChild(box);
  }
}

function renderMonth(data) {
  const monthlyView = document.getElementById('monthly-view');
  monthlyView.innerHTML = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    date.setHours(0, 0, 0, 0);
    const key = date.toLocaleDateString('en-CA');

    const box = document.createElement('div');
    box.className = 'day-box';

    if (data[key] === 'done') {
      box.classList.add('active'); // Green
    } 
    else if (data[key] === 'not_done') {
      box.classList.add('missed'); // Red
    } 
    else if (date < today) {
      box.classList.add('missed'); // Red for past days not marked
    } 
    else {
      box.classList.add('inactive'); // Gray
    }

    box.innerText = i;
    monthlyView.appendChild(box);
  }
}

// Initial render
updateUI();
