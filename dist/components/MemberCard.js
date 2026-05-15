export class MemberCard {
    constructor(member, onView, onEdit, onDelete) {
        this.member = member;
        this.onView = onView;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
    }
    getDefaultAvatar() {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%231e2d4a'/%3E%3Ccircle cx='40' cy='32' r='14' fill='%234a5878'/%3E%3Cellipse cx='40' cy='68' rx='22' ry='16' fill='%234a5878'/%3E%3C/svg%3E";
    }
    render() {
        const card = document.createElement("div");
        card.className = "member-card";
        const initials = `${this.member.firstName[0] ?? ""}${this.member.lastName[0] ?? ""}`.toUpperCase();
        card.innerHTML = `
      <div class="card-body">
        <div class="card-avatar">
          <img
            src="${this.member.photo || this.getDefaultAvatar()}"
            alt="${initials}"
            onerror="this.src='${this.getDefaultAvatar()}'"
          />
        </div>
        <div class="card-info">
          <div class="card-name">${this.member.lastName} ${this.member.firstName}</div>
          <div class="card-profession">${this.member.profession || "—"}</div>
          <div class="card-email">${this.member.email}</div>
        </div>
      </div>
      <div class="card-footer">
        <button class="card-action-btn view"   title="Voir le CV">👁 Voir</button>
        <button class="card-action-btn edit"   title="Modifier">✎ Modifier</button>
        <button class="card-action-btn delete" title="Supprimer">✕ Supprimer</button>
      </div>
    `;
        card.querySelector(".view").addEventListener("click", (e) => {
            e.stopPropagation();
            this.onView(this.member);
        });
        card.querySelector(".edit").addEventListener("click", (e) => {
            e.stopPropagation();
            this.onEdit(this.member);
        });
        card.querySelector(".delete").addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(`Supprimer le CV de ${this.member.firstName} ${this.member.lastName} ?`)) {
                this.onDelete(this.member.id);
            }
        });
        return card;
    }
}
