
import { Header }       from "./components/Header.js";
import { CvEditor }     from "./components/CvEditor.js";
import { MemberList }   from "./components/MemberList.js";
import { CvViewer }     from "./components/CvViewer.js";
import { FileHandler }  from "./utils/FileHandler.js";
import { MemberService } from "./services/MemberService.js";

const HERO_KEY = "cv-manager-hero";
const service  = new MemberService();
const viewer   = new CvViewer();

function getHero(): string {
  return localStorage.getItem(HERO_KEY) || "";
}

function setHero(base64: string) {
  localStorage.setItem(HERO_KEY, base64);
}

async function render() {
  const app = document.getElementById("app")!;
  app.innerHTML = "";

  /* HEADER */
  const header = new Header();
  app.appendChild(header.render());

  /* HERO IMAGE */
  const heroWrapper = document.createElement("div");
  heroWrapper.className = "hero-wrapper";
  heroWrapper.title = "Cliquer pour changer l'image";

  const heroImg = document.createElement("img");
  const savedHero = getHero();

  if (savedHero) {
    heroImg.src = savedHero;
  } else {
    heroWrapper.style.background =
      "linear-gradient(135deg, #0f1628 0%, #1e2d4a 50%, #162038 100%)";
    heroImg.style.opacity = "0";
  }

  const heroOverlay = document.createElement("div");
  heroOverlay.className = "hero-overlay";

  const heroContent = document.createElement("div");
  heroContent.className = "hero-content";
  heroContent.innerHTML = `
    <div class="hero-tagline">
      Gérez les talents,<br/><em>valorisez les parcours.</em>
    </div>
    <div class="hero-change-hint">
      <span>📷</span>
      <span>Changer l'image</span>
    </div>
  `;

  heroWrapper.appendChild(heroImg);
  heroWrapper.appendChild(heroOverlay);
  heroWrapper.appendChild(heroContent);

  heroWrapper.addEventListener("click", async () => {
    const data = await FileHandler.pickFile("image/*");
    if (data) {
      setHero(data);
      heroImg.src = data;
      heroImg.style.opacity = "1";
    }
  });

  app.appendChild(heroWrapper);

  /* LAYOUT */
  const container = document.createElement("div");
  container.className = "app-container";

  const leftPanel = document.createElement("div");
  leftPanel.className = "panel left";

  const rightPanel = document.createElement("div");
  rightPanel.className = "panel right";

  /* EDITOR */
  const editor = new CvEditor(service);
  leftPanel.appendChild(editor.render());

  /* LIST */
  const list = new MemberList(
    service,
    (member) => viewer.show(member),
    (member) => editor.loadMember(member)
  );
  rightPanel.appendChild(list.render());

  container.appendChild(leftPanel);
  container.appendChild(rightPanel);
  app.appendChild(container);

  /* FOOTER */
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <span class="footer-left">© ${new Date().getFullYear()} CV Manager Collectif — Tous droits réservés</span>
    <span class="footer-right">Projet académique ✦</span>
  `;
  app.appendChild(footer);

  /* SYNC */
  async function syncAll() {
    await list.refresh();
    const members = await service.getMembers();
    const countEl = document.getElementById("header-count");
    if (countEl) countEl.textContent = String(members.length);
  }

  window.addEventListener("cv-updated", () => syncAll());
  await syncAll();
}

render().catch(console.error);