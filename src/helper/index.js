const getCurrentData = () => {
    let d = new Date();
    return `${d.getFullYear()}/${d.getMonth() +
        1}/${d.getDate()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

export { getCurrentData };
