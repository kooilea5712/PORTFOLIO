# Phiếu thông tin cần điền

Điền vào chỗ `→ ` của từng mục (bỏ trống nếu chưa có / không dùng). Điền xong, **gửi lại cho Claude** (dán nội dung file này vào chat),
Claude sẽ thay vào `data/*.js` và HTML. Hoặc tự chép vào file theo `docs/HUONG_DAN_NOI_DUNG.md`.

Mục nào có **(VI/EN)** thì cho cả hai thứ tiếng; không có bản EN thì ghi "tự dịch" và Claude sẽ dịch giúp.
Mục có **[HTML]** là phần SEO nằm trong HTML (công cụ tìm kiếm đọc), không phải trong `data/`.

---

## 1. Thông tin chung (bắt buộc)

| Mục | Điền vào | Dùng ở |
|---|---|---|
| Họ tên đầy đủ | → | tiêu đề tab, footer, JSON-LD [HTML] |
| Tên viết tắt cho logo (2–3 chữ, vd `NA`) | → | logo navbar (`shortName`) |
| Email nhận thư | → | contact, mailto |
| Thành phố **(VI/EN)** | → | contact ("Vị trí") |
| Đang tìm việc/thực tập? (có/không) | → | chấm "Open to work" |
| Câu chào ở hero **(VI/EN)** — vd "xin chào, mình là An" | → | hero |
| Các chữ tự gõ sau "I'M A" (mặc định DEVELOPER, DESIGNER, STUDENT) | → | hero |

## 2. Giới thiệu

| Mục | Điền vào |
|---|---|
| Giới thiệu ngắn, 2 đoạn **(VI/EN)** — trang chủ | → Đoạn 1: <br>→ Đoạn 2: |
| Giới thiệu dài, 3–4 đoạn **(VI/EN)** — about.html | → |
| Ảnh chân dung (gửi file hoặc đường dẫn, tỉ lệ 4:5) | → |
| Đường dẫn CV (PDF) — để trống nếu chưa có | → |

## 3. Mục "Hiện tại" (trang chủ, nền tối)

| Mục | Điền vào |
|---|---|
| Tên tổ chức / đang làm gì **(VI/EN)** — vd "SINH VIÊN ĐẠI HỌC X" | → |
| Chữ viết tắt/logo lớn mờ làm nền — vd `HUST` | → |
| Mô tả ngắn **(VI/EN)** | → |
| Nút "Xem thêm" dẫn tới link nào (mặc định `about.html`) | → |

## 4. 3 khối "Tôi làm gì"

Mặc định: Thiết kế · Phát triển · Học tập/Nghiên cứu. Đổi tên được.

| Khối | Tiêu đề **(VI/EN)** | Mô tả 2 dòng **(VI/EN)** |
|---|---|---|
| 1 | → | → |
| 2 | → | → |
| 3 | → | → |

## 5. Hành trình (about.html) — 4 mục, thêm bớt được

Mỗi mục: **thời gian** · **loại** (học tập / công việc / câu lạc bộ / khoá học) · **chức danh hoặc ngành học** · **trường/công ty** · **một câu mô tả**

1. →
2. →
3. →
4. →

## 6. Kỹ năng

| Nhóm | Điền vào |
|---|---|
| Đang dùng thành thạo (tối đa ~6) | → tên các kỹ năng |
| Đang học (tên · % tiến độ ước lượng · học từ tháng/năm) | → |
| Công cụ khác (Git, Figma, VS Code…) | → |

Logo: Claude có thể lấy SVG từ simpleicons/devicon nếu bạn cho biết tên công nghệ.

## 7. Dự án (mỗi dự án một khối)

Có bao nhiêu dự án thì lặp lại khối này. Dự án mẫu hiện có 4 cái (web / desktop / local / design) để thay thế.

```
Tên dự án (VI/EN):
Mã đường dẫn (slug, chữ thường không dấu, vd eatsome):
Loại: web | desktop | local (backend) | design
Hiện ở trang chủ? (có/không — nên 4–6 dự án nổi bật):
Năm:
Vai trò (Solo / Team 3 người…):
Mô tả một dòng (VI/EN):
Công nghệ dùng (danh sách):
Link GitHub:
Link demo (web: URL deploy hoặc "lab/<slug>/"):
Link tải xuống (desktop — GitHub Releases):
Link video demo (YouTube hoặc .mp4):
Link Figma (design):
Các lệnh chạy local (local): git clone…, npm install…, npm run dev…
Yêu cầu hệ thống (desktop) (VI/EN):
Vấn đề (VI/EN):
Giải pháp (VI/EN):
Kết quả (VI/EN):
Điều học được (VI/EN):
Tính năng chính (danh sách, VI/EN):
Ảnh bìa + ảnh gallery (gửi file hoặc đường dẫn):
```

## 8. Life — ngoài code

| Mục | Điền vào |
|---|---|
| Câu mở đầu **(VI/EN)** — "Khi không ngồi trước màn hình, mình…" | → |
| Đang đọc / Đang nghe / Mục tiêu tháng này / Đang ở đâu **(VI/EN)** | → |
| Ảnh (6–12 ảnh): mỗi ảnh gồm file · địa điểm · thời gian (MM/YYYY) · một câu | → |

## 9. Mạng xã hội

Chỉ điền cái nào bạn dùng; cái nào không có thì ghi "bỏ".

| Mạng | Link hoặc tên tài khoản | Một dòng mô tả **(VI/EN)** — vd "Code của mình" |
|---|---|---|
| GitHub | → | → |
| LinkedIn | → | → |
| Facebook | → | → |
| Instagram | → | → |
| TikTok | → | → |
| YouTube (nếu có) | → | → |

## 10. Liên hệ

| Mục | Điền vào |
|---|---|
| Câu mời liên hệ **(VI/EN)** | → |
| Web3Forms Access Key (đăng ký miễn phí tại web3forms.com bằng email nhận thư) | → |

## 11. Tên miền & SEO [HTML]

| Mục | Điền vào |
|---|---|
| Tên miền, không có `https://` (vd `an-nguyen.dev`; chưa có thì ghi "chưa có") | → |
| Mô tả trang chủ, ~150 ký tự (cho Google) | → |
| Mô tả trang About / Projects / Life (mỗi cái 1 câu) | → |
| Chữ cái đầu cho favicon | → |
| Ảnh chia sẻ `og-image.jpg` 1200×630 (gửi file) | → |

---

### Chưa có thông tin? Vẫn làm được

- **Chưa có tên miền:** để `{{domain}}`, điền sau khi đăng web.
- **Chưa có key Web3Forms:** form vẫn chạy, chỉ báo "chưa cấu hình" và đưa link mailto.
- **Chưa có ảnh:** hiện khối xám ghi kích thước.
- **Chưa có dự án thật:** giữ dự án mẫu, nhưng nên xoá trước khi đăng.
