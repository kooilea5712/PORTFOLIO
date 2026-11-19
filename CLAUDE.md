# Portfolio cá nhân — quy tắc cho Claude

Đặc tả đầy đủ: `docs/PORTFOLIO_SPEC.md`. Ảnh tham chiếu phong cách: `docs/reference/*.png`.
Đọc mục liên quan trong spec trước khi làm bất kỳ giai đoạn nào.

## Công nghệ
- HTML + CSS + JavaScript thuần. Không framework, không build tool, không npm (trừ khi người dùng yêu cầu).
- Dữ liệu nằm ở `data/*.js` dạng `window.X = ...`. Không dùng `fetch()` file local, để mở `index.html` trực tiếp vẫn chạy.
- Mọi đường dẫn đều tương đối (để chạy trên GitHub Pages).

## Phong cách — bắt buộc giữ
- Nền xám nhạt `--bg`, chữ đen `--ink`, section tối `--dark`. Chỉ **một** màu nhấn `--accent`, chiếm < 5% màn hình.
- Luôn dùng biến trong `assets/css/tokens.css`. Không viết mã màu/cỡ chữ trực tiếp ở file khác.
- Tiêu đề section = component `SectionTitle` (khung viền dày 4px, chữ IN HOA giãn rộng).
- Nút = `BracketButton` (chỉ viền trái/phải). Ngoại lệ duy nhất: nút pill CONTACT ME trên navbar.
- Gần như không bo góc, không đổ bóng, không gradient trang trí (trừ lớp phủ tối trên ảnh hero).
- Ảnh dự án/đời sống mặc định grayscale, hover mới hiện màu.
- Font: Montserrat (tiêu đề, nav, nút), Open Sans (nội dung), Comfortaa 300 (chỉ dòng chào ở hero).
- Rất nhiều khoảng trắng giữa các section (`--space-section`).

## Graphify (bản đồ code)
Repo này được index bởi Graphify sau khi đẩy lên GitHub (`list_repositories` → dùng `owner/name` của repo portfolio).
- Trước khi sửa, tra cứu bằng Graphify thay vì grep: hàm ở đâu → `graphify_find`; ai gọi hàm → `graphify_callers`;
  sửa hàm ảnh hưởng gì → `graphify_impact`; file phụ thuộc/bị phụ thuộc → `graphify_file_neighbors`;
  "phần X hoạt động thế nào" → `query_graph`.
- So `commitSha` trong kết quả với `git rev-parse HEAD`. Khác nhau, hoặc file chưa được push → đọc file hiện tại.
  Graph chỉ cập nhật sau khi push.
- Bản đồ module và bảng debug nằm trong `README.md`. Thêm/đổi tên file hoặc hàm chính → cập nhật README trong cùng lần sửa.
- Tuân thủ "Quy ước code" trong README (hàm có tên, `initX`/`renderX`, không inline onclick) để call graph đúng.

## Cách làm việc
- Làm đúng phạm vi giai đoạn được yêu cầu, không tự làm thêm giai đoạn sau.
- Tái sử dụng component có sẵn trong `components.css` trước khi viết CSS mới.
- Nội dung tiếng Việt có dấu; mọi thứ hiển thị phải đúng font tiếng Việt.
- Sau khi làm xong: kiểm tra ở chiều rộng 375px và 1440px, không có cuộn ngang, không lỗi console.
- Chỗ chưa có nội dung thật: dùng placeholder `{{...}}` hoặc ảnh xám ghi kích thước, không bịa thông tin cá nhân.
- Accessibility: HTML ngữ nghĩa, `alt` cho ảnh, `aria-label` cho nút icon, focus nhìn thấy được, tôn trọng `prefers-reduced-motion`.
