
let userData = {
    name: "Alex Johnson",
    skills: [
        { name: "JavaScript", level: "Advanced", percentage: 75 },
        { name: "HTML/CSS", level: "Expert", percentage: 90 },
        { name: "React", level: "Intermediate", percentage: 50 },
        { name: "Node.js", level: "Beginner", percentage: 25 }
    ],
    overallProgress: {
        coding: 65,
        design: 45
    },
    monthlyProgress: [
        { month: "Jan", progress: 20 },
        { month: "Feb", progress: 35 },
        { month: "Mar", progress: 50 },
        { month: "Apr", progress: 65 },
        { month: "May", progress: 75 }
    ],
    badges: [
        { name: "HTML Master", icon: "🏆", earned: true },
        { name: "CSS Pro", icon: "⭐", earned: true },
        { name: "JS Rookie", icon: "🚀", earned: true },
        { name: "React Guru", icon: "🔒", earned: false }
    ],
    weeklyGoals: {
        studyHours: { current: 8, target: 10 },
        projects: { current: 2, target: 3 }
    },
    assessments: {
        javascript: [
            { id: 1, question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"], answer: 0 },
            { id: 2, question: "Which is NOT a JavaScript data type?", options: ["Number", "Boolean", "Character", "Object"], answer: 2 },
            { id: 3, question: "What is the correct way to create a function in JavaScript?", options: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create myFunction()"], answer: 1 }
        ],
        react: [
            { id: 1, question: "What is JSX?", options: ["JavaScript XML", "JavaScript Extension", "Java Syntax XML", "JavaScript Extra"], answer: 0 },
            { id: 2, question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: 1 },
            { id: 3, question: "What does the Virtual DOM do?", options: ["Makes DOM manipulation faster", "Reduces memory usage", "Enables server-side rendering", "All of the above"], answer: 0 }
        ]
    },
    learningPath: [
        { order: 1, title: "Advanced JavaScript Concepts", description: "Recommended based on your latest assessment results" },
        { order: 2, title: "React State Management", description: "Improve your React skills with advanced state patterns" },
        { order: 3, title: "Node.js Fundamentals", description: "Build on your beginner knowledge with practical exercises" }
    ]
};

// =============== LOCAL STORAGE MANAGEMENT ===============
// Initialize data from local storage or use default
function initializeData() {
    const storedData = localStorage.getItem('progressTrackerData');
    if (storedData) {
        userData = JSON.parse(storedData);
    }
    renderDashboard();
}

// Save data to local storage
function saveData() {
    localStorage.setItem('progressTrackerData', JSON.stringify(userData));
}

// =============== UI RENDERING FUNCTIONS ===============
// Render the entire dashboard
function renderDashboard() {
    renderSkillsProgress();
    renderCharts();
    renderLineGraph();
    renderBadges();
    renderWeeklyGoals();
    renderLearningPath();
}

// Render skills progress bars
function renderSkillsProgress() {
    const skillsContainer = document.querySelector('.skills-container');
    skillsContainer.innerHTML = '';

    userData.skills.forEach(skill => {
        const skillLevel = getLevelClass(skill.percentage);
        
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level} (${skill.percentage}%)</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar ${skillLevel}" style="width: ${skill.percentage}%"></div>
            </div>
        `;
        
        skillsContainer.appendChild(skillElement);
    });
}

// Helper to get appropriate CSS class based on skill percentage
function getLevelClass(percentage) {
    if (percentage <= 25) return 'beginner';
    if (percentage <= 50) return 'intermediate';
    if (percentage <= 75) return 'advanced';
    return 'expert';
}

// Render the radial charts
function renderCharts() {
    // Coding skills chart
    const codingProgress = document.querySelector('.radial-progress.coding');
    const codingValue = document.querySelector('.radial-inner:not(.design)');
    codingProgress.style.background = `conic-gradient(var(--primary) 0% ${userData.overallProgress.coding}%, transparent ${userData.overallProgress.coding}% 100%)`;
    codingValue.textContent = `${userData.overallProgress.coding}%`;

    // Design skills chart
    const designProgress = document.querySelector('.radial-progress.design');
    const designValue = document.querySelector('.radial-inner.design');
    designProgress.style.background = `conic-gradient(var(--success) 0% ${userData.overallProgress.design}%, transparent ${userData.overallProgress.design}% 100%)`;
    designValue.textContent = `${userData.overallProgress.design}%`;
}

// Render the line graph
function renderLineGraph() {
    const lineGraph = document.querySelector('.line-graph');
    const graphPoints = lineGraph.querySelectorAll('.graph-point');
    const graphLine = lineGraph.querySelector('.graph-line');
    const graphLabels = lineGraph.querySelector('.graph-labels');
    
    // Clear existing content
    graphLabels.innerHTML = '';
    
    // Update points and generate clip path for the line
    let clipPathPoints = '';
    userData.monthlyProgress.forEach((data, index) => {
        if (index < graphPoints.length) {
            const pointPosition = 10 + (index * (80 / (userData.monthlyProgress.length - 1)));
            graphPoints[index].style.left = `${pointPosition}%`;
            graphPoints[index].style.bottom = `${data.progress}%`;
            
            // Add to clip path
            clipPathPoints += `${pointPosition}% ${data.progress}%, `;
            
            // Add month label
            const label = document.createElement('span');
            label.textContent = data.month;
            graphLabels.appendChild(label);
        }
    });
    
    // Construct clip path polygon
    if (clipPathPoints) {
        const fullClipPath = `polygon(
            ${clipPathPoints} 
            100% 0%, 
            0% 0%
        )`;
        graphLine.style.clipPath = fullClipPath;
    }
}

// Render badges
function renderBadges() {
    const badgeContainer = document.querySelector('.badge-container');
    badgeContainer.innerHTML = '';
    
    userData.badges.forEach(badge => {
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge ${badge.earned ? 'earned' : 'locked'}`;
        badgeElement.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-label">${badge.name}</div>
        `;
        badgeContainer.appendChild(badgeElement);
    });
}

// Render weekly goals
function renderWeeklyGoals() {
    const studyHoursElement = document.querySelector('.sidebar .skill:nth-child(1)');
    const projectsElement = document.querySelector('.sidebar .skill:nth-child(2)');
    
    // Study hours
    const studyPercentage = (userData.weeklyGoals.studyHours.current / userData.weeklyGoals.studyHours.target) * 100;
    studyHoursElement.querySelector('.skill-level').textContent = 
        `${userData.weeklyGoals.studyHours.current}/${userData.weeklyGoals.studyHours.target} hrs`;
    studyHoursElement.querySelector('.progress-bar').style.width = `${studyPercentage}%`;
    
    // Projects
    const projectsPercentage = (userData.weeklyGoals.projects.current / userData.weeklyGoals.projects.target) * 100;
    projectsElement.querySelector('.skill-level').textContent = 
        `${userData.weeklyGoals.projects.current}/${userData.weeklyGoals.projects.target}`;
    projectsElement.querySelector('.progress-bar').style.width = `${projectsPercentage}%`;
}

// Render learning path recommendations
function renderLearningPath() {
    const learningPathContainer = document.querySelector('.learning-path');
    learningPathContainer.innerHTML = '';
    
    userData.learningPath.forEach(item => {
        const pathItem = document.createElement('div');
        pathItem.className = 'path-item';
        pathItem.innerHTML = `
            <div class="path-icon">${item.order}</div>
            <div class="path-content">
                <div class="path-title">${item.title}</div>
                <div class="path-description">${item.description}</div>
            </div>
        `;
        learningPathContainer.appendChild(pathItem);
    });
}

// =============== ASSESSMENT SYSTEM ===============
// Current assessment variables
let currentAssessment = null;
let currentQuestionIndex = 0;
let userAnswers = [];

// Start an assessment
function startAssessment(skillType) {
    if (userData.assessments[skillType]) {
        currentAssessment = skillType;
        currentQuestionIndex = 0;
        userAnswers = [];
        
        showAssessmentModal();
        renderQuestion();
    } else {
        alert('Assessment not available for this skill yet.');
    }
}

// Show assessment modal
function showAssessmentModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('assessment-modal')) {
        const modal = document.createElement('div');
        modal.id = 'assessment-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="assessment-title">Assessment</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body" id="question-container">
                    <!-- Question will be rendered here -->
                </div>
                <div class="modal-footer">
                    <button id="next-question" class="btn btn-primary">Next</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add event listeners
        document.querySelector('.close-modal').addEventListener('click', closeAssessmentModal);
        document.getElementById('next-question').addEventListener('click', handleNextQuestion);
    }
    
    // Show the modal
    document.getElementById('assessment-modal').style.display = 'flex';
    document.getElementById('assessment-title').textContent = `${currentAssessment.charAt(0).toUpperCase() + currentAssessment.slice(1)} Assessment`;
}

// Close assessment modal
function closeAssessmentModal() {
    document.getElementById('assessment-modal').style.display = 'none';
    currentAssessment = null;
}

// Render current question
function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questions = userData.assessments[currentAssessment];
    const currentQuestion = questions[currentQuestionIndex];
    
    // Add progress indicator
    const progressText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    questionContainer.innerHTML = `
        <div class="question-progress">${progressText}</div>
        <div class="question-text">${currentQuestion.question}</div>
        <div class="options-container">
            ${currentQuestion.options.map((option, index) => `
                <div class="option">
                    <input type="radio" name="answer" id="option-${index}" value="${index}">
                    <label for="option-${index}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    // Update button text on last question
    const nextButton = document.getElementById('next-question');
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = 'Finish';
    } else {
        nextButton.textContent = 'Next';
    }
}

// Handle next button click in assessment
function handleNextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer to continue.');
        return;
    }
    
    userAnswers.push(parseInt(selectedOption.value));
    
    const questions = userData.assessments[currentAssessment];
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        completeAssessment();
    }
}

// Complete assessment and calculate results
function completeAssessment() {
    const questions = userData.assessments[currentAssessment];
    let correctAnswers = 0;
    
    // Calculate score
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            correctAnswers++;
        }
    });
    
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    
    // Show results
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div class="assessment-result">
            <h3>Assessment Complete!</h3>
            <div class="score-display">Your score: ${scorePercentage}%</div>
            <p>You answered ${correctAnswers} out of ${questions.length} questions correctly.</p>
        </div>
    `;
    
    // Update button
    const nextButton = document.getElementById('next-question');
    nextButton.textContent = 'Close';
    nextButton.removeEventListener('click', handleNextQuestion);
    nextButton.addEventListener('click', () => {
        closeAssessmentModal();
        updateSkillBasedOnAssessment(currentAssessment, scorePercentage);
    });
    
    // Potentially unlock badges based on score
    if (scorePercentage >= 80) {
        const relatedBadge = userData.badges.find(badge => 
            badge.name.toLowerCase().includes(currentAssessment.toLowerCase()) && !badge.earned
        );
        
        if (relatedBadge) {
            relatedBadge.earned = true;
            saveData();
            renderBadges();
            
            // Show badge earned notification
            showNotification(`🎉 New badge earned: ${relatedBadge.name}!`);
        }
    }
}

// Update skill based on assessment results
function updateSkillBasedOnAssessment(skillType, score) {
    // Find matching skill
    const skillToUpdate = userData.skills.find(skill => 
        skill.name.toLowerCase().includes(skillType.toLowerCase())
    );
    
    if (skillToUpdate) {
        // Gradually increase skill level based on assessment score
        const currentPercentage = skillToUpdate.percentage;
        const maxIncrease = 15; // Maximum percentage points to increase on perfect score
        
        const increase = Math.round((score / 100) * maxIncrease);
        const newPercentage = Math.min(100, currentPercentage + increase);
        
        if (newPercentage > currentPercentage) {
            skillToUpdate.percentage = newPercentage;
            
            // Update skill level label
            if (newPercentage <= 25) skillToUpdate.level = "Beginner";
            else if (newPercentage <= 50) skillToUpdate.level = "Intermediate";
            else if (newPercentage <= 75) skillToUpdate.level = "Advanced";
            else skillToUpdate.level = "Expert";
            
            // Recalculate overall progress
            updateOverallProgress();
            
            // Show skill improvement notification
            showNotification(`🚀 Your ${skillToUpdate.name} skill improved to ${newPercentage}%!`);
            
            // Update UI
            saveData();
            renderDashboard();
            
            // Adjust learning path based on new skills
            updateLearningPathRecommendations();
        }
    }
}

// Update overall progress calculations
function updateOverallProgress() {
    // Calculate coding skills average (all skills)
    const codingSkills = userData.skills.filter(skill => 
        !['Design', 'UI/UX'].includes(skill.name)
    );
    
    if (codingSkills.length > 0) {
        const codingAverage = codingSkills.reduce((sum, skill) => sum + skill.percentage, 0) / codingSkills.length;
        userData.overallProgress.coding = Math.round(codingAverage);
    }
    
    // For design skills (in a real app, we'd have more design skills)
    // Here we'll just use a placeholder calculation
    userData.overallProgress.design = Math.min(
        100, 
        userData.overallProgress.design + Math.floor(Math.random() * 5)
    );
    
    // Update monthly progress
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    const monthEntry = userData.monthlyProgress.find(entry => entry.month === currentMonth);
    
    if (monthEntry) {
        monthEntry.progress = Math.max(
            monthEntry.progress,
            Math.round((userData.overallProgress.coding + userData.overallProgress.design) / 2)
        );
    }
}

// Update learning path recommendations based on skills
function updateLearningPathRecommendations() {
    // Find lowest skill to prioritize
    const sortedSkills = [...userData.skills].sort((a, b) => a.percentage - b.percentage);
    const lowestSkill = sortedSkills[0];
    
    // Update first recommendation based on lowest skill
    if (userData.learningPath.length > 0) {
        userData.learningPath[0].title = `Improve Your ${lowestSkill.name} Skills`;
        userData.learningPath[0].description = `Focus on this area to balance your skill set (${lowestSkill.percentage}%)`;
    }
    
    // Add more specific recommendations based on skill levels
    // (This would be more sophisticated in a real application)
}

// =============== UTILITY FUNCTIONS ===============
// Show notification
function showNotification(message, duration = 3000) {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// =============== EVENT LISTENERS ===============
// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    // Load theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    // Theme toggle event
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Assessment button event
    const assessmentBtn = document.querySelector('.assessment-card .btn');
    assessmentBtn.addEventListener('click', () => {
        // For simplicity, we'll always start a JavaScript assessment
        // In a real app, you'd have a selector for which skill to assess
        startAssessment('javascript');
    });
    
    // Initialize data and render dashboard
    initializeData();
    
    // Add CSS for new elements
    const style = document.createElement('style');
    style.textContent = `
        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: var(--bg-light);
            border-radius: 10px;
            width: 80%;
            max-width: 600px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .dark-mode .modal-content {
            background-color: var(--bg-dark);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid var(--border-light);
        }
        
        .dark-mode .modal-header {
            border-bottom: 1px solid var(--border-dark);
        }
        
        .close-modal {
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-footer {
            padding: 1rem;
            text-align: right;
            border-top: 1px solid var(--border-light);
        }
        
        .dark-mode .modal-footer {
            border-top: 1px solid var(--border-dark);
        }
        
        /* Assessment Styles */
        .question-progress {
            margin-bottom: 1rem;
            color: var(--primary);
            font-weight: 500;
        }
        
        .dark-mode .question-progress {
            color: var(--info);
        }
        
        .question-text {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
        }
        
        .options-container {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .option {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            border: 1px solid var(--border-light);
            border-radius: 5px;
            cursor: pointer;
        }
        
        .dark-mode .option {
            border: 1px solid var(--border-dark);
        }
        
        .option:hover {
            background-color: rgba(67, 97, 238, 0.1);
        }
        
        .option input {
            margin-right: 10px;
        }
        
        .assessment-result {
            text-align: center;
            padding: 1rem;
        }
        
        .score-display {
            font-size: 2rem;
            font-weight: bold;
            color: var(--primary);
            margin: 1rem 0;
        }
        
        .dark-mode .score-display {
            color: var(--info);
        }
        
        /* Notification */
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary);
            color: white;
            padding: 1rem;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1001;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});