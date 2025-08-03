import { store } from '../store';
import { toggleItem, clearAll } from '../selected-items-slice';

describe('Redux store', () => {
  beforeEach(() => {
    store.dispatch(clearAll());
  });

  test('initial state should be empty', () => {
    const state = store.getState().selectedItems;
    expect(state.items).toEqual({});
  });

  test('toggleItem adds an item if not selected', () => {
    const item = { id: '1', name: 'bulbasaur', url: 'url1' };
    store.dispatch(toggleItem(item));
    const state = store.getState().selectedItems;
    expect(state.items[item.id]).toEqual(item);
  });

  test('toggleItem removes an item if already selected', () => {
    const item = { id: '1', name: 'bulbasaur', url: 'url1' };
    store.dispatch(toggleItem(item));
    store.dispatch(toggleItem(item));
    const state = store.getState().selectedItems;
    expect(state.items[item.id]).toBeUndefined();
  });

  test('clearAll empties the items', () => {
    const item = { id: '1', name: 'bulbasaur', url: 'url1' };
    store.dispatch(toggleItem(item));
    store.dispatch(clearAll());
    const state = store.getState().selectedItems;
    expect(state.items).toEqual({});
  });
});
