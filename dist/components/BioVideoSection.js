export class BioVideoSection {
    constructor() {
        this.container = document.createElement("div");
    }
    show(member) {
        this.container.className = "card";
        this.container.innerHTML = `
      <h3>Médias CV</h3>

      ${member.video
            ? `<div class="media-block">
             <h4>Vidéo de présentation</h4>
             <video controls width="100%">
               <source src="${member.video}" />
               Votre navigateur ne supporte pas la vidéo.
             </video>
           </div>`
            : "<p>Aucune vidéo disponible.</p>"}

      ${member.audio
            ? `<div class="media-block">
             <h4>Audio de présentation</h4>
             <audio controls style="width:100%">
               <source src="${member.audio}" />
               Votre navigateur ne supporte pas l'audio.
             </audio>
           </div>`
            : ""}
    `;
        return this.container;
    }
    render() {
        return this.container;
    }
}
