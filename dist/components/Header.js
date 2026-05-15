export class Header {
    render() {
        const header = document.createElement("header");
        header.className = "header";
        header.innerHTML = `
      <div class="header-logo">
        <div class="header-monogram">CV</div>
        <div class="header-brand-text">
          <span class="header-title">CV Manager Collectif</span>
          <span class="header-sub">Plateforme professionnelle</span>
        </div>
      </div>
      <div class="header-spacer"></div>
      <div class="header-badge">
        <div class="header-badge-dot"></div>
        <span>CV enregistrés :</span>
        <span class="header-count" id="header-count">0</span>
      </div>
    `;
        return header;
    }
}
