import { getDisplayName, getFavoriteTasks } from './helpers';
import defaultTasks from './tasks';

describe('test getDisplayName function', () => {
    test('getDisplayName function should return is not string', () => {
        expect(typeof getDisplayName({})).toBe('string');
    });

    test('getDisplayName function should return displayName', () => {
        expect(getDisplayName({ displayName: 'name' })).toBe('name');
    });

    test('getDisplayName function should return name', () => {
        expect(getDisplayName({ name: 'name' })).toBe('name');
    });

    test('getDisplayName function should return Component', () => {
        expect(getDisplayName({})).toBe('Component');
    });

    test('getDisplayName function should return undefined', () => {
        expect(getDisplayName({ displayName: 'name' })).not.toBeUndefined();
    });

    test('getDisplayName function should return undefined', () => {
        expect(getDisplayName({ name: 'name' })).not.toBeUndefined();
    });

    test('getDisplayName function should return undefined', () => {
        expect(getDisplayName({})).not.toBeUndefined();
    });
});

describe('test getFavoriteTasks function', () => {
    test('getFavoriteTasks function should return is not array', () => {
        expect(Array.isArray(getFavoriteTasks([]))).toBe(true);
    });

    test('getFavoriteTasks function should result 2 tasks favorite in json', () => {
        expect(getFavoriteTasks(defaultTasks.tasks).length).toBe(2);
    });

    test('getFavoriteTasks function should result 2 tasks favorite in json', () => {
        expect(getFavoriteTasks(defaultTasks.tasks).length).not.toBe(0);
    });

    test('getFavoriteTasks function should return undefined', () => {
        expect(getFavoriteTasks(defaultTasks.tasks)).not.toBeUndefined();
    });

    test('getFavoriteTasks function should return object in array ', () => {
        expect(typeof getFavoriteTasks(defaultTasks.tasks)[0]).toBe('object');
    });
});
