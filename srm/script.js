// DOM Elements
const careerRoadmap = document.getElementById('career-roadmap');
const pathButtons = document.querySelectorAll('.path-btn');
const roadmapNodes = document.querySelectorAll('.roadmap-node');
const progressBar = document.getElementById('progress-indicator');
const progressText = document.querySelector('.progress-text');
const saveProgressBtn = document.getElementById('save-progress');
const resetProgressBtn = document.getElementById('reset-progress');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const resetViewBtn = document.getElementById('reset-view');

// App State
let currentPath = 'software';
let zoomLevel = 2; // 1: zoomed out, 2: normal, 3: zoomed in
let userProgress = loadProgress();

// Career Data (simplified version, would be more extensive in production)
const careerData = {
    software: {
        title: 'Software Development Roadmap',
        stages: [
            {
                title: 'Entry Level',
                nodes: [
                    {
                        id: 'basics',
                        title: 'Programming Fundamentals',
                        icon: 'code',
                        skills: ['Learn HTML, CSS & JavaScript', 'Understand basic algorithms', 'Version control (Git)'],
                        resources: 'freeCodeCamp, Codecademy, MDN Web Docs',
                        timeframe: '3-6 months'
                    },
                    {
                        id: 'frontend',
                        title: 'Frontend Development',
                        icon: 'laptop-code',
                        skills: ['Modern JavaScript (ES6+)', 'CSS frameworks (Bootstrap/Tailwind)', 'Frontend framework (React/Vue/Angular)'],
                        salary: '$60,000 - $85,000',
                        resources: 'Udemy, Frontend Masters, React docs'
                    }
                ]
            },
            {
                title: 'Mid Level',
                nodes: [
                    {
                        id: 'backend',
                        title: 'Backend Development',
                        icon: 'server',
                        skills: ['Server-side language (Node.js/Python/Java)', 'RESTful APIs', 'Database management'],
                        certification: 'AWS Certified Developer, MongoDB University',
                        salary: '$80,000 - $110,000'
                    },
                    {
                        id: 'fullstack',
                        title: 'Full Stack Development',
                        icon: 'layer-group',
                        skills: ['API integration', 'Authentication & authorization', 'Deployment & DevOps basics'],
                        keySkills: 'System design, Testing, Performance optimization',
                        salary: '$90,000 - $120,000'
                    }
                ]
            },
            {
                title: 'Senior Level',
                nodes: [
                    {
                        id: 'architecture',
                        title: 'Software Architecture',
                        icon: 'sitemap',
                        skills: ['System design patterns', 'Microservices architecture', 'Scalability & performance'],
                        advancedSkills: 'Distributed systems, Security best practices',
                        salary: '$120,000 - $160,000'
                    },
                    {
                        id: 'leadership',
                        title: 'Technical Leadership',
                        icon: 'users',
                        skills: ['Team management', 'Project planning', 'Code reviews & mentoring'],
                        careerOptions: 'Engineering Manager, CTO, Principal Engineer',
                        salary: '$150,000 - $200,000+'
                    }
                ]
            }
        ]
    },
    data: {
        title: 'Data Science Roadmap',
        stages: [
            {
                title: 'Entry Level',
                nodes: [
                    {
                        id: 'foundations',
                        title: 'Data Fundamentals',
                        icon: 'database',
                        skills: ['Statistics & Probability', 'Python Programming', 'SQL & Database concepts'],
                        resources: 'Khan Academy, DataCamp, Coursera',
                        timeframe: '4-6 months'
                    },
                    {
                        id: 'analysis',
                        title: 'Data Analysis',
                        icon: 'chart-bar',
                        skills: ['Data cleaning & preprocessing', 'Exploratory data analysis', 'Data visualization (Matplotlib, Seaborn)'],
                        salary: '$65,000 - $90,000',
                        resources: 'Kaggle, DataQuest, Python for Data Analysis book'
                    }
                ]
            },
            {
                title: 'Mid Level',
                nodes: [
                    {
                        id: 'ml-basics',
                        title: 'Machine Learning Fundamentals',
                        icon: 'brain',
                        skills: ['Supervised learning algorithms', 'Model evaluation', 'Feature engineering'],
                        certification: 'AWS Machine Learning Specialty, Google Data Analytics',
                        salary: '$85,000 - $115,000'
                    },
                    {
                        id: 'advanced-ds',
                        title: 'Advanced Data Science',
                        icon: 'project-diagram',
                        skills: ['Deep learning basics', 'Natural language processing', 'Time series analysis'],
                        keySkills: 'TensorFlow/PyTorch, Big Data tools, Cloud platforms',
                        salary: '$100,000 - $130,000'
                    }
                ]
            },
            {
                title: 'Senior Level',
                nodes: [
                    {
                        id: 'ml-engineering',
                        title: 'ML Engineering',
                        icon: 'cogs',
                        skills: ['ML system design', 'Model deployment & monitoring', 'MLOps practices'],
                        advancedSkills: 'Distributed ML systems, Edge AI, Optimization',
                        salary: '$130,000 - $170,000'
                    },
                    {
                        id: 'ds-leadership',
                        title: 'Data Science Leadership',
                        icon: 'lightbulb',
                        skills: ['AI strategy', 'Cross-functional collaboration', 'Research direction'],
                        careerOptions: 'Chief Data Scientist, AI Research Director, Principal Data Scientist',
                        salary: '$160,000 - $220,000+'
                    }
                ]
            }
        ]
    },
    design: {
        title: 'UI/UX Design Roadmap',
        stages: [
            {
                title: 'Entry Level',
                nodes: [
                    {
                        id: 'design-basics',
                        title: 'Design Fundamentals',
                        icon: 'palette',
                        skills: ['Color theory & typography', 'Visual hierarchy', 'Design tools (Figma/Sketch)'],
                        resources: 'Coursera, Udemy, Design+Code',
                        timeframe: '3-5 months'
                    },
                    {
                        id: 'ui-basics',
                        title: 'UI Design Basics',
                        icon: 'desktop',
                        skills: ['Interface components', 'Responsive design', 'Design systems'],
                        salary: '$55,000 - $75,000',
                        resources: 'Dribbble, Behance, Material Design docs'
                    }
                ]
            },
            {
                title: 'Mid Level',
                nodes: [
                    {
                        id: 'ux-research',
                        title: 'UX Research',
                        icon: 'search',
                        skills: ['User interviews', 'Usability testing', 'Information architecture'],
                        certification: 'Nielsen Norman Group UX Certification, Google UX Design',
                        salary: '$75,000 - $105,000'
                    },
                    {
                        id: 'interaction',
                        title: 'Interaction Design',
                        icon: 'hand-pointer',
                        skills: ['Prototyping', 'Microinteractions', 'User flows & wireframes'],
                        keySkills: 'Advanced prototyping, Animation, Design thinking',
                        salary: '$85,000 - $115,000'
                    }
                ]
            },
            {
                title: 'Senior Level',
                nodes: [
                    {
                        id: 'design-systems',
                        title: 'Design Systems',
                        icon: 'cubes',
                        skills: ['Component libraries', 'Design tokens', 'Documentation & guidelines'],
                        advancedSkills: 'Design ops, Cross-platform consistency, Team workflows',
                        salary: '$110,000 - $150,000'
                    },
                    {
                        id: 'design-leadership',
                        title: 'Design Leadership',
                        icon: 'compass',
                        skills: ['Design strategy', 'Team mentoring', 'Product vision'],
                        careerOptions: 'Design Director, Head of Design, VP of Design',
                        salary: '$140,000 - $190,000+'
                    }
                ]
            }
        ]
    },
    cyber: {
        title: 'Cybersecurity Roadmap',
        stages: [
            {
                title: 'Entry Level',
                nodes: [
                    {
                        id: 'security-basics',
                        title: 'Security Fundamentals',
                        icon: 'shield-alt',
                        skills: ['Networking basics', 'Security concepts', 'Operating systems knowledge'],
                        resources: 'CompTIA Security+, Cybrary, TryHackMe',
                        timeframe: '4-6 months'
                    },
                    {
                        id: 'security-tools',
                        title: 'Security Tools',
                        icon: 'toolbox',
                        skills: ['Vulnerability scanners', 'SIEM basics', 'Security monitoring'],
                        salary: '$60,000 - $85,000',
                        resources: 'HackTheBox, SANS courses, Splunk fundamentals'
                    }
                ]
            },
            {
                title: 'Mid Level',
                nodes: [
                    {
                        id: 'security-operations',
                        title: 'Security Operations',
                        icon: 'user-shield',
                        skills: ['Incident response', 'Threat hunting', 'Digital forensics basics'],
                        certification: 'CISSP, CEH, OSCP',
                        salary: '$85,000 - $120,000'
                    },
                    {
                        id: 'pentesting',
                        title: 'Penetration Testing',
                        icon: 'bug',
                        skills: ['Web app security', 'Network penetration', 'Exploit development'],
                        keySkills: 'Red teaming, Security code review, Attack simulation',
                        salary: '$95,000 - $130,000'
                    }
                ]
            },
            {
                title: 'Senior Level',
                nodes: [
                    {
                        id: 'security-architecture',
                        title: 'Security Architecture',
                        icon: 'lock',
                        skills: ['Zero-trust design', 'Cloud security', 'Security frameworks (NIST, ISO)'],
                        advancedSkills: 'Threat modeling, Enterprise security strategy, Risk management',
                        salary: '$125,000 - $165,000'
                    },
                    {
                        id: 'security-leadership',
                        title: 'Security Leadership',
                        icon: 'crown',
                        skills: ['Security program management', 'Governance', 'Security budget planning'],
                        careerOptions: 'CISO, Security Director, Principal Security Engineer',
                        salary: '$150,000 - $210,000+'
                    }
                ]
            }
        ]
    }
};

// Initialize the application
function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Load and render initial path
    renderCareerPath(currentPath);
    
    // Update progress display
    updateProgressDisplay();
    
    // Restore completed nodes
    restoreCompletedNodes();
}

// Event Listeners
function setupEventListeners() {
    // Career path selection
    pathButtons.forEach(button => {
        button.addEventListener('click', function() {
            const path = this.getAttribute('data-path');
            switchCareerPath(path);
        });
    });
    
    // Node expansion
    roadmapNodes.forEach(node => {
        node.addEventListener('click', function(e) {
            // Don't toggle if clicking on the checkbox
            if (e.target.classList.contains('progress-check') || 
                e.target.parentNode.classList.contains('progress-marker')) {
                return;
            }
            toggleNode(this);
        });
    });
    
    // Progress tracking
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('progress-check')) {
            const node = e.target.closest('.roadmap-node');
            const nodeId = node.getAttribute('data-node');
            
            if (e.target.checked) {
                markNodeCompleted(nodeId);
            } else {
                markNodeIncomplete(nodeId);
            }
            
            updateProgressDisplay();
            saveProgress();
        }
    });
    
    // Progress buttons
    saveProgressBtn.addEventListener('click', saveProgress);
    resetProgressBtn.addEventListener('click', resetProgress);
    
    // Zoom controls
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetViewBtn.addEventListener('click', resetView);
}

// Career Path Rendering
function renderCareerPath(path) {
    // Update active button
    pathButtons.forEach(button => {
        if (button.getAttribute('data-path') === path) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update roadmap class
    careerRoadmap.className = '';
    careerRoadmap.classList.add(`${path}-roadmap`);
    
    // In a full implementation, we would dynamically generate the roadmap content here
    // For this simplified version, we're using pre-built HTML and toggling visibility
    
    // Animate the transition
    careerRoadmap.style.opacity = '0';
    setTimeout(() => {
        // Here you would update the DOM with new content for the selected path
        // For now, we'll just fake the transition
        careerRoadmap.style.opacity = '1';
    }, 300);
}

function switchCareerPath(path) {
    if (path === currentPath) return;
    
    currentPath = path;
    renderCareerPath(path);
    
    // Reset node states
    roadmapNodes.forEach(node => {
        node.classList.remove('expanded');
        node.querySelector('.node-content').style.maxHeight = '0';
    });
    
    // Restore completed nodes for this path
    restoreCompletedNodes();
}

// Node Interaction
function toggleNode(node) {
    // Toggle expanded class
    node.classList.toggle('expanded');
    
    // Toggle content height
    const content = node.querySelector('.node-content');
    if (node.classList.contains('expanded')) {
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.style.maxHeight = '0';
    }
    
    // Highlight the node briefly
    node.classList.add('highlight');
    setTimeout(() => {
        node.classList.remove('highlight');
    }, 1000);
}

// Progress Tracking
function markNodeCompleted(nodeId) {
    const node = document.querySelector(`.roadmap-node[data-node="${nodeId}"]`);
    node.classList.add('completed');
    
    // Add to user progress
    userProgress[currentPath] = userProgress[currentPath] || [];
    if (!userProgress[currentPath].includes(nodeId)) {
        userProgress[currentPath].push(nodeId);
    }
}

function markNodeIncomplete(nodeId) {
    const node = document.querySelector(`.roadmap-node[data-node="${nodeId}"]`);
    node.classList.remove('completed');
    
    // Remove from user progress
    if (userProgress[currentPath]) {
        const index = userProgress[currentPath].indexOf(nodeId);
        if (index > -1) {
            userProgress[currentPath].splice(index, 1);
        }
    }
}

function updateProgressDisplay() {
    // Calculate completion percentage for current path
    const currentPathNodes = document.querySelectorAll(`.roadmap-node`).length;
    const completedNodes = userProgress[currentPath] ? userProgress[currentPath].length : 0;
    const percentage = currentPathNodes > 0 ? Math.round((completedNodes / currentPathNodes) * 100) : 0;
    
    // Update progress bar
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
    
    // Optional: add special styling for 100% completion
    if (percentage === 100) {
        progressBar.classList.add('completed');
    } else {
        progressBar.classList.remove('completed');
    }
}

function restoreCompletedNodes() {
    // Clear all completed states first
    roadmapNodes.forEach(node => {
        node.classList.remove('completed');
        node.querySelector('.progress-check').checked = false;
    });
    
    // Restore completed nodes for current path
    if (userProgress[currentPath]) {
        userProgress[currentPath].forEach(nodeId => {
            const node = document.querySelector(`.roadmap-node[data-node="${nodeId}"]`);
            if (node) {
                node.classList.add('completed');
                node.querySelector('.progress-check').checked = true;
            }
        });
    }
    
    // Update display
    updateProgressDisplay();
}

// Local Storage
function saveProgress() {
    localStorage.setItem('careerProgress', JSON.stringify(userProgress));
    
    // Show save confirmation
    const saveBtn = document.getElementById('save-progress');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Progress Saved!';
    saveBtn.classList.add('saved');
    
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.classList.remove('saved');
    }, 2000);
}

function loadProgress() {
    const savedProgress = localStorage.getItem('careerProgress');
    return savedProgress ? JSON.parse(savedProgress) : {};
}

function resetProgress() {
    // Confirm reset
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        userProgress = {};
        localStorage.removeItem('careerProgress');
        restoreCompletedNodes();
        updateProgressDisplay();
    }
}

// Zoom Controls
function zoomIn() {
    if (zoomLevel < 3) {
        zoomLevel++;
        updateZoom();
    }
}

function zoomOut() {
    if (zoomLevel > 1) {
        zoomLevel--;
        updateZoom();
    }
}

function resetView() {
    zoomLevel = 2;
    updateZoom();
}

function updateZoom() {
    careerRoadmap.classList.remove('zoom-level-1', 'zoom-level-2', 'zoom-level-3');
    careerRoadmap.classList.add(`zoom-level-${zoomLevel}`);
}

// Dynamic Data Methods (for a production app)
function generateCareerPathHTML(pathData) {
    // This would dynamically create the roadmap HTML based on the data
    // For this demo, we're using pre-built HTML
    
    let html = '';
    
    // Example of how you would generate stages
    pathData.stages.forEach((stage, stageIndex) => {
        html += `<div class="roadmap-stage ${getStageClass(stageIndex)}">`;
        html += `<h3>${stage.title}</h3>`;
        
        // Generate nodes for each stage
        stage.nodes.forEach(node => {
            html += generateNodeHTML(node);
        });
        
        html += `</div>`;
        
        // Add connector if not the last stage
        if (stageIndex < pathData.stages.length - 1) {
            html += `<div class="connector"></div>`;
        }
    });
    
    return html;
}

function generateNodeHTML(nodeData) {
    // This would generate HTML for individual nodes
    return `
        <div class="roadmap-node" data-node="${nodeData.id}">
            <div class="node-header">
                <i class="fas fa-${nodeData.icon}"></i>
                <h4>${nodeData.title}</h4>
            </div>
            <div class="node-content">
                <ul>
                    ${nodeData.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
                <div class="node-details">
                    <!-- Node specific details would go here -->
                </div>
                <div class="progress-marker">
                    <label>
                        <input type="checkbox" class="progress-check">
                        <span>Mark as completed</span>
                    </label>
                </div>
            </div>
        </div>
    `;
}

function getStageClass(index) {
    const classes = ['entry-stage', 'mid-stage', 'senior-stage'];
    return classes[index % classes.length];
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);