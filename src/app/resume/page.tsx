export default function Home() {
  return (
    <main className="p-5 max-w-4xl mx-auto">
      <div className="container">
        <h1 className="section">John Doe</h1>
        <div className="contact-info section">
          <p>Email: johndoe@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>LinkedIn: linkedin.com/in/johndoe</p>
          <p>Location: New York, NY</p>
        </div>

        <div className="section">
          <h2>Professional Summary</h2>
          <p>
            Dynamic and results-driven professional with over 5 years of
            experience in software development and project management. Proven
            ability to lead teams and deliver high-quality software solutions on
            time and within budget.
          </p>
        </div>

        <div className="section">
          <h2>Skills</h2>
          <ul className="skills">
            <li>Programming Languages: JavaScript, Python, Java</li>
            <li>Frameworks: React, Node.js, Django</li>
            <li>Tools & Technologies: Git, Docker, AWS</li>
            <li>Project Management: Agile, Scrum</li>
          </ul>
        </div>

        <div className="section">
          <h2>Experience</h2>
          <ul className="experience">
            <li>
              <h3>Software Engineer | ABC Corp | Jan 2020 - Present</h3>
              <p>
                Developed scalable web applications using React and Node.js.
                Collaborated with cross-functional teams to define project
                requirements and deliver solutions that meet customer needs.
              </p>
            </li>
            <li>
              <h3>Junior Developer | XYZ Inc | Jun 2018 - Dec 2019</h3>
              <p>
                Assisted in the development of internal tools and applications.
                Participated in code reviews and contributed to the improvement
                of coding standards.
              </p>
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>Education</h2>
          <ul className="education">
            <li>
              Bachelor of Science in Computer Science | University of Technology
              | Graduated May 2018
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>Certifications</h2>
          <ul>
            <li>AWS Certified Solutions Architect</li>
            <li>Certified ScrumMaster (CSM)</li>
          </ul>
        </div>

        <div className="section">
          <h2>References</h2>
          <p>Available upon request.</p>
        </div>
      </div>
    </main>
  );
}
