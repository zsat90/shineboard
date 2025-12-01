import { useKidStore } from '@/store/kidStore';

export const addKidHelper = async (name: string, gender?: 'male' | 'female') => {
  if (!name.trim()) {
    throw new Error('Name is required');
  }
  if (!gender) {
    throw new Error('Gender is required');
  }

  const newKid = useKidStore.getState().addKid;
  newKid(name.trim(), gender);
};

export const removeKidHelper = async (id: string) => {
  const kidToDelete = useKidStore.getState().removeKid;
  kidToDelete(id);
};
