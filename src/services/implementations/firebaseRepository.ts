import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IRepository } from '../interfaces/IRepository';
import { BaseEntity } from '@/types';

export class FirebaseRepository<T extends BaseEntity> implements IRepository<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private convertToFirestore(data: Record<string, unknown>) {
    const result = { ...data };
    delete result.id;
    result.createdAt = Timestamp.fromDate(new Date());
    result.updatedAt = Timestamp.fromDate(new Date());
    return result;
  }

  private convertFromFirestore(docData: { id: string; data: () => Record<string, unknown> }): T {
    const data = docData.data();
    return {
      id: docData.id,
      ...data,
      createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
      updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
    } as T;
  }

  async getAll(): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, this.collectionName));
    return querySnapshot.docs.map(doc => this.convertFromFirestore(doc));
  }

  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? this.convertFromFirestore(docSnap) : null;
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const docRef = await addDoc(
      collection(db, this.collectionName),
      this.convertToFirestore(data as Record<string, unknown>)
    );
    const result = await this.getById(docRef.id);
    if (!result) throw new Error('Failed to create document');
    return result;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.fromDate(new Date()),
    });
    const result = await this.getById(id);
    if (!result) throw new Error('Failed to update document');
    return result;
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionName, id));
  }

  async query(predicate: (item: T) => boolean): Promise<T[]> {
    const all = await this.getAll();
    return all.filter(predicate);
  }
}