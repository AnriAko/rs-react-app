import {
  selectedItemsReducer,
  toggleItem,
  clearAll,
} from '~/redux/selected-items-slice';

type SelectedItem = {
  id: string;
  name: string;
  url: string;
};

describe('selectedItemsSlice reducer', () => {
  const item1: SelectedItem = { id: '1', name: 'Item 1', url: 'url1' };
  const item2: SelectedItem = { id: '2', name: 'Item 2', url: 'url2' };

  it('should return the initial state', () => {
    expect(selectedItemsReducer(undefined, { type: '' })).toEqual({
      items: {},
    });
  });

  it('should add item when toggleItem is dispatched for new item', () => {
    const initialState = { items: {} };
    const newState = selectedItemsReducer(initialState, toggleItem(item1));
    expect(newState.items).toHaveProperty(item1.id, item1);
  });

  it('should remove item when toggleItem is dispatched for existing item', () => {
    const initialState = { items: { [item1.id]: item1, [item2.id]: item2 } };
    const newState = selectedItemsReducer(initialState, toggleItem(item1));
    expect(newState.items).not.toHaveProperty(item1.id);
    expect(newState.items).toHaveProperty(item2.id, item2);
  });

  it('should clear all items when clearAll is dispatched', () => {
    const initialState = { items: { [item1.id]: item1, [item2.id]: item2 } };
    const newState = selectedItemsReducer(initialState, clearAll());
    expect(newState.items).toEqual({});
  });
});
