"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// After creating the authentication lawer to create the database schema i need to go to supabase

const LoginPage = () => {
    const supabase = createClient();
    const router = useRouter();
    
    const [email, setEmail] = useState("ronaldo@whatever.com");
    const [password, setPassword] = useState("goldmedal");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            router.push("/");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login To Worklane</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                        className="w-full"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;

/*
Enable Email + Password in Supabase

Supabase Dashboard → Authentication → Providers → Email

Make sure:

✅ Email provider is enabled

Decide if you want:

“Confirm email” ON (user must verify)

or OFF (simpler for dev)

For now, I recommend:
👉 Turn OFF email confirmation while developing.

For Now it is disabled to simplify development.

You can enable it later.
*/