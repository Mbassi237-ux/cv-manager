import { Member } from "../models/Member";

export class CvViewer {
  private overlay: HTMLElement | null = null;

  show(member: Member) {
    this.close();

    const overlay = document.createElement("div");
    overlay.className = "cv-overlay";

    const modal = document.createElement("div");
    modal.className = "cv-modal";

    const noPhoto = `<div class="cv-modal-no-photo">👤</div>`;
    const photoEl = member.photo
      ? `<img class="cv-modal-photo" src="${member.photo}" alt="Photo" />`
      : noPhoto;

    modal.innerHTML = `
      <div class="cv-modal-top-bar"></div>
      <button class="cv-modal-close" title="Fermer">✕</button>

      <div class="cv-modal-header">
        ${photoEl}
        <div class="cv-modal-identity">
          <div class="cv-modal-name">${member.lastName} ${member.firstName}</div>
          <div class="cv-modal-profession">${member.profession || "—"}</div>
          <div class="cv-modal-email">${member.email}</div>
          <div class="cv-modal-phone">📞 ${member.phone || "—"}</div>
        </div>
      </div>

      <div class="cv-modal-body">
        ${this.section("Profil",       member.bio)}
        ${this.section("Diplômes",     member.diplomas)}
        ${this.section("Expérience",   member.career)}
        ${this.section("Compétences",  member.skills)}
        ${this.section("Langues",      member.languages)}
        ${member.video ? this.mediaSection("Vidéo de présentation", "video", member.video) : ""}
        ${member.audio ? this.mediaSection("Audio de présentation", "audio", member.audio) : ""}
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    this.overlay = overlay;

    modal.querySelector(".cv-modal-close")!.addEventListener("click", () => this.close());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) this.close(); });
    document.addEventListener("keydown", this.onKey);
  }

  private section(title: string, content: string): string {
    if (!content?.trim()) return "";
    return `
      <div class="cv-section">
        <div class="cv-section-title">${title}</div>
        <p>${content}</p>
      </div>
    `;
  }

  private mediaSection(title: string, type: "video" | "audio", src: string): string {
    return `
      <div class="cv-section">
        <div class="cv-section-title">${title}</div>
        <${type} controls src="${src}"></${type}>
      </div>
    `;
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") this.close();
  };

  close() {
    if (this.overlay) {
      this.overlay.style.transition = "opacity 0.2s";
      this.overlay.style.opacity = "0";
      setTimeout(() => { this.overlay?.remove(); this.overlay = null; }, 200);
      document.removeEventListener("keydown", this.onKey);
    }
  }
}