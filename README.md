# Portfolio cá nhân

Website portfolio tĩnh, tối giản trắng đen + một màu nhấn. HTML/CSS/JS thuần, không build tool, chạy trên mọi hosting tĩnh.

> README này là **bản đồ kiến trúc** của dự án: đọc nó trước khi sửa code để biết file/hàm nào liên quan.
> Đặc tả thiết kế chi tiết: `docs/PORTFOLIO_SPEC.md`.
> **Điền nội dung / hiểu cách web chạy (cho người mới): `docs/HUONG_DAN_NOI_DUNG.md`.**
> **Khi thêm/đổi file hoặc hàm chính, cập nhật bảng "Bản đồ module" bên dưới.**

## Chạy local

Cách nhanh nhất (Node, không cần cài thêm gì):

```
node tools/serve.js
```

Rồi mở `http://localhost:5500`. Máy chủ này phục vụ đúng như hosting thật: URL sai → `404.html` với mã 404.
Hoặc vẫn có thể mở `index.html` trực tiếp bằng trình duyệt (`file://`).

Lưu ý: trên local (`localhost`, `127.0.0.1`, `file://`) mọi placeholder `{{...}}` vẫn hiện để bạn thấy còn thiếu gì; trên tên miền thật chúng được ẩn tự động (xem mục "Placeholder" bên dưới).

Mở `index.html` trực tiếp bằng trình duyệt (dữ liệu là file `.js`, không cần server).
Muốn tự reload khi sửa: dùng extension Live Server của VS Code.

## Luồng dữ liệu

```
data/*.js  ──(window.PROFILE / SKILLS / PROJECTS / LIFE)──►  assets/js/render.js  ──►  DOM (#skills, #projects, #life…)
                                                             assets/js/project.js ──►  project.html?p=<slug>
assets/js/main.js   → hành vi chung mọi trang (navbar, menu mobile, reveal, typing hero)
assets/js/contact.js→ form liên hệ + copy email
data/i18n.js        → từ điển { vi, en }
assets/js/i18n.js   → t(key), pickLang(value), translatePage — đổi VI/EN (data-i18n="key"); lưu localStorage `portfolio-lang`, đổi xong reload
assets/css/tokens.css → biến thiết kế; base → components → pages (thứ tự nạp cố định)
```

Thứ tự `<script>` trong mọi trang: `data/*.js` → `data/i18n.js` → `assets/js/i18n.js` → `assets/js/main.js` → script riêng của trang. Tất cả dùng `defer`.

Nội dung cá nhân chỉ sửa trong `data/*.js`; `data/i18n.js` chỉ chứa chữ giao diện (biến `{name}` = `PROFILE.name`). Riêng SEO (`<title>`, meta, canonical, og, JSON-LD, robots, sitemap, favicon) phải sửa tay trong HTML — comment `SEO — sửa tay` ở đầu `<head>`.

Song ngữ: chữ tĩnh trong HTML gắn `data-i18n` / `data-i18n-placeholder` / `data-i18n-aria-label` / `data-i18n-title` / `data-i18n-content`; chữ sinh bằng JS dùng `t("key")`; trường văn bản trong `data/*.js` đọc qua `pickLang()` nên có thể là chuỗi hoặc `{ vi: "…", en: "…" }` (mảng cũng được). Thêm chữ mới → thêm key vào cả `vi` lẫn `en` trong `data/i18n.js`.

## Bản đồ module

| File | Trách nhiệm | Hàm chính (tên cố định) | Đọc dữ liệu | Ghi vào DOM |
|---|---|---|---|---|
| `data/profile.js` | **Nguồn duy nhất** cho nội dung cá nhân: tên, shortName, greeting, bio/bioLong, current, services, timeline, contactLead, lifeIntro, socials, now, email, web3formsKey… (chuỗi hoặc `{ vi, en }`) | — | — | — |
| `data/skills.js` | Kỹ năng: mastered / learning / tools | — | — | — |
| `data/projects.js` | Danh sách dự án | — | — | — |
| `data/life.js` | Ảnh đời sống | — | — | — |
| `tools/serve.js` | Máy chủ tĩnh cho local (Node thuần): `node tools/serve.js`, cổng 5500, URL sai → 404.html | — | — | — |
| `assets/js/main.js` | Hành vi chung. **Placeholder:** `isDevHost`, `isPlaceholder`, `shouldHide`, `liveValue`, `liveText`, `liveList`, `hideSection`, `sweepPlaceholders` (lưới an toàn khi tải trang), `reportPlaceholders` (in danh sách `{{` trên local) | `initNavbar`, `initMobileMenu`, `initReveal`, `initInViewColor` + `observeInViewColor(root)` (mobile: ảnh hiện màu khi cuộn tới; render.js gọi lại sau khi sinh phần tử), `initHeroTyping`, `initBackToTop`, hàm dùng chung `escapeHtml`, `copyText` (đã chuyển từ render.js/contact.js) | `PROFILE.roles` | `header`, `.hero`, `[data-hero-role]` |
| `assets/css/pages.css` | CSS riêng trang chủ: `.hero`, `.current`, `.about`, `.skills__*`, `.projects__*`, `.life__*`, `.now`, `.social-card`, `.contact` | — | — | — |
| `assets/css/base.css` | Reset, typography, `.container`, `.section`, `.reveal`, `.visually-hidden` | — | — | — |
| `assets/js/render.js` | Sinh HTML từ dữ liệu | `renderSkills`, `renderProjectGrid(options)` (options: `featuredOnly`, `type`, `stack`), `filterProjects`, `renderProjectCard`, `initProjectFilter` (trang chủ), `initProjectsPage` (projects.html: lọc loại + công nghệ, đồng bộ URL `?type=&stack=`), `renderLife(limit)` (trang chủ 6 ảnh qua `data-limit`; `life-grid[data-lightbox]` → ảnh là `<button>`), `renderAboutBio`, `renderTimeline`, `renderCvLinks` (`[data-cv]`, ẩn khi `PROFILE.cv` rỗng), `renderSocials`, `renderNow`, `renderOpenToWork`, `renderBranding` (logo), `renderProfileText` (`[data-profile]`: greeting, contactLead, lifeIntro), `renderHomeBio`, `renderCurrent`, `renderServices`, `renderLocation`, helper `escapeHtml` | tất cả `data/*` | `#skills-*`, `#project-grid` (cả index.html và projects.html), `#life-grid`, `#now`, `#socials`, `[data-socials]`, `[data-short-name]`, `[data-profile]`, `[data-current]`, `[data-services]`, `#home-bio` |
| `projects.html`, `project.html` | Trang con: danh sách tất cả dự án / chi tiết `?p=<slug>` (navbar `data-solid`, link `index.html#…`) | — | `PROJECTS` | `#project-grid`, `#project` |
| `about.html`, `life.html` | Trang con: giới thiệu + timeline / ảnh đời sống + Now + social | — | `PROFILE`, `LIFE` | `#about-portrait`, `#about-bio`, `#timeline`, `#life-grid`, `#now`, `#socials` |
| `404.html` | Trang lỗi. **Ngoại lệ:** dùng đường dẫn tuyệt đối từ gốc (`/assets/...`) vì server hiển thị nó tại mọi URL sai | — | `PROFILE` | `[data-socials]` |
| `assets/js/lightbox.js` | Lightbox xem ảnh life.html (chuột, phím Esc/←/→/Tab, vuốt, khoá cuộn, trả focus) | `initLightbox`, `openLightbox`, `closeLightbox`, `showLightboxAt`, `handleLightboxKey` | `LIFE` | `.lightbox` (tạo bằng JS) |
| `assets/files/` | CV (`cv.pdf`) — chỉ có `.gitkeep`; đặt PDF thật rồi điền `PROFILE.cv` | — | — | — |
| `assets/js/project.js` | Trang chi tiết dự án | `getProjectSlug`, `findProject`, `renderProjectPage`, `renderProjectHeader`, `renderCaseStudy`, `renderStackAndFeatures`, `renderGallery`, `renderVideo`, `initCopyCode`, `renderPreviewWeb`, `renderPreviewDesktop`, `renderPreviewLocal`, `renderPreviewDesign`, `renderProjectNav` | `PROJECTS`, `PROFILE.name` | `#project` |
| `assets/js/contact.js` | Form + copy email | `initContactForm`, `validateContactForm`, `submitContactForm` (POST Web3Forms), `isWeb3formsConfigured`, `showFormMessage`, `initCopyEmail` | `PROFILE.email`, `PROFILE.web3formsKey` | `#contact-form`, `[data-copy-email]` (giai đoạn 2: chỉ kiểm tra dữ liệu; `submitContactForm` chưa gửi thật) |
| `data/i18n.js` | Từ điển giao diện VI/EN (`window.I18N`) | — | — | — |
| `assets/js/i18n.js` | Song ngữ | `getLanguage`, `setLanguage`, `t`, `pickLang`, `translatePage`, `initLanguageSwitch`, `initI18n` | `I18N` | `[data-i18n*]`, `[data-lang]` (nút VI/EN), `<html lang>` |
| `assets/css/tokens.css` | Biến màu/font/khoảng cách | — | — | — |
| `assets/css/components.css` | `.section-title`, `.btn-bracket`, `.btn-pill`, `.zigzag`, `.project-card`, `.tag`, `.filter-tabs`, `.input-underline`, `.status-dot`, `.social-icons`, `.site-header` (navbar), `.mobile-menu`, `.site-footer`, `.back-to-top` | — | — | — |

## Placeholder `{{...}}` — ẩn khi lên tên miền thật

- **Local** (`localhost`, `127.0.0.1`, `*.localhost`, `file://`): hiện như cũ; Console (F12) in một lần danh sách các trường còn `{{`, ví dụ `PROFILE.bio.en[0]`.
- **Tên miền thật:** mọi phần tử còn `{{` bị bỏ qua khi vẽ (dự án, ảnh Life, kỹ năng, mạng xã hội, đoạn bio, mục timeline, khối dịch vụ, chữ rời, link, ảnh). Section trống hoàn toàn → ẩn luôn section và link navbar trỏ tới nó. Trang `project.html?p=<slug có {{>` → "Không tìm thấy dự án". Form liên hệ chưa có `web3formsKey` → ẩn form, chỉ còn nút copy email.
- Lưới an toàn: sau khi tải xong, mọi chữ/thuộc tính còn `{{` còn sót (không kịp lọc) cũng bị ẩn trên tên miền thật.
- `favicon.svg` là ảnh tĩnh nên không đọc được `PROFILE.shortName` — sửa tay (xem `docs/HUONG_DAN_NOI_DUNG.md`, mục E).

## Tra cứu khi debug

| Triệu chứng | Xem ở đâu |
|---|---|
| Logo/chào/bio/"Hiện tại"/"Tôi làm gì" trống | trường tương ứng trong `data/profile.js` (xem bảng trường trong `docs/HUONG_DAN_NOI_DUNG.md`) → hàm `renderBranding`/`renderProfileText`/`renderHomeBio`/`renderCurrent`/`renderServices` |
| Section trống, không có dự án/kỹ năng | Console lỗi cú pháp trong `data/*.js` → `render.js` (`renderProjectGrid`, `renderSkills`) |
| Trang chi tiết dự án báo "không tìm thấy" | `?p=` trong URL khớp `slug` trong `data/projects.js`? → `project.js` `findProject` |
| Khối "Xem thử" sai loại | trường `type` của dự án (`web`/`desktop`/`local`/`design`) → `renderProjectPage` |
| Iframe web con trắng | đường dẫn `links.demo` (tương đối, ví dụ `lab/<slug>/`) và `lab/<slug>/index.html` có tồn tại |
| Navbar không đổi màu khi cuộn / menu mobile không mở | `main.js` `initNavbar`, `initMobileMenu` |
| Chữ không đổi khi bấm VI/EN, hoặc hiện nguyên key | thiếu key ở `en` trong `data/i18n.js` (console.warn `[i18n] Thiếu key…`); trường data chưa qua `pickLang` |
| Màu/font sai | `tokens.css` — không được có mã màu viết thẳng ở file khác |
| Form không gửi | `contact.js` `submitContactForm`, access key Web3Forms |
| Chạy local được nhưng hỏng khi đưa lên server | đường dẫn bắt đầu bằng `/` (phải là tương đối; **ngoại lệ duy nhất** là `404.html`) |

## Quy ước code (để dễ đọc, dễ tìm và debug)

- Logic chính viết bằng **hàm khai báo có tên** (`function renderProjectCard(project) {…}`), không dùng arrow function ẩn danh cho logic chính.
- Một file = một trách nhiệm như bảng trên. Hàm khởi tạo đặt tên `initX`, hàm sinh HTML đặt tên `renderX`.
- Không dùng `onclick="…"` trong HTML. Gắn sự kiện trong các hàm `initX`.
- Mỗi file JS kết thúc bằng một khối khởi tạo duy nhất `document.addEventListener('DOMContentLoaded', …)` gọi các `initX`.
- Không đổi tên hàm trong bảng trên mà không cập nhật README.

## Việc cần làm trước khi đăng web

1. **Web3Forms:** đăng ký miễn phí tại web3forms.com (nhập email nhận thư) → dán Access Key vào `PROFILE.web3formsKey` trong `data/profile.js`. Chưa thay thì form báo "chưa được cấu hình" và đưa link mailto.
2. **Tên miền:** thay mọi `{{domain}}` (canonical, og:url, og:image, JSON-LD trong `index.html`, `robots.txt`, `sitemap.xml`).
3. **Ảnh chia sẻ:** thêm `assets/img/og-image.jpg` (1200×630) — chưa có file này.
4. **CV:** đặt `assets/files/cv.pdf` rồi điền `PROFILE.cv = "assets/files/cv.pdf"` (để `null` thì nút Tải CV ẩn).
5. **Favicon:** sửa chữ "A" trong `favicon.svg` thành chữ cái đầu của bạn.
6. Thay các `{{...}}` còn lại; cập nhật `sitemap.xml` khi thêm dự án; đồng bộ JSON-LD (`sameAs`) với link social trong `data/profile.js`.
7. Đặt `404.html` đúng chỗ hosting yêu cầu (xem ngoại lệ đường dẫn tuyệt đối ở trên).

## Cấu trúc thư mục

Xem mục 7 trong `docs/PORTFOLIO_SPEC.md`.
