export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// export function getShowTasks (searchValue, tasks) {
//     const filterTasks = tasks.filter((value) =>
//         value.message.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
//     );
//     const favoriteTasks = filterTasks.filter((value) =>
//         value.favorite === true && value.completed === false
//     );
//     const completedFavoriteTasks = filterTasks.filter((value) =>
//         value.completed === true && value.favorite === true
//     );
//     const completedOtherTasks = filterTasks.filter((value) =>
//         value.completed === true && value.favorite === false
//     );
//     const otherTasks = filterTasks.filter((value) =>
//         value.completed === false && value.favorite === false
//     );
//
//     return favoriteTasks.concat(otherTasks, completedFavoriteTasks, completedOtherTasks);
// }

export function getFilterTasks (searchValue, tasks) {
    return tasks.filter((value) =>
        value.message.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
    );
}

export function getFavoriteTasks (filterTasks) {
    return filterTasks.filter((value) =>
        value.favorite === true && value.completed === false
    );
}

export function getCompletedFavoriteTasks (filterTasks) {
    return filterTasks.filter((value) =>
        value.completed === true && value.favorite === true
    );
}

export function getCompletedOtherTasks (filterTasks) {
    return filterTasks.filter((value) =>
        value.completed === true && value.favorite === false
    );
}

export function getOtherTasks (filterTasks) {
    return filterTasks.filter((value) =>
        value.completed === false && value.favorite === false
    );
}

export function checkFieldLength (value, maxLength = 50) {
    return value.length > maxLength
        ? value.slice(0, maxLength)
        : value;
}
