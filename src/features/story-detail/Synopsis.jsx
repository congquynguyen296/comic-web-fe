export default function Synopsis({ description, }) {

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Nội dung khái quát</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
