// ordersStore.ts
import create, { SetState } from 'zustand';
import { Timestamp } from 'firebase/firestore'; // Assuming Timestamp is imported from Firebase


interface ContentEditor {
    editable : boolean,
    setEditable : (editable : boolean) => void
}

const useContentEditor = create<ContentEditor>((set: SetState<ContentEditor>) => ({
    editable : true,
    setEditable : (editable) => set({editable})
}));

export default useContentEditor;
