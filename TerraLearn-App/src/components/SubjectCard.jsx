import { Link } from "react-router-dom";

export default function SubjectCard({ title, description, path }) {
  return (
    <Link to={path} className="block rounded-lg shadow hover:shadow-lg transition bg-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 line-clamp-3">{description}</p>
    </Link>
  );
}
