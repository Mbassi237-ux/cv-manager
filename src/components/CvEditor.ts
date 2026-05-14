import { Member } from "../models/Member";
import { MemberService } from "../services/MemberService";
import { FileHandler } from "../utils/FileHandler";
import { Validator } from "../utils/Validator";

export class CvEditor {
  private container = document.createElement("div");

  private editMember: Member | null = null;

  private photoSrc = "";
  private videoData = "";
  private audioData = "";

  private photoImg!: HTMLImageElement;
  private videoBtn!: HTMLButtonElement;
  private audioBtn!: HTMLButtonElement;
  private editBanner!: HTMLDivElement;

  private fields: Record<
    string,
    HTMLInputElement | HTMLTextAreaElement
  > = {};

  constructor(private service: MemberService) {
    this.build();
  }

  /* =========================
     BUILD UI
  ========================= */
  private build() {
    this.container.className = "editor-wrapper";

    /* HEADER */
    const heading = document.createElement("div");
    heading.className = "sidebar-heading";

    heading.innerHTML = `
      <h2>Ajouter un CV</h2>
      <div class="gold-bar"></div>
      <p>Remplissez les informations du membre</p>
    `;

    /* EDIT MODE */
    this.editBanner = document.createElement("div");
    this.editBanner.className = "edit-mode-banner";
    this.editBanner.innerHTML = `✎ &nbsp;Mode édition actif`;
    this.editBanner.style.display = "none";

    /* PHOTO */
    const photoZone = document.createElement("div");
    photoZone.className = "photo-zone";

    this.photoImg = document.createElement("img");
    this.photoImg.className = "photo-zone-img";
    this.photoImg.src = this.getDefaultAvatar();

    const photoText = document.createElement("div");
    photoText.className = "photo-zone-text";

    photoText.innerHTML = `
      <strong>Photo de profil</strong>
      <span>Cliquer pour choisir une image</span>
    `;

    photoZone.appendChild(this.photoImg);
    photoZone.appendChild(photoText);

    photoZone.onclick = () => this.pickPhoto();

    /* FORM */
    const form = document.createElement("div");

    /* IDENTITE */
    form.appendChild(this.sectionTitle("Identité"));

    const rowName = document.createElement("div");
    rowName.className = "form-row";

    rowName.appendChild(
      this.field("firstName", "Prénom", "text", "Jean")
    );

    rowName.appendChild(
      this.field("lastName", "Nom", "text", "Dupont")
    );

    form.appendChild(rowName);

    form.appendChild(
      this.field(
        "email",
        "Email",
        "email",
        "jean@example.com"
      )
    );

    form.appendChild(
      this.field(
        "profession",
        "Profession",
        "text",
        "Développeur Web"
      )
    );

    /* PROFIL */
    form.appendChild(this.sectionTitle("Profil"));

    form.appendChild(
      this.field(
        "bio",
        "Bio / Présentation",
        "textarea",
        "Décrivez-vous en quelques lignes..."
      )
    );

    /* PARCOURS */
    form.appendChild(this.sectionTitle("Parcours"));

    form.appendChild(
      this.field(
        "diplomas",
        "Diplômes",
        "textarea",
        "Vos diplômes..."
      )
    );

    form.appendChild(
      this.field(
        "career",
        "Expérience",
        "textarea",
        "Votre parcours professionnel..."
      )
    );

    form.appendChild(
      this.field(
        "skills",
        "Compétences",
        "textarea",
        "Vos compétences clés..."
      )
    );

    form.appendChild(
      this.field(
        "languages",
        "Langues",
        "text",
        "Français, Anglais..."
      )
    );

    /* MEDIAS */
    form.appendChild(this.sectionTitle("Médias"));

    const mediaRow = document.createElement("div");
    mediaRow.className = "media-row";

    /* VIDEO */
    this.videoBtn = this.mediaButton("▶ Vidéo");

    this.videoBtn.onclick = async () => {
      const data = await FileHandler.pickFile(
        "video/mp4,video/webm,video/ogg"
      );

      if (data) {
        this.videoData = data;

        this.videoBtn.textContent = "✓ Vidéo chargée";
        this.videoBtn.classList.add("loaded");
      }
    };

    /* AUDIO */
    this.audioBtn = this.mediaButton("♪ Audio");

    this.audioBtn.onclick = async () => {
      const data = await FileHandler.pickFile(
        ".mp3,.wav,.ogg,.m4a,audio/*"
      );

      if (data) {
        this.audioData = data;

        this.audioBtn.textContent = "✓ Audio chargé";
        this.audioBtn.classList.add("loaded");
      }
    };

    mediaRow.appendChild(this.videoBtn);
    mediaRow.appendChild(this.audioBtn);

    form.appendChild(mediaRow);

    /* BUTTONS */
    const btnSubmit = document.createElement("button");
    btnSubmit.className = "btn-submit";
    btnSubmit.textContent = "Enregistrer le CV";

    btnSubmit.onclick = () => this.submit();

    const btnReset = document.createElement("button");
    btnReset.className = "btn-reset";
    btnReset.textContent = "Réinitialiser";

    btnReset.onclick = () => this.reset();

    /* APPEND */
    this.container.appendChild(heading);
    this.container.appendChild(this.editBanner);
    this.container.appendChild(photoZone);
    this.container.appendChild(form);
    this.container.appendChild(btnSubmit);
    this.container.appendChild(btnReset);
  }

  /* =========================
     SECTION TITLE
  ========================= */
  private sectionTitle(text: string): HTMLDivElement {
    const d = document.createElement("div");

    d.className = "form-section-title";
    d.textContent = text;

    return d;
  }

  /* =========================
     FIELD
  ========================= */
  private field(
    key: string,
    labelText: string,
    type: string,
    placeholder = ""
  ): HTMLDivElement {
    const group = document.createElement("div");
    group.className = "form-group";

    const lbl = document.createElement("label");

    lbl.textContent = labelText;
    lbl.htmlFor = `field-${key}`;

    let el: HTMLInputElement | HTMLTextAreaElement;

    if (type === "textarea") {
      el = document.createElement("textarea");
    } else {
      el = document.createElement("input");
      (el as HTMLInputElement).type = type;
    }

    el.id = `field-${key}`;
    el.placeholder = placeholder;

    this.fields[key] = el;

    group.appendChild(lbl);
    group.appendChild(el);

    return group;
  }

  /* =========================
     MEDIA BUTTON
  ========================= */
  private mediaButton(label: string): HTMLButtonElement {
    const btn = document.createElement("button");

    btn.className = "media-pick-btn";
    btn.type = "button";
    btn.textContent = label;

    return btn;
  }

  /* =========================
     DEFAULT AVATAR
  ========================= */
  private getDefaultAvatar(): string {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%231e2d4a'/%3E%3Ccircle cx='40' cy='32' r='14' fill='%234a5878'/%3E%3Cellipse cx='40' cy='68' rx='22' ry='16' fill='%234a5878'/%3E%3C/svg%3E";
  }

  /* =========================
     PHOTO PICKER
  ========================= */
  private async pickPhoto() {
    const data = await FileHandler.pickFile(
      "image/png,image/jpeg,image/webp,image/jpg"
    );

    if (data) {
      this.photoSrc = data;
      this.photoImg.src = data;
    }
  }

  /* =========================
     VALUE
  ========================= */
  private val(key: string): string {
    return this.fields[key]?.value?.trim() || "";
  }

  /* =========================
     SUBMIT
  ========================= */
  private async submit() {
    const errors = Validator.validateMemberForm({
      firstName: this.val("firstName"),
      lastName: this.val("lastName"),
      email: this.val("email"),
    });

    if (errors.length) {
      alert(errors[0]);
      return;
    }

    const data: Omit<
      Member,
      "id" | "createdAt" | "updatedAt"
    > = {
      firstName: this.val("firstName"),
      lastName: this.val("lastName"),
      email: this.val("email"),
      profession: this.val("profession"),
      bio: this.val("bio"),
      diplomas: this.val("diplomas"),
      skills: this.val("skills"),
      career: this.val("career"),
      languages: this.val("languages"),
      photo: this.photoSrc || undefined,
      video: this.videoData || undefined,
      audio: this.audioData || undefined,
    };

    try {
      /* MODIFICATION */
      if (this.editMember) {
        await this.service.updateMember({
          ...this.editMember,
          ...data,
        });

        alert("CV mis à jour avec succès ✓");
      }

      /* AJOUT */
      else {
        await this.service.addMember(data);

        alert("CV ajouté avec succès ✓");
      }

      /* REFRESH LIST */
      window.dispatchEvent(new Event("cv-updated"));

      /* RESET */
      this.reset();
    } catch (error) {
      console.error(error);

      alert("Erreur lors de l'enregistrement.");
    }
  }

  /* =========================
     LOAD MEMBER FOR EDIT
  ========================= */
  loadMember(member: Member) {
    this.editMember = member;

    this.editBanner.style.display = "flex";

    Object.keys(this.fields).forEach((k) => {
      const val = member[k as keyof Member];

      if (this.fields[k]) {
        this.fields[k].value =
          typeof val === "string" ? val : "";
      }
    });

    /* PHOTO */
    if (member.photo) {
      this.photoSrc = member.photo;
      this.photoImg.src = member.photo;
    }

    /* VIDEO */
    if (member.video) {
      this.videoData = member.video;

      this.videoBtn.textContent = "✓ Vidéo chargée";
      this.videoBtn.classList.add("loaded");
    }

    /* AUDIO */
    if (member.audio) {
      this.audioData = member.audio;

      this.audioBtn.textContent = "✓ Audio chargé";
      this.audioBtn.classList.add("loaded");
    }

    this.container.scrollIntoView({
      behavior: "smooth",
    });
  }

  /* =========================
     RESET
  ========================= */
  reset() {
    this.editMember = null;

    this.photoSrc = "";
    this.videoData = "";
    this.audioData = "";

    this.editBanner.style.display = "none";

    this.photoImg.src = this.getDefaultAvatar();

    Object.values(this.fields).forEach((f) => {
      f.value = "";
    });

    this.videoBtn.textContent = "▶ Vidéo";
    this.videoBtn.classList.remove("loaded");

    this.audioBtn.textContent = "♪ Audio";
    this.audioBtn.classList.remove("loaded");
  }

  /* =========================
     RENDER
  ========================= */
  render(): HTMLElement {
    return this.container;
  }
}