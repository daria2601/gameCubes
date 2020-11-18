let emptyItems = [];

function getEmptyItems() {
    return emptyItems;
}

function pushToEmptyItems(value) {
    emptyItems.push(value);
}

function resetEmptyItems() {
    emptyItems = [];
}

export {getEmptyItems, pushToEmptyItems, resetEmptyItems};