export class Validator {
  static isEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  static isNotEmpty(v: string): boolean {
    return v.trim().length > 0;
  }

  static validateMemberForm(d: { firstName: string; lastName: string; email: string }): string[] {
    const e: string[] = [];
    if (!this.isNotEmpty(d.firstName)) e.push("Le prénom est requis.");
    if (!this.isNotEmpty(d.lastName))  e.push("Le nom est requis.");
    if (!this.isEmail(d.email))        e.push("L'email est invalide.");
    return e;
  }
}
