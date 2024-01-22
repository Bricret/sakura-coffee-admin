import { create } from 'zustand';

type User = {
    name: string;
    role: string;
}

type UserStore = {
    user: User;
    setUser: (user: User) => void;
};

const useUserStore = create<UserStore>((set) => ({
    user: { name: '', role: '' },
    setUser: (user: User) => set({ user }),
}));

export default useUserStore;
