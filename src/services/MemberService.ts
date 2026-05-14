import { Member } from "../models/Member";
import { IndexedDBService } from "./IndexedDBService";

export class MemberService {
  private db   = new IndexedDBService();
  private ready: Promise<void>;

  constructor() { this.ready = this.db.init(); }

  private emit() { window.dispatchEvent(new Event("cv-updated")); }

  async addMember(data: Omit<Member, "id" | "createdAt" | "updatedAt">): Promise<Member> {
    await this.ready;
    const now = Date.now();
    const member: Member = { id: this.uid(), createdAt: now, updatedAt: now, ...data };
    await this.db.add(member);
    this.emit();
    return member;
  }

  async getMembers(): Promise<Member[]> {
    await this.ready;
    const data = await this.db.getAll();
    return Array.isArray(data) ? data : [];
  }

  async updateMember(member: Member): Promise<void> {
    await this.ready;
    await this.db.update({ ...member, updatedAt: Date.now() });
    this.emit();
  }

  async deleteMember(id: string): Promise<void> {
    await this.ready;
    await this.db.delete(id);
    this.emit();
  }

  private uid(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  }
}
