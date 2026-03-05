'use client';
import { useState, useEffect } from 'react';
import { AuditoriaImplante } from '@/types/types.interface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
export default function ImplantesPage() {
  const [registros, setRegistros] = useState<AuditoriaImplante[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    ownerName: '',
    implantModel: '',
    marketValue: '',
    category: 'Cyberware' as 'Cyberware' | 'Biotech' | 'Illegal-Mod',
  });
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await fetch('/api/implantes');
        const data = await response.json();
        setRegistros(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar registros:', err);
        setLoading(false);
      }
    };
    fetchRegistros();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'marketValue') {
      const numValue = parseFloat(value) || 0;
      if (numValue <= 0 && value !== '') {
        setError('VALORACIÓN FISCAL NULA');
      } else {
        setError(null);
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'marketValue' ? value : value,
    }));
  };
  const isModelValid = formData.implantModel.length >= 5;
  const isFormValid = isModelValid && !error && formData.ownerName && formData.marketValue;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/implantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerName: formData.ownerName,
          implantModel: formData.implantModel,
          marketValue: parseFloat(formData.marketValue),
          category: formData.category,
        }),
      });
      if (response.ok) {
        const newRegistro: AuditoriaImplante = {
          id: `AUD-${Date.now()}`,
          ownerName: formData.ownerName,
          implantModel: formData.implantModel,
          marketValue: parseFloat(formData.marketValue),
          category: formData.category,
          riskLevel: 'LOW',
          isConfiscated: false,
        };
        setRegistros((prev) => [...prev, newRegistro]);
        toast.success('ACTIVO REGISTRADO Y TASADO');
        setFormData({
          ownerName: '',
          implantModel: '',
          marketValue: '',
          category: 'Cyberware',
        });
      }
    } catch (err) {
      console.error('Error al registrar implante:', err);
      toast.error('Error al registrar el activo');
    } finally {
      setSubmitting(false);
    }
  };
  const copiarAlPortapapeles = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Fallo en el trasvase', err);
      toast.error('ERROR: PORTAPAPELES BLOQUEADO');
    }
  };
  if (loading) {
    return <div className="p-8">Cargando registros...</div>;
  }
  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-b from-slate-950 to-blue-950 min-h-screen">
      <style>{`
        .striped-illegal {
          background: linear-gradient(
            45deg,
            rgba(127, 29, 29, 0.7) 0%,
            rgba(127, 29, 29, 0.7) 10px,
            rgba(153, 27, 27, 0.7) 10px,
            rgba(153, 27, 27, 0.7) 20px
          ) !important;
        }
      `}</style>
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400" style={{ textShadow: '0 0 20px rgba(250, 204, 21, 0.5)' }}>
          ⚖️ Auditoría de Implantes
        </h2>
        <div className="bg-gradient-to-br from-blue-900/60 to-slate-900/80 border border-yellow-500/50 rounded-lg p-6 mb-8 backdrop-blur">
          <h3 className="text-xl font-semibold mb-4 text-yellow-300">Reporte de Incautación</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-300 font-semibold">Proprietario:</label>
              <Input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="Nombre del proprietario"
                className="bg-blue-950 border-blue-500 text-white placeholder-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-300 font-semibold">Modelo del Implante:</label>
              <Input
                type="text"
                name="implantModel"
                value={formData.implantModel}
                onChange={handleInputChange}
                placeholder="Ej: Neural-Link"
                className="bg-blue-950 border-blue-500 text-white placeholder-blue-300"
              />
              {formData.implantModel && formData.implantModel.length < 5 && (
                <p className="text-red-500 text-xs mt-1">Mínimo 5 caracteres requeridos</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-300 font-semibold">Valor de Mercado:</label>
              <Input
                type="number"
                name="marketValue"
                value={formData.marketValue}
                onChange={handleInputChange}
                placeholder="Valor en créditos"
                className="bg-blue-950 border-blue-500 text-white placeholder-blue-300"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-yellow-300 font-semibold">Categoría:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-blue-950 border border-blue-500 rounded px-3 py-2 text-sm text-white"
              >
                <option>Cyberware</option>
                <option>Biotech</option>
                <option>Illegal-Mod</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={!isFormValid || submitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold"
              >
                {submitting ? 'Tasando Activo en Red...' : 'Registrar Activo'}
              </Button>
            </div>
          </form>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-yellow-300">Activos Registrados</h3>
        <div className="overflow-x-auto bg-gradient-to-b from-blue-900/40 to-slate-900/60 border border-yellow-500/50 rounded-lg backdrop-blur">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-950 to-blue-900 border-b border-yellow-500/50">
              <tr>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">ID</th>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">Proprietario</th>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">Modelo</th>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">Valor Mercado</th>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">Categoría</th>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">Estado</th>
                <th className="px-4 py-3 text-left text-yellow-300 font-bold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr
                  key={registro.id}
                  className={`border-b border-blue-700/30 relative ${
                    registro.category === 'Illegal-Mod' 
                      ? 'striped-illegal' 
                      : index % 2 === 0 ? 'bg-blue-950/30' : 'bg-blue-900/20'
                  } hover:bg-yellow-500/10 transition-colors`}
                >
                  {registro.isConfiscated && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded">
                      <div 
                        className="text-red-500 font-black text-3xl rotate-45 transform drop-shadow-2xl" 
                        style={{ 
                          textShadow: '0 0 20px rgba(239, 68, 68, 1), 0 0 40px rgba(220, 38, 38, 0.8)',
                          letterSpacing: '2px',
                          fontWeight: '900'
                        }}
                      >
                        ACTIVO INCAUTADO
                      </div>
                    </div>
                  )}
                  <td className="px-4 py-3">{registro.id}</td>
                  <td className="px-4 py-3">{registro.ownerName}</td>
                  <td className="px-4 py-3">{registro.implantModel}</td>
                  <td
                    className={`px-4 py-3 font-bold ${
                      registro.marketValue > 20000
                        ? 'text-yellow-300'
                        : 'text-cyan-200'
                    }`}
                    style={
                      registro.marketValue > 20000
                        ? {
                          textShadow: '0 0 15px rgba(253, 224, 71, 0.8), 0 0 30px rgba(250, 204, 21, 0.6)',
                          filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))',
                        }
                        : {}
                    }
                  >
                    ₵{registro.marketValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        registro.category === 'Illegal-Mod'
                          ? 'bg-red-600/80 text-red-100 border border-red-500/50'
                          : registro.category === 'Cyberware'
                            ? 'bg-cyan-600/80 text-cyan-100 border border-cyan-500/50'
                            : 'bg-emerald-600/80 text-emerald-100 border border-emerald-500/50'
                      }`}
                    >
                      {registro.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {registro.isConfiscated ? (
                      <span className="text-red-400 font-bold" style={{ textShadow: '0 0 8px rgba(239, 68, 68, 0.6)' }}>INCAUTADO</span>
                    ) : (
                      <span className="text-emerald-400 font-bold" style={{ textShadow: '0 0 8px rgba(16, 185, 129, 0.4)' }}>Activo</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      onClick={() => copiarAlPortapapeles(registro.id)}
                      className={`text-xs px-3 py-1 font-bold transition-all ${
                        copiedId === registro.id
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                      }`}
                    >
                      {copiedId === registro.id ? '✓ ¡COPIADO!' : '📋 Copiar ID'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
