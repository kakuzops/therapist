"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function PacientForm({ onCreated }: { onCreated?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pacients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, imageUrl }),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar paciente");
      setName("");
      setEmail("");
      setPhone("");
      setImageUrl("");
      if (onCreated) onCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Cadastrar Paciente</h2>
        <Input
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="URL da foto (opcional)"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </Card>
  );
}
