import { useState, useEffect } from 'react';
import { obtenerTodos, crear, calificar, actualizar, eliminar } from '../services/proveedorService';
import ProveedorCard from '../components/ProveedorCard';
import ProveedorForm from '../components/ProveedorForm';

const initialFormData = {
    razonSocial: '',
    cuit: '',
    email: '',
    telefono: '',
    categoria: 'HARDWARE'
};

const Proveedores = () => {
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await obtenerTodos();
                setLista(datos);
            } catch (error) {
                console.error('Error al cargar los datos', error);
            }
        };

        cargarDatos();
    }, []);

    const resetForm = () => {
        setFormData(initialFormData);
        setEditandoId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            razonSocial: formData.razonSocial,
            cuit: formData.cuit,
            contacto: {
                email: formData.email,
                telefono: formData.telefono
            },
            categorias: [formData.categoria]
        };

        try {
            if (editandoId) {
                const itemActualizado = await actualizar(editandoId, payload);
                setLista((prevLista) => prevLista.map((item) => item._id === editandoId ? itemActualizado : item));
            } else {
                const itemNuevo = await crear(payload);
                setLista((prevLista) => [...prevLista, itemNuevo]);
            }

            resetForm();
        } catch {
            alert('Error al guardar los datos del proveedor');
        }
    };

    const handleCalificar = async (item) => {
        const valor = window.prompt(`Calificar a ${item.razonSocial} (del 1 al 5):`, item.calificacion || 5);
        if (valor === null) return;

        const puntuacion = Number(valor);
        if (Number.isNaN(puntuacion) || puntuacion < 1 || puntuacion > 5) {
            return alert('Ingresa un número entre 1 y 5');
        }

        try {
            const itemActualizado = await calificar(item._id, puntuacion);
            setLista((prevLista) => prevLista.map((prov) => prov._id === item._id ? itemActualizado : prov));
        } catch {
            alert('Error al calificar al proveedor');
        }
    };

    const handleBorrar = async (id) => {
        if (window.confirm('¿Seguro que deseas eliminar este registro?')) {
            try {
                await eliminar(id);
                setLista((prevLista) => prevLista.filter((item) => item._id !== id));
            } catch {
                alert('Error al eliminar');
            }
        }
    };

    const prepararEdicion = (item) => {
        setFormData({
            razonSocial: item.razonSocial || '',
            cuit: item.cuit || '',
            email: item.contacto?.email || '',
            telefono: item.contacto?.telefono || '',
            categoria: item.categorias?.[0] || 'HARDWARE'
        });
        setEditandoId(item._id);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Gestión de Proveedores</h1>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <ProveedorForm
                        formData={formData}
                        setFormData={setFormData}
                        editandoId={editandoId}
                        onSubmit={handleSubmit}
                        onCancel={resetForm}
                    />
                </div>

                <div className="col-md-8">
                    <div className="row">
                        {lista.map((item) => (
                            <div className="col-md-6" key={item._id}>
                                <ProveedorCard
                                    item={item}
                                    onRate={handleCalificar}
                                    onEdit={prepararEdicion}
                                    onDelete={handleBorrar}
                                />
                            </div>
                        ))}
                        {lista.length === 0 && <p className="text-muted">No hay registros para mostrar.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;