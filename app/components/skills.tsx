export default function SkillsSection() {
  const title = "Skills";

  const skills = [
    "C#",
    ".NetCore",
    "JavaScript",
    "Typescript",
    "React",
    "Next",
    "Angular",
    "Node.js",
    "Git",
    "Jira",
    "Aws",
    "Firebase",
    "SQL",
    "PostgreSQL",
  ];

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
          {title}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center justify-center p-4 bg-gray-800 rounded-md text-gray-200 dark:bg-gray-800"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
