import { Validator } from "../src/utils/Validator.js";

describe("Validator", () => {
  test("email valide",                () => expect(Validator.isEmail("a@b.com")).toBe(true));
  test("email invalide",              () => expect(Validator.isEmail("ab.com")).toBe(false));
  test("champ vide",                  () => expect(Validator.isNotEmpty("")).toBe(false));
  test("champ espaces",               () => expect(Validator.isNotEmpty("   ")).toBe(false));
  test("champ valide",                () => expect(Validator.isNotEmpty("Jean")).toBe(true));
  test("form valide — 0 erreurs",     () => expect(Validator.validateMemberForm({ firstName:"J", lastName:"D", email:"j@d.com" })).toHaveLength(0));
  test("form invalide — prénom vide", () => expect(Validator.validateMemberForm({ firstName:"",  lastName:"D", email:"j@d.com" }).length).toBeGreaterThan(0));
});
