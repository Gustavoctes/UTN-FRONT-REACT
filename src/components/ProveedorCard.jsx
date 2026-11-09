const ProveedorCard = ({ item, onRate, onEdit, onDelete }) => {
    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <h5 className="card-title">{item.razonSocial}</h5>
                <p className="card-text text-muted mb-1">
                    <strong>CUIT:</strong> {item.cuit}
                </p>
                <p className="card-text text-muted mb-1">
                    <strong>Email:</strong> {item.contacto?.email}
                </p>
                <p className="card-text text-muted mb-1">
                    <strong>Categoría:</strong> {item.categorias?.join(', ')}
                </p>
                {item.calificacion !== undefined && (
                    <p className="card-text text-warning mb-2">
                        <strong>Calificación:</strong> {item.calificacion} / 5
                    </p>
                )}

                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onRate(item)}
                    >
                        Calificar
                    </button>
                    <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => onEdit(item)}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(item._id)}
                    >
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProveedorCard;
