export class FileHandler {

  /* =========================
     CONVERT FILE -> BASE64
  ========================= */
  static readAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Conversion impossible"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Lecture du fichier impossible"));
      };

      reader.readAsDataURL(file);
    });
  }

  /* =========================
     FILE PICKER PRO
  ========================= */
  static pickFile(accept: string): Promise<string | null> {

    return new Promise((resolve) => {

      const input = document.createElement("input");

      input.type = "file";

      /*  IMPORTANT */
      input.accept = accept;

      /*  WINDOWS + AUDIO FIX */
      if (accept.includes("audio")) {

        input.accept = `
          audio/*,
          .mp3,
          .wav,
          .ogg,
          .m4a,
          .aac,
          .flac
        `;

      }

      /*  VIDEO FIX */
      if (accept.includes("video")) {

        input.accept = `
          video/*,
          .mp4,
          .webm,
          .mov,
          .avi,
          .mkv
        `;

      }

      /*  IMAGE FIX */
      if (accept.includes("image")) {

        input.accept = `
          image/*,
          .png,
          .jpg,
          .jpeg,
          .webp,
          .gif
        `;
      }

      input.style.display = "none";

      document.body.appendChild(input);

      let finished = false;

      input.addEventListener("change", async () => {

        const file = input.files?.[0];

        if (!file) {
          cleanup();
          resolve(null);
          return;
        }

        try {

          const base64 = await this.readAsBase64(file);

          finished = true;

          cleanup();

          resolve(base64);

        } catch (err) {

          console.error(err);

          cleanup();

          resolve(null);
        }
      });

      /*  Si utilisateur annule */
      window.addEventListener(
        "focus",
        () => {

          setTimeout(() => {

            if (!finished) {

              cleanup();

              resolve(null);
            }

          }, 800);

        },
        { once: true }
      );

      function cleanup() {

        if (document.body.contains(input)) {
          document.body.removeChild(input);
        }
      }

      input.click();
    });
  }
}