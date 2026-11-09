const ProveedorForm = ({ formData, setFormData, editandoId, onSubmit, onCancel }) => {
    const handleChange = (campo, valor) => {
        setFormData((prev) => ({ ...prev, [campo]: valor }));
    };

    return (
        <form onSubmit={onSubmit} className="card p-3 shadow-sm">
            <h5>{editandoId ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h5>

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Razón Social"
                value={formData.razonSocial}
                onChange={(e) => handleChange('razonSocial', e.target.value)}
                required
            />

            <input
                type="text"
                className="form-control mb-2"
                placeholder="CUIT (11 números sin guiones)"
                pattern="\d{11}"
                value={formData.cuit}
                onChange={(e) => handleChange('cuit', e.target.value)}
                required
            />

            <input
                type="email"
                className="form-control mb-2"
                placeholder="Email de contacto"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
            />

            <input
                type="text"
                className="form-control mb-2"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
            />

            <select
                className="form-select mb-3"
                value={formData.categoria}
                onChange={(e) => handleChange('categoria', e.target.value)}
            >
                <option value="HARDWARE">HARDWARE</option>
                <option value="SOFTWARE">SOFTWARE</option>
                <option value="INSUMOS">INSUMOS</option>
                <option value="SERVICIOS">SERVICIOS</option>
            </select>

            <div className="d-grid gap-2">
                <button type="submit" className={`btn ${editandoId ? 'btn-warning' : 'btn-success'}`}>
                    {editandoId ? 'Actualizar' : 'Guardar'}
                </button>

                {editandoId && (
                    <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProveedorForm;
