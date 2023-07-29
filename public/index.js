const setInfoModal = (nombre, balance, id_user) => {
    $("#nombreEdit").val(nombre);
    $("#balanceEdit").val(balance);
    $("#editButton").attr("onclick", `editUsuario(${id_user})`); 
};

const editUsuario = async (id_user) => {
    const name = $("#nombreEdit").val();
    const balance = $("#balanceEdit").val();
    try {
        const { data } = await axios.put(
            `http://localhost:3000/usuario/${id_user}`, 
        {
            nombre: name,
            balance: balance,
        }
        );
        $("#exampleModal").modal("hide");
        location.reload();
        console.log('Usuario actualizado exitosamente')
    } catch (e) {
        alert("Algo salió mal..." + e);
        console.log('Error al actualizar el usuario')
    }
};


$("form:first").submit(async (e) => {
    e.preventDefault();
    let nombre = $("#nombreUsuario").val();
    let balance = Number($("#balanceUsuario").val());

    // Validar que el nombre y el balance no estén vacíos
    if (!nombre || isNaN(balance)) {
        alert("Debe completar el nombre y el balance correctamente");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/usuario", {
        method: "post",
        body: JSON.stringify({
            nombre,
            balance,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        });
        $("#nombreUsuario").val("");
        $("#balanceUsuario").val("");
        location.reload();
        console.log('Usuario creado exitosamente')
    } catch (e) {
        alert("Algo salió mal ..." + e);
        console.log('Error al crear usuario')
    }
});


$("form:last").submit(async (e) => {
        e.preventDefault();
        let emisor = $("form:last select:first").val();
        let receptor = $("form:last select:last").val();
        let monto = $("#monto").val();
        if (!monto || !emisor || !receptor) {
        alert("Debe seleccionar un emisor, receptor y monto a transferir");
        return false;
        }
        try {
            const response = await fetch("http://localhost:3000/transferencia", {
                method: "post",
                body: JSON.stringify({
                emisor,
                receptor,
                monto,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log("Respuesta del servidor:", data); 
            location.reload();
            console.log('Transferencia realizada exitosamente')
        } catch (e) {
            console.log(e);
            alert("Algo salió mal..." + e);
            console.log('Error al realizar la transferencia')
        }
});

const getUsuarios = async () => {
    const response = await fetch("http://localhost:3000/usuarios");
    let data = await response.json();
    $(".usuarios").html("");
    $.each(data, (i, c) => {
        $(".usuarios").append(`
                <tr>
                    <td>${c.nombre}</td>
                    <td>${c.balance}</td>
                    <td>
                    <button
                        class="btn btn-warning mr-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onclick="setInfoModal('${c.nombre}', '${c.balance}', '${c.id_user}')"
                    >
                    Editar</button
                    ><button class="btn btn-danger" onclick="eliminarUsuario('${c.id_user}')">Eliminar</button>
                    </td>
                </tr>
            `);
        $("#emisor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
        $("#receptor").append(`<option value="${c.nombre}">${c.nombre}</option>`);
    });
};

const eliminarUsuario = async (id_user) => {
    try {
        const response = await fetch(`http://localhost:3000/usuario/${id_user}`, {
        method: "DELETE",
    });
    getUsuarios();
    console.log('Usuario eliminado con éxito')
    } catch (error){
        console.log('Ocurrió un error al eliminar un usuario', error)
    }
    
};

const getTransferencias = async () => {
    const { data } = await axios.get("http://localhost:3000/transferencias");
    $(".transferencias").html("");

    data.forEach((t) => {
        $(".transferencias").append(`
        <tr>
            <td> ${formatDate(t.fecha)} </td>
            <td> ${t.emisor} </td>
            <td> ${t.receptor} </td>
            <td> ${t.monto} </td>
        </tr>
        `);
    });
};


getUsuarios();
getTransferencias();

const formatDate = (date) => {
    const dateFormat = moment(date).format("L");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
};
formatDate();