export class IndexedDBService {
    constructor() {
        this.dbName = "cv_manager_db";
        this.storeName = "members";
    }
    init() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(this.dbName, 1);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: "id" });
                }
            };
            req.onsuccess = () => { this.db = req.result; resolve(); };
            req.onerror = () => reject(new Error("Erreur IndexedDB init"));
        });
    }
    add(member) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, "readwrite");
            tx.objectStore(this.storeName).add(member);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(new Error("Erreur ajout"));
        });
    }
    getAll() {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, "readonly");
            const req = tx.objectStore(this.storeName).getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(new Error("Erreur lecture"));
        });
    }
    update(member) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, "readwrite");
            tx.objectStore(this.storeName).put(member);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(new Error("Erreur update"));
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(this.storeName, "readwrite");
            tx.objectStore(this.storeName).delete(id);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(new Error("Erreur suppression"));
        });
    }
}
