/* Thông tin cá nhân. Mọi {{...}} là placeholder — tự thay khi có nội dung thật. */
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
    { id: "github",    url: "https://github.com/{{github-user}}",       handle: "@{{github-user}}",   note: "{{Ghi chú GitHub}}" },
    { id: "linkedin",  url: "https://linkedin.com/in/{{linkedin-user}}", handle: "{{linkedin-user}}",  note: "{{Ghi chú LinkedIn}}" },
    { id: "facebook",  url: "https://facebook.com/{{facebook-user}}",    handle: "{{facebook-user}}",  note: "{{Ghi chú Facebook}}" },
    { id: "instagram", url: "https://instagram.com/{{instagram-user}}", handle: "@{{instagram-user}}", note: "{{Ghi chú Instagram}}" },
    { id: "tiktok",    url: "https://tiktok.com/@{{tiktok-user}}",      handle: "@{{tiktok-user}}",   note: "{{Ghi chú TikTok}}" }
  ],
  now: {
    reading: "{{Đang đọc}}",
    listening: "{{Đang nghe}}",
    goal: "{{Mục tiêu tháng này}}",
    place: "{{Đang ở đâu}}"
  }
};
