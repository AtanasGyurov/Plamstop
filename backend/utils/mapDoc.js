export function mapDoc(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}
