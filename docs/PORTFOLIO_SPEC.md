# PORTFOLIO — Bản ý tưởng & đặc tả xây dựng

> Tài liệu này là "bản thiết kế" để giao cho Claude Sonnet / Haiku dựng web.
> Ảnh tham chiếu phong cách (lấy từ file Figma "Portfolio – Tomasz Gajda") nằm ở `docs/reference/`:
> - `figma-desktop.png` — toàn trang bản desktop (bản Figma này thiếu ảnh, chỉ xem bố cục)
> - `figma-mobile.png` — toàn trang bản mobile (có ảnh, xem được không khí màu sắc)
> - `figma-hero-text.png` — cận cảnh phần chữ hero
>
> Chỗ nào ghi `{{...}}` là thông tin bạn cần tự điền.

---

## 1. Tinh thần thiết kế

**Một câu:** *Trang giấy xám nhạt, chữ đen đậm giãn cách rộng, khung viền dày — màu sắc chỉ xuất hiện khi có lý do.*

Những gì rút ra từ bản Figma và giữ lại:

| Đặc điểm trong Figma | Áp dụng cho web của bạn |
|---|---|
| Nền xám rất nhạt (~`#E5E5E5`), chữ đen | Giữ nguyên làm nền chính |
| Tiêu đề section nằm trong **khung chữ nhật viền đen dày**, chữ IN HOA giãn cách rộng (`A B O U T  M E`) | Component `SectionTitle` — dấu ấn nhận diện chính |
| Nút dạng **"ngoặc đứng"**: `│ MORE │` (chỉ có viền trái/phải) | Component `BracketButton` |
| Đường phân cách **`——\/\/\/——`** (gạch ngang + zigzag ở giữa) | Component `ZigzagDivider` (SVG) |
| Hero ảnh toàn màn hình phủ lớp tối, chữ trắng: dòng nhỏ font mảnh tròn *"my name is…"* + dòng lớn **I'M A DEVELOPER** | Hero của bạn, có thêm chữ đổi vai trò |
| Navbar trong suốt → **đen đặc khi cuộn**, nút "CONTACT ME" dạng viên thuốc trắng | Giữ nguyên |
| Section tối xen kẽ (IT Berries) với logo lớn mờ làm nền | Dùng cho mục "Hiện tại tôi đang…" |
| Skills: chia **USING NOW / LEARNING / DIFFERENT**, logo công nghệ **giữ màu gốc** | Đây chính là "điểm màu" tự nhiên |
| Portfolio có **tab lọc** ALL / CODED / DESIGNED, card ảnh lớn + nút DEMO │ INFO | Mở rộng thêm loại dự án (web / desktop / localhost) |
| Form liên hệ chỉ có **gạch chân**, không có khung | Giữ nguyên |
| Footer đen: BACK TO TOP + icon mạng xã hội + copyright | Giữ nguyên |
| Hai bản ngôn ngữ (ENG / Polish) | Bạn: **VI / EN** (giai đoạn sau) |

**Ý tưởng bổ sung để "nhấn nhá màu" mà vẫn tối giản:**
1. **Ảnh mặc định đen trắng, hover mới hiện màu** (`filter: grayscale(1)` → `0`). Áp cho card dự án và ảnh đời sống. Cả trang trắng đen, màu chỉ "bật" khi người xem tương tác — đúng tinh thần, rất ấn tượng.
2. **Một màu nhấn duy nhất** (accent) dùng cho: chữ đổi vai trò ở hero, gạch chân tab đang chọn, chấm trạng thái "Open to work", con trỏ nhấp nháy, hover link.
3. **Logo công nghệ giữ màu gốc** ở mục Skills.

---

## 2. Design tokens

### 2.1 Màu

```css
:root {
  --bg:        #E6E6E6;  /* nền trang (giống Figma) */
  --surface:   #F2F2F2;  /* nền card, input khi focus */
  --ink:       #0D0D0D;  /* chữ chính, viền khung */
  --ink-2:     #3D3D3D;  /* chữ đoạn văn */
  --muted:     #8C8C8C;  /* chữ phụ, tab chưa chọn */
  --line:      #0D0D0D;
  --dark:      #111111;  /* section tối, navbar, footer */
  --on-dark:   #F2F2F2;
  --accent:    #FF4F1F;  /* màu nhấn — chọn 1 trong các phương án dưới */
  --ok:        #2BB673;  /* chấm "Open to work" */
}
```

**Chọn màu nhấn (chỉ một):**
| Tên | Mã | Cảm giác |
|---|---|---|
| Cam đỏ (mặc định) | `#FF4F1F` | năng lượng, nổi bật nhất trên trắng đen |
| Xanh điện | `#2F5BFF` | kỹ thuật, tin cậy |
| Vàng chanh | `#D4FF3A` | trẻ, cá tính (chỉ dùng trên nền tối, chữ đen trên nền vàng) |

Quy tắc: màu nhấn chiếm **< 5% diện tích** màn hình. Không dùng làm nền section lớn.

### 2.2 Font (đều hỗ trợ tiếng Việt, lấy từ Google Fonts)

| Vai trò | Font | Dùng cho |
|---|---|---|
| Display | **Montserrat** 600/700/800 | Tiêu đề, nav, nút, nhãn — thường IN HOA, `letter-spacing: .2em–.35em` |
| Body | **Open Sans** 400/600 | Đoạn văn, form |
| Accent | **Comfortaa** 300 | Chỉ dòng *"xin chào, mình là …"* ở hero (giống chữ mảnh tròn trong Figma) |
| Mono (tuỳ chọn) | **JetBrains Mono** 400 | Đoạn lệnh "cách chạy local", tag kỹ thuật |

### 2.3 Cỡ chữ & khoảng cách

```css
--fs-hero:   clamp(2.5rem, 7vw, 6rem);    /* I'M A DEVELOPER */
--fs-h2:     clamp(1.1rem, 2vw, 1.5rem);  /* chữ trong khung SectionTitle */
--fs-h3:     1.125rem;                     /* tên dự án, DESIGN/DEVELOPMENT */
--fs-body:   1rem;      line-height: 1.7;
--fs-small:  .8125rem;  /* nút, nav, nhãn — luôn IN HOA + giãn chữ */

--space-section: clamp(5rem, 12vw, 9rem); /* khoảng cách giữa các section — Figma rất thoáng */
--container: 1120px;   /* nội dung chữ: tối đa 720px */
--border-thick: 4px;   /* khung SectionTitle */
--border-thin: 2px;    /* ngoặc nút, gạch chân input */
--radius: 0;           /* gần như không bo góc; ngoại lệ: nút CONTACT ME bo tròn hẳn */
```

### 2.4 Chuyển động
- Hiện dần khi cuộn tới: `opacity 0→1`, `translateY 24px→0`, 600ms, dùng `IntersectionObserver`.
- Navbar đổi nền khi `scrollY > 80`.
- Ảnh: grayscale → màu, 400ms.
- Tôn trọng `prefers-reduced-motion: reduce` (tắt hết hiệu ứng di chuyển).

---

## 3. Component dùng chung

| Component | Mô tả |
|---|---|
| `SectionTitle` | Khung viền `4px` màu `--ink`, padding `1.25rem 2.75rem`, chữ Montserrat 700 IN HOA `letter-spacing:.35em`, căn giữa trang. Trên section tối thì viền/chữ màu `--on-dark`. |
| `BracketButton` | `border-left` + `border-right` 2px, không có viền trên/dưới, chữ nhỏ IN HOA giãn rộng, padding `.5rem 2rem`. Hover: nền `--ink`, chữ `--bg`. |
| `PillButton` | Nút CONTACT ME ở nav: nền trắng, chữ đen, `border-radius: 999px`. |
| `ZigzagDivider` | SVG: gạch ngang 40px – zigzag 4 đỉnh – gạch ngang 40px, nét 2px. |
| `SocialIcons` | Hàng icon SVG (email, GitHub, LinkedIn, Facebook, Instagram, TikTok, YouTube…), 28–32px, hover → `--accent`. |
| `FilterTabs` | Hàng chữ IN HOA, gạch chân mảnh xám chạy suốt; tab đang chọn chữ `--ink` + gạch chân `--accent` 2px. |
| `ProjectCard` | Ảnh 16:10 (grayscale), dưới là: nhãn loại (`WEB` / `DESKTOP` / `LOCALHOST`), tên dự án viết thường đậm kiểu `eatsome.`, mô tả 1 dòng, tag công nghệ, hàng nút `│ DEMO │ INFO │ CODE │`. |
| `Tag` | Chữ mono nhỏ, viền 1px, không bo góc. |
| `StatusDot` | Chấm tròn 8px nhấp nháy nhẹ + chữ "Đang tìm cơ hội thực tập / Open to work". |
| `UnderlineInput` | Input/textarea chỉ có `border-bottom: 2px`, placeholder IN HOA nhỏ màu `--muted`; focus → gạch chân `--accent`. |

---

## 4. Sơ đồ trang (sitemap)

```
/                       Trang chủ (one-page, cuộn dọc)
/about.html             Giới thiệu đầy đủ + timeline học tập/kinh nghiệm + tải CV
/projects.html          Tất cả dự án + lọc
/project.html?p=<slug>  Trang chi tiết một dự án (1 template, đọc dữ liệu theo slug)
/life.html              Cuộc sống thường ngày: gallery ảnh + mạng xã hội
/lab/<slug>/            "Web con": bản build tĩnh của các dự án website, chạy trực tiếp
/404.html               Trang lỗi cùng phong cách
```

---

## 5. Trang chủ — từng section

### 5.0 Navbar
- Trái: logo chữ viết tắt tên `{{AB}}` (Montserrat 800, có thể chấm màu nhấn: `AB.`).
- Phải: `About` · `Skills` · `Projects` · `Life` · nút pill `CONTACT ME`.
- Trong suốt khi ở đầu trang → nền `--dark` khi cuộn.
- Mobile: icon hamburger → menu phủ toàn màn hình nền đen, chữ lớn IN HOA giãn rộng, icon mạng xã hội ở đáy (giống frame "Dropdown menu" trong Figma).
- Có nút đổi ngôn ngữ `VI / EN` (giai đoạn 5).

### 5.1 Hero
- Ảnh nền toàn màn hình (ảnh của bạn hoặc phong cảnh), phủ gradient tối `rgba(0,0,0,.55)`.
- Dòng 1 (Comfortaa 300): *"xin chào, mình là {{Tên}}"*
- Dòng 2 (Montserrat 700, IN HOA): **I'M A** `<span class="accent">DEVELOPER</span>` — chữ cuối tự đổi lần lượt: `DEVELOPER` → `DESIGNER` → `STUDENT` → `{{...}}` (hiệu ứng gõ chữ, con trỏ màu nhấn).
- `ZigzagDivider` màu trắng.
- `SocialIcons`: email · GitHub · LinkedIn.
- `StatusDot`: "Open to work" (tuỳ chọn).
- Đáy: mũi tên nhỏ "scroll" nhấp nháy.

### 5.2 "Hiện tại" (section tối — tương đương IT BERRIES)
- Nền `--dark`, logo trường/CLB/công ty lớn mờ (opacity .08) làm nền.
- Tiêu đề trái: `{{TÊN TỔ CHỨC / ĐANG LÀM GÌ}}`, đoạn mô tả ngắn, nút `│ XEM THÊM │`.
- Có thể làm dạng 2–3 thẻ ngang nếu có nhiều mục (VD: "Đang học tại…", "Thành viên CLB…", "Đang thực tập tại…").

### 5.3 About me
- `SectionTitle`: **ABOUT ME**
- Ảnh chân dung nhỏ (grayscale, hover màu) + 2 đoạn giới thiệu (tối đa 720px).
- Nút `│ EXPLORE │` → `about.html`.
- `ZigzagDivider`
- 3 khối "Tôi làm gì" (Figma: DESIGN / DEVELOPMENT / MAINTENANCE), mỗi khối: icon nét mảnh xám + tiêu đề IN HOA + 2 dòng mô tả. Gợi ý cho bạn: **DESIGN** · **DEVELOPMENT** · **LEARNING / RESEARCH** (sửa theo thực tế).
- Dòng số liệu nhỏ (tuỳ chọn): `12+ dự án · 3 năm học code · 5 ngôn ngữ`.

### 5.4 Skills
- `SectionTitle`: **SKILLS**
- 3 nhóm, tiêu đề nhóm IN HOA giãn rộng căn trái:
  - **ĐANG DÙNG THÀNH THẠO** (Using now) — logo màu gốc, cỡ lớn (~72–96px), tên bên dưới.
  - **ĐANG HỌC** (Learning) — logo cỡ vừa, **grayscale + có thanh tiến độ mảnh màu nhấn** hoặc nhãn "từ 09/2026".
  - **CÔNG CỤ KHÁC** (Tools) — Git, Figma, VS Code, Docker, Notion… dạng chip chữ nhỏ.
- Logo SVG lấy từ [simpleicons.org](https://simpleicons.org) hoặc [devicon](https://devicon.dev) (cả hai miễn phí).
- Dữ liệu trong `data/skills.js` — thêm/bớt kỹ năng không phải sửa HTML.

### 5.5 Projects (Portfolio)
- `SectionTitle`: **PROJECTS**
- `FilterTabs`: `TẤT CẢ` · `WEBSITE` · `DESKTOP APP` · `LOCALHOST / BACKEND` · `DESIGN`
- Lưới `ProjectCard` (desktop 2 cột, mobile 1 cột), chỉ hiện các dự án `featured: true` (4–6 cái).
- Cuối: dòng *"And many more to come!"* + nút `│ XEM TẤT CẢ │` → `projects.html`.
- Tuỳ chọn: khối "Mới đẩy lên GitHub" — tự lấy 3 repo cập nhật gần nhất qua `https://api.github.com/users/{{github}}/repos?sort=updated&per_page=3` (không cần token).

### 5.6 Life — ngoài code
- `SectionTitle`: **LIFE**
- Một câu mở đầu ngắn kiểu: *"Khi không ngồi trước màn hình, mình…"*
- **Lưới ảnh masonry** 6–9 ảnh (grayscale → màu khi hover), mỗi ảnh có chú thích nhỏ hiện khi hover (địa điểm, ngày, 1 câu).
- **Khối "Now"** (cập nhật thủ công): 📖 Đang đọc · 🎧 Đang nghe · 🎯 Mục tiêu tháng này · 📍 Đang ở đâu.
- **Thẻ mạng xã hội**: mỗi thẻ = icon lớn + tên nền tảng + @username + 1 dòng mô tả ("Nơi mình đăng ảnh du lịch") → mở tab mới. Hover thẻ đổi sang màu thương hiệu của nền tảng (một điểm màu nữa).
- Nút `│ XEM THÊM │` → `life.html`.

### 5.7 Contact
- `SectionTitle`: **CONTACT**
- Câu mời ngắn + `ZigzagDivider`.
- Hai cột (mobile thành một):
  - Trái: form `UnderlineInput` — TÊN*, EMAIL*, CHỦ ĐỀ, LỜI NHẮN* → nút `│ GỬI │`.
  - Phải: email (bấm để copy, hiện "Đã copy ✓"), vị trí `{{Thành phố}}`, `StatusDot`, nút `│ TẢI CV │`, icon mạng xã hội.
- Form gửi qua dịch vụ miễn phí **Formspree** hoặc **Web3Forms** (web tĩnh không có server). Có kiểm tra dữ liệu phía client, thông báo gửi thành công/thất bại ngay dưới nút.

### 5.8 Footer
- Nền `--dark`. `↑ BACK TO TOP` · hàng icon mạng xã hội · `© 2026 {{Tên}}. Made with ♥ & coffee.`

---

## 6. Trưng bày dự án — 3 loại, 3 cách

Đây là phần quan trọng nhất. Mỗi dự án có một trang chi tiết `project.html?p=<slug>` theo cùng bố cục, nhưng phần **"Xem thử"** khác nhau theo loại:

| Loại | Vấn đề | Cách trưng bày |
|---|---|---|
| **WEBSITE** (HTML/CSS/JS, React build tĩnh…) | Chạy được trên trình duyệt | Đặt bản build vào `/lab/<slug>/` → thành **"web con"** chạy ngay trên domain của bạn. Trang chi tiết nhúng `<iframe>` xem trước trong khung giả lập trình duyệt (3 chấm tròn + thanh địa chỉ) + nút `│ MỞ TOÀN MÀN HÌNH │`. Dự án lớn đã deploy riêng (Vercel/Netlify) thì chỉ cần link. |
| **DESKTOP APP** (.exe, WinForms, C#, Python GUI…) | Không chạy được trên web | Video/GIF demo (ghi bằng OBS / ScreenToGif) + gallery ảnh chụp màn hình + nút `│ TẢI XUỐNG │` trỏ tới **GitHub Releases** (không để file .exe trong repo web) + ghi rõ yêu cầu hệ thống. |
| **LOCALHOST / BACKEND** (Node, PHP, Java, Python server, có database) | Cần server | Video walkthrough + ảnh chụp + khối **"Cách chạy local"** (code block có nút copy: `git clone …`, `npm install`, `npm run dev`) + sơ đồ kiến trúc nhỏ (tuỳ chọn). Nếu muốn có demo thật: deploy miễn phí lên **Render / Railway** rồi thêm link. |
| **DESIGN** (Figma, UI) | — | Ảnh lớn + link Figma/Behance. |

**Bố cục trang chi tiết dự án:**
1. Nút `← Quay lại` · nhãn loại · tên dự án lớn · mô tả 1 câu · năm · vai trò (solo/team).
2. Hàng nút: `│ DEMO │ CODE │ TẢI XUỐNG │` (chỉ hiện nút có dữ liệu).
3. Khối "Xem thử" theo bảng trên.
4. **Vấn đề → Giải pháp → Kết quả** (3 đoạn ngắn, kiểu case study).
5. Công nghệ đã dùng (tag) · Tính năng chính (gạch đầu dòng) · Điều mình học được.
6. Gallery ảnh.
7. Dự án tiếp theo `→` (điều hướng qua lại).

---

## 7. Cấu trúc thư mục & dữ liệu

**Công nghệ đề xuất:** HTML + CSS + JavaScript thuần, **không cần build tool**. Lý do: dễ cho Sonnet/Haiku làm đúng, dễ cho bạn sửa, deploy miễn phí lên GitHub Pages trong 2 phút, và các "web con" chỉ là thư mục tĩnh.

```
PORFORLIO/
├─ index.html  about.html  projects.html  project.html  life.html  404.html
├─ assets/
│  ├─ css/
│  │  ├─ tokens.css       # biến màu/font/khoảng cách (mục 2)
│  │  ├─ base.css         # reset, typography, layout chung
│  │  ├─ components.css   # mục 3
│  │  └─ pages.css        # style riêng từng trang
│  ├─ js/
│  │  ├─ main.js          # navbar, menu mobile, reveal khi cuộn, typing hero
│  │  ├─ render.js        # đọc data/*.js → sinh HTML cho skills, projects, life
│  │  ├─ project.js       # trang chi tiết dự án theo ?p=slug
│  │  ├─ contact.js       # form + copy email
│  │  └─ i18n.js          # (giai đoạn 5) VI/EN
│  ├─ img/
│  │  ├─ hero/  portrait/  life/  logos/  og-image.jpg
│  │  └─ projects/<slug>/cover.webp, 1.webp, 2.webp…
│  ├─ video/              # demo ngắn (.mp4 < 10MB) — dài hơn thì đưa lên YouTube và nhúng
│  └─ files/cv.pdf
├─ data/
│  ├─ profile.js   # tên, vai trò, bio, email, social, trạng thái
│  ├─ skills.js
│  ├─ projects.js
│  └─ life.js
├─ lab/<slug>/     # web con
└─ docs/           # tài liệu này + ảnh tham chiếu (không deploy cũng được)
```

> Dữ liệu viết dạng `window.PROJECTS = [...]` trong file `.js` (không dùng `fetch` JSON) để mở `index.html` trực tiếp bằng trình duyệt vẫn chạy, không cần server.

### 7.1 Mẫu dữ liệu

```js
// data/profile.js
window.PROFILE = {
  name: "{{Họ tên}}",
  shortName: "{{AB}}",
  greeting: "xin chào, mình là {{Tên}}",
  roles: ["DEVELOPER", "DESIGNER", "STUDENT"],
  bio: ["{{Đoạn 1}}", "{{Đoạn 2}}"],
  location: "{{Thành phố}}, Việt Nam",
  email: "{{email}}",
  openToWork: true,
  cv: "assets/files/cv.pdf",
  socials: [
    { id: "github",    url: "https://github.com/{{user}}",    handle: "@{{user}}", note: "Code của mình" },
    { id: "linkedin",  url: "https://linkedin.com/in/{{user}}", handle: "{{user}}", note: "Kinh nghiệm" },
    { id: "facebook",  url: "…", handle: "…", note: "…" },
    { id: "instagram", url: "…", handle: "…", note: "Ảnh đời thường" },
    { id: "tiktok",    url: "…", handle: "…", note: "…" }
  ],
  now: { reading: "…", listening: "…", goal: "…", place: "…" }
};

// data/skills.js
window.SKILLS = {
  mastered: [ { name: "HTML5", icon: "assets/img/logos/html5.svg" }, … ],
  learning: [ { name: "React", icon: "…", progress: 40, since: "2026-09" }, … ],
  tools:    [ "Git", "Figma", "VS Code", "Docker", … ]
};

// data/projects.js
window.PROJECTS = [
  {
    slug: "eatsome",
    title: "eatsome.",
    type: "web",                 // "web" | "desktop" | "local" | "design"
    featured: true,
    year: 2026,
    role: "Solo",
    summary: "Ứng dụng tìm nhà hàng theo khẩu vị",
    cover: "assets/img/projects/eatsome/cover.webp",
    gallery: ["…/1.webp", "…/2.webp"],
    stack: ["HTML", "SCSS", "JavaScript"],
    links: {
      demo: "lab/eatsome/",      // web: web con hoặc URL deploy
      github: "https://github.com/…",
      download: null,            // desktop: link GitHub Releases
      video: null,               // desktop/local: mp4 hoặc link YouTube
      figma: null
    },
    runLocal: null,              // local: ["git clone …", "npm install", "npm run dev"]
    requirements: null,          // desktop: "Windows 10+, .NET 8"
    caseStudy: { problem: "…", solution: "…", result: "…", learned: "…" },
    features: ["…", "…"]
  }
];

// data/life.js
window.LIFE = [
  { img: "assets/img/life/01.webp", caption: "Đà Lạt, 03/2026", note: "…" }
];
```

---

## 8. Yêu cầu chất lượng

- **Responsive**: breakpoint 480 / 768 / 1024 / 1440px. Thiết kế mobile trước. Không cuộn ngang ở 360px.
- **Hiệu năng**: ảnh `.webp`, ảnh ngoài màn hình đầu dùng `loading="lazy"`, hero ≤ 300KB, font chỉ tải đúng weight cần dùng.
- **Accessibility**: HTML ngữ nghĩa (`header/nav/main/section/footer`), mọi ảnh có `alt`, focus bàn phím nhìn thấy được (viền màu nhấn), độ tương phản chữ đạt WCAG AA, nút icon có `aria-label`.
- **SEO/chia sẻ**: `<title>`, `meta description`, Open Graph image cho từng trang, `favicon.svg`.
- **Không dùng thư viện nặng**. Được phép: icon SVG nội tuyến, Google Fonts. Tuỳ chọn: GLightbox cho gallery.

---

## 9. Lộ trình dựng — chia giai đoạn & prompt mẫu

Mỗi giai đoạn là một phiên làm việc riêng. Mở Claude Code trong thư mục `D:\PORFORLIO` (file `CLAUDE.md` ở gốc sẽ tự được đọc), rồi dán prompt.

**Vòng lặp với Graphify:** xong mỗi giai đoạn → commit + push lên GitHub → chờ Graphify index lại (vài phút) → giai đoạn sau model tra cứu code bằng Graphify thay vì đọc lại toàn bộ file (tiết kiệm token, hợp với Haiku). Thêm câu này vào cuối mỗi prompt từ giai đoạn 2 trở đi:
```
Trước khi sửa, dùng Graphify (repo portfolio) để tìm hàm/file liên quan và kiểm tra ảnh hưởng.
Xong việc thì cập nhật bảng "Bản đồ module" trong README.md.
```

| # | Giai đoạn | Model nên dùng |
|---|---|---|
| 1 | Nền móng: tokens, base, components, navbar, footer | **Sonnet** |
| 2 | Trang chủ đầy đủ các section với dữ liệu mẫu | **Sonnet** |
| 3 | `projects.html` + `project.html` (3 loại hiển thị) | **Sonnet** |
| 4 | `about.html`, `life.html`, `404.html` | Haiku |
| 5 | Song ngữ VI/EN, form liên hệ thật, SEO | Haiku |
| 6 | Điền nội dung thật, thêm dự án, đưa web con vào `/lab` | Haiku |
| 7 | Deploy GitHub Pages | Haiku |

**Prompt giai đoạn 1**
```
Đọc docs/PORTFOLIO_SPEC.md (mục 1–3, 7) và xem các ảnh trong docs/reference/.
Tạo nền móng: assets/css/tokens.css, base.css, components.css; index.html chỉ gồm
navbar (trong suốt → đen khi cuộn, menu mobile toàn màn hình) và footer; assets/js/main.js.
Dựng một trang demo tạm components-demo.html hiển thị mọi component ở mục 3 để mình duyệt.
Chưa làm các section khác.
```

**Prompt giai đoạn 2**
```
Theo mục 5 của docs/PORTFOLIO_SPEC.md, dựng đầy đủ các section trang chủ 5.1 → 5.8.
Tạo data/profile.js, skills.js, projects.js (3 dự án mẫu: 1 web, 1 desktop, 1 local), life.js
với dữ liệu mẫu, và assets/js/render.js để sinh HTML từ dữ liệu. Ảnh tạm dùng placeholder
màu xám có ghi kích thước. Kiểm tra ở 375px và 1440px.
```

**Prompt giai đoạn 3**
```
Theo mục 6 của docs/PORTFOLIO_SPEC.md, tạo projects.html (lọc theo loại, lọc theo công nghệ)
và project.html đọc ?p=slug từ data/projects.js, hiển thị khối "Xem thử" khác nhau cho
web (iframe khung trình duyệt) / desktop (video + tải xuống) / local (code block có nút copy).
Thêm một web con mẫu ở lab/demo-site/ để thử iframe.
```

**Prompt giai đoạn 4**
```
Theo docs/PORTFOLIO_SPEC.md, tạo about.html (bio dài, timeline học tập/kinh nghiệm, nút tải CV),
life.html (gallery masonry grayscale→màu + lightbox, khối Now, thẻ mạng xã hội) và 404.html.
Dùng lại component và CSS đã có, không thêm style mới nếu không cần.
```

**Prompt giai đoạn 5**
```
Thêm chuyển ngôn ngữ VI/EN: assets/js/i18n.js, chữ tĩnh dùng data-i18n="key",
nhớ lựa chọn bằng localStorage. Nối form liên hệ với Web3Forms (access key mình sẽ tự điền
vào chỗ ACCESS_KEY). Thêm meta SEO + Open Graph cho mọi trang.
```

**Prompt giai đoạn 7**
```
Hướng dẫn mình đưa thư mục này lên GitHub repo {{user}}.github.io và bật GitHub Pages.
Kiểm tra mọi đường dẫn là tương đối để chạy được cả trên GitHub Pages.
```

---

## 10. Việc bạn cần chuẩn bị (checklist nội dung)

- [ ] Họ tên, tên viết tắt làm logo, 3–4 "vai trò" cho hero
- [ ] Màu nhấn (mục 2.1)
- [ ] 1 ảnh hero ngang chất lượng cao + 1 ảnh chân dung
- [ ] Bio 2 đoạn (ngắn) + bản dài cho about.html
- [ ] Timeline: trường, CLB, khoá học, thực tập (năm + tên + 1 dòng)
- [ ] Danh sách kỹ năng: thành thạo / đang học / công cụ
- [ ] Mỗi dự án: tên, loại, 1 câu mô tả, ảnh bìa + 2–4 ảnh, link GitHub, link demo/video/release, vấn đề–giải pháp–kết quả
- [ ] 6–12 ảnh đời sống + chú thích
- [ ] Link các mạng xã hội + 1 dòng mô tả mỗi kênh
- [ ] File CV PDF
- [ ] Email nhận liên hệ (để đăng ký Web3Forms/Formspree)

---

## 11. Ý tưởng mở rộng (sau khi xong bản chính)
- Chế độ tối (đảo trắng ↔ đen, màu nhấn giữ nguyên).
- Con trỏ chuột tuỳ biến: chấm tròn màu nhấn, to ra khi hover vào card.
- Trang `/uses` — thiết bị, phần mềm mình đang dùng.
- Blog/ghi chú học tập ngắn (Markdown).
- Đếm lượt xem bằng GoatCounter (miễn phí, không cookie).
