'use client'
import { useEffect, ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import {auth} from '@/firebase/firebase'

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        const storeToken = async () => {
            if (!loading && user) {
                const token = await user.getIdToken();
                localStorage.setItem('token', token);
            }
            if (!loading && !user) {
                router.push("/login");
            }
        };

        storeToken();
    }, [user, loading, router]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (user) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectedRoute;

