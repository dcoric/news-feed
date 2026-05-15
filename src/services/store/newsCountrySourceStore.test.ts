import { useNewsCountrySourceStore, getLongName } from './newsCountrySourceStore';

describe('newsCountrySourceStore', () => {
  beforeEach(() => {
    useNewsCountrySourceStore.setState({
      data: 'GB',
      longName: 'Great Britain'
    });
  });

  it('returns initial state with default country', () => {
    const state = useNewsCountrySourceStore.getState();
    expect(state.data).toBe('GB');
    expect(state.longName).toBe('Great Britain');
  });

  it('sets country to GB', () => {
    const store = useNewsCountrySourceStore.getState();
    store.setCountry('GB');

    expect(useNewsCountrySourceStore.getState().data).toBe('GB');
    expect(useNewsCountrySourceStore.getState().longName).toBe('Great Britain');
  });

  it('sets country to US', () => {
    const store = useNewsCountrySourceStore.getState();
    store.setCountry('US');

    expect(useNewsCountrySourceStore.getState().data).toBe('US');
    expect(useNewsCountrySourceStore.getState().longName).toBe('United States');
  });

  it('defaults to World for unknown country codes', () => {
    const store = useNewsCountrySourceStore.getState();
    store.setCountry('FR');

    expect(useNewsCountrySourceStore.getState().data).toBe('FR');
    expect(useNewsCountrySourceStore.getState().longName).toBe('World');
  });

  describe('getLongName', () => {
    it('returns Great Britain for GB', () => {
      expect(getLongName('GB')).toBe('Great Britain');
    });

    it('returns United States for US', () => {
      expect(getLongName('US')).toBe('United States');
    });

    it('returns World for unknown country codes', () => {
      expect(getLongName('FR')).toBe('World');
    });
  });
});
