import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaSass,
  FaJava,
  FaDatabase,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaExternalLinkAlt,
  FaHome,
  FaUser,
  FaCode,
  FaFolderOpen,
  FaPaperPlane,
  FaGraduationCap,
  FaAward,
  FaChartBar,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiRedux } from "react-icons/si";
import {
  translations,
  skillsList,
  accentPresets,
} from "./data/portfolioData";
import profilePic from "./assets/profile.jpg";
import "./App.css";

const skillIconsMap = {
  react: <FaReact />,
  js: <FaJsSquare />,
  ts: <SiTypescript />,
  html: <FaHtml5 />,
  css: <FaCss3Alt />,
  tailwind: <SiTailwindcss />,
  redux: <SiRedux />,
  sass: <FaSass />,
  git: <FaGitAlt />,
  java: <FaJava />,
  sql: <FaDatabase />,
  powerbi: <FaChartBar />,
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [accentIndex, setAccentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const t = translations[lang];
  const currentAccent = accentPresets[accentIndex];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent-primary",
      currentAccent.primary
    );
    document.documentElement.style.setProperty(
      "--accent-secondary",
      currentAccent.secondary
    );
  }, [currentAccent]);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:karnikita48@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus(t.contact.sentAlert);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormStatus(""), 5000);
  };

  const navItems = [
    { id: "home", label: t.nav.home, icon: <FaHome /> },
    { id: "about", label: t.nav.about, icon: <FaUser /> },
    { id: "skills", label: t.nav.skills, icon: <FaCode /> },
    { id: "projects", label: t.nav.projects, icon: <FaFolderOpen /> },
    { id: "contact", label: t.nav.contact, icon: <FaPaperPlane /> },
  ];

  return (
    <div className="portfolio-layout">
      <header className="mobile-header">
        <a
          href="#home"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
        >
          Portfolio
        </a>

        <div className="mobile-header-actions">
          <select
            aria-label="Select Language"
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">ENGLISH</option>
            <option value="hi">हिन्दी</option>
            <option value="bn">বাংলা</option>
            <option value="kn">ಕನ್ನಡ</option>
          </select>

          <button
            className="hamburger-btn"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`side-navbar ${mobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-profile-mini">
            <img src={profilePic} alt="Nikita Kar" />
            <div>
              <h3>Nikita Kar</h3>
              <span>Frontend Engineer</span>
            </div>
          </div>

          <div className="sidebar-control-group">
            <select
              aria-label="Language Switcher"
              className="lang-select full-width"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">ENGLISH</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>

          <nav className="sidebar-nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link-btn ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="theme-toggle-row">
            <span className="control-label">{t.controls.theme}</span>
            <button
              className="theme-mode-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Dark or Light Mode"
            >
              {theme === "dark" ? (
                <>
                  <FaSun /> Light
                </>
              ) : (
                <>
                  <FaMoon /> Dark
                </>
              )}
            </button>
          </div>

          <div className="color-picker-row">
            <span className="control-label">{t.controls.accent}</span>
            <div className="color-swatches">
              {accentPresets.map((preset, idx) => (
                <button
                  key={preset.name}
                  className={`color-swatch ${
                    accentIndex === idx ? "selected" : ""
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                  }}
                  title={preset.name}
                  aria-label={preset.name}
                  onClick={() => setAccentIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {/* 1. HOME SECTION */}
        <section id="home" className="section home-section">
          <div className="home-grid">
            <div className="home-text">
              <p className="greeting-text">{t.home.greeting}</p>
              <h1 className="hero-name">{t.home.name}</h1>
              <h2 className="hero-role">{t.home.role}</h2>
              <p className="hero-bio">{t.home.bio}</p>

              <div className="hero-cta-group">
                <button
                  className="btn-primary"
                  onClick={() => handleNavClick("projects")}
                >
                  {t.home.viewProjects}
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => handleNavClick("contact")}
                >
                  {t.home.contactMe}
                </button>
              </div>

              <div className="hero-social-icons">
                <a
                  href="https://github.com/karnikita48"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="social-icon-btn"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/nikita-kar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="social-icon-btn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="mailto:karnikita48@gmail.com"
                  aria-label="Send Email"
                  className="social-icon-btn"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <div className="home-image-wrapper">
              <div className="profile-ring">
                <img
                  src={profilePic}
                  alt="Nikita Kar - Frontend Developer"
                  className="hero-photo"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="section about-section">
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>

          <div className="about-grid">
            <div className="about-photo-card">
              <img
                src={profilePic}
                alt="Nikita Kar"
                className="about-photo"
              />
              <div className="about-location-badge">
                <FaMapMarkerAlt /> {t.contact.locationValue}
              </div>
            </div>

            <div className="about-details">
              <p className="about-summary">{t.about.summary}</p>

              <div className="about-cards-row">
                <div className="info-box">
                  <div className="info-box-header">
                    <FaGraduationCap className="accent-icon" />
                    <h3>{t.about.educationTitle}</h3>
                  </div>
                  <p className="info-primary">{t.about.degree}</p>
                  <p className="info-secondary">{t.about.college}</p>
                  <p className="info-muted">{t.about.school}</p>
                </div>

                <div className="info-box">
                  <div className="info-box-header">
                    <FaAward className="accent-icon" />
                    <h3>{t.about.certTitle}</h3>
                  </div>
                  <ul className="cert-list">
                    {t.about.certs.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" className="section skills-section">
          <h2 className="section-title">{t.skills.title}</h2>
          <p className="section-subtitle">{t.skills.subtitle}</p>

          <div className="skills-grid">
            {skillsList.map((skill) => (
              <div key={skill.name} className="skill-card">
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skillIconsMap[skill.iconKey]}
                </div>
                <h3 className="skill-name">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" className="section projects-section">
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">{t.projects.subtitle}</p>

          <div className="projects-grid">
            {t.projects.items.map((project, index) => (
              <article key={index} className="project-card">
                <div className="project-banner">
                  <div className="project-banner-overlay">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub Repository`}
                      className="project-action-icon"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      className="project-action-icon"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>

                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. CONTACT SECTION */}
        <section id="contact" className="section contact-section">
          <h2 className="section-title">{t.contact.title}</h2>

          <div className="contact-wrapper">
            <div className="contact-info-column">
              <h3 className="contact-heading">{t.contact.heading}</h3>
              <p className="contact-description">{t.contact.description}</p>

              <div className="contact-cards">
                <a
                  href="mailto:karnikita48@gmail.com"
                  className="contact-detail-card"
                >
                  <span className="contact-card-icon">
                    <FaEnvelope />
                  </span>
                  <div>
                    <h4>{t.contact.emailLabel}</h4>
                    <p>karnikita48@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+916009067532" className="contact-detail-card">
                  <span className="contact-card-icon">
                    <FaPhoneAlt />
                  </span>
                  <div>
                    <h4>{t.contact.phoneLabel}</h4>
                    <p>+91 6009067532</p>
                  </div>
                </a>

                <div className="contact-detail-card">
                  <span className="contact-card-icon">
                    <FaMapMarkerAlt />
                  </span>
                  <div>
                    <h4>{t.contact.locationLabel}</h4>
                    <p>{t.contact.locationValue}</p>
                  </div>
                </div>
              </div>

              <div className="contact-social-row">
                <a
                  href="https://github.com/karnikita48"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/nikita-kar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a href="mailto:karnikita48@gmail.com" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <form className="contact-form-card" onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder={t.contact.formName}
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder={t.contact.formEmail}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                rows="5"
                placeholder={t.contact.formMessage}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              <button type="submit" className="btn-submit-gradient">
                {t.contact.sendBtn}
              </button>
              {formStatus && <p className="form-status-msg">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}