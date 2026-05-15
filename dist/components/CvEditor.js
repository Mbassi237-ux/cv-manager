import { FileHandler } from "../utils/FileHandler.js";
import { Validator } from "../utils/Validator.js";
export class CvEditor {
    constructor(service) {
        this.service = service;
        this.container = document.createElement("div");
        this.editMember = null;
        this.photoSrc = "";
        this.videoData = "";
        this.audioData = "";
        this.fields = {};
        this.build();
    }
    build() {
        this.container.className = "editor-wrapper";
        const heading = document.createElement("div");
        heading.className = "sidebar-heading";
        heading.innerHTML = `
      <h2>Ajouter un CV</h2>
      <div class="gold-bar"></div>
      <p>Remplissez les informations du membre</p>
    `;
        this.editBanner = document.createElement("div");
        this.editBanner.className = "edit-mode-banner";
        this.editBanner.innerHTML = `✎ &nbsp;Mode édition actif`;
        this.editBanner.style.display = "none";
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
        const form = document.createElement("div");
        /* IDENTITÉ */
        form.appendChild(this.sectionTitle("Identité"));
        const rowName = document.createElement("div");
        rowName.className = "form-row";
        rowName.appendChild(this.field("firstName", "Prénom", "text"));
        rowName.appendChild(this.field("lastName", "Nom", "text"));
        form.appendChild(rowName);
        form.appendChild(this.field("email", "Email", "email"));
        form.appendChild(this.field("phone", "Téléphone", "tel", "+237 6XX XXX XXX")); // ← nouveau
        form.appendChild(this.field("profession", "Profession", "text"));
        /* PROFIL */
        form.appendChild(this.sectionTitle("Profil"));
        form.appendChild(this.field("bio", "Bio / Présentation", "textarea", "Décrivez-vous en quelques lignes..."));
        /* PARCOURS */
        form.appendChild(this.sectionTitle("Parcours"));
        form.appendChild(this.field("diplomas", "Diplômes", "textarea", "Vos diplômes..."));
        form.appendChild(this.field("career", "Expérience", "textarea", "Votre parcours professionnel..."));
        form.appendChild(this.field("skills", "Compétences", "textarea", "Vos compétences clés..."));
        form.appendChild(this.field("languages", "Langues", "text", "Français, Anglais..."));
        /* MÉDIAS */
        form.appendChild(this.sectionTitle("Médias"));
        const mediaRow = document.createElement("div");
        mediaRow.className = "media-row";
        this.videoBtn = this.mediaButton("▶ Vidéo");
        this.videoBtn.onclick = async () => {
            const data = await FileHandler.pickFile("video/mp4,video/webm,video/ogg");
            if (data) {
                this.videoData = data;
                this.videoBtn.textContent = "✓ Vidéo chargée";
                this.videoBtn.classList.add("loaded");
            }
        };
        this.audioBtn = this.mediaButton("♪ Audio");
        this.audioBtn.onclick = async () => {
            const data = await FileHandler.pickFile(".mp3,.wav,.ogg,.m4a,audio/*");
            if (data) {
                this.audioData = data;
                this.audioBtn.textContent = "✓ Audio chargé";
                this.audioBtn.classList.add("loaded");
            }
        };
        mediaRow.appendChild(this.videoBtn);
        mediaRow.appendChild(this.audioBtn);
        form.appendChild(mediaRow);
        /* BOUTONS */
        const btnSubmit = document.createElement("button");
        btnSubmit.className = "btn-submit";
        btnSubmit.textContent = "Enregistrer le CV";
        btnSubmit.onclick = () => this.submit();
        const btnReset = document.createElement("button");
        btnReset.className = "btn-reset";
        btnReset.textContent = "Réinitialiser";
        btnReset.onclick = () => this.reset();
        this.container.appendChild(heading);
        this.container.appendChild(this.editBanner);
        this.container.appendChild(photoZone);
        this.container.appendChild(form);
        this.container.appendChild(btnSubmit);
        this.container.appendChild(btnReset);
    }
    sectionTitle(text) {
        const d = document.createElement("div");
        d.className = "form-section-title";
        d.textContent = text;
        return d;
    }
    field(key, labelText, type, placeholder = "") {
        const group = document.createElement("div");
        group.className = "form-group";
        const lbl = document.createElement("label");
        lbl.textContent = labelText;
        lbl.htmlFor = `field-${key}`;
        let el;
        if (type === "textarea") {
            el = document.createElement("textarea");
        }
        else {
            el = document.createElement("input");
            el.type = type;
        }
        el.id = `field-${key}`;
        el.placeholder = placeholder;
        this.fields[key] = el;
        group.appendChild(lbl);
        group.appendChild(el);
        return group;
    }
    mediaButton(label) {
        const btn = document.createElement("button");
        btn.className = "media-pick-btn";
        btn.type = "button";
        btn.textContent = label;
        return btn;
    }
    getDefaultAvatar() {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%231e2d4a'/%3E%3Ccircle cx='40' cy='32' r='14' fill='%234a5878'/%3E%3Cellipse cx='40' cy='68' rx='22' ry='16' fill='%234a5878'/%3E%3C/svg%3E";
    }
    async pickPhoto() {
        const data = await FileHandler.pickFile("image/png,image/jpeg,image/webp,image/jpg");
        if (data) {
            this.photoSrc = data;
            this.photoImg.src = data;
        }
    }
    val(key) {
        return this.fields[key]?.value?.trim() || "";
    }
    async submit() {
        const errors = Validator.validateMemberForm({
            firstName: this.val("firstName"),
            lastName: this.val("lastName"),
            email: this.val("email"),
        });
        if (errors.length) {
            alert(errors[0]);
            return;
        }
        const data = {
            firstName: this.val("firstName"),
            lastName: this.val("lastName"),
            email: this.val("email"),
            phone: this.val("phone"), // ← nouveau
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
            if (this.editMember) {
                await this.service.updateMember({ ...this.editMember, ...data });
                alert("CV mis à jour avec succès ✓");
            }
            else {
                await this.service.addMember(data);
                alert("CV ajouté avec succès ✓");
            }
            window.dispatchEvent(new Event("cv-updated"));
            this.reset();
        }
        catch (error) {
            console.error(error);
            alert("Erreur lors de l'enregistrement.");
        }
    }
    loadMember(member) {
        this.editMember = member;
        this.editBanner.style.display = "flex";
        Object.keys(this.fields).forEach((k) => {
            const val = member[k];
            if (this.fields[k])
                this.fields[k].value = typeof val === "string" ? val : "";
        });
        if (member.photo) {
            this.photoSrc = member.photo;
            this.photoImg.src = member.photo;
        }
        if (member.video) {
            this.videoData = member.video;
            this.videoBtn.textContent = "✓ Vidéo chargée";
            this.videoBtn.classList.add("loaded");
        }
        if (member.audio) {
            this.audioData = member.audio;
            this.audioBtn.textContent = "✓ Audio chargé";
            this.audioBtn.classList.add("loaded");
        }
        this.container.scrollIntoView({ behavior: "smooth" });
    }
    reset() {
        this.editMember = null;
        this.photoSrc = "";
        this.videoData = "";
        this.audioData = "";
        this.editBanner.style.display = "none";
        this.photoImg.src = this.getDefaultAvatar();
        Object.values(this.fields).forEach((f) => (f.value = ""));
        this.videoBtn.textContent = "▶ Vidéo";
        this.videoBtn.classList.remove("loaded");
        this.audioBtn.textContent = "♪ Audio";
        this.audioBtn.classList.remove("loaded");
    }
    render() { return this.container; }
}
