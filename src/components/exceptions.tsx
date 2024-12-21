import { useState } from 'react';
import toast from 'react-hot-toast';
import { Exception } from './store-hours';
import { Button } from './ui/button';
import { Input } from './ui/input';

type Props = {
  exceptions: Exception[];
  addException: (exception: Exception) => void;
  removeException: (id:string) => void;
};

export default function Exceptions({ exceptions, addException, removeException }: Props) {
  const [newException, setNewException] = useState<Exception>({
    date: '',
    open: null,
    close: null,
    reason: '',
  });

  const handleAddException = () => {
    if (!newException.date) {
      toast.error('Selecione uma data para a exceção');
      return;
    }
    addException(newException);
    setNewException({ date: '', open: null, close: null, reason: '' });
  };

  return (
    <div>
      <div className="mb-6 space-y-4">
        <Input
          type="date"
          value={newException.date}
          onChange={(e) => setNewException({ ...newException, date: e.target.value })}
          className="border rounded px-2 py-1 w-full"
        />
        <div className="flex space-x-4">
          <Input
            type="time"
            value={newException.open || ''}
            onChange={(e) => setNewException({ ...newException, open: e.target.value })}
            className="border rounded px-2 py-1 w-1/2"
            placeholder="Abertura"
          />
          <Input
            type="time"
            value={newException.close || ''}
            onChange={(e) => setNewException({ ...newException, close: e.target.value })}
            className="border rounded px-2 py-1 w-1/2"
            placeholder="Fechamento"
          />
        </div>
        <Input
          type="text"
          value={newException.reason || ''}
          onChange={(e) => setNewException({ ...newException, reason: e.target.value })}
          placeholder="Motivo da exceção"
          className="border rounded px-2 py-1 w-full"
        />
        <Button 
          onClick={handleAddException} 
          className="bg-primary text-white px-4 py-2 rounded transition-colors w-full"
        >
          Adicionar Exceção
        </Button>
      </div>
      <div className="space-y-4">
        {exceptions.map((exception) => (
          <div key={exception.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
            <div>
              <span className="font-medium">{exception.date.split('-').reverse().join('/')}</span>
              <span className="mx-2">|</span>
              <span>{exception.open || 'Fechado'} - {exception.close || 'Fechado'}</span>
              {exception.reason && <span className="ml-2 text-gray-600">({exception.reason})</span>}
            </div>
            <Button 
              onClick={() => removeException(exception.id!)} 
              variant={'destructive'}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

