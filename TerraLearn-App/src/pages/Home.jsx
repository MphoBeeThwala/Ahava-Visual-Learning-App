import SubjectCard from "../components/SubjectCard";

export default function Home() {
  const subjects = [
    { title: "Biology", description: "Explore cells, tissues, and anatomy with HD microscope views.", path: "/biology" },
    { title: "Chemistry", description: "Run safe virtual experiments and reactions.", path: "/chemistry" },
    { title: "Physics", description: "Interactive models of forces, optics, and electricity.", path: "/physics" },
    { title: "Geography", description: "HD maps, earth systems, and immersive exploration.", path: "/geography" },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Learn Through Experience</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((s) => (
          <SubjectCard key={s.title} {...s} />
        ))}
      </div>
    </div>
  );
}
