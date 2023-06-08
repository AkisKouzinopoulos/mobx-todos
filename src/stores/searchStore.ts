import { makeAutoObservable } from "mobx";

// MobX
class SearchStore {
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
  }
}

const searchStore = new SearchStore();
export default searchStore;
