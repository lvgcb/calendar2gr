let currentDate = new Date();
let schedules = {
    "Пн": ["Тарих", "Физика", "Матем", "Информатика", "Физика", "Орыс Тили", "Матем"],
    "Вт": ["Информатика", "Математика", "Математика", "Физика", "Физра", "Биология", "Матем"],
    "Ср": ["Адебиет", "Тарих", "Агылшын", "Химия", "МАтем", "Казак тили", "Биология"],
    "Чт": ["Тарих", "Агылшын", "Казак тили", "Информатика", "Матем", "География", "Физика"],
    "Пт": ["География", "Дене", "ГОрыс тиди", "Физика", "Химия", "Агылшын", "Информатика"],
    "Сб": ["Отдых", "", "", "", ""],
    "Вс": ["Отдых", "", "", "", ""]
};

let homework = {};

function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const datesContainer = document.getElementById("dates");

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    monthYear.textContent = `${currentDate.toLocaleString('ru-RU', { month: 'long' })} ${year}`;
    datesContainer.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const firstDayPosition = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

    for (let i = 0; i < firstDayPosition; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("date");
        datesContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dateCell = document.createElement("div");
        dateCell.classList.add("date");
        dateCell.textContent = day;
        dateCell.onclick = () => openModal(day);
        datesContainer.appendChild(dateCell);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function openModal(day) {
    const modal = document.getElementById("modal");
    const modalDate = document.getElementById("modal-date");
    const scheduleContainer = document.getElementById("schedule-container");

    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const dayOfWeek = weekDays[new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay() - 1];

    modalDate.textContent = `Расписание на ${day} ${currentDate.toLocaleString('ru-RU', { month: 'long' })} ${currentDate.getFullYear()}`;

    // Очищаем контейнер перед добавлением расписания
    scheduleContainer.innerHTML = '';

    // Загружаем расписание для выбранного дня недели
    const schedule = schedules[dayOfWeek] || [];
    schedule.forEach((subject, index) => {
        if (subject) {
            const header = document.createElement("h3");
            header.textContent = subject; // Урок как заголовок
            scheduleContainer.appendChild(header);
            
            const homeworkInput = document.createElement("input");
            homeworkInput.type = "text";
            homeworkInput.placeholder = "Введите домашнее задание";
            homeworkInput.value = homework[`${dayOfWeek}-${index}`] || ''; // Загружаем предыдущее домашнее задание
            homeworkInput.onchange = () => {
                homework[`${dayOfWeek}-${index}`] = homeworkInput.value.trim(); // Сохраняем домашнее задание
            };
            scheduleContainer.appendChild(homeworkInput);
        }
    });

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // Скрываем модальное окно
}

function saveSchedule() {
    alert('Сохранение расписания не предусмотрено в этом режиме.');
}

// Инициализация календаря
renderCalendar();
