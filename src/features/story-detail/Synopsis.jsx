export default function Synopsis({ desciption }) {

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Nội dung khái quát</h2>
      <p className="text-gray-600 leading-relaxed">{desciption}</p>
    </div>
  );
}
