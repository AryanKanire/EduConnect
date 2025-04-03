import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { loginStudent, loginTeacher, loginAdmin } from "@/services/auth";

type UserRole = "student" | "admin" | "teacher";

const Login = () => {
    const [selectedRole, setSelectedRole] = useState<UserRole>("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let response;
            
            switch (selectedRole) {
                case "student":
                    response = await loginStudent({ email, password });
                    login(response.token, { ...response.student, role: "student" });
                    navigate("/student/dashboard");
                    break;
                    
                case "teacher":
                    response = await loginTeacher({ email, password });
                    login(response.token, { ...response.teacher, role: "teacher" });
                    navigate("/teacher/dashboard");
                    break;
                    
                case "admin":
                    response = await loginAdmin({ email, password });
                    login(response.token, { ...response.admin, role: "admin" });
                    navigate("/admin/dashboard");
                    break;
            }

            toast({
                title: "Login Successful",
                description: `Welcome back!`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error instanceof Error ? error.message : "An error occurred during login",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Sign in to your account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="flex justify-center space-x-2">
                                {["student", "admin", "teacher"].map((role) => (
                                    <Button
                                        key={role}
                                        type="button"
                                        variant={selectedRole === role ? "default" : "outline"}
                                        onClick={() => setSelectedRole(role as UserRole)}
                                    >
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </Button>
                                ))}
                            </div>
                            
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email address"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;