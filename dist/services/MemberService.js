import { IndexedDBService } from "./IndexedDBService.js";
export class MemberService {
    constructor() {
        this.db = new IndexedDBService();
        this.ready = this.db.init();
    }
    emit() { window.dispatchEvent(new Event("cv-updated")); }
    async addMember(data) {
        await this.ready;
        const now = Date.now();
        const member = { id: this.uid(), createdAt: now, updatedAt: now, ...data };
        await this.db.add(member);
        this.emit();
        return member;
    }
    async getMembers() {
        await this.ready;
        const data = await this.db.getAll();
        return Array.isArray(data) ? data : [];
    }
    async updateMember(member) {
        await this.ready;
        await this.db.update({ ...member, updatedAt: Date.now() });
        this.emit();
    }
    async deleteMember(id) {
        await this.ready;
        await this.db.delete(id);
        this.emit();
    }
    uid() {
        return Date.now().toString() + Math.random().toString(36).substring(2, 9);
    }
}
