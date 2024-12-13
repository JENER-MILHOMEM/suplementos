'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from 'next/link';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const router = useRouter();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (signInWithEmailAndPassword) {
            await signInWithEmailAndPassword(formData.email, formData.password);
        }
    };

    useEffect(() => {
        if (user) {
            const storeToken = async () => {
                const token = await user.user.getIdToken();
                localStorage.setItem('token', token);
                router.push("/");
            };
            storeToken();
        }
    }, [user, router]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Usuário logado com Google:", result.user);
            router.push("/");
        } catch (error) {
            console.error("Erro no login com Google:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-3xl font-light mb-6 text-center text-gray-800">Login</h2>
                    <div className="mb-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none border-b-2 border-gray-300 w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 transition duration-300"
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                className="appearance-none border-b-2 border-gray-300 w-full py-3 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 transition duration-300"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Entrar'}
                        </button>
                        <div className="flex justify-between items-center">

                            <Link href="/register" className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800 underline">
                                não tem uma conta?
                            </Link>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs italic mb-4">
                            email ou senha invalidas
                        </p>
                    )}
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400">ou</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div>
                        <button
                            className="w-full border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle className="mr-2" />
                            Conectar com Google
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2023 Sua Empresa. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
};

export default Login;




