
const findInChildren = (predicate) => {
    return testInstance => {
        const children = testInstance.children
        return Array.isArray(children)
            ? children.some(predicate)
            : predicate(children)
    }
}
const findByPropsId = (predicate) => {
    return testInstance => {
        const id = testInstance.props.id;
        return id === predicate;
    }
}

const findByPropsValue = (predicate) => {
    return testInstance => {
        const value = testInstance.props.value;
        return value === predicate;
    }
}

const findByPropsClassName = (predicate) => {
    return testInstance => {
        const value = testInstance.props.className;
        return value === predicate;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export default {
    findInChildren,
    findByPropsId,
    findByPropsValue,
    findByPropsClassName,
    delay
}
