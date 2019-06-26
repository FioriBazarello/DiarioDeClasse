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
    let container = document.getElementById("main-student-content");
    
    let nameContainer = createComponent("div", container);
    createComponent("h3", nameContainer, "Nome:");
    createComponent("p", nameContainer, student.name);
    nameContainer.setAttribute("class", "info-container");
    
    let prontContainer = createComponent("div", container);
    createComponent("h3", prontContainer, "Prontuário:");
    createComponent("p", prontContainer, student.id);
    prontContainer.setAttribute("class", "info-container");
    
    let mediaContainer = createComponent("div", container);
    createComponent("h3", mediaContainer, "Média:");
    createComponent("p", mediaContainer, student.media ? student.media : "0");
    mediaContainer.setAttribute("class", "info-container");
    
    let absenceContainer = createComponent("div", container)
    createComponent("h3", absenceContainer, "Faltas:");
    createComponent("p", absenceContainer, student.faltas.length ? student.faltas.length : "0");
    absenceContainer.setAttribute("class", "info-container");
    
    let status = getStatus(student);
    let statusClass = "";
    if (status !== "aproved" && status === "exam") {
        statusClass = "exam";
    }
    else if (status !== "aproved" && status !== "exam") {
        statusClass = "disapproved";
    }
    
    let statusContainer = createComponent("div", container)
    createComponent("h3", statusContainer, "Status:");
    createComponent("p", statusContainer, getStatusMessage(getStatus(student)));
    statusContainer.setAttribute("class", `info-container ${statusClass}`);
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