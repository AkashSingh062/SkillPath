const skillsData = [
    {
        id: 'communication',
        name: 'Communication',
        resources: [
            { name: 'Effective Communication Course', link: '#' },
            { name: 'Public Speaking Masterclass', link: '#' },
            { name: 'Active Listening Techniques', link: '#' }
        ]
    },
    {
        id: 'problem-solving',
        name: 'Problem Solving',
        resources: [
            { name: 'Critical Thinking Workshop', link: '#' },
            { name: 'Design Thinking Methodology', link: '#' },
            { name: 'Decision Making Frameworks', link: '#' }
        ]
    },
    {
        id: 'coding',
        name: 'Coding',
        resources: [
            { name: 'Web Development Bootcamp', link: '#' },
            { name: 'Data Structures & Algorithms', link: '#' },
            { name: 'Clean Code Practices', link: '#' }
        ]
    },
    {
        id: 'leadership',
        name: 'Leadership',
        resources: [
            { name: 'Leadership Essentials Course', link: '#' },
            { name: 'Team Management Skills', link: '#' },
            { name: 'Strategic Planning Workshop', link: '#' }
        ]
    },
    {
        id: 'time-management',
        name: 'Time Management',
        resources: [
            { name: 'Productivity Masterclass', link: '#' },
            { name: 'Time Blocking Techniques', link: '#' },
            { name: 'Priority Management', link: '#' }
        ]
    },
    {
        id: 'creativity',
        name: 'Creativity',
        resources: [
            { name: 'Design Thinking Workshop', link: '#' },
            { name: 'Creative Problem Solving', link: '#' },
            { name: 'Innovation Techniques', link: '#' }
        ]
    },
    {
        id: 'teamwork',
        name: 'Teamwork',
        resources: [
            { name: 'Collaborative Work Strategies', link: '#' },
            { name: 'Conflict Resolution', link: '#' },
            { name: 'Effective Team Communication', link: '#' }
        ]
    },
    {
        id: 'adaptability',
        name: 'Adaptability',
        resources: [
            { name: 'Change Management Course', link: '#' },
            { name: 'Resilience Training', link: '#' },
            { name: 'Growth Mindset Development', link: '#' }
        ]
    }
];

const skillsList = document.getElementById('skills-list');
const analyzeBtn = document.getElementById('analyze-btn');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const summaryContainer = document.getElementById('summary-container');
const radarChartContainer = document.getElementById('radar-chart');

function initializeSkills() {
    skillsData.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
                    <div class="skill-name">
                        <span>${skill.name}</span>
                        <span class="skill-value" id="value-${skill.id}">0</span>
                    </div>
                    <input type="range" min="0" max="10" value="0" class="skill-level" id="${skill.id}" 
                           oninput="updateSkillValue('${skill.id}')">
                `;
        skillsList.appendChild(skillItem);
    });
}

// Update skill value display and progress bar
function updateSkillValue(skillId) {
    const slider = document.getElementById(skillId);
    const valueDisplay = document.getElementById(`value-${skillId}`);
    valueDisplay.textContent = slider.value;

    updateProgress();
}

// Update progress bar
function updateProgress() {
    let rated = 0;
    const totalSkills = skillsData.length;

    skillsData.forEach(skill => {
        const slider = document.getElementById(skill.id);
        if (parseInt(slider.value) > 0) {
            rated++;
        }
    });

    const progressValue = Math.round((rated / totalSkills) * 100);
    progressBar.style.width = `${progressValue}%`;
    progressPercent.textContent = `${progressValue}%`;
}

// Analyze skills and generate results
function analyzeSkills() {
    // Get skill ratings
    const ratings = {};
    skillsData.forEach(skill => {
        const slider = document.getElementById(skill.id);
        ratings[skill.id] = parseInt(slider.value);
    });

    // Clear previous results
    summaryContainer.innerHTML = '';

    // Generate summary
    const strengths = [];
    const improvements = [];

    Object.keys(ratings).forEach(skillId => {
        const skill = skillsData.find(s => s.id === skillId);
        const rating = ratings[skillId];

        if (rating >= 8) {
            strengths.push({ ...skill, rating });
        } else if (rating <= 5 && rating > 0) {
            improvements.push({ ...skill, rating });
        }
    });

    // Add strengths
    if (strengths.length > 0) {
        const strengthsSection = document.createElement('div');
        strengthsSection.className = 'summary-item strength';

        let strengthsHTML = `<h3 class="summary-title">Your Strengths</h3><p>`;
        strengthsHTML += strengths.map(strength => `${strength.name} (${strength.rating}/10)`).join(', ');
        strengthsHTML += `</p>`;

        strengthsSection.innerHTML = strengthsHTML;
        summaryContainer.appendChild(strengthsSection);
    }

    // Add improvements with resources
    if (improvements.length > 0) {
        improvements.forEach(improvement => {
            const improvementSection = document.createElement('div');
            improvementSection.className = 'summary-item improvement';

            let improvementHTML = `
                        <h3 class="summary-title">Improve Your ${improvement.name} (${improvement.rating}/10)</h3>
                        <p>Here are some resources to help you enhance this skill:</p>
                        <div class="resources">
                    `;

            improvement.resources.forEach(resource => {
                improvementHTML += `<a href="${resource.link}" class="resource-link">${resource.name}</a>`;
            });

            improvementHTML += `</div>`;
            improvementSection.innerHTML = improvementHTML;
            summaryContainer.appendChild(improvementSection);
        });
    }

    // If no strengths or improvements
    if (strengths.length === 0 && improvements.length === 0) {
        summaryContainer.innerHTML = `
                    <div class="summary-item">
                        <h3 class="summary-title">Please Rate Your Skills</h3>
                        <p>Move the sliders to rate your proficiency in each skill area.</p>
                    </div>
                `;
    }

    // Generate radar chart
    generateRadarChart(ratings);

    // Scroll to results
    document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth' });
}

// Generate radar chart using SVG
function generateRadarChart(ratings) {
    const size = 300;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const labels = skillsData.map(skill => skill.name);
    const values = skillsData.map(skill => ratings[skill.id] / 10); // Normalize to 0-1

    // Create SVG
    radarChartContainer.innerHTML = '';
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.classList.add("radar-chart");

    // Draw background circles
    for (let i = 1; i <= 5; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", centerX);
        circle.setAttribute("cy", centerY);
        circle.setAttribute("r", radius * (i / 5));
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "#e9ecef");
        circle.setAttribute("stroke-width", "1");
        svg.appendChild(circle);
    }

    // Calculate points for each skill
    const points = [];
    const textPoints = [];
    const ratedCount = values.filter(v => v > 0).length;

    if (ratedCount > 2) { // Need at least 3 rated skills for a proper radar chart
        for (let i = 0; i < labels.length; i++) {
            if (values[i] > 0) { // Only include rated skills
                const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
                const x = centerX + radius * values[i] * Math.cos(angle);
                const y = centerY + radius * values[i] * Math.sin(angle);
                points.push(`${x},${y}`);

                // Text position (slightly outside the furthest point)
                const textX = centerX + (radius + 20) * Math.cos(angle);
                const textY = centerY + (radius + 20) * Math.sin(angle);

                // Add text labels
                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", textX);
                text.setAttribute("y", textY);
                text.setAttribute("text-anchor", textX < centerX ? "end" : (textX > centerX ? "start" : "middle"));
                text.setAttribute("alignment-baseline", textY < centerY ? "baseline" : (textY > centerY ? "hanging" : "middle"));
                text.setAttribute("font-size", "12");
                text.textContent = labels[i];
                svg.appendChild(text);

                // Add lines from center
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", centerX);
                line.setAttribute("y1", centerY);
                line.setAttribute("x2", centerX + radius * Math.cos(angle));
                line.setAttribute("y2", centerY + radius * Math.sin(angle));
                line.setAttribute("stroke", "#e9ecef");
                line.setAttribute("stroke-width", "1");
                svg.appendChild(line);
            }
        }

        // Draw data polygon
        if (points.length > 2) {
            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", points.join(" "));
            polygon.setAttribute("fill", "rgba(67, 97, 238, 0.3)");
            polygon.setAttribute("stroke", "#4361ee");
            polygon.setAttribute("stroke-width", "2");
            svg.appendChild(polygon);
        }
    } else {
        // Fallback if not enough skills rated
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", centerX);
        text.setAttribute("y", centerY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("alignment-baseline", "middle");
        text.setAttribute("font-size", "14");
        text.textContent = "Rate at least 3 skills to see the chart";
        svg.appendChild(text);
    }

    radarChartContainer.appendChild(svg);
}

// Event listeners
analyzeBtn.addEventListener('click', analyzeSkills);

// Initialize on page load
window.onload = function () {
    initializeSkills();
    updateProgress();
};