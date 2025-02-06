export default function Synopsis() {
    const synopsis = `Nội dung khái quát của truyện sẽ được hiển thị ở đây...`;
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Nội dung khái quát</h2>
        <p className="text-gray-600 leading-relaxed">{synopsis}</p>
      </div>
    );
  }