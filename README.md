# Portfolio cá nhân

Website portfolio tĩnh, tối giản trắng đen + một màu nhấn. HTML/CSS/JS thuần, không build tool, deploy GitHub Pages.

> README này là **bản đồ kiến trúc** của dự án. Graphify (gói Free) chỉ index file tài liệu `README.md`,
> nên mọi thông tin cấu trúc quan trọng phải nằm ở đây. Đặc tả thiết kế chi tiết: `docs/PORTFOLIO_SPEC.md`.
> **Khi thêm/đổi file hoặc hàm chính, cập nhật bảng "Bản đồ module" bên dưới.**

## Chạy local

Mở `index.html` trực tiếp bằng trình duyệt (dữ liệu là file `.js`, không cần server).
Muốn tự reload khi sửa: dùng extension Live Server của VS Code.

## Luồng dữ liệu

```
data/*.js  ──(window.PROFILE / SKILLS / PROJECTS / LIFE)──►  assets/js/render.js  ──►  DOM (#skills, #projects, #life…)
                                                             assets/js/project.js ──►  project.html?p=<slug>
assets/js/main.js   → hành vi chung mọi trang (navbar, menu mobile, reveal, typing hero)
assets/js/contact.js→ form liên hệ + copy email
assets/js/i18n.js   → đổi VI/EN (data-i18n="key")
assets/css/tokens.css → biến thiết kế; base → components → pages (thứ tự nạp cố định)
```

Thứ tự `<script>` trong mọi trang: `data/*.js` → `assets/js/main.js` → script riêng của trang. Tất cả dùng `defer`.

## Bản đồ module

| File | Trách nhiệm | Hàm chính (tên cố định) | Đọc dữ liệu | Ghi vào DOM |
|---|---|---|---|---|
| `data/profile.js` | Thông tin cá nhân, social, trạng thái | — | — | — |
| `data/skills.js` | Kỹ năng: mastered / learning / tools | — | — | — |
| `data/projects.js` | Danh sách dự án | — | — | — |
| `data/life.js` | Ảnh đời sống | — | — | — |
| `assets/js/main.js` | Hành vi chung | `initNavbar`, `initMobileMenu`, `initReveal`, `initHeroTyping`, `initBackToTop` | `PROFILE.roles` | `header`, `.hero` |
| `assets/js/render.js` | Sinh HTML từ dữ liệu | `renderSkills`, `renderProjectGrid`, `renderProjectCard`, `initProjectFilter`, `renderLife`, `renderSocials`, `renderNow` | tất cả `data/*` | `#skills`, `#projects`, `#life`, `#socials` |
| `assets/js/project.js` | Trang chi tiết dự án | `getProjectSlug`, `findProject`, `renderProjectPage`, `renderPreviewWeb`, `renderPreviewDesktop`, `renderPreviewLocal`, `renderPreviewDesign`, `renderProjectNav` | `PROJECTS` | `#project` |
| `assets/js/contact.js` | Form + copy email | `initContactForm`, `validateContactForm`, `submitContactForm`, `initCopyEmail` | `PROFILE.email` | `#contact` |
| `assets/js/i18n.js` | Song ngữ | `initI18n`, `setLanguage`, `translatePage` | `I18N` | `[data-i18n]` |
| `assets/css/tokens.css` | Biến màu/font/khoảng cách | — | — | — |
| `assets/css/components.css` | `.section-title`, `.btn-bracket`, `.btn-pill`, `.zigzag`, `.project-card`, `.tag`, `.filter-tabs`, `.input-underline`, `.status-dot`, `.social-icons` | — | — | — |

## Tra cứu khi debug

| Triệu chứng | Xem ở đâu |
|---|---|
| Section trống, không có dự án/kỹ năng | Console lỗi cú pháp trong `data/*.js` → `render.js` (`renderProjectGrid`, `renderSkills`) |
| Trang chi tiết dự án báo "không tìm thấy" | `?p=` trong URL khớp `slug` trong `data/projects.js`? → `project.js` `findProject` |
| Khối "Xem thử" sai loại | trường `type` của dự án (`web`/`desktop`/`local`/`design`) → `renderProjectPage` |
| Iframe web con trắng | đường dẫn `links.demo` (tương đối, ví dụ `lab/<slug>/`) và `lab/<slug>/index.html` có tồn tại |
| Navbar không đổi màu khi cuộn / menu mobile không mở | `main.js` `initNavbar`, `initMobileMenu` |
| Màu/font sai | `tokens.css` — không được có mã màu viết thẳng ở file khác |
| Form không gửi | `contact.js` `submitContactForm`, access key Web3Forms |
| Chạy local được nhưng hỏng trên GitHub Pages | đường dẫn bắt đầu bằng `/` (phải là tương đối) |

## Quy ước code (giúp Graphify dựng call graph chính xác)

- Logic chính viết bằng **hàm khai báo có tên** (`function renderProjectCard(project) {…}`), không dùng arrow function ẩn danh cho logic chính.
- Một file = một trách nhiệm như bảng trên. Hàm khởi tạo đặt tên `initX`, hàm sinh HTML đặt tên `renderX`.
- Không dùng `onclick="…"` trong HTML. Gắn sự kiện trong các hàm `initX`.
- Mỗi file JS kết thúc bằng một khối khởi tạo duy nhất `document.addEventListener('DOMContentLoaded', …)` gọi các `initX`.
- Không đổi tên hàm trong bảng trên mà không cập nhật README.

## Cấu trúc thư mục

Xem mục 7 trong `docs/PORTFOLIO_SPEC.md`.
