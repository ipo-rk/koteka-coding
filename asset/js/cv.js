// ============================================================
// CV DOWNLOAD FUNCTIONALITY
// ============================================================
(function () {
    // CV Data - Customize this with your actual information
    const cvData = {
        name: "Koteka Coding",
        title: "Full Stack Developer",
        email: "rizaldoricky@gmail.com",
        phone: "+62 812 1537 6865",
        location: "Papua Tengah, Indonesia",
        about: "Passionate full-stack developer with expertise in modern web technologies. Dedicated to creating beautiful, functional, and user-friendly web applications.",

        skills: {
            coding: [
                { name: "HTML", level: 90 },
                { name: "CSS", level: 85 },
                { name: "JavaScript", level: 80 },
                { name: "Bootstrap", level: 88 },
                { name: "Laravel", level: 88 },
                { name: "GitHub", level: 88 }
            ],
            design: [
                { name: "Photoshop", level: 90 },
                { name: "Adobe Illustrator", level: 85 },
                { name: "Canva", level: 80 },
                { name: "Lightroom", level: 85 },
                { name: "After Effects", level: 75 },
                { name: "Capcut", level: 80 }
            ]
        },

        experience: [

            {
                title: "Web Developer",
                company: "Digital Agency",
                period: "2020 - 2025",
                description: "Developed responsive websites and web applications for various clients."
            },
            {
                title: "Junior Developer",
                company: "StartUp",
                period: "2018 - 2020",
                description: "Assisted in building web solutions and learning modern development practices."
            }
        ],

        education: [
            {
                degree: "Sistem Informasi",
                school: "Universitas Sains dan Teknologi Jayapura",
                year: "2019 - Present"
            },
            {
                degree: "Web Development",
                school: "SaCode Papua",
                year: "2023"
            }
        ],

        projects: [
            {
                name: "E-Commerce Platform",
                description: "Built a full-stack e-commerce platform with Laravel and Bootstrap"
            },
            {
                name: "Portfolio Website",
                description: "Created a responsive portfolio website showcasing design and development skills"
            },
            {
                name: "Task Management App",
                description: "Developed a task management application with real-time updates"
            }
        ]
    };

    // Function to generate HTML CV
    function generateCVHTML() {
        const skillsHTML = `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #28a745; margin-bottom: 15px;">Coding Skills</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    ${cvData.skills.coding.map(skill => `
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>${skill.name}</span>
                                <span style="color: #28a745;">${skill.level}%</span>
                            </div>
                            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: #28a745; height: 100%; width: ${skill.level}%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div>
                <h4 style="color: #28a745; margin-bottom: 15px;">Design Skills</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    ${cvData.skills.design.map(skill => `
                        <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>${skill.name}</span>
                                <span style="color: #28a745;">${skill.level}%</span>
                            </div>
                            <div style="background: #ddd; height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: #28a745; height: 100%; width: ${skill.level}%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const experienceHTML = cvData.experience.map(exp => `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
                <h5 style="margin-bottom: 5px;">${exp.title}</h5>
                <p style="color: #666; margin: 5px 0; font-weight: bold;">${exp.company} | ${exp.period}</p>
                <p style="color: #666; margin: 5px 0;">${exp.description}</p>
            </div>
        `).join('');

        const educationHTML = cvData.education.map(edu => `
            <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #ddd;">
                <h5 style="margin-bottom: 5px;">${edu.degree}</h5>
                <p style="color: #666; margin: 5px 0;">${edu.school}</p>
                <p style="color: #999; font-size: 14px;">${edu.year}</p>
            </div>
        `).join('');

        const projectsHTML = cvData.projects.map(proj => `
            <div style="margin-bottom: 15px;">
                <h5 style="margin-bottom: 5px;">${proj.name}</h5>
                <p style="color: #666; margin: 0;">${proj.description}</p>
            </div>
        `).join('');

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${cvData.name} - CV</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background: #f5f5f5;
                        padding: 20px;
                    }
                    .cv-container {
                        max-width: 900px;
                        margin: 0 auto;
                        background: white;
                        padding: 40px;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .cv-header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 3px solid #28a745;
                        padding-bottom: 20px;
                    }
                    .cv-name {
                        font-size: 32px;
                        font-weight: bold;
                        color: #0d0d0d;
                        margin-bottom: 5px;
                    }
                    .cv-title {
                        font-size: 18px;
                        color: #28a745;
                        margin-bottom: 15px;
                    }
                    .cv-contact {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        font-size: 14px;
                        flex-wrap: wrap;
                    }
                    .cv-contact span {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                    .cv-section {
                        margin-bottom: 30px;
                    }
                    .cv-section-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #0d0d0d;
                        border-bottom: 2px solid #28a745;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                    }
                    .cv-about {
                        background: #f9f9f9;
                        padding: 15px;
                        border-radius: 6px;
                        color: #666;
                        line-height: 1.8;
                    }
                    .skills-container {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 30px;
                    }
                    @media (max-width: 600px) {
                        .cv-container {
                            padding: 20px;
                        }
                        .cv-name {
                            font-size: 24px;
                        }
                        .cv-contact {
                            flex-direction: column;
                            gap: 10px;
                        }
                        .skills-container {
                            grid-template-columns: 1fr;
                            gap: 20px;
                        }
                    }
                    @media print {
                        body {
                            background: white;
                            padding: 0;
                        }
                        .cv-container {
                            box-shadow: none;
                            padding: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    <!-- Header Section -->
                    <div class="cv-header">
                        <div class="cv-name">${cvData.name}</div>
                        <div class="cv-title">${cvData.title}</div>
                        <div class="cv-contact">
                            <span>📧 ${cvData.email}</span>
                            <span>📱 ${cvData.phone}</span>
                            <span>📍 ${cvData.location}</span>
                        </div>
                    </div>

                    <!-- About Section -->
                    <div class="cv-section">
                        <div class="cv-section-title">About Me</div>
                        <div class="cv-about">${cvData.about}</div>
                    </div>

                    <!-- Skills Section -->
                    <div class="cv-section">
                        <div class="cv-section-title">Skills</div>
                        <div class="skills-container">
                            ${skillsHTML}
                        </div>
                    </div>

                    <!-- Experience Section -->
                    <div class="cv-section">
                        <div class="cv-section-title">Experience</div>
                        ${experienceHTML}
                    </div>

                    <!-- Education Section -->
                    <div class="cv-section">
                        <div class="cv-section-title">Education</div>
                        ${educationHTML}
                    </div>

                    <!-- Projects Section -->
                    <div class="cv-section">
                        <div class="cv-section-title">Projects</div>
                        ${projectsHTML}
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // Function to download CV as HTML
    function downloadCVAsHTML() {
        const cvHTML = generateCVHTML();
        const blob = new Blob([cvHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cvData.name.replace(/\s+/g, '_')}_CV.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Function to download CV as PDF (using html2pdf library)
    function downloadCVAsPDF() {
        // Check if html2pdf is loaded
        if (typeof html2pdf === 'undefined') {
            console.warn('html2pdf library not loaded. Installing...');
            loadHtml2PdfLibrary();
            return;
        }

        const cvHTML = generateCVHTML();
        const element = document.createElement('div');
        element.innerHTML = cvHTML;

        const opt = {
            margin: 10,
            filename: `${cvData.name.replace(/\s+/g, '_')}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };

        html2pdf().set(opt).from(element).save();
    }

    // Load html2pdf library dynamically
    function loadHtml2PdfLibrary() {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = function () {
            downloadCVAsPDF();
        };
        script.onerror = function () {
            console.error('Failed to load html2pdf library');
            alert('Error loading PDF library. Downloading as HTML instead.');
            downloadCVAsHTML();
        };
        document.head.appendChild(script);
    }

    // Function to view CV in modal
    function viewCVInModal() {
        const cvHTML = generateCVHTML();
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'cvModal';
        modal.tabIndex = '-1';
        modal.setAttribute('aria-labelledby', 'cvModalLabel');
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="cvModalLabel">Curriculum Vitae</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                        <iframe srcdoc="${cvHTML.replace(/"/g, '&quot;')}" style="width: 100%; height: 500px; border: none;"></iframe>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" id="downloadHTMLBtn">
                            <i class="bi bi-download"></i> Download as HTML
                        </button>
                        <button type="button" class="btn btn-primary" id="downloadPDFBtn">
                            <i class="bi bi-file-pdf"></i> Download as PDF
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Show modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Setup download buttons
        document.getElementById('downloadHTMLBtn').addEventListener('click', downloadCVAsHTML);
        document.getElementById('downloadPDFBtn').addEventListener('click', downloadCVAsPDF);

        // Clean up modal when hidden
        modal.addEventListener('hidden.bs.modal', function () {
            modal.remove();
        });
    }

    // Function to download CV directly (combined HTML and view option)
    function handleDownloadCV() {
        // Create a simple menu for download options
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 9999;
            min-width: 300px;
            text-align: center;
        `;

        container.innerHTML = `
            <h5 style="margin-bottom: 20px; color: #0d0d0d;">Download CV</h5>
            <p style="color: #666; margin-bottom: 20px; font-size: 14px;">Choose your preferred format:</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="viewCVBtn" style="padding: 12px; background: #17a2b8; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px;">
                    👁️ View CV
                </button>
                <button id="downloadHTMLBtn" style="padding: 12px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px;">
                    📄 Download as HTML
                </button>
                <button id="downloadPDFBtn" style="padding: 12px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px;">
                    📕 Download as PDF
                </button>
            </div>
        `;

        const backdrop = document.createElement('div');
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9998;
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(container);

        document.getElementById('viewCVBtn').addEventListener('click', function () {
            viewCVInModal();
            backdrop.remove();
            container.remove();
        });

        document.getElementById('downloadHTMLBtn').addEventListener('click', function () {
            downloadCVAsHTML();
            backdrop.remove();
            container.remove();
        });

        document.getElementById('downloadPDFBtn').addEventListener('click', function () {
            downloadCVAsPDF();
            backdrop.remove();
            container.remove();
        });

        backdrop.addEventListener('click', function () {
            backdrop.remove();
            container.remove();
        });
    }

    // Expose function globally and setup button click handler
    window.downloadCV = handleDownloadCV;

    // Auto-setup when DOM is ready
    function setupDownloadButton() {
        const downloadBtn = document.getElementById('downloadCVBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.downloadCV();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupDownloadButton);
    } else {
        setupDownloadButton();
    }
})();
