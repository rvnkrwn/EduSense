// authAtoms.js
import { atom } from 'recoil';

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false
});

export const User = atom({
    key: 'User',
    default: null
});