# Portfolio cá nhân — quy tắc cho Claude

Đặc tả đầy đủ: `docs/PORTFOLIO_SPEC.md`. Ảnh tham chiếu phong cách: `docs/reference/*.png`.
Bản đồ module + bảng debug: `README.md`.
Đọc mục liên quan trong spec trước khi làm bất kỳ giai đoạn nào.

## Công nghệ
- HTML + CSS + JavaScript thuần. Không framework, không build tool, không npm (trừ khi người dùng yêu cầu).
- Dữ liệu nằm ở `data/*.js` dạng `window.X = ...`. Không dùng `fetch()` file local, để mở `index.html` trực tiếp vẫn chạy.
- Mọi đường dẫn đều tương đối (không bắt đầu bằng `/`), để chạy được khi mở file trực tiếp và trên mọi server/tên miền.

## Phong cách — bắt buộc giữ
- Nền xám nhạt `--bg`, chữ đen `--ink`, section tối `--dark`. Chỉ **một** màu nhấn `--accent`, chiếm < 5% màn hình.
- Luôn dùng biến trong `assets/css/tokens.css`. Không viết mã màu/cỡ chữ trực tiếp ở file khác.
- Tiêu đề section = component `SectionTitle` (khung viền dày 4px, chữ IN HOA giãn rộng).
- Nút = `BracketButton` (chỉ viền trái/phải). Ngoại lệ duy nhất: nút pill CONTACT ME trên navbar.
- Gần như không bo góc, không đổ bóng, không gradient trang trí (trừ lớp phủ tối trên ảnh hero).
- Ảnh dự án/đời sống mặc định grayscale, hover mới hiện màu.
- Font: Montserrat (tiêu đề, nav, nút), Open Sans (nội dung), Comfortaa 300 (chỉ dòng chào ở hero).
- Rất nhiều khoảng trắng giữa các section (`--space-section`).

## Thông tin cá nhân — giữ nguyên placeholder
- Mọi thông tin cá nhân chưa có (tên, email, link social, bio, dự án, ảnh…) **để nguyên dạng `{{...}}`**,
  ví dụ `{{Họ tên}}`, `{{email}}`, `{{github-user}}`. Người dùng sẽ tự thay khi review.
- Không bịa tên, email, link, số liệu, mô tả dự án. Không thay `{{...}}` có sẵn bằng nội dung tự nghĩ ra.
- Ảnh chưa có: dùng khối xám ghi kích thước (VD `1600×900`), không lấy ảnh ngẫu nhiên trên mạng.
- Dữ liệu mẫu (dự án/kỹ năng demo) phải ghi rõ là mẫu, ví dụ `title: "{{Tên dự án 1}}"`.

## Cách làm việc
- Làm đúng phạm vi giai đoạn được yêu cầu, không tự làm thêm giai đoạn sau.
- Tái sử dụng component có sẵn trong `components.css` trước khi viết CSS mới.
- Nội dung tiếng Việt có dấu; mọi thứ hiển thị phải đúng font tiếng Việt.
- Sau khi làm xong: kiểm tra ở chiều rộng 375px và 1440px, không có cuộn ngang, không lỗi console.
- Accessibility: HTML ngữ nghĩa, `alt` cho ảnh, `aria-label` cho nút icon, focus nhìn thấy được, tôn trọng `prefers-reduced-motion`.
- Thêm/đổi tên file hoặc hàm chính → cập nhật bảng "Bản đồ module" trong `README.md` trong cùng lần sửa.
- Viết code theo "Quy ước code" trong `README.md` (hàm có tên, `initX`/`renderX`, không inline onclick).

## Git — bắt buộc commit sau mỗi lần làm
- **Kết thúc mỗi lượt có thay đổi file đều phải `git commit`**, kể cả thay đổi nhỏ. Không để thay đổi dở dang chưa commit.
- Chỉ commit khi trang chạy được (không lỗi console). Nếu chưa xong, vẫn commit nhưng ghi `WIP:` ở đầu message.
- Message ngắn gọn, dạng: `<giai đoạn/phạm vi>: <làm gì>` — ví dụ `phase1: add design tokens and navbar`.
- `git add` đúng file đã sửa; không commit file bí mật (`.env`) hay file lớn (`.exe`, `.zip`).
- Không `git push`, không đổi nhánh, không `reset`/`rebase` trừ khi người dùng yêu cầu.
