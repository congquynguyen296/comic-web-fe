// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Q.comic</h3>
            <p className="text-sm text-gray-400">
              Nền tảng đọc truyện số 1 Việt Nam
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Về chúng tôi</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Giới thiệu</li>
              <li>Điều khoản</li>
              <li>Chính sách</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Hướng dẫn</li>
              <li>Liên hệ</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Kết nối</h4>
            
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © 2024 truyenvn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
