function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

function getCookies() {
    var savedCookies = decodeURIComponent(document.cookie).split('; ');
    savedCookies = savedCookies.map((cookie) => {
        let items = cookie.split('=');
        return {
            ...JSON.parse(items[1]),
            id: items[0],
        };
    });

    return savedCookies;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function getStudents() {
    return getCookies().filter(item => item.type === "student").sort((a, b) => a.id > b.id ? 1 : -1);
}

function setStudent(id, values) {
    let oldData = getStudentById(id);

    setCookie(id, JSON.stringify({
        ...oldData,
        ...values,
    }));

    RemoveTable();
    RenderTable();
}

function getClassData() {
    let classData = getCookies().filter(item => item.id === "class");
    return classData[0];
}

function getStudentById(id) {
    return getCookies().find(item => item.id === id);
}