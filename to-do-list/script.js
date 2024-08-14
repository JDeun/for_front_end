// DOM 요소 선택
const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const countElement = document.getElementById('count');
const remainingDoneElement = document.getElementById('remaining_done');
const countDoneElement = document.getElementById('count_done');

// 날짜 표시 요소
const todayElement = document.getElementById('today');
const dayMonthElement = document.getElementById('daymonth');
const monthElement = document.getElementById('month');

// 전역 변수
let tasks = []; // 할 일 목록을 저장할 배열

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    init(); // 앱 초기화
});

// 날짜 업데이트 함수
function updateDate() {
    const now = new Date();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    document.getElementById('today').textContent = days[now.getDay()];
    document.getElementById('daymonth').textContent = `${now.getDate()}일`;
    document.getElementById('month').textContent = months[now.getMonth()];
}

// 할 일 추가 이벤트 리스너
addTaskBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// 할 일 추가 함수
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(), // 유니크한 ID 생성
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTask(task);
        newTaskInput.value = ''; // 입력 필드 초기화
        saveTasks();
        updateCounts();
    }
}

// 할 일 렌더링 함수
function renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        <button class="check-button" aria-label="할 일 완료 표시">
            <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}" aria-hidden="true"></i>
        </button>
        <div class="task-content">
            <p ${task.completed ? 'class="line-through"' : ''} contenteditable="true">${task.text}</p>
        </div>
        <button class="delete-button" aria-label="할 일 삭제">
            <i class="fas fa-times-circle" aria-hidden="true"></i>
        </button>
    `;

    // 이벤트 리스너 추가
    li.querySelector('.check-button').addEventListener('click', () => toggleTask(task.id));
    li.querySelector('.delete-button').addEventListener('click', () => deleteTask(task.id));
    li.querySelector('p').addEventListener('blur', (e) => updateTaskText(task.id, e.target.textContent));

    taskList.appendChild(li);
}

// 할 일 토글 함수
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        updateCounts();
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            const icon = taskElement.querySelector('.check-button i');
            const text = taskElement.querySelector('.task-content p');
            icon.classList.toggle('fa-circle');
            icon.classList.toggle('fa-check-circle');
            text.classList.toggle('line-through');
            taskElement.classList.toggle('completed');
        }
    }
}

// 할 일 삭제 함수
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    updateCounts();
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    if (taskElement) taskElement.remove();
}

// 할 일 텍스트 업데이트 함수
function updateTaskText(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        saveTasks();
    }
}

// 로컬 스토리지에 할 일 저장
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 로컬 스토리지에서 할 일 불러오기
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
        updateCounts();
    }
}

// 카운트 업데이트 함수
function updateCounts() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const remainingTasks = totalTasks - completedTasks;

    // DOM 요소 업데이트
    countElement.textContent = totalTasks;
    remainingDoneElement.textContent = remainingTasks;
    countDoneElement.textContent = completedTasks;
}

// 할 일 목록 초기화 함수
function initTaskList() {
    taskList.innerHTML = ''; // 기존 목록 초기화
    tasks.forEach(task => renderTask(task)); // 모든 할 일 다시 렌더링
}

// 할 일 정렬 함수 (미완료 항목을 위로)
function sortTasks() {
    tasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });
    initTaskList(); // 정렬 후 목록 다시 렌더링
    saveTasks(); // 변경된 순서 저장
}

// 모든 할 일 완료/미완료 토글 함수
function toggleAllTasks() {
    const allCompleted = tasks.every(task => task.completed);
    tasks.forEach(task => task.completed = !allCompleted);
    initTaskList();
    saveTasks();
    updateCounts();
}

// 완료된 할 일 모두 삭제 함수
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    initTaskList();
    saveTasks();
    updateCounts();
}

// 매일 자정에 날짜 업데이트
function scheduleMidnightUpdate() {
    const now = new Date();
    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // 다음날
        0, 0, 0 // 자정
    );
    const msToMidnight = night.getTime() - now.getTime();

    setTimeout(function() {
        updateDate();
        scheduleMidnightUpdate(); // 다음 자정을 위해 재귀 호출
    }, msToMidnight);
}

// 앱 초기화 함수
function init() {
    loadTasks();
    updateDate();
    updateCounts();
    scheduleMidnightUpdate();
    
    // 추가 기능을 위한 이벤트 리스너 (HTML에 해당 버튼이 있다고 가정)
    // document.getElementById('sort-tasks').addEventListener('click', sortTasks);
    // document.getElementById('toggle-all').addEventListener('click', toggleAllTasks);
    // document.getElementById('clear-completed').addEventListener('click', clearCompletedTasks);
}

// 앱 초기화
init();