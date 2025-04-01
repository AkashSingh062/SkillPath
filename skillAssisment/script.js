const skillsData = [
    {
        id: 'communication',
        name: 'Communication',
        resources: [
            { name: 'Think Fast, Talk Fast: Communication Techniques', link: 'https://youtu.be/HAnw168huqA?si=-wnBIDwNVTDjPf5q' },
            { name: 'Public Speaking Masterclass', link: 'https://youtu.be/xSp78RwcAS4?si=SU4Y0RIS53ijrlaw' },
            { name: 'Active Listening Techniques', link: 'https://youtu.be/Yq5pJ0q3xuc?si=kCfibOOzEsVSEiSV' }
        ]
    },
    {
        id: 'problem-solving',
        name: 'Problem Solving',
        resources: [
            { name: 'Critical Thinking Workshop by Jordan Peterson', link: 'https://youtu.be/x0vUsxhMczI?si=qMnYaxBy5chTO9of' },
            { name: 'Design Thinking Process', link: 'https://youtu.be/_r0VX-aU_T8?si=uKrYVab15dyhV2yI' },
            { name: 'How to make Smart Decisions | TedEd', link: 'https://youtu.be/X7j8F16eSqs?si=YWY14VSYaY31lLaE' }
        ]
    },
    {
        id: 'coding',
        name: 'Coding',
        resources: [
            { name: 'Web Development Bootcamp | FreeCodeCamp', link: 'https://youtu.be/zJSY8tbf_ys?si=TVHd9i-6yb_pVv2g' },
            { name: 'Data Structures & Algorithms | FreeCodeCamp', link: 'https://youtu.be/8hly31xKli0?si=HYyrImbcu1Z2jhQv' },
            { name: 'Clean Code Practices | Playlist', link: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbkK24EaPurzMq0-kw5U9pJh' }
        ]
    },
    {
        id: 'leadership',
        name: 'Leadership',
        resources: [
            { name: 'Leadership Essentials Playlist', link: 'https://www.youtube.com/playlist?list=PLdinyWzDfipOUQjdoqbfGu2e93r1ZE_wI' },
            { name: 'Team Management Skills', link: 'https://youtu.be/iDbdXTMnOmE?si=Bk_DtPmy6vk2mp5z' },
            { name: 'Strategic Planning Workshop by Harvard Buisness School', link: 'https://youtu.be/iuYlGRnC7J8?si=x2U3qZC9tRVDe9pR' }
        ]
    },
    {
        id: 'time-management',
        name: 'Time Management',
        resources: [
            { name: 'Productivity Masterclass', link: 'https://www.youtube.com/playlist?list=PLYp1CkUBbk-cKZhwoW8VMcQlWjgfUA5ME' },
            { name: 'Time Blocking Techniques', link: 'https://youtu.be/Ip5oWhj9yP0?si=F3frhonMvvBIl6iH' },
            { name: 'Priority Management', link: 'https://youtu.be/iDbdXTMnOmE?si=x-0aJZdAp0Yj7PCa' }
        ]
    },
    {
        id: 'creativity',
        name: 'Creativity',
        resources: [
            { name: 'How To Run A Design Thinking Workshop by CareerFoundary', link: 'https://youtu.be/A5agx1J9dJQ?si=DoSveFFJjbiQS06Y' },
            { name: 'Navi Radjou: Creative problem-solving in the face of extreme limits', link: 'https://youtu.be/cHRZ6OrSvvI?si=CL9vOGXVIV9nj_jW' },
            { name: 'The art of Innovation | TedEdX', link: 'https://youtu.be/Mtjatz9r-Vc?si=sJ7Q-ebeQC5TnvrZ' }
        ]
    },
    {
        id: 'teamwork',
        name: 'Teamwork',
        resources: [
            { name: 'Collaborative Work Strategies', link: 'https://youtu.be/AMG8ObDmbaM?si=uwBDex9J5qSeH9Fo' },
            { name: 'Conflict Resolution', link: 'https://youtu.be/zHXYWMnm7Yg?si=wfTyHVRD8v4QM-I2' },
            { name: 'Effective Team Communication', link: 'https://youtu.be/r3QOULEhypA?si=j3yuaLT8oNudNvMi' }
        ]
    },
    {
        id: 'adaptability',
        name: 'Adaptability',
        resources: [
            { name: 'Change Management Course', link: 'https://youtu.be/7zRvhFb9UUQ?si=0SO0vE2y8GEKAd1g' },
            { name: 'Resilience Training', link: 'https://youtu.be/CuCptHYw_-c?si=yxZy9uy38BiWkXFM' },
            { name: 'Growth Mindset Development', link: 'https://youtu.be/hiiEeMN7vbQ?si=16mAK74DIdeR5L43' }
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