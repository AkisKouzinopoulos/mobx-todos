import React from "react";
import { makeAutoObservable } from 'mobx';
import todosStore from './todosStore';
import searchStore from './searchStore';

class RootStore {
  todosStore = todosStore;
  searchStore = searchStore;

  constructor() {
    makeAutoObservable(this);
  }
}

const StoresContext = React.createContext(new RootStore());
export const useStores = () => React.useContext(StoresContext);
