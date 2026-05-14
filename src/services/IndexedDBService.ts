import { Member } from "../models/Member";

export class IndexedDBService {
  private dbName = "cv_manager_db";
  private storeName = "members";
  private db!: IDBDatabase;

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: "id" });
        }
      };
      req.onsuccess = () => { this.db = req.result; resolve(); };
      req.onerror   = () => reject(new Error("Erreur IndexedDB init"));
    });
  }

  add(member: Member): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      tx.objectStore(this.storeName).add(member);
      tx.oncomplete = () => resolve();
      tx.onerror    = () => reject(new Error("Erreur ajout"));
    });
  }

  getAll(): Promise<Member[]> {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(this.storeName, "readonly");
      const req = tx.objectStore(this.storeName).getAll();
      req.onsuccess = () => resolve(req.result as Member[]);
      req.onerror   = () => reject(new Error("Erreur lecture"));
    });
  }

  update(member: Member): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      tx.objectStore(this.storeName).put(member);
      tx.oncomplete = () => resolve();
      tx.onerror    = () => reject(new Error("Erreur update"));
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      tx.objectStore(this.storeName).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror    = () => reject(new Error("Erreur suppression"));
    });
  }
}
