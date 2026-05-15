export class Validator {
    static isEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    }
    static isNotEmpty(v) {
        return v.trim().length > 0;
    }
    static validateMemberForm(d) {
        const e = [];
        if (!this.isNotEmpty(d.firstName))
            e.push("Le prénom est requis.");
        if (!this.isNotEmpty(d.lastName))
            e.push("Le nom est requis.");
        if (!this.isEmail(d.email))
            e.push("L'email est invalide.");
        return e;
    }
}
