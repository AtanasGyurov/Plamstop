// Конвертира Firestore документ към обикновен JS обект
export function mapDoc(doc) {
  return { id: doc.id, ...doc.data() };
}
