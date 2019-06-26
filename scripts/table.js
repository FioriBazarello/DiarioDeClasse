function RenderTable() {
    document.getElementById("class-table").appendChild(renderTableHeader());
    document.getElementById("class-table").appendChild(renderTableBody());
}

function RemoveTable() {
    document.getElementById("table-header").remove();
    document.getElementById("table-body").remove();
}

function renderTableHeader() {
    let data = getClassData();

    let header = createComponent("thead");
    header.setAttribute("id", "table-header");
    let container = createComponent("tr", header);

    createComponent("th", container, "Prontuário");
    createComponent("th", container, "Faltas").setAttribute("colspan", data.classes * 19);
    createComponent("th", container, "Avaliações").setAttribute("colspan", data.tests);
    createComponent("th", container, "Média");
    createComponent("th", container, "Faltas");
    createComponent("th", container, "Status");
    createComponent("th", container, "Ações");

    return header;
}

function renderTableBody() {
    let data = getClassData();

    let container = document.createElement("tbody");
    container.setAttribute("id", "table-body");

    // Renderiza a linha auxiliar
    container.appendChild(renderAuxLine(data.classes, data.tests));
    
    // Renderiza cada linha por aluno
    let students = getStudents();
    for (let a = 0; a < students.length; a++) {
        let student = students[a];
        var line = document.createElement("tr");

        let status = getStatus(student);

        if (status !== "aproved" && status === "exam") {
            line.setAttribute("class", "exam");
        }
        else if (status !== "aproved" && status !== "exam") {
            line.setAttribute("class", "disapproved");
        }

        // Célula com prontuário
        createComponent("td", line, student.id);

        // Células de faltas 
        for (let day = 0; day < 19; day++) {
            for (let dayClass = 0; dayClass < data.classes; dayClass++) {
                let cell = createComponent("td", line);
                let input = createComponent("input", cell);
                input.setAttribute("type", "checkbox");
                input.onchange = (event) => { handleAbsenceChange(event, student.id, { day: day, dayClass: dayClass }); };
                input.checked = student.faltas.some(falta => falta.day === day && falta.dayClass === dayClass );
            }
        }

        // Células de avaliações
        for (let i = 0; i < data.tests; i++) {
            let cell = createComponent("td", line);
            let input = createComponent("input", cell);
            input.setAttribute("type", "number");
            input.setAttribute("min", "0");
            input.setAttribute("max", "10");
            input.onchange = (event) => { handleTestChange(student.id, { index: i, note: Number.parseInt(event.target.value) }); };
            let currentTest = student.tests.find(test => test.index === i);
            input.value = currentTest ? currentTest.note : 0;
        }

        createComponent("td", line, student.media);
        createComponent("td", line, student.faltas.length);
        createComponent("td", line, getStatusMessage(status));
        
        // Botão de detalhes
        let detailsCell = createComponent("td", line);
        let detailsLink = createComponent("a", detailsCell, "Ver Detalhes");
        detailsLink.setAttribute("href", `/aluno.html#${student.id}`);

        container.appendChild(line);
    }

    return container;
}

function handleTestChange(id, test) {
    let data = getClassData();
    let student = getStudentById(id);
    let tests = student.tests;
    let index = tests.findIndex(item => item.index === test.index);

    if (index === -1) {
        tests.push(test);
    }
    else {
        tests[index] = test;
    }

    let media = (tests.map(item => item.note).reduce((prev, current) => prev + current, 0) / data.tests).toFixed(1);

    setStudent(id, { tests: tests, media: media, status: getStatus(student) });
}

function handleAbsenceChange(event, id, absence) {
    let data = getClassData();
    let student = getStudentById(id);
    let absences = student.faltas;

    if (event.target.checked) {
        absences.push(absence);
    }
    else {
        let index = absences.findIndex(item => item.day === absence.day && item.dayClass === absence.dayClass);
        absences.splice(index, 1);
    }

    setStudent(id, { faltas: absences, faltasTotais: absences.length, status: getStatus(student) });
}

function getStatus(student) {
    let data = getClassData();
    let status = "aproved";

    if (student.faltas.length > ((19 * data.classes) / 4)) {
        status = "low_presence";
    }
    else if (student.media < 4) {
        status = "low_note";
    }
    else if (student.media < 6) {
        status = "exam";
    }

    return status;
}

function getStatusMessage(status) {
    switch(status) {
        case "aproved":
            return "Aprovado";
        case "low_presence":
            return "Reprovado por Falta";
        case "low_note":
            return "Reprovado por Nota";
        case "exam":
            return "Em Exame";
        default:
            return "Aprovado";
    }
};

function renderAuxLine(classes, tests) {
    var aux = document.createElement("tr");
    createComponent("td", aux, "Dias >");

    // Células de faltas
    for (let i = 0; i < 19; i++) {
        for (let b = 0; b < classes; b++) {
            createComponent("td", aux, `S${i+1} A${b+1}`);
        }
    }
    
    // Células de avaliações
    for (let i = 0; i < tests; i++) {
        createComponent("td", aux, `T${i+1}`);
    }

    createComponent("td", aux, " - ");
    createComponent("td", aux, " - ");
    createComponent("td", aux, " - ");
    createComponent("td", aux, " - ");

    return aux;
}