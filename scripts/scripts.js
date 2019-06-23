function SubmitClass(context) {
    setCookie("2834548", JSON.stringify({ type: "student", faltas: [], faltasTotais: 0, name: "Roberto Andrade", tests: [], media: 0, status: "aproved" }));
    setCookie("8923745", JSON.stringify({ type: "student", faltas: [], faltasTotais: 0, name: "Leandro Fernandes", tests: [], media: 0, status: "aproved" }));
    setCookie("8237428", JSON.stringify({ type: "student", faltas: [], faltasTotais: 0, name: "Israel Mendes", tests: [], media: 0, status: "aproved" }));
    setCookie("2344389", JSON.stringify({ type: "student", faltas: [], faltasTotais: 0, name: "Antônio Figueira", tests: [], media: 0, status: "aproved" }));

    setCookie("class", JSON.stringify({
        classes: context.classes.value,
        tests: context.tests.value,
        type: "data",
    }));

    RenderTable();

    hideById("class-questions");
    showById("class-table-container");
}

function RenderStudentInfo() {
    let student = getStudentById(location.hash.replace("#", ""));
    let container = document.getElementById("main-content");
    
    createComponent("h3", container, "Nome:");
    createComponent("p", container, student.name);
    
    createComponent("h3", container, "Prontuário:");
    createComponent("p", container, student.id);
    
    createComponent("h3", container, "Média:");
    createComponent("p", container, student.media);
    
    createComponent("h3", container, "Faltas:");
    createComponent("p", container, student.faltasTotais);
    
    createComponent("h3", container, "Status:");
    createComponent("p", container, getStatusMessage(getStatus(student)));
}

function createComponent(type, append, value) {
    let comp = document.createElement(type);

    if (value) {
        comp.appendChild(document.createTextNode(value));
    }

    if (append) {
        append.appendChild(comp);
    }

    return comp;
}

function hideById(id) {
    document.getElementById(id).style.display = "none";
}


function showById(id) {
    document.getElementById(id).style.display = "block";
}