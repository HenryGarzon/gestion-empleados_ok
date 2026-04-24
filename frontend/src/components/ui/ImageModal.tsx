"use client";

interface ImageModalProps {
  src: string;
  name: string;
  onClose: () => void;
}

export function ImageModal({ src, name, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-xl transition-colors"
        aria-label="Cerrar"
      >
        ×
      </button>

      {/* Imagen centrada */}
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={name}
          className="max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-lg object-contain shadow-2xl"
        />
        <p className="text-center text-white mt-3 text-sm">{name}</p>
      </div>
    </div>
  );
}