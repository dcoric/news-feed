import { updateQueryStringParameter } from './urlOperations';

describe('updateQueryStringParameter', () => {
  it('should add parameter to URL without query string', () => {
    const uri = 'https://example.com/api';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?country=us');
  });

  it('should add parameter to URL with existing query string', () => {
    const uri = 'https://example.com/api?page=1';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?page=1&country=us');
  });

  it('should update existing parameter in query string', () => {
    const uri = 'https://example.com/api?country=gb&page=1';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?country=us&page=1');
  });

  it('should update parameter at the end of query string', () => {
    const uri = 'https://example.com/api?page=1&country=gb';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?page=1&country=us');
  });

  it('should update parameter when it is the only parameter', () => {
    const uri = 'https://example.com/api?country=gb';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?country=us');
  });

  it('should handle parameter with special characters', () => {
    const uri = 'https://example.com/api';
    const result = updateQueryStringParameter(uri, 'query', 'hello world & more');
    expect(result).toBe('https://example.com/api?query=hello world & more');
  });

  it('should handle empty parameter value', () => {
    const uri = 'https://example.com/api';
    const result = updateQueryStringParameter(uri, 'country', '');
    expect(result).toBe('https://example.com/api?country=');
  });

  it('should handle numeric parameter value', () => {
    const uri = 'https://example.com/api';
    const result = updateQueryStringParameter(uri, 'page', 42);
    expect(result).toBe('https://example.com/api?page=42');
  });

  it('should be case insensitive when matching parameters', () => {
    const uri = 'https://example.com/api?COUNTRY=gb';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?country=us');
  });

  it('should handle complex URLs with fragments', () => {
    const uri = 'https://example.com/api?page=1#section';
    const result = updateQueryStringParameter(uri, 'country', 'us');
    expect(result).toBe('https://example.com/api?page=1#section&country=us');
  });
});