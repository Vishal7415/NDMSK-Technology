document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    // 2. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 3. Load Course Data
    if (!courseId || !COURSES_DATA[courseId]) {
        showError('Course Not Found', 'The requested course could not be located. Please return to the coaching page.');
        return;
    }

    const course = COURSES_DATA[courseId];
    initCourse(course);

    // 4. Hide Preloader after a short delay
    setTimeout(hidePreloader, 800);
});

function initCourse(course) {
    const packageSelectorSection = document.getElementById('package-selector-section');
    const packageSelector = document.getElementById('package-selector');

    if (course.packages && course.packages.length > 0) {
        packageSelectorSection.style.display = 'block';
        packageSelector.innerHTML = course.packages.map((pkg, idx) => `
            <button class="track-btn ${idx === course.packages.length - 1 ? 'active' : ''}" 
                    onclick="switchPackage('${pkg.id}')">
                ${pkg.label}
            </button>
        `).join('');

        // Default to the last package (usually the most advanced/Industrial)
        renderCourseDetails(course.packages[course.packages.length - 1], course.icon);
    } else {
        packageSelectorSection.style.display = 'none';
        renderCourseDetails(course);
    }
}

window.switchPackage = function(packageId) {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const course = COURSES_DATA[courseId];
    
    if (!course || !course.packages) return;
    
    const pkg = course.packages.find(p => p.id === packageId);
    if (!pkg) return;

    // Update buttons
    document.querySelectorAll('.track-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === pkg.label);
    });

    // Re-render
    renderCourseDetails(pkg, course.icon);
    
    // Refresh AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
};

function renderCourseDetails(data, parentIcon) {
    // data can be a whole course or a package
    document.title = `${data.title} — NDMSK Technology`;
    document.getElementById('course-title').textContent = data.title;
    document.getElementById('course-icon').textContent = data.icon || parentIcon || '🚀';
    document.getElementById('course-desc').textContent = data.description;
    
    // Update meta badges
    document.getElementById('course-duration').textContent = data.duration;
    document.getElementById('course-level').textContent = data.level;
    document.getElementById('course-cert').textContent = data.certification;

    // Render Objectives if they exist
    const objectivesSection = document.getElementById('objectives-section');
    const objectivesList = document.getElementById('objectives-list');
    if (data.objectives && data.objectives.length > 0) {
        objectivesSection.style.display = 'block';
        objectivesList.innerHTML = data.objectives.map(obj => `
            <div class="objective-item" data-aos="fade-up">
                <i class="fas fa-circle-check"></i>
                <span>${obj}</span>
            </div>
        `).join('');
    } else {
        objectivesSection.style.display = 'none';
    }

    // Render Phases
    const phasesList = document.getElementById('phases-list');
    phasesList.innerHTML = ''; // Clear

    if (data.phases && data.phases.length > 0) {
        data.phases.forEach((phase, index) => {
            const phaseHtml = `
                <div class="phase-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="phase-number">${index + 1}</div>
                    <div class="phase-content">
                        <h3>${phase.title}</h3>
                        <div class="module-list">
                            ${phase.modules.map(mod => `
                                <div class="module-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${mod}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            phasesList.insertAdjacentHTML('beforeend', phaseHtml);
        });
    }

    // Render Tools if they exist
    const toolsSection = document.getElementById('tools-section');
    const toolsList = document.getElementById('tools-list');
    if (data.tools && data.tools.length > 0) {
        toolsSection.style.display = 'block';
        toolsList.innerHTML = data.tools.map(tool => `
            <div class="tool-tag">
                <i class="fas fa-hammer"></i>
                <span>${tool}</span>
            </div>
        `).join('');
    } else {
        toolsSection.style.display = 'none';
    }

    // Render Projects if they exist
    const projectsSection = document.getElementById('projects-section');
    const projectsList = document.getElementById('projects-list');
    if (data.projects && data.projects.length > 0) {
        projectsSection.style.display = 'block';
        projectsList.innerHTML = data.projects.map(project => `
            <div class="project-item">
                <i class="fas fa-check"></i>
                <span>${project}</span>
            </div>
        `).join('');
    } else {
        projectsSection.style.display = 'none';
    }
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

function showError(title, message) {
    const heroTitle = document.getElementById('course-title');
    const heroDesc = document.getElementById('course-desc');
    const phasesSection = document.querySelector('.phases-section');
    
    if (heroTitle) heroTitle.textContent = title;
    if (heroDesc) heroDesc.textContent = message;
    if (phasesSection) phasesSection.style.display = 'none';
    
    hidePreloader();
}

