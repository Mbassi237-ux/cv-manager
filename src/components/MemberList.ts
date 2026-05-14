import { Member }        from "../models/Member";
import { MemberService } from "../services/MemberService";
import { MemberCard }    from "./MemberCard";

export class MemberList {
  private container = document.createElement("div");
  private grid      = document.createElement("div");
  private countEl   = document.createElement("span");

  constructor(
    private service: MemberService,
    private onView:  (m: Member) => void,
    private onEdit:  (m: Member) => void
  ) {
    this.build();
  }

  private build() {
    this.container.className = "list-container";

    const header = document.createElement("div");
    header.className = "list-header";

    const heading = document.createElement("div");
    heading.className = "list-heading";
    heading.innerHTML = `<h2>Membres</h2><p>Tous les CV enregistrés</p>`;

    this.countEl.className = "list-count-badge";
    this.countEl.textContent = "0 CV";

    header.appendChild(heading);
    header.appendChild(this.countEl);

    this.grid.className = "members-grid";

    this.container.appendChild(header);
    this.container.appendChild(this.grid);
  }

  async refresh(): Promise<void> {
    const members = await this.service.getMembers();
    this.grid.innerHTML = "";

    this.countEl.textContent = `${members.length} CV`;

    if (!members.length) {
      this.grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📄</div>
          <h3>Aucun CV enregistré</h3>
          <p>Utilisez le formulaire à gauche pour ajouter votre premier membre.</p>
        </div>
      `;
      return;
    }

    members.forEach((member, i) => {
      const card = new MemberCard(
        member,
        this.onView,
        this.onEdit,
        async (id) => {
          await this.service.deleteMember(id);
          await this.refresh();
        }
      );

      const el = card.render();
      (el as HTMLElement).style.animationDelay = `${i * 60}ms`;
      this.grid.appendChild(el);
    });
  }

  render(): HTMLElement { return this.container; }
}