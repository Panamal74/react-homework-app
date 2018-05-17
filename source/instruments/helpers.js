export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getFilterTasks (searchValue = '', tasks = []) {
    if (typeof searchValue !== "string") {
        throw new Error("Первый аргумент функции должен иметь тип string");
    } else if (!Array.isArray(tasks)) {
        throw new Error("Второй аргумент функции должен иметь тип array");
    }

    let returnValue = [];

    if (searchValue) {
        returnValue = tasks.filter((value) =>
            value.message.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
        );
    } else {
        returnValue = tasks;
    }

    return returnValue;
}

export function getFavoriteTasks (filterTasks = []) {
    if (!Array.isArray(filterTasks)) {
        throw new Error("Аргумент функции должен иметь тип array");
    }

    return filterTasks.filter((value) =>
        value.favorite === true && value.completed === false
    );
}

export function getCompletedFavoriteTasks (filterTasks = []) {
    if (!Array.isArray(filterTasks)) {
        throw new Error("Аргумент функции должен иметь тип array");
    }

    return filterTasks.filter((value) =>
        value.completed === true && value.favorite === true
    );
}

export function getCompletedOtherTasks (filterTasks = []) {
    if (!Array.isArray(filterTasks)) {
        throw new Error("Аргумент функции должен иметь тип array");
    }

    return filterTasks.filter((value) =>
        value.completed === true && value.favorite === false
    );
}

export function getOtherTasks (filterTasks = []) {
    if (!Array.isArray(filterTasks)) {
        throw new Error("Аргумент функции должен иметь тип array");
    }

    return filterTasks.filter((value) =>
        value.completed === false && value.favorite === false
    );
}

export function checkFieldLength (value = '', maxLength = 50) {
    if (typeof value !== "string") {
        throw new Error("Первый аргумент функции должен иметь тип string");
    } else if (typeof maxLength !== "number") {
        throw new Error("Второй аргумент функции должен иметь тип number");
    }

    return value.length > maxLength
        ? value.slice(0, maxLength)
        : value;
}
