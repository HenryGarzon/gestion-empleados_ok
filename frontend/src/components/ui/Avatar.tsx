"use client";

import { useState, useEffect } from "react";
import { ImageModal } from "./ImageModal";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
  const [showModal, setShowModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  const initial = name?.charAt(0)?.toUpperCase() || "?";

  if (src && isClient) {
    return (
      <>
        <img
          src={src}
          alt={name}
          onClick={() => setShowModal(true)}
          className={`${sizeClasses[size]} rounded-full object-cover border border-border cursor-pointer hover:ring-2 hover:ring-accent transition-all`}
        />
        {showModal && (
          <ImageModal
            src={src}
            name={name}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover border border-border`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-accent flex items-center justify-center text-white font-medium border border-border`}
    >
      {initial}
    </div>
  );
}

interface ImageUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Foto" }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onChange(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      
      <div className="flex items-center gap-4">
        {value && (
          <img src={value} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-border" />
        )}
        
        <label className="px-4 py-2 bg-surface border border-border rounded-md text-sm cursor-pointer hover:bg-surface-hover transition-colors">
          <span>{value ? "Cambiar" : "Seleccionar"} imagen</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
        
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-4 py-2 text-sm text-destructive hover:underline"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}