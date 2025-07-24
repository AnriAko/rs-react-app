import axios from 'axios';
import getPokemons from '../pokemon-service';

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getPokemons', () => {
  test('returns pokemon list on success', async () => {
    const mockData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getPokemons('?limit=2');

    expect(result).toEqual(mockData.results);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?limit=2'
    );
  });

  test('throws error on failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getPokemons('?bad=query')).rejects.toThrow('Network Error');
  });
});
