import { User } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DialogLogout } from './dialog-logout';

interface UserProfileProps {
  user: User;
  isAdmin: boolean;
}

export default function UserProfile({ user, isAdmin }: UserProfileProps) {
  const formatDate = (date: string | Date | undefined) => {
    if (!date) {
      return 'Sem informações';
    }
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl font-bold">{user.displayName || 'Usuário'}</CardTitle>
              <p className="text-sm sm:text-base text-gray-500 mt-1">{user.email}</p>
              <Badge variant="secondary" className="mt-2">
                {isAdmin ? 'Admin' : 'Cliente'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <Mail size={18} className="flex-shrink-0" />
              <span className="text-sm sm:text-base break-all">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <CalendarDays size={18} className="flex-shrink-0" />
              <span className="text-sm sm:text-base">Criado em: {formatDate(user.metadata.creationTime!)}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <CalendarDays size={18} className="flex-shrink-0" />
              <span className="text-sm sm:text-base">Último login: {formatDate(user.metadata.lastSignInTime)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <DialogLogout/>
        </CardFooter>
      </Card>
    </div>
  );
}

