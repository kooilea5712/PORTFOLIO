/* =====================================================================
   THÔNG TIN CÁ NHÂN — nơi DUY NHẤT để sửa nội dung cá nhân (trừ phần SEO trong HTML).
   Mọi {{...}} là placeholder: thay bằng nội dung thật của bạn.
   Trường văn bản có thể là chuỗi  "Xin chào"   hoặc song ngữ  { vi: "Xin chào", en: "Hello" }.
   Hướng dẫn chi tiết: docs/HUONG_DAN_NOI_DUNG.md
   ===================================================================== */
window.PROFILE = {
  // --- Nhận diện ---
  name: "Fein Le",                  // dùng ở tiêu đề tab, footer, alt ảnh chân dung
  shortName: "FK",                 // chữ viết tắt ở logo navbar (mọi trang)
  email: "the.real.mckoy7v@gmail.com",
  location: { vi: "Thành phố Hồ Chí Minh, Việt Nam", en: "Ho Chi Minh City, Vietnam" },
  openToWork: true,                    // true → hiện chấm "Đang tìm cơ hội / Open to work"
  cv: null,                            // vd "assets/files/cv.pdf"; null → ẩn nút Tải CV
  portrait: null,                      // ảnh chân dung (đường dẫn); null → khối xám 800×1000
  web3formsKey: "{{WEB3FORMS_ACCESS_KEY}}",   // đăng ký miễn phí tại web3forms.com

  // --- Hero (đầu trang chủ) ---
  greeting: { vi: "xin chào, mình là Fein", en: "hello, I'm Fein" },
  roles: ["DEVELOPER", "STUDENT", "DESIGNER", "TRAVELER"],   // chữ tự gõ sau "I'M A"; mỗi phần tử có thể là { vi, en }

  // --- Giới thiệu ---
  bio: {                               // 2 đoạn ngắn ở trang chủ
    vi: ["{{Đoạn 1}}", "{{Đoạn 2}}"],
    en: ["{{Paragraph 1}}", "{{Paragraph 2}}"]
  },
  bioLong: {                           // 3–4 đoạn dài ở about.html
    vi: ["{{Đoạn dài 1}}", "{{Đoạn dài 2}}", "{{Đoạn dài 3}}", "{{Đoạn dài 4}}"],
    en: ["{{Long paragraph 1}}", "{{Long paragraph 2}}", "{{Long paragraph 3}}", "{{Long paragraph 4}}"]
  },

  // --- Section "Hiện tại" (nền tối, trang chủ) ---
  current: {
    logo: "{{LOGO}}",                  // chữ lớn mờ làm nền (tên tổ chức viết tắt)
    title: { vi: "{{TÊN TỔ CHỨC / ĐANG LÀM GÌ}}", en: "{{ORGANIZATION / WHAT I'M DOING}}" },
    text: { vi: "{{Mô tả ngắn về việc đang làm}}", en: "{{Short description of what you're doing}}" },
    link: "about.html"                 // nút "Xem thêm" dẫn tới đâu
  },

  // --- 3 khối "Tôi làm gì" (trang chủ + about.html). key: "design" | "development" | "learning" (chọn icon) ---
  services: [
    { key: "design",      title: { vi: "Thiết kế",  en: "Design" },      text: { vi: "{{Mô tả 2 dòng}}", en: "{{Two-line description}}" } },
    { key: "development", title: { vi: "Phát triển", en: "Development" }, text: { vi: "{{Mô tả 2 dòng}}", en: "{{Two-line description}}" } },
    { key: "learning",    title: { vi: "Học tập / Nghiên cứu", en: "Learning / Research" }, text: { vi: "{{Mô tả 2 dòng}}", en: "{{Two-line description}}" } }
  ],

  // --- Hành trình (about.html). kind: "education" | "work" | "club" | "course" ---
  timeline: [
    { period: "{{2023 – nay}}", kind: "education", title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" },
    { period: "{{2024 – nay}}", kind: "club",      title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" },
    { period: "{{2025}}",       kind: "work",      title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" },
    { period: "{{2026}}",       kind: "course",    title: "{{Tên vị trí / ngành học}}", org: "{{Tên trường / công ty}}", note: "{{Một câu}}" }
  ],

  // --- Câu chữ rời ---
  contactLead: { vi: "{{Câu mời liên hệ ngắn}}", en: "{{Short invitation to get in touch}}" },
  lifeIntro: { vi: "{{Khi không ngồi trước màn hình, mình…}}", en: "{{When I'm away from the screen, I…}}" },

  // --- Mạng xã hội (xoá cả dòng để ẩn một mạng). id: github | linkedin | facebook | instagram | tiktok | youtube ---
  socials: [
    { id: "github",    url: "https://github.com/kooilea5712",            handle: "@kooilea5712",        note: "{{Ghi chú GitHub}}" },
    { id: "linkedin",  url: "https://www.linkedin.com/in/anh-kh%C3%B4i-l%C3%AA-b11410445/", handle: "anh-khôi-lê-b11410445", note: "{{Ghi chú LinkedIn}}" },
    { id: "facebook",  url: "https://www.facebook.com/kooilea.7512/",    handle: "kooilea.7512",        note: "{{Ghi chú Facebook}}" },
    { id: "instagram", url: "https://www.instagram.com/bf.material_k/",  handle: "@bf.material_k",      note: "{{Ghi chú Instagram}}" },
    { id: "tiktok",    url: "https://www.tiktok.com/@the_riu_mc.koy",    handle: "@the_riu_mc.koy",     note: "{{Ghi chú TikTok}}" }
  ],

  // --- Khối "Now" (mục Life) ---
  now: {
    reading: "{{Đang đọc}}",
    listening: "{{Đang nghe}}",
    goal: "{{Mục tiêu tháng này}}",
    place: "{{Đang ở đâu}}"
  }
};
